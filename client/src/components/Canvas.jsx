/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import {
  Tldraw,
  defaultShapeUtils,
  createTLStore,
  throttle,
} from 'tldraw'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import '../stylesheets/tldraw.css'

const Canvas = ({ canvasData = [], newCanvasChanges = [], socketRef }) => {
  const { roomId } = useParams()
  const { authUser } = useAuthContext()
  const username = authUser?.username

  const [store] = useState(() =>
    createTLStore({ shapeUtils: [...defaultShapeUtils] })
  )

  const editorRef = useRef(null)
  const pendingChanges = useRef([])
  const hasLoadedInitialData = useRef(false)
  const ignoreNextChange = useRef(false) // ✅ prevents loop

  // ✅ Apply updates with flag to skip re-emission
  const applyUpdates = (targetStore, updates) => {
    if (!updates || updates.length === 0) return
    ignoreNextChange.current = true // ⛔ prevent local emit
    targetStore.mergeRemoteChanges(() => {
      for (const update of updates) {
        const { added = {}, updated = {}, removed = {} } = update.changes
        Object.values(added).forEach((r) => r && targetStore.put([r]))
        Object.values(updated).forEach(([, to]) => to && targetStore.put([to]))
        Object.values(removed).forEach((r) => r && targetStore.remove([r.id]))
      }
    })
    setTimeout(() => {
      ignoreNextChange.current = false
    }, 0) // ✅ re-enable next tick
  }

  // ✅ Incoming remote updates
  useEffect(() => {
    if (!editorRef.current || newCanvasChanges.length === 0) return
    applyUpdates(editorRef.current.store, newCanvasChanges)
  }, [newCanvasChanges])

  // ✅ Load persisted data once
  useEffect(() => {
    if (!editorRef.current || hasLoadedInitialData.current) return
    if (canvasData.length > 0) {
      applyUpdates(editorRef.current.store, canvasData)
    }
    hasLoadedInitialData.current = true
  }, [canvasData])

  // ✅ Local change listener
  useEffect(() => {
    const sendCanvasChanges = throttle(() => {
      if (pendingChanges.current.length === 0) return
      socketRef.current.emit('canvas-change', {
        type: 'update',
        username,
        roomId,
        newChanges: [...pendingChanges.current],
      })
      pendingChanges.current = []
    }, 100)

    const handleCanvasChanges = (event) => {
      const keys = Object.keys(event.changes.updated || {})
      const isPointerOnly = keys.length > 0 && keys.every((k) => k === 'pointer:pointer')
      if (isPointerOnly || ignoreNextChange.current) return // ✅ ignore if remote

      pendingChanges.current.push(event)
      sendCanvasChanges()
    }

    const unsubscribe = store.listen(handleCanvasChanges)
    return () => unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store])

  return (
    <Box className="fixed m-1.5 mt-0 top-16 bottom-0 right-4 left-60 rounded-md">
      <Tldraw
        store={store}
        persistenceKey="canvasData"
        inferDarkMode={true}
        onMount={(editor) => {
          editorRef.current = editor
          editor.user.updateUserPreferences({ isSnapMode: true })
        }}
      />
    </Box>
  )
}

export default Canvas
import {Box ,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import CodeEditor from "./CodeEditor.jsx"
import Canvas from './Canvas.jsx'
import Chat from "./Chat.jsx"

// eslint-disable-next-line react/prop-types
const Navbar = ({messagesArray, socketRef, editorContent, handleEditorChange, canvasData, newCanvasChanges}) => {
  return (
    <Box className='m-2 mx-0 rounded-md p-2 flex flex-col w-full text-white'>
      <Tabs isFitted variant='solid-rounded'>
        <TabList className='text-bold border-b-2 border-white'>
            <Tab>Editor</Tab>
            <Tab>Board</Tab>
            <Tab>Messages</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <CodeEditor editorContent={editorContent} handleEditorChange={handleEditorChange}/>
            </TabPanel>
            <TabPanel>
                <Canvas newCanvasChanges={newCanvasChanges} socketRef={socketRef} canvasData={canvasData}/>
            </TabPanel>
            <TabPanel>
                <Chat messagesArray={messagesArray} socketRef={socketRef}/>
            </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Navbar

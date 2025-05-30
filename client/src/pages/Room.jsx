import { Box } from "@chakra-ui/react";
import Members from "../components/Members";
import Navbar from "../components/Navbar.jsx";
import { useEffect, useRef, useState } from "react";
import { initSocket} from "../socket-client/socket-client.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {useToast} from "@chakra-ui/react";

const Room = () => {

  const {authUser} = useAuthContext();
  const socketRef = useRef(null);
  const {roomId} = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [canvasData, setCanvasData] = useState([]);
  const [newCanvasChanges, setNewCanvasChanges] = useState([]);

  const handleEditorChange = (value) => {
    socketRef.current.emit("code-change", { roomId, code: value });
    setEditorContent(value);
  };

  const handleError = (err) => {
    toast({
      title: 'Error',
      description: err.message,
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
    navigate('/', {replace: true});
  }

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      socketRef.current.emit("join", {
        roomId,
        username: authUser?.username,
      } );

      socketRef.current.on("joined", ({clients, username, socketId}) => {
        if( username !== authUser?.username ) {
          toast({
            title: 'Success',
            description: `${username} joined the room`,
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        }
        setClients(clients);

        socketRef.current.emit("sync-changes", {
          roomId,
          socketId,
        });
      })

      socketRef.current.on("disconnected", ({socketId, username}) => {
        toast({
          title: 'Success',
          description: `${username} left the room`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setClients((prev) => {
          return prev.filter(client => client.socketId !== socketId);
        })
      })

      socketRef.current.on("message", ({ message, id, username, timestamp }) => {
          if (username !== authUser?.username) {
            toast({
              title: 'Success',
              description: `${username} sent a message`,
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
          }

          setMessages((prev) => [
            ...prev,
            { message, username, id, timestamp },
          ]);
        }
      );

      socketRef.current.on("sync-changes", ({ roomData }) => {
        // if (roomData) {
        //   console.log(roomData);
        // }
        if (roomData && roomData.code !== null) {
          setEditorContent(roomData.code);
        }
        if (roomData && roomData.canvasData.length > 0) {
          setCanvasData(roomData.canvasData);
        }
        if (roomData && roomData.messages.length > 0) {
          setMessages(roomData.messages);
        }
        // if (roomData && roomData.selectedLanguage.length > 0) {
        //   settingsContext.updateSettings("language", roomData.selectedLanguage);
        // }
      });

      socketRef.current.on("code-change", ({ code }) => {
        if (code !== null) {
          setEditorContent(code);
        }
      });

      // eslint-disable-next-line no-unused-vars
      socketRef.current.on("canvas-change", ({ type, username, newChanges, canvasData }) => {
          if (username !== authUser?.username) {
            setNewCanvasChanges(newChanges);
          }
          // setCanvasData((prev) => [...prev, ...newChanges]);
          setCanvasData(canvasData);
        }
      );

    };
    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box className="flex flex-row h-screen bg-slate-900 w-full">
      <Members clients={clients}/>
    <Navbar messagesArray={messages} socketRef={socketRef} editorContent={editorContent} handleEditorChange={handleEditorChange} canvasData={canvasData} newCanvasChanges={newCanvasChanges}/>
    </Box>
  )
}

export default Room

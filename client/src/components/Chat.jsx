/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Heading,
} from "@chakra-ui/react";
import { BiMessageEdit } from "react-icons/bi";
import { TbSend } from "react-icons/tb";
import { useParams } from "react-router-dom";
import Message from "./Message";

// eslint-disable-next-line react/prop-types
function Chat({ messagesArray, socketRef }) {
  const [message, setMessage] = useState("");
  const { roomId } = useParams();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesArray]);

  const submitMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socketRef.current.emit("message", { roomId, message });
    setMessage("");
  };

  return (
    <Flex
      direction="column"
      position="fixed"
      top="4rem"
      bottom="0"
      left={{ base: 0, md: "240px" }}   // start right of 250px sidebar
      right={{ base: 0, md: "1rem" }}    // leave a little breathing room
      bg="gray.800"
      color="white"
      p={4}
      borderRadius="lg"
      boxShadow="lg"
    >
      {/* Header */}
      <Box mb={4} borderBottom="2px" borderColor="gray.600" pb={2}>
        <Heading size="md" textAlign="center">
          Group Chat
        </Heading>
      </Box>

      {/* Messages List */}
      <VStack spacing={4} flex={1} overflowY="auto" px={2}>
        {messagesArray.map((msg) => (
          <Message
            key={msg.id}
            message={msg.message}
            sender={msg.username}
            timestamp={msg.timestamp}
          />
        ))}
        <Box ref={messagesEndRef} />
      </VStack>

      {/* Input Area */}
      <Flex mt={4} as="form" onSubmit={submitMessage} gap={2}>
        <InputGroup flex={1}>
          <InputLeftElement pointerEvents="none" color="gray.400">
            <BiMessageEdit size="1.5em" />
          </InputLeftElement>
          <Input
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
          />
        </InputGroup>

        <Button
          type="submit"
          colorScheme="blue"
          px={6}
          alignSelf="flex-end"
          bg="blue.600"
          _hover={{ bg: "blue.500" }}
        >
          <HStack spacing={1}>
            <Box>Send</Box>
            <TbSend />
          </HStack>
        </Button>
      </Flex>
    </Flex>
  );
}

export default Chat;

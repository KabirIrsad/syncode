/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import Client from "./Client";
import { useParams, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Members({ clients }) {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const toast = useToast();

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast({
        title: "Success",
        description: "Room ID copied to clipboard",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to copy Room ID",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const leaveRoom = () => {
    navigate("/");
    toast({
      title: "Left Room",
      description: "You have left the room",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Flex
      direction="column"
      bg="gray.800"
      color="white"
      h="100vh"
      width="256px"
      p={4}
      overflowX="hidden"
    >
      {/* Header */}
      <Box borderBottom="2px solid" borderColor="gray.600" pb={3} mb={4}>
        <Heading size="lg" textAlign="center" color="blue.400">
          SynCode
        </Heading>
      </Box>

      {/* Connected Clients */}
      <Box flex="1" overflowY="auto" overflowX="hidden" mb={4}>
        <Text fontWeight="bold" mb={2} color="blue.300">
          Connected
        </Text>
        <SimpleGrid
          columns={2}
          rowGap={6}
          columnGap={3}
          justifyItems="center"
          alignItems="start"
        >
          {clients.map((client) => (
            <Box
              key={client.socketId}
              textAlign="center"
              transform="scale(1.1)"      // slightly smaller client cards
              transformOrigin="top center"
            >
              <Client username={client.username} />
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Actions */}
      <VStack spacing={3}>
        <Button
          onClick={copyRoomId}
          variant="outline"
          colorScheme="blue"
          w="full"
        >
          Copy Room ID
        </Button>
        <Button
          onClick={leaveRoom}
          variant="outline"
          colorScheme="red"
          w="full"
        >
          Leave Room
        </Button>
      </VStack>
    </Flex>
  );
}

export default Members;

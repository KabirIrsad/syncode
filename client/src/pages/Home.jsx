import {
  Box,
  Button,
  Input,
  useToast,
  Heading,
  Text,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import ClientInfo from "../components/ClientInfo.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { authUser } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roomId, setRoomId] = useState("");
  const [newUsername, setNewUsername] = useState(authUser.username || "");
  const [newImageUrl, setNewImageUrl] = useState(authUser.imageUrl || "");

  const logoutDialog = useDisclosure();
  const cancelRef = useRef();

  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomId.trim()) {
      toast({
        title: "Room ID is required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    navigate(`/user/${roomId}`);
    toast({
      title: "Joined Room",
      description: `Room ID: ${roomId}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const createNewRoom = () => {
    const id = uuidv4();
    setRoomId(id);
    toast({
      title: "Room Created",
      description: `Room ID: ${id}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleProfileSave = () => {
    toast({
      title: "Profile Updated",
      description: `Username changed to ${newUsername}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <Flex bg="gray.900" h="100vh" w="100vw" direction="column" overflow="hidden">
      {/* Header */}
      <Flex w="full" py={4} px={6} align="center" justify="center" position="relative">
        <Heading
          fontSize={["3xl", "5xl"]}
          color="blue.400"
          fontWeight="extrabold"
          textShadow="0 2px 20px rgba(0, 204, 255, 0.5)"
        >
          SynCode
        </Heading>

        <Box position="absolute" left={6}>
          <ClientInfo username={authUser.username} />
        </Box>

        <Flex position="absolute" right={6} gap={3}>
          <Button size="md" colorScheme="blue" minW="100px" onClick={onOpen}>
            Edit
          </Button>
          <Button size="md" colorScheme="red" minW="100px" onClick={logoutDialog.onOpen}>
            Logout
          </Button>
        </Flex>
      </Flex>

      {/* Main Content */}
      <Flex flex={1} justify="center" align="center" px={4}>
        <Box
          w={["100%", "90%", "500px"]}
          bg="gray.800"
          px={[6, 8]}
          py={[8, 12]}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.700"
        >
          <VStack spacing={6} w="full">
            <Heading fontSize="2xl" color="white" fontWeight="medium" textAlign="center">
              Join a <Text as="span" color="blue.400">Room</Text>
            </Heading>

            <form onSubmit={joinRoom} style={{ width: "100%" }}>
              <VStack spacing={4}>
                <Input
                  placeholder="Room ID"
                  size="md"
                  fontSize="md"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  bg="gray.700"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                  borderColor="gray.600"
                  focusBorderColor="blue.400"
                />
                <Button
                  type="submit"
                  size="md"
                  fontSize="md"
                  colorScheme="blue"
                  w="full"
                  fontWeight="medium"
                >
                  Join
                </Button>
              </VStack>
            </form>

            <Text fontSize="sm" color="gray.300">
              Don’t have a Room ID?{" "}
              <Text
                as="span"
                color="blue.400"
                fontWeight="medium"
                cursor="pointer"
                _hover={{ textDecoration: "underline", color: "blue.300" }}
                onClick={createNewRoom}
              >
                Create Room
              </Text>
            </Text>
          </VStack>
        </Box>
      </Flex>

      {/* Drawer: Edit Profile */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800" color="white">
          <DrawerCloseButton />
          <DrawerHeader>Edit Profile</DrawerHeader>
          <DrawerBody>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel fontSize="sm">Username</FormLabel>
                <Input
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  size="md"
                  bg="gray.700"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Image URL</FormLabel>
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  size="md"
                  bg="gray.700"
                />
              </FormControl>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleProfileSave}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* AlertDialog: Logout */}
      <AlertDialog
        isOpen={logoutDialog.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={logoutDialog.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.800" color="white">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Logout
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to logout?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={logoutDialog.onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default Home;

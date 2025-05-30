import {
  Box,
  Input,
  Button,
  Flex,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useLogin from "../hooks/useLogin.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { loading, login } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const goToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <Flex bg="gray.900" h="100vh" w="100vw" justify="center" align="center" px={4}>
      <Box bg="gray.800" px={10} py={8} borderRadius="lg" w={["100%", "90%", "500px"]}>
        <Heading
          fontSize="3xl"
          mb={6}
          textAlign="center"
          color="white"
          fontWeight="bold"
        >
          Login to <Text as="span" color="blue.400">CodeBoard</Text>
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text mb={1} fontSize="sm" color="gray.300">Email</Text>
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="gray.700"
                color="white"
                borderColor="gray.600"
                focusBorderColor="blue.400"
              />
            </Box>

            <Box>
              <Text mb={1} fontSize="sm" color="gray.300">Password</Text>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="gray.700"
                color="white"
                borderColor="gray.600"
                focusBorderColor="blue.400"
              />
            </Box>

            <Flex justify="flex-end">
              <Text
                fontSize="sm"
                color="blue.400"
                cursor="pointer"
                _hover={{ textDecoration: "underline", color: "blue.300" }}
              >
                Forgot Password?
              </Text>
            </Flex>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
              loadingText="Logging in"
              fontWeight="medium"
              mt={2}
            >
              Login
            </Button>
          </VStack>
        </form>

        <Flex justify="center" mt={4}>
          <Text fontSize="sm" color="gray.300">
            New to CodeBoard?{" "}
            <Text
              as="span"
              color="blue.400"
              cursor="pointer"
              _hover={{ textDecoration: "underline", color: "blue.300" }}
              onClick={goToRegisterPage}
            >
              Register here
            </Text>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;

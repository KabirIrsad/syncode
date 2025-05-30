import {
  Box,
  Input,
  Button,
  Flex,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useRegister from "../hooks/useRegister.jsx";

const Register = () => {
  const { loading, register } = useRegister();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const toast = useToast();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    profilePic: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(inputs);
  };

  const goToLoginPage = () => {
    navigate("/login");
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
          Register to <Text as="span" color="blue.400">CodeBoard</Text>
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text mb={1} fontSize="sm" color="gray.300">Username</Text>
              <Input
                type="text"
                placeholder="Enter username"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                bg="gray.700"
                color="white"
                borderColor="gray.600"
                focusBorderColor="blue.400"
              />
            </Box>

            <Box>
              <Text mb={1} fontSize="sm" color="gray.300">Email</Text>
              <Input
                type="email"
                placeholder="Enter email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                bg="gray.700"
                color="white"
                borderColor="gray.600"
                focusBorderColor="blue.400"
              />
            </Box>

            <Box>
              <Text mb={1} fontSize="sm" color="gray.300">Profile Picture</Text>
              <Input
                type="text"
                placeholder="Image URL"
                value={inputs.profilePic}
                onChange={(e) =>
                  setInputs({ ...inputs, profilePic: e.target.value })
                }
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
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                bg="gray.700"
                color="white"
                borderColor="gray.600"
                focusBorderColor="blue.400"
              />
            </Box>

            <Box>
              <Text mb={1} fontSize="sm" color="gray.300">Confirm Password</Text>
              <Input
                type="password"
                placeholder="Confirm password"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
                bg="gray.700"
                color="white"
                borderColor="gray.600"
                focusBorderColor="blue.400"
              />
            </Box>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
              loadingText="Registering"
              fontWeight="medium"
              mt={2}
            >
              Register
            </Button>
          </VStack>
        </form>

        <Flex justify="center" mt={4}>
          <Text fontSize="sm" color="gray.300">
            Already have an account?{" "}
            <Text
              as="span"
              color="blue.400"
              cursor="pointer"
              _hover={{ textDecoration: "underline", color: "blue.300" }}
              onClick={goToLoginPage}
            >
              Login here
            </Text>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Register;

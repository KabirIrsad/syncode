import {useToast} from "@chakra-ui/react";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";


const useRegister = () => {

    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { setAuthUser} = useAuthContext();

    const register = async ({username, email, profilePic, password, confirmPassword}) => {
        if(!username || !email || !password || !confirmPassword) {
            toast({
                title: 'Error',
                description: "Please fill all the fields",
                status: 'error',
                duration: 2000,
                isClosable: true,
              });
            return;
        }

        if(password.length<6){
            toast({
                title: 'Error',
                description: "Password must be at least 6 characters",
                status: 'error',
                duration: 2000,
                isClosable: true,
              });
            return;
        }

        if(password !== confirmPassword) {
            toast({
                title: 'Error',
                description: "Passwords do not match",
                status: 'error',
                duration: 2000,
                isClosable: true,
              });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: JSON.stringify({username, email, profilePic, password, confirmPassword}),
            });

            const data = await response.json();
            if(data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("current-user", JSON.stringify(data));

            setAuthUser(data);

            toast({
                title: 'Success',
                description: "New user created",
                status: 'success',
                duration: 2000,
                isClosable: true,
              });

        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
              });
        } finally{
            setLoading(false);
        }
    }
    return {loading, register};
}

export default useRegister;
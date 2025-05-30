import {useState} from "react";
import { useAuthContext } from "../context/AuthContext";
import {useToast} from "@chakra-ui/react";

const useLogout = () => {
    const [loading , setLoading] = useState(false);
    const toast = useToast();

    const {setAuthUser} = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
                method: "POST",
                headers: {"Content-type": "application/json"},
            });
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("current-user");
            setAuthUser(null);

            toast({
                title: 'Success',
                description: "User logged out",
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
        } finally {
            setLoading(false);
        }
    };

    return {loading , logout};
}

export default  useLogout;
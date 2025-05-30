import {useState} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useToast} from "@chakra-ui/react";

const useLogin = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const {setAuthUser} = useAuthContext();

    const login = async (email, password) => {

        if(!email || !password) {
            toast({
                title: 'Error',
                description: "Please fill all the fields",
                status: 'error',
                duration: 2000,
                isClosable: true,
              });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("current-user", JSON.stringify(data));

            setAuthUser(data);

            toast({
                title: 'Success',
                description: "User logged in",
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
    }

    return {loading, login};
}

export default useLogin;
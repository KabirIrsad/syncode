import {useToast} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constants";


const useRunCode = () => {

    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const API = axios.create({
        baseURL: "https://emkc.org/api/v2/piston",
    });

    const executeCode = async (language, sourceCode) => {
        setLoading(true);
        try {
            const response = await API.post("/execute",{
                language: language,
                version: LANGUAGE_VERSIONS[language],
                files:[
                    {
                        content: sourceCode,
                    }
                ]
            });
            const data = await response.data;
            return data;

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

  return {loading, executeCode};
}

export default useRunCode

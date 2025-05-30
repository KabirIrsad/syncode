import { Box, Button } from "@chakra-ui/react"
import useRunCode from "../hooks/useRunCode.jsx";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Output = ({editorRef, language}) => {

    const {loading, executeCode} = useRunCode();
    const [output, setOutput] = useState("");
    const [isError, setIsError] = useState(false);

    const runCode = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line react/prop-types
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        const {run:result} = await executeCode( language, sourceCode)
        setOutput(result.output.split("\n"));
        result.stderr ? setIsError(true) : setIsError(false);
    }

  return (
    <Box className="w-[50%] flex flex-col">
        <Box className="flex flex-row items-center mr-4">
            <span className="text-xl flex font-semibold text-white mb-4 mr-2 flex-1">Output :</span>
            <Button disabled={loading} isLoading={loading} colorScheme="blue" variant='outline' mb={3} onClick={runCode}>Run Code</Button>
        </Box>
        <Box height="81vh" p={2} border="1px solid" borderColor={isError ? "red.500" : '#333'} color={isError ? "red.400" : ""}>
            {output ? output.map((line, i) => <div key={i}>{line}</div>) : 'Click "Run Code" to see the output here'}
        </Box>
    </Box>
  )
}

export default Output

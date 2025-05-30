import { Box, HStack } from "@chakra-ui/react"
import Editor from '@monaco-editor/react';
import { useRef, useState } from "react";
import LangSelector from "./LangSelector";
import Output from "./Output";
// import { CODE_SNIPPETS } from "../constants"

// eslint-disable-next-line react/prop-types
const CodeEditor = ({editorContent, handleEditorChange}) => {

  const editorRef = useRef(null);
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  }

  const onSelect = (language) => {
    setLanguage(language);
    // setValue(
    //   CODE_SNIPPETS[language],
    // )
  };

  return (
    <HStack spacing={4}>
      <Box className="w-[50%]">
        <Box className="text-white">
          <LangSelector language={language} onSelect={onSelect}/>
          <Editor theme="vs-dark" height="81vh" language={language}  defaultValue='' value={editorContent} onChange={handleEditorChange} onMount={onMount}/>
        </Box>
      </Box>
      <Output editorRef={editorRef} language={language}/>
    </HStack>

  )
}

export default CodeEditor;

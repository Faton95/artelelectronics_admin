/*eslint-disable*/
import React, {useState} from "react";
import { Flex } from "@chakra-ui/react";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function CustomEditor({handleNews}) {

    const [news, setNews] = useState(() => EditorState.createEmpty())


    const onEditorStateChange = (news) => {

        setNews(news)
        handleNews(draftToHtml(convertToRaw(news.getCurrentContent())))
    };
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px='30px'
      pb='20px'>
        <Editor
            editorState={news}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
        />
    </Flex>
  );
}

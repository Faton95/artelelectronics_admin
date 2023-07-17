/*eslint-disable*/
import React, {useState} from "react";
import { Flex } from "@chakra-ui/react";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import styles from './Editor.module.scss';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function CustomEditor({handleNews}) {

    const [news, setNews] = useState(() => EditorState.createEmpty())


    const onEditorStateChange = (news) => {

        setNews(news)
        handleNews(draftToHtml(convertToRaw(news.getCurrentContent())))
    };
  return (
        <Editor
            editorState={news}
            wrapperClassName={styles.wrapper}
            editorClassName={styles.editor}
            onEditorStateChange={onEditorStateChange}
        />
  );
}

import React, { useContext, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./css/textarea.css";
import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsLink45Deg,
  BsListUl,
  BsCodeSlash,
  BsBlockquoteLeft,
  BsCodeSquare,
  BsEmojiSmile,
} from "react-icons/bs";
import { MdFormatListNumbered, MdSend } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { GoMention } from "react-icons/go";
import { bold, itallic, strikethrough } from "../Utilities/textboxStyling";
import { GlobalContext } from "../App";
import { convertToHTML } from "draft-convert";
import { sendMessage } from "../Utilities/utilities";
const TextArea = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { addChat } = useContext(GlobalContext);

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleInlineStyleClick = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };
  const handleBlockStyleClick = (style) => {
    setEditorState(RichUtils.toggleBlockType(editorState, style));
  };
  const handleLinking = () => {
    const link = window.prompt("Enter the URL:");
    if (link === null) return; // User clicked "cancel"

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: link }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const selectionState = editorState.getSelection();
    const contentStateWithLink = RichUtils.toggleLink(
      contentState,
      selectionState,
      entityKey
    );

    setEditorState(
      EditorState.push(editorState, contentStateWithLink, "apply-entity")
    );
  };
  const sendChat = () => {
    const contentState = editorState.getCurrentContent();
    const html = convertToHTML(contentState);
    console.log(html);
    console.log(contentState.getPlainText());
    // addChat({
    //   user: "You",
    //   time: Date.now(),
    //   message: html,
    // });
    // sendMessage(html);
    // setText("");
  };

  return (
    <div className="textarea">
      <div className="textarea-container">
        <div className="text-style">
          <div
            className="icon-style"
            onClick={() => handleInlineStyleClick("BOLD")}
          >
            <BsTypeBold />
          </div>
          <div
            className="icon-style"
            onClick={() => handleInlineStyleClick("ITALIC")}
          >
            <BsTypeItalic />
          </div>
          <div
            className="line-left icon-style"
            onClick={() => handleInlineStyleClick("STRIKETHROUGH")}
          >
            <BsTypeStrikethrough />
          </div>
          <div className="line-left icon-style" onClick={() => handleLinking()}>
            <BsLink45Deg />
          </div>
          <div
            className="icon-style"
            onClick={() => handleBlockStyleClick("ordered-list-item")}
          >
            <MdFormatListNumbered />
          </div>
          <div
            className="line-left icon-style"
            onClick={() => handleBlockStyleClick("unordered-list-item")}
          >
            <BsListUl />
          </div>
          <div
            className="line-left icon-style"
            onClick={() => handleBlockStyleClick("blockquote")}
          >
            <BsBlockquoteLeft />
          </div>
          <div
            className="icon-style"
            onClick={() => setEditorState(RichUtils.toggleCode(editorState))}
          >
            <BsCodeSlash />
          </div>
          <div
            className="icon-style"
            onClick={() => handleBlockStyleClick("code-block")}
          >
            <BsCodeSquare />
          </div>
        </div>
        <div
          style={{
            margin: "0.5rem",
            maxHeight: "60px",
            height: "30px",
            color: "gray",
            overflow: "auto",
          }}
        >
          <Editor editorState={editorState} onChange={handleEditorChange} />
        </div>
        <div className="bottom-row">
          <div className="features">
            <div className="line-left icon-style">
              <AiFillPlusCircle fontSize={25} />
            </div>
            <div className="icon-style">
              <BsEmojiSmile />
            </div>
            <div className="icon-style">
              <GoMention />
            </div>
          </div>
          <button className="send" type="button" onClick={() => sendChat()}>
            <MdSend fontSize={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextArea;

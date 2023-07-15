import React, { useContext } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import "./css/quill.css";
import { sendMessage } from "../Utilities/utilities";
import { GlobalContext } from "../App";
import { RxCross1 } from "react-icons/rx";
import { MdSend } from "react-icons/md";

export default function TextEditor() {
  const { addChat } = useContext(GlobalContext);
  const [value, setValue] = useState("");
  const [mention, setMention] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const handleProcedureContentChange = (content) => {
    console.log("content---->", content);
    setValue(content);
  };
  const sendChat = () => {
    addChat({
      user: "You",
      time: Date.now(),
      message: value,
      attachment,
    });
    sendMessage(value, mention ? mention : "", attachment);
    // setValue("");
  };
  const handleMentions = () => {
    const personId = window.prompt("Enter id of person");
    setMention(personId);
  };
  const handleFile = () => {
    const imageUrl = window.prompt("Enter image url");
    setAttachment(imageUrl);
  };

  return (
    <div className="texteditor">
      {mention !== null && (
        <div className="mention">
          @{mention}
          <button onClick={() => setMention(null)}>
            <RxCross1 />
          </button>
        </div>
      )}
      {attachment !== null && (
        <div className="attachment">
          <a href={attachment} target="_blank">
            <img src={attachment} alt="Attachment" />
            <button
              onClick={(e) => {
                e.preventDefault();
                setAttachment(null);
              }}
            >
              <RxCross1 />
            </button>
          </a>
        </div>
      )}
      <ReactQuill
        theme="snow"
        className="quillcss"
        modules={modules}
        formats={formats}
        placeholder="write your content ...."
        onChange={handleProcedureContentChange}
      ></ReactQuill>
      <div className="extra-buttons">
        <div className="features">
          <button
            type="button"
            style={{
              fontSize: "2rem",
              backgroundColor: "#272727",
              borderRadius: "50%",
            }}
            onClick={() => handleFile()}
          >
            +
          </button>
          <button
            style={{ filter: "grayscale()", borderLeft: "1px solid gray" }}
            type="button"
            onClick={() => alert("Emoji button")}
          >
            😊
          </button>
          <button
            type="button"
            style={{
              fontSize: "1.2rem",
            }}
            onClick={() => handleMentions()}
          >
            @
          </button>
        </div>
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "0.5rem",
            borderRadius: "5px",
          }}
          type="button"
          onClick={() => sendChat()}
        >
          <MdSend />
        </button>
      </div>
    </div>
  );
}
var modules = {
  toolbar: [
    ["bold", "italic", "strike"],
    ["link"],
    [{ list: "bullet" }, { list: "ordered" }],
    ["blockquote"],
    ["code-block", "code"],
  ],
};
var formats = [
  "header",
  "height",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "color",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "size",
  "code-block",
  "code",
];

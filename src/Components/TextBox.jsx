import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../App";
import { sendMessage, joinRoom, leaveRoom } from "../Utilities/utilities";

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
import Editor from "./Editor";

export const TextBox = () => {
  const { addChat } = useContext(GlobalContext);
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [room, setRoom] = useState("");
  const [selectedText, setSelectedText] = useState({ from: null, to: null });
  const sendChat = () => {
    addChat({
      user: "You",
      time: Date.now(),
      message: text,
    });
    sendMessage(text, room);
    setText("");
  };
  const joinChat = () => {
    joinRoom(room, () =>
      addChat({
        user: "k-chat",
        message: "Joined Room " + room,
      })
    );
  };
  const leaveChat = () => {
    leaveRoom(room, () =>
      addChat({
        user: "k-chat",
        message: "Joined Room " + room,
      })
    );
  };
  useEffect(() => {
    selectText({ from: null, to: null });
  }, [text]);
  const selectText = () => {
    const userSelection = window.getSelection();
    let from = userSelection.anchorOffset;
    let to = userSelection.focusOffset;
    if (from > to) {
      const temp = from;
      from = to;
      to = temp;
    }
    console.log({
      from,
      to,
    });
    setSelectedText({
      from,
      to,
    });
  };
  const handleInput = (e) => {
    setText(e.target.innerText);
    setHtml(e.target.innerHTML);
  };
  return (
    <div className="textbox-container">
      <div className="textbox">
        <div className="text-style">
          <div
            className="icon-style"
            onClick={() => setText(bold(text, selectedText))}
          >
            <BsTypeBold />
          </div>
          <div
            className="icon-style"
            onClick={() => setText(itallic(text, selectedText))}
          >
            <BsTypeItalic />
          </div>
          <div
            className="line-left icon-style"
            onClick={() => setText(strikethrough(text, selectedText))}
          >
            <BsTypeStrikethrough />
          </div>
          <div className="line-left icon-style">
            <BsLink45Deg />
          </div>
          <div className="icon-style">
            <MdFormatListNumbered />
          </div>
          <div className="line-left icon-style">
            <BsListUl />
          </div>
          <div className="line-left icon-style">
            <BsBlockquoteLeft />
          </div>
          <div className="icon-style">
            <BsCodeSlash />
          </div>
          <div className="icon-style">
            <BsCodeSquare />
          </div>
        </div>
        <Editor text={text} selectText={selectText} handleInput={handleInput} />
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
        <div>
          <p>innerText: {text}</p>
          <p>innerHtml: {html}</p>
          <p>
            {selectedText.from},{selectedText.to}
          </p>
          <p>selected: {text?.slice(selectedText.from, selectedText.to)}</p>
          <p>
            <strong value={<p>tattu</p>} />
          </p>
        </div>
      </div>
    </div>
  );
};

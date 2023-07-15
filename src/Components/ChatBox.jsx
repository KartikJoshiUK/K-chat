import React, { useContext } from "react";
import { GlobalContext } from "../App";
const parseDate = (date) => {
  const parsedDate = new Date(date).toTimeString().slice(0, 6);
  return parsedDate;
};
export const ChatBox = () => {
  const { chats } = useContext(GlobalContext);
  return (
    <div id="chatBox" className="chatbox">
      {chats.map((chat) => (
        <div
          className={`message-box ${
            chat.user === "You"
              ? "user-message-box"
              : chat.user === "k-chat"
              ? "kchat-message-box"
              : ""
          }`}
          key={chat.time}
        >
          <div className="message">
            <span className="user">{chat.user}</span>
            {chat.attachment && (
              <a
                target="_blank"
                className="attachment-recieved"
                href={chat.attachment}
              >
                <img src={chat.attachment} alt="attachment" />
              </a>
            )}
            <div dangerouslySetInnerHTML={{ __html: chat.message }} />
            <span className="message-time">{parseDate(chat.time)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

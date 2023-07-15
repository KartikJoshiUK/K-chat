import { useEffect } from "react";
import "./App.css";
import { ChatBox } from "./Components/ChatBox";
import { TextBox } from "./Components/TextBox";
import { createContext } from "react";
import { useArray } from "./Utilities/hooks";
import { socket } from "./Utilities/utilities";
import Navbar from "./Components/Navbar";
import TextEditor from "./Components/TextEditor";
import RichTextEditor from "./Components/RichTextEditor";
import TextArea from "./Components/TextArea";
export const GlobalContext = createContext();

function App() {
  const [chats, setChats, addChat] = useArray([]);
  const scrollToBottom = () => {
    const chatBox = document.getElementById("chatBox");
    chatBox.scrollTop = chatBox.scrollHeight;
  };
  useEffect(() => {
    socket.on("connect", () => {
      addChat({
        user: "k-chat",
        message: "connection with id " + socket.id,
        time: Date.now(),
      });
    });
    socket.on("recieve-event", (message) => {
      console.log("response", message);
      if (message.user !== socket.id) {
        addChat(message);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("recieve-event");
    };
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [chats]);
  return (
    <div className="app">
      <GlobalContext.Provider value={{ chats, setChats, addChat }}>
        <Navbar />
        <div className="container">
          <ChatBox />
          <TextEditor />
        </div>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;

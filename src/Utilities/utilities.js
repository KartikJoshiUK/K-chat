import io from "socket.io-client";
const serverUrl = "http://localhost:3000";
export const socket = io(serverUrl);

export const sendMessage = (message, room = "", attachment, callback) => {
  const object = attachment
    ? {
        user: socket.id,
        message,
        attachment,
      }
    : {
        user: socket.id,
        message,
      };
  socket.emit("send-event", object, room);
};
export const joinRoom = (room, callback) => {
  if (room.length > 0) {
    socket.emit("join-event", room, () => {
      callback();
    });
  }
};
export const leaveRoom = (room, callback) => {
  if (room.length > 0) {
    socket.emit("leave-event", room, () => {
      callback();
    });
  }
};

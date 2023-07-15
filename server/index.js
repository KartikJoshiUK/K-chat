const port = 3000;
const io = require("socket.io")(port, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  socket.on("send-event", (message, room) => {
    console.log(message, room);
    message.time = Date.now();
    if (room.length === 0) socket.broadcast.emit("recieve-event", message);
    else socket.to(room).emit("recieve-event", message);
  });
  socket.on("join-event", (room, callback) => {
    socket.join(room);
    callback();
  });
  socket.on("leave-event", (room, callback) => {
    socket.leave(room);
    callback();
  });
});

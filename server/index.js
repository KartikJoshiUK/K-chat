require("dotenv").config();
const port = process.env.PORT || 3000;
const corsURL1 = process.env.CORS1;
const corsURL2 = process.env.CORS2;

const io = require("socket.io")(port, {
  cors: {
    origin: [corsURL1, corsURL2],
  },
});

io.on("connection", (socket) => {
  console.log("Server Running");
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

// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg); // Broadcast the message to all connected clients
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });
// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//   console.log(`Listening on *:${port}`);
// });
// // server.listen(3000, () => {
// //   console.log("Listening on *:3000");
// // });
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msg) => {
    const messageWithEmojis = replaceEmojis(msg); // Process emojis
    io.emit("chat message", messageWithEmojis); // Broadcast the processed message
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on *:${port}`);
});

// Emoji map and replaceEmojis function
function replaceEmojis(message) {
  const emojiMap = {
    "⚛️": "react",
    "😲": "woah",
    "👋": "hey",
    "😂": "lol",
    "🤍": "like",
    "🎉": "congratulations",
  };

  for (const emoji in emojiMap) {
    const keyword = emojiMap[emoji];
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    message = message.replace(regex, emoji);
  }
  return message;
}

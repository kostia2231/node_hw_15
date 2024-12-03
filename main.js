import express from "express";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 3333;

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`user connected`);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected`);
  });
});

server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

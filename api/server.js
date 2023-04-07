const express = require("express");
const server = express();

const arabaRouter = require("./arabalar/arabalar-router");
const showroomRouter = require("./showroomlar/showroomlar-router");

server.use(express.json());
server.use("/api/showroomlar", showroomRouter);
server.use("/api/arabalar", arabaRouter);

server.use("/", async (req, res, next) => {
  res.status(200).json({ message: "Server is working" });
});
server.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Bu hata Server.js tarafından handle edildi",
  });
});

module.exports = server;

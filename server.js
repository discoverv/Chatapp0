const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on("connection", (socket) => {
    console.log("Novo utilizador conectado");

    socket.on("setName", (name) => {
        socket.username = name;
        socket.broadcast.emit("message", `${name} entrou no chat!`);
    });

    socket.on("message", (data) => {
        io.emit("message", `${socket.username}: ${data}`);
    });

    socket.on("typing", () => {
        socket.broadcast.emit("typing", `${socket.username} está a escrever...`);
    });

    socket.on("stopTyping", () => {
        socket.broadcast.emit("stopTyping");
    });

    socket.on("disconnect", () => {
        io.emit("message", `${socket.username} saiu do chat.`);
    });
});

server.listen(3000, () => {
    console.log("Servidor a correr em http://localhost:3000");
});

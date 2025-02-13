const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir ficheiros estáticos (frontend)
app.use(express.static(path.join(__dirname, "public")));

// Gestão de conexões e mensagens
io.on("connection", (socket) => {
    console.log("Novo utilizador conectado!");

    // Quando uma mensagem é enviada
    socket.on("mensagem", (data) => {
        io.emit("mensagem", data); // Envia a mensagem para todos os utilizadores
    });

    // Quando um utilizador está a escrever
    socket.on("digitando", (username) => {
        socket.broadcast.emit("digitando", username);
    });

    // Quando o utilizador se desconecta
    socket.on("disconnect", () => {
        console.log("Utilizador desconectado");
    });
});

// Iniciar o servidor
server.listen(3000, () => {
    console.log("Servidor a correr em http://localhost:3000");
});

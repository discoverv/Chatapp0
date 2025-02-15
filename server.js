const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir ficheiros da pasta public
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Um utilizador entrou no chat!');

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    socket.on('typing', (name) => {
        socket.broadcast.emit('typing', name);
    });

    socket.on('disconnect', () => {
        console.log('Um utilizador saiu.');
    });
});

server.listen(3000, () => {
    console.log('Servidor a correr na porta 3000');
});

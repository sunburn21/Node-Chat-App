const http = require('http');
const express = require('express');
const socketIO = require('socket.io')
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log("New user connected!");
    socket.on('disconnect', () => {
        console.log('Disconnected');
    })
    // socket.emit('newMessage', {
    //     
    // });
    socket.emit('newMessage', {
        from: 'Admin',
        text: "Welcome to the chatroom!",
        createdAt: new Date
    });
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: "New user joined!",
        createdAt: new Date
    });
    socket.on('createMessage', (data) => {
        socket.broadcast.emit('newMessage', {
            // from: "Sunny",
            // text: "Something just like this!",
            // createdAt: new Date
            from: data.from,
            text: data.text,
            createdAt: new Date
        })
    })
})

app.use(express.static(publicPath))
server.listen(port, () => {
    console.log('Server is up!');
})
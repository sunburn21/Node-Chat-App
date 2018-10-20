const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');
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
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user added!'));
    socket.on('createMessage', (data, callback) => {
        io.emit('newMessage', generateMessage(data.from, data.text));
        callback('Successfully completed!');
    })

})

app.use(express.static(publicPath));
server.listen(port, () => {
    console.log('Server is up!');
})
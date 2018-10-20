var message_text = document.getElementById('message-text');
var send_btn = document.getElementById('send');
var messages = document.getElementById('messages');


const socket = io();
socket.on('connect', function () {
    console.log("Connected to server!");
})
socket.on('disconnect', function () {
    console.log("Disconnected from the server!");
})

socket.on('newMessage', function (data) {
    var ordrdList = document.createElement("ol");
    var listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(`${data.from} ${data.text}`));
    ordrdList.appendChild(listItem);
    messages.appendChild(ordrdList);
    console.log(data);
});



send_btn.addEventListener('click', function (e) {
    socket.emit('createMessage', {
        from: "User",
        text: message_text.value
    }, function (data) {
        console.log(data);
    })
});
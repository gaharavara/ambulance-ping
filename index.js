var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var users_on_alert = -1;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/server', (req, res) => {
    res.sendFile(__dirname + '/server.html');
});

app.get('/client', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    users_on_alert++;
    socket.on('disconnect', () => {
        console.log('user disconnected');
        users_on_alert--;
        io.emit('chat message', "One vehicle just go out of the ambulance's range!!");
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('client', (msg) => {
        io.emit('client', msg);
    });
});

http.listen(7000, () => {
    console.log('listening on *:7000');
});
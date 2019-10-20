var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/client', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('chat message', 'Oops, we lost one user');
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
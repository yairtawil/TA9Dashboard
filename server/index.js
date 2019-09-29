const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

const config = require('./config');
const DB = require('./db');

const db = new DB();
const users = db.createCollection('users');

app.use(cors());

app.get('/users', (req, res) => {
  res.send(users.data());
});

server.listen(3000, () => {
  console.log(`Server listening on ${config.port}`);
});

const usersSocket = io.of('users');

usersSocket.on('connection', (socket) => {
  usersSocket.emit('[SOCKET] All Users', users.data());

  socket.on('[SOCKET] Connect', (user) => {
    users.insert(user);
    usersSocket.emit('[SOCKET] Connect', user);
  });

  socket.on('disconnect', () => {
    users.update({ id: socket.conn.id, changes: { isConnected: false } });
    usersSocket.emit('[SOCKET] Disconnect', socket.conn.id);
  });
});

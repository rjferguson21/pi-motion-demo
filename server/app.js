const server = require('http').createServer()
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ server: server })
const express = require('express')
const app = express()
const port = 3000;

// Broadcast function to send a motion event to all connected clients.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

// Express route for the webhook to signifiy that motion was received
app.get('/motion', function (req, res) {
  wss.broadcast('motion');
  res.send('Thanks for the motion.');
})

// For debugging
wss.on('connection', function connection(ws) {
  ws.send('connected');
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });
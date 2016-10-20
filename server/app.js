const server = require('http').createServer()
const url = require('url')
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ server: server })
const express = require('express')
const app = express()
const port = 3000;
const EventEmitter = require('events');
const motionEvents = new EventEmitter();

app.get('/motion', function (req, res) {
  motionEvents.emit('motion');
  res.send('Thanks for the motion.');
})

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

wss.on('connection', function connection(ws) {
  ws.send('connected');
});

motionEvents.on('motion', function(){
  wss.broadcast('motion');
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });
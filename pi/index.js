const Gpio = require('onoff').Gpio;
const button = new Gpio(4, 'in', 'both');
const http = require('http');

const nodeAppHost = '192.168.1.122';
const nodeAppPort = 3000;

let motion = function() {
   http.get({
    hostname: nodeAppHost,
    port: nodeAppPort,
    path: '/motion',
    agent: false  // create a new agent just for this one request
  }, (res) => {
    console.log(res.statusCode);
  }); 
}

button.watch(function(err, value) {
  console.log(value);
  if (value === 1) {
    motion();
  }  
});

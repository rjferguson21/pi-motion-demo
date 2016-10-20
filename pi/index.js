const Gpio = require('onoff').Gpio;
const motionSensor = new Gpio(4, 'in', 'both');
const http = require('http');

// IP of node app
const nodeAppHost = '192.168.1.122';
const nodeAppPort = 3000;
const motionPath = '/motion';

// function to make http request to node app server
let motion = function() {
   http.get({
    hostname: nodeAppHost,
    port: nodeAppPort,
    path: '/motion',
    agent: false
  }, (res) => {
    console.log(res.statusCode);
  }); 
};

// Wait for GPIO to turn on. 
// Value is going to be 1 if the motion sensor detects motion,
// after a second or two the pin will turn back to 0.
motionSensor.watch(function(err, value) {
  console.log(value);

  // If the pin reads 1, we have motion!
  if (value === 1) {
    motion();
  }  
});

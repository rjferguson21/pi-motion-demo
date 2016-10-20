const app = angular.module('app', []);

app.controller('AppCtrl', function($rootScope) {
  const appCtrl = this;

  // Array of motion events
  appCtrl.motionEvents = [];

  // Websocket connection
  const ws = new WebSocket("ws://localhost:3000");
  
  ws.onopen = function (event) {
    // When a message is received push another motion even on the array
    ws.onmessage = function (event) {
      appCtrl.motionEvents.push(event.data + " " + new Date());
      $rootScope.$apply();
    }
  };
});
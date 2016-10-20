const app = angular.module('app', []);

app.controller('AppCtrl', function($rootScope) {
  const appCtrl = this;
  appCtrl.motionEvents = [];

  // Websocket connection
  const ws = new WebSocket("ws://localhost:3000");
  
  ws.onopen = function (event) {
    ws.onmessage = function (event) {
      appCtrl.motionEvents.push(event.data + " " + new Date());
      $rootScope.$apply();
    }
  };
});
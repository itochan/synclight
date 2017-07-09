(function (){
  window.onload = function(){
    var wsProtocol = window.location.protocol == 'https:' ? 'wss' : 'ws';
    var ws = new WebSocket(wsProtocol + '://' + window.location.host + '/websocket');

    var light = document.getElementById('light');

    ws.onopen = function() {
      console.log('connection opened');
    }
    ws.onclose = function() {
      console.log('connection closed');
    }
    ws.onmessage = function(m) {
      light.style.backgroundColor = m.data;
    }
  }
})();

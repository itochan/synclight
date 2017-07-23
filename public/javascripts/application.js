(function (){
  supportWebSocket = 'WebSocket' in window;
  if (!supportWebSocket) {
    console.log("WebSocket is not supported.");
    setTimeout("location.reload()", 1500);
    return;
  }

  window.onload = function connect() {
    var wsProtocol = window.location.protocol == 'https:' ? 'wss' : 'ws';
    var ws = new WebSocket(wsProtocol + '://' + window.location.host + '/websocket');

    var light = document.getElementById('light');

    ws.onopen = function() {
      console.log('connection opened');
    }
    ws.onclose = function() {
      console.log('connection closed');
      console.log('retrying...');
      setTimeout(function () {
        connect()
      }, 2000);
    }
    ws.onmessage = function(m) {
      light.style.backgroundColor = m.data;
    }
  }
})();

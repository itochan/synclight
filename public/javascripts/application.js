(function (){
  window.onload = function(){
    var ws = new WebSocket('ws://' + window.location.host + "/websocket");

    var light = document.getElementById('light');

    ws.onopen = function() {
      console.log("connection opened");
    }
    ws.onclose = function() {
      console.log("connection closed");
    }
    ws.onmessage = function(m) {
      light.style.backgroundColor = m.data;
    }
  }
})();


function InitiateWSConnection() {
  const ws_client = new WebSocket("ws://localhost:3001");

  ws_client.onopen = () => {
    console.log("WebSocket connection established");
  };

  ws_client.onclose = () => {
    console.log("WebSocket connection closed");
  };

  ws_client.onerror = (err) => {
    console.log(`WebSocket error: ${err}`);
  };

  return ws_client
}

export default InitiateWSConnection();
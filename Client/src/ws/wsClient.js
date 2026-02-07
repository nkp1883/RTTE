export function createWS() {
  const ws = new WebSocket("ws://localhost:1234"); 
  // ⬆️ change port if your backend uses a different one

  ws.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  ws.onerror = (err) => {
    console.error("❌ WebSocket error", err);
  };

  ws.onclose = () => {
    console.log("⚠️ WebSocket closed");
  };

  return ws;
}

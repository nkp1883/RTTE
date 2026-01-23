import WebSocket, { WebSocketServer } from "ws";
import * as Y from "yjs";

const ydoc = new Y.Doc();
ydoc.getText("content");

export function startWSServer(port) {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    // Send full document state to new client
    const state = Y.encodeStateAsUpdate(ydoc);
    ws.send(state);

    ws.on("message", (update) => {
      Y.applyUpdate(ydoc, update);

      // Broadcast update to others
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(update);
        }
      });
    });
  });

  console.log(`✅ WebSocket server running on ws://localhost:${port}`);
}

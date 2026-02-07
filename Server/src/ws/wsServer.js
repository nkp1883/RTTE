import WebSocket, { WebSocketServer } from "ws";
import * as Y from "yjs";
import { Awareness, encodeAwarenessUpdate, applyAwarenessUpdate } from "y-protocols/awareness";

const ydoc = new Y.Doc();
ydoc.getText("content");

const awareness = new Awareness(ydoc);

export function startWSServer(port) {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    console.log("✅ New client connected");

    // Send full doc state
    const state = Y.encodeStateAsUpdate(ydoc);
    ws.send(JSON.stringify({ type: "sync", data: Array.from(state) }));

    // Send current awareness states
    const awarenessStates = encodeAwarenessUpdate(
      awareness,
      Array.from(awareness.getStates().keys())
    );
    ws.send(JSON.stringify({ type: "awareness", data: Array.from(awarenessStates) }));

    ws.on("message", (msg) => {
      const message = JSON.parse(msg.toString());

      if (message.type === "sync") {
        const update = new Uint8Array(message.data);
        Y.applyUpdate(ydoc, update);

        // broadcast doc update
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "sync", data: Array.from(update) }));
          }
        });
      }

      if (message.type === "awareness") {
        const update = new Uint8Array(message.data);
        applyAwarenessUpdate(awareness, update, ws);

        // broadcast awareness update
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "awareness", data: Array.from(update) }));
          }
        });
      }
    });

    ws.on("close", () => {
      // remove awareness of that client
      awareness.removeStates([ws], null);
      console.log("❌ Client disconnected");
    });
  });

  console.log(`✅ WebSocket server running on ws://localhost:${port}`);
}

startWSServer(1235);

import * as Y from "yjs";
import { Awareness } from "y-protocols/awareness";
import { createWS } from "../ws/wsClient";

export function createYjsProvider() {
  const ydoc = new Y.Doc();
  const awareness = new Awareness(ydoc);
  const ws = createWS();

  ws.binaryType = "arraybuffer";

  ws.onmessage = (event) => {
    const update = new Uint8Array(event.data);
    Y.applyUpdate(ydoc, update);
  };

  ydoc.on("update", (update) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(update);
    }
  });

  return { ydoc, awareness };
}

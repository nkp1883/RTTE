import React, { useEffect, useRef } from "react";
import * as Y from "yjs";
import Quill from "quill";
import { QuillBinding } from "y-quill";
import "quill/dist/quill.snow.css";

import {
  Awareness,
  encodeAwarenessUpdate,
  applyAwarenessUpdate,
} from "y-protocols/awareness";

export default function TextEditor() {
  const editorRef = useRef(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const ytext = ydoc.getText("content");

    // Awareness
    const awareness = new Awareness(ydoc);

    // Random user identity
    const userName = "User-" + Math.floor(Math.random() * 1000);
    const userColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    awareness.setLocalStateField("user", {
      name: userName,
      color: userColor,
    });

    // Setup Quill
    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Start typing...",
    });

    // Bind Yjs <-> Quill
    const binding = new QuillBinding(ytext, quill, awareness);

    // Connect WebSocket
    const ws = new WebSocket("ws://localhost:1235");

    ws.onopen = () => console.log("✅ WS Connected");
    ws.onclose = () => console.log("❌ WS Closed");

    // Receive messages
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "sync") {
        const update = new Uint8Array(message.data);
        Y.applyUpdate(ydoc, update);
      }

      if (message.type === "awareness") {
        const update = new Uint8Array(message.data);
        applyAwarenessUpdate(awareness, update, ws);
      }
    };

    // Send doc updates
    ydoc.on("update", (update) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "sync", data: Array.from(update) }));
      }
    });

    // Send awareness updates (cursor, user)
    awareness.on("update", ({ added, updated, removed }) => {
      const changedClients = added.concat(updated).concat(removed);

      const update = encodeAwarenessUpdate(awareness, changedClients);

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "awareness", data: Array.from(update) }));
      }
    });

    return () => {
      ws.close();
      binding.destroy();
      ydoc.destroy();
    };
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto" }}>
      <h2>Realtime Collaborative Editor (with Cursor)</h2>
      <div ref={editorRef} style={{ height: "400px" }} />
    </div>
  );
}

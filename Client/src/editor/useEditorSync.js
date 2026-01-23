import { useEffect, useRef } from "react";
import * as Y from "yjs";
import { createWS } from "../ws/wsClient";

export function useEditorSync(textareaRef) {
  const ydocRef = useRef(new Y.Doc());
  const ytextRef = useRef(ydocRef.current.getText("content"));
  const wsRef = useRef(null);
  const isRemoteUpdate = useRef(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return; // ⬅️ IMPORTANT GUARD

    const ws = createWS();
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    // Receive updates from server
    ws.onmessage = (event) => {
      isRemoteUpdate.current = true;
      Y.applyUpdate(ydocRef.current, new Uint8Array(event.data));
      isRemoteUpdate.current = false;
    };

    // Send local updates to server
    ydocRef.current.on("update", (update) => {
      if (
        ws.readyState === WebSocket.OPEN &&
        !isRemoteUpdate.current
      ) {
        ws.send(update);
      }
    });

    // Apply Yjs → textarea
    const observer = () => {
      textarea.value = ytextRef.current.toString();
    };
    ytextRef.current.observe(observer);

    // Apply textarea → Yjs
    const onInput = () => {
      if (isRemoteUpdate.current) return;

      const text = textarea.value;

      ydocRef.current.transact(() => {
        ytextRef.current.delete(0, ytextRef.current.length);
        ytextRef.current.insert(0, text);
      });
    };

    textarea.addEventListener("input", onInput);

    return () => {
      ytextRef.current.unobserve(observer);
      textarea.removeEventListener("input", onInput);
      ws.close();
    };
  }, [textareaRef]); // ⬅️ dependency added
}

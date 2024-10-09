import { useEffect, useState } from "react";

export default function CopyToClipboard({ color }) {
  const [message, setMessage] = useState("Copy");

  useEffect(() => {
    const timeout = setTimeout(() => setMessage("Copy"), 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  async function handleCopy() {
    setMessage("Successfully copied!");
    await navigator.clipboard.writeText(color);
  }

  return (
    <button type="button" onClick={handleCopy}>
      {message}
    </button>
  );
}

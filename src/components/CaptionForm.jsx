import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CaptionForm = ({ addCaption, duration }) => {
  const [text, setText] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedTimestamp = parseFloat(timestamp);
    if (
      text &&
      timestamp &&
      parsedTimestamp >= 0 &&
      parsedTimestamp <= duration
    ) {
      addCaption({ id: uuidv4(), text, timestamp: parsedTimestamp });
      setText("");
      setTimestamp("");
      setError("");
    } else {
      setError(`Timestamp must be between 0 and ${duration} seconds.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="caption-form">
      <input
        type="text"
        placeholder="Caption text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.1"
        placeholder={`Timestamp (0-${duration}) sec`}
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        required
      />
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Add Caption</button>
    </form>
  );
};

export default CaptionForm;

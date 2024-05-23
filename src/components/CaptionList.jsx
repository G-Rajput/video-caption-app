import React, { useState } from "react";

const CaptionList = ({ captions, removeCaption, editCaption }) => {
  const [editedCaption, setEditedCaption] = useState({
    id: "",
    text: "",
    timestamp: "",
  });

  const handleEdit = (caption) => {
    setEditedCaption({
      id: caption.id,
      text: caption.text,
      timestamp: caption.timestamp,
    });
  };

  const handleSaveEdit = () => {
    editCaption(editedCaption);
    setEditedCaption({ id: "", text: "", timestamp: "" });
  };

  const handleCancelEdit = () => {
    setEditedCaption({ id: "", text: "", timestamp: "" });
  };

  const handleChange = (e) => {
    setEditedCaption({ ...editedCaption, [e.target.name]: e.target.value });
  };

  return (
    <ul className="caption-list">
      {captions.map((caption) => (
        <li key={caption.id}>
          {caption.timestamp}s: {caption.text}
          <button onClick={() => handleEdit(caption)}>Edit</button>
          <button
            className="remove-btn"
            onClick={() => removeCaption(caption.id)}
          >
            Remove
          </button>
          {editedCaption.id === caption.id && (
            <div className="edit-form">
              <input
                type="text"
                name="text"
                value={editedCaption.text}
                onChange={handleChange}
                placeholder="Caption text"
                required
              />
              <input
                type="number"
                name="timestamp"
                step="0.1"
                value={editedCaption.timestamp}
                onChange={handleChange}
                placeholder="Timestamp (seconds)"
                required
              />
              <button onClick={handleSaveEdit}>Save</button>
              <button className="remove-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CaptionList;

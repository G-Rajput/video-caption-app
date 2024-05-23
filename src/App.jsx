import React, { useState } from "react";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer";
import CaptionForm from "./components/CaptionForm";
import CaptionList from "./components/CaptionList";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [duration, setDuration] = useState(0);

  const addCaption = (caption) => {
    setCaptions([...captions, caption]);
  };

  const removeCaption = (id) => {
    setCaptions(captions.filter((caption) => caption.id !== id));
  };

  const editCaption = (editedCaption) => {
    setCaptions(
      captions.map((caption) =>
        caption.id === editedCaption.id ? { ...editedCaption } : caption
      )
    );
  };
  return (
    <div className="app">
      <h1>Video Caption App</h1>
      <input
        type="text"
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      {videoUrl && (
        <VideoPlayer
          videoUrl={videoUrl}
          captions={captions}
          onDuration={setDuration}
        />
      )}
      {videoUrl && duration > 0 && (
        <>
          <CaptionForm addCaption={addCaption} duration={duration} />
          <CaptionList
            captions={captions}
            removeCaption={removeCaption}
            editCaption={editCaption}
            duration={duration}
          />
        </>
      )}
    </div>
  );
};

export default App;

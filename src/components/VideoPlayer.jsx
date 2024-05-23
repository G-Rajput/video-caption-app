import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl, captions, onDuration }) => {
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleReady = () => {
    setLoading(false);
    setError("");
    if (playerRef.current) {
      onDuration(playerRef.current.getDuration());
    }
  };

  const handleError = () => {
    setLoading(false);
    setError(
      "No video found. Please add a valid URL, (Example:Youtube video url)."
    );
  };

  return (
    <>
      {loading && !error && <p>Loading video, please wait...</p>}
      {error ? (
        <p className="">{error}</p>
      ) : (
        <div className="video-container">
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            controls={false}
            width="100%"
            onReady={handleReady}
            onError={handleError}
          />

          <div className="captions">
            {captions
              .filter((caption) => currentTime >= parseFloat(caption.timestamp))
              .map((caption) => (
                <div key={caption.id} className="caption">
                  {caption.text}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;

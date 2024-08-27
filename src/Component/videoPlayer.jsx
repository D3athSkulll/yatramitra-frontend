import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Video = (props) => {
  const videoNode = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (videoNode.current) {
      const _player = videojs(videoNode.current, props);
      setPlayer(_player);
      return () => {
        if (player !== null) {
          player.dispose();
        }
      };
    }
  }, []);

  return (
    <>
      <video
        ref={videoNode}
        className="video-js"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: -14,
          left: 0,
          objectFit: "cover",
          zIndex: -1,
        }}
      ></video>
    </>
  );
};

export default function App() {
  const play = {
    fill: true,
    fluid: true,
    autoplay: true,
    loop: true,
    controls: false, // Consider disabling controls for a background video
    muted: true,
    preload: "metadata",
    sources: [
      {
        src: "/title.m3u8",
        type: "application/x-mpegURL",
      },
    ],
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <Video {...play} />
    </div>
  );
}

"use client";
import { useEffect, useRef, VideoHTMLAttributes } from "react";

const timestamp = 10;

const Video = (props: VideoHTMLAttributes<HTMLVideoElement>) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", () => {
        if (video.currentTime > timestamp) {
          video.play;
          video.currentTime = 0;
          video.play();
        }
      });
    }
  }, []);

  return <video {...props} ref={videoRef} />;
};

export default Video;

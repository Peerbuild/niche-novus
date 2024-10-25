"use client";
import { use, useEffect, useRef, VideoHTMLAttributes } from "react";

const timestamp = 10;

const Video = ({
  isActive,
  ...props
}: VideoHTMLAttributes<HTMLVideoElement> & { isActive?: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isActive]);

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

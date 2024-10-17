"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

const Player = ({ videoId }: { videoId: string }) => {
  const [mounted, setIsMounted] = useState(false);
  const [playerState, setPlayerState] = useState({
    main: false,
    secondary: false,
  });

  useEffect(() => {
    setIsMounted(true);
  }, [mounted]);

  if (!mounted) {
    return null;
  }
  console.log(playerState.main, playerState.secondary);
  const handleOnReady = () => {
    setPlayerState({
      ...playerState,
      main: true,
    });
  };

  const handleOnReady2 = () => {
    setPlayerState({
      ...playerState,
      secondary: true,
    });
  };
  return (
    <div className="w-full aspect-video relative">
      <div className="w-full h-full  p-0.5 bg-gradient-to-t from-neutral-600 to bg-neutral-300">
        <div className="w-full h-full  overflow-hidden">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            playing={playerState.main && playerState.secondary}
            onReady={handleOnReady}
            onPause={() => setPlayerState({ ...playerState, secondary: false })}
            onPlay={() => setPlayerState({ ...playerState, secondary: true })}
            width={"100%"}
            height={"100%"}
            style={{
              scale: 1.01,
            }}
            muted
            controls
          />
        </div>
      </div>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width={"100%"}
        height={"100%"}
        playing={playerState.main && playerState.secondary}
        onReady={handleOnReady2}
        style={{
          zIndex: -10,
          position: "absolute",
          inset: 0,
          filter: "blur(80px)",
        }}
        muted
      />
    </div>
  );
};

export default Player;

import { useEffect, useRef, useState } from "react";
import { VideoPlayer, VideoPauseButton, VideoPlayerButton, VideoPlayerContent } from "./styled";
import playButton from "../../../assets/images/play.png";
import pauseButton from "../../../assets/images/pause.png";

interface Data {
  url: string;
}

const AdminUserVideoListPlayer = (props:Data):JSX.Element => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [showPlayBtn, setShowPlayBtn] = useState(true);
  const [videoSourceUrl, setVideoSourceUrl] = useState("");

  const handleVideo = () => {
    if (playerRef.current.paused) {
      playerRef.current.play().then(() => setShowPlayBtn(false)).catch(() => {
        if (playerRef.current.paused) {
          setShowPlayBtn(true);
        }
      });
    } else if (!playerRef.current.paused) {
      playerRef.current.pause();
      setShowPlayBtn(true);
    }
  };

  useEffect(() => {
    setVideoSourceUrl(props.url);
  });

  return (
    <VideoPlayerContent>
      {
        (showPlayBtn) ? (
          <VideoPlayerButton src={playButton} onClick={handleVideo} />
        ) : (
          <VideoPauseButton className="admin-dashboard-video-pause-button" src={pauseButton} onClick={handleVideo} />
        )
      }
      <VideoPlayer ref={playerRef}>
        <source src={videoSourceUrl} />
      </VideoPlayer>
    </VideoPlayerContent>
  );
};

export default AdminUserVideoListPlayer;

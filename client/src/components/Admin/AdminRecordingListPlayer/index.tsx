import { useEffect, useRef, useState } from "react";
import { VideoPlayer, VideoPauseButton, VideoPlayerButton, VideoPlayerContent, PauseButtonSection } from "./styled";
import playButton from "../../../assets/images/play.png";
import pauseButton from "../../../assets/images/pause.png";

interface Data {
  url: string;
}

const AdminUserRecordingListPlayer = (props:Data):JSX.Element => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [videoSourceUrl, setVideoSourceUrl] = useState("");
  const [showPlayBtn, setShowPlayBtn] = useState(true);
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
    <VideoPlayerContent className="admin-dashboard-video">
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

export default AdminUserRecordingListPlayer;

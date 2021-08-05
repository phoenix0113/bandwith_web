import { useEffect, useRef, useState } from "react";
import { ButtonSection, VideoPlayer, VideoPlayerButton, VideoPauseButton, VideoPlayerContent } from "../styled";
import playButton from "../../../assets/images/admin/play.svg";
import pauseButton from "../../../assets/images/admin/pause.png";

interface Data {
  url: string;
}

const AdminRecording = (props:Data):JSX.Element => {
  const [videoUrl, setVideoUrl] = useState("");
  const playerRef = useRef<HTMLVideoElement>(null);
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
    setVideoUrl(props.url);
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
        <source src={videoUrl} />
      </VideoPlayer>
    </VideoPlayerContent>
  );
};

export default AdminRecording;

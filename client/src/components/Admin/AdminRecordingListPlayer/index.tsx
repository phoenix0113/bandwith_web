import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { VideoPlayer, VideoPauseButton, VideoPlayerButton, VideoPlayerContent } from "./styled";
import { GetRecordResponse } from "../../../shared/interfaces";
import playButton from "../../../assets/images/play.png";
import pauseButton from "../../../assets/images/pause.png";

const tempRecordingFile = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

interface IProps {
  currentRecording: GetRecordResponse;
  type: string;
}

const AdminUserRecordingListPlayer = ({ currentRecording, type }:IProps):JSX.Element => {
  const history = useHistory();
  const playerRef = useRef<HTMLVideoElement>(null);
  const [showPlayBtn, setShowPlayBtn] = useState(true);

  let timer;

  const onClickRecording = () => {
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

  const onDoubleClickRecording = () => {
    let router = "/admin/recording/";
    router += type;
    router += "/";
    router += currentRecording._id;
    history.push(router);
  };

  const handleVideo = (event) => {
    clearTimeout(timer);
    if (event.detail === 1) {
      timer = setTimeout(onClickRecording, 200);
    } else if (event.detail === 2) {
      onDoubleClickRecording();
    }
  };

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
        <source src={currentRecording.list[0].url} />
        {/* <source src={tempRecordingFile} /> */}
      </VideoPlayer>
    </VideoPlayerContent>
  );
};

export default AdminUserRecordingListPlayer;

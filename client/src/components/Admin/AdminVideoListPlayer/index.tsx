import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { VideoPlayer, VideoPauseButton, VideoPlayerButton, VideoPlayerContent } from "./styled";
import playButton from "../../../assets/images/play.png";
import pauseButton from "../../../assets/images/pause.png";

interface Data {
  url: string;
  id: string;
  type: string;
}

const AdminUserVideoListPlayer = (props:Data):JSX.Element => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [videoSourceUrl, setVideoSourceUrl] = useState("");
  const [videoID, setVideoID] = useState("");
  const [type, setType] = useState("");

  const history = useHistory();
  const handleVideo = (id: string) => {
    let router = "/admin/video/";
    router += id;
    router += "/";
    router += type;
    history.push(router);
  };

  useEffect(() => {
    setVideoSourceUrl(props.url);
    setVideoID(props.id);
    setType(props.type);
  });

  return (
    <VideoPlayerContent onClick={() => handleVideo(videoID)}>
      <VideoPlayerButton src={playButton} />
      <VideoPlayer ref={playerRef}>
        <source src={videoSourceUrl} />
      </VideoPlayer>
    </VideoPlayerContent>
  );
};

export default AdminUserVideoListPlayer;

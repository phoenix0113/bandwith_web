import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ButtonSection, VideoPlayer, VideoPlayerButton, VideoPlayerContent } from "../styled";
import playButton from "../../../assets/images/admin/play.svg";

interface Data {
  url: string;
  id: string;
}

const AdminVideo = (props:Data):JSX.Element => {
  const [videoUrl, setVideoUrl] = useState("");
  const playerRef = useRef<HTMLVideoElement>(null);
  const [videoID, setVideoID] = useState("");
  const history = useHistory();
  const handleVideo = (id: string) => {
    let router = "/admin/video/";
    router += id;
    router += "/latest";
    history.push(router);
  };

  useEffect(() => {
    setVideoUrl(props.url);
    setVideoID(props.id);
  });

  return (
    <VideoPlayerContent className="admin-dashboard-video">
      <ButtonSection>
        <VideoPlayerButton src={playButton} />
      </ButtonSection>

      <VideoPlayer ref={playerRef} onClick={() => handleVideo(videoID)}>
        <source src={videoUrl} />
      </VideoPlayer>
    </VideoPlayerContent>
  );
};

export default AdminVideo;

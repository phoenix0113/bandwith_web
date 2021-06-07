import { useEffect, useState } from "react";
import { VideoPlayer, VideoPlayerContent } from "./styled";

interface Data {
  url: string;
  id: string;
}

const AdminUserVideoList = (props:Data):JSX.Element => {
  const [videoSourceUrl, setVideoSourceUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    let url = "video/";
    url += props.id;
    setVideoUrl(url);
    setVideoSourceUrl(props.url);
  }, [props]);

  return (
    <VideoPlayerContent className="admin-dashboard-video" href={videoUrl}>
      <VideoPlayer>
        <source src={videoSourceUrl} />
      </VideoPlayer>
    </VideoPlayerContent>
  );
};

export default AdminUserVideoList;

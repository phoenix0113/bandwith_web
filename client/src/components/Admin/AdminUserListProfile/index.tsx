import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Profile, ProfileImage, ProfileText, ProfileName, ProfileStatus, OnlineOffImage,
} from "./styled";

import onlineImage from "../../../assets/images/admin/online.png";
import offlineImage from "../../../assets/images/admin/offline.png";

interface Data {
  type: string;
  imageUrl: string;
  name: string;
}

const AdminUserListProfile = (props: Data):JSX.Element => {
  const history = useHistory();
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [image, setImage] = useState("");
  const [userName, setUserName] = useState("");
  const [pageType, setPageType] = useState("");

  const handleVideo = (id: string) => {
    let router = "/admin/video/";
    router += id;
    router += "/";
    router += pageType;
    history.push(router);
  };

  useEffect(() => {
    setPageType(props.type);
    setImage(props.imageUrl);
    setUserName(props.name);
  }, [props]);

  return (
    <Profile>
      <ProfileImage src={image} />
      <ProfileText>
        <ProfileName>
          {userName}
        </ProfileName>
      </ProfileText>
    </Profile>
  );
};

export default AdminUserListProfile;

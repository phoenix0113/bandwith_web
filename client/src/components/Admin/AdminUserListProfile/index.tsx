import { useState, useEffect } from "react";
import {
  Profile, ProfileImage, ProfileText, ProfileName, ProfileStatus, OnlineOffImage,
} from "./styled";

import onlineImage from "../../../assets/images/admin/online.png";
import offlineImage from "../../../assets/images/admin/offline.png";

interface Data {
  // status: boolean;
  imageUrl: string;
  name: string;
}

const AdminUserListProfile = (props: Data):JSX.Element => {
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [image, setImage] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    // setOnlineStatus(props.status);
    setImage(props.imageUrl);
    setUserName(props.name);
  }, [props]);

  return (
    <Profile>
      <ProfileImage src={image} />
      {
        (onlineStatus) ? (
          <OnlineOffImage src={onlineImage} />
        ) : (
          <OnlineOffImage src={offlineImage} />
        )
      }

      <ProfileText>
        <ProfileName>
          {userName}
        </ProfileName>
        <ProfileStatus>
          {
            (onlineStatus) ? (
              "Online"
            ) : (
              "Offline"
            )
          }
        </ProfileStatus>
      </ProfileText>
    </Profile>
  );
};

export default AdminUserListProfile;

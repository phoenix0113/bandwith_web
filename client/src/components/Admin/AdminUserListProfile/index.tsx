import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Profile, ProfileImage, ProfileText, ProfileName, ProfileEmail } from "./styled";
import tempProfileIcon from "../../../assets/images/call/default_profile_image.png";

interface Data {
  type: string;
  imageUrl: string;
  name: string;
  email: string;
}

const AdminUserListProfile = (props: Data):JSX.Element => {
  const history = useHistory();
  const [image, setImage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
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
    setUserEmail(props.email);
  }, [props]);

  return (
    <Profile>
      <ProfileImage src={(image !== undefined) ? image : tempProfileIcon} />
      <ProfileName>
        {userName}
      </ProfileName>
      <ProfileEmail>
        {userEmail}
      </ProfileEmail>
    </Profile>
  );
};

export default AdminUserListProfile;

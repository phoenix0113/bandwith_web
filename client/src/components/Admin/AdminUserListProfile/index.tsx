import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Profile, ProfileImage, ProfileText, ProfileName, ProfileEmail } from "./styled";
import tempProfileIcon from "../../../assets/images/call/default_profile_image.png";

interface IProps {
  type: string;
  imageUrl: string;
  name: string;
  email: string;
}

const AdminUserListProfile = ({
  type, imageUrl, name, email,
}: IProps):JSX.Element => {
  const history = useHistory();

  const handleVideo = (id: string) => {
    let router = "/admin/video/";
    router += id;
    router += "/";
    router += type;
    history.push(router);
  };

  return (
    <Profile>
      <ProfileImage src={(imageUrl !== undefined) ? imageUrl : tempProfileIcon} />
      <ProfileName>
        {name}
      </ProfileName>
      <ProfileEmail>
        {email}
      </ProfileEmail>
    </Profile>
  );
};

export default AdminUserListProfile;

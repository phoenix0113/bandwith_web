import profileOvalsIcon from "../../assets/images/call/profile-ovals.svg";
import testProfileImg from "../../assets/images/call/default_profile_image.png";

import { ProfileImage, ProfileWrapper } from "./styled";

interface IProps {
  src?: string
}

export const ProfileImageWrapper = ({ src }: IProps): JSX.Element => (
  <ProfileWrapper>
    <img alt="Profile" src={profileOvalsIcon} />
    <ProfileImage src={src || testProfileImg} />
  </ProfileWrapper>

);

ProfileImageWrapper.defaultProps = {
  src: testProfileImg,
};

import styled from "styled-components";

export const Profile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  width: 46px;
  height: 46px;
`;

export const ProfileText = styled.div`
  margin-left: 15px;
`;

export const ProfileName = styled.div`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: #FFFFFF;
`;

export const ProfileStatus = styled.div`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: #FFFFFF;
  mix-blend-mode: normal;
  opacity: 0.3;
`;

export const OnlineOffImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
`;

import styled from "styled-components";

export const AdminPageWrapper = styled.div`
  width: 100%;
  background-color: #0E0C09;
`;

export const AdminAuthForm = styled.div`
  width: 44.263%;
  max-width: 540px;
  margin-top: 95.5px;
`;

export const AdminPanelTitle = styled.div`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: bold;
  font-size: 44px;
  line-height: 46px;
  color: #FFFFFF;
`;

export const TitleScale = styled.div`
  display: flex;
`;

export const AdminPanelDescription = styled.div`
  margin: 23px 0 30px 0;
  height: 95px;
  font-family: 'Avenir-Gilroy';
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  line-height: 28px;
  color: #FFFFFF;
  opacity: 0.4;
`;

export const EmailIcon = styled.img`
  color: #ffffff;
`;

export const AdminPanelImage = styled.img`
  width: 49.343%;
  max-width: 602px;
  margin-left: auto;
`;

export const AdminContent = styled.div`
  display: flex;
  margin: 52.5px auto 0 auto;
  max-width: 1220px;
`;

export const AdminAuthButton = styled.button`
  width: 175px;
  height: 53px;
  border-radius: 4px;
  background-color: #ffffff;
  font-family: 'Avenir-Kefa';
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  line-height: 18.5px;
  text-align: center;
  color: #0E0F10;
  cursor: pointer;
  border: none;
  margin-bottom: 21px;
`;

export const AdminForgotPassword = styled.a`
  font-family: 'Avenir';
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  text-decoration: underline;
`;

export const AdminContentWrapper = styled.div`
  margin-left: 80px;
`;

export const AdminPageContent = styled.div`
  display: flex;
  height: 100%;
`;

export const AdminDashboardContent = styled.div`
  margin-top: 70px;
  margin-left: 250px;
  width: 100%;
  justify-content: center;
  display: flex;
`;

export const AdminDashboardVideoContent = styled.div`
  @media (min-width: 648px) {
    width: 383px;
  }
  @media (min-width: 1110px) {
    width: 766px;
  }
  @media (min-width: 1440px) {
    width: 1144px;
  }
`;

export const AdminDashboardVideoTitle = styled.div`
  margin-left: 15px;
  margin-top: 47px;
  margin-bottom: 20px;
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 40px;
  color: #FFFFFF;
`;

export const VideoContentWrapper = styled.div`
  display: flex;
  width: fit-content;
  flex-flow: row wrap;
`;

export const VideoPlayerContent = styled.div`
  @media (min-width: 1110px) {
    width: 50%;
    max-width: 383px;
  }
  @media (min-width: 1440px) {
    width: 33.3%;
    max-width: 383px;
  }
  border-radius: 32px;
  position: relative;
  padding: 15px;
`;

export const VideoPlayer = styled.video`
  border-radius: 32px;
  width: 353px;
  height: 300px;
  object-fit: cover;
`;

export const VideoPlayerButton = styled.img`
  width: 45.49px;
  height: 57.96px;
  position: absolute;
  top: 121px;
  left: 169px;
  cursor: pointer;
  z-index: 10;
`;

export const VideoPauseButton = styled.img`
  display: none;
  :hover {
    display: block !important;
  }
  width: 45.49px;
  height: 57.96px;
  position: absolute;
  top: 121px;
  left: 169px;
  cursor: pointer;
  z-index: 10;
`;

export const AdminHelpContent = styled.div`
  margin-top: 167px;
  margin-left: 295px;
  margin-right: 55px;
`;

export const AdminHelpTitle = styled.div`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: bold;
  font-size: 44px;m
  line-height: 40px;
  color: #FFFFFF;
  margin-bottom: 53px;
`;

export const AdminHelpDescription = styled.div`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #6D7278;
`;

export const AdminVideoPageContent = styled.div`
  margin: 97px 35px 35px 285px;
  width: 100%;
`;

export const AdminVideoProfile = styled.div`
  margin-bottom: 18px;
  display: flex;
  align-items: center;
`;

export const AdminVideoProfilePhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #FFFFFF;
`;

export const AdminVideoProfileInformation = styled.div`
  align-items: center;
  margin-left: 20px;
`;

export const AdminVideoProfileUserName = styled.a`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 18px;
  color: #0091FF;
`;

export const AdminVideoProfileLevel = styled.div`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 18px;
  color: #FFFFFF;
`;

export const AdminVideoPlayer = styled.video`
  width: 100%;
  max-width: 1120px;
  border-radius: 38px;
`;

export const AdminVideoToolsContent = styled.div`
  margin-top: 35px;
  max-width: 1120px;
  width: 100%;
  height: 60px;
  background: #1F2123;
  box-shadow: 0px 0px 44px rgba(0, 0, 0, 0.02);
  border-radius: 50px;
`;

export const AdminProfile = styled.div`
  display: flex;
  align-items: center;
`;

export const AdminProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border: 1px solid #FFFFFF;
  border-radius: 50%;
`;

export const AdminProfileContent = styled.div`
  margin-left: 20px;
`;

export const AdminProfileName = styled.a`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 18px;
  color: #0091FF;
`;

export const AdminVideoStatus = styled.select`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 18px;
  color: #ffffff;
  background-color: #0E0C09;
  outline: none;
  border: none;
`;

export const AdminVideoTools = styled.div`
  padding: 20px 25px;
  display: flex;
  align-items: center;
`;

export const AdminVideoToolsMoveButton = styled.img`
  width: 10px;
  height: 16px;
  cursor: pointer;
`;

export const AdminVideoStatusTools = styled.div`
  width: 36.6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 11.74%;
`;

export const AdminVideoToolsPrevNextButton = styled.img`
  width: 19.46px;
  height: 17px;
  cursor: pointer;
`;

export const AdminVideoToolsPlayPauseButton = styled.img`
  width: 13.34px;
  height: 17px;
  cursor: pointer;
`;

export const AdminVideoActiveStatusTools = styled.div`
  width: 24.9%;
  border-left: 1px solid #979797;
  border-right: 1px solid #979797;
  padding: 0 6.34%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AdminVideoToolsAcceptButton = styled.img`
  width: 21px;
  height: 18px;
  cursor: pointer;
`;

export const AdminVideoToolsDeclineButton = styled.img`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

export const AdminVideoToolsVoiceButton = styled.img`
  width: 19.92px;
  height: 17.97px;
  cursor: pointer;
`;

export const AdminVideoSettingsTools = styled.div`
  width: 31.7%;
  padding: 0 6.96%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AdminVideoToolsOptionButton = styled.img`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

export const AdminVideoToolsFullScreenButton = styled.img`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

export const AdminVideoToolsCloseButton = styled.img`
  width: 14px;
  height: 14px;
  cursor: pointer;
  margin-left: auto;
`;

export const AdminUserVideo = styled.div`
  height: 50px;
`;

export const AdminVideoWrapper = styled.div`
  margin-left: 30px;
`;

export const AdminVideoContent = styled.div`
  margin-top: 167px;
  margin-left: 295px;
  margin-right: 55px;
  width: 100%;
`;

export const AdminVideoContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const AdminVideoList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AdminVideoListStatus = styled.select`
  margin-left: 20px;
  height: 20px;
  width: 70px;
  border: none;
  outline: none;
`;

export const AdminVideoListTitle = styled.div`
  font-size: 20px;
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

export const AdminUserWrapper = styled.div`
  min-width: 200px;
`;

export const AdminUserList = styled.div`
  
`;

export const AdminAction = styled.div`
  width: 700px;
  margin: auto;
  padding: 20px 0;
`;

export const AdminVideoListSaveButton = styled.button`
  background-color: green;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 5px 20px;
  border-radius: 5px;
`;

export const AdminSingleVideoContentWrapper = styled.div`
  max-width: 1190px;
  margin: auto;
  padding: 0 35px;
`;

export const AdminSingleVideoContent = styled.div`
  margin-top: 165px;
  margin-left: 250px;
  width: 100%;
`;

export const AdminSingleVideoProfileContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1120px;
  margin-bottom: 18px;
`;

export const AdminSingleVideoPlayerContent = styled.div`

`;

export const AdminVideoManageContent = styled.div`
  margin-top: 167px;
  margin-left: 295px;
  margin-right: 55px;
  padding: 0 35px;
  display: flex;
  width: 100%;
`;

export const AdminVideoManageWrapper = styled.div`
  max-width: 1120px;
  margin: auto;
`;

export const AdminVideoManageList = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

export const AdminVideoManageProfile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

export const AdminVideoManageProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #FFFFFF;
`;

export const AdminVideoManageProfileName = styled.div`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 18px;
  color: #0091FF;
  margin-left: 20px;
`;

export const AdminVideoManageStatus = styled.select`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 18px;
  color: #ffffff;
  background-color: #0E0C09;
  outline: none;
  border: none;
  margin-left: 20px;
`;

import styled from "styled-components";

export const AdminPageWrapper = styled.div`
  width: 100%;
  background-color: #0E0C09;
`;

export const AdminAuthForm = styled.div`
  width: 44.263%;
  max-width: 540px;
  margin-top: 95.5px;
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
  }
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
  display: block;
  @media (max-width: 1024px) {
    display: none;
  }
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
  @media (max-width: 1024px) {
    margin-right: 80px;
  }
  @media (max-width: 375px) {
    margin: 0 30px;
  }
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
  max-width: 353px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid white;
`;

export const ButtonSection = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VideoPlayerButton = styled.img`
  width: 45.49px;
  height: 57.96px;
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

export const AdminVideoPlayer = styled.video`
  // width: 100%;
  width: auto;
  // max-width: 1120px;
  max-width: 50vh;
  border-radius: 38px;
  height: calc(100% - 20px);
  border: 2px solid white;
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
  // width: 36.6%;
  width: 50%;
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
  // width: 24.9%;
  width: 50%;
  border-left: 1px solid #979797;
  // border-right: 1px solid #979797;
  padding: 0 6.34%;
  display: flex;
  // justify-content: space-between;
  justify-content: space-around;
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

export const AdminVideoWrapper = styled.div`
  max-width: 550px;
  margin: 0 auto;
  min-height: 100%;
`;

export const AdminVideoContent = styled.div`
  margin-top: 70px;
  margin-left: 250px;
  width: 100%;
  background-color: #151617;
`;

export const AdminVideoContentWrapper = styled.div`
  display: flex;
  min-height: 100%;
`;

export const AdminVideoList = styled.div`
  display: flex;
  width: 100%;
  height: 143px;
  padding: 15px;
  background: #1A1C1E;
  margin: 20px 0;
  align-items: center;
  border-radius: 6px;
`;

export const AdminVideoListStatus = styled.div`
  border: none;
  outline: none;
  margin-right: 0;
  margin-left: auto;
`;

export const AdminVideoListTitle = styled.div`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 40px;
  color: #FFFFFF;
  margin-top: 47px;
  margin-bottom: 41px;
`;

export const AdminUserWrapper = styled.div`
  max-width: 450px;
  margin: 0 auto;
  width: 45%;
  min-height: 100%;
`;

export const AdminVideoListWrapper = styled.div`
  width: 55%;
  background-color: #0E0C09;
`;

export const AdminUserList = styled.div`
  height: 143px;
  margin: 20px 0;
  background: #1A1C1E;
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  cursor: pointer;
  padding: 30px;
`;

export const AdminListActive = styled.div`
  position: absolute;
  width: 18px;
  height: 143px;
  left: 0;
  top: 0;
  background: linear-gradient(270deg, rgba(41, 67, 76, 0.268952) 3.51%, #32C5FF 179.71%);
  mix-blend-mode: normal;
  opacity: 0.6;
  border-radius: 6px 0 0 6px;
`;

export const AdminListActiveBar = styled.div`
  position: absolute;
  width: 4px;
  height: 143px;
  left: 0;
  top: 0;
  background: #32C5FF;
  border-radius: 6px 0 0 6px;
`;

export const AdminVideoListStatusLabel = styled.label`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  color: #FFFFFF;
  margin-right: 24px;
`;

export const AdminVideoListStatusInput = styled.input`
  margin-right: 0;
  margin-left: auto;
  width: 17px;
  height: 17px;
`;

export const TextRight = styled.div`
  text-align: right;
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

export const AdminSingleVideoContentWrapper = styled.div`
  max-width: 1190px;
  margin: auto;
  padding: 0 35px;
  height: 100%;
  width: 100%;
  display: flex;
`;

export const AdminSingleVideoContent = styled.div`
  margin-top: 165px;
  margin-left: 250px;
  width: 100%;
  display: flex;
`;

export const AdminSingleVideoProfileContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1120px;
  margin-bottom: 18px;
`;

export const AdminVideoManageContent = styled.div`
  margin-top: 70px;
  margin-left: 295px;
  margin-right: 55px;
  padding: 0 35px;
  width: 100%;
`;

export const AdminVideoManageWrapper = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
`;

export const AdminScrollContent = styled.div`
  height: calc(100vh - 210px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 10px;
`;

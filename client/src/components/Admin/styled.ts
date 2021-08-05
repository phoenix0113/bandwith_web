import styled from "styled-components";

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

export const VideoPlayerContent = styled.div`
  width: 200px;
  height: 400px;
  border-radius: 32px;
  position: relative;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileName = styled.div`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: #FFFFFF;
  margin-left: 10px;
  max-width: 250px;
  overflow: hidden;
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
  z-index: 10;
`;

export const VideoPlayerButton = styled.img`
  width: 45.49px;
  height: 57.96px;
  z-index: 10;
  position: absolute;
`;

export const VideoPauseButton = styled.img`
  width: 45.49px;
  height: 57.96px;
  z-index: 10;
  position: absolute;
  display: none;
  :hover {
    display: block;
  }
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

export const AdminRecordingPlayer = styled.video`
  // width: 100%;
  width: auto;
  // max-width: 1120px;
  max-width: 50vh;
  border-radius: 38px;
  height: calc(100% - 20px);
  border: 2px solid white;
`;

export const AdminRecordingToolsContent = styled.div`
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

export const AdminRecordingStatus = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const AdminRecordingTools = styled.div`
  padding: 20px 25px;
  display: flex;
  align-items: center;
`;

export const AdminRecordingToolsMoveButton = styled.img`
  width: 10px;
  height: 16px;
  cursor: pointer;
`;

export const AdminRecordingStatusTools = styled.div`
  // width: 36.6%;
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 11.74%;
`;

export const AdminRecordingToolsPrevNextButton = styled.img`
  width: 19.46px;
  height: 17px;
  cursor: pointer;
`;

export const AdminRecordingToolsPlayPauseButton = styled.img`
  width: 13.34px;
  height: 17px;
  cursor: pointer;
`;

export const AdminRecordingActiveStatusTools = styled.div`
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

export const AdminRecordingToolsAcceptButton = styled.img`
  width: 21px;
  height: 18px;
  cursor: pointer;
`;

export const AdminRecordingToolsDeclineButton = styled.img`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

export const AdminRecordingToolsVoiceButton = styled.img`
  width: 19.92px;
  height: 17.97px;
  cursor: pointer;
`;

export const AdminRecordingSettingsTools = styled.div`
  width: 31.7%;
  padding: 0 6.96%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AdminRecordingToolsOptionButton = styled.img`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

export const AdminRecordingToolsFullScreenButton = styled.img`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

export const AdminRecordingToolsCloseButton = styled.img`
  width: 14px;
  height: 14px;
  cursor: pointer;
  margin-left: auto;
`;

export const AdminRecordingWrapper = styled.div`
  max-width: 550px;
  margin: 0 auto;
  min-height: 100%;
`;

export const AdminRecordingContent = styled.div`
  margin-top: 70px;
  margin-left: 250px;
  width: 100%;
  background-color: #151617;
`;

export const AdminRecordingContentWrapper = styled.div`
  display: flex;
  min-height: 100%;
`;

export const AdminRecordingListTitle = styled.div`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 40px;
  color: #FFFFFF;
  margin-top: 47px;
  padding: 0 10px;
`;

export const AdminUserWrapper = styled.div`
  max-width: 450px;
  margin: 0 auto;
  width: 45%;
  min-height: 100%;
`;

export const AdminRecordingListWrapper = styled.div`
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
  display: flex;
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

export const AdminSingleRecordingContentWrapper = styled.div`
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

export const AdminRecordingManageContent = styled.div`
  margin-top: 70px;
  margin-left: 295px;
  margin-right: 55px;
  padding: 0 35px;
  width: 100%;
`;

export const AdminRecordingManageWrapper = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
`;

export const AdminSearch = styled.div`
  width: 50%;
  margin-left: auto;
  margin-right: 20px;
  padding: 10px 0;
`;

export const AdminRecordingList = styled.div`
  width: 300px;
  padding: 15px;
  background: #1A1C1E;
  margin: 20px;
  align-items: center;
  border-radius: 6px;
`;

export const RecordingName = styled.div`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-size: 18px;
  line-height: 22px;
  color: #FFFFFF;
  max-width: 250px;
  padding: 5px 0;
`;

export const AdminRecordingprofile = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const TextRight = styled.div`
  text-align: right;
  margin: 5px 0;
  display: flex;
  align-items: center;
`;

export const AdminRecordingListStatus = styled.div`
  border: none;
  outline: none;
  margin-right: 0;
  display: grid;
`;

export const AdminUserListStatus = styled.div`
  border: none;
  outline: none;
  margin-right: 0;
  margin-left: auto;
  display: flex;
  justify-content: space-around;
`;

export const AdminRecordingListStatusLabel = styled.label`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  color: #FFFFFF;
  margin-right: 24px;
`;

export const AdminRecordingListStatusInput = styled.input`
  margin-right: 0;
  margin-left: auto;
  width: 17px;
  height: 17px;
`;

export const DeleteIcon = styled.img`
  color: #ffffff;
`;

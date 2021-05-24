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

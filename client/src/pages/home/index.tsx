import { LogoutOutlined } from "@ant-design/icons";

import callIcon from "../../assets/images/home/call.svg";
import logo from "../../assets/images/teleport.svg";

import {
  NavigationBar, CenterItem, PageWrapper, LeftItem, RightItem, COLORS,
} from "../../components/styled";

import {
  HomeContent, HeaderTitle, HeaderDescription, ContentHeader, CallButtonWrapper, CallButtonImg,
  HomeHeader,
} from "./styled";
import { BottomNavigationComponent } from "../../components/BottomNavigation";

import { OutgoingCallStorage } from "../../services/outgoingCall";
import { GlobalStorage } from "../../services/global";

const HomePage = (): JSX.Element => (
  <PageWrapper background={COLORS.MAIN_LIGHT}>
    <NavigationBar>
      <LeftItem />
      <CenterItem>Random Call</CenterItem>
      <RightItem>
        <LogoutOutlined onClick={GlobalStorage.logout} />
      </RightItem>
    </NavigationBar>
    <HomeHeader>
      <img alt="Logo" src={logo} />
    </HomeHeader>
    <HomeContent>
      <ContentHeader>
        <HeaderTitle>Make Random Call</HeaderTitle>
        <HeaderDescription>
          Make calls to complete strangers, meet, invite friends and share your calls
        </HeaderDescription>
      </ContentHeader>
      <CallButtonWrapper>
        <CallButtonImg onClick={() => OutgoingCallStorage.makeCall()} src={callIcon} alt="Profile" />
      </CallButtonWrapper>
    </HomeContent>
    <BottomNavigationComponent />
  </PageWrapper>
);

export default HomePage;

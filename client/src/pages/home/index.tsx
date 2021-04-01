import { LogoutOutlined } from "@ant-design/icons";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { observer } from "mobx-react";
import { useContext } from "react";

import callIcon from "../../assets/images/MakeCall.svg";
import logo from "../../assets/images/Bandwith.svg";

import {
  NavigationBar, CenterItem, PageWrapper, LeftItem, RightItem, COLORS,
} from "../../components/styled";

import {
  HomeContent, HeaderTitle, HeaderDescription, ContentHeader, CallButtonWrapper, CallButtonImg,
  HomeHeader, ToggleWrapper,
} from "./styled";
import { BottomNavigationComponent } from "../../components/BottomNavigation";

import { OutgoingCallStorage } from "../../services/outgoingCall";
import { GlobalStorageContext } from "../../services/global";

const HomePage = observer((): JSX.Element => {
  const { profile, toggleAvailabilityStatus, socket, logout } = useContext(GlobalStorageContext);

  return (
    <PageWrapper background={COLORS.MAIN_LIGHT}>
      <NavigationBar>
        <LeftItem />
        <CenterItem>Random Call</CenterItem>
        <RightItem>
          <LogoutOutlined onClick={logout} />
        </RightItem>
      </NavigationBar>
      <ToggleWrapper>
        <label htmlFor="cheese-status">{profile.available ? "Online" : "Offline"}</label>
        <Toggle
          id="cheese-status"
          defaultChecked={profile.available || false}
          onChange={toggleAvailabilityStatus}
          disabled={!socket}
          value={profile.available ? "yes" : "no"}
        />
      </ToggleWrapper>
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
});

export default HomePage;

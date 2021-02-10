import declineCallIcon from "../../../assets/images/call/cancel.svg";
import acceptCallIcon from "../../../assets/images/call/accept.svg";

import {
  IcommingCallWrapper, CallUser, UserName, UserStatus, CallToolbar, CallToolbarItem,
} from "./styled";
import { CommonImgWrapper, NavigationBar, CenterItem, PageWrapper } from "../../styled";
import { ProfileImageWrapper } from "../../ProfileImageWrapper";

import { IncommingCallStorage } from "../../../services/incommingCall";
import { CallParticipantData } from "../../../interfaces/call";

interface IProps {
  callParticipantData: CallParticipantData;
}

export const IncommingCallComponent = ({ callParticipantData }: IProps): JSX.Element => (
  <PageWrapper>
    <NavigationBar>
      <CenterItem>Incoming Call</CenterItem>
    </NavigationBar>
    <IcommingCallWrapper>
      <ProfileImageWrapper src={callParticipantData?.image} />
      <CallUser>
        <UserName>{callParticipantData?.name}</UserName>
        <UserStatus>{callParticipantData?.isFriend ? "Friend" : "Unknown User"}</UserStatus>
      </CallUser>
      <CallToolbar>
        <CallToolbarItem size="small">
          <CommonImgWrapper src={declineCallIcon} alt="Decline Call" onClick={IncommingCallStorage.onRejectCall} />
        </CallToolbarItem>
        <CallToolbarItem size="big">
          <CommonImgWrapper src={acceptCallIcon} alt="Accept Call" onClick={IncommingCallStorage.onAcceptCall} />
        </CallToolbarItem>
        <CallToolbarItem size="small" />
      </CallToolbar>
    </IcommingCallWrapper>
  </PageWrapper>
);

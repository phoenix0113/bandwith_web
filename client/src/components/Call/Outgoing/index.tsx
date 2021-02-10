import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import cancelIcon from "../../../assets/images/call/cancel.svg";

import { TimerComponent } from "../../Timer";
import { NavigationBar, CenterItem, PageWrapper, COLORS } from "../../styled";
import {
  OutgoingCallWrapper, TimerWrapper, TimerDescription, TimerTime,
  OutgoingCallContent, ContentDescription, ContentHeader, ImgWrapper,
} from "./styled";

import { OutgoingCallStorage } from "../../../services/outgoingCall";
import { CallParticipantData } from "../../../interfaces/call";
import { OUTGOING_CALL_SECONDS } from "../../../utils/constants";

interface IProps {
  callParticipantData: CallParticipantData;
}

export const OutgoingCallComponent = ({ callParticipantData }: IProps): JSX.Element => (
  <PageWrapper>
    <NavigationBar>
      <CenterItem>Calling</CenterItem>
    </NavigationBar>
    <OutgoingCallWrapper>
      <TimerWrapper>
        <TimerTime>
          <TimerComponent
            initialValue={OUTGOING_CALL_SECONDS}
            onEndCallback={OutgoingCallStorage.noResponseHandler}
          />
        </TimerTime>
        <TimerDescription>Connecting Time</TimerDescription>
      </TimerWrapper>
      <Loader type="ThreeDots" color={COLORS.ALTERNATIVE} height={80} width={80} />
      <OutgoingCallContent>
        <ContentHeader>
          {callParticipantData?.isFriend ? "Calling to a friend" : "Random Calling"}
        </ContentHeader>
        <ContentDescription>
          Please wait, connection is in progress, it often takes a few seconds
        </ContentDescription>
      </OutgoingCallContent>
      <ImgWrapper alt="Cancel" src={cancelIcon} onClick={OutgoingCallStorage.cancelCallHandler} />
    </OutgoingCallWrapper>
  </PageWrapper>
);

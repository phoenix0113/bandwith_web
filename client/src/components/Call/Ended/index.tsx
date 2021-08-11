/* eslint-disable max-len */
import { useState } from "react";

import {
  COLORS, CommonButton, NavigationBar, LeftItem, CenterItem, RightItem, PageWrapper,
  CommonPageContentWrapper, CommonContentTitle,
} from "../../styled";
import { ProfileImageWrapper } from "../../ProfileImageWrapper";

import { GlobalStorage } from "../../../services/global";

import { CallParticipantData } from "../../../interfaces/call";
import { publishRecording } from "../../../axios/routes/feed";

interface IProps {
  callParticipantData: CallParticipantData;
  resetHandler: () => void;
  callId: string;
  type: string;
}

export const CallEndedComponent = ({ callParticipantData, resetHandler, callId, type }: IProps): JSX.Element => {
  const [requestSent, setRequestSent] = useState(false);
  const addToFriendsHandler = () => {
    GlobalStorage.sendAddToFriendInvitation(callParticipantData?.id, () => {
      setRequestSent(true);
    });
  };

  if (type === "outgoing") {
    publishRecording({
      callId,
      participants: [callParticipantData.id],
    });
  }

  return (
    <PageWrapper>
      <NavigationBar>
        <LeftItem />
        <CenterItem>{callParticipantData?.name || "Unknown user"}</CenterItem>
        <RightItem color={COLORS.ALTERNATIVE} onClick={resetHandler}>Close</RightItem>
      </NavigationBar>
      <CommonPageContentWrapper>
        <ProfileImageWrapper src={callParticipantData?.image} />
        <CommonContentTitle>Call Ended</CommonContentTitle>
        {!callParticipantData?.isFriend && (
          <CommonButton
            disabled={requestSent}
            margin="5% 0 20px 0"
            onClick={addToFriendsHandler}
            backgroundColor={requestSent ? COLORS.ALTERNATIVE : COLORS.MAIN_LIGHT}
            color={requestSent ? COLORS.BLACK : COLORS.WHITE}
          >
            {requestSent ? "Invitation is sent" : "Add to Friends" }
          </CommonButton>
        )}
      </CommonPageContentWrapper>
    </PageWrapper>
  );
};

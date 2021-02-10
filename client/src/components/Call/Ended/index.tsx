/* eslint-disable max-len */
import { useState } from "react";

import { ContentTimer } from "./styled";
import {
  COLORS, CommonButton, NavigationBar, LeftItem, CenterItem, RightItem, PageWrapper,
  CommonPageContentWrapper, CommonContentWrapper, CommonContentTitle, CommonContentDescription,
} from "../../styled";
import { ProfileImageWrapper } from "../../ProfileImageWrapper";
import { TimerComponent } from "../../Timer";

import { GlobalStorage } from "../../../services/global";

import { CallParticipantData } from "../../../interfaces/call";

import { publishRecording } from "../../../axios/routes/feed";

interface IProps {
  callParticipantData: CallParticipantData;
  resetHandler: () => void;
  callId: string;
}

export const CallEndedComponent = ({ callParticipantData, resetHandler, callId }: IProps): JSX.Element => {
  const [published, setPublished] = useState(false);
  const publishHandler = () => {
    publishRecording({
      callId,
      participants: [callParticipantData.id],
    });

    setPublished(true);
  };

  const [requestSent, setRequestSent] = useState(false);
  const addToFriendsHandler = () => {
    GlobalStorage.sendAddToFriendInvitation(callParticipantData?.id, () => {
      setRequestSent(true);
    });
  };

  return (
    <PageWrapper>
      <NavigationBar>
        <LeftItem />
        <CenterItem>{callParticipantData?.name || "Unknown user"}</CenterItem>
        <RightItem color={COLORS.ALTERNATIVE} onClick={resetHandler}>Close</RightItem>
      </NavigationBar>
      <CommonPageContentWrapper>
        <ProfileImageWrapper src={callParticipantData?.image} />
        <CommonContentWrapper>
          <CommonContentTitle>Call Ended</CommonContentTitle>
          <CommonContentDescription>
            {published
              ? "Your recording has been published."
              : "Publish your recoding if you want to save it, othewise it will be deleted in 60 seconds."}
            {" You will be automatically redirected to the home page"}
          </CommonContentDescription>
          <ContentTimer>
            <TimerComponent
              initialValue={59}
              onEndCallback={resetHandler}
            />
          </ContentTimer>
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
          <CommonButton
            disabled={published}
            margin="0 0 20px 0"
            onClick={publishHandler}
            backgroundColor={published ? COLORS.ALTERNATIVE : COLORS.MAIN_LIGHT}
            color={published ? COLORS.BLACK : COLORS.WHITE}
          >
            {published ? "Published" : "Public Publish" }
          </CommonButton>
        </CommonContentWrapper>
      </CommonPageContentWrapper>
    </PageWrapper>
  );
};

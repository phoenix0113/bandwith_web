/* eslint-disable max-len */
import { useState, useMemo } from "react";
import { Input } from "antd";

import {
  COLORS, CommonButton, NavigationBar, LeftItem, CenterItem, RightItem, PageWrapper,
  CommonPageContentWrapper, CommonContentWrapper, CommonContentTitle,
} from "../../styled";
import { ProfileImageWrapper } from "../../ProfileImageWrapper";

import { GlobalStorage } from "../../../services/global";

import { CallParticipantData } from "../../../interfaces/call";

import { publishRecording } from "../../../axios/routes/feed";

interface IProps {
  callParticipantData: CallParticipantData;
  resetHandler: () => void;
  callId: string;
}

export const CallEndedComponent = ({ callParticipantData, resetHandler, callId }: IProps): JSX.Element => {
  const [recordingName, setRecordingName] = useState("");

  const publishHandler = () => {
    publishRecording({
      callId,
      participants: [callParticipantData.id],
      recordingName,
    });

    resetHandler();
  };

  const [requestSent, setRequestSent] = useState(false);
  const addToFriendsHandler = () => {
    GlobalStorage.sendAddToFriendInvitation(callParticipantData?.id, () => {
      setRequestSent(true);
    });
  };

  const isSubmitDisabled = useMemo(() => {
    let validate = true;
    if (recordingName !== "") {
      validate = false;
    }
    console.log(validate);
    return validate;
  }, [recordingName]);

  return (
    <PageWrapper>
      <NavigationBar>
        <LeftItem />
        <CenterItem>{callParticipantData?.name || "Unknown user"}</CenterItem>
        <RightItem />
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

        <Input
          placeholder="Enter recording's name"
          type="text"
          onChange={(e) => setRecordingName(e.target.value)}
          style={{ color: "white", backgroundColor: "#0B131A", borderColor: "white", height: 50, padding: 13, fontSize: 18, lineHeight: 25 }}
        />

        <CommonButton
          disabled={isSubmitDisabled}
          margin="5% 0 20px 0"
          onClick={publishHandler}
          backgroundColor={!isSubmitDisabled ? COLORS.ALTERNATIVE : COLORS.MAIN_LIGHT}
          color={!isSubmitDisabled ? COLORS.BLACK : COLORS.WHITE}
        >
          OK
        </CommonButton>
      </CommonPageContentWrapper>
    </PageWrapper>
  );
};

import { useEffect, useContext, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { parse } from "query-string";
import { observer } from "mobx-react";

import { Routes, Params } from "../../../utils/routes";
import { PlayerComponent } from "../../../components/Call/Main/Player";

import liveIcon from "../../../assets/images/call/live.svg";
import exitLiveIcon from "../../../assets/images/call/ExitLive.svg";
import commentsIcon from "../../../assets/images/call/comments.svg";

import {
  CallPageWrapper, CommonImgWrapper, CallPageNavigation,
  NavigationCenterContent, ContentTop, CommonButton, CallPageToolbar,
} from "../../../components/styled";
import { LiveCallWrapper } from "./styled";

import { LiveCallStorageContext } from "../../../services/live";
import { GlobalStorageContext } from "../../../services/global";
import { LiveCallStatus } from "../../../interfaces/call";

import { CommentsComponent } from "../../../components/Comments";

const LiveCallPage = observer((): JSX.Element => {
  const { search } = useLocation();
  const history = useHistory();

  const {
    firstParticipant, joinAsViewer, leaveCall, secondParticipant, callStatus,
    liveStream, playback, subscribeToLiveStream,
  } = useContext(LiveCallStorageContext);

  const { socket, avcoreCloudClient } = useContext(GlobalStorageContext);

  const [callId, setCallId] = useState<string>(null);
  useEffect(() => {
    if (!search) {
      history.push(Routes.HOME);
    } else {
      const parsed = parse(search);
      setCallId(parsed[Params.CALL_ID] as string);
    }
  }, [search]);

  useEffect(() => {
    if (socket && callId && avcoreCloudClient) {
      joinAsViewer(callId);
    }
  }, [socket, callId, avcoreCloudClient]);

  if (callStatus === LiveCallStatus.FINISHED || callStatus === LiveCallStatus.MISSED) {
    history.push(Routes.HOME);
  }

  const [openedComments, setOpenedComments] = useState(false);
  const showComments = () => {
    setOpenedComments(true);
  };
  const hideComments = () => {
    setOpenedComments(false);
  };

  return (
    <CallPageWrapper>
      {callId && socket && avcoreCloudClient && (
        <CommentsComponent id={callId} visible={openedComments} hide={hideComments} />
      )}
      <CallPageNavigation>
        <CommonImgWrapper src={liveIcon} alt="Recording" />
        <NavigationCenterContent>
          <ContentTop lineHeight="20px">
            {firstParticipant && secondParticipant
              ? `${firstParticipant.participant_name} & ${secondParticipant.participant_name}`
              : "Loading..."}
          </ContentTop>
        </NavigationCenterContent>
        <CommonImgWrapper src={exitLiveIcon} alt="ExitCall" onClick={leaveCall} />
      </CallPageNavigation>

      <LiveCallWrapper>
        {!liveStream
          ? <CommonButton onClick={subscribeToLiveStream}>Watch Live Stream</CommonButton>
          : <PlayerComponent stream={liveStream} playback={playback} muted={false} />}
      </LiveCallWrapper>

      <CallPageToolbar>
        <CommonImgWrapper src={commentsIcon} alt="Comments" onClick={showComments} />
      </CallPageToolbar>

    </CallPageWrapper>
  );
});

export default LiveCallPage;

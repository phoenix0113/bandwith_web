import { useContext, useState } from "react";
import { observer } from "mobx-react";
import { ConferenceApi } from "avcore/client";

import { MediaType } from "../../../interfaces/global";
import { GlobalStorageContext } from "../../../services/global";

import { PlayerComponent } from "./Player";
import { CommentsComponent } from "../../Comments";
import { CallWraper, CallPageBottomNavigation, BottomNavigationItem, ItemText, CallParticipant } from "./styled";
import {
  CallPageWrapper, CommonImgWrapper, CallPageNavigation,
  NavigationCenterContent, ContentBottom, ContentTop, CallPageToolbar,
} from "../../styled";

import cameraOffIcon from "../../../assets/images/call/CameraOff.svg";
import cameraOnIcon from "../../../assets/images/call/CameraOn.svg";
import microOffIcon from "../../../assets/images/call/MicroOff.svg";
import microOnIcon from "../../../assets/images/call/MicroOn.svg";
import volumeOffIcon from "../../../assets/images/call/VolumeOff.svg";
import volumeOnIcon from "../../../assets/images/call/VolumeOn.svg";
import endCallIcon from "../../../assets/images/call/EndCall.svg";
import switchCameraIcon from "../../../assets/images/call/switch-camera.svg";
import recordingIcon from "../../../assets/images/call/rec.svg";
import commentsIcon from "../../../assets/images/call/comments.svg";
import shareIcon from "../../../assets/images/call/share.svg";

import { CallParticipantData } from "../../../interfaces/call";
import { NAVIGATOR_SHARE_ERROR, SERVER_BASE_URL } from "../../../utils/constants";
import { Params, Routes } from "../../../utils/routes";
import { showErrorNotification } from "../../../utils/notification";

interface IProps {
  endCallHandler: () => void,
  localStream: MediaStream,
  remoteStream: MediaStream,
  type: "Incoming"|"Outgoing",
  callParticipantData: CallParticipantData;
  playback?: ConferenceApi,
  callId: string,
}

export const MainCallComponent = observer(({
  endCallHandler, localStream, remoteStream, type, callParticipantData, playback, callId,
}: IProps): JSX.Element => {
  const {
    camera, volume, micro, toggleMedia, toggleCameraMode, profile,
  } = useContext(GlobalStorageContext);

  const shareCall = () => {
    if (!navigator.share) {
      showErrorNotification(NAVIGATOR_SHARE_ERROR);
      return;
    }

    const shareCallData: ShareData = {
      text: `${profile.name} and ${callParticipantData.name} are live now!`,
      url: `${SERVER_BASE_URL}${Routes.LIVE_CALL}?${Params.CALL_ID}=${callId}`,
    };

    navigator.share(shareCallData);
  };

  const [openedComments, setOpenedComments] = useState(false);
  const showComments = () => {
    setOpenedComments(true);
  };
  const hideComments = () => {
    setOpenedComments(false);
  };

  return (
    <CallPageWrapper>
      <CommentsComponent visible={openedComments} id={callId} hide={hideComments} />

      <CallPageNavigation onClick={hideComments}>
        <CommonImgWrapper src={recordingIcon} alt="Recording" />
        <NavigationCenterContent>
          <ContentTop>{callParticipantData?.name || "Unknown user"}</ContentTop>
          <ContentBottom>{`${type} call`}</ContentBottom>
        </NavigationCenterContent>
        <CommonImgWrapper src={switchCameraIcon} alt="CameraSwitch" onClick={toggleCameraMode} />
      </CallPageNavigation>

      <CallWraper onClick={hideComments}>
        <CallParticipant>
          <PlayerComponent muted stream={localStream} />
        </CallParticipant>
        <CallParticipant>
          <PlayerComponent muted={!volume} stream={remoteStream} playback={playback} />
        </CallParticipant>
      </CallWraper>

      <CallPageToolbar>
        <CommonImgWrapper src={commentsIcon} alt="Comments" onClick={showComments} />
        <CommonImgWrapper src={shareIcon} alt="Share" onClick={shareCall} />
      </CallPageToolbar>

      <CallPageBottomNavigation>
        <BottomNavigationItem>
          <CommonImgWrapper
            src={camera ? cameraOnIcon : cameraOffIcon}
            onClick={() => toggleMedia(MediaType.CAMERA)}
          />
          <ItemText>
            Camera
            {camera ? " (on)" : " (off)"}
          </ItemText>
        </BottomNavigationItem>
        <BottomNavigationItem>
          <CommonImgWrapper
            src={micro ? microOnIcon : microOffIcon}
            onClick={() => toggleMedia(MediaType.MICRO)}
          />
          <ItemText>
            Micro
            {micro ? " (on)" : " (off)"}
          </ItemText>
        </BottomNavigationItem>
        <BottomNavigationItem>
          <CommonImgWrapper
            src={volume ? volumeOnIcon : volumeOffIcon}
            onClick={() => toggleMedia(MediaType.VOLUME)}
          />
          <ItemText>
            Volume
            {volume ? " (on)" : " (off)"}
          </ItemText>
        </BottomNavigationItem>
        <BottomNavigationItem>
          <CommonImgWrapper src={endCallIcon} onClick={endCallHandler} />
          <ItemText>
            End Call
          </ItemText>
        </BottomNavigationItem>

      </CallPageBottomNavigation>
    </CallPageWrapper>
  );
});

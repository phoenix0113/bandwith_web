import { useContext } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";

import { IncommingCallStorageContext } from "../../../services/incommingCall";

import { IncommingCallStatus } from "../../../interfaces/call";
import { Routes } from "../../../utils/routes";

import { IncommingCallComponent } from "../../../components/Call/Incomming";
import { MainCallComponent } from "../../../components/Call/Main";
import { COLORS, CommonButton } from "../../../components/styled";
import { CallContent, CallWrapper, CallDescription } from "../styled";

const IncommingCallPage = observer((): JSX.Element => {
  const history = useHistory();

  const {
    status,
    endCall,
    localStream,
    remoteStream,
    callParticipantData,
    playback,
    callId,
    resetIncommingCall,
    participantAppStatus,
    participantCallDetectorStatus,
  } = useContext(IncommingCallStorageContext);

  switch (status) {
    case IncommingCallStatus.INITIALIZED:
    case IncommingCallStatus.CANCELED:
    case IncommingCallStatus.MISSED:
    case IncommingCallStatus.REJECT:
      history.push(Routes.HOME);
      break;
    case IncommingCallStatus.INCOMMING:
      return <IncommingCallComponent callParticipantData={callParticipantData} />;
    case IncommingCallStatus.FINISHED:
      history.push(Routes.HOME);
      break;
    case IncommingCallStatus.ACCEPT:
      return (
        <MainCallComponent
          endCallHandler={endCall}
          localStream={localStream}
          remoteStream={remoteStream}
          type="Incoming"
          callParticipantData={callParticipantData}
          callId={callId}
          playback={playback}
          participantAppStatus={participantAppStatus}
          participantCallStatus={participantCallDetectorStatus}
        />
      );
    default:
      throw new Error(`> Unexpected call status: ${status}`);
  }

  // TODO: create fallback component
  return null;
});

export default IncommingCallPage;

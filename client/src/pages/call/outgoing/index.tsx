import { useContext } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";

import { OutgoingCallStorageContext } from "../../../services/outgoingCall";

import { OutgoingCallStatus } from "../../../interfaces/call";

import { OutgoingCallComponent } from "../../../components/Call/Outgoing";
import { CallEndedComponent } from "../../../components/Call/Ended";
import { MainCallComponent } from "../../../components/Call/Main";

import { Routes } from "../../../utils/routes";

const OutgoingCallPage = observer((): JSX.Element => {
  const history = useHistory();

  const {
    status,
    endCallHandler,
    localStream,
    remoteStream,
    callParticipantData,
    playback,
    callId,
    resetOutgoingCall,
    participantAppStatus,
    participantCallDetectorStatus,
  } = useContext(OutgoingCallStorageContext);

  switch (status) {
    case OutgoingCallStatus.INITIALIZED:
    case OutgoingCallStatus.CANCELED:
    case OutgoingCallStatus.NO_RESPONSE:
    case OutgoingCallStatus.REJECTED_BY_PARTICIPANT:
      history.replace(Routes.HOME);
      break;
    case OutgoingCallStatus.WAITING_FOR_PARTICIPANT:
      return <OutgoingCallComponent callParticipantData={callParticipantData} />;
    case OutgoingCallStatus.FINISHED:
      return (
        <CallEndedComponent
          callParticipantData={callParticipantData}
          resetHandler={resetOutgoingCall}
          callId={callId}
          type="outgoing"
        />
      );
    case OutgoingCallStatus.ANSWERED_BY_PARTICIPANT:
      return (
        <MainCallComponent
          endCallHandler={endCallHandler}
          localStream={localStream}
          remoteStream={remoteStream}
          type="Outgoing"
          callParticipantData={callParticipantData}
          playback={playback}
          callId={callId}
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

export default OutgoingCallPage;

import { AppStatusType, CallDetectorStatusType } from "../../../../shared/socket";
import { ParticipantStatusOverlay } from "../styled";

interface IProps {
  participantAppStatus: AppStatusType;
  participantCallStatus: CallDetectorStatusType;
}

const getOverlayText = (
  participantAppStatus: AppStatusType,
  participantCallStatus: CallDetectorStatusType,
): string => {
  if (participantAppStatus === "background" || participantAppStatus === "inactive") {
    return "Participant minimized the app";
  }

  if (participantCallStatus === "Incoming" || participantCallStatus === "Connected") {
    return "Participant's audio is taken by phone call";
  }

  return "Participant's app send unexpected status";
};

export const PartipantAppStatusComponent = ({
  participantAppStatus, participantCallStatus,
}: IProps): JSX.Element => {
  if (!participantAppStatus && !participantCallStatus) {
    return null;
  }

  if (!participantAppStatus && participantCallStatus !== "Incoming" && participantCallStatus !== "Connected") {
    return null;
  }

  if (participantAppStatus === "active" && participantCallStatus !== "Incoming" && participantCallStatus !== "Connected") {
    return null;
  }

  return (
    <ParticipantStatusOverlay>
      {getOverlayText(participantAppStatus, participantCallStatus)}
    </ParticipantStatusOverlay>
  );
};

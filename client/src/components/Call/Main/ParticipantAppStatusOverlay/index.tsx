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
  if (participantAppStatus === "background" || participantCallStatus === "Connected" || participantAppStatus === "inactive") {
    return "Participant minimized an app";
  }
  if (participantCallStatus === "Incoming") {
    return "Participats audio is taken by incoming call";
  }
  return "Participants is loading...";
};

export const PartipantAppStatusComponent = ({
  participantAppStatus, participantCallStatus,
}: IProps): JSX.Element => (
  <ParticipantStatusOverlay>
    {getOverlayText(participantAppStatus, participantCallStatus)}
  </ParticipantStatusOverlay>
);

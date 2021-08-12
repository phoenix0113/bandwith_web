import React, { useContext, useRef, useState } from "react";
import { observer } from "mobx-react";
import { AdminStorageContext } from "../../../services/admin";
import AdminUserListProfile from "../AdminUserListProfile";
import { GetRecordResponse } from "../../../shared/interfaces";
import {
  AdminSingleVideoProfileContent, AdminSingleRecordingContentWrapper, AdminRecordingToolsContent,
  AdminRecordingTools, AdminRecordingToolsMoveButton, AdminRecordingStatusTools,
  AdminRecordingToolsPrevNextButton, AdminRecordingToolsPlayPauseButton, AdminRecordingStatus,
  AdminRecordingToolsAcceptButton, AdminRecordingActiveStatusTools, AdminRecordingToolsCloseButton,
  AdminRecordingPlayer, AdminRecordingToolsDeclineButton,
} from "../styled";
import moveButton from "../../../assets/images/admin/move.png";
import prevButton from "../../../assets/images/admin/prev.png";
import nextButton from "../../../assets/images/admin/next.png";
import playButton from "../../../assets/images/admin/play.png";
import pauseButton from "../../../assets/images/admin/pause.png";
import acceptButton from "../../../assets/images/admin/accept.png";
import declineButton from "../../../assets/images/admin/decline.png";
import closeButton from "../../../assets/images/admin/close.png";

const tempRecordingFile = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

interface IProps {
  currentRecording: GetRecordResponse;
  onPrevPlay: (id: string) => void;
  onNextPlay: (id: string) => void;
  disable: boolean;
}

const AdminFullScreenRecording = observer(({
  currentRecording, onPrevPlay, onNextPlay, disable,
}: IProps): JSX.Element => {
  const {
    currentAuthorList,
    updateRecordingStatus,
  } = useContext(AdminStorageContext);

  const [showPlayBtn, setShowPlayBtn] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);

  const onChangePlayStatus = () => {
    if (playerRef.current.paused) {
      playerRef.current.play().then(() => setShowPlayBtn(false)).catch(() => {
        if (playerRef.current.paused) {
          setShowPlayBtn(true);
        }
      });
    } else if (!playerRef.current.paused) {
      playerRef.current.pause();
      setShowPlayBtn(true);
    }
  };

  const acceptRecording = (id: string) => {
    updateRecordingStatus(id, "public", currentRecording?.status);
  };

  const declineRecording = (id: string) => {
    updateRecordingStatus(id, "block", currentRecording?.status);
  };

  return (
    <AdminSingleRecordingContentWrapper className="padding-30">
      <AdminRecordingPlayer
        ref={playerRef}
        controls
        autoPlay
        loop
        poster={currentRecording?.thumbnail}
      >
        <source src={currentRecording?.list[0].url} />
        {/* <source src={tempRecordingFile} /> */}
      </AdminRecordingPlayer>
      <div className="dis-flex w-full padding-0-30 item-center">
        <div className="w-full">
          <AdminSingleVideoProfileContent>
            <AdminUserListProfile
              imageUrl={currentAuthorList[0]?.imageUrl}
              name={currentAuthorList[0]?.name}
              email={currentAuthorList[0]?.email}
              type="none"
            />
            {
              (currentAuthorList[1]) && (
                <AdminUserListProfile
                  imageUrl={currentAuthorList[1]?.imageUrl}
                  name={currentAuthorList[1]?.name}
                  email={currentAuthorList[1]?.email}
                  type="none"
                />
              )
            }
          </AdminSingleVideoProfileContent>
          <AdminRecordingToolsContent>
            <AdminRecordingTools>
              {/* <AdminRecordingToolsMoveButton src={moveButton} /> */}
              <AdminRecordingStatusTools>
                {
                  (disable) && (
                    <AdminRecordingToolsPrevNextButton
                      src={prevButton}
                      onClick={() => onPrevPlay(currentRecording?._id)}
                    />
                  )
                }
                {
                  (showPlayBtn) ? (
                    <AdminRecordingToolsPlayPauseButton
                      src={playButton}
                      onClick={onChangePlayStatus}
                    />
                  ) : (
                    <AdminRecordingToolsPlayPauseButton
                      className="admin-dashboard-video-pause-button"
                      src={pauseButton}
                      onClick={onChangePlayStatus}
                    />
                  )
                }
                {
                  (disable) && (
                    <AdminRecordingToolsPrevNextButton
                      src={nextButton}
                      onClick={() => onNextPlay(currentRecording?._id)}
                    />
                  )
                }
              </AdminRecordingStatusTools>
              <AdminRecordingActiveStatusTools>
                <AdminRecordingStatus>
                  <AdminRecordingToolsAcceptButton
                    src={acceptButton}
                    style={(currentRecording?.status === "public") ? ({ opacity: 0.1, cursor: "auto" }) : ({ opacity: 1, cursor: "pointer" })}
                    onClick={() => acceptRecording(currentRecording?._id)}
                  />
                  <AdminRecordingToolsDeclineButton
                    style={(currentRecording?.status === "block") ? ({ opacity: 0.11, cursor: "auto" }) : ({ opacity: 1, cursor: "pointer" })}
                    src={declineButton}
                    onClick={() => declineRecording(currentRecording?._id)}
                  />
                </AdminRecordingStatus>
              </AdminRecordingActiveStatusTools>
              {/* <AdminRecordingToolsCloseButton src={closeButton} /> */}
            </AdminRecordingTools>
          </AdminRecordingToolsContent>
        </div>
      </div>
    </AdminSingleRecordingContentWrapper>
  );
});

export default AdminFullScreenRecording;

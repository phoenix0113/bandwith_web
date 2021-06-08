import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import {
  AdminPageContent, AdminPageWrapper, AdminSingleVideoContent, AdminSingleVideoProfileContent,
  AdminSingleVideoContentWrapper, AdminVideoToolsContent, AdminProfile, AdminProfileImage,
  AdminProfileContent, AdminProfileName, AdminVideoTools, AdminVideoToolsMoveButton,
  AdminVideoStatusTools, AdminVideoToolsPrevNextButton, AdminVideoToolsPlayPauseButton,
  AdminVideoActiveStatusTools, AdminVideoToolsAcceptButton, AdminVideoToolsDeclineButton,
  AdminVideoToolsVoiceButton, AdminVideoSettingsTools, AdminVideoToolsOptionButton,
  AdminVideoToolsFullScreenButton, AdminVideoToolsCloseButton, AdminVideoPlayer, AdminVideoStatus,
} from "../../../components/Admin/styled";
import { PAGE_TYPE } from "./types";
import moveButton from "../../../assets/images/admin/move.png";
import prevButton from "../../../assets/images/admin/prev.png";
import nextButton from "../../../assets/images/admin/next.png";
import playButton from "../../../assets/images/admin/play.png";
import pauseButton from "../../../assets/images/admin/pause.png";
import acceptButton from "../../../assets/images/admin/accept.png";
import declineButton from "../../../assets/images/admin/decline.png";
import voiceButton from "../../../assets/images/admin/voice.png";
import optionButton from "../../../assets/images/admin/option.png";
import fullscreenButton from "../../../assets/images/admin/fullscreen.png";
import closeButton from "../../../assets/images/admin/close.png";

const AdminSingleVideoPage = (): JSX.Element => {
  const history = useHistory();
  const playerRef = useRef<HTMLVideoElement>(null);
  const [showPlayBtn, setShowPlayBtn] = useState(true);
  const [video, setVideo] = useState({
    key: "60a686b53270a8001e8cf271",
    _id: "60a686b53270a8001e8cf271",
    list: [
      {
        url: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
      },
    ],
    user: {
      _id: "602507d8191d33001d2e1721",
      photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      name: "Luis Andres 1",
    },
  });

  const [videoIDs, setVideoIDS] = useState([
    "602507d8191d33001d2e1721",
    "602507d8191d33001d2e1722",
    "602507d8191d33001d2e1723",
    "602507d8191d33001d2e1724",
    "602507d8191d33001d2e1725",
    "602507d8191d33001d2e1726",
  ]);

  const [nextID, setNextID] = useState("602507d8191d33001d2e1722");
  const [prevID, setPrevID] = useState("602507d8191d33001d2e1723");

  const changePlayBtn = () => {
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

  const prevPlay = () => {
    let prevUrl = "/admin/video/";
    prevUrl += prevID;
    history.push(prevUrl);
  };

  const nextPlay = () => {
    let nextUrl = "/admin/video/";
    nextUrl += nextID;
    history.push(nextUrl);
  };

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminPageContent>
        <AdminSideBar pageType={PAGE_TYPE} />
        <AdminSingleVideoContent>
          <AdminSingleVideoContentWrapper>
            <AdminSingleVideoProfileContent>
              <AdminProfile>
                <AdminProfileImage src={video.user.photo} />
                <AdminProfileContent>
                  <AdminProfileName>{video.user.name}</AdminProfileName>
                </AdminProfileContent>
              </AdminProfile>
              <AdminVideoStatus>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </AdminVideoStatus>
            </AdminSingleVideoProfileContent>
            <AdminVideoPlayer ref={playerRef} controls>
              <source src={video.list[0].url} />
            </AdminVideoPlayer>
            <AdminVideoToolsContent>
              <AdminVideoTools>
                <AdminVideoToolsMoveButton src={moveButton} />
                <AdminVideoStatusTools>
                  <AdminVideoToolsPrevNextButton src={prevButton} onClick={prevPlay} />
                  {
                    (showPlayBtn) ? (
                      <AdminVideoToolsPlayPauseButton src={playButton} onClick={changePlayBtn} />
                    ) : (
                      <AdminVideoToolsPlayPauseButton className="admin-dashboard-video-pause-button" src={pauseButton} onClick={changePlayBtn} />
                    )
                  }
                  <AdminVideoToolsPrevNextButton src={nextButton} onClick={nextPlay} />
                </AdminVideoStatusTools>
                <AdminVideoActiveStatusTools>
                  <AdminVideoToolsAcceptButton src={acceptButton} />
                  <AdminVideoToolsDeclineButton src={declineButton} />
                </AdminVideoActiveStatusTools>
                <AdminVideoSettingsTools>
                  <AdminVideoToolsVoiceButton src={voiceButton} />
                  <AdminVideoToolsOptionButton src={optionButton} />
                  <AdminVideoToolsFullScreenButton src={fullscreenButton} />
                </AdminVideoSettingsTools>
                <AdminVideoToolsCloseButton src={closeButton} />
              </AdminVideoTools>
            </AdminVideoToolsContent>
          </AdminSingleVideoContentWrapper>
        </AdminSingleVideoContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
};

export default AdminSingleVideoPage;

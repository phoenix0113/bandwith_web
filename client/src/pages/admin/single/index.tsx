import { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { AdminStorageContext } from "../../../services/admin";
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
import { PUBLIC_STATUS, BLOCK_STATUS } from "../../../utils/constants";
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

const AdminSingleVideoPage = observer((props): JSX.Element => {
  const {
    latestVideos,
    availableVideos,
    videos,
    getVideoByID,
  } = useContext(AdminStorageContext);

  const [currentID, setCurrentID] = useState("");
  const [type, setType] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [nextID, setNextID] = useState("");
  const [prevID, setPrevID] = useState("");
  const [showPlayBtn, setShowPlayBtn] = useState(true);
  const history = useHistory();
  const playerRef = useRef<HTMLVideoElement>(null);

  const getIndex = (videoID: string) => {
    let count = 0;
    let index = 0;
    for (let i = 0; i < videoList.length; i += 1) {
      if (videoList[i]._id === videoID) {
        index = count;
      }
      count += 1;
    }
    return index;
  };

  const getNextVideoID = (videoID: string) => {
    const index = getIndex(videoID);
    if (index < videoList.length - 1) {
      setNextID(videoList[index + 1]._id);
    } else if (videoList[0] !== undefined) {
      setNextID(videoList[0]._id);
    }
  };

  const getPrevVideoID = (videoID: string) => {
    const index = getIndex(videoID);
    if (index === 0) {
      setPrevID(videoList[videoList.length - 1]?._id);
    } else if (videoList[index - 1] !== undefined) {
      setPrevID(videoList[index - 1]._id);
    }
  };

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
    getPrevVideoID(currentID);
    let prevUrl = "/admin/video/";
    prevUrl += prevID;
    prevUrl += "/";
    prevUrl += type;
    history.push(prevUrl);
  };

  const nextPlay = () => {
    getNextVideoID(currentID);
    let nextUrl = "/admin/video/";
    nextUrl += nextID;
    nextUrl += "/";
    nextUrl += type;
    history.push(nextUrl);
  };

  useEffect(() => {
    setCurrentID(props.match.params.id);
    setType(props.match.params.type);
    if (type === "latest") {
      setVideoList(latestVideos);
    } else if (type === "available") {
      setVideoList(availableVideos);
    } else if (type === "all") {
      setVideoList(videos);
    }
    getPrevVideoID(currentID);
    getNextVideoID(currentID);
  });

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminPageContent>
        <AdminSideBar pageType={PAGE_TYPE} />
        <AdminSingleVideoContent>
          <AdminSingleVideoContentWrapper>
            {
              videoList.map((item) => (
                (item._id === currentID) ? (
                  <AdminVideoPlayer ref={playerRef} controls key={item._id}>
                    <source src={item?.list[0].url} />
                  </AdminVideoPlayer>
                ) : (
                  <></>
                )
              ))
            }
            <div style={{ padding: "0 30px", width: "100%" }}>
              <AdminSingleVideoProfileContent>
                {
                  videoList.map((item) => (
                    (item._id === currentID) ? (
                      <AdminProfile key={item._id}>
                        <AdminProfileImage src={item?.user.imageUrl} />
                        <AdminProfileContent>
                          <AdminProfileName>{item?.user.name}</AdminProfileName>
                        </AdminProfileContent>
                      </AdminProfile>
                    ) : (
                      <></>
                    )
                  ))
                }
              </AdminSingleVideoProfileContent>
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
                  <AdminVideoToolsCloseButton src={closeButton} />
                </AdminVideoTools>
              </AdminVideoToolsContent>
            </div>
          </AdminSingleVideoContentWrapper>
        </AdminSingleVideoContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminSingleVideoPage;

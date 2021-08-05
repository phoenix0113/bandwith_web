import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../utils/routes";
import { AdminStorageContext } from "../../../services/admin";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import {
  AdminSingleVideoContent, AdminSingleVideoProfileContent,
  AdminSingleRecordingContentWrapper, AdminRecordingToolsContent, AdminProfile, AdminProfileImage,
  AdminProfileContent, AdminProfileName, AdminRecordingTools, AdminRecordingToolsMoveButton,
  AdminRecordingStatusTools, AdminRecordingToolsPrevNextButton, AdminRecordingToolsPlayPauseButton,
  AdminRecordingActiveStatusTools, AdminRecordingToolsAcceptButton, AdminRecordingToolsDeclineButton,
  AdminRecordingToolsCloseButton, AdminRecordingPlayer, AdminRecordingStatus,
} from "../../../components/Admin/styled";
import {
  AdminPageWrapper, AdminPageContent
} from "../styled";
import { PAGE_TYPE } from "./types";
import moveButton from "../../../assets/images/admin/move.png";
import prevButton from "../../../assets/images/admin/prev.png";
import nextButton from "../../../assets/images/admin/next.png";
import playButton from "../../../assets/images/admin/play.png";
import pauseButton from "../../../assets/images/admin/pause.png";
import acceptButton from "../../../assets/images/admin/accept.png";
import declineButton from "../../../assets/images/admin/decline.png";
import closeButton from "../../../assets/images/admin/close.png";
import { APPROVED_STATUS } from "../../../utils/constants";

const AdminSingleVideoPage = observer((props): JSX.Element => {
  const {
    // latestVideos,
    // availableVideos,
    videos,
    // updateRecordingStatus,
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

  const acceptVideo = (_id: string) => {
    // updateRecordingStatus(_id, "public");
    window.location.reload(false);
  };

  const declineVideo = (_id: string) => {
    // updateRecordingStatus(_id, "block");
    if (type === "latest") {
      history.push(Routes.ADMIN_NEW_RECORDINGS);
    } else if (type === APPROVED_STATUS) {
      history.push(Routes.ADMIN_VIDEO);
    }
    window.location.reload(false);
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
      // setVideoList(latestVideos);
    } else if (type === APPROVED_STATUS) {
      // setVideoList(availableVideos);
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
          <AdminSingleRecordingContentWrapper>
            {
              videoList.map((item) => (
                (item._id === currentID) ? (
                  <AdminRecordingPlayer ref={playerRef} controls key={item._id}>
                    <source src={item?.list[0].url} />
                  </AdminRecordingPlayer>
                ) : (
                  <div key={item._id} />
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
                      <div key={item._id} />
                    )
                  ))
                }
              </AdminSingleVideoProfileContent>
              <AdminRecordingToolsContent>
                <AdminRecordingTools>
                  <AdminRecordingToolsMoveButton src={moveButton} />
                  <AdminRecordingStatusTools>
                    <AdminRecordingToolsPrevNextButton src={prevButton} onClick={prevPlay} />
                    {
                      (showPlayBtn) ? (
                        <AdminRecordingToolsPlayPauseButton src={playButton} onClick={changePlayBtn} />
                      ) : (
                        <AdminRecordingToolsPlayPauseButton className="admin-dashboard-video-pause-button" src={pauseButton} onClick={changePlayBtn} />
                      )
                    }
                    <AdminRecordingToolsPrevNextButton src={nextButton} onClick={nextPlay} />
                  </AdminRecordingStatusTools>
                  <AdminRecordingActiveStatusTools>
                    {
                      videoList.map((item) => (
                        (item._id === currentID) ? (
                          <AdminRecordingStatus key={item._id}>
                            <AdminRecordingToolsAcceptButton
                              src={acceptButton}
                              style={(item.status !== "block") ? ({ opacity: 0.1, cursor: "auto" }) : ({ opacity: 1, cursor: "pointer" })}
                              onClick={() => acceptVideo(item._id)}
                            />
                            <AdminRecordingToolsDeclineButton
                              style={(item.status === "block") ? ({ opacity: 0.11, cursor: "auto" }) : ({ opacity: 1, cursor: "pointer" })}
                              src={declineButton}
                              onClick={() => declineVideo(item._id)}
                            />
                          </AdminRecordingStatus>
                        ) : (
                          <div key={item._id} />
                        )
                      ))
                    }
                  </AdminRecordingActiveStatusTools>
                  <AdminRecordingToolsCloseButton src={closeButton} />
                </AdminRecordingTools>
              </AdminRecordingToolsContent>
            </div>
          </AdminSingleRecordingContentWrapper>
        </AdminSingleVideoContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminSingleVideoPage;

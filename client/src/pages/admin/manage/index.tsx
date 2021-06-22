import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminUserListProfile from "../../../components/Admin/AdminUserListProfile";
import AdminUserVideoListPlayer from "../../../components/Admin/AdminVideoListPlayer";
import {
  AdminPageContent, AdminPageWrapper, AdminVideoContent, AdminVideoList, AdminVideoListStatus,
  AdminVideoWrapper, AdminVideoListTitle, AdminUserWrapper, AdminUserList, AdminVideoContentWrapper,
  AdminVideoListWrapper, AdminListActive, AdminListActiveBar, AdminVideoListStatusLabel, TextRight,
  AdminVideoListStatusInput, AdminScrollContent,
} from "../../../components/Admin/styled";
import { PAGE_TYPE } from "./types";
import { AdminStorageContext } from "../../../services/admin";
import { PUBLIC_STATUS, BLOCK_STATUS, FEATURE_STATUS } from "../../../utils/constants";

const AdminVideoPage = observer((): JSX.Element => {
  const {
    availableVideos,
    users,
    blockedIDs,
    featuredIDs,
    getUnblockedVideosByID,
    getFeaturedVideosByID,
    addBlockID,
    addFeaturedID,
    removeBlockID,
    removeFeaturedID,
    allVideosLoaded,
    allUsersLoaded,
  } = useContext(AdminStorageContext);
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [allUsers, setAllUsers] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [blockedVideos, setBlockedVideos] = useState([]);
  const [featuredVideos, setFeaturedVideos] = useState([]);

  // function for change current user
  const changeCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const getAvailableUsers = (allUsersData) => {
    const temp = [];
    for (let i = 0; i < allUsersData.length; i += 1) {
      if (allUsersData[i].status !== BLOCK_STATUS && allUsersData[i].role !== "admin") {
        temp.push(allUsersData[i]);
      }
    }
    setAllUsers(temp);
    setCurrentUser(temp[0]);
  };

  useEffect(() => {
    setAllVideos(availableVideos);
    getAvailableUsers(users);
  }, [allVideosLoaded, allUsersLoaded]);

  useEffect(() => {
    if (currentUser !== undefined) {
      getUnblockedVideosByID(currentUser._id);
      getFeaturedVideosByID(currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser !== undefined) {
      setBlockedVideos(blockedIDs);
      setFeaturedVideos(featuredIDs);
    }
  });

  const changeStatus = (id: string, status: string) => {
    console.log("change status", status);
    console.log("id", id);
    if (status === PUBLIC_STATUS) {
      let index = blockedVideos.indexOf(id, 0);
      if (index > -1) {
        removeBlockID(id, currentUser._id);
        blockedVideos.splice(index, 1);
      }

      index = featuredVideos.indexOf(id, 0);
      if (index > -1) {
        removeFeaturedID(id, currentUser._id);
        featuredVideos.splice(index, 1);
      }
    } else if (status === BLOCK_STATUS) {
      addBlockID(id, currentUser._id);
      const index = blockedVideos.indexOf(id, 0);
      if (index > -1) {
        removeBlockID(id, currentUser._id);
        featuredVideos.splice(index, 1);
      }
      blockedVideos.push(id);
    } else if (status === FEATURE_STATUS) {
      addFeaturedID(id, currentUser._id);
      const index = blockedVideos.indexOf(id, 0);
      if (index > -1) {
        removeBlockID(id, currentUser._id);
        featuredVideos.splice(index, 1);
      }
      featuredVideos.push(id);
    }
  };

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminPageContent>
        <AdminSideBar pageType={PAGE_TYPE} />
        <AdminVideoContent>
          <AdminVideoContentWrapper>
            <AdminUserWrapper>
              <AdminVideoListTitle>
                Users List
              </AdminVideoListTitle>
              <AdminScrollContent className="scrollbar-content">
                {
                  allUsers.map((user) => (
                    (user?._id === currentUser?._id) ? (
                      <div style={{ position: "relative", borderRadius: "6px" }} key={user._id}>
                        <AdminListActiveBar />
                        <AdminListActive />
                        <AdminUserList onClick={() => changeCurrentUser(user)} className="user-list-active">
                          <AdminUserListProfile
                            name={user.name}
                            imageUrl={user.imageUrl}
                            type="all"
                          />
                        </AdminUserList>
                      </div>
                    ) : (
                      <AdminUserList onClick={() => changeCurrentUser(user)} key={user._id}>
                        <AdminUserListProfile
                          name={user.name}
                          imageUrl={user.imageUrl}
                          type="all"
                        />
                      </AdminUserList>
                    )
                  ))
                }
              </AdminScrollContent>
            </AdminUserWrapper>
            <AdminVideoListWrapper>
              <AdminVideoWrapper>
                <AdminVideoListTitle>
                  Video List By User
                </AdminVideoListTitle>
                <AdminScrollContent className="scrollbar-content">
                  {
                    allVideos.map((video) => (
                      (currentUser._id === video.user._id) ? (
                        <AdminVideoList key={video._id}>
                          <AdminUserVideoListPlayer url={video.list[0].url} />
                          <div style={{ marginLeft: "26px" }}>
                            <AdminUserListProfile
                              imageUrl={video.user.imageUrl}
                              name={video.user.name}
                              type="all"
                            />
                          </div>
                          <AdminVideoListStatus>
                            <TextRight>
                              <AdminVideoListStatusLabel htmlFor={video._id}>
                                Approved
                              </AdminVideoListStatusLabel>
                              <AdminVideoListStatusInput
                                type="radio"
                                value={PUBLIC_STATUS}
                                name={video._id}
                                id={video._id}
                                checked={
                                  !(blockedVideos.indexOf(video._id) > -1)
                                  && !(featuredVideos.indexOf(video._id) > -1)
                                }
                                onChange={() => changeStatus(video._id, PUBLIC_STATUS)}
                              />
                            </TextRight>
                            <TextRight>
                              <AdminVideoListStatusLabel htmlFor={video._id}>
                                Featured
                              </AdminVideoListStatusLabel>
                              <AdminVideoListStatusInput
                                type="radio"
                                value={FEATURE_STATUS}
                                name={video._id}
                                id={video._id}
                                checked={(featuredVideos.indexOf(video._id) > -1)}
                                onChange={() => changeStatus(video._id, FEATURE_STATUS)}
                              />
                            </TextRight>
                            <TextRight>
                              <AdminVideoListStatusLabel htmlFor={video._id}>
                                Private
                              </AdminVideoListStatusLabel>
                              <AdminVideoListStatusInput
                                type="radio"
                                value={BLOCK_STATUS}
                                name={video._id}
                                id={video._id}
                                checked={(blockedVideos.indexOf(video._id) > -1)}
                                onChange={() => changeStatus(video._id, BLOCK_STATUS)}
                              />
                            </TextRight>
                          </AdminVideoListStatus>
                        </AdminVideoList>
                      ) : (
                        <div key={video._id} />
                      )
                    ))
                  }
                </AdminScrollContent>
              </AdminVideoWrapper>
            </AdminVideoListWrapper>
          </AdminVideoContentWrapper>
        </AdminVideoContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminVideoPage;

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
  AdminVideoListStatusInput,
} from "../../../components/Admin/styled";
import { PAGE_TYPE } from "./types";
import { AdminStorageContext } from "../../../services/admin";
import { PUBLIC_STATUS, BLOCK_STATUS } from "../../../utils/constants";

const AdminVideoPage = observer((): JSX.Element => {
  const {
    videos,
    users,
    blockedIDs,
    getUnblockedVideosByID,
    addBlockID,
    removeBlockID,
    allVideosLoaded,
    allUsersLoaded,
  } = useContext(AdminStorageContext);
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [allUsers, setAllUsers] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [blockedVideos, setBlockedVideos] = useState([]);

  // function for change current user
  const changeCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const getAvailableUsers = (allUsersData) => {
    const temp = [];
    for (let i = 0; i < allUsersData.length; i += 1) {
      if (allUsersData[i].status !== BLOCK_STATUS) {
        temp.push(allUsersData[i]);
      }
    }
    setAllUsers(temp);
    setCurrentUser(temp[0]);
  };

  useEffect(() => {
    setAllVideos(videos);
    getAvailableUsers(users);
  }, [allVideosLoaded, allUsersLoaded]);

  useEffect(() => {
    if (currentUser !== undefined) {
      getUnblockedVideosByID(currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser !== undefined) {
      setBlockedVideos(blockedIDs);
      console.log("Current User ID: ", currentUser._id);
      console.log("After Block Video IDs: ", blockedVideos.length);
    }
  });

  const changeStatus = (id: string, status: string) => {
    if (status === PUBLIC_STATUS) {
      const index = blockedVideos.indexOf(id, 0);
      if (index > -1) {
        removeBlockID(id, currentUser._id);
        blockedVideos.splice(index, 1);
      }
    } else if (status === BLOCK_STATUS) {
      addBlockID(id, currentUser._id);
      blockedVideos.push(id);
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
              <div className="scrollbar-sample" style={{ height: "calc(100vh - 210px)", overflowY: "auto", padding: "0 10px" }}>
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
                          />
                        </AdminUserList>
                      </div>
                    ) : (
                      <AdminUserList onClick={() => changeCurrentUser(user)} key={user._id}>
                        <AdminUserListProfile
                          name={user.name}
                          imageUrl={user.imageUrl}
                        />
                      </AdminUserList>
                    )
                  ))
                }
              </div>
            </AdminUserWrapper>
            <AdminVideoListWrapper>
              <AdminVideoWrapper>
                <AdminVideoListTitle>
                  Video List By User
                </AdminVideoListTitle>
                <div className="scrollbar-sample" style={{ height: "calc(100vh - 210px)", overflowY: "auto", padding: "0 10px" }}>
                  {
                    allVideos.map((video) => (
                      <AdminVideoList key={video._id}>
                        <AdminUserVideoListPlayer url={video.list[0].url} />
                        <div style={{ marginLeft: "26px" }}>
                          <AdminUserListProfile
                            imageUrl={video.user.imageUrl}
                            name={video.user.name}
                          />
                        </div>
                        <AdminVideoListStatus>
                          <TextRight>
                            <AdminVideoListStatusLabel htmlFor={video._id}>
                              Public
                            </AdminVideoListStatusLabel>
                            <AdminVideoListStatusInput
                              type="radio"
                              value={PUBLIC_STATUS}
                              name={video._id}
                              id={video._id}
                              checked={!(blockedVideos.indexOf(video._id) > -1)}
                              onChange={() => changeStatus(video._id, PUBLIC_STATUS)}
                            />
                          </TextRight>
                          <TextRight>
                            <AdminVideoListStatusLabel htmlFor={video._id}>
                              Block
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
                    ))
                  }
                </div>
              </AdminVideoWrapper>
            </AdminVideoListWrapper>
          </AdminVideoContentWrapper>
        </AdminVideoContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminVideoPage;

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
import { PUBLIC_STATUS, BLOCK_STATUS, FEATURE_STATUS, APPROVED_STATUS } from "../../../utils/constants";

const AdminVideoPage = observer((): JSX.Element => {
  const {
    users,
    videos,
    updateUserStatus,
    updateVideoStatus,
    allUsersLoaded,
    allVideosLoaded,
  } = useContext(AdminStorageContext);
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [allUsers, setAllUsers] = useState([]);
  const [allVideos, setAllVideos] = useState([]);

  // function for change current user
  const changeCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const setUserStatus = (id: string, status: string) => {
    const user = allUsers.find((item) => item._id === id);
    user.status = status;
  };

  const changeUserStatus = (id: string, status: string) => {
    updateUserStatus(id, status);
    setUserStatus(id, status);
  };

  const setVideoStatus = (id: string, status: string) => {
    const video = allVideos.find((item) => item._id === id);
    video.status = status;
  };

  const changeVideoStatus = (id: string, status: string) => {
    updateVideoStatus(id, status);
    setVideoStatus(id, status);
  };

  useEffect(() => {
    setAllUsers(users);
    setAllVideos(videos);
  }, [users, videos]);

  useEffect(() => {
    setCurrentUser(users[0]);
  }, [allVideosLoaded, allUsersLoaded]);

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
                  users.map((user) => (
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
                          <AdminVideoListStatus>
                            <TextRight>
                              <AdminVideoListStatusLabel htmlFor={user._id}>
                                Approved
                              </AdminVideoListStatusLabel>
                              <AdminVideoListStatusInput
                                type="radio"
                                value={APPROVED_STATUS}
                                name={user._id}
                                id={user._id}
                                checked={(user.status === APPROVED_STATUS)}
                                onChange={() => changeUserStatus(user._id, APPROVED_STATUS)}
                              />
                            </TextRight>
                            <TextRight>
                              <AdminVideoListStatusLabel htmlFor={user._id}>
                                Block
                              </AdminVideoListStatusLabel>
                              <AdminVideoListStatusInput
                                type="radio"
                                value={BLOCK_STATUS}
                                name={user._id}
                                id={user._id}
                                checked={(user.status === BLOCK_STATUS)}
                                onChange={() => changeUserStatus(user._id, BLOCK_STATUS)}
                              />
                            </TextRight>
                          </AdminVideoListStatus>
                        </AdminUserList>
                      </div>
                    ) : (
                      <AdminUserList onClick={() => changeCurrentUser(user)} key={user._id}>
                        <AdminUserListProfile
                          name={user.name}
                          imageUrl={user.imageUrl}
                          type="all"
                        />
                        <AdminVideoListStatus>
                          <TextRight>
                            <AdminVideoListStatusLabel htmlFor={user._id}>
                              Approved
                            </AdminVideoListStatusLabel>
                            <AdminVideoListStatusInput
                              type="radio"
                              value={APPROVED_STATUS}
                              name={user._id}
                              id={user._id}
                              checked={(user.status === APPROVED_STATUS)}
                              onChange={() => changeUserStatus(user._id, APPROVED_STATUS)}
                            />
                          </TextRight>
                          <TextRight>
                            <AdminVideoListStatusLabel htmlFor={user._id}>
                              Block
                            </AdminVideoListStatusLabel>
                            <AdminVideoListStatusInput
                              type="radio"
                              value={BLOCK_STATUS}
                              name={user._id}
                              id={user._id}
                              checked={(user.status === BLOCK_STATUS)}
                              onChange={() => changeUserStatus(user._id, BLOCK_STATUS)}
                            />
                          </TextRight>
                        </AdminVideoListStatus>
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
                      (currentUser?._id === video.user._id) ? (
                        <AdminVideoList key={video._id}>
                          <AdminUserVideoListPlayer url={video.list[0].url} />
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
                                checked={(video.status === PUBLIC_STATUS)}
                                onChange={() => changeVideoStatus(video._id, PUBLIC_STATUS)}
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
                                checked={(video.status === FEATURE_STATUS)}
                                onChange={() => changeVideoStatus(video._id, FEATURE_STATUS)}
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
                                checked={(video.status === BLOCK_STATUS)}
                                onChange={() => changeVideoStatus(video._id, BLOCK_STATUS)}
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

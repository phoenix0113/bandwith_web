import React, { useContext, useEffect, useState } from "react";
import { Input, Spin } from "antd";
import { observer } from "mobx-react";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminUserListProfile from "../../../components/Admin/AdminUserListProfile";
import AdminUserRecordingListPlayer from "../../../components/Admin/AdminRecordingListPlayer";
import feedIcon from "../../../assets/images/home/feed.svg";
import deleteIcon from "../../../assets/images/admin/delete.svg";
import {
  AdminRecordingContent, AdminRecordingWrapper, AdminRecordingListTitle, AdminUserWrapper, AdminUserList,
  AdminRecordingContentWrapper,
  AdminRecordingListWrapper, AdminListActive, AdminListActiveBar, ProfileName, AdminSearch,
} from "../../../components/Admin/styled";
import {
  AdminPageWrapper, AdminPageContent, AdminScrollContent, AdminRecordingList, TextRight,
  AdminRecordingListStatus, AdminRecordingListStatusLabel, AdminRecordingListStatusInput, DeleteIcon,
} from "../styled";
import { InputIconWrapper, LoaderWrapper } from "../../../components/styled";
import { PAGE_TYPE } from "./types";
import { AdminStorageContext } from "../../../services/admin";
import { PUBLIC_STATUS, BLOCK_STATUS, APPROVED_STATUS } from "../../../utils/constants";

const AdminRecordingPage = observer((): JSX.Element => {
  const {
    users,
    videos,
    // updateUserStatus,
    // updateRecordingStatus,
    // deleteRecording,
    allUsersLoaded,
    allVideosLoaded,
  } = useContext(AdminStorageContext);
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [allUsers, setAllUsers] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);

  // function for change current user
  const changeCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const setUserStatus = (id: string, status: string) => {
    const user = allUsers.find((item) => item._id === id);
    user.status = status;
  };

  const changeUserStatus = (id: string, status: string) => {
    // updateUserStatus(id, status);
    setUserStatus(id, status);
  };

  const setVideoStatus = (id: string, status: string) => {
    const video = allVideos.find((item) => item._id === id);
    video.status = status;
  };

  const changeRecordingStatus = (id: string, status: string) => {
    // updateRecordingStatus(id, status);
    setVideoStatus(id, status);
  };

  const onDelete = async (id: string) => {
    if (window.confirm("Are you sure you wish to delete this call recording?")) {
      setLoading(true);
      // await deleteRecording(id);
      setLoading(false);
    }
  };

  useEffect(() => {
    setAllUsers(users);
    setAllVideos(videos);
  }, [users, videos]);

  useEffect(() => {
    setCurrentUser(users[0]);
  }, [allVideosLoaded, allUsersLoaded]);

  useEffect(() => {
    let tempUsers = [];
    if (searchKey === "") {
      tempUsers = users;
    } else {
      users.forEach((user) => {
        if (user.email.includes(searchKey) || user.name.includes(searchKey)) {
          tempUsers.push(user);
        }
      });
    }

    setAllUsers(tempUsers);
  }, [searchKey]);

  return (
    <AdminPageWrapper>
      {
        (!loading) ? (
          <>
            <AdminHeader />
            <AdminPageContent>
              <AdminSideBar pageType={PAGE_TYPE} />
              <AdminRecordingContent>
                <AdminRecordingContentWrapper>
                  <AdminUserWrapper>
                    <AdminRecordingListTitle>
                      Users List
                    </AdminRecordingListTitle>
                    <AdminSearch>
                      <Input
                        placeholder="Search"
                        prefix={(
                          <InputIconWrapper>
                            <img src={feedIcon} alt="Search" />
                          </InputIconWrapper>
                        )}
                        onChange={(e) => setSearchKey(e.target.value)}
                      />
                    </AdminSearch>
                    <AdminScrollContent className="scrollbar-content">
                      {
                        allUsers.map((user) => (
                          (user?._id === currentUser?._id) ? (
                            <div style={{ position: "relative", borderRadius: "6px" }} key={user?._id}>
                              <AdminListActiveBar />
                              <AdminListActive />
                              <AdminUserList onClick={() => changeCurrentUser(user)} className="user-list-active">
                                <AdminUserListProfile
                                  name={user.name}
                                  email={user.email}
                                  imageUrl={user.imageUrl}
                                  type="all"
                                />
                                <AdminRecordingListStatus>
                                  <TextRight>
                                    <AdminRecordingListStatusLabel htmlFor={user?._id}>
                                      Approved
                                    </AdminRecordingListStatusLabel>
                                    <AdminRecordingListStatusInput
                                      type="radio"
                                      value={APPROVED_STATUS}
                                      name={user?._id}
                                      id={user?._id}
                                      checked={(user.status === APPROVED_STATUS)}
                                      onChange={() => changeUserStatus(user?._id, APPROVED_STATUS)}
                                    />
                                  </TextRight>
                                  <TextRight>
                                    <AdminRecordingListStatusLabel htmlFor={user?._id}>
                                      Block
                                    </AdminRecordingListStatusLabel>
                                    <AdminRecordingListStatusInput
                                      type="radio"
                                      value={BLOCK_STATUS}
                                      name={user?._id}
                                      id={user?._id}
                                      checked={(user.status === BLOCK_STATUS)}
                                      onChange={() => changeUserStatus(user?._id, BLOCK_STATUS)}
                                    />
                                  </TextRight>
                                </AdminRecordingListStatus>
                              </AdminUserList>
                            </div>
                          ) : (
                            <AdminUserList onClick={() => changeCurrentUser(user)} key={user?._id}>
                              <AdminUserListProfile
                                name={user.name}
                                email={user.email}
                                imageUrl={user.imageUrl}
                                type="all"
                              />
                              <AdminRecordingListStatus>
                                <TextRight>
                                  <AdminRecordingListStatusLabel htmlFor={user?._id}>
                                    Approved
                                  </AdminRecordingListStatusLabel>
                                  <AdminRecordingListStatusInput
                                    type="radio"
                                    value={APPROVED_STATUS}
                                    name={user?._id}
                                    id={user?._id}
                                    checked={(user.status === APPROVED_STATUS)}
                                    onChange={() => changeUserStatus(user?._id, APPROVED_STATUS)}
                                  />
                                </TextRight>
                                <TextRight>
                                  <AdminRecordingListStatusLabel htmlFor={user?._id}>
                                    Block
                                  </AdminRecordingListStatusLabel>
                                  <AdminRecordingListStatusInput
                                    type="radio"
                                    value={BLOCK_STATUS}
                                    name={user?._id}
                                    id={user?._id}
                                    checked={(user.status === BLOCK_STATUS)}
                                    onChange={() => changeUserStatus(user?._id, BLOCK_STATUS)}
                                  />
                                </TextRight>
                              </AdminRecordingListStatus>
                            </AdminUserList>
                          )
                        ))
                      }
                    </AdminScrollContent>
                  </AdminUserWrapper>
                  <AdminRecordingListWrapper>
                    <AdminRecordingWrapper>
                      <AdminRecordingListTitle style={{ marginBottom: 70 }}>
                        Video List By User
                      </AdminRecordingListTitle>
                      <AdminScrollContent className="scrollbar-content">
                        {
                          allVideos.map((video) => (
                            (currentUser?._id === video.user?._id) ? (
                              <AdminRecordingList key={video._id}>
                                <AdminUserRecordingListPlayer url={video.list[0].url} />
                                <ProfileName>
                                  {video.name}
                                </ProfileName>
                                <AdminRecordingListStatus>
                                  <TextRight>
                                    <AdminRecordingListStatusLabel htmlFor={video._id}>
                                      Public
                                    </AdminRecordingListStatusLabel>
                                    <AdminRecordingListStatusInput
                                      type="radio"
                                      value={PUBLIC_STATUS}
                                      name={video._id}
                                      id={video._id}
                                      checked={(video.status === PUBLIC_STATUS)}
                                      onChange={() => changeRecordingStatus(video._id, PUBLIC_STATUS)}
                                    />
                                  </TextRight>
                                  <TextRight>
                                    <AdminRecordingListStatusLabel htmlFor={video._id}>
                                      Block
                                    </AdminRecordingListStatusLabel>
                                    <AdminRecordingListStatusInput
                                      type="radio"
                                      value={BLOCK_STATUS}
                                      name={video._id}
                                      id={video._id}
                                      checked={(video.status === BLOCK_STATUS)}
                                      onChange={() => changeRecordingStatus(video._id, BLOCK_STATUS)}
                                    />
                                  </TextRight>
                                  <TextRight>
                                    <AdminRecordingListStatusLabel htmlFor={video._id}>
                                      Delete
                                    </AdminRecordingListStatusLabel>
                                    <DeleteIcon src={deleteIcon} alt="Delete" onClick={() => onDelete(video.callId)} />
                                  </TextRight>
                                </AdminRecordingListStatus>
                              </AdminRecordingList>
                            ) : (
                              <div key={video._id} />
                            )
                          ))
                        }
                      </AdminScrollContent>
                    </AdminRecordingWrapper>
                  </AdminRecordingListWrapper>
                </AdminRecordingContentWrapper>
              </AdminRecordingContent>
            </AdminPageContent>
          </>
        ) : (
          <LoaderWrapper>
            <Spin size="large" />
          </LoaderWrapper>
        )
      }
    </AdminPageWrapper>
  );
});

export default AdminRecordingPage;

import React, { useState, useEffect, useContext, useRef } from "react";
import { observer } from "mobx-react";
import { Input, Spin } from "antd";
import { Utils } from "avcore/client";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminUserListProfile from "../../../components/Admin/AdminUserListProfile";
import AdminUsersRecording from "../../../components/Admin/AdminRecordingList";
import { AdminStorageContext } from "../../../services/admin";
import {
  AdminRecordingList, TextRight, AdminUserListStatus, AdminRecordingListStatusLabel,
  AdminRecordingListStatusInput, AdminListActiveBar, AdminListActive,
} from "../../../components/Admin/styled";
import { InputIconWrapper, LoaderWrapper } from "../../../components/styled";
import {
  AdminPageWrapper, AdminPageContent, AdminContentWrapper, AdminUserContent,
  AdminRecordingContentTitle, AdminScrollContent, RecordingContentWrapper, AdminSearch,
  AdminUserListContent, AdminUserList,
} from "../styled";

import { PAGE_TYPE } from "./types";
import { PUBLIC_STATUS, BLOCK_STATUS, APPROVED_STATUS } from "../../../utils/constants";

import feedIcon from "../../../assets/images/home/feed.svg";

const AdminUsersPage = observer((): JSX.Element => {
  const {
    onLoaded,
    users,
    currentUser,
    currentUserRecordings,
    changeCurrentUser,
    updateRecordingStatus,
    updateUserStatus,
    setSearchUserKey,
    loadUsers,
  } = useContext(AdminStorageContext);

  const [searchKey, setSearchKey] = useState("");

  const changeUserStatus = async (id: string, status: string) => {
    await updateUserStatus(id, status);
  };

  const onSearch = async () => {
    await setSearchUserKey(searchKey);
  };

  const onChangeCurrentUser = (id: string) => {
    changeCurrentUser(id);
  };

  const onChangeRecordingStatus = (id: string, status: string) => {
    updateRecordingStatus(id, status, "");
  };

  const [userScrollTop, setUserScrollTop] = useState(0);
  const userScrollRef = useRef<HTMLDivElement>(null);
  const userHeightRef = useRef<HTMLDivElement>(null);

  const onUserScroll = () => {
    setUserScrollTop(userScrollRef.current.scrollTop);
  };

  useEffect(() => {
    if (userScrollRef.current) {
      const createdObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setUserScrollTop(userScrollRef.current.scrollTop);
          } else if (Utils.isSafari) {
            console.log(`For some reason, entry is not intersecting. May need a new method. Scrolling from ${entry.target.id} to the bottom`);
          }
        });
      }, { threshold: 0.8, root: userScrollRef.current });
    }
  }, [userScrollRef]);

  useEffect(() => {
    if (userScrollTop + userScrollRef.current?.offsetHeight
      === userHeightRef.current?.offsetHeight) {
      const executeScroll = async () => {
        await loadUsers();
        userScrollRef.current.scrollTo(0, userScrollTop);
      };
      executeScroll();
    }
  }, [userScrollTop]);

  useEffect(() => {
    setSearchUserKey("");
  }, []);

  return (
    <AdminPageWrapper>
      {
        (!onLoaded) ? (
          <LoaderWrapper>
            <Spin size="large" />
          </LoaderWrapper>
        ) : (
          <>
            <AdminHeader />
            <AdminPageContent>
              <AdminSideBar pageType={PAGE_TYPE} />
              <AdminContentWrapper>
                <AdminUserContent>
                  <AdminUserListContent>
                    <AdminRecordingContentTitle>
                      Users List
                    </AdminRecordingContentTitle>
                    <AdminSearch>
                      <Input
                        placeholder="Search"
                        value={searchKey}
                        onKeyUp={(e) => {
                          if (e.keyCode === 13) {
                            onSearch();
                          }
                        }}
                        suffix={(
                          <InputIconWrapper className="cursor-pointer" onClick={onSearch}>
                            <img src={feedIcon} alt="Search" />
                          </InputIconWrapper>
                        )}
                        onChange={(e) => setSearchKey(e.target.value)}
                        autoFocus
                      />
                    </AdminSearch>
                    <AdminScrollContent
                      className="scrollbar-content"
                      ref={userScrollRef}
                      onScroll={onUserScroll}
                    >
                      <RecordingContentWrapper ref={userHeightRef} className="justify-center">
                        {
                          users.map((user) => (
                            <AdminUserList
                              key={user?._id}
                              className={(user._id === currentUser._id) ? "user-list-active" : ""}
                              onClick={() => onChangeCurrentUser(user?._id)}
                            >
                              {
                                (user._id === currentUser._id) && (
                                  <>
                                    <AdminListActiveBar />
                                    <AdminListActive />
                                  </>
                                )
                              }
                              <div className="margin-left-10">
                                <AdminUserListProfile
                                  imageUrl={user.imageUrl}
                                  name={user.name}
                                  email={user.email}
                                  type="none"
                                />
                              </div>
                              <AdminUserListStatus>
                                <TextRight>
                                  <AdminRecordingListStatusLabel htmlFor={user?._id}>
                                    Available
                                  </AdminRecordingListStatusLabel>
                                  <AdminRecordingListStatusInput
                                    type="radio"
                                    value={PUBLIC_STATUS}
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
                                    checked={(user.status === "block")}
                                    onChange={() => changeUserStatus(user?._id, "block")}
                                  />
                                </TextRight>
                              </AdminUserListStatus>
                            </AdminUserList>
                          ))
                        }
                      </RecordingContentWrapper>
                    </AdminScrollContent>
                  </AdminUserListContent>
                  <AdminUserListContent>
                    <AdminRecordingContentTitle style={{ marginBottom: 90 }}>
                      User&apos;s Recordings List
                    </AdminRecordingContentTitle>
                    <AdminScrollContent className="scrollbar-content">
                      <RecordingContentWrapper className="justify-center w-full">
                        {
                          currentUserRecordings.map((item) => (
                            <AdminUsersRecording
                              recording={item}
                              type="none"
                              changeRecordingStatus={onChangeRecordingStatus}
                              key={item._id}
                            />
                          ))
                        }
                      </RecordingContentWrapper>
                    </AdminScrollContent>
                  </AdminUserListContent>
                </AdminUserContent>
              </AdminContentWrapper>
            </AdminPageContent>
          </>
        )
      }
    </AdminPageWrapper>
  );
});

export default AdminUsersPage;

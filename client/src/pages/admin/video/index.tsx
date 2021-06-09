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

const AdminVideoPage = observer((): JSX.Element => {
  const {
    videos,
    users,
    allVideosLoaded,
    allUsersLoaded,
  } = useContext(AdminStorageContext);
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [allUsers, setAllUsers] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const changeCurrentUser = (user) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    setCurrentUser(users[0]);
    setAllUsers(users);
    setAllVideos(videos);
    console.log("++++++++++++++ users +++++++++++++++");
    console.log(allUsers);
    console.log("++++++++++++++++++++++++++++++++++++");
    console.log("-------------- videos --------------");
    console.log(allVideos);
    console.log("------------------------------------");
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
            </AdminUserWrapper>
            <AdminVideoListWrapper>
              <AdminVideoWrapper>
                <AdminVideoListTitle>
                  Video List By User
                </AdminVideoListTitle>
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
                          <AdminVideoListStatusInput type="radio" value="public" name={video._id} id={video._id} />
                        </TextRight>
                        <TextRight>
                          <AdminVideoListStatusLabel htmlFor={video._id}>
                            Block
                          </AdminVideoListStatusLabel>
                          <AdminVideoListStatusInput type="radio" value="block" name={video._id} id={video._id} />
                        </TextRight>
                      </AdminVideoListStatus>
                    </AdminVideoList>
                  ))
                }
              </AdminVideoWrapper>
            </AdminVideoListWrapper>
          </AdminVideoContentWrapper>
        </AdminVideoContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminVideoPage;

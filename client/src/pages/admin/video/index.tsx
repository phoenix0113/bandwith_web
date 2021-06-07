import React, { useState } from "react";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminUser from "../../../components/Admin/AdminUser";
import AdminUserVideoList from "../../../components/Admin/AdminUserVideoList";
import {
  AdminPageContent, AdminPageWrapper, AdminVideoContent, AdminVideoList, AdminVideoListStatus,
  AdminVideoWrapper, AdminVideoListTitle, AdminUserWrapper, AdminUserList, AdminAction,
  AdminVideoListSaveButton, AdminVideoContentWrapper,
} from "../../../components/Admin/styled";
import { PAGE_TYPE } from "./types";

const AdminVideoPage = (): JSX.Element => {
  const users = [
    {
      _id: "602507d8191d33001d2e1721",
      photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      name: "Luis Andres 1",
    },
    {
      _id: "60250814191d33001d2e1725",
      photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      name: "Luis Andres 2",
    },
    {
      _id: "602a41133fa03d001d0bb1c7",
      photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      name: "Luis Andres 3",
    },
    {
      _id: "602bdcf13fa03d001d0bb1d3",
      photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      name: "Luis Andres 4",
    },
  ];
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [videos, setVideos] = useState([
    {
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
    },
    {
      key: "60a686b53270a8001e8cf272",
      _id: "60a686b53270a8001e8cf272",
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
    },
    {
      key: "60a686b53270a8001e8cf273",
      _id: "60a686b53270a8001e8cf273",
      list: [
        {
          url: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
        },
      ],
      user: {
        _id: "602507d8191d33001d2e1721",
        photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        name: "Luis Andres 2",
      },
    },
    {
      key: "60a686b53270a8001e8cf274",
      _id: "60a686b53270a8001e8cf274",
      list: [
        {
          url: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
        },
      ],
      user: {
        _id: "602507d8191d33001d2e1721",
        photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        name: "Luis Andres 2",
      },
    },
    {
      key: "60a686b53270a8001e8cf275",
      _id: "60a686b53270a8001e8cf275",
      list: [
        {
          url: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
        },
      ],
      user: {
        _id: "602507d8191d33001d2e1721",
        photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        name: "Luis Andres 2",
      },
    },
    {
      key: "60a686b53270a8001e8cf276",
      _id: "60a686b53270a8001e8cf276",
      list: [
        {
          url: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
        },
      ],
      user: {
        _id: "602507d8191d33001d2e1721",
        photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        name: "Luis Andres 3",
      },
    },
    {
      key: "60a686b53270a8001e8cf277",
      _id: "60a686b53270a8001e8cf277",
      list: [
        {
          url: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
        },
      ],
      user: {
        _id: "602507d8191d33001d2e1721",
        photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        name: "Luis Andres 3",
      },
    },
    {
      key: "60a686b53270a8001e8cf278",
      _id: "60a686b53270a8001e8cf278",
      list: [
        {
          url: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
        },
      ],
      user: {
        _id: "602507d8191d33001d2e1721",
        photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        name: "Luis Andres 4",
      },
    },
    {
      key: "60a686b53270a8001e8cf279",
      _id: "60a686b53270a8001e8cf279",
      list: [
        {
          url: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
        },
      ],
      user: {
        key: "602507d8191d33001d2e1721",
        _id: "602507d8191d33001d2e1721",
        photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        name: "Luis Andres 4",
      },
    },
  ]);

  const changeCurrentUser = (user) => {
    console.log(user);
    setCurrentUser(user);
  };

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminPageContent>
        <AdminSideBar pageType={PAGE_TYPE} />
        <AdminVideoContent>
          <AdminAction>
            <AdminVideoListSaveButton>Save</AdminVideoListSaveButton>
          </AdminAction>
          <AdminVideoContentWrapper>
            <AdminUserWrapper>
              <AdminVideoListTitle>
                User list
              </AdminVideoListTitle>
              {
                users.map((user) => (
                  (user._id === currentUser._id) ? (
                    <AdminUserList onClick={() => changeCurrentUser(user)} key={user._id} className="user-list-active">
                      <AdminUser name={user.name} photo={user.photo} id={user._id} />
                    </AdminUserList>
                  ) : (
                    <AdminUserList onClick={() => changeCurrentUser(user)} key={user._id}>
                      <AdminUser name={user.name} photo={user.photo} id={user._id} />
                    </AdminUserList>
                  )
                ))
              }
            </AdminUserWrapper>
            <AdminVideoWrapper>
              <AdminVideoListTitle>
                Video List by user
              </AdminVideoListTitle>
              {
                videos.map((video) => (
                  <AdminVideoList key={video._id} style={{ minWidth: "500px" }}>
                    <AdminUserVideoList url={video.list[0].url} id={video._id} />
                    <AdminUser
                      name={video.user.name}
                      photo={video.user.photo}
                      id={video.user._id}
                    />
                    <AdminVideoListStatus style={{ width: "100px" }}>
                      <option>Public</option>
                      <option>Private</option>
                    </AdminVideoListStatus>
                  </AdminVideoList>
                ))
              }
            </AdminVideoWrapper>
          </AdminVideoContentWrapper>
        </AdminVideoContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
};

export default AdminVideoPage;

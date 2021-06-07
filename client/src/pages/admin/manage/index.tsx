import { useState } from "react";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminUserVideoList from "../../../components/Admin/AdminUserVideoList";
import {
  AdminPageContent, AdminPageWrapper, AdminVideoManageContent, AdminVideoManageWrapper,
  AdminVideoManageList, AdminVideoManageProfile, AdminVideoManageProfileImage,
  AdminVideoManageProfileName, AdminVideoManageStatus,
} from "../../../components/Admin/styled";
import { PAGE_TYPE } from "./types";

const AdminManagePage = () => {
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

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminPageContent>
        <AdminSideBar pageType={PAGE_TYPE} />
        <AdminVideoManageContent>
          <AdminVideoManageWrapper>
            {
              videos.map((video) => (
                <AdminVideoManageList key={video._id}>
                  <AdminUserVideoList url={video.list[0].url} id={video._id} />
                  <AdminVideoManageProfile>
                    <AdminVideoManageProfileImage src={video.user.photo} />
                    <AdminVideoManageProfileName>
                      {video.user.name}
                    </AdminVideoManageProfileName>
                  </AdminVideoManageProfile>
                  <AdminVideoManageStatus>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="blocked">Blocked</option>
                    <option value="unblock">Unblock</option>
                  </AdminVideoManageStatus>
                </AdminVideoManageList>
              ))
            }
          </AdminVideoManageWrapper>
        </AdminVideoManageContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
};

export default AdminManagePage;

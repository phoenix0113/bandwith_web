import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminUserVideoListPlayer from "../../../components/Admin/AdminVideoListPlayer";
import AdminUserListProfile from "../../../components/Admin/AdminUserListProfile";
import { AdminStorageContext } from "../../../services/admin";
import {
  AdminPageContent, AdminPageWrapper, AdminVideoManageContent, AdminVideoManageWrapper,
  AdminVideoList, AdminVideoListStatus, TextRight, AdminVideoListStatusLabel,
  AdminVideoListStatusInput,
} from "../../../components/Admin/styled";
import { PAGE_TYPE } from "./types";

const AdminManagePage = observer((): JSX.Element => {
  const {
    videos,
    updateStatus,
  } = useContext(AdminStorageContext);
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    setAllVideos(videos);
  }, [videos]);

  const setStatus = (id: string, status: string) => {
    const video = allVideos.find((item) => item._id === id);
    video.status = status;
  };

  const onChangeStatus = (
    id: string, status: string,
  ) => {
    updateStatus(id, status);
    setStatus(id, status);
  };

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminPageContent>
        <AdminSideBar pageType={PAGE_TYPE} />
        <AdminVideoManageContent>
          <AdminVideoManageWrapper>
            {
              allVideos.map((video) => (
                <AdminVideoList key={video._id}>
                  <AdminUserVideoListPlayer url={video.list[0].url} />
                  <div style={{ marginLeft: "26px", marginRight: "26px" }}>
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
                        value="public"
                        name={video._id}
                        id={video._id}
                        checked={(video.status === "public")}
                        onChange={() => onChangeStatus(video._id, "public")}
                      />
                    </TextRight>
                    <TextRight>
                      <AdminVideoListStatusLabel htmlFor={video._id}>
                        Feature
                      </AdminVideoListStatusLabel>
                      <AdminVideoListStatusInput
                        type="radio"
                        value="feature"
                        name={video._id}
                        id={video._id}
                        checked={(video.status === "feature")}
                        onChange={() => onChangeStatus(video._id, "feature")}
                      />
                    </TextRight>
                    <TextRight>
                      <AdminVideoListStatusLabel htmlFor={video._id}>
                        Block
                      </AdminVideoListStatusLabel>
                      <AdminVideoListStatusInput
                        type="radio"
                        value="block"
                        name={video._id}
                        id={video._id}
                        checked={(video.status === "block")}
                        onChange={() => onChangeStatus(video._id, "block")}
                      />
                    </TextRight>
                  </AdminVideoListStatus>
                </AdminVideoList>
              ))
            }
          </AdminVideoManageWrapper>
        </AdminVideoManageContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminManagePage;

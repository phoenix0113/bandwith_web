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
  AdminVideoListStatusInput, AdminScrollContent, AdminVideoListTitle,
} from "../../../components/Admin/styled";
import { PAGE_TYPE } from "./types";
import { PUBLIC_STATUS, BLOCK_STATUS, FEATURE_STATUS } from "../../../utils/constants";

const AdminManagePage = observer((): JSX.Element => {
  const {
    videos,
    updateVideoStatus,
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
    updateVideoStatus(id, status);
    setStatus(id, status);
  };

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminPageContent>
        <AdminSideBar pageType={PAGE_TYPE} />
        <AdminVideoManageContent>
          <AdminVideoListTitle>
            Video List
          </AdminVideoListTitle>
          <AdminVideoManageWrapper>
            <AdminScrollContent className="scrollbar-content">
              {
                allVideos.map((video) => (
                  <AdminVideoList key={video._id}>
                    <AdminUserVideoListPlayer url={video.list[0].url} />
                    <div style={{ marginLeft: "26px", marginRight: "26px" }}>
                      <AdminUserListProfile
                        imageUrl={video.user.imageUrl}
                        name={video.user.name}
                        type="all"
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
                          checked={(video.status === PUBLIC_STATUS)}
                          onChange={() => onChangeStatus(video._id, PUBLIC_STATUS)}
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
                          checked={(video.status === BLOCK_STATUS)}
                          onChange={() => onChangeStatus(video._id, BLOCK_STATUS)}
                        />
                      </TextRight>
                    </AdminVideoListStatus>
                  </AdminVideoList>
                ))
              }
            </AdminScrollContent>
          </AdminVideoManageWrapper>
        </AdminVideoManageContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminManagePage;

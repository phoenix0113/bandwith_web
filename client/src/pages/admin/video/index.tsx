import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminUserRecordingListPlayer from "../../../components/Admin/AdminRecordingListPlayer";
import AdminUserListProfile from "../../../components/Admin/AdminUserListProfile";
import { AdminStorageContext } from "../../../services/admin";
import { AdminRecordingManageContent, AdminRecordingManageWrapper, AdminRecordingListTitle } from "../../../components/Admin/styled";
import {
  AdminPageWrapper, AdminPageContent, AdminScrollContent, AdminRecordingList, TextRight,
  AdminRecordingListStatus, AdminRecordingListStatusLabel, AdminRecordingListStatusInput,
} from "../styled";
import { PAGE_TYPE } from "./types";
import { PUBLIC_STATUS, BLOCK_STATUS } from "../../../utils/constants";

const AdminManagePage = observer((): JSX.Element => {
  const {
    videos,
    // updateRecordingStatus,
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
    // updateRecordingStatus(id, status);
    setStatus(id, status);
  };

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminPageContent>
        <AdminSideBar pageType={PAGE_TYPE} />
        <AdminRecordingManageContent>
          <AdminRecordingListTitle>
            Video List
          </AdminRecordingListTitle>
          <AdminRecordingManageWrapper>
            <AdminScrollContent className="scrollbar-content">
              {
                allVideos.map((video) => (
                  <AdminRecordingList key={video._id}>
                    <AdminUserRecordingListPlayer url={video.list[0].url} />
                    <div style={{ marginLeft: "26px", marginRight: "26px" }}>
                      <AdminUserListProfile
                        imageUrl={video.user.imageUrl}
                        name={video.user.name}
                        email={video.user.email}
                        type="all"
                      />
                    </div>
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
                          onChange={() => onChangeStatus(video._id, PUBLIC_STATUS)}
                        />
                      </TextRight>
                      <TextRight>
                        <AdminRecordingListStatusLabel htmlFor={video._id}>
                          Block
                        </AdminRecordingListStatusLabel>
                        <AdminRecordingListStatusInput
                          type="radio"
                          value="block"
                          name={video._id}
                          id={video._id}
                          checked={(video.status === BLOCK_STATUS)}
                          onChange={() => onChangeStatus(video._id, BLOCK_STATUS)}
                        />
                      </TextRight>
                    </AdminRecordingListStatus>
                  </AdminRecordingList>
                ))
              }
            </AdminScrollContent>
          </AdminRecordingManageWrapper>
        </AdminRecordingManageContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminManagePage;

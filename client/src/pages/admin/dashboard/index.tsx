import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { AdminStorageContext } from "../../../services/admin";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminVideo from "../../../components/Admin/AdminVideo";
import {
  AdminPageContent, AdminPageWrapper, AdminDashboardVideoTitle, AdminDashboardContent,
  VideoContentWrapper, AdminDashboardVideoContent, AdminScrollContent,
} from "../../../components/Admin/styled";
import { PAGE_TYPE } from "./types";

const AdminDashboardPage = observer((): JSX.Element => {
  const {
    latestVideos,
  } = useContext(AdminStorageContext);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(latestVideos);
  }, [latestVideos]);

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminPageContent>
        <AdminSideBar pageType={PAGE_TYPE} />
        <AdminDashboardContent>
          <AdminDashboardVideoContent>
            <AdminDashboardVideoTitle>
              Controled Video:
            </AdminDashboardVideoTitle>
            <AdminScrollContent className="scrollbar-content">
              <VideoContentWrapper>
                {
                  videos.map((latestVideo) => (
                    <AdminVideo
                      url={latestVideo.list[0].url}
                      key={latestVideo._id}
                    />
                  ))
                }
              </VideoContentWrapper>
            </AdminScrollContent>
          </AdminDashboardVideoContent>
        </AdminDashboardContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminDashboardPage;

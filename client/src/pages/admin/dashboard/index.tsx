import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { AdminStorageContext } from "../../../services/admin";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminVideo from "../../../components/Admin/AdminVideo";
import {
  AdminPageContent, AdminPageWrapper, AdminDashboardVideoTitle, AdminDashboardContent,
  VideoContentWrapper, AdminDashboardVideoContent,
} from "../../../components/Admin/styled";
import { PAGE_TYPE } from "./types";
import { VIDEO_LOAD_LIMIT } from "../../../utils/constants";

const AdminDashboardPage = observer((): JSX.Element => {
  const {
    videos,
  } = useContext(AdminStorageContext);

  const [allVideos, setAllVideos] = useState([]);
  const [latestVideos, setLatestVideos] = useState([]);

  useEffect(() => {
    setAllVideos(videos);
  }, [videos]);

  useEffect(() => {
    if (allVideos.length < VIDEO_LOAD_LIMIT) {
      setLatestVideos(allVideos);
    } else {
      const temp = [];
      for (let i = 0; i < VIDEO_LOAD_LIMIT; i += 1) {
        temp.push(allVideos[i]);
      }
      setLatestVideos(temp);
    }
  }, [allVideos]);

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
            <VideoContentWrapper>
              {
                latestVideos.map((latestVideo) => (
                  <AdminVideo url={latestVideo.list[0].url} key={latestVideo._id} />
                ))
              }
            </VideoContentWrapper>
          </AdminDashboardVideoContent>
        </AdminDashboardContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminDashboardPage;

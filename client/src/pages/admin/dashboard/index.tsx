import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminVideo from "../../../components/Admin/AdminVideo";
import {
  AdminPageContent, AdminPageWrapper, AdminDashboardVideoTitle, AdminDashboardContent,
  VideoContentWrapper, AdminDashboardVideoContent,
} from "../../../components/Admin/styled";
import { PAGE_TYPE } from "./types";

const AdminDashboardPage = (): JSX.Element => {
  const videoUrls = [
    "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
  ];

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
                videoUrls.map((videoUrl) => (
                  <AdminVideo url={videoUrl} key={Math.random()} />
                ))
              }
            </VideoContentWrapper>
          </AdminDashboardVideoContent>
        </AdminDashboardContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
};

export default AdminDashboardPage;

import { useState } from "react";
import {
  SideBarSection, SideBarUl, SideBarLi, SideBarActive, SideBarHref,
  LogoutModalSection, LogoutModal, LogoutModalTitle, LogoutModalFooter, LogoutModalButton,
} from "./styled";

const AdminSideBar = (pageType): JSX.Element => {
  const [logoutModalStatus, setLogoutModalStatus] = useState(false);
  const pages = [
    { key: "dashboard", value: "Dashboard" },
    { key: "video", value: "Video" },
    { key: "help", value: "Help" },
  ];

  const handleLogoutModal = () => {
    setLogoutModalStatus(true);
  };

  const handleLogoutCancel = () => {
    setLogoutModalStatus(false);
  };

  const handleLogout = () => {
    setLogoutModalStatus(false);
  };

  return (
    <SideBarSection>
      <SideBarUl>
        {pages.map((page) => (
          (pageType.pageType === page.key) ? (
            <SideBarLi className="admin-active" key={page.key}>
              <SideBarActive />
              <SideBarHref
                className="active"
                href={page.key}
              >
                {page.value}
              </SideBarHref>
            </SideBarLi>
          ) : (
            <SideBarLi key={page.key}>
              <SideBarHref
                href={page.key}
              >
                {page.value}
              </SideBarHref>
            </SideBarLi>
          )
        ))}
        <SideBarLi
          // onClick={handleLogoutModal}
          className="pa-left-50 cursor-pointer"
        >
          Log Out
        </SideBarLi>
      </SideBarUl>
      {
        (logoutModalStatus) ? (
          <LogoutModalSection>
            <LogoutModal>
              <LogoutModalTitle>
                Are you sure tha you want Logout ?
              </LogoutModalTitle>
              <LogoutModalFooter>
                <LogoutModalButton onClick={handleLogout}>Logout</LogoutModalButton>
                <LogoutModalButton onClick={handleLogoutCancel}>Cancel</LogoutModalButton>
              </LogoutModalFooter>
            </LogoutModal>
          </LogoutModalSection>
        ) : ""
      }
    </SideBarSection>

  );
};

export default AdminSideBar;

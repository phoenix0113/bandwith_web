import React, { useState, useEffect, useContext, useRef } from "react";
import { observer } from "mobx-react";
import { Utils } from "avcore/client";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminUserListProfile from "../../../components/Admin/AdminUserListProfile";
import { AdminStorageContext } from "../../../services/admin";
import {
  AdminRecordingList, TextRight, AdminUserListStatus, AdminRecordingListStatusLabel,
  AdminRecordingListStatusInput,
} from "../../../components/Admin/styled";
import {
  AdminPageWrapper, AdminPageContent, AdminContentWrapper, AdminRecordingContent,
  AdminRecordingContentTitle, AdminScrollContent, RecordingContentWrapper,
} from "../styled";

import { PAGE_TYPE } from "./types";
import { PUBLIC_STATUS, BLOCK_STATUS, APPROVED_STATUS } from "../../../utils/constants";

const AdminUsersPage = observer((): JSX.Element => {
  const {
    users,
    updateUserStatus,
    loadAllUsers,
  } = useContext(AdminStorageContext);

  const changeUserStatus = async (id: string, status: string) => {
    await updateUserStatus(id, status);
  };

  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    setScrollTop(scrollRef.current.scrollTop);
  };

  useEffect(() => {
    if (scrollRef.current) {
      const createdObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setScrollTop(scrollRef.current.scrollTop);
          } else if (Utils.isSafari) {
            console.log(`For some reason, entry is not intersecting. May need a new method. Scrolling from ${entry.target.id} to the bottom`);
          }
        });
      }, { threshold: 0.8, root: scrollRef.current });
    }
  }, [scrollRef]);

  useEffect(() => {
    if (scrollTop + scrollRef.current.offsetHeight === heightRef.current.offsetHeight) {
      loadAllUsers();
    }
  }, [scrollTop]);

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminPageContent>
        <AdminSideBar pageType={PAGE_TYPE} />
        <AdminContentWrapper>
          <AdminRecordingContent>
            <AdminRecordingContentTitle>
              Users List
            </AdminRecordingContentTitle>
            <AdminScrollContent
              className="scrollbar-content"
              ref={scrollRef}
              onScroll={onScroll}
            >
              <RecordingContentWrapper ref={heightRef}>
                {
                  users.map((user) => (
                    <AdminRecordingList key={user?._id}>
                      <div style={{ marginLeft: "26px", marginRight: "26px" }}>
                        <AdminUserListProfile
                          imageUrl={user.imageUrl}
                          name={user.name}
                          email={user.email}
                          type="none"
                        />
                      </div>
                      <AdminUserListStatus>
                        <TextRight>
                          <AdminRecordingListStatusLabel htmlFor={user?._id}>
                            Available
                          </AdminRecordingListStatusLabel>
                          <AdminRecordingListStatusInput
                            type="radio"
                            value={PUBLIC_STATUS}
                            name={user?._id}
                            id={user?._id}
                            checked={(user.status === APPROVED_STATUS)}
                            onChange={() => changeUserStatus(user?._id, APPROVED_STATUS)}
                          />
                        </TextRight>
                        <TextRight>
                          <AdminRecordingListStatusLabel htmlFor={user?._id}>
                            Block
                          </AdminRecordingListStatusLabel>
                          <AdminRecordingListStatusInput
                            type="radio"
                            value={BLOCK_STATUS}
                            name={user?._id}
                            id={user?._id}
                            checked={(user.status === "block")}
                            onChange={() => changeUserStatus(user?._id, "block")}
                          />
                        </TextRight>
                      </AdminUserListStatus>
                    </AdminRecordingList>
                  ))
                }
              </RecordingContentWrapper>
            </AdminScrollContent>
          </AdminRecordingContent>
        </AdminContentWrapper>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminUsersPage;

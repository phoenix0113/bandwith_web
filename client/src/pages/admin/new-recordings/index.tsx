import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { AdminStorageContext } from "../../../services/admin";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminUserRecordingListPlayer from "../../../components/Admin/AdminRecordingListPlayer";
import { LoaderWrapper } from "../../../components/styled";
import {
  AdminPageWrapper, AdminPageContent, AdminContentWrapper, AdminRecordingContent,
  AdminRecordingContentTitle, AdminScrollContent, RecordingContentWrapper, AdminRecordingList,
  RecordingName, TextRight, AdminRecordingListStatus, AdminRecordingListStatusLabel,
  AdminRecordingListStatusInput, DeleteIcon,
} from "../styled";
import { PUBLIC_STATUS, BLOCK_STATUS } from "../../../utils/constants";
import deleteIcon from "../../../assets/images/admin/delete.svg";
import { PAGE_TYPE } from "./types";

const AdminNewRecordingsPage = observer((): JSX.Element => {
  const {
    newRecordings,
    updateRecordingStatus,
    deleteRecording,
  } = useContext(AdminStorageContext);

  const [loading, setLoading] = useState(false);

  const changeRecordingStatus = async (id: string, status: string) => {
    if (window.confirm(`Are you sure you wish to ${status} this call recording?`)) {
      setLoading(true);
      await updateRecordingStatus(id, status, "new");
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (window.confirm("Are you sure you wish to delete this call recording?")) {
      setLoading(true);
      await deleteRecording(id, "new");
      setLoading(false);
    }
  };

  return (
    <AdminPageWrapper>
      {
        (!loading) ? (
          <>
            <AdminHeader />
            <AdminPageContent>
              <AdminSideBar pageType={PAGE_TYPE} />
              <AdminContentWrapper>
                <AdminRecordingContent>
                  <AdminRecordingContentTitle>
                    New Call Recordings:
                  </AdminRecordingContentTitle>
                  <AdminScrollContent className="scrollbar-content">
                    <RecordingContentWrapper>
                      {
                        newRecordings.map((item) => (
                          <AdminRecordingList key={item._id}>
                            <RecordingName className="text-center">
                              {item.name}
                            </RecordingName>
                            <div className="dis-flex">
                              <AdminUserRecordingListPlayer url={item.list[0].url} />
                              <AdminRecordingListStatus>
                                <TextRight>
                                  <AdminRecordingListStatusLabel htmlFor={item._id}>
                                    Public
                                  </AdminRecordingListStatusLabel>
                                  <AdminRecordingListStatusInput
                                    type="radio"
                                    value={PUBLIC_STATUS}
                                    name={item._id}
                                    id={item._id}
                                    checked={(item.status === PUBLIC_STATUS)}
                                    onChange={() => changeRecordingStatus(item._id, PUBLIC_STATUS)}
                                  />
                                </TextRight>
                                <TextRight>
                                  <AdminRecordingListStatusLabel htmlFor={item._id}>
                                    Block
                                  </AdminRecordingListStatusLabel>
                                  <AdminRecordingListStatusInput
                                    type="radio"
                                    value={BLOCK_STATUS}
                                    name={item._id}
                                    id={item._id}
                                    checked={(item.status === BLOCK_STATUS)}
                                    onChange={() => changeRecordingStatus(item._id, BLOCK_STATUS)}
                                  />
                                </TextRight>
                                <TextRight>
                                  <AdminRecordingListStatusLabel htmlFor={item._id}>
                                    Delete
                                  </AdminRecordingListStatusLabel>
                                  <DeleteIcon src={deleteIcon} alt="Delete" onClick={() => onDelete(item.callId)} />
                                </TextRight>
                              </AdminRecordingListStatus>
                            </div>
                            <RecordingName className="text-bold">
                              Author Name:
                            </RecordingName>
                            <RecordingName className="text-center">
                              {item.authorList[0].name}
                            </RecordingName>
                            <RecordingName className="text-center">
                              {item.authorList[1].name}
                            </RecordingName>
                          </AdminRecordingList>
                        ))
                      }
                    </RecordingContentWrapper>
                  </AdminScrollContent>
                </AdminRecordingContent>
              </AdminContentWrapper>
            </AdminPageContent>
          </>
        ) : (
          <LoaderWrapper>
            <Spin size="large" />
          </LoaderWrapper>
        )
      }
    </AdminPageWrapper>
  );
});

export default AdminNewRecordingsPage;

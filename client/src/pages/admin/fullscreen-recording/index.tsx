import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { AdminStorageContext } from "../../../services/admin";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminFullScreenRecording from "../../../components/Admin/AdminFullScreenRecording";
import { LoaderWrapper } from "../../../components/styled";
import { AdminPageWrapper, AdminPageContent, AdminContentWrapper } from "../styled";

const AdminFullScreenRecordingPage = observer((props): JSX.Element => {
  const history = useHistory();

  const {
    onLoaded,
    newRecordings,
    availableRecordings,
    blockRecordings,
    currentRecording,
    setCurrentRecording,
  } = useContext(AdminStorageContext);

  const [recordingType, setRecordingType] = useState("");
  const [recordings, setRecordings] = useState(newRecordings);

  const getIndex = (recordingID: string) => {
    let count = 0;
    let index = 0;
    for (let i = 0; i < recordings.length; i += 1) {
      if (recordings[i]._id === recordingID) {
        index = count;
      }
      count += 1;
    }
    return index;
  };

  const onNextPlay = () => {
    const currentIdex = getIndex(currentRecording?._id);
    let nextRecordingID = "";
    if (currentIdex === recordings.length - 1) {
      nextRecordingID = recordings[0]?._id;
    } else {
      nextRecordingID = recordings[currentIdex + 1]?._id;
    }
    setCurrentRecording(nextRecordingID);
    let router = "/admin/recording/";
    router += recordingType;
    router += "/";
    router += nextRecordingID;
    history.push(router);
  };

  const onPrevPlay = () => {
    const currentIdex = getIndex(currentRecording?._id);
    let prevRecordingID = "";
    if (currentIdex === 0) {
      prevRecordingID = recordings[recordings.length - 1]?._id;
    } else {
      prevRecordingID = recordings[currentIdex - 1]?._id;
    }
    setCurrentRecording(prevRecordingID);
    let router = "/admin/recording/";
    router += recordingType;
    router += "/";
    router += prevRecordingID;
    history.push(router);
  };

  useEffect(() => {
    setCurrentRecording(props.match.params.id);
    setRecordingType(props.match.params.type);
  }, [props]);

  useEffect(() => {
    if (recordingType === "new") {
      setRecordings(newRecordings);
    } else if (recordingType === "available") {
      setRecordings(availableRecordings);
    } else if (recordingType === "blocked") {
      setRecordings(blockRecordings);
    }
  }, [setRecordingType]);

  return (
    <AdminPageWrapper>
      {
        (onLoaded) ? (
          <>
            <AdminHeader />
            <AdminSideBar pageType={`${currentRecording?.status} recordings`} />
            <AdminPageContent>
              <AdminContentWrapper>
                <AdminFullScreenRecording
                  currentRecording={currentRecording}
                  onPrevPlay={onPrevPlay}
                  onNextPlay={onNextPlay}
                  type={recordingType}
                />
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

export default AdminFullScreenRecordingPage;

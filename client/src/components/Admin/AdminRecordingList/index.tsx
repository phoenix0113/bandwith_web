import React from "react";
import AdminUserRecordingListPlayer from "../AdminRecordingListPlayer";
import { GetRecordResponse } from "../../../shared/interfaces";
import { PUBLIC_STATUS, BLOCK_STATUS, DELETE_STATUS } from "../../../utils/constants";
import {
  RecordingName, TextRight, AdminRecordingListStatus, AdminRecordingprofile,
  AdminRecordingListStatusLabel, AdminRecordingListStatusInput, DeleteIcon,
} from "../styled";
import deleteIcon from "../../../assets/images/admin/delete.svg";

interface IProps {
  recording: GetRecordResponse;
  type: string;
  changeRecordingStatus: (id: string, status: string) => void;
}

const AdminRecordingList = ({
  recording, type, changeRecordingStatus,
}: IProps): JSX.Element => {
  const onChangeRecordingStatus = (id: string, status: string) => {
    changeRecordingStatus(id, status);
    recording.status = status;
  };

  return (
    <AdminRecordingprofile>
      <AdminUserRecordingListPlayer
        type={type}
        currentRecording={recording}
      />
      <RecordingName className="text-center">
        {recording.name}
      </RecordingName>
      <AdminRecordingListStatus>
        <TextRight>
          <AdminRecordingListStatusLabel htmlFor={recording._id}>
            Public
          </AdminRecordingListStatusLabel>
          <AdminRecordingListStatusInput
            type="radio"
            value={PUBLIC_STATUS}
            name={recording._id}
            id={recording._id}
            checked={(recording.status === PUBLIC_STATUS)}
            onChange={() => onChangeRecordingStatus(recording._id, PUBLIC_STATUS)}
            disabled={(recording.authorList.length === 0)}
          />
        </TextRight>
        <TextRight>
          <AdminRecordingListStatusLabel htmlFor={recording._id}>
            Block
          </AdminRecordingListStatusLabel>
          <AdminRecordingListStatusInput
            type="radio"
            value={BLOCK_STATUS}
            name={recording._id}
            id={recording._id}
            checked={(recording.status === BLOCK_STATUS)}
            onChange={() => onChangeRecordingStatus(recording._id, BLOCK_STATUS)}
            disabled={(recording.authorList.length === 0)}
          />
        </TextRight>
        <TextRight>
          {
            (recording.authorList.length !== 0) ? (
              <>
                <AdminRecordingListStatusLabel htmlFor={recording._id}>
                  Delete
                </AdminRecordingListStatusLabel>
                <DeleteIcon src={deleteIcon} alt="Delete" onClick={() => onChangeRecordingStatus(recording.callId, DELETE_STATUS)} />
              </>
            ) : (
              <></>
            )
          }
        </TextRight>
      </AdminRecordingListStatus>
    </AdminRecordingprofile>
  );
};

export default AdminRecordingList;

import React from "react";
import AdminUserRecordingListPlayer from "../AdminRecordingListPlayer";
import { GetRecordResponse } from "../../../shared/interfaces";
import { PUBLIC_STATUS, BLOCK_STATUS } from "../../../utils/constants";
import {
  AdminRecordingList, RecordingName, TextRight, AdminRecordingListStatus, AdminRecordingprofile,
  AdminRecordingListStatusLabel, AdminRecordingListStatusInput, DeleteIcon,
} from "../styled";
import deleteIcon from "../../../assets/images/admin/delete.svg";

interface IProps {
  recording: GetRecordResponse;
  changeRecordingStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

const AdminRecording = ({ recording, changeRecordingStatus, onDelete }: IProps): JSX.Element => {
  const onChangeRecordingStatus = (status: string) => {
    changeRecordingStatus(recording._id, status);
  };

  const onDeleteRecording = () => {
    onDelete(recording.callId);
  };

  return (
    <AdminRecordingList>
      <RecordingName className="text-center">
        {recording.name}
      </RecordingName>
      <AdminRecordingprofile>
        <AdminUserRecordingListPlayer url={recording.list[0].url} />
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
              onChange={() => onChangeRecordingStatus(PUBLIC_STATUS)}
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
              onChange={() => onChangeRecordingStatus(BLOCK_STATUS)}
            />
          </TextRight>
          <TextRight>
            <AdminRecordingListStatusLabel htmlFor={recording._id}>
              Delete
            </AdminRecordingListStatusLabel>
            <DeleteIcon src={deleteIcon} alt="Delete" onClick={onDeleteRecording} />
          </TextRight>
        </AdminRecordingListStatus>
      </AdminRecordingprofile>
      <RecordingName className="text-bold text-center">
        Author Name:
      </RecordingName>
      <RecordingName className="text-center">
        {recording.authorList[0].name}
      </RecordingName>
      {
        (recording.authorList.length === 2) ? (
          <RecordingName className="text-center">
            {recording.authorList[1].name}
          </RecordingName>
        ) : (
          <></>
        )
      }
    </AdminRecordingList>
  );
};

export default AdminRecording;

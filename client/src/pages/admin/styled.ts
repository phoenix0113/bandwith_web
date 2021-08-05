import styled from "styled-components";

export const AdminPageWrapper = styled.div`
  width: 100%;
  background-color: #0E0C09;
`;

export const AdminPageContent = styled.div`
  display: flex;
  height: 100%;
`;

export const AdminContentWrapper = styled.div`
  margin-top: 70px;
  margin-left: 250px;
  width: 100%;
  justify-content: center;
  display: flex;
`;

export const AdminRecordingContent = styled.div`
  @media (min-width: 620px) {
    width: 390px;
  }
  @media (min-width: 970px) {
    width: 720px;
  }
  @media (min-width: 1300px) {
    width: 1050px;
  }
  @media (min-width: 1630px) {
    width: 1380px;
  }
`;

export const AdminRecordingContentTitle = styled.div`
  margin-left: 35px;
  margin-top: 47px;
  margin-bottom: 20px;
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 40px;
  color: #FFFFFF;
`;

export const AdminScrollContent = styled.div`
  height: calc(100vh - 240px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 10px;
`;

export const RecordingContentWrapper = styled.div`
  display: flex;
  width: fit-content;
  flex-flow: row wrap;
`;

export const AdminRecordingList = styled.div`
  width: 300px;
  padding: 15px;
  background: #1A1C1E;
  margin: 20px;
  align-items: center;
  border-radius: 6px;
`;

export const RecordingName = styled.div`
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-size: 18px;
  line-height: 22px;
  color: #FFFFFF;
  max-width: 250px;
  padding: 5px 0;
`;

export const TextRight = styled.div`
  text-align: right;
  margin: 5px 0;
  display: flex;
  align-items: center;
`;

export const AdminRecordingListStatus = styled.div`
  border: none;
  outline: none;
  margin-right: 0;
  margin-left: auto;
  display: grid;
`;

export const AdminRecordingListStatusLabel = styled.label`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  color: #FFFFFF;
  margin-right: 24px;
`;

export const AdminRecordingListStatusInput = styled.input`
  margin-right: 0;
  margin-left: auto;
  width: 17px;
  height: 17px;
`;

export const DeleteIcon = styled.img`
  color: #ffffff;
`;

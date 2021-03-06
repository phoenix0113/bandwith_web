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
    width: 1390px;
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
  height: calc(100vh - 260px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 10px;
`;

export const RecordingContentWrapper = styled.div`
  display: flex;
  width: fit-content;
  flex-flow: row wrap;
`;

export const AdminSearch = styled.div`
  width: 50%;
  margin-left: auto;
  margin-right: 20px;
  padding: 10px 0;
`;

export const AdminUserContent = styled.div`
  width: 100%;
  margin: 0 35px;
  display: flex;
`;

export const AdminUserListContent = styled.div`
  width: 50%;
`;

export const AdminUserList = styled.div`
  width: 100%;
  padding: 15px;
  background: #1A1C1E;
  margin: 20px;
  align-items: center;
  border-radius: 6px;
  display: flex;
  cursor: pointer;
  position: relative;
`;

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

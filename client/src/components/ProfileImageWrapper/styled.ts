import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

export const ProfileImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: 130px;
  height: 130px;
`;

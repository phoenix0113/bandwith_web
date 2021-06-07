import styled from "styled-components";

export const VideoPlayerContent = styled.div`
  height: 50px;
  padding: 5px;
  border-radius: 5px;
  position: relative;
`;

export const VideoPlayer = styled.video`
  border-radius: 5px;
  width: 50px;
  height: 40px;
  object-fit: cover;
`;

export const VideoPlayerButton = styled.img`
  width: 10px;
  height: 10px;
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 10;
`;

export const VideoPauseButton = styled.img`
  display: none;
  :hover {
    display: block !important;
  }
  width: 10px;
  height: 10px;
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 10;
`;

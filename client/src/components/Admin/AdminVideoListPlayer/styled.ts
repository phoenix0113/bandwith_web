import styled from "styled-components";

export const VideoPlayerContent = styled.div`
  position: relative;
  cursor: pointer;
`;

export const VideoPlayer = styled.video`
  border-radius: 5px;
  width: 133px;
  height: 113px;
  border-radius: 12px;
  object-fit: cover;
`;

export const VideoPlayerButton = styled.img`
  width: 30px;
  height: 37px;
  top: 41px;
  left: 51px;
  position: absolute;
  cursor: pointer;
  z-index: 10;
`;

export const VideoPauseButton = styled.img`
  display: none;
  :hover {
    display: block !important;
  }
  width: 30px;
  height: 37px;
  top: 41px;
  left: 51px;
  position: absolute;
  cursor: pointer;
  z-index: 10;
`;

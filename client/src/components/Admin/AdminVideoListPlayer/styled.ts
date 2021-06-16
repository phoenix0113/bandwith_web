import styled from "styled-components";

export const VideoPlayerContent = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VideoPlayer = styled.video`
  border-radius: 5px;
  width: auto;
  height: 113px;
  border-radius: 12px;
  border: 1px solid white;
`;

export const VideoPlayerButton = styled.img`
  width: 20px;
  position: absolute;
  cursor: pointer;
  z-index: 10;
`;

export const VideoPauseButton = styled.img`
  width: 20px;
  position: absolute;
  cursor: pointer;
  z-index: 10;
  display: none;
  :hover {
    display: block;
  }
`;

export const PauseButtonSection = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

import styled from "styled-components";

interface VideoProps {
  objectFit?: "cover"|"contain";
}

export const Video = styled.video<VideoProps>`
  object-fit: ${({ objectFit }) => objectFit || "cover"};
  width: 100%;
  height: 100%;
`;

import styled from "styled-components";
import { COLORS, Z_INDEX } from "../../components/styled";

interface FeedScrollableWrapperProps {
  hidden?: boolean;
}

export const FeedScrollableWrapper = styled.div<FeedScrollableWrapperProps>`
  height: 100%;
  width: 100%;

  position: relative;
  overflow: scroll;

  scroll-snap-type: y mandatory;

  background-color: ${COLORS.MAIN_DARK};

  display: ${({ hidden }) => (hidden ? "none" : "block")};

  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar for chrome, safari and opera */
  }

  -ms-overflow-style: none; /* IE, Edge */
  -ms-scrollbar-width: none; /* Firefox  */
  scrollbar-width: none;
`;

interface VideoWrapperProps {
  withoutBorder?: boolean;
  sharedRecording?: boolean;
}

export const VideoWrapper = styled.div<VideoWrapperProps>`
  display: flex;
  
  width: 100%;
  height: 100%;
  position: relative;
  scroll-snap-align: start;
  border-bottom: ${({ withoutBorder }) => (withoutBorder ? "none" : `3px solid ${COLORS.ALTERNATIVE}`)};

  background-color: ${COLORS.MAIN_DARK};

  z-index: ${({ sharedRecording }) => (sharedRecording ? Z_INDEX.HIGH : 1)};
`;

export const AddToFriendsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  z-index: ${Z_INDEX.MIDDLE};
  top: 10%;
  left: 20px;
  border-radius: 22.5px;
  padding: 5px 8px;
  background: ${COLORS.BLACK};
  backdrop-filter: blur(5.43656px);
`;

export const AddToFriendIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const AddToFriendContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

interface ContentTextProps {
  isTitle?: boolean;
}

export const ContentText = styled.div<ContentTextProps>`
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
  color: ${({ isTitle }) => (isTitle ? COLORS.ALTERNATIVE : COLORS.WHITE)};
`;

export const FeedPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const FeedPlayerToolTip = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  
`;

interface ToolTipImgWrapperProps {
  opacity: 1|0;
}

export const ToolTipImgWrapper = styled.img<ToolTipImgWrapperProps>`
  cursor: pointer;
  width: 25vw;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.35s ease-in;
`;

/**
 * Single feed
 */
export const SharedFeedItemWrapper = styled.div`
  height: 100%;
  width: 100%;

  position: relative;
  overflow: scroll;

  background-color: ${COLORS.MAIN_LIGHT};
`;

export const BackToFeedButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: ${Z_INDEX.MIDDLE};
`;

export const RecordUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${Z_INDEX.HIGH};
  background-color: ${COLORS.MAIN_DARK};
`;

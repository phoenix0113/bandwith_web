import styled from "styled-components";

import { Input } from "antd";
import { COLORS, Z_INDEX } from "../styled";

interface ICommentBlockProps {
  visible: boolean;
}

export const CommentsBlock = styled.div<ICommentBlockProps>`
  background-color: ${COLORS.MAIN_DARK};
  color: ${COLORS.WHITE};
  width: 100%;
  height: 66vh;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  z-index: ${Z_INDEX.HIGH};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;

  display: ${({ visible }) => (visible ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-between;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

export const CommentsBlockHeader = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: 40px;
  letter-spacing: 0px;
  text-align: left;
  margin-bottom: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CommentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex-grow: 1;
  margin-bottom: 10px;
`;

export const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderImage = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  border-radius: 50%;
`;

const Text = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: left;
  margin-right: 10px;
`;

export const HeaderUsername = styled(Text)``;

export const HeaderInfo = styled(Text)`
  mix-blend-mode: normal;
  opacity: 0.5;
`;

export const CommentContent = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.093px;
  text-align: left;
  padding-right: 15%;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

const { TextArea } = Input;

export const StyledTextArea = styled(TextArea)`
  && {
    color: ${COLORS.WHITE};
    background: #646667;
    border-radius: 6px;
    border: none;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0px;
    text-align: left;

    padding: 9px 40px 9px 20px;


    :focus {
      /* border-color: ${COLORS.ALTERNATIVE}; */
      border-color: transparent;
    }
  }
`;

export const SendButton = styled.img`
  width: 40px;
  height: 25px;
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

export const AllLoadedText = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.093px;
  text-align: left;
  padding-right: 15%;
  color: ${COLORS.ALTERNATIVE};
`;

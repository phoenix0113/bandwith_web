import { ChangeEvent, useState, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { CloseOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";

import {
  CommentsBlock, CommentsBlockHeader, CommentContent, CommentListWrapper,
  CommentHeader, CommentItem, HeaderImage, HeaderUsername,
  InputWrapper, StyledTextArea, SendButton, AllLoadedText,
} from "./styled";

import sendImg from "../../assets/images/SendComment.svg";
import { showInfoNotification } from "../../utils/notification";
import { CommentsStorageContext } from "../../services/comments";

import { CommentTimeComponent } from "./Time";

const SCROLLABLE_DIV_ID = "scrollable";

interface IProps {
  visible: boolean;
  hide: () => void;
  id: string; // callId or recordingId
  isRecording?: boolean;
}

const MAX_INPUT_LENGTH = 150;

export const CommentsComponent = observer((
  { visible, id, hide, isRecording }: IProps,
): JSX.Element => {
  const {
    fetchComments, subscribeToComments, totalAmount, loading,
    comments, resetService, sendComment, allCommentsLoaded,
  } = useContext(CommentsStorageContext);

  useEffect(() => {
    subscribeToComments();
    fetchComments(id, isRecording);

    return () => {
      resetService();
    };
  }, [id]);

  const [inputValue, setInputValue] = useState("");
  const onChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target;

    if (value.length === MAX_INPUT_LENGTH + 1) {
      showInfoNotification(`Maximum of ${MAX_INPUT_LENGTH} characters`, 1);
    } else {
      setInputValue(target.value);
    }
  };

  const sendCommentHandler = () => {
    if (loading) {
      console.log("> Comments are still loading...Wait till you can send a new one");
      return;
    }
    if (inputValue) {
      sendComment(id, inputValue, isRecording);
      setInputValue("");
    }
  };

  return (
    <CommentsBlock visible={visible}>
      <CommentsBlockHeader>
        {`Comments (${totalAmount})`}
        <CloseOutlined onClick={hide} />
      </CommentsBlockHeader>
      <CommentListWrapper id={SCROLLABLE_DIV_ID}>
        <InfiniteScroll
          dataLength={comments.length}
          next={() => fetchComments(id, isRecording)}
          hasMore={!allCommentsLoaded}
          loader={<Spin />}
          endMessage={
            <AllLoadedText>You have seen it all</AllLoadedText>
          }
          scrollableTarget={SCROLLABLE_DIV_ID}
        >
          {comments && comments.map((comment) => (
            <CommentItem key={comment._id}>
              <CommentHeader>
                <HeaderImage src={comment.user.imageUrl} alt="Profile" />
                <HeaderUsername>{comment.user.name}</HeaderUsername>
                <CommentTimeComponent date={comment.date} />
              </CommentHeader>
              <CommentContent>{comment.content}</CommentContent>
            </CommentItem>
          ))}
        </InfiniteScroll>
      </CommentListWrapper>
      <InputWrapper>
        <StyledTextArea
          placeholder="Leave Comment..."
          autoSize
          maxLength={MAX_INPUT_LENGTH + 1}
          onChange={onChange}
          value={inputValue}
        />
        <SendButton src={sendImg} onClick={sendCommentHandler} />
      </InputWrapper>
    </CommentsBlock>
  );
});

import { observer } from "mobx-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Utils } from "avcore/client";
import { GetRecordResponse, RecordUser } from "../../../shared/interfaces";

import {
  AddToFriendContent, AddToFriendIcon,
  AddToFriendsWrapper, ContentText, FeedPlayer,
  BackToFeedButton, FeedPlayerToolTip, ToolTipImgWrapper,
} from "../styled";
import { CallPageToolbar, CommonImgWrapper } from "../../../components/styled";

import tempProfileIcon from "../../../assets/images/call/default_profile_image.png";
import { GlobalStorage, GlobalStorageContext } from "../../../services/global";

import commentsIcon from "../../../assets/images/call/comments.svg";
import shareIcon from "../../../assets/images/call/share.svg";
import addIcon from "../../../assets/images/feed/feedAddIcon.svg";
import backToFeedIcon from "../../../assets/images/call/ExitLive.svg";
import teleportLogo from "../../../assets/images/teleport.svg";
import playIcon from "../../../assets/images/feed/play.svg";

interface IProps {
  recording: GetRecordResponse;
  isShared?: boolean;
  showComments: () => void;
  openRecordUser: (user: RecordUser) => void;
  shareCall?: (recording: GetRecordResponse) => void;
  backToFeed?: () => void;
  currentRecording?: GetRecordResponse;
}

export const FeedVideoComponent = observer(({
  recording, isShared, showComments, openRecordUser, shareCall, backToFeed, currentRecording,
}: IProps) => {
  const { contacts } = useContext(GlobalStorageContext);
  const playerRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const [showPlayBtn, setShowPlayBtn] = useState(false);

  const changePlaybackStatus = () => {
    if (!playerRef) return;

    if (playerRef?.current.paused) {
      playerRef.current.play();
      if (!started) {
        setStarted(true);
        console.log("> Setting 'started' to true");
      }

      setShowPlayBtn(false);
      console.log(`> Recoding ${recording?._id} was resumed manually`);
    } else {
      setShowPlayBtn(true);
      playerRef.current.pause();
      console.log(`> Recoding ${recording?._id} was paused manually`);
    }
  };

  const feedOnScrollPlaybackHandler = () => {
    if (currentRecording._id === recording._id) {
      if (playerRef.current.paused) {
        playerRef.current.play().then(() => setShowPlayBtn(false)).catch(() => {
          console.log("> [Security error] User didn't interact with the page. Showing btn for manual resume");
          if (playerRef.current.paused) {
            setShowPlayBtn(true);
          }
        });
      }
    } else if (!playerRef.current.paused) {
      playerRef.current.pause();
    }
    console.log(`> Feed recording ${recording?._id} is ${playerRef.current.paused ? "paused" : "playing"}`);
  };

  const sharedPlaybackHandler = () => {
    if (playerRef.current.paused) {
      playerRef.current.play().then(() => setShowPlayBtn(false)).catch(() => {
        console.log("> [Security error] User didn't interact with the page. Showing btn for manual resume");
        if (playerRef.current.paused) {
          setShowPlayBtn(true);
        }
      });
    }
    console.log(`> Shared recording ${recording._id} is ${playerRef.current.paused ? "paused" : "playing"}`);
  };

  useEffect(() => {
    if (playerRef && playerRef.current) {
      if (isShared) {
        if (Utils.isSafari && !started) {
          // No reason to try to play it in Safari, it will be blocked in any case
          // trying to play only when it was played manually before
          console.log("> Skip play attempt in Safari for the first time");
          setShowPlayBtn(true);
        } else {
          sharedPlaybackHandler();
        }
      } else {
        if (!currentRecording) {
          return;
        }

        console.log(`> Current recording changed to ${currentRecording._id}. Current recording component: ${recording._id} `);
        if (Utils.isSafari && !started) {
          console.log("> Skip play attempt in Safari for the first time");
          setShowPlayBtn(true);
        } else {
          feedOnScrollPlaybackHandler();
        }
      }
    }
  }, [playerRef, currentRecording]);

  const contentText = useMemo(() => {
    if (GlobalStorage.profile._id === recording?.user?._id) {
      return "You";
    } if (GlobalStorage.isContact(recording?.user?._id)) {
      return "Friend";
    }
    return "Unknown User";
  }, [recording, contacts]);

  return (
    <>
      <AddToFriendsWrapper>
        <AddToFriendIcon src={recording.user?.imageUrl || tempProfileIcon} />
        <AddToFriendContent>
          <ContentText isTitle>{recording.user.name}</ContentText>
          <ContentText>{contentText}</ContentText>
        </AddToFriendContent>
        <CommonImgWrapper src={addIcon} alt="Add" onClick={() => openRecordUser(recording.user)} />
      </AddToFriendsWrapper>

      {isShared && (
        <BackToFeedButton onClick={backToFeed}>
          <CommonImgWrapper src={backToFeedIcon} alt="Back" />
        </BackToFeedButton>
      )}

      <FeedPlayerToolTip>
        <ToolTipImgWrapper
          src={playIcon}
          opacity={showPlayBtn ? 1 : 0}
          onClick={changePlaybackStatus}
        />
      </FeedPlayerToolTip>

      {!!recording?.list?.length && (
        <FeedPlayer
          loop
          playsInline
          ref={playerRef}
          src={recording.list[0].url}
          onClick={changePlaybackStatus}
          poster={teleportLogo}
        />
      )}

      <CallPageToolbar>
        <CommonImgWrapper src={commentsIcon} alt="Comments" onClick={showComments} />
        {!isShared && <CommonImgWrapper src={shareIcon} alt="Share" onClick={() => shareCall(recording)} />}
      </CallPageToolbar>
    </>
  );
});

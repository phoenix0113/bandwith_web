import { useRef, useState, useEffect, useContext } from "react";
import { observer } from "mobx-react";

import { SharedStorageContext } from "../../services/shared";
import { PageWrapper, COLORS } from "../../components/styled";
import { FeedPlayer, FeedPlayerToolTip, ToolTipImgWrapper } from "../feed/styled";
import playIcon from "../../assets/images/feed/play.svg";

const SharedPage = observer((props): JSX.Element => {
  const {
    sharedRecording, sharedRecordingID, setShareCurrentRecordingID,
  } = useContext(SharedStorageContext);

  const [id, setID] = useState("");

  const playerRef = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false);
  const [showPlayBtn, setShowPlayBtn] = useState(true);

  const changePlaybackStatus = () => {
    if (!playerRef) return;

    if (playerRef?.current.paused) {
      playerRef.current.play();
      if (!started) {
        setStarted(true);
        console.log("> Setting 'started' to true");
      }

      setShowPlayBtn(false);
      console.log(`> Recoding ${sharedRecordingID} was resumed manually`);
    } else {
      setShowPlayBtn(true);
      playerRef.current.pause();
      console.log(`> Recoding ${sharedRecordingID} was paused manually`);
    }
  };

  useEffect(() => {
    if (props.match.params !== undefined && id !== sharedRecordingID) {
      setID(props.match.params.id);
      setShareCurrentRecordingID(props.match.params.id);
    }
  });

  return (
    <PageWrapper color={COLORS.MAIN_LIGHT}>
      <FeedPlayerToolTip>
        <ToolTipImgWrapper
          src={playIcon}
          opacity={showPlayBtn ? 1 : 0}
          onClick={changePlaybackStatus}
        />
      </FeedPlayerToolTip>

      {sharedRecording?.list && (
        <FeedPlayer
          loop
          playsInline
          ref={playerRef}
          src={sharedRecording.list[0].url}
          onClick={changePlaybackStatus}
        />
      )}
    </PageWrapper>
  );
});

export default SharedPage;

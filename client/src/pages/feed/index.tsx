import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react";
import { useHistory, useLocation } from "react-router-dom";
import { parse } from "query-string";
import { Utils } from "avcore/client";
import { PageWrapper, COLORS } from "../../components/styled";
import { BottomNavigationComponent } from "../../components/BottomNavigation";
import { CommentsComponent } from "../../components/Comments";

import { FeedScrollableWrapper } from "./styled";

import { FeedItemComponent } from "./FeedItem";
import { HintComponent } from "../../components/Hint";

import { GetRecordResponse, RecordUser } from "../../shared/interfaces";

import { FeedStorageContext } from "../../services/feed";
import { showErrorNotification } from "../../utils/notification";
import { NAVIGATOR_SHARE_ERROR, SERVER_BASE_URL } from "../../utils/constants";
import { Params, Routes } from "../../utils/routes";
import { SharedFeedItemComponent } from "./SharedItem";
import { RecordUserComponent } from "./FeedUser";

const FeedPage = observer((): JSX.Element => {
  const {
    currentRecording,
    sharedRecording,
    recordings,
    setCurrentRecording,
    fetchSharedRecording,
    cleanSharedRecording,
  } = useContext(FeedStorageContext);
  const { search } = useLocation();
  const history = useHistory();
  const [sharedRecordingId, setSharedRecordingId] = useState(null);

  useEffect(() => {
    if (search) {
      const parsed = parse(search);
      console.log("> Parsed search params: ", parsed);
      setSharedRecordingId(parsed[Params.RECORDING_ID]);
    }
  }, [search]);

  useEffect(() => {
    if (sharedRecordingId) {
      fetchSharedRecording(sharedRecordingId);
    }
  }, [sharedRecordingId]);

  const [openedComments, setOpenedComments] = useState(false);
  const showComments = () => setOpenedComments(true);
  const hideComments = () => setOpenedComments(false);

  const shareCall = (recording: GetRecordResponse) => {
    if (!navigator.share) {
      showErrorNotification(NAVIGATOR_SHARE_ERROR);
    }

    const shareCallData: ShareData = {
      text: `Check out ${recording.user?.name}'s recording`,
      url: `${SERVER_BASE_URL}${Routes.FEED}?${Params.RECORDING_ID}=${recording._id}`,
    };

    navigator.share(shareCallData);
  };

  const [recordUser, setRecordUser] = useState<RecordUser>(null);
  const openRecordUser = (user: RecordUser) => {
    setRecordUser(user);
  };
  const closeRecordUser = () => {
    setRecordUser(null);
  };

  const backToFeed = () => {
    history.push({ search: null });
    cleanSharedRecording();
  };

  const scrollableRef = useRef<HTMLDivElement>(null);

  const [videoObserver, setVideoObserver] = useState(null);
  useEffect(() => {
    if (scrollableRef.current) {
      const createdObserver = new IntersectionObserver((entries) => {
        console.log("Interaction observer event's entries: ", entries);

        entries.forEach((entry) => {
          console.log(`Is safari: ${Utils.isSafari}, entry is intersecting: ${entry.isIntersecting}`);

          if (entry.isIntersecting) {
            console.log(`Entry is intersecting ${entry.target?.id}.`);
            setCurrentRecording(entry.target.id);
          } else if (Utils.isSafari) {
            console.log(`For some reason, entry is not intersecting. May need a new method. Scrolling from ${entry.target.id} to the bottom`);
          }
        });
      }, { threshold: 0.8, root: scrollableRef.current });

      console.log("Created observer: ", createdObserver);

      setVideoObserver(createdObserver);
    }
  }, [scrollableRef]);

  useEffect(() => {
    if (scrollableRef?.current && currentRecording) {
      console.log(`> Scrolling into ${currentRecording._id}`);

      const nodes = scrollableRef.current.querySelectorAll(".video_wrapper");

      nodes.forEach((n) => {
        if (n.id === currentRecording._id) {
          n.scrollIntoView();
        }
      });
    }
  }, [scrollableRef]);

  return (
    <PageWrapper color={COLORS.MAIN_LIGHT}>

      {recordUser && (
        <RecordUserComponent
          closeHandler={closeRecordUser}
          user={recordUser}
        />
      )}

      <HintComponent page={Routes.FEED} />

      {openedComments && (
        <CommentsComponent
          id={currentRecording._id}
          visible={openedComments}
          hide={hideComments}
          isRecording
        />
      )}

      {sharedRecording && (
        <SharedFeedItemComponent
          key={sharedRecording._id}
          openRecordUser={openRecordUser}
          recording={sharedRecording}
          showComments={showComments}
          backToFeed={backToFeed}
        />
      )}

      <FeedScrollableWrapper ref={scrollableRef} hidden={!!sharedRecording}>
        <>
          {scrollableRef && videoObserver && recordings.map((recording) => (
            <FeedItemComponent
              key={recording._id}
              observer={videoObserver}
              openRecordUser={openRecordUser}
              recording={recording}
              shareCall={shareCall}
              showComments={showComments}
            />
          ))}
        </>
      </FeedScrollableWrapper>

      <BottomNavigationComponent />
    </PageWrapper>
  );
});

export default FeedPage;

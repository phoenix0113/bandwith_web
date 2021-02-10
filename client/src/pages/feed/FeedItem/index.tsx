import { useContext, useEffect, useState } from "react";

import { observer as mobxObserver } from "mobx-react";
import { VideoWrapper } from "../styled";

import { GetRecordResponse, RecordUser } from "../../../shared/interfaces";

import { FeedStorageContext } from "../../../services/feed";

import { FeedVideoComponent } from "../FeedVideo";

interface IProps {
  observer: IntersectionObserver;
  recording: GetRecordResponse;
  showComments: () => void;
  shareCall: (recording: GetRecordResponse) => void;
  openRecordUser: (user: RecordUser) => void;
}

export const FeedItemComponent = mobxObserver((
  { recording, observer, openRecordUser, shareCall, showComments }: IProps,
): JSX.Element => {
  const [itemRef, setItemRef] = useState<HTMLDivElement>(null);

  const { currentRecording } = useContext(FeedStorageContext);

  useEffect(() => {
    if (itemRef) {
      observer.observe(itemRef);
    }

    return () => {
      if (itemRef) {
        observer.unobserve(itemRef);
      }
    };
  }, [observer, itemRef]);

  return (
    <VideoWrapper id={recording?._id} ref={setItemRef} className="video_wrapper">
      <FeedVideoComponent
        recording={recording}
        showComments={showComments}
        shareCall={shareCall}
        openRecordUser={openRecordUser}
        currentRecording={currentRecording}
      />
    </VideoWrapper>
  );
});

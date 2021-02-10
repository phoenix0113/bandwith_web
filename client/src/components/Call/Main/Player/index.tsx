import { useRef, useEffect } from "react";
import { ConferenceApi, Utils } from "avcore/client";

import { Video } from "./styled";

interface IProps {
  stream: MediaStream;
  muted?: boolean;
  playback?: ConferenceApi;
}

export const PlayerComponent = ({ stream, muted, playback }: IProps): JSX.Element => {
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (player.current && stream) {
      player.current.srcObject = stream;
    }

    if (Utils.isFirefox) {
      // Firefox MediaStream pauses when changed
      if (player.current) {
        player.current.addEventListener("pause", () => {
          player.current.play();
        });
      }
    }

    if (Utils.isSafari && playback) {
      const onStreamChange = () => {
        if (player.current) {
          player.current.srcObject = new MediaStream(stream.getTracks());
          player.current.play();
        }
      };
      playback.on("addtrack", onStreamChange).on("removetrack", onStreamChange);
    }

    player.current.play();
  }, [stream]);

  return (
    <Video ref={player} muted={muted} objectFit="cover" playsInline autoPlay />
  );
};

PlayerComponent.defaultProps = {
  muted: false,
  playback: null,
};

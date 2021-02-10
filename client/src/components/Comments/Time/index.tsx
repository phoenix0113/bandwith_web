import { useEffect, useState } from "react";

import { timeSince } from "../../../utils/time";
import { HeaderInfo } from "../styled";

interface IProps {
  date: number;
}

export const CommentTimeComponent = ({ date }: IProps): JSX.Element => {
  const [since, setSince] = useState<string>(timeSince(date));

  useEffect(() => {
    const interval = setInterval(() => {
      // TODO: Make it more efficient. There's no point in calculating it again this way
      setSince(timeSince(date));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HeaderInfo>{`${since} commented:`}</HeaderInfo>
  );
};

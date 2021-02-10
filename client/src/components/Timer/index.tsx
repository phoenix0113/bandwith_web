import { useState, useEffect } from "react";

const formatTime = (time: number): string => `0${time}`.slice(-2);

interface IProps {
  onEndCallback: () => void;
  initialValue: number;
}

export const TimerComponent = ({ initialValue, onEndCallback }: IProps): JSX.Element => {
  const [remainingTime, setRemainingTime] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevValue) => {
        if (prevValue - 1 === 0) {
          clearInterval(interval);
          onEndCallback();
          return null;
        }
        return prevValue - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>{`00:${formatTime(remainingTime)}`}</div>
  );
};

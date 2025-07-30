import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
type CountDownProp = {
  value: number;
  suffix?: string;
  prefix?: string;
  onFinish?: () => void;
};
const CountDown: FC<CountDownProp> = ({ value, suffix, prefix, onFinish }) => {
  const [count, setCount] = useState(value);
  const timeRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    timeRef.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timeRef.current);
  }, []);
  useEffect(() => {
    if (count === 0) {
      clearInterval(timeRef.current);
      onFinish && onFinish();
    }
  }, [count]);
  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  );
};

export default CountDown;

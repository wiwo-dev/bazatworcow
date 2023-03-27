import { useEffect, useRef, useState } from "react";

type Callback = () => void;

//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default function useInterval(callback: Callback, delay: number) {
  const savedCallback = useRef<Callback>();

  const [actualDelay, setActualDelay] = useState<number>(delay);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    if (delay !== null) {
      setActualDelay(delay);
      let id = setInterval(tick, actualDelay);
      return () => clearInterval(id);
    }
  }, [delay, actualDelay]);

  return [setActualDelay];
}

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import useInterval from "../utils/useInterval";

type Props = {
  children: React.ReactNode;
  text: string[];
  duration: number;
  y: string;
};

function Napis2({ text = ["FOTO/", "FILM/", "MEDIA/"], duration = 3, y = "0.8em" }: Props) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const textsArray = text;

  const textAnimation = {
    hidden: {
      opacity: 0,
      y: y,
    },
    visible: {
      opacity: 1,
      y: "0em",
      transition: {
        duration: duration,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  const switchToNextText = () => {
    const nextIndex = currentTextIndex + 1 < textsArray.length ? currentTextIndex + 1 : 0;
    setCurrentTextIndex(nextIndex);
  };

  useInterval(switchToNextText, duration * 1000);

  return (
    <motion.span
      initial="hidden"
      animate={"visible"}
      exit="hidden"
      variants={textAnimation}
      key={currentTextIndex}
      style={{ display: "block" }}>
      {textsArray[currentTextIndex]}
    </motion.span>
  );
}

export default Napis2;

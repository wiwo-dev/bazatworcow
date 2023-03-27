import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import useInterval from "../utils/useInterval";

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 600;
`;

const Character = styled(motion.span)`
  display: inline-block;
  margin-right: -0.05em;
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

type Props = {
  text: string;
};

function Napis({ text = "Animated Text" }: Props) {
  const ctrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [textToAnimate, setTextToAnimate] = useState<string>(text);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const textsArray = ["Baza Twórców", "jest super", "kursem online", "trzeba go kupić"];

  const switchToNextText = () => {
    const nextIndex = currentTextIndex + 1 < textsArray.length ? currentTextIndex + 1 : 0;
    setCurrentTextIndex(nextIndex);
    setTextToAnimate(textsArray[nextIndex]);
    //ctrls.start("visible");
  };

  useInterval(switchToNextText, 1000);

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <Title aria-label={textToAnimate} role="heading">
      {textToAnimate.split(" ").map((word, index) => {
        return (
          <Word
            ref={ref}
            aria-hidden="true"
            key={index}
            initial="hidden"
            animate={ctrls}
            variants={wordAnimation}
            transition={{
              delayChildren: index * 0.25,
              staggerChildren: 0.05,
            }}>
            {word.split("").map((character, index) => {
              return (
                <Character aria-hidden="true" key={index} variants={characterAnimation}>
                  {character}
                </Character>
              );
            })}
          </Word>
        );
      })}
    </Title>
  );
}

Napis.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Napis;

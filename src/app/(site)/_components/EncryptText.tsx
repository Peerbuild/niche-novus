"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import FeatherIcon from "feather-icons-react";

function EncryptText({
  INITIAL_TEXT,
  TARGET_TEXT,
}: {
  TARGET_TEXT: string;
  INITIAL_TEXT: string;
}): React.JSX.Element {
  const CYCLES_PER_LETTER = 2;
  const SHUFFLE_TIME = 50;
  const CHARS = "!@#$%^&*():{};|,.<>/?";

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [text, setText] = useState(TARGET_TEXT);
  const [width, setWidth] = useState<number | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.offsetWidth + 40);
    }
  }, [TARGET_TEXT]);

  const scramble = (): void => {
    clearInterval(intervalRef.current || undefined);
    stopScramble();
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = INITIAL_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = (): void => {
    clearInterval(intervalRef.current || undefined);
    setText(INITIAL_TEXT);
  };

  return (
    <motion.div
      className="group flex gap-2 items-center relative w-full overflow-hidden"
      onClick={scramble}
      style={{ width: width ? `${width}px` : "auto" }}
    >
      <span className="invisible absolute" ref={textRef}>
        {TARGET_TEXT}
      </span>
      <motion.span
        className="relative z-10 flex items-center gap-2"
        role="link"
      >
        <span className="flex whitespace-nowrap">{text}</span>
      </motion.span>
      {text === TARGET_TEXT && (
        <FeatherIcon
          icon="arrow-up-right"
          className="inline-block animate-in slide-in-from-left-20"
          size={18}
        />
      )}
    </motion.div>
  );
}

export default EncryptText;

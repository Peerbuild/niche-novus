"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Loader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (window) {
      setShow(false);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-svh w-full sticky top-0 inset-0 z-50 bg-[#060606] flex justify-center items-center "
        >
          <LoaderAnimation />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const LoaderAnimation = ({ scale = 1 }: { scale?: number }) => {
  return (
    <div style={{ scale }}>
      <div className="jelly-triangle">
        <div className="jelly-triangle__dot"></div>
        <div className="jelly-triangle__traveler"></div>
      </div>
      <svg width="0" height="0" className="jelly-maker">
        <defs>
          <filter id="uib-jelly-triangle-ooze">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="7.3"
              result="blur"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ooze"
            ></feColorMatrix>
            <feBlend in="SourceGraphic" in2="ooze"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Loader;

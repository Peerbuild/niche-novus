import { useMotionValueEvent, useScroll } from "framer-motion";
import React, { useState } from "react";

const useToggleNavbar = () => {
  const [showNav, setShowNav] = useState(true);
  const [isTransparent, setIsTransparent] = useState(true);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollY.get() < window.innerHeight - 400) {
      setIsTransparent(true);
      return;
    }
    setIsTransparent(false);
    const previous = scrollY.getPrevious();
    if (!previous) return;
    if (latest < previous) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  });

  return { showNav, isTransparent };
};

export default useToggleNavbar;

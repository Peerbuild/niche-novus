"use client";
import React, { ReactNode } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis options={{ duration: 2 }} root>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;

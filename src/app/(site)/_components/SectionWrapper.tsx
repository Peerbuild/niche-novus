"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useRef, useState } from "react";

const SectionWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [sectionTop, setSectionTop] = useState<number | undefined>(undefined);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isOutOfView, setIsOutOfView] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSectionTop(sectionRef.current?.offsetTop);

    const handleScroll = () => {
      if (!sectionRef || !sectionRef.current || !sectionTop) return;
      const section = sectionRef.current;
      const scrollPosition = window.scrollY;
      const sectionHeight = section.clientHeight;

      if (scrollPosition > sectionTop + sectionHeight / 5) {
        setIsOutOfView(true);
      } else {
        setIsOutOfView(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionRef, sectionTop]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-32  sticky top-0 transition-all duration-500",
        className,
        isOutOfView && "blur"
      )}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;

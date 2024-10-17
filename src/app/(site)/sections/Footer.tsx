import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className=" text-center flex flex-col justify-end gap-3  h-[30rem] md:h-[85vh]">
      <h2>
        Niche Novus <span className="mx-2">©</span> All Right Reserved
      </h2>
    </footer>
  );
};

export default Footer;

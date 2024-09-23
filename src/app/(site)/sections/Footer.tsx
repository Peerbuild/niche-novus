import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex text-center flex-col gap-3 py-10 md:py-20">
      <Image
        src="/logo.svg"
        alt="logo"
        className="mx-auto"
        width={20}
        height={20}
      />
      <h2>Niche Novus</h2>
      <span className="text-md">© All Right Reserved</span>
    </footer>
  );
};

export default Footer;

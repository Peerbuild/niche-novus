import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="pt-16 pb-8">
      <Image
        className="mx-auto"
        src={"/logo.svg"}
        alt="Logo"
        width={15}
        height={35}
      />
    </div>
  );
};

export default Header;

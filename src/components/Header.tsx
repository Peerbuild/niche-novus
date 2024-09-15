import Image from "next/image";
import React from "react";
import FeahterIcon from "feather-icons-react";
import FeatherIcon from "feather-icons-react";

const navLinks = [
  {
    label: "about",
    href: "#about",
  },
  {
    label: "projects",
    href: "#projects",
  },
  {
    label: "work",
    href: "#work",
  },
];

const Header = () => {
  return (
    <header className="mt-16 backdrop-blur bg-background/40 justify-between items-center py-6 px-14 flex  w-full max-w-screen-lg mx-auto">
      <div>
        <Image
          className="mx-auto "
          src={"/logo.svg"}
          alt="Logo"
          width={15}
          height={35}
        />
      </div>
      <ul className="md:flex gap-20 text-lg hidden">
        {navLinks.map((link) => (
          <li key={link.label} className="content-center">
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <FeatherIcon icon="shopping-cart" />
    </header>
  );
};

export default Header;

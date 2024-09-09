import Image from "next/image";
import React from "react";

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
    <header className="pt-16 justify-between pb-8 flex gap-20 w-full max-w-screen-sm mx-auto">
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
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <div></div>
    </header>
  );
};

export default Header;

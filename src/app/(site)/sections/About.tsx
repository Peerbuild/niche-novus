import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section className="py-32  sticky top-0">
      <div className="absolute w-full inset-0 h-full left-1/2 -translate-x-1/2 -z-10">
        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-background via-background/80 to-80% to-background"></div>
        <Image
          src={"/bg/bg-2.png"}
          alt="bg-about"
          fill
          className="object-cover relative -z-10 "
        />
      </div>
      <main className="max-w-screen-md space-y-8 mx-auto">
        <div className="aspect-video">
          <Image
            src={"/images/about.jpeg"}
            alt="The architect"
            width={600}
            height={400}
            className="mx-auto w-full h-full object-cover object-[50%_30%]"
          />
        </div>
        <div className="space-y-2">
          <p className="text-justify">
            One-stop-shop for all the latest and greatest digital products to
            help you earn online. From trading software to reselling
            communities, we&apos;ve got you.
          </p>
        </div>
        <div className="text-yellow-500 flex justify-between items-center">
          <a
            className="  gap-2 flex items-center"
            href="http://www.youtube.com"
          >
            <span>DISCOVER LATEST ON YOUTUBE</span>
            <FeatherIcon
              icon="arrow-up-right"
              className="inline-block "
              size={14}
            />
          </a>
          <div className="flex gap-2 items-center">
            <FeatherIcon icon="instagram" size={18} />
            <FeatherIcon icon="twitter" size={18} />
          </div>
        </div>
      </main>
    </section>
  );
};

export default About;

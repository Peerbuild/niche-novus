import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section>
      <main className="max-w-[13.5rem] space-y-8 mx-auto">
        <div>
          <Image
            src={"/images/about.jpeg"}
            alt="The architect"
            width={175}
            height={200}
            className="mx-auto"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-medium">the architect.</h2>
          <p className="text-justify">
            One-stop-shop for all the latest and greatest digital products to
            help you earn online. From trading software to reselling
            communities, we&apos;ve got you.
          </p>
        </div>
        <a className="block" href="http://www.youtube.com">
          DISCOVER ON YOUTUBE
        </a>
      </main>
    </section>
  );
};

export default About;

import React from "react";

const Herosection = () => {
  return (
    <section className="relative min-h-[98svh] ">
      <div className="absolute w-full -z-10  left-1/2 -top-40 -translate-x-1/2 min-h-[inherit] inset-0 overflow-hidden">
        <div className="bg-gradient-to-t from-background  to-background/60 absolute w-full h-full inset-0"></div>
        <video
          src="/bg/bg-1.mp4"
          autoPlay
          muted
          loop
          className="object-cover h-full w-full"
        />
      </div>
      <main className="flex relative flex-col container gap-10 md:gap-6 pt-16  md:h-[30rem] px-12 justify-center 2xl:max-w-screen-xl  mx-auto min-h-[inherit]">
        <div className="max-w-56 space-y-20 pr-20 md:self-end">
          <p className="  text-md md:text-lg  text-foreground/80 w-[12ch] md:w-[16ch]">
            may my worlds find you well
          </p>
        </div>
        <h1 className="md:absolute text-2xl self-center leading-[0.75] md:text-[10rem] gap-6 lg:text-[14rem] xl:text-3xl w-[18.5rem] md:w-full max-w-[74rem] md:left-1/2 md:-translate-x-1/2 flex flex-col font-extrabold ">
          <span>Niche</span>
          <span className="self-end">Novus</span>
        </h1>
        <div className="w-32 md:translate-y-8 md:w-44 text-foreground/80 md:text-lg self-end md:self-start  text-right ">
          <h2>
            an artist, architect & <span className="italic">creator</span>.
          </h2>
        </div>
      </main>
    </section>
  );
};

export default Herosection;

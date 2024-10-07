import React from "react";

const Herosection = () => {
  return (
    <section className="relative min-h-[98svh] ">
      <div className="absolute w-full -z-10  left-1/2 -top-40 -translate-x-1/2 min-h-[inherit] inset-0 overflow-hidden">
        <div className="bg-gradient-to-t from-background via-background/50 to-background/80 absolute w-full h-full inset-0"></div>
        <video
          src="/bg/bg-1.mp4"
          autoPlay
          muted
          loop
          className="object-cover h-full w-full"
        />
      </div>
      <main className="flex relative flex-col gap-14 pt-16 md:h-[30rem] px-8 justify-center max-w-sm md:max-w-screen-xl  mx-auto min-h-[inherit]">
        <div className="max-w-56 space-y-20 pr-20 md:self-end">
          <p className="  text-md md:text-lg w-[14ch]">
            may my worlds find you well
          </p>
        </div>
        <h1 className="md:absolute text-xl md:text-3xl w-[18.5rem] md:w-full max-w-[74rem] md:left-1/2 md:-translate-x-1/2 flex flex-col font-extrabold leading-[0.8]">
          <span>Niche</span>
          <span className="self-end">Novus</span>
        </h1>
        <div className="w-44 text-lg self-end md:self-start text-right space-y-12">
          <h2>an artist, architect & creator.</h2>
          <p className="md:hidden">
            the architect of virtual worlds, the visionary behind breathtaking
            renders, and a true artist of the digital realm
          </p>
        </div>
      </main>
    </section>
  );
};

export default Herosection;

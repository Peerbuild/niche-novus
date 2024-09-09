import React from "react";

const Herosection = () => {
  return (
    <section>
      <main className="flex relative flex-col gap-14 md:gap-[20rem] max-w-sm md:max-w-screen-xl  mx-auto py-16">
        <div className="max-w-56 space-y-20 md:self-end">
          <p className="  text-md md:text-base w-[10ch] md:w-auto">
            may my words find you well
          </p>
          <p className="text-justify">
            the architect of virtual worlds, the visionary behind breathtaking
            renders, and a true artist of the digital realm
          </p>
        </div>
        <h1 className="md:absolute text-xl md:text-3xl w-[18.5rem] md:w-full max-w-[74rem] md:left-1/2 md:-translate-x-1/2 flex flex-col font-extrabold leading-[0.8]">
          <span>Niche</span>
          <span className="self-end">Novus</span>
        </h1>
        <div className="w-44 text-justify self-end md:self-start space-y-12">
          <h2>an artist, architect and sentient philosopher</h2>
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

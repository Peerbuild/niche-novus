import React from "react";

const Herosection = () => {
  return (
    <section>
      <main className="space-y-14 max-w-sm mx-auto py-16">
        <p className="text-md w-[10ch]">may my words find you well</p>
        <h1 className="text-xl w-[18.5rem] flex flex-col font-extrabold leading-[0.8]">
          <span>Niche</span>
          <span className="self-end">Novus</span>
        </h1>
        <div className="w-44 text-justify ml-auto space-y-12">
          <h2>an artist, architect and sentient philosopher</h2>
          <p>
            the architect of virtual worlds, the visionary behind breathtaking
            renders, and a true artist of the digital realm
          </p>
        </div>
      </main>
    </section>
  );
};

export default Herosection;

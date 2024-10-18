import React from "react";

const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex gap-10 justify-between items-center max-w-screen-xl px-8 md:px-20 mx-auto">
      <div className="flex gap-2 items-center">
        <h2 className="text-sm md:text-base">{title}</h2>
        <div className="w-10 h-0.5 bg-muted-foreground"></div>
      </div>
      <p className="text-justify max-w-64 md:max-w-screen-md md:text-right  text-sm md:text-base uppercase">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionTitle;

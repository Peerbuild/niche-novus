import React from "react";

const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex gap-10 justify-between items-center">
      <div className="flex gap-2 items-center">
        <h2 className="text-sm">{title}</h2>
        <div className="w-10 h-0.5 bg-muted-foreground"></div>
      </div>
      <p className="text-justify max-w-64 text-sm uppercase">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;

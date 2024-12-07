import React from "react";

export const Button1 = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-[#231F20] text-white rounded hover:bg-[#1e1c1d];
 transition-all ${className}`}
    >
      {text}
    </button>
  );
};

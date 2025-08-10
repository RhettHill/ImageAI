import React from "react";

const Header = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {subTitle && <p className="mt-2 text-gray-500 text-base">{subTitle}</p>}
    </header>
  );
};

export default Header;

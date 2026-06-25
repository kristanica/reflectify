import React from "react";

const Header = ({ title, description }: Header) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-mocha-surface1 pb-4 gap-4">
      <div>
        <h2 className="text-xl font-bold font-mono tracking-widest text-mocha-yellow uppercase">
          {title}
        </h2>
        <p className="text-xs text-mocha-overlay1 font-mono mt-1">
          {description}
        </p>
      </div>
    </header>
  );
};

export default Header;

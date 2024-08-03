import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="relative z-20 flex items-center text-lg font-medium  ">
      <Image
        src="/logo.png"
        height={50}
        width={50}
        className="w-auto h-auto"
        alt="logo"
        priority
      ></Image>
      <h1 className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 inline-block text-transparent bg-clip-text">
        Brighter Bee
      </h1>
    </div>
  );
};

export default Logo;

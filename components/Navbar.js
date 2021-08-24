import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex py-6 items-center justify-between flex-wrap">
      <Link href="/">
      <div className="w-1/3 text-white font-bold  md:pl-14 pl-4">
        <img
          src="/logo.png"
          className="w-16 h-16 md:w-32 md:h-32"
          alt={"namaz-vakitleri"}
        ></img>
      </div>
      </Link>
      <div className="w-1/3">
        <p className=" text-white font-bold text-center md:text-2xl text-sm">
          NamazNeZaman
        </p>
      </div>
    </div>
  );
};

export default Navbar;

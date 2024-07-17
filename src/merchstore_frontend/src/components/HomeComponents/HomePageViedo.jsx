/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import Button from "../common/Button";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Video : HomePage Component.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageVideo = () => {
  return (
    <div className="relative overflow-hidden tracking-wider">
      {/* Video */}
      <iframe
        width="100%"
        height="480"
        src="https://www.youtube.com/embed/BHACKCNDMW8"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className="z-10"
      />

      {/* Play Button */}
      <Button className="flex gap-2 items-center absolute bottom-16 left-16 text-white bg-slate-900 rounded-full px-4 py-2 text-xs font-semibold z-30">
        <BsFillPlayFill />
        Play Video
      </Button>
      {/* Banner */}
      <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-4 z-20 max-h-20 min-h-20">
        <h1 className="text-2xl font-bold">
          When Your Home bright with Stuffsus
        </h1>
        <p className="text-sm">
          Additional information information information information information
        </p>
      </div>
    </div>
  );
};

export default HomePageVideo;

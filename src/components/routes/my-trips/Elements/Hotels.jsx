import React from "react";
import Hotelcard from "./Hotelcard";

function Hotels() {
  return (
    <div className=" my-[15vh]">
      <h2 className="opacity-90 mx-auto text-center text-3xl font-black text-primary/80 md:text-5xl">
        Hotels
      </h2>
      <div className="main-info mt-2 md:mt-4">
        <Hotelcard  />
      </div>
    </div>
  );
}

export default Hotels;

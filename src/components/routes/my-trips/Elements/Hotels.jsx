import React from "react";
import Hotelcard from "./Hotelcard";

function Hotels() {
  return (
    <>
      <h2 className="mt-10 sm:mt-20 text-3xl sm:text-4xl font-extrabold text-center sm:text-left">
        Hotels
      </h2>
      <div className="main-info mt-2 md:mt-4">
        <Hotelcard />
      </div>
    </>
  );
}

export default Hotels;

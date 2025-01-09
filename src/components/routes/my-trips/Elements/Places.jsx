import React from "react";
import Placescard from "./Placescard";

function Places() {
  return (
    <div className="my-[15vh]">
      <h2 className="opacity-90 mx-auto text-center text-3xl font-black text-primary/80 md:text-5xl">
        Places
      </h2>
      <div className="main-info mt-2 md:mt-4">
        <Placescard />
      </div>
    </div>
  );
}

export default Places;

import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { LogInContext } from "@/Context/LogInContext/Login";
import PlaceCards from "../Cards/PlaceCards";
import { useRefContext } from "@/Context/RefContext/RefContext";

function Placescard() {
  // const isMobile = useMediaQuery({ query: "(max-width: 445px)" });
  // const isSmall = useMediaQuery({ query: "(max-width: 640px)" });

  const { trip } = useContext(LogInContext);
  const itinerary = trip?.tripData?.itinerary;
  const city = trip?.tripData?.location;

  const { placesRef } = useRefContext();

  return (
    <>
      {itinerary?.map((day, idx) => {
        return (
          <div ref={placesRef} key={idx} className="main-container mt-5 sm:mt-10">
            <div className="places-heading text-center my-5">
              <h3 className="md:text-4xl font-black bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-center text-transparent">
                Day {day.day}
              </h3>
              <h4 className="md:text-3xl text-center text-primary/80">
                {day.title}
              </h4>
            </div>
            <div className="cards flex flex-col md:flex-row flex-wrap gap-5">
              {day.places.map((place, idx) => {
                return (
                  <div key={idx} className="md:w-[48%]">
                    <PlaceCards className="place-card" place={place} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Placescard;

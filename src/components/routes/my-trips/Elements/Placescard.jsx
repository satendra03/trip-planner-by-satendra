import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { LogInContext } from "@/Context/LogInContext/Login";
import PlaceCards from "../Cards/PlaceCards";

function Placescard() {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 640px)" });

  const { trip } = useContext(LogInContext);
  const itinerary = trip?.tripData?.itinerary;
  const city = trip?.tripData?.location;

  return (
    <>
      {itinerary?.map((day, idx) => {
        return (
          <div key={idx} className="main-container mt-5 sm:mt-10">
            <div className="heading text-center sm:text-left">
              <h3 className="font-medium text-lg tex sm:text-2xl sm:font-bold mt-2">
                Day {day.day}
              </h3>
              <h4 className="font-black text-base sm:text-2xl text-orange-400">
                {day.title}
              </h4>
            </div>
            <div className="cards sm:grid sm:gap-4 sm:grid-cols-2">
              {day.places.map((place, idx) => {
                return <PlaceCards key={idx} place={place} />;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Placescard;

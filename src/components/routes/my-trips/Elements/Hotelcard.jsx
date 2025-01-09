import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { LogInContext } from "@/Context/LogInContext/Login";
import HotelCards from "../Cards/HotelCards";
import { useRefContext } from "@/Context/RefContext/RefContext";

function Hotelcard() {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 640px)" });

  const { trip } = useContext(LogInContext);
  const city = trip?.tripData?.location;
  const hotels = trip?.tripData?.hotels;

  const { holetsRef } = useRefContext();

  return (
    <div ref={holetsRef} className="flex flex-col md:flex-row flex-wrap gap-5">
      {hotels?.map((hotel, idx) => {
        return (
          <div key={idx} className="md:w-[48%]">
            <HotelCards className="hotel-card" hotel={hotel} />
          </div>
        );
      })}
    </div>
  );
}

export default Hotelcard;

// <React.Fragment key={idx}>
//   <HotelCards hotel={hotel} />
// </React.Fragment>

import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { LogInContext } from "@/Context/LogInContext/Login";
import HotelCards from "../Cards/HotelCards";

function Hotelcard() {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 640px)" });

  const { trip } = useContext(LogInContext);
  const city = trip?.tripData?.location;
  const hotels = trip?.tripData?.hotels;

  return (
    <>
      {hotels?.map((hotel, idx) => {
        return (
          <React.Fragment key={idx}>
            <HotelCards hotel={hotel} />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default Hotelcard;

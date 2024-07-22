import { getCityDetails, PHOTO_URL } from "@/Service/GlobalApi";
import React, { useEffect, useState } from "react";

function AlltripsCard({ trip }) {
//   const { trip } = useContext(LogInContext);

    // console.log(trip);
  const [cityDets, setCityDets] = useState([]);
  const [photos, setPhotos] = useState("");
  const [Url, setUrl] = useState("");

  const city = trip?.tripData?.location;

  const getCityInfo = async () => {
    const data = {
      textQuery: city,
    };
    const result = await getCityDetails(data)
      .then((res) => {
        setCityDets(res.data.places[0]);
        setPhotos(res.data.places[0].photos[0].name);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    trip && getCityInfo();
  }, [trip]);

  useEffect(() => {
    const url = PHOTO_URL.replace("{replace}", photos);
    setUrl(url);
  }, [photos]);

  return (
    <>
      <div className="main bg-gray-100 hover:scale-105 hover:cursor-pointer transition-all hover:shadow-xl w-36 min-h-32 sm:w-32 md:w-44 rounded-md border border-black/10 p-1">
        <div className="img h-[80%] min-h-32 w-full border border-black/5 overflow-hidden rounded-md">
          <img
            src={Url || "/logo.png"}
            alt="trip"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text flex flex-col">
          <h2 className="font-semibold sm:font-bold lg:font-bold text-xs text-center">
            {trip.userSelection.location}
          </h2>
          <h2 className="font-normal sm:font-semibold lg:font-bold text-xs text-center text-muted-foreground">
            {trip.userSelection.noOfDays} Days Trip
          </h2>
          <h2 className="font-normal sm:font-semibold lg:font-bold text-xs text-center text-muted-foreground">with {" "}
            {trip.userSelection.Budget} Level Budget
          </h2>
        </div>
      </div>
    </>
  );
}

export default AlltripsCard;

import { getCityDetails, PHOTO_URL } from "@/Service/GlobalApi";
import React, { useEffect, useState } from "react";

const AlltripsCard = ({ trip }) => {
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
      <div  className="card-card border-foreground/20 p-1 h-full flex flex-col gap-3">
        <div className="img relative h-full rounded-lg overflow-hidden duration-500 group">
          <img
            src={Url || "/logo.png"}
            className="h-56 w-full object-cover group-hover:scale-110 duration-500 transition-all"
            alt={Url || "/logo.png"}
          />
          <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-gradient-to-b text-lg from-primary/90 to-primary/60 bg-clip-text text-transparent font-bold">
              {trip.userSelection.location}
            </span>
            <span className="bg-gradient-to-b text-lg from-primary/90 to-primary/60 bg-clip-text text-transparent font-bold">
              {trip.userSelection.noOfDays}{" "}
              {trip.userSelection.noOfDays > 1 ? "Days" : "Day"}
            </span>
            <span className="bg-gradient-to-b text-lg from-primary/90 to-primary/60 bg-clip-text text-transparent font-bold">
              {trip.userSelection.Budget} Budget
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlltripsCard;

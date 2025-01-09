import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogInContext } from "@/Context/LogInContext/Login";
import { getPlaceDetails, PHOTO_URL } from "@/Service/GlobalApi";

function PlaceCards({ place }) {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 640px)" });

  const { trip } = useContext(LogInContext);
  const itinerary = trip?.tripData?.itinerary;
  const city = trip?.tripData?.location;

  const [placeDets, setPlaceDets] = useState([]);
  const [photos, setPhotos] = useState("");
  const [Url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const getPlaceInfo = async () => {
    const data = {
      textQuery: place.name + city,
    };
    const result = await getPlaceDetails(data)
      .then((res) => {
        setPlaceDets(res.data.places[0]);
        setPhotos(res.data.places[0].photos[0].name);
        setAddress(res.data.places[0].formattedAddress);
        setLocation(res.data.places[0].googleMapsUri);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    trip && getPlaceInfo();
  }, [trip]);

  useEffect(() => {
    const url = PHOTO_URL.replace("{replace}", photos);
    setUrl(url);
  }, [photos]);

  return (
    <>
      <Link
        className="w-full"
        target="_blank"
        to={
          location
            ? location
            : `https://www.google.com/maps/search/${place.name},${city}`
        }
      >
        <Card className="border-foreground/20 p-1 h-full flex flex-col gap-3 hover:scale-105 duration-300">
          <div className="img h-full rounded-lg">
            <img
              src={Url || "/logo.png"}
              // src={place.image_url}
              className="h-80 w-full object-cover"
              alt=""
            />
          </div>
          <div className="text-content w-full flex items-center gap-3 justify-between flex-col h-full">
            <CardHeader className="w-full">
              <CardTitle className="opacity-90 w-full text-center text-xl font-black text-primary/80 md:text-3xl">
                {place.name}
              </CardTitle>
              <CardDescription className="line-clamp-2 tracking-wide opacity-90 w-full text-center text-sm text-primary/80 md:text-md">
                {place.details}
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <div className="places-details">
                <span className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide">
                  🕒 Timings: {place.timings}{" "}
                </span>
                <br />
                <span className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide">
                  💵 Price:
                  {place.pricing}{" "}
                </span>{" "}
                <br />
                <span className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide line-clamp-1">
                  📍 Location: {address ? address : place.address}
                </span>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    </>
  );
}

export default PlaceCards;

// grid mt-4 hover:scale-105 transition-all text-left grid-rows-1 grid-cols-[30%_1fr] h-20 custom-500:grid-cols-[25%_1fr] sm:grid-cols-[35%_1fr] custom-435:h-24 gap-2 items-center sm:items-start p-2 sm:h-auto bg-gray-100 border border-black/10

{
  /* <div className="main ">
        {isSmall ? (
          <Popover className="">
            <PopoverTrigger>
              <Card className="grid mt-4 hover:scale-105 transition-all text-left grid-rows-1 grid-cols-[30%_1fr] h-20 custom-500:grid-cols-[25%_1fr] sm:grid-cols-[35%_1fr] custom-435:h-24 gap-2 items-center sm:items-start p-2 sm:h-auto min-w-[250px] bg-gray-100 border border-black/10">
                <div className="img h-full rounded-lg hover:shadow-xl bg-gray-200 border border-black/10">
                  <img
                    src={Url || "/logo.png"}
                    className="h-full max-h-48 w-full object-cover"
                    alt=""
                  />
                </div>
                <div className="text-content w-full">
                  <CardHeader className="">
                    <CardTitle className="sm:font-semibold text-lg">
                      {place.name}
                    </CardTitle>
                    {!isMobile && (
                      <CardDescription className="text-sm line-clamp-2 ">
                        {place.details}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="">
                    {isMobile && (
                      <p className="text-sm text-muted-foreground w-full line-clamp-1">
                        {place.details}
                      </p>
                    )}
                  </CardContent>
                </div>
              </Card>
            </PopoverTrigger>
            <PopoverContent>
              <h3 className="text-lg font-medium leading-none">Details:</h3>
              <p className="text-muted-foreground">{place.details}</p>
              <div className="mt-4">
                <span className="text-base font-medium">🕒 Timings:</span>{" "}
                {place.timings} <br />
                <span className="text-base font-medium">💵 Price: </span>{" "}
                {place.pricing} <br />
                <span className="text-base font-medium">
                  📍 Location:{" "}
                </span>{" "}
                {address ? address : place.address} <br />
                <br />
                <Link
                  to={
                    location
                      ? location
                      : `https://www.google.com/maps/search/${place.name},${city}`
                  }
                  target="_blank"
                  className="mt-3"
                >
                  <Button className="w-full">See in Map</Button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link
            target="_blank"
            to={
              location
                ? location
                : `https://www.google.com/maps/search/${place.name},${city}`
            }
          >
            <Card className="grid mt-4 hover:scale-105 transition-all text-left grid-rows-1 grid-cols-[30%_1fr] h-20 custom-500:grid-cols-[25%_1fr] sm:grid-cols-[35%_1fr] custom-435:h-24 gap-2 items-center sm:items-start p-2 sm:h-auto bg-gray-100 border border-black/10">
              <div className="img h-full rounded-lg bg-gray-200 border border-black/10">
                <img
                  src={Url || "/logo.png"}
                  // src={place.image_url}
                  className="h-full max-h-48 w-full object-cover"
                  alt=""
                />
              </div>
              <div className="text-content w-full flex sm:items-start items-center justify-center flex-col h-full">
                <CardHeader className="">
                  <CardTitle className="sm:font-semibold text-lg">
                    {place.name}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2 ">
                    {place.details}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-left">
                  <div className="">
                    <span className="text-base font-medium">🕒 Timings:</span>{" "}
                    {place.timings} <br />
                    <span className="text-base font-medium">💵 Price: </span>
                    {place.pricing} <br />
                    <span className="text-base font-medium">
                      📍 Location: {address ? address : place.address}
                    </span>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        )}
      </div> */
}

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { LogInContext } from "@/Context/LogInContext/Login";
import { getPlaceDetails, PHOTO_URL } from "@/Service/GlobalApi";

function HotelCards({ hotel }) {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 640px)" });

  const [placeDets, setPlaceDets] = useState([]);
  const [photos, setPhotos] = useState("");
  const [Url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const { trip } = useContext(LogInContext);
  const city = trip?.tripData?.location;
  const hotels = trip?.tripData?.hotels;

  const getPlaceInfo = async () => {
    const data = {
      textQuery: hotel.name + city,
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
      {isSmall ? (
        <Popover className="sm:text-left">
          <PopoverTrigger>
            <Card className="grid mt-4 hover:scale-105 transition-all text-left grid-rows-1 grid-cols-[30%_1fr] h-20 custom-500:grid-cols-[25%_1fr] sm:grid-cols-[35%_1fr] custom-435:h-24 gap-2 items-center sm:items-start p-2 sm:h-auto min-w-[250px] bg-gray-100 border border-black/10">
              <div className="img h-full rounded-lg bg-gray-200 border border-black/10">
                <img
                  src={Url || "/logo.png"}
                  // src={hotel.image_url}
                  className="h-full max-h-48 w-full object-cover"
                  alt=""
                />
              </div>
              <div className="text-content w-full">
                <CardHeader className="">
                  <CardTitle className="sm:font-semibold text-lg">
                    {hotel.name}
                  </CardTitle>
                  {!isMobile && (
                    <CardDescription className="text-sm line-clamp-2 ">
                      {hotel.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="">
                  {isMobile && (
                    <p className="text-sm text-muted-foreground w-full line-clamp-1">
                      {hotel.description}
                    </p>
                  )}
                </CardContent>
              </div>
            </Card>
          </PopoverTrigger>
          <PopoverContent>
            <h3 className="text-lg font-medium leading-none">Description:</h3>
            <p className="text-muted-foreground">{hotel.description}</p>
            <div className="mt-4 ">
              <span className="text-base font-medium">⭐ Rating: </span>{" "}
              {hotel.rating} <br />
              <span className="text-base font-medium">💵 Price: </span>{" "}
              {hotel.price} <br />
              <span className="text-base font-medium">📍 Location: </span>{" "}
              {address ? address : hotel.address} <br />
              <br />
              <Link
                to={
                  location
                    ? location
                    : `https://www.google.com/maps/search/${hotel.name},${city}`
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
              : `https://www.google.com/maps/search/${hotel.name},${city}`
          }
        >
          <Card className="grid mt-4 hover:scale-105 transition-all text-left grid-rows-1 grid-cols-[30%_1fr] h-20 custom-500:grid-cols-[25%_1fr] sm:grid-cols-[20%_1fr] custom-435:h-24 gap-2 items-center sm:items-start p-2 sm:h-40  bg-gray-100 border border-black/10 sm:text-left">
            <div className="img h-full rounded-lg bg-gray-200 border border-black/10">
              <img
                src={Url || "/logo.png"}
                // src={hotel.image_url}
                className="h-full max-h-48 w-full object-cover"
                alt=""
              />
            </div>
            <div className="text-content w-full flex items-start justify-center flex-col h-full">
              <CardHeader className="">
                <CardTitle className="sm:font-semibold text-lg">
                  {hotel.name}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2 ">
                  {hotel.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <div className="">
                  <span className="text-base font-medium">
                    ⭐ Rating: {hotel.rating}
                  </span>{" "}
                  <br />
                  <span className="text-base font-medium">
                    💵 Price: {hotel.price}
                  </span>{" "}
                  <br />
                  <span className="text-base font-medium">
                    📍 Location: {address ? address : hotel.address}
                  </span>
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>
      )}
    </>
  );
}

export default HotelCards;

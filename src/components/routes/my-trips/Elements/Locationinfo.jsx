import { LogInContext } from "@/Context/LogInContext/Login";
import { getCityDetails, PHOTO_URL } from "@/Service/GlobalApi";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRefContext } from "@/Context/RefContext/RefContext";

function Locationinfo() {
  const { trip } = useContext(LogInContext);
  const [cityDets, setCityDets] = useState([]);
  const [photos, setPhotos] = useState("");
  const [Url, setUrl] = useState("");
  const { locationInfoRef} = useRefContext();

  const [allImages, setAllImages] = useState([]);

  const compliments = [
    "Indeed, a great choice!",
    "Hmm, this is one of the best places—spot on!",
    "Oh, absolutely! That's an excellent pick.",
    "I see you have a knack for picking the best.",
    "Ah, this is top-notch. You've got great taste!",
    "Can't argue with that—brilliant choice!",
    "Wow, you always know how to pick the perfect one.",
    "Hmm, I couldn't agree more—this is fantastic.",
    "This is a fantastic pick, you've got a great eye!",
    "Excellent choice, you nailed it!",
    "You've got a real talent for choosing the best.",
    "Spot on! This is exactly what I would have picked.",
    "Great minds think alike—what a selection!",
    "You've got an excellent sense for this.",
    "This is an amazing choice, very impressive!",
    "I see you've done your research—top choice.",
    "That's a choice I can definitely get behind.",
    "You have a knack for picking winners!",
    "This is a great find—well done!",
    "I couldn't have chosen better myself!",
    "Such a great pick, you really know your stuff.",
    "A fantastic choice, you've got style!",
    "That's a smart decision, I'm impressed!",
    "You have great taste, that's for sure.",
    "This was an obvious winner—great pick!",
    "Wow, this is just perfect—well chosen!",
    "That's a choice full of wisdom and class.",
  ];

  const randomCompliment =
    compliments[Math.floor(Math.random() * compliments.length)];

  const city = trip?.tripData?.location;

  const getCityInfo = async () => {
    const data = {
      textQuery: city,
    };
    const result = await getCityDetails(data)
      .then((res) => {
        setCityDets(res.data.places[0]);
        // console.log("Res Data", res.data.places[0]);
        setAllImages(res.data.places[0].photos);
        setPhotos(res.data.places[0].photos[0].name);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    trip && getCityInfo();
  }, [trip]);

  const getUrl = (name) => {
    return PHOTO_URL.replace("{replace}", name);
  };

  useEffect(() => {
    const url = PHOTO_URL.replace("{replace}", photos);
    setUrl(url);
  }, [photos]);

  return (
    <div ref={locationInfoRef} className="my-1 md:my-5">
      <div className="location text text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-2">
          <span className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">
            {city}{" "}
          </span>{" "}
        </h2>
        <p className="opacity-90 mx-auto text-center text-md font-medium tracking-tight text-primary/80 md:text-xl">
          {randomCompliment}
        </p>
      </div>
      <div className="carousel img opacity-90 mx-auto text-center text-lg font-medium tracking-tight text-primary/80 md:text-lg">
        Take a sneak peek at what's ahead!
      </div>
      <Carousel className="carousel w-full ">
        <CarouselContent>
          {allImages?.map((imgs, index) => (
            <CarouselItem key={index}>
              <div className="p-1 h-full w-full">
                <Card>
                  <CardContent className="flex max-h-[50vh] rounded-lg overflow-hidden h-full w-full items-center justify-center p-1">
                    <img
                      src={
                        getUrl(imgs.name) || "/images/main_img_placeholder.jpg"
                      }
                      className="rounded-lg cursor-pointer"
                      alt={imgs.name}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
      {/* <Link to={cityDets.googleMapsUri} className="cursor-pointer">
        <img
          src={Url || "/images/main_img_placeholder.jpg"}
          className="w-full object-cover rounded-lg"
          alt="place"
        />
      </Link> */}
      <h2 className="location-info md:mt-4 opacity-90 mx-auto text-center text-lg font-medium tracking-tight text-primary/80 md:text-xl">
        Ah, these are your picks—looking great so far!
        {/* <span className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">
          Adventure
        </span>{" "} */}
      </h2>
      <div className="location-info flex items-center justify-center py-2 gap-2 mt-2">
        <h3 className="location-info opacity-90 bg-foreground/20 px-2 md:px-4 flex items-center justify-center rounded-md text-center text-md font-medium tracking-tight text-primary/80 md:text-lg">
          💵 {trip?.userSelection?.Budget}
        </h3>
        <h3 className="location-info opacity-90 bg-foreground/20 px-2 md:px-4 flex items-center justify-center rounded-md text-center text-md font-medium tracking-tight text-primary/80 md:text-lg">
          👨‍👩‍👧‍👦 {trip?.userSelection?.People}
        </h3>
        <h3 className="location-info opacity-90 bg-foreground/20 px-2 md:px-4 flex items-center justify-center rounded-md text-center text-md font-medium tracking-tight text-primary/80 md:text-lg">
          📆 {trip?.userSelection?.noOfDays} Day
        </h3>
      </div>
    </div>
  );
}

export default Locationinfo;

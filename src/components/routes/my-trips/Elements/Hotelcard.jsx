import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { LogInContext } from "@/Context/LogInContext/Login";
import HotelCards from "../Cards/HotelCards";
import { useRefContext } from "@/Context/RefContext/RefContext";
import { getPlaceDetails } from "@/Service/GlobalApi";
import { useCache } from "@/Context/Cache/CacheContext";

function Hotelcard() {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 640px)" });

  const [id, setId] = useState("");

  const { trip } = useContext(LogInContext);
  const city = trip?.tripData?.location;
  const hotels = trip?.tripData?.hotels;

  const { setPlaceCache } = useCache();

  const { holetsRef } = useRefContext();

  // const getPlaceInfo = async (hotel) => {
  //   const data = {
  //     textQuery: hotel.name + city,
  //   };

  //   try {
  //     const result = await getPlaceDetails(data);
  //     const place = result?.data?.places[0];
  //     let info = {
  //       id: place.id,
  //       lat: place.location.latitude,
  //       lng: place.location.longitude,
  //       name: hotel.name,
  //       city: city,
  //       address: place.formattedAddress,
  //       rating: place.rating,
  //       location: place.googleMapsUri,
  //       photos: place.photos?.[0]?.name || null,
  //     };

  //     setId(info.id);


  //     setPlaceCache((prevCache) => {
  //       if (!prevCache.has(info.id)) {
  //         const updatedCache = new Map(prevCache);
  //         updatedCache.set(info.id, info);
  //         console.log("Updated Place Cache:", updatedCache);
  //         return updatedCache;
  //       }
  //       return prevCache;
  //     });
      

  //   } catch (err) {
  //     console.log("Error fetching place details:", err);
  //   }
  // };


  // useEffect(() => {
  //   if (hotels?.length && city) {
  //     hotels.forEach((h) => {
  //       getPlaceInfo(h);
  //     });
  //   }
  // }, [trip, hotels]);


  // useEffect(() => {
  //   const fetchAllPlaces = async () => {
  //     if (!hotels?.length || !city) return;
  
  //     const results = await Promise.allSettled(
  //       hotels.map(async (hotel) => {
  //         const data = { textQuery: hotel.name + city };
  //         try {
  //           const result = await getPlaceDetails(data);
  //           const place = result?.data?.places[0];
  //           return {
  //             id: place.id,
  //             lat: place.location.latitude,
  //             lng: place.location.longitude,
  //             name: hotel.name,
  //             city,
  //             address: place.formattedAddress,
  //             rating: place.rating,
  //             location: place.googleMapsUri,
  //             photos: place.photos?.[0]?.name || null,
  //           };
  //         } catch (e) {
  //           console.log("Failed for", hotel.name);
  //           return null;
  //         }
  //       })
  //     );

  //     console.log("Results:", results);
  
  //     const newCache = new Map(placeCache);
  //     results.forEach((r) => {
  //       if (r.status === "fulfilled" && r.value) {
  //         console.log("Adding to cache:", r.value.id);
  //         newCache.set(r.value.id, r.value);
  //       }
  //     });
  
  //     setPlaceCache(newCache);
  //   };
  
  //   fetchAllPlaces();
  // }, [trip, hotels]);

  return (
    <div ref={holetsRef} className="flex flex-col md:flex-row flex-wrap gap-5">
      {hotels?.map((hotel, idx) => {
        return (
          <div key={idx} className="md:w-[48%]">
            <HotelCards className="hotel-card" id={id} hotel={hotel} />
          </div>
        );
      })}
    </div>
  );
}

export default Hotelcard;

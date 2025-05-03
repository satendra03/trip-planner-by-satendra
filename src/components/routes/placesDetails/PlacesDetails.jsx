import { useCache } from "@/Context/Cache/CacheContext";
import React, { useEffect, useState } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  useJsApiLoader,
  Polyline,
} from "@react-google-maps/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getRoute } from "@/Service/GlobalApi";

import polyline from "@mapbox/polyline";
import { distance } from "framer-motion";
import { Loader, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PlacesDetails = ({ PlaceDetailsPageRef }) => {
  const { selectedPlace } = useCache();
  // console.log("Selected Place:", selectedPlace);

  const {
    name,
    address,
    rating,
    price,
    city,
    location,
    photos,
    description,
    id,
  } = selectedPlace || {};

  const { lat, lng } = useParams();
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  const navigate = useNavigate();

  const [nearbyLocation, setNearbyLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [decodedPath, setDecodedPath] = useState([]);
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);
  const [image_url, setImageUrl] = useState(null);
  const [locationId, setLocationId] = useState(null);

  const [imagesMap, setImagesMap] = useState(new Map());

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      if (!latitude || !longitude) return;

      try {
        const placesRes = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/places?lat=${latitude}&lng=${longitude}&type=hotel`
        );

        const placesData = await placesRes.json();
        setNearbyLocation(placesData || []);
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Check console.");
      }
    };

    fetchNearbyPlaces();
  }, []);

  //   useEffect(() => {
  //     if (!selectedPlace) {
  //         console.log("No hotel selected");
  //         navigate("/");
  //     }
  //   }, [selectedPlace]);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const mapCenter = {
    lat: latitude || 0,
    lng: longitude || 0,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries: ["places", "marker"],
  });

  const handleSelectLocation = (location) => () => {
    setSelectedLocation(location);
  };

  function extractPlaceId(url) {
    const match = url.match(/place_id:([^&]+)/);
    return match ? match[1] : null;
  }

  const fetchGooglePhotoUrl = async (photoReference) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/get-photo-url?photoReference=${photoReference}`
      );
      const data = await res.json();

      if (data.imageUrl) {
        return data.imageUrl;
      } else {
        console.error(data.error);
        return null;
      }
    } catch (err) {
      console.error("Error fetching photo URL:", err);
      return null;
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      const origin = { latitude: latitude, longitude: longitude };
      const destination = {
        latitude: selectedLocation?.location.latitude,
        longitude: selectedLocation?.location.longitude,
      };

      getRoute(origin, destination).then((routeInfo) => {
        if (routeInfo) {
          setDistance(routeInfo.distanceMeters);
          setTime(routeInfo.duration);

          const decodedPath = polyline
            .decode(routeInfo.polyline.encodedPolyline)
            .map(([lat, lng]) => ({
              lat,
              lng,
            }));
          setDecodedPath(decodedPath);
          // }
        }
      });

      let googleMapsUri = selectedLocation?.googleMapsUri;
      if (googleMapsUri) {
        const placeId = extractPlaceId(googleMapsUri);
        setLocationId(placeId);
      }
    }
  }, [selectedLocation]);

  useEffect(() => {
    nearbyLocation.forEach((place) => {
      if (place.photos) {
        const photoUrl = imagesMap.get(place.photos);
        if (!photoUrl) {
          fetchGooglePhotoUrl(place.photos).then((url) => {
            setImagesMap((prevMap) => new Map(prevMap).set(place.photos, url));
          });
        }
      }
    });
  }, [nearbyLocation]);

  const getImage = (key) => {
    return imagesMap.get(key);
  };

  const getTime = (value) => {
    const seconds = parseInt(value);
    const minutes = Math.ceil(seconds / 60);
    return minutes;
  };

  const getDistance = (value) => {
    const meters = parseInt(value);
    const kilometers = (meters / 1000).toFixed(2);
    return kilometers;
  };

  return (
    <div ref={PlaceDetailsPageRef} className="main">
      <div className="place-details mt-5">
        <div className="text text-center">
          <h2 className="text-3xl md:text-5xl mt-5 font-bold flex items-center justify-center">
            <span className="bg-gradient-to-b text-7xl from-blue-400 to-blue-700 bg-clip-text text-center text-transparent">
              {name}
            </span>
          </h2>
          📍
          <span className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent text-xl">
            {address}
          </span>
        </div>

        <div className="flex items-center justify-center py-2 gap-2 mt-2">
          <h3 className="location-info opacity-90 bg-foreground/20 px-2 md:px-4 flex items-center justify-center rounded-md text-center text-md font-medium tracking-tight text-primary/80 md:text-lg">
            💵 {price}
          </h3>
          <h3 className="location-info opacity-90 bg-foreground/20 px-2 md:px-4 flex items-center justify-center rounded-md text-center text-md font-medium tracking-tight text-primary/80 md:text-lg">
            ⭐ {rating} Stars
          </h3>
        </div>
      </div>

      <div className="map-location-place mt-5 w-full bg-gradient-to-b from-primary/90 to-primary/60 font-bold bg-clip-text text-transparent text-3xl text-center">
        Map Location
      </div>
      <div className="place-map rounded-lg m-4 md:m-2 overflow-hidden shadow-md flex flex-col gap-2 md:flex-row">
        {!isLoaded ? (
          <div className="flex items-center justify-center w-full h-[400px]">
            <span className="text-gray-500 animate-pulse">Loading Map...</span>
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={15}
          >
            <Marker
              position={{
                lat: latitude,
                lng: longitude,
              }}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 12, // size of the marker
                fillColor: "#black", // your custom color
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: "#ffffff", // border color
              }}
              label="🏨"
            />
            {/* <Marker position={mapCenter} /> */}
            {selectedLocation && (
              <>
                {/* Draw a line between hotel and place */}
                <Polyline
                  path={decodedPath}
                  options={{
                    strokeColor: "#1E90FF",
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                  }}
                />
                <Marker
                  position={{
                    lat: selectedLocation.location.latitude,
                    lng: selectedLocation.location.longitude,
                  }}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 12, // size of the marker
                    fillColor: "black", // your custom color
                    fillOpacity: 1,
                    strokeWeight: 1,
                    strokeColor: "#ffffff", // border color
                  }}
                  label="📍"
                />
              </>
            )}
          </GoogleMap>
        )}
      </div>

      {distance && time && (
        <>
          <div className="flex items-center justify-center py-2 gap-2 mt-2">
            <h3 className="location-info opacity-90 bg-foreground/20 px-2 md:px-4 flex items-center justify-center rounded-md text-center text-md font-medium tracking-tight text-primary/80 md:text-lg">
              Distance: {distance} meters ( {getDistance(distance)} km )
            </h3>
            <h3 className="location-info opacity-90 bg-foreground/20 px-2 md:px-4 flex items-center justify-center rounded-md text-center text-md font-medium tracking-tight text-primary/80 md:text-lg">
              Time: {getTime(time)} minutes
            </h3>
          </div>
        </>
      )}

      <div className="mt-4 w-full">
        <h2 className="nearby-locations mt-5 w-full bg-gradient-to-b from-primary/90 to-primary/60 font-bold bg-clip-text text-transparent text-3xl text-center">
          Nearby Places
        </h2>
        {nearbyLocation.length === 0 ? (
          <p className="text-sm text-gray-500 my-5 text-center">
            <Loader2 size={50} className="animate-spin w-full mt-5" />
            Loading nearby locations...
          </p>
        ) : (
          <ul className="location-list space-y-2 grid grid-cols-1 md:grid-cols-2 gap-3 mb-5 p-5 lg:grid-cols-4 mx-auto">
            {nearbyLocation.map((location, index) => (
              <div
                onClick={handleSelectLocation(location)}
                className="max-w-xs relative w-full group/card border border-foreground/20 rounded-lg overflow-hidden shadow-md cursor-pointer"
                key={index}
              >
                <div
                  style={{ backgroundImage: `url(${getImage(location?.photos)})` }}
                  className={cn(
                    " cursor-pointer overflow-hidden relative card h-72 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
                    `bg-cover`
                  )}
                >
                  <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent z-0 pointer-events-none" />

                  <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-background opacity-60"></div>
                  <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-background to-transparent z-0 pointer-events-none" />

                  <div className="flex flex-row items-center space-x-4 z-10 ">
                    <div className="flex flex-col">
                      <p className="font-normal text-base text-foreground relative z-10">
                        # {index + 1}
                      </p>
                      <p className="text-sm text-foreground/90">
                        Rating {location?.rating} ⭐
                      </p>
                    </div>
                  </div>
                  <div className="text content">
                    <h1 className="font-bold text-xl md:text-2xl text-foreground relative z-10 line-clamp-2">
                      {location.name}
                    </h1>
                    <p className="font-normal text-sm text-foreground relative z-10 my-4 line-clamp-3">
                      {location.address}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlacesDetails;


// place-details
// map-location-place
// place-map
// nearby-locations
// location-list
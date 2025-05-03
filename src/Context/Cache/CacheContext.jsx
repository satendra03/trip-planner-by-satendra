import { createContext, useContext, useState } from "react";

const CacheContext = createContext();

export const CacheProvider = ({ children }) => {
  const [placeCache, setPlaceCache] = useState(new Map());
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [rooms, setRooms] = useState(1);


  return (
    <CacheContext.Provider
      value={{
        placeCache,
        setPlaceCache,
        selectedHotel,
        setSelectedHotel,
        selectedPlace,
        setSelectedPlace,
        setCheckInDate,
        setCheckOutDate,
        checkInDate,
        checkOutDate,
        setAdults,
        setChildrenCount,
        setRooms,
        adults,
        childrenCount,
        rooms,

      }}
    >
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => useContext(CacheContext);

import { createContext, useContext, useRef } from "react";
const RefContext = createContext(null);

export const RefProvider = (props) => {
  const locationInfoRef = useRef(null);
  const holetsRef = useRef(null);
  const placesRef = useRef(null);

  return (
    <RefContext.Provider value={{ locationInfoRef, holetsRef, placesRef }}>
      {props.children}
    </RefContext.Provider>
  );
};

export const useRefContext = () => useContext(RefContext);
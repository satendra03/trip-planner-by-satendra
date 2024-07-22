import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useState } from "react";

export const LogInContext = createContext(null);

export const LogInContextProvider = (props) => {
    const { user, loginWithPopup, logout, isAuthenticated } = useAuth0();
    const [trip, setTrip] = useState([]);
    return (
        <LogInContext.Provider value={{user, loginWithPopup, logout, isAuthenticated, trip, setTrip}}>
            {props.children}
        </LogInContext.Provider>
    )   
}

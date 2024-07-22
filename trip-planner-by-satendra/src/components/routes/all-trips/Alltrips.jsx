import { LogInContext } from "@/Context/LogInContext/Login";
import { db } from "@/Service/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import AlltripsCard from "./AlltripsCard";
import { Link } from "react-router-dom";

function Alltrips() {
  const { user } = useContext(LogInContext);
  const [allTrips, setAllTrips] = useState([]);

  const getAllTrips = async () => {
    const Query = query(
      collection(db, "Trips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => {
      setAllTrips((prev) => [...prev, doc.data()]);
    });
  };
  useEffect(() => {
    getAllTrips();
  }, [user]);

  return (
    <div className="">
      <h1 className="w-full font-medium text-lg text-center sm:text-left sm:text-2xl sm:font-bold mb-3">
        All Trips
      </h1>
      <div className="container flex gap-3 flex-wrap items-center">
        {allTrips?.length > 0 ? (allTrips?.map((trip, idx) => (
          <Link key={idx} to={"/my-trips/" + trip.tripId}>
            <AlltripsCard trip={trip} />
          </Link> )
        )) : [1,2,3,4].map((ite,index)=>(
          <div className="w-36 min-h-44 sm:w-32 md:w-44 rounded-md border border-black/10 p-1 bg-slate-400 animate-pulse"></div>
        )) }
      </div>
    </div>
  );
}

export default Alltrips;

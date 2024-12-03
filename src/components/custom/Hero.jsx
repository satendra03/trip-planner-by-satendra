import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { LogInContext } from "@/Context/LogInContext/Login";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Stats from "./Stats";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Hero() {
  const { isAuthenticated } = useContext(LogInContext);
  const getTotals = async () => {
    try {
      const db = getFirestore();

      const tripsRef = collection(db, "Trips");
      const usersRef = collection(db, "Users");

      const tripsSnapshot = await getDocs(tripsRef);
      const totalTrips = tripsSnapshot.size; 

      const usersSnapshot = await getDocs(usersRef);
      const totalUsers = usersSnapshot.size;

      return { totalTrips, totalUsers };
    } catch (error) {
      console.error("Error fetching totals: ", error);
      throw error;
    }
  };
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState(0);
  const [users, setUsers] = useState(0);
  useEffect(() => {
    getTotals()
      .then(({ totalTrips, totalUsers, usersArray }) => {
        setTrips(totalTrips);
        setUsers(totalUsers);
      })
      .then(() => setLoading(false))
      .catch((error) => console.error("Failed to fetch totals", error));
  }, []);
  if (loading) {
    return (
      <div className="flex items-center flex-col text-center justify-center h-[70vh]">
        <div className="text px-10 md:px-40 flex flex-col items-center justify-center gap-4">
          <h1><AiOutlineLoading3Quarters size={80} className="animate-spin" /></h1>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center flex-col text-center justify-center h-auto">
      <div className="text px-10 md:px-40 flex flex-col items-center justify-center gap-4">
        <div className="heading">
          <h1 className="font-extrabold text-3xl md:text-[50px] leading-tight text-orange-500">
            Embark on Electrifying Adventures with JourneyJolt
          </h1>
          <h3 className="font-extrabold opacity-70 text-xl md:text-[40px] leading-tight">
            Tailored Itineraries for Every Explorer
          </h3>
          <br />
          <div className="stats">
            <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
              Current Stats
            </h3>
            <div className="nums flex flex-col sm:flex-row sm:w-full items-center justify-center gap-4">
              <Stats text={"Users Registered"} value={users} />
              <Stats text={"Trips Generated"} value={trips} />
            </div>
          </div>
        </div>
        <div className="desc mt-5">
          <h5 className="text-[15px] md:text-2xl font-semibold opacity-40">
            Your trusted trip planner and adventure guide sparking thrilling
            journeys with personalized travel plans designed to match your
            passions and preferences.
          </h5>
        </div>
        <div className="button flex flex-col">
          <Link to="/plan-a-trip">
            <Button className="">
              {isAuthenticated
                ? "Let's Make Another Trip"
                : "Plan a Trip, It's Free"}
            </Button>
          </Link>
          <h3 className="text-[15px] md:text-xl font-semibold opacity-40">
            OR
          </h3>
          <Link to="https://www.buymeacoffee.com/satendra03">
            <img
              style={{ height: "40px" }}
              src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=satendra03&button_colour=ff8929&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"
            />
          </Link>
        </div>
      </div>
      <div className="img">
        <img src="/travel.png" className="" alt="" />
      </div>
    </div>
  );
}

export default Hero;

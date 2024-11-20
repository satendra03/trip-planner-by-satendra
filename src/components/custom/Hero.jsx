import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { LogInContext } from "@/Context/LogInContext/Login";

function Hero() {
  const { isAuthenticated } = useContext(LogInContext);
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
          <h3 className="text-[15px] md:text-xl font-semibold opacity-40">OR</h3>
          <Link to="https://www.buymeacoffee.com/satendra03"><img style={{height:"40px"}} src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=satendra03&button_colour=ff8929&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" /></Link>
        </div>
      </div>
      <div className="img">
        <img src="/travel.png" className="" alt="" />
      </div>
    </div>
  );
}

export default Hero;

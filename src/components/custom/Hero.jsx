import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { LogInContext } from "@/Context/LogInContext/Login";
import Marquee from "../ui/marquee";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Hero({ heroRef }) {
  const { isAuthenticated } = useContext(LogInContext);
  const images = [
    {
      name: "Chichen Itza",
      src: "/hero/chichen.webp",
      link: "https://en.wikipedia.org/wiki/Chichen_Itza",
    },
    {
      name: "Christ the Redeemer",
      src: "/hero/christ.webp",
      link: "https://en.wikipedia.org/wiki/Christ_the_Redeemer_(statue)",
    },
    {
      name: "Colosseum",
      src: "/hero/colosseum.webp",
      link: "https://en.wikipedia.org/wiki/Colosseum",
    },
    {
      name: "Great Pyramid of Giza",
      src: "/hero/giza.webp",
      link: "https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza",
    },
    {
      name: "Machu Picchu",
      src: "/hero/peru.webp",
      link: "https://en.wikipedia.org/wiki/Machu_Picchu",
    },
    {
      name: "Taj Mahal",
      src: "/hero/taj.webp",
      link: "https://en.wikipedia.org/wiki/Taj_Mahal",
    },
    {
      name: "India Gate",
      src: "/hero/india.webp",
      link: "https://en.wikipedia.org/wiki/India_Gate",
    },
    {
      name: "Great Wall of China",
      src: "/hero/wall.webp",
      link: "https://en.wikipedia.org/wiki/Great_Wall_of_China",
    },
    {
      name: "Eiffel Tower",
      src: "/hero/tower.webp",
      link: "https://en.wikipedia.org/wiki/Eiffel_Tower",
    },
    {
      name: "Statue of Liberty",
      src: "/hero/liberty.webp",
      link: "https://en.wikipedia.org/wiki/Statue_of_Liberty",
    },
    {
      name: "Sydney Opera House",
      src: "/hero/sydney.webp",
      link: "https://en.wikipedia.org/wiki/Sydney_Opera_House",
    },
    {
      name: "Mount Everest",
      src: "/hero/everest.webp",
      link: "https://en.wikipedia.org/wiki/Mount_Everest",
    },
    {
      name: "Stonehenge",
      src: "/hero/stonehenge.webp",
      link: "https://en.wikipedia.org/wiki/Stonehenge",
    },
  ];

  // Trip Stats
// const getTotals = async () => {
//   try {
//     const db = getFirestore();

//     const tripsRef = collection(db, "Trips");
//     const usersRef = collection(db, "Users");

//     const tripsSnapshot = await getDocs(tripsRef);
//     const totalTrips = tripsSnapshot.size;

//     const usersSnapshot = await getDocs(usersRef);
//     const totalUsers = usersSnapshot.size;
//     const usersArray = usersSnapshot.docs.map(doc => doc.data());
//     console.log("Users:", usersArray);

//     return { totalTrips, totalUsers };
//   } catch (error) {
//     console.error("Error fetching totals: ", error);
//     throw error;
//   }
// };
// const [loading, setLoading] = useState(true);
// const [trips, setTrips] = useState(0);
// const [users, setUsers] = useState(0);
// useEffect(() => {
//   getTotals()
//     .then(({ totalTrips, totalUsers, usersArray }) => {
//       setTrips(totalTrips);
//       setUsers(totalUsers);
//       console.log("total Trips", totalTrips);
//       console.log("total Users", totalUsers);
//     })
//     .then(() => setLoading(false))
//     .catch((error) => console.error("Failed to fetch totals", error));
// }, []);
// if (loading) {
//   return (
//     <div className="flex items-center flex-col text-center justify-center h-[70vh]">
//       <div className="text px-10 md:px-40 flex flex-col items-center justify-center gap-4">
//         <h1><AiOutlineLoading3Quarters size={80} className="animate-spin" /></h1>
//       </div>
//     </div>
//   );
// }


  const first = images.slice(0, images.length / 2);
  const second = images.slice(images.length / 2);

  return (
    <div
      ref={heroRef}
      className="flex items-center flex-col text-center justify-center min-h-screen py-10"
    >
      <div className="text px-10 md:px-40 flex flex-col items-center justify-center gap-4">
        <div className="heading p-2 md:py-5">
          <h1 className="font-black text-3xl md:text-5xl bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">
            Embark on Electrifying <br /> Adventures with
          </h1>
          <h1 className="font-black text-5xl md:text-9xl bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-center text-transparent pb-4">
            JourneyJolt
          </h1>
        </div>
        <div className="desc">
          <h5 className="opacity-90 mx-auto text-center text-lg font-medium tracking-tight text-primary/80 md:text-xl">
            Your trusted trip planner and adventure guide.
          </h5>
        </div>
        <div className="buttons flex flex-col gap-3 md:flex-row">
          <Link to="/plan-a-trip">
            <Button className="">
              {isAuthenticated
                ? "Let's Make Another Trip"
                : "Plan a Trip, It's Free"}
            </Button>
          </Link>
          {/* <Link
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.buymeacoffee.com/satendra03"
          >
            <Button variant="secondary">Buy Me a Coffee</Button>
          </Link> */}
        </div>
        <div className="marquee relative flex w-[75vw] flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
          <Marquee reverse pauseOnHover className="[--duration:60s]">
            {second.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="img cursor-pointer border hover:border-foreground transition-all overflow-hidden rounded-md w-[200px] md:w-[250px]"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="h-full hover:scale-110 duration-300"
                    loading="lazy"
                    role="presentation"
                    fetchPriority="high"
                  />
                </Link>
              );
            })}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:60s]">
            {first.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="img cursor-pointer border hover:border-foreground transition-all overflow-hidden rounded-md w-[200px] md:w-[250px]"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="h-full hover:scale-110 duration-300"
                    loading="lazy"
                    role="presentation"
                    fetchPriority="high"
                  />
                </Link>
              );
            })}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

// Trip Stats
// const getTotals = async () => {
//   try {
//     const db = getFirestore();

//     const tripsRef = collection(db, "Trips");
//     const usersRef = collection(db, "Users");

//     const tripsSnapshot = await getDocs(tripsRef);
//     const totalTrips = tripsSnapshot.size;

//     const usersSnapshot = await getDocs(usersRef);
//     const totalUsers = usersSnapshot.size;

//     return { totalTrips, totalUsers };
//   } catch (error) {
//     console.error("Error fetching totals: ", error);
//     throw error;
//   }
// };
// const [loading, setLoading] = useState(true);
// const [trips, setTrips] = useState(0);
// const [users, setUsers] = useState(0);
// useEffect(() => {
//   getTotals()
//     .then(({ totalTrips, totalUsers, usersArray }) => {
//       setTrips(totalTrips);
//       setUsers(totalUsers);
//     })
//     .then(() => setLoading(false))
//     .catch((error) => console.error("Failed to fetch totals", error));
// }, []);
// if (loading) {
//   return (
//     <div className="flex items-center flex-col text-center justify-center h-[70vh]">
//       <div className="text px-10 md:px-40 flex flex-col items-center justify-center gap-4">
//         <h1><AiOutlineLoading3Quarters size={80} className="animate-spin" /></h1>
//       </div>
//     </div>
//   );
// }
{
  /*<br />
          <div className="stats">
            <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
              Current Stats
            </h3>
            <div className="nums flex flex-col sm:flex-row sm:w-full items-center justify-center gap-4">
              <Stats text={"Users Registered"} value={users} />
              <Stats text={"Trips Generated"} value={trips} />
            </div>
          </div>*/
}

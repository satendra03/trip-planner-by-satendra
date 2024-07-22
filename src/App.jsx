import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/custom/Header.jsx";
import Hero from "./components/custom/Hero.jsx";
import CreateTrip from "./components/routes/plan-a-trip/CreateTrip.jsx";
import Mytrips from "./components/routes/my-trips/[tripId]/Mytrips.jsx";
import { useContext, useEffect, useState } from "react";
import { LogInContext } from "./Context/LogInContext/Login.jsx";
import Footer from "./components/custom/Footer.jsx";
import Alltrips from "./components/routes/all-trips/Alltrips.jsx";
import toast from "react-hot-toast";

function App() {
  const { user, isAuthenticated } = useContext(LogInContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    if(!loggedIn && isAuthenticated){
      setLoggedIn(true);
      toast.success('Logged In Successfully');
    }
  },[user]);


  return (
    <div className="app">
      <Header />
      <div className="container max-w-[1024px] w-full min-w-[320px] h-auto">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/plan-a-trip" element={<CreateTrip />} />
            <Route
              path="/my-trips/:tripId"
              element={isAuthenticated ? <Mytrips /> : <Hero/>}
            />
            <Route
              path="/all-trips"
              element={isAuthenticated ? <Alltrips /> : <Hero/>}
            />
          </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;

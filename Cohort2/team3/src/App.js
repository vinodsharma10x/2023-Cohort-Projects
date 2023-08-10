import React, { useState, useContext } from "react";
import GlobalStyles from "styles/GlobalStyles";
import MyItineraries from "pages/MyItineraries";
import ComponentRenderer from "ComponentRenderer.js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "pages/Login";
import Signup from "pages/Signup";
import AboutUs from "pages/AboutUs";
import Search from "pages/Search.js";
import Home from "pages/Home.js";
import FlightsDepartures from "pages/FlightsDepartures";
import ReturnFlights from "pages/ReturnFlights";
import Attractions from "pages/Attractions";
import Itinerary from "pages/Itinerary";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthContext from "auth/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);
  const [departureFlightData, setDepartureFlightData] = useState([]);
  const [returnFlightData, setReturnFlightData] = useState([]);
  const [city, setCity] = useState("");
  const [itineraryId, setItineraryId] = useState("");

  return (
    <GoogleOAuthProvider clientId="32101593679-er9qgunfqs07mml1sn113kch610knpah.apps.googleusercontent.com">
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/components/:type/:subtype/:name"
            element={<ComponentRenderer />}
          />
          <Route
            path="/components/:type/:name"
            element={<ComponentRenderer />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          {/* <Route path="/signup" element={<Signup />} /> */}

          {authCtx.isLoggedIn ? (
            //Routes while logged in
            <>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/search"
                element={
                  <Search
                    setDepartureFlightData={setDepartureFlightData}
                    setReturnFlightData={setReturnFlightData}
                    setCity={setCity}
                    setItineraryId={setItineraryId}
                  />
                }
              />
            </>
          ) : (
            //Routes if logged out
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Navigate to="/login" />} />
            </>
          )}

          <Route
            path="/flightsDepartures"
            element={
              <FlightsDepartures
                departureFlightData={departureFlightData}
                itineraryId={itineraryId}
              />
            }
          />

          <Route
            path="/returnFlights"
            element={
              <ReturnFlights
                returnFlightData={returnFlightData}
                itineraryId={itineraryId}
              />
            }
          />

          <Route
            path="/attractions"
            element={<Attractions city={city} itineraryId={itineraryId} />}
          />
          <Route path="/my-itineraries" element={<MyItineraries setItineraryId={setItineraryId}/>} />

          <Route
            path="/itinerary"
            element={<Itinerary itineraryId={itineraryId} />}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;

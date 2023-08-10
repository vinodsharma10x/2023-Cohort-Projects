import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import AuthContext from "auth/auth-context.js";

export default ({ returnFlightData, itineraryId }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [itineraryName, setItineraryName] = useState([]);
  const [departingFlights, setDepartingFlights] = useState([]);
  const [returningFlights, setReturningFlights] = useState([]);
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/itineraries/${itineraryId.id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + authCtx.token,
      }
    })
    .then(data => data.json())
    .then(data => {
      console.log('final data', data)
      setItineraryName(data.name);
      setDepartingFlights(data.flights.filter(el => el.type === "departing"));
      setReturningFlights(data.flights.filter(el => el.type === "return"));
      setAttractions(data.attractions);
    })
  }, [])
    
  function handleClickMenu(){
    navigate("/");
  }

  function handleClickPlan(){
    navigate("/search");
  }

  function handleClickAllItineraries(){
    navigate("/my-itineraries")
  }

  return (
    <AnimationRevealPage>
      <div>{itineraryName}</div>
      <div>Departing Flight</div>
      {departingFlights.map((el, key) => {
        const departDate = new Date(el.departure_datetime);
        const arrivalDate = new Date(el.arrival_datetime);
        return <div id={key}>{`${el.origin_airport_code} -> ${el.destination_airport_code} via ${el.airline} leaving at ${departDate.getHours()}:${departDate.getMinutes()} on ${departDate.toLocaleString('default', { month: 'long' })} ${departDate.getDate()} ${departDate.getFullYear()} arriving on ${arrivalDate.getHours()}:${arrivalDate.getMinutes()} on ${arrivalDate.toLocaleString('default', { month: 'long' })} ${arrivalDate.getDate()} ${arrivalDate.getFullYear()}`}</div>
      })}
      <div>Returning Flight</div>
      {returningFlights.map((el, key) => {
        console.log("returning flights", returningFlights)
        const departDate = new Date(el.departure_datetime);
        const arrivalDate = new Date(el.arrival_datetime);
        return <div id={key}>{`${el.origin_airport_code} -> ${el.destination_airport_code} via ${el.airline} leaving at ${departDate.getHours()}:${departDate.getMinutes()} on ${departDate.toLocaleString('default', { month: 'long' })} ${departDate.getDate()} ${departDate.getFullYear()} arriving on ${arrivalDate.getHours()}:${arrivalDate.getMinutes()} on ${arrivalDate.toLocaleString('default', { month: 'long' })} ${arrivalDate.getDate()} ${arrivalDate.getFullYear()}`}</div>
      })}
      <div>Attractions</div>
      {attractions.map((el, key) => 
        <div id={key}>{`${el.name}`}</div>
      )}
      <button onClick={handleClickMenu}>Main Menu</button>
      <button onClick={handleClickPlan}>Create Another Travel Plan</button>
      <button onClick={handleClickAllItineraries}>View Your Plans</button>
    </AnimationRevealPage>
  );
};

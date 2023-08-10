import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import AuthContext from "auth/auth-context.js";
import tw from "twin.macro";

const TitleText = tw.h1`font-bold text-xl text-white p-2 bg-primary-900`;
const SubTitleText = tw.h2`font-bold text-lg text-black p-2 underline`;
const ContentText = tw.h6`text-black`;
const Container = tw.div`m-auto w-screen`;
const Content = tw.div`py-4 overflow-auto bg-gray-100`;
const Card = tw.div`w-1/2 m-auto text-center shadow-xl overflow-auto rounded bg-primary-900`;
const MenuButton = tw.button`bg-primary-900 rounded py-2 px-4 text-white mx-2 mt-4 hover:bg-primary-500`

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
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("final data", data);
        setItineraryName(data.name);
        setDepartingFlights(
          data.flights.filter((el) => el.type === "departing")
        );
        setReturningFlights(data.flights.filter((el) => el.type === "return"));
        setAttractions(data.attractions);
      });
  }, []);

  function handleClickMenu() {
    navigate("/");
  }

  function handleClickPlan() {
    navigate("/search");
  }

  function handleClickAllItineraries() {
    navigate("/my-itineraries");
  }

  return (
    <AnimationRevealPage>
      <Container>
        <Card>
          <Content>
            <TitleText>{itineraryName}</TitleText>
            <SubTitleText>Departing Flight</SubTitleText>
            {departingFlights.map((el, key) => {
              const departDate = new Date(el.departure_datetime);
              const arrivalDate = new Date(el.arrival_datetime);
              return (
                <ContentText id={key}>{`${el.origin_airport_code} -> ${
                  el.destination_airport_code
                } via ${
                  el.airline
                } leaving at ${departDate.getHours()}:${departDate.getMinutes()} on ${departDate.toLocaleString(
                  "default",
                  { month: "long" }
                )} ${departDate.getDate()} ${departDate.getFullYear()} arriving on ${arrivalDate.getHours()}:${arrivalDate.getMinutes()} on ${arrivalDate.toLocaleString(
                  "default",
                  { month: "long" }
                )} ${arrivalDate.getDate()} ${arrivalDate.getFullYear()}`}</ContentText>
              );
            })}
            <SubTitleText>Returning Flight</SubTitleText>
            {returningFlights.map((el, key) => {
              console.log("returning flights", returningFlights);
              const departDate = new Date(el.departure_datetime);
              const arrivalDate = new Date(el.arrival_datetime);
              return (
                <ContentText id={key}>{`${el.origin_airport_code} -> ${
                  el.destination_airport_code
                } via ${
                  el.airline
                } leaving at ${departDate.getHours()}:${departDate.getMinutes()} on ${departDate.toLocaleString(
                  "default",
                  { month: "long" }
                )} ${departDate.getDate()} ${departDate.getFullYear()} arriving on ${arrivalDate.getHours()}:${arrivalDate.getMinutes()} on ${arrivalDate.toLocaleString(
                  "default",
                  { month: "long" }
                )} ${arrivalDate.getDate()} ${arrivalDate.getFullYear()}`}</ContentText>
              );
            })}
            <SubTitleText>Attractions</SubTitleText>
            {attractions.map((el, key) => (
              <ContentText id={key}>{`${el.name}`}</ContentText>
            ))}
            <MenuButton onClick={handleClickMenu}>Main Menu</MenuButton>
            <MenuButton onClick={handleClickPlan}>
              Create Another Travel Plan
            </MenuButton>
            <MenuButton onClick={handleClickAllItineraries}>View Your Plans</MenuButton>
          </Content>
        </Card>
      </Container>
    </AnimationRevealPage>
  );
};

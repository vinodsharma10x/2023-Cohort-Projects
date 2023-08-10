import React, { useState, useEffect, useContext } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import AuthContext from "auth/auth-context.js";
import tw from "twin.macro";

const TitleText = tw.h1`font-bold text-xl text-white bg-primary-900 p-8`;
const AttractionText = tw.span`py-2`;
const Container = tw.div`m-auto w-screen`;
const Content = tw.div`py-4 h-96 overflow-auto bg-gray-100`;
const Card = tw.div`w-1/2 m-auto text-center shadow-xl overflow-auto rounded bg-primary-900`;

export default () => {
  const authCtx = useContext(AuthContext);
  const [itineraryData, setItineraryData] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8000/api/v1/itineraries/", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + authCtx.token,
      }
    })
      .then((data) => data.json())
      .then((data) => {
        const myArray = Array.from(data);
        setItineraryData(myArray);
        console.log(itineraryData);
      });
  }, []);

  return (
    <AnimationRevealPage>
      <Container>
        <Card>
          <TitleText>My Itineraries</TitleText>
          <Content>
            {itineraryData.map((itinerary)=>{
                <h6>{itinerary.name}</h6>
            })}
          </Content>
        </Card>
      </Container>
    </AnimationRevealPage>
  );
};

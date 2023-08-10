import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import AuthContext from "auth/auth-context.js";
import tw from "twin.macro";

const TitleText = tw.h1`font-bold text-xl text-white bg-primary-900 p-8`;
const AttractionText = tw.span`py-2`;
const Button = tw.div`w-full hover:bg-gray-300 font-bold hover:cursor-pointer`
const Container = tw.div`m-auto w-screen`;
const Content = tw.div`py-4 h-96 overflow-auto bg-gray-100`;
const Card = tw.div`w-1/2 m-auto text-center shadow-xl overflow-auto rounded bg-primary-900`;

export default ({setItineraryId}) => {
  const authCtx = useContext(AuthContext);
  const [itineraryData, setItineraryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/itineraries/", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + authCtx.token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setItineraryData(data);
      });
  }, []);

  const handleClick = (e) => {
    setItineraryId(itineraryData[e.target.id]);
    navigate('/itinerary')
  }


  return (
    <AnimationRevealPage>
      <Container>
        <Card>
          <TitleText>My Itineraries</TitleText>
          <Content>
            {itineraryData.map((itinerary, i) => (
                <h6 key={i} id={i}>
                  <Button id={i} key={i} onClick={handleClick}>{itinerary.name}</Button>
                </h6>
            ))}
          </Content>
        </Card>
      </Container>
    </AnimationRevealPage>
  );
};

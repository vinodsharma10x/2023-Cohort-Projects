import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import AuthContext from "auth/auth-context.js";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import Header from "../headers/light.js";

import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../../images/design-illustration-2.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
`;

const Button = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

export default ({
  setDepartureFlightData,
  setItineraryId,
  setReturnFlightData,
  setCity,
}) => {
  const authCtx = useContext(AuthContext);
  const [itinerary, setItinerary] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setArrivalDate] = useState("");

  const navigate = useNavigate();

  function handleChange(event) {
    switch (event.target.id) {
      case "itinerary":
        setItinerary(event.target.value);
        break;
      case "origin":
        setOrigin(event.target.value);
        break;
      case "destination":
        setDestination(event.target.value);
        break;
      case "departureDate":
        setDepartureDate(event.target.value);
        break;
      case "returnDate":
        setArrivalDate(event.target.value);
        break;
    }
  }

  function handleClick(e) {
    e.preventDefault();
    // send request to API/backend to create itinerary, currently not working, needs user id
    fetch("http://localhost:8000/api/v1/itineraries/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + authCtx.token,
      },
      body: JSON.stringify({
        name: itinerary,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setItineraryId(data);
      });

    fetch("http://localhost:8000/api/v1/ext/flights/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + authCtx.token,
      },
      body: JSON.stringify({
        origin: origin,
        destination: destination,
        departure_date: departureDate,
        return_date: returnDate,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setDepartureFlightData(
          data.data.departure_flight_plans.filter((el) => el.length === 1)
        );
        setReturnFlightData(
          data.data.return_flight_plans.filter((el) => el.length === 1)
        );
        setCity(data.data.departure_flight_plans[0][0].city);
        console.log(JSON.stringify(data.data.departure_flight_plans[0][0]));
      });

    navigate("/flightsDepartures");
  }

  return (
    <>
      <Header />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              Oh, the places <span tw="text-primary-500">you'll go...</span>
            </Heading>

            <Actions>
              <Paragraph>Give your itinerary a name!</Paragraph>
              <input
                type="text"
                placeholder="My Great Travel Plan"
                id="itinerary"
                onChange={handleChange}
              />
              <Paragraph>Search for your airport here:</Paragraph>
              <input
                type="text"
                placeholder="Where are you flying out of?"
                id="origin"
                onChange={handleChange}
              />
              <Paragraph>
                Search for your dream location's airport here:
              </Paragraph>
              <input
                type="text"
                placeholder="Where are you headed?"
                id="destination"
                onChange={handleChange}
              />
              <Paragraph>Departure Date:</Paragraph>
              <input type="date" id="departureDate" onChange={handleChange} />
              <Paragraph>Return Date:</Paragraph>
              <input type="date" id="returnDate" onChange={handleChange} />
            </Actions>
            <Button>
              <button onClick={handleClick}>
                {/* <Link to="/flightsDepartures"> */}
                Search
                {/* </Link> */}
              </button>
            </Button>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img
                tw="min-w-0 w-full max-w-lg xl:max-w-3xl"
                src={DesignIllustration}
                alt="Design Illustration"
              />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
        <div id="search-results"></div>
      </Container>
    </>
  );
};

import React, { useState, useEffect, useContext } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import AuthContext from "auth/auth-context.js";
import tw from "twin.macro";

const TitleText = tw.h1`font-bold text-xl text-white bg-primary-900 p-8`
const AttractionText = tw.h6`py-2`
const Container = tw.div`m-auto w-screen p-16 h-screen`
const Card = tw.div`w-1/2 m-auto text-center shadow-xl overflow-auto rounded`
const Content = tw.div`p-4`
const DoneButton = tw.button`bg-primary-900 px-4 py-2 rounded text-white mt-2`

export default ({ city, itineraryId }) => {
  const authCtx = useContext(AuthContext);
  const [attractionData, setAttractionData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/ext/attractions/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + authCtx.token,
      },
      body: JSON.stringify({
        "city": city,
        "itineraryId": itineraryId
      }),
    })
    .then(data => data.json())
    .then(data => {
      setAttractionData(data.data.features)
    })
  }, [])
  

  return (
    <AnimationRevealPage>
    <Container>
    <Card>

      <TitleText>Attractions Around Your Destination!</TitleText>
      <Content>

      {
        attractionData.length === 0 ?
        <div>Loading Attractions...</div> :
        attractionData.slice(0, 10).map((el, i) => {
          return (
            <div key={i}>
            <AttractionText>{el.properties.name}</AttractionText>
            </div>
          )
          
        })
        
      }
      <DoneButton>Done</DoneButton>
      </Content>
      </Card>
      </Container>
    </AnimationRevealPage>
  )
};

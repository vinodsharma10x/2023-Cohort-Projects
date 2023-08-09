import React, { useState, useEffect, useContext } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import AuthContext from "auth/auth-context.js";

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
      <h1>Attractions Around Your Destination!</h1>
      {
        attractionData.length === 0 ?
        <div>Loading Attractions...</div> :
        attractionData.slice(0, 5).map((el, i) => {
          return (
            <div key={i}>
              {el.properties.name}
            </div>
          )
          
        })
      }
    </AnimationRevealPage>
  )
};

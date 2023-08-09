import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Hero from "components/hero/TwoColumnWithInput";

export default ({ setDepartureFlightData, setReturnFlightData, setCity, setItineraryId }) => {
  return (
    <AnimationRevealPage>
      <Hero setDepartureFlightData={setDepartureFlightData} setReturnFlightData={setReturnFlightData} setCity={setCity} setItineraryId={setItineraryId}/>
    </AnimationRevealPage>
  );
};

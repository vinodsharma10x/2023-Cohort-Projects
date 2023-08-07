import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Hero from "components/hero/TwoColumnWithInput";

export default ({ setDepartureFlightData }) => {
  return (
    <AnimationRevealPage>
      <Hero setDepartureFlightData={setDepartureFlightData}/>
    </AnimationRevealPage>
  );
};

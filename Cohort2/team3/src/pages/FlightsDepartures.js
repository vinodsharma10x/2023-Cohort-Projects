import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

export default ({ departureFlightData }) => {
  console.log(departureFlightData);
  return (
    <AnimationRevealPage>
      <div>Data should be shown here</div>
      {departureFlightData.map(el => <div>{el[0].origin_airport_code}</div>)}
    </AnimationRevealPage>
  );
};

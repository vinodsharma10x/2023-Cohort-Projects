import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import DataGrid from "components/DataGrid";

export default ({ departureFlightData, itineraryId }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    departureFlightData.length === 0 ? setIsLoading(true) : setIsLoading(false);
  }, [departureFlightData])

  return (
    <AnimationRevealPage>

      {
        isLoading ? 
        <div>Loading data...</div> : 
        <DataGrid departureFlightData={departureFlightData} itineraryId={itineraryId}/>
      }
    </AnimationRevealPage>
  );
};

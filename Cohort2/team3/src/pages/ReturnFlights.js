import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import DataGrid2 from "components/DataGrid2";

export default ({ returnFlightData, itineraryId, setItineraryId }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    returnFlightData.length === 0 ? setIsLoading(true) : setIsLoading(false);
  }, [returnFlightData])

  return (
    <AnimationRevealPage>

      {
        isLoading ? 
        <div>Loading data...</div> : 
        <DataGrid2 returnFlightData={returnFlightData} itineraryId={itineraryId} setItineraryId={setItineraryId}/>
      }
    </AnimationRevealPage>
  );
};

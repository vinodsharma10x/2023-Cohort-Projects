import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import AuthContext from "auth/auth-context.js";
import tw from "twin.macro";

const TitleText = tw.h1`font-bold text-xl text-white bg-primary-900 p-8`;
const AttractionText = tw.span`py-2`;
const Container = tw.div`m-auto w-screen`;
const Content = tw.div`py-4 h-96 overflow-auto bg-gray-100`;
const Card = tw.div`w-1/2 m-auto text-center shadow-xl overflow-auto rounded py-6 bg-primary-900`;
const Grid = tw.div`grid grid-cols-4 items-center py-2 hover:bg-gray-300`;
const LeftCol = tw.div`col-span-1`;
const CenterCol = tw.div`col-span-2`;
const RightCol = tw.div`col-span-1`;
const AddButton = tw.button`bg-green-300 hover:bg-green-500 px-4 py-2 rounded text-white mt-2`;
const RemoveButton = tw.button`bg-red-300 hover:bg-red-500 px-4 py-2 rounded text-white mt-2`;
const DoneButton = tw.button`bg-white hover:bg-primary-500 hover:text-white rounded text-black mt-4 px-4 py-2`;

export default ({ city, itineraryId }) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [attractionData, setAttractionData] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState([]);

  const addAttraction = (e) => {
    let attraction = attractionData[e.target.id];
    setSelectedAttractions([...selectedAttractions, attraction]);
  };

  const removeAttraction = (e) => {
    let attractionId = attractionData[e.target.id].id;
    let attractionToRemove = selectedAttractions.filter(
      (attraction) => attraction.id == attractionId
    )[0];
    let newAttractions = selectedAttractions.filter(
      (att) => att.id !== attractionToRemove.id
    );
    setSelectedAttractions(newAttractions);
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/ext/attractions/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + authCtx.token,
      },
      body: JSON.stringify({
        city: city,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setAttractionData(
          data.data.features.filter(
            (attraction) => attraction.properties.name.length > 0
          )
        );
      });
  }, []);

  const handleSubmit = () => {
    console.log(itineraryId);
    let attractionsToSubmit = selectedAttractions.map((attraction) => ({
      name: attraction.properties.name,
      itinerary: itineraryId.id
    }));
    console.log(attractionsToSubmit);
    fetch("http://localhost:8000/api/v1/attractions/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + authCtx.token,
      },
      body: JSON.stringify(attractionsToSubmit),
    }).then((data) => data.json());

    navigate('/itinerary')
  };

  return (
    <AnimationRevealPage>
      <Container>
        <Card>
          <TitleText>Attractions Around Your Destination!</TitleText>
          <Content>
            {attractionData.length === 0 ? (
              <div>Loading Attractions...</div>
            ) : (
              attractionData.slice(0, 10).map((el, i) => {
                return (
                  <Grid>
                    <LeftCol></LeftCol>
                    <CenterCol>
                      <div key={i}>
                        <AttractionText>{el.properties.name}</AttractionText>
                      </div>
                    </CenterCol>

                    <RightCol>
                      {selectedAttractions.includes(el) ? (
                        <RemoveButton id={i} onClick={removeAttraction}>
                          Remove
                        </RemoveButton>
                      ) : (
                        <AddButton id={i} onClick={addAttraction}>
                          Add
                        </AddButton>
                      )}
                    </RightCol>
                  </Grid>
                );
              })
            )}
          </Content>
          <DoneButton onClick={handleSubmit}>Done</DoneButton>
        </Card>
      </Container>
    </AnimationRevealPage>
  );
};

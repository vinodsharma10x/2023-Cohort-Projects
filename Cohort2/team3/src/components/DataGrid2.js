import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import AuthContext from "auth/auth-context.js";
import tw from "twin.macro";


const SelectButton = tw.button`hover:bg-primary-500 bg-primary-900 rounded px-2 py-1 text-[#fff]`;
const Table = tw.table`m-auto table table-auto overflow-x-auto shadow-xl bg-[#fff] w-5/6`;
const TableHead = tw.thead`bg-primary-900 text-[#edf2f7]`;
const TableTitle = tw.td`text-xl text-center font-bold py-4 underline`;
const TableTitleSmall = tw.td`text-lg text-center`;
const TableData = tw.td`px-4 py-4 text-center`;
const TableRow = tw.tr`hover:bg-[#edf2f7] shadow`;

export default ({ returnFlightData, itineraryId, setItineraryId }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  function handleClick(event){
    event.preventDefault();
    console.log(itineraryId);
    const data = returnFlightData[event.target.id][0];
    fetch("http://localhost:8000/api/v1/flights/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + authCtx.token,
      },
      body: JSON.stringify({
        origin_airport_code: data.origin_airport_code,
        destination_airport_code: data.destination_airport_code,
        departure_datetime: data.departure_datetime,
        arrival_datetime: data.arrival_datetime,
        itinerary: itineraryId.id,
        airline: data.airline,
        type: 'return'
      }),
    })

    navigate("/attractions")
  }

  return (
    <AnimationRevealPage>
      <div>
        <Table>
          <TableHead>
            <tr>
              <TableTitle colSpan={5}>{itineraryId.name}</TableTitle>
            </tr>
            <tr>
              <TableTitleSmall colSpan={5}>Select your return flight</TableTitleSmall>
            </tr>
            <tr>
              <th>Date</th>
              <th>From</th>
              <th>To</th>
              <th>Airline</th>
              <th></th>
            </tr>
          </TableHead>
          <tbody>
            {returnFlightData.map((el, key) => {
              el = el[0];
              const date = new Date(el.arrival_datetime);
              return (
                <TableRow key={key}>
                  <TableData>{`${date.toLocaleString('default', { month: 'long' })} ${date.getDate()} ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`}</TableData>
                  <TableData>{el.origin_airport_code}</TableData>
                  <TableData>{el.destination_airport_code}</TableData>
                  <TableData>{el.airline}</TableData>
                  <TableData>
                    <SelectButton id={key} onClick={handleClick}>
                      Select
                    </SelectButton>
                  </TableData>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </div>
    </AnimationRevealPage>
  );
};

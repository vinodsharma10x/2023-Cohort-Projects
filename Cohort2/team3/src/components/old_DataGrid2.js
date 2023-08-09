// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from 'react-router-dom';
// import AnimationRevealPage from "helpers/AnimationRevealPage.js";
// import AuthContext from "auth/auth-context.js";

// export default ({ returnFlightData, itineraryId }) => {
//   const navigate = useNavigate();
//   const authCtx = useContext(AuthContext);

//   function handleClick(event){
//     event.preventDefault();
//     const data = returnFlightData[event.target.id][0];
//     console.log(data);
//     fetch("http://localhost:8000/api/v1/flights/", {
//       method: "POST",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Token " + authCtx.token,
//       },
//       body: JSON.stringify({
//         origin_airport_code: data.origin_airport_code,
//         destination_airport_code: data.destination_airport_code,
//         departure_datetime: data.departure_datetime,
//         arrival_datetime: data.arrival_datetime,
//         itinerary: itineraryId.id,
//         airline: data.airline,
//       }),
//     });

//     navigate("/attractions")
//   }

//   return (
//     <AnimationRevealPage>
//       <div tw="grid grid-cols-1">
//         {returnFlightData.map((el, key) => {
//           el = el[0];
//           const date = new Date(el.arrival_datetime);
//           return (
//             <div key={key}>
//               <button id={key} onClick={handleClick} >
//                 {`${el.origin_airport_code} -> ${el.destination_airport_code} on ${el.airline} at ${date.getHours()}:${date.getMinutes()} on ${date.toLocaleString('default', { month: 'long' })} ${date.getDate()} ${date.getFullYear()}`}
//               </button>  
//             </div>
                      
//           )
//         })}
//       </div>
//     </AnimationRevealPage>
//   );
// };

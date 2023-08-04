import logo from "./logo.svg";
import "./App.css";
import React, { useCallback, useState, useEffect } from "react";

import { GoogleLogin } from "@react-oauth/google";

function GoogleAuth() {

  // How the auth works on the frontend:
  // It uses react-oauth/google: https://www.npmjs.com/package/@react-oauth/google

  // If the user logs in successfully through the Google button, Google will return us an access token.
  // Once this happens, the "onSuccess()" function down below will run automatically.
  // onSuccess() then calls the sendToken() function, which uses the access token we got from from google and
  // sends it to our backend endpoint /auth/dj-rest-auth/google, which then  receives the token and verifies it
  // If the token is valid, it will return a *different* token back to our frontend. 
  // This new token can be stored on the frontend (cookies or localstorage, however you want to do it) and is used for future requests.

  // Also, you don't really have to separate the "onSuccess" and "sendToken" functions like I did. 
  // You could just move the code from the sendToken function to the onSuccess function if you want. 

  const base_url = 'http://localhost:8000' //Change once deployed


  const [myToken, setMyToken] = useState(""); //just using this for my example. you probably want to store the token another way

  const sendToken = (token) => {
    console.log(token);
    fetch(`${base_url}/auth/dj-rest-auth/google/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: token }),
    }).then((res) => {
      console.log('response from sendToken:')
      console.log(res);
      const data = res.json();
      return data;
    }).then((data)=>{
      //Data returned, which should have the key:
      console.log(data);
      console.log(data.key); //This is the key you will store and use in future requests to the backend
      setMyToken(data.key);
    });
  };

  //google client id for our app.
  const clientId =
    "32101593679-er9qgunfqs07mml1sn113kch610knpah.apps.googleusercontent.com";

  const onSuccess = (res) => {
    console.log("success");
    console.log(res);
    console.log("sending access token to backend");
    sendToken(res.credential);
  };

  const onFailure = () => {
    // This runs if the google authentication fails. You can decide what to do here.
    // Probably just redirect back to login screen or something
    console.log("Authentication failed");
  };

  //example for how to send the token in the requests
  const sampleRequest = () => {
    const token = myToken; // access the token however you chose to store it
    fetch(`${base_url}/some/endpoint/that/requires/authentication`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    });
  };

  return (
    <div className="GoogleAuth">

      {/* This is the button you can put on the login page*/}
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default GoogleAuth;

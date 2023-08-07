import logo from "./logo.svg";
import "./App.css";
import React, { useCallback, useState, useEffect } from "react";

import { GoogleLogin } from "@react-oauth/google";

function GoogleAuth() {

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

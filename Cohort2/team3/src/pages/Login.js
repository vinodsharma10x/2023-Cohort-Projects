import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.svg";
// import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import { GoogleLogin } from "@react-oauth/google";

const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
// const LogoLink = tw.a``;
// const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;

const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const base_url = "http://localhost:8000"; //Change once deployed

const [myToken, setMyToken]

const sendToken = (token) => {
  console.log(token);
  fetch(`${base_url}/auth/dj-rest-auth/google/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access_token: token }),
  })
    .then((res) => {
      console.log("response from sendToken:");
      console.log(res);
      const data = res.json();
      return data;
    })
    .then((data) => {
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

export default ({
  logoLinkUrl = "#",
  illustrationImageSrc = illustration,
  headingText = "Sign In To Trip Sage",
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign In With Google",
      url: "https://google.com",
    },
  ],
  signupUrl = "/signup",
}) => (
  <AnimationRevealPage>
    <Container>
      <Content>
        <MainContainer>
          {/* <LogoLink href={logoLinkUrl}>
            <LogoImage src={logo} />
          </LogoLink> */}
          <MainContent>
            <Heading>{headingText}</Heading>
            <FormContainer>
              <SocialButtonsContainer>
                {socialButtons.map((socialButton, index) => (
                  <GoogleLogin
                    clientId={clientId}
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    isSignedIn={true}
                    cookiePolicy={"single_host_origin"}
                  />
                ))}
              </SocialButtonsContainer>
              <DividerTextContainer></DividerTextContainer>
              <p tw="mt-8 text-sm text-gray-600 text-center">
                Dont have an account?{" "}
                <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                  Sign Up
                </a>
              </p>
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationImageSrc} />
        </IllustrationContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
);

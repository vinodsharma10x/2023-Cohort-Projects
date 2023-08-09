import React, {useContext} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";

import illustration from "images/signup-illustration.svg";
// import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import { GoogleLogin } from "@react-oauth/google";
import AuthContext from "auth/auth-context";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const clientId = "32101593679-er9qgunfqs07mml1sn113kch610knpah.apps.googleusercontent.com";
  const onSuccess = (res) => {
    sendToken(res.credential);
  };
  
  const onFailure = () => {
    console.log("Authentication failed");
  };

  const sendToken = (token) => {
    fetch(`${authCtx.base_url}/auth/dj-rest-auth/google/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: token }),
    })
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        authCtx.login("1", data.key)
        
      });
  };

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

  const Form = tw.form`mx-auto max-w-xs`;

  const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
  const IllustrationImage = styled.div`
    ${(props) => `background-image: url("${props.imageSrc}");`}
    ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
  `;

  const logoLinkUrl = "#"
  const illustrationImageSrc = illustration
  const headingText = "Sign In To Trip Sage"
  const socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign In With Google",
      url: "https://google.com",
    },
  ]
  return (
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
              <GoogleLogin
                      clientId={clientId}
                      buttonText="Login"
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      isSignedIn={true}
                      cookiePolicy={"single_host_origin"}
                    />
              </SocialButtonsContainer>
              <DividerTextContainer></DividerTextContainer>
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationImageSrc} />
        </IllustrationContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
  )
}
export default Login;
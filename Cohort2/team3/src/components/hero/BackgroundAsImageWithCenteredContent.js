import React, { useContext } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import Header, {
  NavLink,
  NavLinks,
  PrimaryLink as PrimaryLinkBase,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
} from "../headers/light.js";

import AuthContext from "auth/auth-context.js";

const Hero = () => {
  const authCtx = useContext(AuthContext);
  const StyledHeader = styled(Header)`
    ${tw`pt-8 max-w-none w-full`}
    ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
      ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
    }
    ${NavToggle}.closed {
      ${tw`text-gray-100 hover:text-primary-500`}
    }
  `;

  const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`;
  const Container = styled.div`
    ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
    background-image: url("https://cdn.pixabay.com/photo/2017/09/04/16/58/passport-2714675_1280.jpg");
  `;

  const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

  const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
  const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

  const Heading = styled.h1`
    ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
    span {
      ${tw`inline-block mt-2`}
    }
  `;

  const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

  const signOut = () => {
    fetch(`${authCtx.base_url}/auth/dj-rest-auth/logout/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + authCtx.token,
      },
    }).then(authCtx.logout());
  };

  const navLinks = [
    <NavLinks key={1}>
      {authCtx.isLoggedIn ? (
        <NavLink onClick={signOut}>Sign Out</NavLink>
      ) : (
        <NavLink href={`${authCtx.homepage_url}/login`}>Login</NavLink>
      )}
    </NavLinks>,
  ];

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
        <Content>
          <Heading>
            Plan your trip
            <br />
            anywhere around the world
          </Heading>

          <a href="/search">
            <PrimaryAction>Create New Travel Plan</PrimaryAction>
          </a>

          {/* does not work right now */}
          <a href="/plans">
            <PrimaryAction>View Past Plans</PrimaryAction>
          </a>
        </Content>
      </HeroContainer>
    </Container>
  );
};

export default Hero;

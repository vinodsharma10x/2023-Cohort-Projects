import React from "react";
import { useParams } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import LandingPage from "pages/Home.js";

import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import AboutUsPage from "pages/AboutUs.js";

import BackgroundAsImageWithCenteredContentHero from "components/hero/BackgroundAsImageWithCenteredContent.js";

import ProfileThreeColGridCards from "components/cards/ProfileThreeColGrid.js";

import MiniCenteredFooter from "components/footers/MiniCenteredFooter.js";

export const components = {
  landingPages: {
    HotelTravelLandingPage: {
      component: LandingPage,

      url: "pages/LandingPage",
    },
  },

  innerPages: {
    LoginPage: {
      component: LoginPage,

      scrollAnimationDisabled: true,
      url: "/components/innerPages/LoginPage",
    },
    SignupPage: {
      component: SignupPage,
      url: `/components/innerPages/SignupPage`,

      scrollAnimationDisabled: true,
    },
    AboutUsPage: {
      component: AboutUsPage,
      url: `/components/innerPages/AboutUsPage`,
    },
  },

  blocks: {
    Hero: {
      type: "Hero Section",
      elements: {
        BackgroundAsImageWithCenteredContent: {
          name: "Full Width Background Image with centered content",
          component: BackgroundAsImageWithCenteredContentHero,
          url: "/components/blocks/Hero/BackgroundAsImageWithCenteredContent",
        },
      },
    },

    Cards: {
      type: "Cards",
      elements: {
        ProfileThreeColGrid: {
          name: "Three Column Grid Cards For Profile",
          component: ProfileThreeColGridCards,
          url: "/components/blocks/Cards/ProfileThreeColGrid",
        },
      },
    },

    Footer: {
      type: "Footers Section",
      elements: {
        MiniCentered: {
          name: "Mini Centered Dark",
          component: MiniCenteredFooter,
          url: "/components/blocks/Footer/MiniCentered",
        },
      },
    },
  },
};

export default () => {
  const { type, subtype, name } = useParams();

  try {
    let Component = null;
    if (type === "blocks" && subtype) {
      Component = components[type][subtype]["elements"][name].component;
      return (
        <AnimationRevealPage disabled>
          <Component />
        </AnimationRevealPage>
      );
    } else Component = components[type][name].component;

    if (Component) return <Component />;

    throw new Error("Component Not Found");
  } catch (e) {
    console.log(e);
    return <div>Error: Component Not Found</div>;
  }
};

import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import Header from "components/headers/light.js";
import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default () => {
  return (
    <AnimationRevealPage>
      <Header />

      <TeamCardGrid subheading={<Subheading>Our Team</Subheading>} />
    </AnimationRevealPage>
  );
};

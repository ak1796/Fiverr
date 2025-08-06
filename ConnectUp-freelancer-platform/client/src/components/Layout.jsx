import React from "react";
import MainBanner from "../components/MainBanner";
import WhyChose from "../components/WhyChose";
import GetStarted from "../components/GetStarted";
import SuccessStories from "./SuccessStories";

const Layout = () => {
  return (
    <>
      <MainBanner />
      <SuccessStories />
      <WhyChose />
      <GetStarted />
    </>
  );
};

export default Layout;

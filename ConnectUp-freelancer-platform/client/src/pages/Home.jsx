import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import SuccessStories from "../components/SuccessStories";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { fetchAllGigs, getUser } = useAppContext();

  useEffect(() => {
    fetchAllGigs();
    getUser();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="mx-30 my-5">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Home;

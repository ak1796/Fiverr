import React, { useEffect } from "react";
import Slidebar from "./Slidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Navbar from "../../components/Navbar";

const Freelancer = () => {
  const { getUser, user } = useAppContext();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user?.role == "freelancer" && (
        <div className="w-full flex p-5">
          <Slidebar user={user} />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Freelancer;

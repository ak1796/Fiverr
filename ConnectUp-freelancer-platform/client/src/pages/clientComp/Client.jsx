import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAppContext } from "../../context/AppContext";
import Slidebar from "./Slidebar";
import { Outlet } from "react-router-dom";

const Client = () => {
  const { user, getUser } = useAppContext();

  useEffect(() => {
    getUser();
  }, []);

  return (
    user?.role == "client" && (
      <>
        <div className="w-full flex p-5">
          <Slidebar />
          <Outlet />
        </div>
      </>
    )
  );
};

export default Client;

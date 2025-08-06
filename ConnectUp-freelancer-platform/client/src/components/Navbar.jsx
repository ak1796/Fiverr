import React, { useEffect } from "react";
import { assest } from "../assets/assests";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const Navbar = () => {
  const links = [
    // { title: "Find Talent", link: "" },
    { title: "Home", link: "/" },
    { title: "Services", link: "/services" },
    { title: "Why ConnectUp", link: "/why-connect" },
  ];
  const { navigate } = useAppContext();

  const { user, getUser, logout } = useAppContext();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="text-black py-4 px-15 ">
        <div className="max-full flex items-center justify-between">
          {/* Logo & Title */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer  gap-1"
          >
            <img
              src={assest.logo}
              alt="logo"
              className="w-13 h-13  rounded-full"
            />
            <h2 className="text-black text-xl font-bold">ConnectUp</h2>
          </div>

          {/* Nav Links & Buttons */}
          <div className="flex items-center gap-8">
            <div className="flex gap-6 text-black font-medium">
              {links.map((link, idx) => (
                <NavLink key={idx} to={link.link} className="hover:underline">
                  {link.title}
                </NavLink>
              ))}
            </div>
            {user?.role == "freelancer" && (
              <div className="flex gap-6 text-black font-medium">
                <NavLink to={"/freelancer"} className="hover:underline">
                  Dashboard
                </NavLink>
              </div>
            )}
            {user?.role == "client" && (
              <div className="flex gap-6 text-black font-medium">
                <NavLink to={"/client"} className="hover:underline">
                  Dashboard
                </NavLink>
              </div>
            )}
            <div className="flex gap-3">
              {!user && (
                <>
                  <button
                    onClick={() => navigate("/signUp")}
                    className="text-white bg-[#007AFF] px-4 py-2 rounded-md hover:bg-[#007bffe8] cursor-pointer"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className=" bg-[#E5EDF5] border border-white text-black px-4 py-2 rounded-md hover:bg-[#d0dbe6] hover:text-black cursor-pointer"
                  >
                    Log In
                  </button>
                </>
              )}
              {user && (
                <button
                  onClick={logout}
                  className=" bg-[#E5EDF5] border border-white text-black px-4 py-2 rounded-md hover:bg-[#d0dbe6] hover:text-black cursor-pointer"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="text-gray-400" />
    </>
  );
};

export default Navbar;

import React from "react";
import { assest } from "../assets/assests";
import { useAppContext } from "../context/AppContext";

const MainBanner = () => {
  const { navigate } = useAppContext();
  return (
    <div className="w-full flex  justify-center h-[80vh] relative overflow-hidden mt-10 rounded-xl">
      <img
        src={assest.background_img}
        alt="ConnectUp Banner"
        className="w-full object-cover"
      />
      <div className="absolute inset-0  flex flex-col flex-wrap items-center justify-center">
        <h1 className="text-black text-4xl md:text-5xl font-extrabold">
          Find the perfect freelance talent for your needs{" "}
        </h1>
        <p className="text-white text-xl  font-light">
          Connect with top-rated freelancers across various fields, from web
          development to graphic design, and bring your projects to life.
        </p>
        <div className="flex justify-center items-center mt-10 ">
          <button
            onClick={() => navigate("/services")}
            className="bg-[#007AFF] px-4 py-3 text-2xl hover:bg-[#007bffda] cursor-pointer rounded-xl text-white"
          >
            Get Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;

import React from "react";
import { useAppContext } from "../context/AppContext";

const GetStarted = () => {
  const { navigate } = useAppContext();

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 mb-10 px-8 py-12 border border-[#4570A1] rounded-2xl shadow-md bg-white">
      <div className="flex flex-col justify-center items-center text-center space-y-6">
        <h1 className="text-black text-4xl md:text-5xl font-extrabold leading-tight">
          Ready to get started?
        </h1>
        <p className="text-gray-700 text-base md:text-lg">
          Join <span className="text-[#4570A1] font-semibold">ConnectUp</span>{" "}
          today and experience the future of freelancing.
        </p>
        <button
          onClick={() => navigate("/signUp")}
          className="bg-[#007AFF] cursor-pointer hover:bg-[#006FE6] text-white text-sm md:text-base font-medium px-6 py-3 rounded-full transition duration-300 ease-in-out"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default GetStarted;

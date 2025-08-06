import React, { useEffect, useState } from "react";
import AllGigs from "./AllGigs";
import { useAppContext } from "../../context/AppContext";
import { IoSearchSharp } from "react-icons/io5";

const Gigs = () => {
  const {
    fetchFreelancersGig,
    freelancerGigs,
    fetchFreelancersGigToShow,
    freelancerGigsToShow,
    setSelectedFreelancerGig,
  } = useAppContext();

  const { navigate } = useAppContext();
  const [search, setSearch] = useState("");
 

  const filterFreelancerGigToShow =
    search?.length > 0
      ? freelancerGigsToShow.filter((gig) =>
          gig?.title?.toLowerCase().includes(search.toLowerCase())
        )
      : freelancerGigsToShow;

  useEffect(() => {
    fetchFreelancersGig();
    fetchFreelancersGigToShow();
  }, []);

  return (
    <div className="w-full m-10">
      <div className="w-full  flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Gigs</h1>
        <div className="flex justify-center items-center  ">
          <div className="w-full max-w-xl px-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search anything..."
                className="w-full px-5 py-3 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <IoSearchSharp className="absolute text-3xl bottom-3 left-50" />
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/freelancer/create-gig")}
          className=" p-3 border border-[#456EA1] text-[#456EA1] hover:bg-blue-100 hover:border-transparent cursor-pointer"
        >
          Create Gig
        </button>
      </div>
      <div className="mt-10 gap-5 grid grid-cols-3">
        {filterFreelancerGigToShow.map((gig, idx) => (
          <div
            key={idx}
            className="bg-[#F8FAFC] p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            <img
              src={gig?.image}
              alt={gig?.title}
              className="w-full h-44 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-[#34495e] mb-2">
              {gig?.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {gig?.description}
            </p>
            <button
              onClick={() => {
                navigate(`/freelancer/details/${gig?._id}`);
                setSelectedFreelancerGig(gig);
              }}
              className="mt-auto w-1/2 cursor-pointer bg-[#007AFF] text-white py-2 px-4 rounded-lg hover:bg-[#006ae6] transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-bold">Active Gigs</h2>
        <AllGigs search={search} setSearch={setSearch} show={"yes"} />
      </div>
    </div>
  );
};

export default Gigs;

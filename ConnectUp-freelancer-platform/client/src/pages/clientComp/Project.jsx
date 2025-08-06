import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const Project = () => {
  const { fetchClientGig, clientGigs, navigate, setSelectedClientGig } =
    useAppContext();
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    fetchClientGig();
  }, []);

  useEffect(() => {
    const gig = clientGigs.map((indiGig) => indiGig.gig);
    setGigs(gig);
  }, [clientGigs]);

  return (
    <div className="p-10 w-full bg-white rounded-lg shadow-sm m-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Project</h1>
        <p className="text-gray-600">See the projects that will UpSkills you</p>
      </div>

      <div className="grid grid-cols-3">
        {gigs.map((gig, idx) => (
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
              {gig.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {gig.description}
            </p>
            <button
              onClick={() => {
                navigate(`/client/details/${gig?._id}`);
                setSelectedClientGig(gig);
              }}
              className="mt-auto bg-[#007AFF] text-white py-2 px-4 rounded-lg hover:bg-[#006ae6] transition"
            >
              Details
            </button>
          </div>
        ))}
      </div>

      {gigs.length === 0 && (
        <div className="w-full flex text-blue-400 text-2xl text-center mt-10 flex-col justify-between">
          No Projects
        </div>
      )}
    </div>
  );
};

export default Project;

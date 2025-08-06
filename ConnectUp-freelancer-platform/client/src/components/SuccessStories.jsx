import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const SuccessStories = () => {
  const { gigs, fetchAllGigs } = useAppContext();

  useEffect(() => {
    if (!gigs.length) {
      fetchAllGigs();
    }
  }, []);

  return (
    <div className="py-20 px-6 ">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2c3e50] mb-6">
          ✨ Success Stories That Inspire
        </h2>
        <p className="text-gray-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
          Real experiences from clients and freelancers who’ve found success on ConnectUp. From dream projects to lasting collaborations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {gigs.map((gig, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={gig?.image}
                alt={gig?.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-[#34495e]">{gig?.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {gig?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
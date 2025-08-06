import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Details = () => {
  const { id } = useParams();
  const { fetchSingleGig, singleGig, navigate } = useAppContext();
  const [gigData, setGigData] = useState(null);

  useEffect(() => {
    fetchSingleGig(id);
  }, [id]);

  useEffect(() => {
    setGigData(singleGig);
  }, [singleGig]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-[#4570A1] mb-4">Gig Details</h1>
      {gigData ? (
        <div className="bg-gradient-to-tr from-[#F2F8FD] to-white p-10 rounded-xl shadow-2xl border border-[#E3E8F0] max-w-4xl mx-auto mt-10">
          <h2 className="text-4xl font-bold text-[#1F3A5F] mb-6 underline underline-offset-4 decoration-[#4570A1]">
            {gigData?.title}
          </h2>

          <p className="text-lg text-[#475569] mb-8 leading-relaxed tracking-wide">
            {gigData?.description}
          </p>

          <div className="grid grid-cols-2 gap-6 text-[16px] text-[#334155]">
            <div className="bg-[#F0F4F8] p-5 rounded-lg shadow-sm">
              <p className="font-semibold">Status</p>
              <p className="text-[#4570A1] mt-1">
                {gigData?.inProgress ? "InProgress" : "Completed"}
              </p>
            </div>

            <div className="bg-[#F0F4F8] p-5 rounded-lg shadow-sm">
              <p className="font-semibold">Freelancer</p>
              <p className="text-[#4570A1] mt-1">
                {gigData?.createdBy?.name || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="mt-10 flex justify-end">
              <button
                onClick={() => navigate("/client/review")}
                className="px-6 py-2 cursor-pointer bg-[#4570A1] text-white rounded-full hover:bg-[#365a7e] transition duration-300"
              >
                Review
              </button>
            </div>
            <div className="mt-10 flex justify-end">
              <button onClick={()=>navigate('/client/messages')} className="px-6 py-2 bg-[#4570A1] text-white rounded-full hover:bg-[#365a7e] transition duration-300">
                Message Freelancer
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading gig details...</p>
      )}
    </div>
  );
};

export default Details;

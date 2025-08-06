import React from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ViewDetails = () => {
  const { selectedFreelancerGig, setSelectedFreelancerGig, navigate, axios } =
    useAppContext();


  const deleteGig = async () => {
    try {
      const { data } = await axios.delete(
        `/api/gig/delete/${selectedFreelancerGig?._id}`
      );
      if (data.success) {
        toast.success(data.message);
        navigate('/freelancer/all-gigs')
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mx-20 h-1/2  w-full px-6 py-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg mt-10 border border-gray-200">
      <h2 className="text-3xl font-semibold text-slate-800 mb-6 border-b pb-2">
        Gig Details
      </h2>

      {selectedFreelancerGig ? (
        <div className="space-y-4 w-full text-slate-700">
          <div className="flex items-center gap-10">
            <span className="font-medium text-slate-500">Title</span>
            <span className="text-lg font-semibold">
              {selectedFreelancerGig.title}
            </span>
          </div>
          <div className="flex items-center gap-10">
            <span className="font-medium text-slate-500">Description:</span>
            <span className="text-base">
              {selectedFreelancerGig.description}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="font-medium text-slate-500">Price</span>
            <span className="text-lg font-bold text-green-500">
              ₹{selectedFreelancerGig.price}
            </span>
          </div>
          {/* Add more structured fields here as needed */}
          <div className="flex justify-between">
            <button
              onClick={() => {
                navigate(`/freelancer/review/${selectedFreelancerGig?._id}`);
              }}
              className="px-6 py-2  cursor-pointer bg-[#4570A1] text-white rounded-full hover:bg-[#365a7e] transition duration-300"
            >
              View Review
            </button>

            <div className="flex gap-5">
              <button
                onClick={() => {
                  navigate("/freelancer/update-gig");
                  setSelectedFreelancerGig(selectedFreelancerGig);
                }}
                className="px-6 py-2  cursor-pointer bg-[#4570A1] text-white rounded-full hover:bg-[#365a7e] transition duration-300"
              >
                Update Gig
              </button>

              <button
                onClick={deleteGig}
                className="px-6 py-2  cursor-pointer bg-[#4570A1] text-white rounded-full hover:bg-[#365a7e] transition duration-300"
              >
                Delete Gig
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-slate-400 italic">
          No gig selected yet — pick one to view details!
        </p>
      )}
    </div>
  );
};

export default ViewDetails;

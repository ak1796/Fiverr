import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const IndividualGig = () => {
  const {
    freelancerGigs,
    fetchFreelancersGig,
    navigate,
    axios,
    setSelectedFreelancerGig,
    selectedFreelancerGig,
  } = useAppContext();
  const { id } = useParams();

 

  const markAsCompleted = async () => {
    try {
      const { data } = await axios.post(
        `/api/gig/completed/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/freelancer/all-gigs");
      }
  
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFreelancersGig();
  }, []);

  const gig = freelancerGigs.find((gig) => gig?.gig._id === id);

  if (!gig) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading gig details...
      </div>
    );
  }

  return (
    <div className="w-full h-1/2  mx-20 p-6 bg-[#DBEAFE] shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold  mb-4">{gig?.gig.title}</h1>
      <p className="text-gray-700 mb-6">{gig?.gig.description}</p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-500">Category</p>
          <p className="text-md text-gray-800">{gig?.gig.category}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-500">Rate</p>
          <p className="text-md text-gray-800">₹{gig?.gig.price}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-500">Delivery Time</p>
          <p className="text-md text-gray-800">
            {gig?.gig.deliveryTime} months
          </p>
        </div>
      </div>

      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer transition mr-5"
        onClick={() => {
          navigate("/freelancer/all-gigs");
          setSelectedFreelancerGig(null);
        }}
      >
        Back to All Gigs
      </button>
      {gig?.gig.inProgress && (
        <button
          className="mt-4 px-6 py-2 bg-green-400 text-white rounded hover:bg-green-500 cursor-pointer transition"
          onClick={markAsCompleted}
        >
          Marked Completed
        </button>
      )}
    </div>
  );
};

export default IndividualGig;

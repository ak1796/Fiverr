import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { FaArrowLeft } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { assest } from "../../assets/assests";

const AllReview = () => {
  const {
    selectedFreelancerGig,
    fetchReview,
    reviews,
    navigate,
    setSelectedFreelancerGig,
  } = useAppContext();
  const { id } = useParams();

  useEffect(() => {
    fetchReview(id);
  }, []);

  return (
    selectedFreelancerGig && (
      <div className="w-full  mx-20 px-4 py-8 space-y-8">
        {/* Gig Overview */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-6">
          <FaArrowLeft
            onClick={() => {
              setSelectedFreelancerGig(null);
              navigate("/freelancer/all-gigs");
            }}
            className="text-2xl self-start cursor-pointer"
          />
          <img
            src={selectedFreelancerGig?.image}
            alt="Gig"
            className="w-full md:w-1/3 h-auto rounded-lg object-cover"
          />
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-semibold text-gray-800">
              {selectedFreelancerGig?.title}
            </h1>
            <p className="text-gray-600">
              {selectedFreelancerGig?.description}
            </p>
            <p className="text-sm text-gray-500">
              Delivery Time: {selectedFreelancerGig?.deliveryTime}
            </p>
            <p className="text-lg font-bold text-green-600">
              ₹{selectedFreelancerGig?.price}
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          {reviews
            ?.filter(
              (review) => review?.gig?._id === selectedFreelancerGig?._id
            )
            .map((review, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-md p-4 flex flex-col md:flex-row items-center space-x-4"
              >
                <img
                  src={review?.client?.avatar || assest.avatar}
                  alt="Client"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div className="flex-1 space-y-1">
                  <p className="font-semibold text-gray-800">
                    {review?.client?.name}
                  </p>
                  <p className="text-gray-600">{review.comment}</p>
                  <div className="text-yellow-500 font-medium">
                    ⭐ {review.rating}
                  </div>
                </div>
              </div>
            ))}
          {reviews?.filter((r) => r?.gig?._id === selectedFreelancerGig?._id)
            .length === 0 && (
            <p className="text-center text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    )
  );
};

export default AllReview;

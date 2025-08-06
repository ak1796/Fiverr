import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Review = () => {
  const { axios, navigate, setLoading, selectedClientGig } = useAppContext();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading();
      const { data } = await axios.post(
        `/api/review/create/${selectedClientGig?._id}`,
        {
          rating,
          comment,
        }
      );
     
      if (data.success) {
        toast.success(data.message);
        navigate("/client/projects");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    selectedClientGig && (
      <form
        onSubmit={handleSubmit}
        className="mx-50 w-full h-1/2 mt-10 p-6 bg-white shadow-lg rounded-md border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Write a Review
        </h2>

        {/* Rating Selector */}
        <div className="flex items-center mb-4 space-x-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setRating(num)}
              className={`w-8 h-8 rounded-full ${
                rating >= num ? "bg-yellow-400" : "bg-gray-300"
              } hover:bg-yellow-300`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Comment Input */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="w-full p-3 mb-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Submit Review
        </button>
      </form>
    )
  );
};

export default Review;

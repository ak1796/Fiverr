import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const PlaceOrders = () => {
  const { selectedClientGig, axios, navigate, setLoading } = useAppContext();

  const [title, setTitle] = useState(selectedClientGig?.title || "");
  const [price, setPrice] = useState(selectedClientGig?.price || "");
  const [freelancerName, setFreelancerName] = useState(
    selectedClientGig?.createdBy?.name || ""
  );
  const [descriptions, setDiscriptions] = useState(
    selectedClientGig?.description || 0
  );
  const [deliveryTime, setDeliveryTime] = useState(
    selectedClientGig?.deliveryTime || 0
  );

  const submitOrder = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(false);
      const { data } = await axios.post("/api/orders/place-order", {
        gigId: selectedClientGig?._id,
        freelancerId: selectedClientGig?.createdBy?._id,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/client/orders");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-white w-full">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-[#2c3e50] text-center mb-6">
          Place Your Order
        </h2>
        <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto font-light">
          Fill out the form below to connect with your chosen freelancer and get
          started on your project.
        </p>

        <form
          onSubmit={submitOrder}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              value={title}
              readOnly
              type="text"
              placeholder="Project Title"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4570A1]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Budget ($)
            </label>
            <input
              value={price}
              readOnly
              type="number"
              placeholder="Budget ($)"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4570A1]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Delivery Time (months)
            </label>
            <input
              readOnly
              value={deliveryTime}
              type="number"
              placeholder="Delivery Time (days)"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4570A1]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Freelancer Username
            </label>
            <input
              readOnly
              value={freelancerName}
              type="text"
              placeholder="Freelancer Username"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4570A1]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Project Description
            </label>
            <textarea
              value={descriptions}
              readOnly
              rows="5"
              placeholder="Project Description"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4570A1]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="md:col-span-2 mt-4 bg-[#007AFF] text-white py-3 px-6 rounded-lg hover:bg-[#006ae6] transition"
          >
            Submit Order
          </button>
        </form>
      </div>
    </section>
  );
};

export default PlaceOrders;

import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const FreelancerOrders = () => {
  const { freelancerOrders, fetchFreelancerOrders, axios } = useAppContext();

  const markOrderAsCompleted = async (id) => {
    try {
      const { data } = await axios.post("/api/orders/mark-completed", {
        orderId: id,
      });
   
      if (data.success) {
        toast.success(data.message);
        fetchFreelancerOrders();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const markAsFailed = async (id) => {
    try {
      const { data } = await axios.post("/api/orders/mark-failed", {
        orderId: id,
      });
     
      if (data.success) {
        toast.success(data.message);
        fetchFreelancerOrders();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFreelancerOrders();
  }, []);

  return (
    <div className="  px-6 py-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Your Orders</h2>
      {freelancerOrders?.length > 0 ? (
        freelancerOrders.map((order, index) => (
          <div
            key={index}
            className="bg-white w-1/2 shadow-md rounded-lg p-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6"
          >
            <img
              src={order?.gig?.image}
              alt="Gig"
              className="w-full md:w-32 h-32 object-cover rounded-md"
            />
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-medium text-gray-800">
                {order?.gig?.title}
              </h3>
              <p className="text-gray-600">Ordered by: {order?.client?.name}</p>
              <p className="text-sm text-gray-500">
                Status:
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs ${
                    order.status.toLowerCase() === "completed"
                      ? "bg-green-100 text-green-700"
                      : order.status.toLowerCase() === "delivered"
                      ? "bg-amber-100 text-amber-700"
                      : order.status.toLowerCase() === "inprogress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order?.status}
                </span>
              </p>
            </div>
            {order?.status == "inprogress" && (
              <div
                onClick={() => markOrderAsCompleted(order?._id)}
                className="self-end bg-green-500 px-2 py-1 rounded-xl text-white font-bold cursor-pointer"
              >
                order completed
              </div>
            )}
            {order?.status == "inprogress" && (
              <div
                onClick={() => markAsFailed(order?._id)}
                className="self-end bg-red-500 px-3 py-1 rounded-xl text-white font-bold cursor-pointer"
              >
                order failed
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No orders available yet.</p>
      )}
    </div>
  );
};

export default FreelancerOrders;

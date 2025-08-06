import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const Orders = () => {
  const headers = [
    { title: "All", to: "all" },
    { title: "InProgress", to: "inprogress" },
    { title: "Completed", to: "completed" },
    { title: "Cancelled", to: "failed" },
  ];

  const [toShow, setToShow] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { clientOrders, fetchClientOrders } = useAppContext();

  useEffect(() => {
    if (toShow === "all") {
      setFilteredOrders(clientOrders);
    } else {
      const filter = clientOrders.filter(
        (order) => order.status.toLowerCase() === toShow
      );
      setFilteredOrders(filter);
    }
  }, [toShow, clientOrders]);

  useEffect(() => {
    fetchClientOrders();
  }, []);

  return (
    <div className="p-6 sm:p-10 w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <p className="text-blue-600 mt-1">Manage your orders</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        {headers.map((header, idx) => (
          <button
            key={idx}
            onClick={() => setToShow(header.to.toLowerCase())}
            className={`px-4 py-2 rounded-md ${
              toShow === header.to.toLowerCase()
                ? "bg-blue-600 text-white"
                : "text-blue-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-900"
            } transition-colors duration-200`}
          >
            {header.title}
          </button>
        ))}
      </div>
      <hr className="border-blue-300 mb-6" />

      {/* Orders Grid or Empty State */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No orders found for this status.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="p-5 rounded-xl shadow-md border border-gray-200 bg-white"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Title:{" "}
                <span className="text-gray-500">{order?.gig?.title}</span>
              </h2>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span>{" "}
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
                  {order.status}
                </span>
              </p>
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-medium">Price:</span> ₹
                {order?.gig?.price ?? "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

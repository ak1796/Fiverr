import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import FreelancerOrders from "./FreelancerOrders";

const Earnings = ({ show }) => {
  const { fetchFreelancerOrders, freelancerOrders } = useAppContext();

  const [pendingPayment, setPendingPayment] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const totalEarning = freelancerOrders
      .filter((gig) => gig?.status == "completed")
      .reduce((acc, order) => {
        const price = order?.gig?.price || 0;
        return price + acc;
      }, 0);
    setTotalEarnings(totalEarning);

    const pending = freelancerOrders
      .filter((gig) => gig?.status == "inprogress" || gig?.status == "pending")
      .reduce((acc, order) => {
        const price = order?.gig?.price || 0;
        return price + acc;
      }, 0);
    setPendingPayment(pending);
  }, [freelancerOrders]);

  useEffect(() => {
    fetchFreelancerOrders();
  }, []);

  return (
    <div className=" bg-white p-6 rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Earnings</h1>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-[#456EA1] text-white p-4 rounded-md">
          <p className="text-sm font-medium">Pending Payments</p>
          <p className="text-lg font-semibold">₹{pendingPayment || 0}</p>
        </div>
        <div className="flex justify-between items-center bg-[#456EA1] text-white p-4 rounded-md">
          <p className="text-sm font-medium">Total Earned</p>
          <p className="text-lg font-semibold">₹{totalEarnings || 0}</p>
        </div>
      </div>

      <div className="mt-10 ">
        <FreelancerOrders />
      </div>
    </div>
  );
};

export default Earnings;

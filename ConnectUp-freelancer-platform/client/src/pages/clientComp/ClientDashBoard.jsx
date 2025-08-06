import React, { useEffect, useState } from "react";
import ClientDetailsBox from "./ClientDetailsBox";
import ActiveProjects from "./ActiveProjects";
import { useAppContext } from "../../context/AppContext";

const ClientDashBoard = () => {
  const {
    logout,
    clientOrders,
    fetchClientOrders,
    clientGigs,
    fetchClientGig,
  } = useAppContext();

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetchClientOrders();
    fetchClientGig();
  }, []);

  useEffect(() => {
    // Trigger stats calculation only after data updates
    
    const spend = clientOrders
      .filter((gig) => gig?.status == "completed")
      .reduce((acc, order) => {
        const price = order?.gig?.price || 0;
        return acc + price;
      }, 0);

    const completed = clientGigs.filter(
      (gig) => gig?.gig?.inProgress === false
    ).length;

    const active = clientGigs.filter((gig) => gig?.gig?.inProgress).length;

    setDatas([
      { title: "Active Projects", number: active },
      { title: "Total Spent", number: `₹${spend}` },
      { title: "Completed Projects", number: completed },
    ]);
  }, [clientOrders, clientGigs]);

  return (
    <div className="w-full p-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-[#456EA1] text-sm mt-1">Your client overview</p>
        </div>
        <button
          onClick={logout}
          className="bg-[#E5EDF5] border border-white text-black px-4 py-2 rounded-md hover:bg-[#d0dbe6] transition"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mt-10 w-full">
        <ClientDetailsBox datas={datas} />
      </div>

      {/* Active Projects Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Active Projects</h2>
        <ActiveProjects show="No" />
      </div>
    </div>
  );
};

export default ClientDashBoard;

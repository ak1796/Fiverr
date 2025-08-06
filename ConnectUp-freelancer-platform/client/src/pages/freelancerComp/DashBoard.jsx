import React, { useEffect, useState } from "react";
import DetailsBox from "./DetailsBox";
import AllGigs from "./AllGigs";
import Earnings from "./Earnings";
import { useAppContext } from "../../context/AppContext";

const DashBoard = () => {
  const [activeGig, setActiveGig] = useState(0);
  const [totalGig, setTotalGig] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const {
    logout,
    fetchFreelancerOrders,
    freelancerOrders,
    fetchFreelancersGig,
    freelancerGigs,
    fetchFreelancersGigToShow,
    freelancerGigsToShow,
    axios,
  } = useAppContext();

  useEffect(() => {
    const totalEarning = freelancerOrders
      .filter((gig) => gig?.status == "completed")
      .reduce((acc, order) => {
        const price = order?.gig?.price || 0;
        return price + acc;
      }, 0);

    setTotalEarnings(totalEarning);

    const activeGig = freelancerGigs
      .filter((gig) => gig?.status == "completed")
      .filter((gig) => gig?.gig?.inProgress).length;
    setActiveGig(activeGig);

    const totalGig = freelancerGigsToShow.map((gig) => gig.title).length;
    setTotalGig(totalGig);
  }, [freelancerGigs, freelancerOrders, freelancerGigsToShow]);

  const getFreelancerAvgRating = async () => {
    try {
      const { data } = await axios.get("/api/review/get-avg");
      setAverageRating(data?.data.averageRating);
      setTotalReviews(data?.data.totalReviews);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFreelancerOrders();
    fetchFreelancersGig();
    fetchFreelancersGigToShow();
    getFreelancerAvgRating();
  }, []);

  const datas = [
    { title: "Total Earnings", number: `₹${totalEarnings}` },
    { title: "Active Gigs", number: activeGig },
    { title: "Total Gigs", number: totalGig },
    { title: "Client Rating", number: `⭐${averageRating}` },
    { title: "Total Reviews", number: `${totalReviews}` },
  ];
  return (
    <div className="w-full p-5">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-[#456EA1]">Overview of your freelance activity</p>
        </div>
        <button
          onClick={logout}
          className=" bg-[#E5EDF5] border border-white text-black px-4 py-2 rounded-md hover:bg-[#d0dbe6] hover:text-black cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="mt-10">
        <DetailsBox datas={datas} />
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold">Active Gigs</h2>
        <AllGigs />
      </div>
      <div className="mt-10 w-full">
        <Earnings show={"No"} />
      </div>
    </div>
  );
};

export default DashBoard;

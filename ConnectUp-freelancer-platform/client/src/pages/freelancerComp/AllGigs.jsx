import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import GigCard from "./GigCard";

const AllGigs = ({ show, search, setSearch }) => {
  const {
    freelancerGigs,
    fetchFreelancersGig,
    selectedFreelancerGig,
    setSelectedFreelancerGig,
  } = useAppContext();

  const filterFreelancer =
    search?.length > 0
      ? freelancerGigs.filter((gig) =>
          gig?.gig.title?.toLowerCase().includes(search.toLowerCase())
        )
      : freelancerGigs;

  useEffect(() => {
    fetchFreelancersGig();
  }, []);

  return (
    <div>
      <div className="w-full   flex flex-col justify-evenly text-xl p-3 border border-[#456EA1] rounded-md mt-5">
        <div className="w-full  flex justify-evenly px-5 ">
          <h2 className=" w-1/2 ">Gig</h2>
          <h2 className=" w-1/13 ml-10">Client</h2>
          <h2 className="w-1/11 ml-30 ">DeadLine</h2>
          <h2 className="w-1/26  ml-35 ">Status</h2>
        </div>
        {freelancerGigs.length > 0 && (
          <div className="w-full flex flex-col px-5">
            {filterFreelancer.map((gig, idx) => (
              <div
                onClick={() => setSelectedFreelancerGig(gig)}
                key={idx}
                className="w-full cursor-pointer "
              >
                {gig?.status == "completed" && (
                  <GigCard gig={gig} show={show} />
                )}
              </div>
            ))}
          </div>
        )}
        {freelancerGigs.length == 0 && (
          <div className="w-full flex text-blue-400 text-2xl text-center mt-10 flex-col justify-between">
            No Active Gig
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGigs;

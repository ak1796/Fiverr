import React, { useEffect } from "react";
import GigCard from "../freelancerComp/GigCard";
import { useAppContext } from "../../context/AppContext";
import ProjectCard from "./ProjectCard";

const ActiveProjects = ({ show }) => {
  const { fetchClientGig, clientGigs, setSelectedGig } = useAppContext();

  const filterClient = clientGigs;

  useEffect(() => {
    fetchClientGig();
  }, []);

  return (
    <div>
      <div className="w-full   flex flex-col justify-between text-xl p-3 border border-[#456EA1] rounded-md mt-5">
        <div className="w-full  flex justify-evenly px-5 ">
          <h2 className=" w-1/2 ">Project</h2>
          <h2 className=" w-1/13 mr-10">Freelancer</h2>
          <h2 className="w-1/11 ml-20 ">Months</h2>
          <h2 className={`w-1/26   ${show ? "ml-20" : "ml-30"} `}>Status</h2>
          {show == "yes" && <h2 className="ml-20">Actions</h2>}
        </div>
        {clientGigs.length > 0 && (
          <div className="w-full flex flex-col px-5">
            {filterClient.map((gig, idx) => (
              <div
                onClick={() => setSelectedGig(gig)}
                key={idx}
                className="w-full cursor-pointer "
              >
                <ProjectCard gig={gig} show={"No"} />
              </div>
            ))}
          </div>
        )}
        {clientGigs.length == 0 && (
          <div className="w-full flex text-blue-400 text-2xl text-center mt-10 flex-col justify-between">
            No Projects
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveProjects;

import React from "react";
import AllGigs from "../freelancerComp/AllGigs";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

const ProjectCard = ({ gig }) => {
  return (
    <div className="w-full px-6 py-5 border rounded-xl mt-5">
      <div className="flex flex-col justify-evenly sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2
          onClick={() => navigate(`/freelancer/${gig._id}`)}
          className="text-lg w-1/2  font-semibold text-gray-800"
        >
          {gig?.gig.title}
        </h2>
        <p
          onClick={() => navigate(`/freelancer/${gig._id}`)}
          className="text-sm w-1/8  text-gray-600"
        >
          {gig?.freelancer?.name}
        </p>
        <p
          onClick={() => navigate(`/freelancer/${gig._id}`)}
          className="text-sm w-1/8  text-gray-600"
        >
          {gig?.gig.deliveryTime} months
        </p>
        <p
          onClick={() => navigate(`/freelancer/${gig._id}`)}
          className={`text-sm font-medium  px-3 py-1 rounded-md ${
            gig?.gig.inProgress
              ? "bg-yellow-400 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {gig?.gig.inProgress ? "In Progress" : "Completed"}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;

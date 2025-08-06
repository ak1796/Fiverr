import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assest } from "../../assets/assests";

const Profile = () => {
  const {
    logout,
    fetchFreelancerOrders,
    freelancerOrders,
    fetchFreelancersGig,
    freelancerGigs,
    user,
    navigate,
    axios
  } = useAppContext();

  const [totalClient, setTotalClient] = useState(0);
  const [totalGig, setTotalGig] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const uniqueClients = new Set(
      freelancerGigs.map((gig) => gig?.gig?.client)
    );

    setTotalClient(uniqueClients.size);

    const totalGig = freelancerGigs.filter((gig) => gig?.gig?.title).length;
    setTotalGig(totalGig);
  }, [freelancerGigs, freelancerOrders]);

  const getFreelancerAvgRating = async () => {
    try {
      const { data } = await axios.get("/api/review/get-avg");
      setAverageRating(data?.data.averageRating);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFreelancerOrders();
    fetchFreelancersGig();
    getFreelancerAvgRating();
  }, []);

  return (
    <div className="w-full mx-40 bg-white rounded-xl shadow-md p-6 mt-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user?.avatar || assest.avatar}
          alt={user?.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.location}</p>
          <p className="text-md text-gray-700">{user?.bio}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.skills?.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={() => navigate("/freelancer/more-info")}
          className=" w-1/7 cursor-pointer mt-5 bg-[#1787FF] text-white py-2 rounded-md hover:bg-[#1787ffe5] transition"
        >
          More Informations
        </button>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Projects</p>
          <p className="text-xl font-semibold text-gray-800">{totalGig || 0}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Clients</p>
          <p className="text-xl font-semibold text-gray-800">
            {totalClient || 0}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Ratings</p>
          <p className="text-xl font-semibold text-gray-800">
            {averageRating || 0} ★
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Experience</p>
          <p className="text-xl font-semibold text-gray-800">
            {user?.experience || 0} yrs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

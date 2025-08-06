import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assest } from "../../assets/assests";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";

const ClientProfile = () => {
  const {
    user,
    navigate,
    setLoading,
    getUser,
    axios,
    clientGigs,
    fetchClientGig,
    clientOrders,
    fetchClientOrders,
  } = useAppContext();

  const [isOpen, setIsOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [completedNo, setCompletedNo] = useState(0);
  const [activeNo, setActiveNo] = useState(0);

  useEffect(() => {
    const completed = clientGigs.filter(
      (gig) => gig?.gig?.inProgress === false
    ).length;
    setCompletedNo(completed);

    const active = clientGigs.filter((gig) => gig?.gig).length;
    setActiveNo(active);
  }, [clientGigs, clientOrders]);

  useEffect(() => {
    fetchClientOrders();
    fetchClientGig();
  }, []);

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const uplaodInfoOfFreelancer = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("bio", bio);
    formData.append("image", avatar);
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/client/add-info", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (data.success) {
        toast.success(data.message);
        getUser();
        navigate("/client/client-profile");
      }
      setAvatar(null);
      setBio("");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={` ${
          isOpen ? "blur-2xl" : ""
        } w-full mx-50 relative  px-4 bg-white rounded-xl shadow-md p-6 mt-10`}
      >
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user?.avatar || assest.avatar}
            alt={user?.name || "User Avatar"}
            aria-label="User profile picture"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />

          <div className="flex flex-col gap-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-md text-gray-700 mb-1">{user?.bio}</p>
            <p className="text-sm text-gray-500">{user?.location}</p>
            <p className="text-sm text-gray-500">
              Joined: {dayjs(user?.createdAt).format("MMM YYYY")}
            </p>
            <p className="text-sm text-gray-500">Email: {user?.email}</p>
          </div>
        </div>

        {/* Actions */}
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="w-fit mt-5 bg-[#1787FF] text-white py-2 px-6 rounded-md hover:bg-[#1787ffe5] transition"
          >
            More Information
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Projects</p>
            <p className="text-xl font-semibold text-gray-800">
              {activeNo || 0}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-xl font-semibold text-gray-800">
              {completedNo || 0}
            </p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className=" w-[800px] h-1/2 top-50 left-129 bg-[#DBEAFE] rounded-xl  absolute p-5">
          <form onSubmit={uplaodInfoOfFreelancer} encType="multipart/formdata">
            <div className="flex gap-5 justify-start items-center">
              <FaArrowLeft
                onClick={() => setIsOpen(false)}
                className="text-2xl mb-5 cursor-pointer"
              />
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-5">
                More Information
              </h2>
            </div>

            {/* Bio Input */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            {/* Avatar Upload */}
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Avatar
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700"
                onChange={handleFileChange}
              />
            </div>

            {/* Years of Experience Input */}

            <button
              type="submit"
              className="block w-1/3 text-white text-xl rounded-md cursor-pointer mx-auto mt-10 bg-blue-600 px-5 py-2"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ClientProfile;

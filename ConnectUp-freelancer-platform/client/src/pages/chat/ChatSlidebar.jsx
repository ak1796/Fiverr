import React, { useState } from "react";
import { useMessageContext } from "../../context/MessageContext";
import { IoSearch } from "react-icons/io5";
import { assest } from "../../assets/assests";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

const ChatSlidebar = () => {
  const {
    selectedUser,
    setSelectedUser,
    unseenMessage,
    setUnseenMessages,
    getUsersForFreelancer,
    usersForFreelancersSlidebar,
    freelancerForUserSlidebar,
    getFreelancerForClient,
  } = useMessageContext();

 
  const { getUser, user } = useAppContext();

  const [search, setSearch] = useState("");

  const filterUser =
    user?.role == "client"
      ? freelancerForUserSlidebar.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
      : usersForFreelancersSlidebar.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        );

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user?.role == "freelancer") {
      getUsersForFreelancer();
    } else {
      getFreelancerForClient();
    }
  }, [user]);

  return (
    <div
      className={`bg-white h-full p-6 rounded-r-2xl overflow-y-auto text-[#1A1A1A] border-r border-gray-200 shadow-sm ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      <div className="pb-6 border-b border-gray-300">
        {/* Search Bar */}
        <div className="bg-gray-100 rounded-full flex items-center gap-3 py-1 px-5 mt-6">
          <IoSearch />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            className="bg-transparent border-none outline-none text-[#333] text-sm placeholder-gray-500 flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>

      {/* User List */}
      {user?.role == "freelancer" && (
        <div className="flex flex-col gap-2 pt-4">
          {filterUser.map((user, index) => (
            <div
              onClick={() => {
                setSelectedUser(user);
                setUnseenMessages({});
              }}
              key={index}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors duration-200 hover:bg-gray-100 ${
                selectedUser?._id === user._id ? "bg-gray-100" : ""
              }`}
            >
              <img
                src={user.avatar || assest.avatar}
                alt={user.name}
                className="w-[38px] aspect-square rounded-full object-cover border border-gray-300"
              />
              <div className="flex flex-col">
                <p className="text-[#1A1A1A] text-sm font-medium">
                  {user.name}
                </p>
              </div>
              {unseenMessage && unseenMessage[user._id] > 0 && (
                <p className="absolute top-3 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-indigo-200 text-[#1A1A1A] font-semibold">
                  {unseenMessage[user._id]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {user?.role == "client" && (
        <div className="flex flex-col gap-2 pt-4">
          {filterUser.map((user, index) => (
            <div
              onClick={() => {
                setSelectedUser(user);
              }}
              key={index}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors duration-200 hover:bg-gray-100 ${
                selectedUser?._id === user._id ? "bg-gray-100" : ""
              }`}
            >
              <img
                src={user.avatar || assest.avatar}
                alt={user.name}
                className="w-[38px] aspect-square rounded-full object-cover border border-gray-300"
              />
              <div className="flex flex-col">
                <p className="text-[#1A1A1A] text-sm font-medium">
                  {user.name}
                </p>
              </div>
              {unseenMessage && unseenMessage[user._id] > 0 && (
                <p className="absolute top-3 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-indigo-200 text-[#1A1A1A] font-semibold">
                  {unseenMessage[user._id]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatSlidebar;

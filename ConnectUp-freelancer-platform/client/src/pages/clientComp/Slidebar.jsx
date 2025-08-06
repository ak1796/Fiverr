import React, { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { PiShoppingBagOpenBold } from "react-icons/pi";
import { FaMessage } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";

const Slidebar = () => {
  const headers = [
    { title: "Dashboard", icon: <MdSpaceDashboard />, link: "/client" },
    {
      title: "Projects",
      icon: <PiShoppingBagOpenBold />,
      link: "/client/projects",
    },
    {
      title: "Orders",
      icon: <MdOutlineAttachMoney />,
      link: "/client/orders",
    },
    { title: "Messages", icon: <FaMessage />, link: "/client/messages" },
    {
      title: "Profile",
      icon: <FaUser />,
      link: "/client/client-profile",
    },
  ];
  const { navigate, getUser, user } = useAppContext();
  const { pathname } = useLocation();
  const [to, setTo] = useState(pathname);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-64 min-h-screen bg-white text-gray-800 flex flex-col p-4 shadow-md border-r">
      <div onClick={() => navigate("/")} className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-1">Client Hub</h2>
        <p className="text-sm text-[#456EA1]">Welcome, {user?.name}</p>
      </div>
      <div className="space-y-3">
        {headers.map((header, idx) => (
          <div
            onClick={() => {
              navigate(`${header.link}`);
              setTo(header.link);
            }}
            key={idx}
            className={`flex items-center gap-3 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors cursor-pointer ${
              to == header.link ? "bg-blue-100" : ""
            }`}
          >
            <span className="text-xl text-black">{header.icon}</span>
            <h4 className="text-base font-medium">{header.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slidebar;

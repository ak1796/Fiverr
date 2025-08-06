import React from "react";

const ClientDetailsBox = ({ datas }) => {

  return (
    <div className=" w-full flex justify-evenly gap-5">
      {datas.map((data, idx) => (
        <div
          key={idx}
          className="p-6 w-full border  rounded-lg shadow-sm border-[#456EA1] text-gray-800"
        >
          <h2 className="text-lg font-semibold mb-1">{data.title}</h2>
          <p className="text-4xl font-bold text-black">{data.number}</p>
        </div>
      ))}
    </div>
  );
};

export default ClientDetailsBox;

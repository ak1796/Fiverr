import React from "react";
import { GoSearch } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { GrSecure } from "react-icons/gr";

const WhyChose = () => {
  return (
    <section className="py-20 px-6 bg-white w-full">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2c3e50]">
          Why Choose ConnectUp?
        </h1>
        <p className="pt-4 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light">
          Our platform offers a seamless experience for both clients and freelancers—ensuring quality, security, and satisfaction.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {[
          {
            icon: <GoSearch className="text-4xl text-[#4570A1]" />,
            title: "Find the Right Talent",
            description:
              "Easily search and filter freelancers based on skills, experience, and ratings to find the perfect match for your project.",
          },
          {
            icon: <GoPeople className="text-4xl text-[#4570A1]" />,
            title: "Collaborate Effectively",
            description:
              "Utilize integrated communication tools and project management features to streamline collaboration.",
          },
          {
            icon: <GrSecure className="text-4xl text-[#4570A1]" />,
            title: "Secure Transactions",
            description:
              "Benefit from a secure payment system, ensuring timely and protected transactions for everyone.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[#f9fbfc] border border-[#4570A1] rounded-lg p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
          >
            {item.icon}
            <h3 className="text-xl font-semibold text-[#2c3e50] mt-4 mb-2">
              {item.title}
            </h3>
            <p className="text-[#4570A1] text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChose;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const IndividualGigInfo = () => {
  const { id } = useParams();

  const { user, gigs, navigate, setSelectedClientGig } = useAppContext();
  const [gig, setGig] = useState(null);

  useEffect(() => {
    if (gigs.length > 0) {
      const foundGig = gigs.find((g) => g._id === id);
      setGig(foundGig);
    }
  }, [gigs, id]);

  if (!gig)
    return <p className="text-center mt-20 text-gray-500">Gig not found.</p>;

  return (
    <section className="py-16 px-6 bg-white w-full">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={gig.image}
            alt={gig.title}
            className="rounded-xl w-full h-[300px] object-cover shadow"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50] mb-4">
            {gig.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6">{gig.description}</p>

          <div className="space-y-2 text-sm text-gray-500">
            <p>
              <strong>Category:</strong> {gig.category}
            </p>
            <p>
              <strong>Price:</strong> ₹{gig.price}
            </p>
            <p>
              <strong>Delivery Time:</strong> {gig.deliveryTime} days
            </p>
            <p>
              <strong>Client:</strong> {gig.client?.name}
            </p>
          </div>

          {user?.role == "client" && (
            <button
              onClick={() => {
                setSelectedClientGig(gig);
                navigate("/place-orders");
              }}
              className="mt-6 bg-[#007AFF] text-white py-2 px-5 rounded-lg hover:bg-[#006ae6] transition"
            >
              Buy Gig
            </button>
          )}
          {!user && (
            <div
              onClick={() => navigate("/login")}
              className="text-red-500 cursor-pointer"
            >
              Login to buy gig
            </div>
          )}
          {user?.role == "freelancer" && (
            <div className="text-red-500 cursor-pointer">
              u cant buy this gig (client can buy it)
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IndividualGigInfo;

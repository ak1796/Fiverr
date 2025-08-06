import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Services = () => {
  const { gigs, fetchAllGigs, navigate, axios } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get("/api/gig/category");
      if (data.success) {
        setCategory(data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchAllGigs(); // Just to be sure gigs are fetched
  }, []);

  useEffect(() => {
    const filtered = gigs.filter((gig) => {
      const matchesSearch = gig.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? gig.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
    setFilteredGigs(filtered);
  }, [searchTerm, selectedCategory, gigs]);

  return (
    <section className="py-10 px-6 w-full">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
        <div className="flex flex-col justify-start w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-[#2c3e50]">
            Explore Available Gigs
          </h2>
          <p className="text-gray-500 text-lg mt-2 font-light">
            Search and filter freelance gigs tailored to your skills and
            interests.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-1/2 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search gigs by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#4570A1] transition"
          />
          <select
            className="px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#4570A1] bg-white text-gray-700"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {category.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredGigs.map((gig, idx) => (
          <div
            key={idx}
            className="bg-[#F8FAFC] p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            <img
              src={gig?.image}
              alt={gig?.title}
              className="w-full h-44 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-[#34495e] mb-2">
              {gig.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {gig.description}
            </p>
            <button
              onClick={() => navigate(`/services/${gig?._id}`)}
              className="mt-auto bg-[#007AFF] text-white py-2 px-4 rounded-lg hover:bg-[#006ae6] transition"
            >
              View Gig
            </button>
          </div>
        ))}
        {!filteredGigs.length && (
          <p className="col-span-full text-center text-gray-500 mt-10">
            No gigs matched your filters. Try a different keyword or category.
          </p>
        )}
      </div>
    </section>
  );
};

export default Services;

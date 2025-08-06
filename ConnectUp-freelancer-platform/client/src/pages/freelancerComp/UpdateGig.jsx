import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const UpdateGig = () => {
  const {
    axios,
    navigate,
    setLoading,
    selectedFreelancerGig,
    setSelectedFreelancerGig,
  } = useAppContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (
      selectedFreelancerGig &&
      Object.keys(selectedFreelancerGig).length > 0
    ) {
      setTitle(selectedFreelancerGig.title || "");
      setDescription(selectedFreelancerGig.description || "");
      setPrice(selectedFreelancerGig.price || "");
      setDeliveryTime(selectedFreelancerGig.deliveryTime || "");
      setCategory(selectedFreelancerGig.category || "");
      setImage(null); // Start fresh unless preview needed
    }
  }, [selectedFreelancerGig]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("price", price);
    form.append("deliveryTime", deliveryTime);
    form.append("category", category);
    form.append("image", image);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `/api/gig/update/${selectedFreelancerGig._id}`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/freelancer/all-gigs");
      }

      // Clear form
      setTitle("");
      setDescription("");
      setPrice("");
      setDeliveryTime("");
      setCategory("");
      setImage(null);
    } catch (error) {
      console.error(
        "Error updating gig:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-50 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Gig</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="e.g. Build a React dashboard"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your gig in detail..."
            rows={4}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-blue-500">Price cannot be changed</div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Time (months)
            </label>
            <input
              name="deliveryTime"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              type="number"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 border"
          />

          {/* 🔄 Current Image Preview */}
          {!image && selectedFreelancerGig?.image && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Current Image
              </label>
              <img
                src={selectedFreelancerGig.image}
                alt="Current Gig"
                className="w-32 h-auto mt-2 rounded-lg object-cover border"
              />
            </div>
          )}

          {/* 🆕 New Image Preview */}
          {image && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Selected New Image
              </label>
              <img
                src={URL.createObjectURL(image)}
                alt="New Preview"
                className="w-32 h-auto mt-2 rounded-lg object-cover border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Update Gig
        </button>
      </form>
    </div>
  );
};

export default UpdateGig;

import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const MoreInformations = () => {
  const { axios, navigate, setLoading, getUser } = useAppContext();

  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const uplaodInfoOfFreelancer = async () => {
    const formData = new FormData();

    formData.append("bio", bio);
    formData.append("experience", experience);
    formData.append("image", avatar);
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/user/freelancer/add-info",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getUser();
        navigate("/freelancer/freelancer-profile");
      }
      setAvatar(null);
      setBio("");
      setExperience("");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-50 p-6 bg-white rounded-lg shadow-md space-y-6">
      <form onSubmit={uplaodInfoOfFreelancer} encType="multipart/formdata">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          More Information
        </h2>

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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div>
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Years of Experience
          </label>
          <input
            id="experience"
            type="number"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 3"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="block w-1/3 text-white text-xl rounded-md cursor-pointer mx-auto mt-10 bg-blue-600 px-5 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MoreInformations;

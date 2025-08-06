import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { navigate, axios, setLoading, setUser } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

  const onsSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
        role,
      });
    
      if (data.success) {
        toast.success(data.message);
        setUser(data.data);
        if (role == "client") {
          navigate("/client");
        } else {
          navigate("/freelancer");
        }
        setEmail("");
        setPassword("");
        setRole("");
      }
    } catch (error) {
      toast.success(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f0f4f8] overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1440 320" className="w-full h-32">
          <path
            fill="#1787FF"
            fillOpacity="1"
            d="M0,160L48,154.7C96,149,192,139,288,160C384,181,480,235,576,240C672,245,768,203,864,186.7C960,171,1056,181,1152,181.3C1248,181,1344,171,1392,165.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Login Form */}
      <div className="bg-white shadow-xl rounded-lg p-8 z-10 w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={onsSubmitHandler}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-[#1787ffe5]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-[#1787ffe5]"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-600 mb-2">
              Select Role
            </label>
            <select
              onChange={(e) => setRole(e.target.value)}
              name="role"
              id="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
            >
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>
          <p className="my-2">
            {" "}
            Don't Have an Account{" "}
            <span
              onClick={() => navigate("/signUp")}
              className="text-[#1787FF] cursor-pointer"
            >
              Create Account{" "}
            </span>
          </p>
          <button
            type="submit"
            className="w-full bg-[#1787FF] text-white py-2 rounded-md hover:bg-[#1787ffe5] transition"
          >
            Login
          </button>
        </form>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 320" className="w-full h-32 rotate-180">
          <path
            fill="#1787FF"
            fillOpacity="1"
            d="M0,160L48,154.7C96,149,192,139,288,160C384,181,480,235,576,240C672,245,768,203,864,186.7C960,171,1056,181,1152,181.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Login;

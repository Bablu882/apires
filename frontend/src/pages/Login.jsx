import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Success from "../../public/success.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let isEmail = false;
      let isPhone = false;

      if (/^\S+@\S+\.\S+$/.test(email)) {
        isEmail = true;
      }

      if (/^\d{10}$/.test(email)) {
        isPhone = true;
      }

      if (!isEmail && !isPhone) {
        throw new Error("Invalid email address or phone number");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      const payload = {
        email: email,
        password: password,
      };

      const response = await axios.post("/api/user/login", payload);

      if (response.status === 200) {
        const { is_superuser, name, designation, id } = response.data.response;
        console.log(is_superuser);
        localStorage.setItem("Employee Name", name);
        localStorage.setItem("Superuser", is_superuser);
        localStorage.setItem("Employee Designation", designation);
        localStorage.setItem("person_id", id);

        setShowSuccessModal(true);
      } else {
        setError("Login failed: " + response.data.error);
      }
    } catch (error) {
      console.error("Login failed:", error.message);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        setError("Login failed: " + (error.response.data.detail || error.message));
      } else {
        setError("Login failed: " + error.message);
      }
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    const is_superuser = localStorage.getItem("Superuser");
    if (is_superuser == 0) {
      navigate("/dashboard?tab=home");
    } else {
      navigate("/admindashboard?tab=home");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#151C2C] text-black flex justify-center items-center p-4 sm:p-0">
      <div className="bg-white w-full sm:w-[30%] p-4 sm:p-5 rounded-lg shadow-xl">
        <h1 className="text-left text-2xl sm:text-3xl text-blue-800 font-bold mb-3 sm:mb-4">
          Login
        </h1>
        <div>
          <div className="flex flex-col gap-2 my-3 sm:my-4">
            <label className="text-gray-600 font-medium" htmlFor="email">
              Email/Phone
            </label>
            <input
              className="border-2 p-2 sm:p-3 rounded-xl text-lg sm:text-xl outline-none"
              id="email"
              placeholder="Enter Email or Phone"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 my-3 sm:my-4 relative">
            <label className="text-gray-600 font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="border-2 p-2 sm:p-3 rounded-xl text-lg sm:text-xl outline-none w-full pr-10"
                id="password"
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash className="text-[#151C2C]" /> : <FaEye className="text-[#151C2C]" />}
              </button>
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-[#6198FF] via-[#0066FF] to-[#004CBB] w-full py-2 rounded-lg text-white font-semibold text-lg sm:text-xl"
          >
            Login
          </button>
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg w-full sm:w-[20%]">
            <div className="flex items-center justify-center mb-4">
              <img src={Success} alt="Success" className="h-24 sm:h-32" />
            </div>
            <h3 className="mb-4 font-semibold text-lg text-center">
              Login Successfully!!
            </h3>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-green-700 rounded-md text-white text-lg font-semibold"
                onClick={handleModalClose}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

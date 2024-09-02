import React, { useState } from "react";
import axios from 'axios';
import Header from "./Header";
import AdminSidebar from "./AdminSidebar";
import Success from "../../public/success.png";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    location: "",
    phone: "",
    is_superuser: "",
  });

  const [phoneError, setPhoneError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "phone" && value.length > 10) {
      setPhoneError("Phone number should not exceed 10 digits.");
    } else {
      setPhoneError("");
      setNewUser({ ...newUser, [id]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { name, email, password, designation, location, phone, is_superuser } = newUser;

      // Password must be at least 8 characters long and contain at least one capital letter
      if (!/(?=.*[A-Z])(?=.*[0-9a-z]).{8,}/.test(password)) {
        console.log("Password must be at least 8 characters long and contain at least one capital letter");
      }

      const response = await axios.post("/api/register", {
        name,
        email,
        password,
        designation,
        location,
        phone,
        is_superuser,
      });

      setShowSuccessModal(true);

      setNewUser({
        name: "",
        designation: "",
        email: "",
        password: "",
        phone: "",
        location: "",
        is_superuser: "",
      });

    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/admindashboard?tab=employee")
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-1/5">
        <AdminSidebar />
      </div>
      <div className="w-4/5 bg-white flex flex-col">
        <Header />
        <div className="flex-1 py-3 px-5">
          <h2 className="text-3xl font-bold mt-3">Create Employee</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 mt-3 gap-4 md:grid-cols-2 bg-gray-100 rounded-xl">
            <div className="flex flex-col mt-5" style={{marginLeft:'180px'}}>
              <label className="text-gray-600 font-medium" htmlFor="name">
                Username<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-3 rounded-xl text-xl outline-none"
                id="name"
                placeholder="Username"
                type="text"
                value={newUser.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label className="text-gray-600 font-medium" htmlFor="designation">
                Designation<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-3 rounded-xl text-xl outline-none"
                id="designation"
                placeholder="Designation"
                type="text"
                value={newUser.designation}
                onChange={handleChange} style={{width:"70%"}}
              />
            </div>
            <div className="flex flex-col" style={{marginLeft:'180px'}}>
              <label className="text-gray-600 font-medium" htmlFor="email">
                Email<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-3 rounded-xl text-xl outline-none"
                id="email"
                placeholder="Email"
                type="email"
                value={newUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium" htmlFor="password">
                Password<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-3 rounded-xl text-xl outline-none"
                id="password"
                placeholder="Password"
                type="password"
                value={newUser.password}
                onChange={handleChange} style={{width:"70%"}}
              />
            </div>
            <div className="flex flex-col" style={{marginLeft:'180px'}}>
              <label className="text-gray-600 font-medium" htmlFor="phone">
                Phone<span className="text-red-600">*</span>
              </label>
              <input
                className={`border-2 p-3 rounded-xl text-xl outline-none ${phoneError ? 'border-red-500' : ''}`}
                id="phone"
                placeholder="Phone"
                type="text"
                value={newUser.phone}
                onChange={handleChange}
              />
              {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium" htmlFor="location">
                Location<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-3 rounded-xl text-xl outline-none"
                id="location"
                placeholder="Location"
                type="text"
                value={newUser.location}
                onChange={handleChange} style={{width:"70%"}}
              />
            </div>
            <div className="flex flex-col w-full" style={{marginLeft:'180px'}}>
              <label className="text-gray-600 font-medium" htmlFor="is_superuser">
                SuperUser<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-3 rounded-xl text-xl outline-none"
                id="is_superuser"
                placeholder="If You're an Admin then type 1 or type 0"
                type="text"
                value={newUser.is_superuser}
                onChange={handleChange} style={{width:'142%'}}
              />
            </div>
            <div className="col-span-2 flex justify-center mt-5">
              <button type="submit" className="bg-[#5b5d5f] w-1/3 py-2 rounded-lg text-white font-semibold text-xl">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="flex items-center justify-center">
              <img src={Success} alt="Logo" style={{ height: '100px' }} />
            </div>
            <h5 className="mb-4 font-semibold">Employee Successfully Created!!</h5>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg ml-3"
                onClick={handleModalClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEmployee;

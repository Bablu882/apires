import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "./Header";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from 'react-router-dom';
import Success from "../../public/success.png";

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    designation: "",
    location: "",
    phone: "",
    is_superuser: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  console.log(userId)
  useEffect(() => {
    const fetchEmployee = async () => {
      if (!userId) {
        console.log("No user ID found in local storage.");
        return;
      }

      try {
        const response = await axios.get(`/api/user/${userId}`);
        setEmployee(response.data.response.employee_data);
      } catch (error) {
        console.log("Error fetching employee data:", error);
      }
    };

    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    console.log(e.target); // Log the event target
    const { id, value } = e.target;
    setEmployee({ ...employee, [id]: value });
  };
  
  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    if (id === "newPassword") {
      setNewPassword(value);
    } else if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError("No user ID found in local storage.");
      return;
    }

    if (showChangePassword && newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const updatedData = { ...employee };
      if (showChangePassword) {
        updatedData.password = newPassword;
      }
  
      const response = await axios.put(`/api/edituser/${userId}`, updatedData);
      setShowSuccessModal(true);
      
  
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Failed to update employee details.");
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/admindashboard?tab=employee");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-1/5">
        <AdminSidebar />
      </div>
      <div className="w-4/5 bg-white flex flex-col">
        <Header />
        <div className="flex-1 py-5 px-5">
          <h1 className="text-2xl font-bold mb-4">Edit Employee Details</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 bg-gray-100 rounded-xl">
            <div className="flex flex-col pt-5 pb-3">
              <label className="text-gray-600 font-medium" htmlFor="name">
                Username<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-3 rounded-xl text-xl outline-none"
                id="name"
                placeholder="Enter Employee Username"
                type="text"
                onChange={handleChange} required
              />
            </div>
            <div className="flex flex-col pt-5 pb-3">
              <label className="text-gray-600 font-medium" htmlFor="designation">
                Designation<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-3 rounded-xl text-xl outline-none"
                id="designation"
                placeholder="Enter Employee Designation"
                type="text"
                onChange={handleChange} required
              />
            </div>
            <div className="flex flex-col pb-3">
              <label className="text-gray-600 font-medium" htmlFor="email">
                Email<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-3 rounded-xl text-xl outline-none"
                id="email"
                placeholder="Enter Employee Email"
                type="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col pb-3">
              <label className="text-gray-600 font-medium" htmlFor="phone">
                Phone<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-3 rounded-xl text-xl outline-none"
                id="phone"
                placeholder="Enter Employee Phone"
                type="number"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium" htmlFor="location">
                Location<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-3 rounded-xl text-xl outline-none"
                id="location"
                placeholder="Enter Employee Location"
                type="text"
                required
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium" htmlFor="is_superuser">
                SuperUser<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-3 rounded-xl text-xl outline-none"
                id="is_superuser"
                placeholder="If You're an Admin then type '1' else type '0'"
                type="text"
                required
                onChange={handleChange}
              />
            </div>
            
            <div className="col-span-2 flex justify-center mt-5">
              <button type="submit" className="bg-[#5b5d5f] w-1/2 py-2 rounded-lg text-white font-semibold text-xl" style={{paddingBottom:'14px'}}>
                Update
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="flex items-center justify-center">
              <img src={Success} alt="Logo" style={{ height: '100px' }} />
            </div>
            <h5 className="mb-4 font-semibold">Employee Details Successfully Updated!!</h5>
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

export default EditEmployee;

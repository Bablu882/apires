import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  MdAccountCircle,
  MdVisibility,
  MdVisibilityOff,
  MdClose
} from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";

const capitalizeName = (name) => {
  if (!name) return '';
  return name.replace(/\b\w/g, char => char.toUpperCase());
};

const Header = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const storedEmployeeName = localStorage.getItem("Employee Name");
    const storedEmployeeDesignation = localStorage.getItem("Employee Designation");
    const storedUserId = localStorage.getItem("person_id");

    if (storedEmployeeName) {
      setEmployeeName(capitalizeName(storedEmployeeName));
    }
    if (storedEmployeeDesignation) {
      setDesignation(storedEmployeeDesignation);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setDropdownOpen(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.put(`/api/changepassword/${userId}`, {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      });
      if (response.status === 200) {
        alert("Password changed successfully");
        setModalOpen(false);
      } else {
        alert("Failed to change password");
      }
    } catch (error) {
      alert("Error changing password");
    }
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"; // Redirect to login page
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center sticky shadow-sm border-b-1 top-0 p-3 bg-[#ffff] text-gray-500">
        <div className="flex items-center gap-5">
          <div className="flex flex-col">
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 rounded-lg">
            {showSearch ? (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="text-black border rounded py-1 px-2 outline-none"
                />
                <button
                  onClick={toggleSearch}
                  className="text-white bg-orange-400 p-2 rounded"
                >
                  <MdClose size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={toggleSearch}
                className="text-gray-500 bg-white"
              >
                <BiSearchAlt size={25} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-5">
            <IoNotificationsOutline size={25} />
            <div className="relative">
              <MdAccountCircle size={30} className="cursor-pointer" onClick={toggleDropdown} />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <div className="flex items-center px-4 py-2 text-gray-800 text-sm border-b-2">
                    <MdAccountCircle size={30} className="mr-2" />
                    <div>
                      <span className="block font-semibold">{employeeName}</span>
                      <span className="block">{designation}</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    onClick={toggleModal}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-sm"
                  >
                    Change Password
                  </a>
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-sm"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Old Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <span
                    onClick={toggleShowConfirmPassword}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  >
                    {showConfirmPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

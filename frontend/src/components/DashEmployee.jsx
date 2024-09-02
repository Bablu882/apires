import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaPlus, FaTrash, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';
import Cross from "../../public/cross.png";
import Success from "../../public/success.png";

const capitalizeName = (name) => {
  if (!name) return '';
  return name.replace(/\b\w/g, char => char.toUpperCase());
};

const DashEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("/api/user");
        const employeesWithCapitalizedNames = res.data.map(employee => ({
          ...employee,
          name: capitalizeName(employee.name)
        }));
        setEmployees(employeesWithCapitalizedNames);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleClickView = (userId, userName) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
  };

  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(`/api/deleteuser/${userId}`);
      
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== userId));
    } catch (error) {
      alert("Error deleting user:", error);
    }
  };

  const handleLockClick = (userId, userName) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setShowPasswordModal(true);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.put(`/api/admin/changepassword/${selectedUserId}`, {
        new_password:newPassword,
        confirm_password: confirmPassword
      });
      setShowPasswordModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setPasswordError('Error changing password');
      console.error('Error changing password:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await axios.delete(`/api/deleteuser/${deleteUserId}`);
      alert("User deleted successfully:", res.data.message.successMessage);
  
      // Remove the deleted user from state
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== deleteUserId));
      setShowDeleteModal(false);
    } catch (error) {
      alert("Error deleting user:", error);
    }
  };

  return (
    <div className="bg-[#f8f8fa] p-5 mt-5 rounded-xl">
      <div className="flex items-center justify-between">
        <input
          placeholder="Search for employee"
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm"
        />
        <div className="flex justify-end">
          <Link to="/admindashboard/DashEmployee/CreateEmployee">
            <button className="bg-[#3F0197] rounded-lg px-4 py-2 text-sm text-white font-semibold flex items-center">
              <FaPlus className="mr-2" /> Create Employee
            </button>
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 border-b-4 border-[#1E272E] mt-5"></h2>

      <div className="w-full overflow-x-auto text-black">
        <table className="w-full mt-5">
          <thead>
            <tr className="bg-[#f5f5f5] rounded-xl">
              <th className="p-2">Name</th>
              <th className="p-2">Designation</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Location</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr className="text-center my-2 text-sm" key={employee.id}>
                <td className="border-b px-4 py-2">{employee.name}</td>
                <td className="border-b px-4 py-2">{employee.designation}</td>
                <td className="border-b px-4 py-2">{employee.email}</td>
                <td className="border-b px-4 py-2">{employee.phone}</td>
                <td className="border-b px-4 py-2">{employee.location}</td>
                <td className="border-b px-4 py-2">
                  <div className="flex gap-2 items-center justify-center">
                    <Link
                      to={`/admindashboard/DashEmployee/ViewEmpWork`}
                      onClick={() => handleClickView(employee.id, employee.name)}
                    >
                      <button className="px-2 py-1 bg-green-600 rounded-md border-none cursor-pointer text-white">
                        <FaEye size={18} />
                      </button>
                    </Link>

                    <Link
                      to={`/admindashboard/DashEmployee/EditEmployee`}
                      onClick={() => handleClickView(employee.id, employee.name)}
                    >
                      <button className="px-2 py-1 bg-yellow-500 rounded-md border-none cursor-pointer text-white">
                        <FaEdit size={18} />
                      </button>
                    </Link>

                    <button
                      className="px-2 py-1 bg-[#1565c0] rounded-md border-none cursor-pointer text-white"
                      onClick={() => handleLockClick(employee.id, employee.name)}
                    >
                      <FaLock size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setDeleteUserId(employee.id);
                        setShowDeleteModal(true);
                      }}
                      className="px-2 py-1 bg-red-600 rounded-md border-none cursor-pointer text-white"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPasswordModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Change Password for {selectedUserName}</h2>
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500 mb-3">{passwordError}</p>}
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-[#3F0197] rounded-lg text-white font-semibold"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg ml-3"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="flex items-center justify-center">
              <img src={Cross} alt="Logo" style={{ height: '100px' }} />
            </div>
            <h5 className="mb-4 font-semibold">Are you sure you want to delete this user?</h5>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-red-600 rounded-lg text-white font-semibold"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg ml-3"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-5 rounded-lg shadow-lg">
                  <div className="flex items-center justify-center">
                    <img src={Success} alt="Logo" style={{ height: '100px' }} />
                  </div>
                  <h5 className="mb-4 font-semibold">Password Sucessfully Updated!!</h5>
                  <div className="flex justify-center">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded-lg ml-3"
                      onClick={() => setShowSuccessModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
        )}
    </div>
  );
};

export default DashEmployee;

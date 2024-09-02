import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from "./Header";
import AdminSidebar from "./AdminSidebar";

const capitalizeText = (text) => {
  if (!text) return '';
  return text.replace(/\b\w/g, char => char.toUpperCase());
};

const ViewEmpWork = () => {
  const [employeeWork, setEmployeeWork] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [showFullText, setShowFullText] = useState({});

  useEffect(() => {
    const fetchUserWorks = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const userName = localStorage.getItem("userName");

        setEmployeeName(capitalizeText(userName));

        const response = await axios.get(`/api/userwork/${userId}`);
        if (response.status === 200) {
          setEmployeeWork(response.data.response.work_data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserWorks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (00:00) case
    const time = `${hours}:${minutes} ${ampm}`;
    return `${day}/${month}/${year} ${time}`;
  };

  const toggleFullText = (id) => {
    setShowFullText(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const deleteWorkEntry = async (id) => {
    try {
      const response = await axios.delete(`/api/deletework/${id}`);
      if (response.status === 200) {
        setEmployeeWork(employeeWork.filter(work => work.id !== id));
      } else {
        console.error('Failed to delete work entry');
      }
    } catch (error) {
      console.error('Error deleting work entry:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-1/5">
        <AdminSidebar />
      </div>
      <div className="w-4/5 bg-white">
        <Header />
        <div className="bg-white p-5 mt-5 rounded-xl">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl text-center">{employeeName} - Work Details</h1>
          </div>

          <h2 className="text-2xl font-semibold mb-4 border-b-4 border-[#1E272E] mt-9"></h2>

          <div className="w-full overflow-x-auto text-black">
            <table className="w-full mt-5">
              <thead>
                <tr className="bg-[#f5f5f5] rounded-xl">
                  <th className="p-2 w-1/4">Date/Time</th>
                  <th className="p-2 w-3/4">Work Description</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeWork.length > 0 ? (
                  employeeWork.map((work, index) => (
                    <tr className="text-center my-2" key={index}>
                      <td className="border-b px-4 py-2">{formatDate(work.date)}</td>
                      <td className="border-b px-4 py-2">
                        {showFullText[work.id] ? work.workdescription : `${work.workdescription.slice(0, 50)}...`}
                        {work.workdescription.length > 50 &&
                          <button
                            className="text-blue-600 hover:underline ml-2"
                            onClick={() => toggleFullText(work.id)}
                          >
                            {showFullText[work.id] ? " Read Less" : " Read More"}
                          </button>
                        }
                      </td>
                      <td className="border-b px-4 py-2">
                        <div className="flex gap-2 items-center justify-center">
                          <button
                            className="px-3 py-1 bg-red-600 rounded-md border-none cursor-pointer text-white"
                            onClick={() => deleteWorkEntry(work.id)}
                          >
                            <FaTrash size={15}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No work details found for this employee.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmpWork;

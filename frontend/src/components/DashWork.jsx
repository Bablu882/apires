import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaEdit, FaPlus } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { TbFilterEdit } from "react-icons/tb";

const DashWork = () => {
  const [works, setWorks] = useState([]);
  const [showFullText, setShowFullText] = useState({});
  const [isEditButtonActive, setIsEditButtonActive] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedWorks, setSelectedWorks] = useState({});

  const toggleFullText = (id) => {
    setShowFullText(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  useEffect(() => {
    const fetchUserWorks = async () => {
      try {
        const personId = localStorage.getItem('person_id');
        const response = await axios.get(`/api/userwork/${personId}`);
        if (response.status === 200) {
          const workData = response.data.response.work_data;
          setWorks(workData);
          // Initialize selectedWorks state
          const initialSelectedWorks = workData.reduce((acc, work) => {
            acc[work.id] = false;
            return acc;
          }, {});
          setSelectedWorks(initialSelectedWorks);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserWorks();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEditButtonActive(false);
    }, 15 * 60 * 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newSelectedWorks = Object.keys(selectedWorks).reduce((acc, id) => {
      acc[id] = newSelectAll;
      return acc;
    }, {});
    setSelectedWorks(newSelectedWorks);
  };

  const handleRowCheckboxChange = (id) => {
    setSelectedWorks(prevSelectedWorks => ({
      ...prevSelectedWorks,
      [id]: !prevSelectedWorks[id]
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const time = `${hours}:${minutes} ${ampm}`;
    return `${day}/${month}/${year} ${time}`;
  };

  return (
    <div className="p-5 rounded-xl bg-[#f8f8fa]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl mx-3">Work List <br></br><span className="font-normal text-sm">Manage your work</span></h1>

        <div className="flex justify-end mx-2">
          <Link to="/dashboard/DashWork/AddWork">
            <button className="bg-orange-400 hover:bg-[#1d1d58] rounded px-4 py-2 text-white font-semibold flex items-center">
              <FaPlus className="mr-2" /> Add Work
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto text-black bg-[#FFFFFF] mx-2" style={{width:'99%',border:'1px solid #DBDBDB', borderRadius:'5px'}}>
        <div className="flex items-center relative mx-5 mt-5">
          <button className="bg-orange-400 p-2 rounded border-r-0">
            <TbFilterEdit size={25} className="text-white"/>
          </button>
          <div className="relative flex-1 mx-2">
            <input
              placeholder="Search..."
              className="px-10 py-2 rounded border border-gray-300 w-[18%] text-gray-500"
            />
            <BiSearchAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </div>
        <table className="w-full mt-4">
          <thead>
            <tr className="rounded-xl">
              <th className="p-2 w-1/12">
                <input
                  type="checkbox"
                  className="border-gray-400 border-1"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th className="p-2 w-1/5">Date/Time</th>
              <th className="p-2 w-3/5">Work Description</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {works.map(work => (
              <tr key={work.id} className="text-center my-2">
                <td className="border-b px-4 py-2">
                  <input
                    type="checkbox"
                    className="border-gray-400 border-1"
                    checked={selectedWorks[work.id]}
                    onChange={() => handleRowCheckboxChange(work.id)}
                  />
                </td>
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
                    <Link to={`/dashboard/DashWork/EditWork/${work.id}`} onClick={() => localStorage.setItem('workId', work.id)}>
                      <button
                        className={`px-3 py-2 rounded-md border-none cursor-pointer  ${isEditButtonActive ? "text-orange-400" : "text-gray-500 cursor-not-allowed"}`}
                        disabled={!isEditButtonActive}
                      >
                        <FaEdit size={20}/>
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashWork;

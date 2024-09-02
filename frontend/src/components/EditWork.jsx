import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';

const EditWork = () => {
  const [workId, setWorkId] = useState(null);
  const [workDetails, setWorkDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedWorkId = localStorage.getItem('workId');
    if (storedWorkId) {
      setWorkId(storedWorkId);
    } else {
      console.error('No workId found in localStorage');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (workId) {
      const fetchWorkDetails = async () => {
        try {
          const response = await axios.get(`/api/userwork/${workId}`);
          if (response.status === 200) {
            setWorkDetails(response.data.response.work_data);
          } else {
            console.error('Failed to fetch work details');
          }
        } catch (error) {
          console.error('Error fetching work details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchWorkDetails();
    }
  }, [workId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/editwork/${workId}`, workDetails);
      if (response.status === 200) {
        alert('Work entry updated successfully');
        setWorkDetails("")
      } else {
        console.error('Failed to update work entry');
      }
    } catch (error) {
      console.error('Error updating work entry:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5 bg-white">
        <Header />
      <div className="w-4/5 bg-white">
        <div className="p-5 mt-5 rounded-md">
          <form className="flex flex-col gap-5" onSubmit={handleUpdate}>
            <div>
              <label className="block mb-2">Work Description</label>
              <textarea
                className="p-3 bg-gray-100 text-black rounded-md mb-4 border-2 border-gray-300 w-full rows-6"
                value={workDetails.workdescription || ''}
                onChange={(e) => setWorkDetails({ ...workDetails, workdescription: e.target.value })}
                rows="6"
              ></textarea>
            </div>
            <button
              className="px-4 py-2 bg-blue-500 rounded-md border-none text-white cursor-pointer text-lg font-semibold"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EditWork;

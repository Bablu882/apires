import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const AddWork = () => {
    const [workDescription, setWorkDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const personId = localStorage.getItem('person_id');
        const personName = localStorage.getItem('Employee Name');

        try {
            const response = await axios.post("/api/addwork", {
                person: personId,
                name: personName,
                workdescription: workDescription,
            });

            if (response.status === 201) {
                alert(response.data.message.successMessage);
                setWorkDescription('');
                navigate("/dashboard?tab=work")
            } else {
                alert(response.data.error.errorMessage);
            }
        } catch (error) {
            alert('An error occurred while adding work');
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div style={{width:'16%'}}>
                <Sidebar />
            </div>
            <div className="bg-[#f9f9fa]" style={{width:'84%', marginLeft:'14px'}}>
                <Header />
                <div className="bg-[#f8f8fa] p-5 rounded-md mt-5">
                    <form className="flex flex-col gap-5 bg-[#FFFFFF] p-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label className="font-medium text-lg">Work Description</label>
                            <textarea
                                className="p-3 bg-white text-black rounded-md mb-4 border-2 focus:border-orange-400 w-full mt-2"
                                rows="6"
                                value={workDescription}
                                onChange={(e) => setWorkDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="flex justify-start">
                            <button type='submit'
                                className="px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded text-white font-semibold"
                            >
                                Submit
                            </button>
                            <Link to="/dashboard?tab=work">
                                <button
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded ml-3 text-white"
                                >
                                    Cancel
                                </button>
                            </Link>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddWork;

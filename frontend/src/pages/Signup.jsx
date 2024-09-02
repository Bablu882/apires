import React, { useState } from "react";
import axios from 'axios'

const DashSignup = () => {

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    city: "",
    phone: ""
  })

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await axios.post("/api/register", newUser);
      console.log("User created:", response.data);

      setNewUser({
        username: "",
        designation: "",
        email: "",
        password: "",
        phone: "",
        location: "",
        is_superuser: "",
      });

    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <div className=" w-full min-h-[95vh] text-black flex justify-center items-center bg-[#151C2C]">
      <div className="bg-white w-[30%] p-5 rounded-lg shadow-xl">
        <h1 className="text-left text-3xl text-blue-800 font-bold mb-4">
          Add Employee
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 my-2">
            <label className="text-gray-600 font-medium" htmlFor="email">
              Username
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
          <div className="flex flex-col gap-2 my-2">
            <label className="text-gray-600 font-medium" htmlFor="email">
              Desingation
            </label>
            <input
              className="border-2 p-3 rounded-xl text-xl outline-none"
              id="designation"
              placeholder="Desingation"
              type="text"
              value={newUser.designation}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="text-gray-600 font-medium" htmlFor="email">
              Email
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
          <div className="flex flex-col gap-2 my-2">
            <label className="text-gray-600 font-medium" htmlFor="email">
              Password
            </label>
            <input
              className="border-2 p-3 rounded-xl text-xl outline-none"
              id="password"
              placeholder="Password"
              type="password"
              value={newUser.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="text-gray-600 font-medium" htmlFor="email">
              Phone
            </label>
            <input
              className="border-2 p-3 rounded-xl text-xl outline-none"
              id="phone"
              placeholder="Phone"
              type="number"
              value={newUser.phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="text-gray-600 font-medium" htmlFor="email">
              Location
            </label>
            <input
              className="border-2 p-3 rounded-xl text-xl outline-none"
              id="city"
              placeholder="Location"
              type="text"
              value={newUser.location}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label className="text-gray-600 font-medium" htmlFor="email">
              SuperUser
            </label>
            <input
              className="border-2 p-3 rounded-xl text-xl outline-none"
              id="city"
              placeholder="If You're an Admin then 1 else 0"
              type="text"
              value={newUser.is_superuser}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="bg-gradient-to-r from-[#6198FF] via-[#0066FF] to-[#004CBB]  w-full py-2 rounded-lg text-white font-semibold text-xl">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashSignup;

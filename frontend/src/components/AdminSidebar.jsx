import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";
import Logo from "../../public/luminelle.png";

const AdminSidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname + location.search);

  useEffect(() => {
    setActiveTab(location.pathname + location.search);
  }, [location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full min-h-screen bg-[#FBFFFF] sticky top-0 overflow-hidden border-r-2" style={{ width: '260px', border: '1px solid #E5E4E2' }}>
      <div className="flex justify-start items-center mx-5">
        <img src={Logo} className="pt-5 mx-8" alt="Logo" style={{ width: '100px' }} />
      </div>

      <div className="flex flex-col gap-5 mt-8 px-5 text-[#A4A8AE]">
        <div className="text-center font-semibold text-md">
          <Link
            to="/admindashboard?tab=home"
            onClick={() => handleTabClick("/admindashboard?tab=home")}
            className={`flex items-center justify-start gap-2 p-3 ${
              activeTab === "/dashboard?tab=home" ? "bg-[#171748] text-white rounded-md" : "hover:bg-[#171748] hover:text-white hover:rounded-md"}`}
          >
            <IoHome size={25} />
            Home
          </Link>
        </div>

        <div className="text-center font-semibold text-sm">
          <Link
            to="/admindashboard?tab=employee"
            onClick={() => handleTabClick("/admindashboard?tab=employee")}
            className={`flex items-center justify-start gap-2 p-3 ${
              activeTab === "/admindashboard?tab=employee" ? "bg-[#171748] text-white rounded-md" : "hover:bg-[#171748] hover:text-white hover:rounded-md"
            }`}
          >
            <FaUsers size={25} />
            Employees
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminSidebar;

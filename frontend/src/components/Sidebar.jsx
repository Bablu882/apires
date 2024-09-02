import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaLaptop } from "react-icons/fa";
import { TbCheckupList } from "react-icons/tb";
import { RiCircleLine, RiCircleFill } from "react-icons/ri";
import Logo from "../../public/luminelle.png";
import { CSSTransition } from 'react-transition-group';

const Sidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname + location.search);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inventoryDropdownOpen, setInventoryDropdownOpen] = useState(false);
  const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  useEffect(() => {
    setActiveTab(location.pathname + location.search);
  }, [location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedTab(tab);
    if (tab === "/dashboard?tab=addproduct" ||
        tab === "/dashboard?tab=addcategory" ||
        tab === "/dashboard?tab=productlist" ||
        tab === "/dashboard?tab=orderlist" || 
        tab === "/dashboard?tab=addsubcategory" ||
        tab === "/dashboard?tab=returnorder"
      ) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  };

  const handleProductClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleOrderClick = (tab) => {
    setSelectedTab(tab);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleInventoryDropdown = () => {
    setInventoryDropdownOpen(!inventoryDropdownOpen);
  };

  const toggleOrdersDropdown = () => {
    setOrdersDropdownOpen(!ordersDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-[#FBFFFF] sticky top-0 border-r-2 overflow-hidden" style={{ width: '260px', border: '1px solid #E5E4E2' }}>
      <div className="flex justify-start items-center mx-5">
        <img src={Logo} className="pt-1 mx-8" alt="Logo" style={{ width: '100px' }} />
      </div>

      <div className="flex flex-col gap-5 mt-5 px-5 text-[#A4A8AE]">
        <div className="text-center font-semibold text-md">
          <Link
            to="/dashboard?tab=home"
            onClick={() => handleTabClick("/dashboard?tab=home")}
            className={`flex items-center justify-start gap-2 p-3 ${activeTab === "/dashboard?tab=home" ? "bg-[#171748] text-white rounded-md" : "hover:bg-[#171748] hover:text-white hover:rounded-md"}`}
          >
            <IoHome size={18} />
            Home
          </Link>
        </div>

        <div className="text-center font-semibold text-md" style={{ marginTop: "-10px" }}>
          <Link
            to="/dashboard?tab=work"
            onClick={() => handleTabClick("/dashboard?tab=work")}
            className={`flex items-center justify-start gap-2 p-3 ${activeTab === "/dashboard?tab=work" ? "bg-[#171748] text-white rounded-md" : "hover:bg-[#171748] hover:text-white hover:rounded-md"}`}
          >
            <FaLaptop size={18} />
            Work
          </Link>
        </div>

        <div className="text-center font-semibold text-md relative" style={{ marginTop: "-10px" }}>
          <button
            onClick={toggleDropdown}
            className={`flex items-center justify-between p-3 w-full ${dropdownOpen ? "bg-[#171748] text-white rounded-md" : "hover:bg-[#171748] hover:text-white hover:rounded-md"}`}
          >
            <div className="flex items-center gap-2">
              <TbCheckupList size={18} />
              Inventory
            </div>
            {dropdownOpen ? <IoIosArrowDown size={18} className="mt-1 font-bold" /> : <IoIosArrowForward size={18} className="mt-1 font-bold" />}
          </button>
          <CSSTransition in={dropdownOpen} timeout={300} classNames="slide-down" unmountOnExit>
            <div className="mt-2 w-full text-sm z-10">
              <div className="flex flex-col gap-2 mx-10 pt-5 text-gray-700">
                <button className="flex items-center justify-between gap-2" onClick={toggleInventoryDropdown}>
                  <span style={{fontSize:"16px"}}>Products</span>
                  {inventoryDropdownOpen ? <IoIosArrowDown size={18} /> : <IoIosArrowForward size={18} />}
                </button>
                <CSSTransition in={inventoryDropdownOpen} timeout={300} classNames="slide-down" unmountOnExit>
                  <div className="text-left pt-2">
                    <Link to="/dashboard?tab=productlist" onClick={() => { handleTabClick("/dashboard?tab=productlist"); handleProductClick("/dashboard?tab=productlist"); }} className={`flex justify-between py-1 ${selectedTab === "/dashboard?tab=productlist" ? "font-bold" : ""}`}>
                      <div className="flex items-center gap-2 py-1 hover:text-orange-400">
                        {selectedTab === "/dashboard?tab=productlist" ? <RiCircleFill /> : <RiCircleLine />}
                        Product List
                      </div>
                    </Link>
                    <Link to="/dashboard?tab=addproduct" onClick={() => { handleTabClick("/dashboard?tab=addproduct"); handleProductClick("/dashboard?tab=addproduct"); }} className={`flex justify-between py-1 ${selectedTab === "/dashboard?tab=addproduct" ? "font-bold" : ""}`}>
                      <div className="flex items-center gap-2 py-1 hover:text-orange-400">
                        {selectedTab === "/dashboard?tab=addproduct" ? <RiCircleFill /> : <RiCircleLine />}
                        Add Product
                      </div>
                    </Link>
                    <Link to="/dashboard?tab=addcategory" onClick={() => { handleTabClick("/dashboard?tab=addcategory"); handleProductClick("/dashboard?tab=addcategory"); }} className={`flex justify-between py-1 ${selectedTab === "/dashboard?tab=addcategory" ? "font-bold" : ""}`}>
                      <div className="flex items-center gap-2 py-1 hover:text-orange-400">
                        {selectedTab === "/dashboard?tab=addcategory" ? <RiCircleFill /> : <RiCircleLine />}
                        Add Category
                      </div>
                    </Link>
                    <Link to="/dashboard?tab=addsubcategory" onClick={() => { handleTabClick("/dashboard?tab=addsubcategory"); handleProductClick("/dashboard?tab=addsubcategory"); }} className={`flex justify-between py-1 ${selectedTab === "/dashboard?tab=addsubcategory" ? "font-bold" : ""}`}>
                      <div className="flex items-center gap-2 py-1 hover:text-orange-400">
                        {selectedTab === "/dashboard?tab=addsubcategory" ? <RiCircleFill /> : <RiCircleLine />}
                        Add Sub Category
                      </div>
                    </Link>
                  </div>
                </CSSTransition>

                <button className="flex items-center justify-between gap-2 pt-2" onClick={toggleOrdersDropdown}>
                  <span style={{fontSize:"16px"}}>Orders</span>
                  {ordersDropdownOpen ? <IoIosArrowDown size={18} /> : <IoIosArrowForward size={18} />}
                </button>
                <CSSTransition in={ordersDropdownOpen} timeout={300} classNames="slide-down" unmountOnExit>
                  <div className="text-left">
                    <Link to="/dashboard?tab=orderlist" onClick={() => { handleTabClick("/dashboard?tab=orderlist"); handleOrderClick("/dashboard?tab=orderlist"); }} className={`flex justify-between py-1 ${selectedTab === "/dashboard?tab=orderlist" ? "font-bold" : ""}`}>
                      <div className="flex items-center gap-2 py-1 hover:text-orange-400">
                        {selectedTab === "/dashboard?tab=orderlist" ? <RiCircleFill /> : <RiCircleLine />}
                        Order List
                      </div>
                    </Link>
                    <Link to="/dashboard?tab=returnorder" onClick={() => { handleTabClick("/dashboard?tab=returnorder"); handleOrderClick("/dashboard?tab=returnorder"); }} className={`flex justify-between py-1 ${selectedTab === "/dashboard?tab=returnorder" ? "font-bold" : ""}`}>
                      <div className="flex items-center gap-2 py-1 hover:text-orange-400">
                        {selectedTab === "/dashboard?tab=returnorder" ? <RiCircleFill /> : <RiCircleLine />}
                        Return Order
                      </div>
                    </Link>
                  </div>
                </CSSTransition>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

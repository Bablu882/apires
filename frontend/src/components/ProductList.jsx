import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaEdit, FaPlus, FaTractor, FaTrash } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { TbFilterEdit } from "react-icons/tb";
import productImage from "../../public/light.jpg";
import cctvImage from "../../public/cctv.jpg";
import fireImage from "../../public/fire.jpg";
import blinkerImage from "../../public/blinker.jpg";
 // Ensure the path is correct

const ProductList = () => {

  return (
    <div className="p-5 rounded-xl bg-[#f8f8fa]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl mx-3">
          Product List <br />
          <span className="font-normal text-sm">Manage your products</span>
        </h1>

        <div className="flex justify-end mx-2">
          <Link to="/dashboard?tab=addproduct">
            <button className="bg-orange-400 hover:bg-[#1d1d58] rounded px-4 py-2 text-white font-semibold flex items-center">
              <FaPlus className="mr-2" /> Add Product
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto text-black bg-[#FFFFFF] mx-2" style={{ width: '99%', border: '1px solid #DBDBDB', borderRadius: '5px' }}>
        <div className="flex items-center relative mx-5 mt-5">
          <button className="bg-orange-400 p-2 rounded border-r-0">
            <TbFilterEdit size={25} className="text-white" />
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
                />
              </th>
              <th className="p-2 w-2/5 text-left px-12">Product Name</th>
              <th className="p-2 w-1/5">Category</th>
              <th className="p-2 w-1/5">Quantity</th>
              <th className="p-2 w-1/5">Stock</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center my-2">
              <td className="border-b px-4 py-2">
                <input
                  type="checkbox"
                  className="border-gray-400 border-1"
                />
              </td>
              <td className="border-b px-2 py-2 flex items-center gap-2">
                <img src={productImage} alt="Product" className="w-10 h-10 object-cover ml-10" />
                Red Signal
              </td>
              <td className="border-b px-4 py-2">Traffic Signals</td>
              <td className="border-b px-4 py-2">40</td>
              <td className="border-b px-4 py-2">
                <select name="stock" className="px-2 py-1 rounded border border-gray-300 bg-white">
                  <option value="in-stock">In-Stock</option>
                  <option value="out-stock">Out of Stock</option>
                </select>
              </td>
              <td className="border-b px-4 py-2">
                <div className="flex gap-2 items-center justify-center">
                  <button
                    className="px-3 py-2 rounded-md border-none cursor-pointer text-blue-600"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    className="px-3 py-2 rounded-md border-none cursor-pointer text-red-600"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </td>
            </tr>

            <tr className="text-center my-2">
              <td className="border-b px-4 py-2">
                <input
                  type="checkbox"
                  className="border-gray-400 border-1"
                />
              </td>
              <td className="border-b px-4 py-2 flex items-center gap-2">
                <img src={cctvImage} alt="Product" className="w-10 h-10 object-cover ml-10" />
                CCTV
              </td>
              <td className="border-b px-4 py-2">Traffic Management</td>
              <td className="border-b px-4 py-2">24</td>
              <td className="border-b px-4 py-2">
                <select name="stock" className="px-2 py-1 rounded border border-gray-300 bg-white">
                  <option value="in-stock">In-Stock</option>
                  <option value="out-stock">Out of Stock</option>
                </select>
              </td>
              <td className="border-b px-4 py-2">
                <div className="flex gap-2 items-center justify-center">
                  <button
                    className="px-3 py-2 rounded-md border-none cursor-pointer text-blue-600"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    className="px-3 py-2 rounded-md border-none cursor-pointer text-red-600"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </td>
            </tr>

            <tr className="text-center my-2">
              <td className="border-b px-4 py-2">
                <input
                  type="checkbox"
                  className="border-gray-400 border-1"
                />
              </td>
              <td className="border-b px-4 py-2 flex items-center gap-2">
                <img src={fireImage} alt="Product" className="w-10 h-10 object-cover ml-10" />
                Fire Alarm
              </td>
              <td className="border-b px-4 py-2">BMS</td>
              <td className="border-b px-4 py-2">30</td>
              <td className="border-b px-4 py-2">
                <select name="stock" className="px-2 py-1 rounded border border-gray-300 bg-white">
                  <option value="in-stock">In-Stock</option>
                  <option value="out-stock">Out of Stock</option>
                </select>
              </td>
              <td className="border-b px-4 py-2">
                <div className="flex gap-2 items-center justify-center">
                  <button
                    className="px-3 py-2 rounded-md border-none cursor-pointer text-blue-600"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    className="px-3 py-2 rounded-md border-none cursor-pointer text-red-600"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </td>
            </tr>

            <tr className="text-center my-2">
              <td className="border-b px-4 py-2">
                <input
                  type="checkbox"
                  className="border-gray-400 border-1"
                />
              </td>
              <td className="border-b px-4 py-2 flex items-center gap-2">
                <img src={blinkerImage} alt="Product" className="w-10 h-10 object-cover ml-10" />
                Solar Traffic Blinkers
              </td>
              <td className="border-b px-4 py-2">Traffic Signals</td>
              <td className="border-b px-4 py-2">40</td>
              <td className="border-b px-4 py-2">
                <select name="stock" className="px-2 py-1 rounded border border-gray-300 bg-white">
                  <option value="in-stock">In-Stock</option>
                  <option value="out-stock">Out of Stock</option>
                </select>
              </td>
              <td className="border-b px-4 py-2">
                <div className="flex gap-2 items-center justify-center">
                  <button
                    className="px-3 py-2 rounded-md border-none cursor-pointer text-blue-600"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    className="px-3 py-2 rounded-md border-none cursor-pointer text-red-600"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;

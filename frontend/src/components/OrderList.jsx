import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { TbFilterEdit } from "react-icons/tb";

const OrderList = () => {

  return (
    <div className="p-5 rounded-xl bg-[#f8f8fa]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl mx-3">
          Order List <br />
          <span className="font-normal text-sm">Manage your orders</span>
        </h1>
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
              <th className="p-4 w-1/12">
                <input
                  type="checkbox"
                  className="border-gray-400 border-1"
                />
              </th>
              <th className="p-2 w-2/12">Date</th>
              <th className="p-2 w-1/12">Order no.</th>
              <th className="p-2 w-1/12">Name</th>
              <th className="p-2 w-1/12">City</th>
              <th className="p-2 w-2/12">Product Name</th>
              <th className="p-2 w-1/12">Category</th>
              <th className="p-2 w-1/12">Quantity</th>
              <th className="p-2 w-1/12">Stock</th>
              <th className="p-2 w-1/12">Status</th>
              <th className="p-2 w-1/12">Action</th>
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
              <td className="border-b px-4 py-2">
                <div className="flex justify-center">
                  12 july 2024  
                </div>
              </td>
              <td className="border-b px-4 py-2">12ab23</td>
              <td className="border-b px-4 py-2">Rahul</td>
              <td className="border-b px-4 py-2">Agra</td>
              <td className="border-b px-4 py-2">Red Beam</td>
              <td className="border-b px-4 py-2">Signals</td>
              <td className="border-b px-4 py-2">4</td>
              <td className="border-b px-4 py-2">Available</td>
              <td className="border-b px-4 py-2">
                <select name="stock" className="px-2 py-1 rounded border border-gray-300 bg-white">
                  <option value="select">Select Status</option>
                  <option value="approve">Pending</option>
                  <option value="disapprove">Delievered</option>
                </select>
              </td>
              <td className="border-b px-4 py-2">
                <select name="stock" className="px-2 py-1 rounded border border-gray-300 bg-white">
                  <option value="select">Select Action</option>
                  <option value="approve">Approve</option>
                  <option value="disapprove">Dis Approve</option>
                </select>
              </td>
            </tr>

            <tr className="text-center my-2">
              
              <td className="border-b px-4 py-2">
                <input
                  type="checkbox"
                  className="border-gray-400 border-1"
                />
              </td>
              <td className="border-b px-4 py-2">
                <div className="flex justify-center">
                  12 july 2024  
                </div>
              </td>
              <td className="border-b px-4 py-2">12ab23</td>
              <td className="border-b px-4 py-2">Mayank</td>
              <td className="border-b px-4 py-2">Noida</td>
              <td className="border-b px-4 py-2">ELV</td>
              <td className="border-b px-4 py-2">BMS</td>
              <td className="border-b px-4 py-2">3</td>
              <td className="border-b px-4 py-2">Available</td>
              <td className="border-b px-4 py-2">
                <select name="stock" className="px-2 py-1 rounded border border-gray-300 bg-white">
                  <option value="select">Select Status</option>
                  <option value="approve">Pending</option>
                  <option value="disapprove">Delievered</option>
                </select>
              </td>
              <td className="border-b px-4 py-2">
                <select name="stock" className="px-2 py-1 rounded border border-gray-300 bg-white">
                  <option value="select">Select Action</option>
                  <option value="approve">Approve</option>
                  <option value="disapprove">Dis Approve</option>
                </select>
              </td>
            </tr>

            <tr className="text-center my-2">
              
              <td className="border-b px-4 py-2">
                <input
                  type="checkbox"
                  className="border-gray-400 border-1"
                />
              </td>
              <td className="border-b px-4 py-2">
                <div className="flex justify-center">
                  12 july 2024  
                </div>
              </td>
              <td className="border-b px-4 py-2">16t223</td>
              <td className="border-b px-4 py-2">Aayush</td>
              <td className="border-b px-4 py-2">Delhi</td>
              <td className="border-b px-4 py-2">Red Beam</td>
              <td className="border-b px-4 py-2">Traffic Signals</td>
              <td className="border-b px-4 py-2">4</td>
              <td className="border-b px-4 py-2">Available</td>
              <td className="border-b px-4 py-2">
                <select name="stock" className="px-2 py-1 rounded border border-gray-300 bg-white">
                  <option value="select">Select Status</option>
                  <option value="approve">Pending</option>
                  <option value="disapprove">Delievered</option>
                </select>
              </td>
              <td className="border-b px-4 py-2">
                <select name="stock" className="px-2 py-1 rounded border border-gray-300 bg-white">
                  <option value="select">Select Action</option>
                  <option value="approve">Approve</option>
                  <option value="disapprove">Dis Approve</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;

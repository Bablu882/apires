import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbFilterEdit } from "react-icons/tb";
import { Link } from "react-router-dom";

const AddSubCategory = () => {
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [parentCategory, setParentCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  const handleAddSubCategory = () => {
    // Handle add subcategory logic here
    console.log("Parent Category:", parentCategory);
    console.log("Sub Category Name:", subCategoryName);
    setShowSubCategoryModal(false);
  };

  return (
    <div className="p-5 rounded-xl bg-[#f8f8fa]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl mx-3">
          Product Sub Category list <br />
          <span className="font-normal text-sm">View/Search product Category</span>
        </h1>

        <div className="flex justify-end mx-2">
          <button
            onClick={() => setShowSubCategoryModal(true)}
            className="bg-orange-400 hover:bg-[#1d1d58] rounded px-4 py-2 text-white font-semibold flex items-center"
          >
            <FaPlus className="mr-2" /> Add Sub Category
          </button>
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
              <th className="p-2 w-1/5">Parent Category Name</th>
              <th className="p-2 w-1/5">Sub Category Name</th>
              <th className="p-2 w-1/5">Action</th>
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
                  Red Signal
                </div>
              </td>
              <td className="border-b px-4 py-2">Signals</td>
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

      {showSubCategoryModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[40%] h-[45%]">
            <h2 className="text-2xl font-semibold mb-8">Add Product Sub Category</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Parent Category</label>
              <select
                value={parentCategory}
                onChange={(e) => setParentCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none border-gray-300 focus:border-orange-400 bg-white text-gray-500"
              >
                <option value="">Choose Parent Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Sub Category Name</label>
              <input
                type="text"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
              />
            </div>
            <div className="flex justify-start mt-5">
              <button
                onClick={handleAddSubCategory}
                className="px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded text-white font-semibold"
              >
                Submit
              </button>
              <button
                onClick={() => setShowSubCategoryModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded ml-3 text-white"
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

export default AddSubCategory;

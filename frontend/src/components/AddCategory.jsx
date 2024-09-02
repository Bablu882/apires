import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbFilterEdit } from "react-icons/tb";

const AddCategory = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCategory = () => {
    // Handle the add category logic here
    console.log("Category Name:", categoryName);
    console.log("Sub Category:", subCategory);
    console.log("Description:", description);
    setShowAddCategoryModal(false);
  };

  return (
    <div className="p-5 rounded-xl bg-[#f8f8fa]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl mx-3">
          Product Category List <br />
          <span className="font-normal text-sm">Manage your product category</span>
        </h1>

        <div className="flex justify-end mx-2">
          <button
            className="bg-orange-400 hover:bg-[#1d1d58] rounded px-4 py-2 text-white font-semibold flex items-center"
            onClick={() => setShowAddCategoryModal(true)}
          >
            <FaPlus className="mr-2" /> Add Category
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
              <th className="p-2 w-1/5">Category Name</th>
              <th className="p-2 w-1/5">Sub Category Name</th>
              <th className="p-2 w-1/5">Description</th>
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
              <td className="border-b px-4 py-2">Traffic Signals</td>
              <td className="border-b px-4 py-2">50</td>
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
              <td className="border-b px-4 py-2">
                <div className="flex justify-center">
                  Digital Display Board
                </div>
              </td>
              <td className="border-b px-4 py-2">Traffic Signals</td>
              <td className="border-b px-4 py-2">35</td>
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
              <td className="border-b px-4 py-2">
                <div className="flex justify-center">
                  Fire Alarm
                </div>
              </td>
              <td className="border-b px-4 py-2">BMS</td>
              <td className="border-b px-4 py-2">20</td>
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
              <td className="border-b px-4 py-2">
                <div className="flex justify-center">
                ELV 
                </div>
              </td>
              <td className="border-b px-4 py-2">BMS</td>
              <td className="border-b px-4 py-2">24</td>
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
              <td className="border-b px-4 py-2">
                <div className="flex justify-center">
                HVAC Works 
                </div>
              </td>
              <td className="border-b px-4 py-2">BMS</td>
              <td className="border-b px-4 py-2">15</td>
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

      {showAddCategoryModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[40%] h-[40%]">
            <h2 className="text-2xl font-semibold mb-8">Add Product Category</h2>
            <div className="flex gap-4 mb-3">
              <input
                type="text"
                placeholder="Category Name"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:border-orange-400"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <select
                className="w-1/2 px-3 py-2 border border-gray-300 rounded bg-white focus:border-orange-400"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="">Select Sub Category</option>
                {/* Add sub category options here */}
                <option value="sub1">Sub Category 1</option>
                <option value="sub2">Sub Category 2</option>
              </select>
            </div>
            <textarea
              placeholder="Description"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-3 focus:border-orange-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-start">
              <button
                className="px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded text-white font-semibold"
                onClick={handleAddCategory}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded ml-3"
                onClick={() => setShowAddCategoryModal(false)}
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

export default AddCategory;

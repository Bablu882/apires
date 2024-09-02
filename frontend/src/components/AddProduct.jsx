import React, { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { MdOutlineCloudUpload } from "react-icons/md";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  return (
    <div className="p-5 rounded-xl bg-[#f8f8fa]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl mx-3">
          Add Product <br />
          <span className="font-normal text-sm">Create new product</span>
        </h1>
      </div>

      <div className="mt-5 overflow-x-auto text-black bg-[#FFFFFF] mx-2" style={{ width: '99%', border: '1px solid #DBDBDB', borderRadius: '5px' }}>
        <form className="p-5">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-400 bg-white text-gray-500"
              >
                <option value="">Choose Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Sub Category</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-400 bg-white text-gray-500"
              >
                <option value="">Choose Sub Category</option>
                <option value="subcategory1">Subcategory 1</option>
                <option value="subcategory2">Subcategory 2</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
            <div {...getRootProps()} className="w-full p-5 border-2 border-gray-200 rounded-md text-center cursor-pointer">
              <input {...getInputProps()} />
              <MdOutlineCloudUpload size={40} className="mx-auto text-orange-400 mb-2" />
              <p>Drag and drop a file to upload</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {files.map((file) => (
                <div key={file.name} className="w-20 h-20 relative">
                  <img
                    src={file.preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="px-8 py-3 bg-orange-400 text-white font-semibold rounded-md hover:bg-orange-500">
            Submit
          </button>
          <Link to="/dashboard?tab=productlist">
            <button type="submit" className="px-8 py-3 mx-5 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-700">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

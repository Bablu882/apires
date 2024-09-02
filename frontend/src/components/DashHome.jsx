import React from "react";
import { FaBox, FaLaptop } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const DashHome = () => {
  return (
  <div className="mt-8 bg-[#F4F5FA]">
    <div className="flex gap-3 justify-between mx-4">
    
    <div className="bg-white rounded border pb-4 flex flex-col gap-2 cursor-pointer ml-1" style={{ width: '27%' }}>
      <div className="flex justify-start gap-2">
        <div className="p-3 rounded-3xl mx-5 mt-6" style={{ backgroundColor: 'rgba(255, 165, 0, 0.1)' }}>
          <MdPeopleAlt size={25} style={{ color: 'orange' }} />
        </div>
        <span className="text-xl font-bold mt-4 text-black">102+</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-medium text-black" style={{marginTop:"-30px", marginLeft:"30px"}}>Total Employees</span>
      </div>
    </div>

    <div className="bg-white rounded border pb-4 flex flex-col gap-2 cursor-pointer ml-2" style={{ width: '27%' }}>
      <div className="flex justify-start gap-2">
        <div className="p-3 rounded-3xl mx-5 mt-6" style={{ backgroundColor: 'rgba(0, 128, 0, 0.1)' }}>
          <MdPeopleAlt size={25} className="text-green-500" />
        </div>
        <span className="text-xl font-bold mt-4 text-black">102+</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-medium text-black" style={{marginTop:"-30px", marginLeft:"30px"}}>Total Employees</span>
      </div>
    </div>

    <div className="bg-white rounded border pb-4 flex flex-col gap-2 cursor-pointer ml-2" style={{ width: '27%' }}>
      <div className="flex justify-start gap-2">
        <div className="p-3 rounded-3xl mx-5 mt-6" style={{ backgroundColor: 'rgba(135, 206, 235, 0.2)' }}>
          <MdPeopleAlt size={25} className="text-blue-400" />
        </div>
        <span className="text-xl font-bold mt-4 text-black">102+</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-medium text-black" style={{marginTop:"-30px", marginLeft:"30px"}}>Total Employees</span>
      </div>
    </div>

    <div className="bg-white rounded border pb-4 flex flex-col gap-2 cursor-pointer ml-2" style={{ width: '27%' }}>
      <div className="flex justify-start gap-2">
        <div className="p-3 rounded-3xl mx-5 mt-6" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}>
          <MdPeopleAlt size={25} className="text-red-600" />
        </div>
        <span className="text-xl font-bold mt-4 text-black">102+</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-medium text-black" style={{marginTop:"-30px", marginLeft:"30px"}}>Total Employees</span>
      </div>
    </div>

    </div>

    <div className="flex gap-3 justify-between mt-4 mx-4">
    
    <div className="bg-orange-400 rounded-lg border pb-4 flex flex-col gap-2 cursor-pointer ml-1" style={{ width: '28%' }}>
      <div className="flex justify-between items-center px-5 mt-4">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white">102+</span>
          <span className="font-medium text-white">Total Employees</span>
        </div>
        <div>
          <MdPeopleAlt size={60} style={{ color: 'white' }} />
        </div>
      </div>
    </div>

    <div className="bg-sky-400 rounded-lg border pb-4 flex flex-col gap-2 cursor-pointer ml-2" style={{ width: '28%' }}>
      <div className="flex justify-between items-center px-5 mt-4">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white">102+</span>
          <span className="font-medium text-white">Total Employees</span>
        </div>
        <div>
          <MdPeopleAlt size={60} style={{ color: 'white' }} />
        </div>
      </div>
    </div>

    <div className="bg-slate-900 rounded-lg border pb-4 flex flex-col gap-2 cursor-pointer ml-2" style={{ width: '28%' }}>
      <div className="flex justify-between items-center px-5 mt-4">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white">102+</span>
          <span className="font-medium text-white">Total Employees</span>
        </div>
        <div>
          <MdPeopleAlt size={60} style={{ color: 'white' }} />
        </div>
      </div>
    </div>

    <div className="bg-green-500 rounded-lg border pb-4 flex flex-col gap-2 cursor-pointer ml-2" style={{ width: '28%' }}>
      <div className="flex justify-between items-center px-5 mt-4">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white">102+</span>
          <span className="font-medium text-white">Total Employees</span>
        </div>
        <div>
          <MdPeopleAlt size={60} style={{ color: 'white' }} />
        </div>
      </div>
    </div>

    </div>
  </div>
  )
};

export default DashHome;

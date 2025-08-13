import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: "Home", icon: <FaHome /> },
    { title: "Profile", icon: <FaUser /> },
    { title: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#fff9e6] to-[#f7e9c6] text-[#5a4a2f]">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-20 h-full w-64 bg-[#f5deb3] shadow-lg flex flex-col px-4 py-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end">
          <button onClick={() => setIsOpen(false)} className="text-2xl">
            <FaTimes />
          </button>
        </div>

        <h1 className="text-2xl font-bold border-b pb-4 mb-6 text-[#a2783a]">
          My Dashboard
        </h1>

        <nav className="flex flex-col gap-4">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#e6d3a8] transition"
            >
              <span className="text-lg">{item.icon}</span>
              {item.title}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t">
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#e6d3a8] transition text-red-500">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-[#fff5e1] px-4 py-3 shadow-md sticky top-0">
          <h2 className="text-lg font-semibold text-[#a2783a]">
            Welcome, Sumit!
          </h2>
          {/* Menu Button for Mobile */}
          <button
            className="md:hidden text-2xl text-[#a2783a]"
            onClick={() => setIsOpen(true)}
          >
            <FaBars />
          </button>
        </header>

        {/* Dashboard Main Content */}
        <main className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Example */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-[#a2783a]">
                Profile Overview
              </h3>
              <p className="text-gray-600 mt-2">
                View and manage your profile information here.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-[#a2783a]">
                Analytics
              </h3>
              <p className="text-gray-600 mt-2">
                Track your latest stats and performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-[#a2783a]">
                Notifications
              </h3>
              <p className="text-gray-600 mt-2">
                Stay updated with recent alerts and activity.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

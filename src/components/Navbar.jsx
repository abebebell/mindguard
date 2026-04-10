import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  LogOut,
  FileText,
  ShieldCheck,
  Headphones,
  ChevronDown,
} from "lucide-react";

// Pastikan path logo ini sesuai dengan letak file gambarmu
import MyCustomIcon from "../assets/icon-mindguard.png";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("hari ini");

  const navigate = useNavigate();

  const dayOptions = [
    "Hari Ini",
    "Kemarin",
    "2 Hari Lalu",
    "3 Hari Lalu",
    "4 Hari Lalu",
    "5 Hari Lalu",
    "6 Hari Lalu",
    "7 Hari Lalu",
  ];

  const handleSelectDay = (dayLabel, index) => {
    setSelectedDate(dayLabel.toLowerCase());
    setShowDropdown(false);
    // Navigasi ke history dengan filter
    navigate(`/history?filter=${index}`);
  };

  const handleHistoryClick = () => {
    setSelectedDate("semua riwayat");
    setShowDropdown(false);
    navigate("/history");
  };

  return (
    <nav className="bg-[#0077C0] px-6 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50">
      {/* LEFT SIDE: LOGO & NAME */}
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={() => navigate("/")}
      >
        <div className="bg-white p-1.5 rounded-xl shadow-inner">
          <img
            src={MyCustomIcon}
            alt="MindGuard Logo"
            className="w-7 h-7 object-contain"
          />
        </div>
        <span className="text-white font-black text-xl tracking-tighter">
          MINDGUARD
        </span>
      </div>

      {/* CENTER MENU: NAVIGATION */}
      <div className="hidden md:flex items-center gap-10 text-white font-bold text-sm">
        <button
          onClick={handleHistoryClick}
          className="flex items-center gap-2 hover:text-blue-200 transition-colors"
        >
          <FileText size={18} />
          HISTORY
        </button>

        <button
          onClick={() => navigate("/analysis")}
          className="flex items-center gap-2 hover:text-blue-200 transition-colors"
        >
          <ShieldCheck size={18} />
          ANALISIS
        </button>

        <button
          onClick={() => navigate("/bantuan")}
          className="flex items-center gap-2 hover:text-blue-200 transition-colors"
        >
          <Headphones size={18} />
          BANTUAN
        </button>
      </div>

      {/* RIGHT SIDE: TOOLS & PROFILE */}
      <div className="flex items-center gap-4 text-white">
        {/* DROPDOWN FILTER */}
        <div className="relative">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-[#005C99] text-white px-4 py-2 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-[#004d80] transition-all min-w-[140px] justify-between border border-blue-400/30 shadow-md"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest">
              {selectedDate}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
              {dayOptions.map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectDay(day, index)}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium border-b border-gray-50 last:border-0"
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NOTIFICATION */}
        <div className="relative p-2 hover:bg-white/10 rounded-full cursor-pointer transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0077C0]"></span>
        </div>

        {/* PROFILE */}
        <div className="bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/30 transition-all border border-white/10">
          <User size={20} />
        </div>

        {/* LOGOUT */}
        <button 
          onClick={() => console.log("Logout Clicked")}
          className="ml-2 p-2 text-blue-100 hover:text-white transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}
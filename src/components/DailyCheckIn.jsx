import React from "react";
import { useNavigate } from "react-router-dom";

export default function DailyCheckIn() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dailycheckin")}
      className="flex-1 bg-white rounded-[25px] md:rounded-[35px] p-6 md:p-8 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all flex items-center justify-center border border-slate-100 active:bg-slate-50 group"
    >
      <span className="text-2xl md:text-3xl font-extrabold text-slate-700 tracking-tight group-hover:text-cyan-500 transition-colors">
        daily check-in
      </span>
    </button>
  );
}

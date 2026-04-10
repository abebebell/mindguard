import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Trash2,
  Moon,
  Droplets,
  Activity,
  Coffee,
} from "lucide-react";

const History = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const filterParam = query.get("filter");

  const [filteredLogs, setFilteredLogs] = useState([]);
  const [activeFilterLabel, setActiveFilterLabel] = useState("Semua Riwayat");

  useEffect(() => {
    const rawData = JSON.parse(
      localStorage.getItem("mindguard_history") || "[]",
    );
    const labels = [
      "Hari Ini",
      "Kemarin",
      "2 Hari Lalu",
      "3 Hari Lalu",
      "4 Hari Lalu",
      "5 Hari Lalu",
      "6 Hari Lalu",
      "7 Hari Lalu",
    ];

    if (filterParam !== null) {
      const daysBack = parseInt(filterParam);
      const targetDate = new Date();
      targetDate.setHours(0, 0, 0, 0);
      targetDate.setDate(targetDate.getDate() - daysBack);

      const result = rawData.filter((log) => {
        const logDate = new Date(log.id);
        logDate.setHours(0, 0, 0, 0);
        return logDate.getTime() === targetDate.getTime();
      });

      setFilteredLogs(result);
      setActiveFilterLabel(
        labels[daysBack] || `Tanggal ${targetDate.toLocaleDateString("id-ID")}`,
      );
    } else {
      setFilteredLogs(rawData);
      setActiveFilterLabel("Semua Riwayat");
    }
  }, [filterParam]);

  // --- LOGIKA TARGET UNTUK STATISTIK ---
  const getStats = (type, value) => {
    let percentage = 0;
    let color = "bg-slate-200";
    let msg = "";

    if (type === "minum") {
      percentage = Math.min((value / 8) * 100, 100);
      if (value >= 8) {
        msg = "Sangat Bagus";
        color = "bg-emerald-500";
      } else if (value >= 5) {
        msg = "Cukup";
        color = "bg-amber-500";
      } else {
        msg = "Kurang";
        color = "bg-rose-500";
      }
    } else if (type === "tidur") {
      percentage = Math.min((value / 8) * 100, 100);
      if (value >= 8) {
        msg = "Optimal";
        color = "bg-emerald-500";
      } else if (value >= 5) {
        msg = "Cukup";
        color = "bg-amber-500";
      } else {
        msg = "Kurang";
        color = "bg-rose-500";
      }
    } else {
      // Olahraga & Istirahat
      percentage = Math.min((value / 1) * 100, 100);
      if (value >= 1) {
        msg = "Bagus";
        color = "bg-emerald-500";
      } else {
        msg = "Minimal";
        color = "bg-sky-400";
      }
    }

    return { percentage, color, msg };
  };

  const handleClear = () => {
    if (window.confirm("Hapus semua riwayat log?")) {
      localStorage.removeItem("mindguard_history");
      setFilteredLogs([]);
    }
  };

  // Komponen Kecil untuk Bar Statistik
  const StatBar = ({ icon: Icon, label, value, unit, stats }) => (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase italic">
          <Icon size={12} className="text-sky-400" /> {label}
        </div>
        <span className="text-[9px] font-bold text-slate-400">
          {value}
          {unit} / Target
        </span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${stats.color} transition-all duration-700 ease-out`}
          style={{ width: `${stats.percentage}%` }}
        />
      </div>
      <p className="text-[9px] font-black uppercase tracking-tighter text-right text-slate-400">
        {stats.msg}
      </p>
    </div>
  );

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-10 py-8 bg-sky-50 font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sky-800 font-black text-sm uppercase hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft size={20} /> Kembali
        </button>
        <button
          onClick={handleClear}
          className="text-rose-500 font-bold text-[10px] uppercase border border-rose-100 px-3 py-2 rounded-xl hover:bg-rose-50 transition-all flex items-center gap-1"
        >
          <Trash2 size={14} /> Hapus Data
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-5xl font-black text-sky-900 tracking-tighter mb-3">
          MY <span className="text-sky-300">STATS</span>
        </h2>
        <div className="px-5 py-2 bg-sky-500 text-white text-[10px] font-black rounded-2xl inline-block uppercase italic shadow-xl shadow-sky-200 tracking-widest">
          {activeFilterLabel}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLogs.length === 0 ? (
          <div className="col-span-full text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-sky-200">
            <Clock className="mx-auto mb-4 text-sky-100" size={64} />
            <p className="text-sky-400 font-bold text-sm uppercase tracking-widest text-center">
              Belum ada riwayat aktivitas
            </p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-white rounded-[40px] p-8 shadow-sm border border-transparent hover:border-sky-200 transition-all group flex flex-col gap-6"
            >
              {/* Top Info */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-500 p-3 rounded-2xl text-white shadow-lg shadow-sky-100">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-sky-300 uppercase tracking-widest leading-none mb-1">
                      {new Date(log.id).toLocaleDateString("id-ID", {
                        weekday: "long",
                      })}
                    </p>
                    <h4 className="text-sm font-black text-slate-800 uppercase leading-none">
                      {new Date(log.id).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </h4>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className="text-slate-200 group-hover:text-sky-400 transition-colors"
                />
              </div>

              {/* Stats Progress Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <StatBar
                  icon={Moon}
                  label="Tidur"
                  value={log.data.tidur_jam}
                  unit="j"
                  stats={getStats("tidur", log.data.tidur_jam)}
                />
                <StatBar
                  icon={Droplets}
                  label="Minum"
                  value={log.data.minum_gelas}
                  unit="gls"
                  stats={getStats("minum", log.data.minum_gelas)}
                />
                <StatBar
                  icon={Activity}
                  label="Olahraga"
                  value={log.data.olahraga_jam}
                  unit="j"
                  stats={getStats("olahraga", log.data.olahraga_jam)}
                />
                <StatBar
                  icon={Coffee}
                  label="Istirahat"
                  value={log.data.istirahat_jam}
                  unit="j"
                  stats={getStats("istirahat", log.data.istirahat_jam)}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <div className="h-20" />
    </div>
  );
};

export default History;

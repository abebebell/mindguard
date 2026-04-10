import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function StreakCard() {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const dayNames = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];

  useEffect(() => {
    // Ambil data terbaru setiap kali komponen dimuat
    const savedStreak = parseInt(localStorage.getItem('streak_count')) || 0;
    const savedLongest = parseInt(localStorage.getItem('longest_streak')) || 0;
    const lastDate = localStorage.getItem('last_checkin_date');
    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Logika Reset: Jika terakhir check-in bukan hari ini dan bukan kemarin, reset ke 0
    if (lastDate !== today && lastDate !== yesterdayStr) {
      setStreak(0);
      localStorage.setItem('streak_count', 0);
    } else {
      setStreak(savedStreak);
    }

    setLongestStreak(savedLongest);
  }, []);

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 w-full max-w-2xl mt-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-black text-black">Streak</h3>
          <p className="text-gray-600 text-sm leading-tight max-w-sm mt-1">
            Bukan sekedar angka, streak bantu anda cegah burn out yang solid dan berlanjut
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end mb-8">
        <div className="flex items-center gap-1">
          <span className="text-6xl font-black text-black">{streak}</span>
          <Zap size={44} fill="#FFD700" color="#FFD700" className="mb-2" />
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-orange-500 text-lg">🔥</span>
          <span className="text-gray-500 font-bold text-sm">Streak terlama</span>
          <span className="text-black font-black text-xl">{longestStreak}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1)] p-6 border border-gray-50">
        <div className="flex justify-between items-center px-2">
          {dayNames.map((day, index) => {
            // Logika nyala: jika hari ini adalah index tersebut (bisa dikembangkan lebih detail)
            const isActive = streak > index;
            return (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="flex flex-col items-center">
                  <Zap 
                    size={28} 
                    fill={isActive ? "#FFD700" : "#000"} 
                    strokeWidth={0}
                  />
                  <div className={`w-9 h-3 rounded-[100%] mt-1.5 ${
                    isActive ? 'bg-[#FFD700] shadow-[0_4px_12px_rgba(255,215,0,0.6)]' : 'bg-black'
                  }`} />
                </div>
                <span className={`text-[11px] font-bold uppercase ${isActive ? 'text-black' : 'text-gray-400'}`}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
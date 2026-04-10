import React from 'react';
import Navbar from '../components/Navbar';

const Bantuan = () => {
  return (
    <div className="min-h-screen bg-[#92caef] flex flex-col font-sans">
      <Navbar />

      {/* pt-10 untuk menarik konten lebih ke atas dibanding sebelumnya */}
      <div className="flex-grow flex flex-col items-center justify-start px-4 pt-10">
        
        {/* Judul: Dipaksa !text-black agar tidak berubah jadi putih, font-black untuk ketebalan maksimal */}
        <h1 className="text-2xl md:text-3xl font-black !text-black text-center mb-4 leading-tight lowercase">
          selamat datang di <br /> mind guard bantuan
        </h1>

        {/* Paragraf: Dibuat lebih rapat ke judul dengan mb-8 */}
        <p className="max-w-[360px] text-[12px] !text-black text-center mb-8 leading-relaxed font-bold">
          We would love to help you, but don't be shy. We promise we will process 
          your data in accordance with all laws of confidentiality.
        </p>
        <br />

        {/* Container Input */}
        <div className="w-full max-w-[280px] flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full py-2.5 px-6 rounded-full bg-white !text-gray-800 focus:outline-none shadow-md placeholder-gray-400 text-xs font-semibold"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full py-2.5 px-6 rounded-full bg-white !text-gray-800 focus:outline-none shadow-md placeholder-gray-400 text-xs font-semibold"
          />
          
          <button className="w-full bg-[#005596] hover:bg-[#00447a] text-white font-bold py-3 rounded-full mt-6 transition duration-200 text-[11px] uppercase tracking-wider shadow-lg">
            CHAT WITH US
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bantuan;
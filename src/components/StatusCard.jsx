import React, { useEffect, useState } from "react";

export default function StatusCard() {
  const [status, setStatus] = useState("Belum ada data");
  const [note, setNote] = useState("");

  useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem("mindguard_history") || "[]",
    );

    if (history.length > 0) {
      setStatus(history[0].status);
      setNote(history[0].note);
    }
  }, []);

  return (
    <div
      className="flex-1 bg-white rounded-[25px] md:rounded-[35px] 
                  p-6 md:p-8 shadow-sm hover:shadow-md 
                  transition-all border border-slate-100 
                  flex items-center"
    >
      <div>
        <h2 className="text-lg md:text-xl font-extrabold text-slate-700">
          Status Hari Ini
        </h2>

        <p
          className={`text-base font-bold mt-1 ${
            status === "Pola Hidup Sehat" ? "text-green-500" : "text-red-500"
          }`}
        >
          {status}
        </p>

        {note && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{note}</p>
        )}
      </div>
    </div>
  );
}

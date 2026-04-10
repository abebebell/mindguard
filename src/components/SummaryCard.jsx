export default function SummaryCard({ title, value = 0, max, color }) {
  // Hitung persentase, pastikan tidak lebih dari 100% agar bar tidak keluar kotak
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div
      className="bg-white shadow-xl rounded-2xl p-6 lg:p-8 w-full hover:shadow-2xl transition-all duration-300"
      style={{
        borderColor: color,
        borderWidth: 3,
        borderStyle: "solid",
      }}
    >
      {/* Judul Card - Pakai text-gray-800 agar konsisten dengan card lainnya */}
      <h3 className="font-semibold text-lg text-gray-800 mb-1">{title}</h3>

      {/* Nilai / Progress */}
      <p className="text-xl font-bold text-gray-700">
        {value} <span className="text-gray-400 font-medium">/ {max}</span>
      </p>

      {/* Progress Bar Container */}
      <div className="bg-gray-100 h-2.5 mt-4 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: percent + "%",
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

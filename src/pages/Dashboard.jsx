import Navbar from "../components/Navbar";
import DailyCheckIn from "../components/DailyCheckIn";
import SummaryCard from "../components/SummaryCard";
import FeatureCard from "../components/FeatureCard";
import StreakCard from "../components/StreakCard";
import StatusCard from "../components/StatusCard";
import MyCustomIcon from "../assets/icon-mindguard.png";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Banner Selamat Datang */}
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-8 lg:p-12 rounded-3xl mb-8 shadow-2xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            Halo, Selamat Datang!
          </h1>
          <p className="text-lg opacity-95">
            Cegah burnout dengan hidup seimbang hari ini
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatusCard />
          <DailyCheckIn />
        </div>

        <h2 className="!text-2xl lg:text-3xl font-bold mt-12 mb-6">
          Ringkasan Hari Ini
        </h2>

        {/* Ringkasan: Value diubah ke 0 semua karena belum diisi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <SummaryCard title="Fokus Aktif" value={0} max={60} color="#FBBF24" />
          <SummaryCard title="Hidrasi" value={0} max={8} color="#3B82F6" />
          <SummaryCard title="Aktivitas" value={0} max={180} color="#10B981" />
          <SummaryCard title="Istirahat" value={0} max={5} color="#EF4444" />
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold mb-6">Pengingat</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          <FeatureCard title="Pola Tidur" />
          <FeatureCard title="Break Reminder" />
          <FeatureCard title="Activity Tracker" />
          <FeatureCard title="Drink Reminder" />
        </div>

        <StreakCard />
      </div>
    </div>
  );
}

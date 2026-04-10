import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Minus, Save, Info } from "lucide-react";
import { saveHistory } from "../api/historyApi";

export default function DailyCheckinPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tidur_jam: 0,
    tidur_menit: 0,
    minum_gelas: 0,
    olahraga_jam: 0,
    olahraga_menit: 0,
    istirahat_jam: 0,
    istirahat_menit: 0,
  });

  const [predictions, setPredictions] = useState({
    tidur: "",
    minum: "",
    olahraga: "",
    istirahat: "",
  });

  const updateValue = (field, value) => {
    const val = Math.max(0, parseInt(value) || 0);
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const calculatePrediction = (category, value) => {
    if (category === "minum") {
      if (value >= 8) return "Sangat bagus!";
      if (value >= 5) return "Cukup, tingkatkan!";
      if (value >= 3) return "Kurang, minumnya tingkatkan!";
      return "Kurang minum sekali!";
    }

    if (category === "tidur") {
      if (value >= 8) return "Sangat bagus!";
      if (value >= 5) return "Cukup, tingkatkan!";
      return "Waktu tidur sangat kurang!";
    }

    if (category === "olahraga" || category === "istirahat") {
      if (value >= 1) return "Sangat bagus!";
      return "Coba luangkan waktu meskipun sebentar.";
    }

    return "";
  };

  const handlePredict = (category) => {
    const value =
      category === "minum" ? formData.minum_gelas : formData[`${category}_jam`];

    const message = calculatePrediction(category, value);

    setPredictions((prev) => ({
      ...prev,
      [category]: message,
    }));
  };

  const handleSave = async () => {
    try {
      const history = JSON.parse(
        localStorage.getItem("mindguard_history") || "[]",
      );

      const today = new Date().toLocaleDateString("id-ID");

      const alreadySubmitted = history.some((item) => {
        const itemDate = new Date(item.date).toLocaleDateString("id-ID");
        return itemDate === today;
      });

      if (alreadySubmitted) {
        alert(
          "Kamu sudah melakukan Daily Check-In hari ini.\nSilakan kembali besok.",
        );
        return;
      }

      const finalMinumNote =
        predictions.minum || calculatePrediction("minum", formData.minum_gelas);

      const finalTidurNote =
        predictions.tidur || calculatePrediction("tidur", formData.tidur_jam);

      const finalOlahragaNote =
        predictions.olahraga ||
        calculatePrediction("olahraga", formData.olahraga_jam);

      const finalIstirahatNote =
        predictions.istirahat ||
        calculatePrediction("istirahat", formData.istirahat_jam);

      // STATUS KESEHATAN

      const isSehat =
        formData.minum_gelas >= 5 &&
        formData.tidur_jam >= 7 &&
        formData.olahraga_jam >= 1 &&
        formData.istirahat_jam >= 1;

      const data = {
        user_id: 1,

        tidur_jam: formData.tidur_jam,
        minum_gelas: formData.minum_gelas,
        olahraga_jam: formData.olahraga_jam,
        istirahat_jam: formData.istirahat_jam,

        status: isSehat ? "Pola Hidup Sehat" : "Perlu Perhatian",

        note:
          `Minum: ${finalMinumNote} | ` +
          `Tidur: ${finalTidurNote} | ` +
          `Olahraga: ${finalOlahragaNote} | ` +
          `Istirahat: ${finalIstirahatNote}`,
      };

      await saveHistory(data);

      const newEntry = {
        id: Date.now(),
        date: new Date().toISOString(),
        data: formData,
        status: data.status,
        note: data.note,
      };

      localStorage.setItem(
        "mindguard_history",
        JSON.stringify([newEntry, ...history]),
      );

      alert("Data berhasil disimpan!");

      navigate("/history");
    } catch (error) {
      console.error("Save error:", error);
      alert("Gagal menyimpan data ke server");
    }
  };

  const InputCard = ({
    title,
    desc,
    category,
    children,
    btnLabel = "PREDIKSI",
  }) => (
    <div className="bg-white rounded-[35px] p-8 shadow-md border border-white/50 mb-6">
      <h3 className="font-extrabold text-gray-800 mb-2 uppercase text-lg">
        {title}
      </h3>

      {desc && (
        <p className="text-[10px] font-bold text-gray-400 mb-4 uppercase italic">
          {desc}
        </p>
      )}

      <div className="flex flex-col md:flex-row md:items-end gap-6">
        <div className="flex gap-4 flex-1">{children}</div>

        <button
          onClick={() => handlePredict(category)}
          className="bg-cyan-400 text-white font-black px-8 py-3 rounded-2xl text-[11px]"
        >
          {btnLabel}
        </button>
      </div>

      {predictions[category] && (
        <div className="mt-5 p-4 bg-sky-50 rounded-2xl border flex items-start gap-3">
          <Info size={18} className="text-sky-500" />

          <p className="text-[11px] font-black text-sky-800">
            HASIL: {predictions[category]}
          </p>
        </div>
      )}
    </div>
  );

  const NumberInput = ({ label, value, onChange }) => (
    <div className="flex-1">
      <label className="text-[10px] font-black text-gray-400 block mb-1.5 uppercase italic">
        {label}
      </label>

      <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3 border">
        <button onClick={() => onChange(value - 1)}>
          <Minus size={18} strokeWidth={3} />
        </button>

        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent w-full text-center font-black outline-none text-lg"
        />

        <button onClick={() => onChange(value + 1)}>
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sky-300 p-6 md:p-12 font-sans">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 w-12 h-12 bg-white/40 rounded-full flex items-center justify-center"
      >
        <ChevronLeft size={28} />
      </button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-10 uppercase">
          Daily Check-in
        </h1>

        <InputCard title="PREDIKSI KUALITAS TIDUR" category="tidur">
          <NumberInput
            label="JAM"
            value={formData.tidur_jam}
            onChange={(v) => updateValue("tidur_jam", v)}
          />

          <NumberInput
            label="MENIT"
            value={formData.tidur_menit}
            onChange={(v) => updateValue("tidur_menit", v)}
          />
        </InputCard>

        <InputCard
          title="PREDIKSI MINUM HARIAN"
          category="minum"
          desc="MASUKKAN JUMLAH GELAS"
          btnLabel="CEK TARGET"
        >
          <NumberInput
            label="JUMLAH GELAS"
            value={formData.minum_gelas}
            onChange={(v) => updateValue("minum_gelas", v)}
          />
        </InputCard>

        <InputCard title="PREDIKSI OLAHRAGA" category="olahraga">
          <NumberInput
            label="JAM"
            value={formData.olahraga_jam}
            onChange={(v) => updateValue("olahraga_jam", v)}
          />

          <NumberInput
            label="MENIT"
            value={formData.olahraga_menit}
            onChange={(v) => updateValue("olahraga_menit", v)}
          />
        </InputCard>

        <InputCard title="PREDIKSI ISTIRAHAT" category="istirahat">
          <NumberInput
            label="JAM"
            value={formData.istirahat_jam}
            onChange={(v) => updateValue("istirahat_jam", v)}
          />

          <NumberInput
            label="MENIT"
            value={formData.istirahat_menit}
            onChange={(v) => updateValue("istirahat_menit", v)}
          />
        </InputCard>

        <div className="flex justify-end mt-12 pb-20">
          <button
            onClick={handleSave}
            className="bg-cyan-600 text-white font-black px-12 py-5 rounded-[25px] shadow-2xl flex items-center gap-3"
          >
            <Save size={24} />
            SIMPAN KE RIWAYAT
          </button>
        </div>
      </div>
    </div>
  );
}
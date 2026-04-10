export default function FeatureCard({ title, icon }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 border rounded-2xl flex items-center justify-center">
        {icon}
      </div>

      <p className="mt-2 text-sm">{title}</p>
    </div>
  );
}

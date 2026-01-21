export default function AdminHome() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Pending submissions" value="12" />
        <StatCard title="Events live" value="24" />
        <StatCard title="Places in DB" value="138" />
      </div>
    </>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-5">
      <p className="text-white/40 text-sm">{title}</p>
      <p className="text-3xl font-semibold mt-2">{value}</p>
    </div>
  );
}

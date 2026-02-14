"use client";

import { useEffect, useState } from "react";

type Stats = {
  users: number;
  events: number;
  submissions: number;
  places: number;
  waitlist: {
    total: number;
    pending: number;
  };
};

export default function AdminHome() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/stats`)
      .then(r => r.json())
      .then(setStats);
  }, []);

  if (!stats) {
    return <p className="text-white/40">Loading dashboard…</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Users" value={stats.users} />
        <StatCard title="Events" value={stats.events} />
        <StatCard title="Places" value={stats.places} />
        <StatCard title="Submissions" value={stats.submissions} />
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <StatCard
          title="Waitlist total"
          value={stats.waitlist.total}
        />

        <StatCard
          title="Waitlist pending"
          value={stats.waitlist.pending}
          highlight
        />
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

"use client";

import { useEffect, useMemo, useState } from "react";
import UserEditModal from "@/components/admin/UserEditModal";

type User = {
  id: string;
  username?: string;
  nickname?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
};

type Waitlist = {
  id: string;
  full_name?: string;
  email: string;
  phone?: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

type Tab = "users" | "waitlist";

export default function AdminUsersPage() {
  const [tab, setTab] = useState<Tab>("users");

  const [users, setUsers] = useState<User[]>([]);
  const [waitlist, setWaitlist] = useState<Waitlist[]>([]);

  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<User | null>(null);

  // ------------------------------------
  // FETCH
  // ------------------------------------

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`).then(r => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/waitlist`).then(r => r.json()),
    ]).then(([u, w]) => {
      setUsers(u);
      setWaitlist(w);
      setLoading(false);
    });
  }, []);

  // ------------------------------------
  // USERS ACTIONS
  // ------------------------------------

  async function deleteUser(id: string) {
    if (!confirm("Delete this user?")) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`,
      { method: "DELETE" }
    );

    setUsers(prev => prev.filter(u => u.id !== id));
  }

  function updateUser(updated: User) {
    setUsers(prev =>
      prev.map(u => (u.id === updated.id ? updated : u))
    );
    setSelected(null);
  }

  // ------------------------------------
  // WAITLIST ACTIONS
  // ------------------------------------

  async function approve(id: string) {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/waitlist/${id}/approve`,
      { method: "POST" }
    );

    setWaitlist(prev =>
      prev.map(w => w.id === id ? { ...w, status: "approved" } : w)
    );
  }

  async function reject(id: string) {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/waitlist/${id}/reject`,
      { method: "POST" }
    );

    setWaitlist(prev =>
      prev.map(w => w.id === id ? { ...w, status: "rejected" } : w)
    );
  }

  async function deleteWaitlist(id: string) {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/waitlist/${id}`,
      { method: "DELETE" }
    );

    setWaitlist(prev => prev.filter(w => w.id !== id));
  }

  // ------------------------------------
  // FILTERS
  // ------------------------------------

  const filteredUsers = useMemo(() => {
    return users.filter(u =>
      `${u.username ?? ""} ${u.nickname ?? ""}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [users, query]);

  const filteredWaitlist = useMemo(() => {
    return waitlist.filter(w =>
      `${w.full_name ?? ""} ${w.email}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [waitlist, query]);

  if (loading) {
    return <p className="text-white/40">Loading…</p>;
  }

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="space-y-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-semibold">Users</h1>

          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={`Search ${tab === "users" ? "users" : "waitlist"}…`}
            className="bg-black border border-white/10 rounded-md px-3 py-2 text-sm w-full md:w-72"
          />
        </div>

        {/* ================= TABS ================= */}
        <div className="flex gap-2 border-b border-white/10 pb-2">
          <TabButton active={tab === "users"} onClick={() => setTab("users")}>
            Users ({users.length})
          </TabButton>

          <TabButton active={tab === "waitlist"} onClick={() => setTab("waitlist")}>
            Waitlist ({waitlist.length})
          </TabButton>
        </div>

        {/* ================= USERS ================= */}
        {tab === "users" && (
          <div className="space-y-3">
            {filteredUsers.map(u => (
              <div
                key={u.id}
                className="bg-[#0c0c0c] border border-white/5 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  {u.avatar_url ? (
                    <img src={u.avatar_url} className="h-12 w-12 rounded-full" />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                      👤
                    </div>
                  )}

                  <div>
                    <p className="font-medium">
                      {u.nickname || u.username || "Unnamed user"}
                    </p>
                    {u.username && (
                      <p className="text-white/40 text-sm">@{u.username}</p>
                    )}
                    <p className="text-xs text-white/30">
                      Joined {new Date(u.created_at).toLocaleDateString("it-IT")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelected(u)}
                    className="bg-white text-black px-3 py-1.5 rounded-md text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(u.id)}
                    className="bg-red-500/10 text-red-400 px-3 py-1.5 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= WAITLIST ================= */}
        {tab === "waitlist" && (
          <div className="space-y-3">
            {filteredWaitlist.map(w => (
              <div
                key={w.id}
                className="bg-[#0c0c0c] border border-white/5 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-1">
                  <p className="font-medium">{w.full_name || w.email}</p>
                  <p className="text-white/40 text-sm">{w.email}</p>
                  <p className="text-xs text-white/30">
                    {new Date(w.created_at).toLocaleDateString("it-IT")}
                  </p>
                </div>

                <div className="flex gap-2">
                  {w.status === "pending" && (
                    <>
                      <button
                        onClick={() => approve(w.id)}
                        className="bg-green-500/10 text-green-400 px-3 py-1.5 rounded-md text-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => reject(w.id)}
                        className="bg-yellow-500/10 text-yellow-400 px-3 py-1.5 rounded-md text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => deleteWaitlist(w.id)}
                    className="bg-red-500/10 text-red-400 px-3 py-1.5 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <UserEditModal
          user={selected}
          onClose={() => setSelected(null)}
          onSaved={updateUser}
        />
      )}
    </>
  );
}

/* ---------------- UI ---------------- */

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 text-sm rounded-t-md
        ${active
          ? "bg-white/10 text-white"
          : "text-white/40 hover:text-white"}
      `}
    >
      {children}
    </button>
  );
}

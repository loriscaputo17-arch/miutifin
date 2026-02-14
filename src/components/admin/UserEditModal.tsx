"use client";

import { useState } from "react";

type Props = {
  user: any;
  onClose: () => void;
  onSaved: (user: any) => void;
};

export default function UserEditModal({ user, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    username: user.username ?? "",
    nickname: user.nickname ?? "",
    bio: user.bio ?? "",
    avatar_url: user.avatar_url ?? "",
  });

  const [saving, setSaving] = useState(false);

  function update(k: string, v: string) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  async function save() {
    setSaving(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${user.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const updated = await res.json();
    setSaving(false);
    onSaved(updated);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-[#0c0c0c] rounded-2xl w-full max-w-xl p-6 border border-white/5">
        <h2 className="text-xl font-semibold mb-6">Edit User</h2>

        <div className="space-y-4">
          <input
            value={form.username}
            onChange={e => update("username", e.target.value)}
            className="admin-input"
            placeholder="Username"
          />

          <input
            value={form.nickname}
            onChange={e => update("nickname", e.target.value)}
            className="admin-input"
            placeholder="Nickname"
          />

          <input
            value={form.avatar_url}
            onChange={e => update("avatar_url", e.target.value)}
            className="admin-input"
            placeholder="Avatar URL"
          />

          <textarea
            value={form.bio}
            onChange={e => update("bio", e.target.value)}
            className="admin-input"
            rows={3}
            placeholder="Bio"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-white text-black font-medium"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

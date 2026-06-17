'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

interface User {
  id: string;
  name: string | null;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER';
  isActive: boolean;
  createdAt: string;
}

type RoleType = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Exclude<RoleType, 'SUPER_ADMIN'>>('EDITOR');
  const [busy, setBusy] = useState(false);

  const loadUsers = () => {
    setLoading(true);
    fetch('/api/admin/users')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setUsers(data.users))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(loadUsers, []);

  // Brand-aligned role badges (blue / violet / magenta), translucent for dark UI.
  const roleColors: Record<RoleType, { bg: string; color: string; border: string }> = {
    SUPER_ADMIN: { bg: 'rgba(192,38,211,0.15)', color: 'var(--brand-magenta)', border: 'rgba(192,38,211,0.35)' },
    ADMIN: { bg: 'rgba(139,92,246,0.15)', color: 'var(--brand-violet)', border: 'rgba(139,92,246,0.35)' },
    EDITOR: { bg: 'rgba(75,107,255,0.15)', color: 'var(--brand-blue)', border: 'rgba(75,107,255,0.35)' },
    VIEWER: { bg: 'rgba(138,138,154,0.15)', color: 'var(--fg-2)', border: 'rgba(138,138,154,0.3)' },
  };

  const handleInvite = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inviteEmail || !emailRegex.test(inviteEmail)) {
      alert('Please enter a valid email address.');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Failed to add user.');
        return;
      }
      setInviteEmail('');
      setInviteRole('EDITOR');
      setIsInviting(false);
      loadUsers();
    } finally {
      setBusy(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: RoleType) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    await fetch(`/api/admin/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    }).catch(() => loadUsers());
  };

  const handleRemoveUser = async (userId: string) => {
    if (!confirm('Are you sure you want to remove this user?')) return;
    const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'Failed to remove user.');
      return;
    }
    loadUsers();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-4 md:p-6" style={{ backgroundColor: 'var(--bg-0)' }}>
      <Reveal direction="down">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="h-md" style={{ color: 'var(--fg-0)' }}>Users</h1>
            <p style={{ color: 'var(--fg-2)', fontSize: '0.9rem', marginTop: '4px' }}>
              {loading ? 'Loading…' : `${users.length} user${users.length === 1 ? '' : 's'}`}
            </p>
          </div>
          <button
            onClick={() => setIsInviting(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Icon name="plus" size="sm" />
            Invite User
          </button>
        </div>
      </Reveal>

      {/* Invite Modal */}
      {isInviting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="rounded-lg p-6 max-w-md w-full border" style={{ backgroundColor: 'var(--bg-1)', borderColor: 'var(--line)' }}>
            <h2 className="h-md mb-4" style={{ color: 'var(--fg-0)' }}>Invite User</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--fg-0)' }}>Email</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-4 py-2 rounded-lg border text-sm focus:outline-none transition-colors"
                  style={{
                    borderColor: 'var(--line)',
                    backgroundColor: 'var(--bg-2)',
                    color: 'var(--fg-0)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--fg-0)' }}>Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as Exclude<RoleType, 'SUPER_ADMIN'>)}
                  className="w-full px-4 py-2 rounded-lg border text-sm focus:outline-none transition-colors"
                  style={{
                    borderColor: 'var(--line)',
                    backgroundColor: 'var(--bg-2)',
                    color: 'var(--fg-0)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                >
                  <option value="VIEWER">Viewer</option>
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={handleInvite} disabled={busy} className="flex-1 btn btn-primary">
                {busy ? 'Adding…' : 'Add User'}
              </button>
              <button onClick={() => setIsInviting(false)} className="flex-1 btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Reveal direction="up" delay={0.1}>
        <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--line)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b" style={{ backgroundColor: 'var(--bg-1)', borderColor: 'var(--line)' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: 'var(--fg-0)' }}>Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: 'var(--fg-0)' }}>Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: 'var(--fg-0)' }}>Role</th>
                  <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: 'var(--fg-0)' }}>Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: 'var(--fg-0)' }}>Joined</th>
                  <th className="px-6 py-3 text-right text-sm font-medium" style={{ color: 'var(--fg-0)' }}>Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y" style={{ borderColor: 'var(--line)' }}>
                {loading ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-sm" style={{ color: 'var(--fg-2)' }}>Loading users…</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-sm" style={{ color: 'var(--fg-2)' }}>No users found.</td></tr>
                ) : (
                  users.map((user) => {
                    const isSuperAdmin = user.role === 'SUPER_ADMIN';
                    return (
                      <tr key={user.id} className="transition-colors" onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-1)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                        <td className="px-6 py-4 text-sm font-medium" style={{ color: 'var(--fg-0)' }}>{user.name || '—'}</td>
                        <td className="px-6 py-4 text-sm" style={{ color: 'var(--fg-1)' }}>{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <select
                            value={user.role}
                            disabled={isSuperAdmin}
                            onChange={(e) => handleRoleChange(user.id, e.target.value as RoleType)}
                            className="px-3 py-1 rounded text-xs font-medium cursor-pointer"
                            style={{
                              backgroundColor: roleColors[user.role].bg,
                              color: roleColors[user.role].color,
                              border: `1px solid ${roleColors[user.role].border}`,
                              cursor: isSuperAdmin ? 'not-allowed' : 'pointer',
                            }}
                          >
                            <option value="VIEWER">Viewer</option>
                            <option value="EDITOR">Editor</option>
                            <option value="ADMIN">Admin</option>
                            {isSuperAdmin && <option value="SUPER_ADMIN">Super Admin</option>}
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span style={{
                            padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                            backgroundColor: user.isActive ? 'rgba(75,107,255,0.15)' : 'rgba(138,138,154,0.15)',
                            color: user.isActive ? 'var(--brand-blue)' : 'var(--fg-2)',
                            border: `1px solid ${user.isActive ? 'rgba(75,107,255,0.35)' : 'rgba(138,138,154,0.3)'}`,
                          }}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm" style={{ color: 'var(--fg-2)' }}>{formatDate(user.createdAt)}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleRemoveUser(user.id)}
                            disabled={isSuperAdmin}
                            className="p-2 rounded transition-colors"
                            style={{
                              opacity: isSuperAdmin ? 0.4 : 1,
                              cursor: isSuperAdmin ? 'not-allowed' : 'pointer',
                            }}
                            title={isSuperAdmin ? 'Cannot remove super admin' : 'Remove user'}
                            onMouseEnter={(e) => { if (!isSuperAdmin) e.currentTarget.style.backgroundColor = 'var(--bg-2)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                          >
                            <Icon name="trash" size="sm" style={{ color: 'var(--brand-magenta)' }} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER';
  createdAt: string;
  lastLogin?: string;
}

type RoleType = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'SUPER_ADMIN',
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      role: 'EDITOR',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      name: 'Alex Rodriguez',
      email: 'alex@example.com',
      role: 'EDITOR',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      lastLogin: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '4',
      name: 'Jordan Smith',
      email: 'jordan@example.com',
      role: 'VIEWER',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<RoleType>('EDITOR');

  const roleColors: Record<RoleType, { bg: string; color: string }> = {
    SUPER_ADMIN: { bg: '#fee2e2', color: '#dc2626' },
    ADMIN: { bg: '#f3e8ff', color: '#a855f7' },
    EDITOR: { bg: '#dbeafe', color: '#2563eb' },
    VIEWER: { bg: '#f3f4f6', color: '#6b7280' },
  };

  const handleInvite = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inviteEmail || !emailRegex.test(inviteEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    // TODO: Send invite via API
    const newUser: User = {
      id: crypto.randomUUID(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);
    setInviteEmail('');
    setInviteRole('EDITOR');
    setIsInviting(false);
  };

  const handleRoleChange = (userId: string, newRole: RoleType) => {
    // TODO: Update role via API
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
  };

  const handleRemoveUser = (userId: string) => {
    if (confirm('Are you sure you want to remove this user?')) {
      // TODO: Remove via API
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60 * 60 * 1000) {
      return 'Just now';
    } else if (diff < 24 * 60 * 60 * 1000) {
      return `${Math.floor(diff / (60 * 60 * 1000))} hours ago`;
    } else if (diff < 7 * 24 * 60 * 60 * 1000) {
      return `${Math.floor(diff / (24 * 60 * 60 * 1000))} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="p-4 md:p-6" style={{ backgroundColor: 'var(--bg-0)' }}>
      <Reveal direction="down">
        <div className="flex items-center justify-between mb-6">
          <h1 className="h-md" style={{ color: 'var(--fg-0)' }}>Users</h1>
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
        <Reveal direction="up">
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
                    onChange={(e) => setInviteRole(e.target.value as RoleType)}
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
                <button
                  onClick={handleInvite}
                  className="flex-1 btn btn-primary"
                >
                  Send Invite
                </button>
                <button
                  onClick={() => setIsInviting(false)}
                  className="flex-1 btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      <Reveal direction="up" delay={0.1}>
        <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--line)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header */}
              <thead className="border-b" style={{ backgroundColor: 'var(--bg-1)', borderColor: 'var(--line)' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: 'var(--fg-0)' }}>Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: 'var(--fg-0)' }}>Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: 'var(--fg-0)' }}>Role</th>
                  <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: 'var(--fg-0)' }}>Last Login</th>
                  <th className="px-6 py-3 text-right text-sm font-medium" style={{ color: 'var(--fg-0)' }}>Actions</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y" style={{ borderColor: 'var(--line)' }}>
                {users.map((user) => (
                  <tr key={user.id} className="transition-colors" onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-1)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: 'var(--fg-0)' }}>{user.name}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--fg-1)' }}>{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as RoleType)}
                        className="px-3 py-1 rounded text-xs font-medium border-0 cursor-pointer"
                        style={{
                          backgroundColor: roleColors[user.role].bg,
                          color: roleColors[user.role].color,
                        }}
                      >
                        <option value="VIEWER">Viewer</option>
                        <option value="EDITOR">Editor</option>
                        <option value="ADMIN">Admin</option>
                        {user.id === '1' && <option value="SUPER_ADMIN">Super Admin</option>}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--fg-2)' }}>
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleRemoveUser(user.id)}
                        disabled={user.id === '1'}
                        className="p-2 rounded transition-colors"
                        style={{
                          opacity: user.id === '1' ? 0.5 : 1,
                          cursor: user.id === '1' ? 'not-allowed' : 'pointer',
                        }}
                        title={user.id === '1' ? 'Cannot remove super admin' : 'Remove user'}
                        onMouseEnter={(e) => {
                          if (user.id !== '1') {
                            e.currentTarget.style.backgroundColor = 'var(--bg-2)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Icon name="trash" size="sm" style={{ color: '#ef4444' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

interface Subscriber {
  id: string;
  email: string;
  status: string;
  createdAt: string;
}

interface Counts {
  total: number;
  active: number;
  unsubscribed: number;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [counts, setCounts] = useState<Counts>({ total: 0, active: 0, unsubscribed: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/subscribers')
      .then((r) => r.json())
      .then((data) => {
        setSubscribers(data.subscribers ?? []);
        setCounts(data.counts ?? { total: 0, active: 0, unsubscribed: 0 });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUnsubscribe = async (email: string) => {
    await fetch(`/api/admin/subscribers?email=${encodeURIComponent(email)}`, { method: 'DELETE' });
    setSubscribers((prev) =>
      prev.map((s) => (s.email === email ? { ...s, status: 'UNSUBSCRIBED' } : s))
    );
    setCounts((prev) => ({ ...prev, active: prev.active - 1, unsubscribed: prev.unsubscribed + 1 }));
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div style={{ padding: '28px', maxWidth: '900px' }}>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--fg-0)', margin: '0 0 4px' }}>
          Subscribers
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--fg-3)', margin: 0 }}>
          Newsletter list from the site footer sign-up form.
        </p>
      </div>

      {/* Stats strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Total', value: counts.total, color: 'var(--brand-blue)' },
          { label: 'Active', value: counts.active, color: '#22c55e' },
          { label: 'Unsubscribed', value: counts.unsubscribed, color: 'var(--fg-3)' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)',
              borderRadius: '12px', padding: '16px 20px',
            }}
          >
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginTop: '2px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '280px', padding: '8px 12px', borderRadius: '8px',
            border: '1px solid var(--line)', backgroundColor: 'var(--bg-1)',
            color: 'var(--fg-0)', fontSize: '0.85rem', outline: 'none',
          }}
        />
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--fg-3)', fontSize: '0.9rem' }}>
            Loading subscribers…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--fg-3)', fontSize: '0.9rem' }}>
            {search ? 'No results found.' : 'No subscribers yet.'}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                {['Email', 'Status', 'Joined', ''].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '11px 16px', textAlign: 'left',
                      fontSize: '0.68rem', fontWeight: '700',
                      textTransform: 'uppercase', letterSpacing: '0.07em',
                      color: 'var(--fg-3)',
                    }}
                  >{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub, i) => (
                <tr
                  key={sub.id}
                  style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--line)' : 'none' }}
                >
                  <td style={{ padding: '12px 16px', fontSize: '0.87rem', color: 'var(--fg-0)', fontWeight: '500' }}>
                    {sub.email}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        display: 'inline-block', padding: '2px 10px', borderRadius: '999px',
                        fontSize: '0.7rem', fontWeight: '700',
                        backgroundColor: sub.status === 'ACTIVE' ? '#22c55e18' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${sub.status === 'ACTIVE' ? '#22c55e40' : 'var(--line)'}`,
                        color: sub.status === 'ACTIVE' ? '#22c55e' : 'var(--fg-3)',
                      }}
                    >
                      {sub.status === 'ACTIVE' ? 'Active' : 'Unsubscribed'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>
                    {formatDate(sub.createdAt)}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    {sub.status === 'ACTIVE' && (
                      <button
                        onClick={() => handleUnsubscribe(sub.email)}
                        style={{
                          padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem',
                          fontWeight: '500', color: 'var(--fg-3)', cursor: 'pointer',
                          background: 'transparent', border: '1px solid var(--line)',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#ef4444';
                          e.currentTarget.style.color = '#ef4444';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--line)';
                          e.currentTarget.style.color = 'var(--fg-3)';
                        }}
                      >
                        Unsubscribe
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

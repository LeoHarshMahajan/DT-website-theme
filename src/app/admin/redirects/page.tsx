'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';

interface Redirect {
  id: string;
  source: string;
  destination: string;
  permanent: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function RedirectsPage() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [permanent, setPermanent] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/redirects')
      .then((r) => r.json())
      .then((d) => setRedirects(d.redirects ?? []))
      .finally(() => setLoading(false));
  }, []);

  const addRedirect = async () => {
    if (!source.trim() || !destination.trim()) return;
    if (!source.startsWith('/')) return alert('Source must start with /');
    setSaving(true);
    const res = await fetch('/api/admin/redirects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: source.trim(), destination: destination.trim(), permanent }),
    });
    const data = await res.json();
    if (res.ok) {
      setRedirects((prev) => [data.redirect, ...prev]);
      setSource('');
      setDestination('');
      setPermanent(false);
    } else {
      alert(data.error || 'Failed to create redirect');
    }
    setSaving(false);
  };

  const toggleActive = async (id: string, current: boolean) => {
    const res = await fetch(`/api/admin/redirects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !current }),
    });
    if (res.ok) setRedirects((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !current } : r)));
  };

  const deleteRedirect = async (id: string) => {
    if (!confirm('Delete this redirect?')) return;
    const res = await fetch(`/api/admin/redirects/${id}`, { method: 'DELETE' });
    if (res.ok) setRedirects((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div style={{ padding: '28px', maxWidth: '860px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--fg-0)', margin: '0 0 4px' }}>Redirects</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--fg-3)', margin: 0 }}>
          URL redirects are applied at the proxy level. Changes take effect within 5 minutes.
        </p>
      </div>

      {/* Add form */}
      <div style={{ backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--fg-3)', marginBottom: '14px' }}>New Redirect</p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="/old-path"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={{ width: '200px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)', color: 'var(--fg-0)', fontSize: '0.85rem', outline: 'none', fontFamily: 'var(--font-mono)' }}
          />
          <Icon name="arrow-right" size="sm" style={{ color: 'var(--fg-3)', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="/new-path or https://..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addRedirect()}
            style={{ flex: 1, minWidth: '200px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)', color: 'var(--fg-0)', fontSize: '0.85rem', outline: 'none', fontFamily: 'var(--font-mono)' }}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--fg-2)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <input type="checkbox" checked={permanent} onChange={(e) => setPermanent(e.target.checked)} />
            301 Permanent
          </label>
          <button
            onClick={addRedirect}
            disabled={saving || !source.trim() || !destination.trim()}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', background: 'var(--brand-blue)', color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', opacity: saving || !source.trim() || !destination.trim() ? 0.5 : 1 }}
          >
            <Icon name="plus" size="sm" /> Add
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--fg-3)', fontSize: '0.9rem' }}>Loading…</div>
        ) : redirects.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--fg-3)', fontSize: '0.9rem' }}>No redirects configured.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                {['From', 'To', 'Type', 'Active', ''].map((h) => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--fg-3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {redirects.map((rd, i) => (
                <tr key={rd.id} style={{ borderBottom: i < redirects.length - 1 ? '1px solid var(--line)' : 'none', opacity: rd.isActive ? 1 : 0.5 }}>
                  <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: 'var(--fg-0)', fontFamily: 'var(--font-mono)', fontWeight: '500' }}>{rd.source}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: 'var(--fg-2)', fontFamily: 'var(--font-mono)', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rd.destination}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '999px', fontSize: '0.68rem', fontWeight: '700', backgroundColor: rd.permanent ? '#4b6bff18' : '#8b5cf618', color: rd.permanent ? '#4b6bff' : '#8b5cf6', border: `1px solid ${rd.permanent ? '#4b6bff40' : '#8b5cf640'}` }}>
                      {rd.permanent ? '301' : '302'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <button
                      onClick={() => toggleActive(rd.id, rd.isActive)}
                      style={{ width: '36px', height: '20px', borderRadius: '999px', border: 'none', cursor: 'pointer', background: rd.isActive ? '#22c55e' : 'var(--bg-3)', position: 'relative', transition: 'background 0.2s' }}
                    >
                      <span style={{ position: 'absolute', top: '2px', left: rd.isActive ? '18px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                    </button>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => deleteRedirect(rd.id)}
                      style={{ padding: '4px 8px', borderRadius: '6px', background: 'transparent', color: 'var(--fg-3)', border: '1px solid var(--line)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--fg-3)'; }}
                    >
                      <Icon name="trash" size="sm" />
                    </button>
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

'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

interface Lead {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  budget: string | null;
  services: string | null;
  goals: string | null;
  slot: string | null;
  message: string | null;
  status: string;
  source: string | null;
  createdAt: string;
}

const STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED', 'SPAM'] as const;

const TYPE_COLOR: Record<string, string> = {
  CONTACT: 'var(--brand-blue)',
  CONSULTATION: 'var(--brand-violet)',
  AUDIT: 'var(--brand-magenta)',
};
const STATUS_COLOR: Record<string, string> = {
  NEW: 'var(--brand-blue)',
  CONTACTED: 'var(--brand-violet)',
  QUALIFIED: 'var(--brand-magenta)',
  CLOSED: 'var(--fg-3)',
  SPAM: 'var(--fg-3)',
};

function rgba(varColor: string, a: number) {
  const map: Record<string, string> = {
    'var(--brand-blue)': `rgba(75,107,255,${a})`,
    'var(--brand-violet)': `rgba(139,92,246,${a})`,
    'var(--brand-magenta)': `rgba(192,38,211,${a})`,
    'var(--fg-3)': `rgba(138,138,154,${a})`,
  };
  return map[varColor] || `rgba(138,138,154,${a})`;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'CONTACT' | 'CONSULTATION' | 'AUDIT'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | typeof STATUSES[number]>('ALL');
  const [selected, setSelected] = useState<Lead | null>(null);

  const load = () => {
    setLoading(true);
    fetch('/api/admin/leads')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setLeads(d.leads ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const filtered = leads.filter(
    (l) => (typeFilter === 'ALL' || l.type === typeFilter) && (statusFilter === 'ALL' || l.status === statusFilter)
  );

  const setStatus = async (id: string, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(load);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this lead permanently?')) return;
    await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
    setSelected(null);
    load();
  };

  const newCount = leads.filter((l) => l.status === 'NEW').length;

  return (
    <div style={{ padding: '32px', backgroundColor: 'var(--bg-0)', minHeight: '100%' }}>
      <Reveal direction="down">
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--fg-0)', margin: 0 }}>Leads</h1>
          <p style={{ color: 'var(--fg-2)', marginTop: '4px', fontSize: '0.9rem' }}>
            {loading ? 'Loading…' : `${leads.length} total · ${newCount} new`}
          </p>
        </div>
      </Reveal>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--bg-2)', padding: '4px', borderRadius: '10px' }}>
          {(['ALL', 'CONTACT', 'CONSULTATION', 'AUDIT'] as const).map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)} style={{
              padding: '7px 14px', borderRadius: '8px', border: 'none', fontSize: '0.8rem', fontWeight: 500,
              cursor: 'pointer', textTransform: 'capitalize',
              backgroundColor: typeFilter === t ? 'var(--bg-1)' : 'transparent',
              color: typeFilter === t ? 'var(--fg-0)' : 'var(--fg-2)',
            }}>{t.toLowerCase()}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--bg-2)', padding: '4px', borderRadius: '10px' }}>
          {(['ALL', ...STATUSES] as const).map((s) => (
            <button key={s} onClick={() => setStatusFilter(s as typeof statusFilter)} style={{
              padding: '7px 12px', borderRadius: '8px', border: 'none', fontSize: '0.8rem', fontWeight: 500,
              cursor: 'pointer', textTransform: 'capitalize',
              backgroundColor: statusFilter === s ? 'var(--bg-1)' : 'transparent',
              color: statusFilter === s ? 'var(--fg-0)' : 'var(--fg-2)',
            }}>{s.toLowerCase()}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', border: '1px solid var(--line)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '64px', textAlign: 'center', color: 'var(--fg-2)' }}>Loading leads…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '64px 32px', textAlign: 'center' }}>
            <Icon name="target" size="lg" style={{ color: 'var(--fg-3)' }} />
            <p style={{ color: 'var(--fg-1)', marginTop: '16px' }}>No leads yet</p>
            <p style={{ color: 'var(--fg-3)', fontSize: '0.85rem' }}>Form submissions from your site will appear here.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  {['Name', 'Type', 'Contact', 'Status', 'Date', ''].map((h) => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: h === '' ? 'right' : 'left', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-3)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => (
                  <tr key={l.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--line)' : 'none', cursor: 'pointer' }}
                    onClick={() => setSelected(l)}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                    <td style={{ padding: '14px 20px' }}>
                      <p style={{ fontWeight: 600, color: 'var(--fg-0)', margin: 0, fontSize: '0.9rem' }}>{l.name}</p>
                      {l.company && <p style={{ color: 'var(--fg-3)', margin: '2px 0 0 0', fontSize: '0.8rem' }}>{l.company}</p>}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, textTransform: 'capitalize',
                        backgroundColor: rgba(TYPE_COLOR[l.type], 0.15), color: TYPE_COLOR[l.type], border: `1px solid ${rgba(TYPE_COLOR[l.type], 0.35)}` }}>
                        {l.type.toLowerCase()}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '0.85rem', color: 'var(--fg-1)' }}>
                      <div>{l.email}</div>
                      {l.phone && <div style={{ color: 'var(--fg-3)', fontSize: '0.8rem' }}>{l.phone}</div>}
                    </td>
                    <td style={{ padding: '14px 20px' }} onClick={(e) => e.stopPropagation()}>
                      <select value={l.status} onChange={(e) => setStatus(l.id, e.target.value)} style={{
                        padding: '5px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                        backgroundColor: rgba(STATUS_COLOR[l.status], 0.15), color: STATUS_COLOR[l.status],
                        border: `1px solid ${rgba(STATUS_COLOR[l.status], 0.35)}`,
                      }}>
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '0.82rem', color: 'var(--fg-2)', whiteSpace: 'nowrap' }}>{fmt(l.createdAt)}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => remove(l.id)} title="Delete" style={{ padding: '6px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(192,38,211,0.12)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                        <Icon name="trash" size="sm" style={{ color: 'var(--brand-magenta)' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'flex-end', zIndex: 100 }}
          onClick={() => setSelected(null)}>
          <div style={{ width: '100%', maxWidth: '440px', height: '100%', backgroundColor: 'var(--bg-1)', borderLeft: '1px solid var(--line)', padding: '28px', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, textTransform: 'capitalize',
                  backgroundColor: rgba(TYPE_COLOR[selected.type], 0.15), color: TYPE_COLOR[selected.type], border: `1px solid ${rgba(TYPE_COLOR[selected.type], 0.35)}` }}>
                  {selected.type.toLowerCase()}
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--fg-0)', margin: '12px 0 0 0' }}>{selected.name}</h2>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-2)' }}>
                <Icon name="x" size="md" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {([
                ['Email', selected.email], ['Phone', selected.phone], ['Company', selected.company],
                ['Website', selected.website], ['Budget', selected.budget], ['Services', selected.services],
                ['Goals', selected.goals], ['Preferred slot', selected.slot], ['Source', selected.source],
                ['Received', fmt(selected.createdAt)],
              ] as [string, string | null][]).filter(([, v]) => v).map(([label, val]) => (
                <div key={label}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-3)', margin: '0 0 3px 0' }}>{label}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--fg-0)', margin: 0, wordBreak: 'break-word' }}>{val}</p>
                </div>
              ))}
              {selected.message && (
                <div>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-3)', margin: '0 0 3px 0' }}>Message</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--fg-1)', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
                </div>
              )}
            </div>

            <div style={{ marginTop: '24px', borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-3)', marginBottom: '10px' }}>Status</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {STATUSES.map((s) => (
                  <button key={s} onClick={() => setStatus(selected.id, s)} style={{
                    padding: '7px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                    backgroundColor: selected.status === s ? rgba(STATUS_COLOR[s], 0.18) : 'var(--bg-2)',
                    color: selected.status === s ? STATUS_COLOR[s] : 'var(--fg-2)',
                    border: `1px solid ${selected.status === s ? rgba(STATUS_COLOR[s], 0.4) : 'var(--line)'}`,
                  }}>{s}</button>
                ))}
              </div>
              <a href={`mailto:${selected.email}`} className="btn btn-primary" style={{ width: '100%', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                Reply by email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

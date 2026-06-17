'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

interface RecentPost {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalUsers: number;
  activeUsers: number;
  totalViews: number;
  totalLeads: number;
  newLeads: number;
  recentPosts: RecentPost[];
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? '1d ago' : `${d}d ago`;
}

function Skeleton({ w = '100%', h = '16px' }: { w?: string; h?: string }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: '6px',
      background: 'linear-gradient(90deg, var(--bg-2) 25%, var(--bg-3) 50%, var(--bg-2) 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
    }} />
  );
}

interface StatCard {
  label: string;
  value: number | string;
  sub?: string;
  icon: string;
  accent: string;
  href: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards: StatCard[] = stats ? [
    { label: 'New Leads', value: stats.newLeads, sub: `${stats.totalLeads} total`, icon: 'target', accent: '#4b6bff', href: '/admin/leads' },
    { label: 'Published Posts', value: stats.publishedPosts, sub: `${stats.draftPosts} drafts`, icon: 'file-text', accent: '#8b5cf6', href: '/admin/posts' },
    { label: 'Team Members', value: stats.activeUsers, sub: `${stats.totalUsers} total`, icon: 'users', accent: '#c026d3', href: '/admin/users' },
    { label: 'Page Views', value: stats.totalViews.toLocaleString(), sub: 'all time', icon: 'eye', accent: '#4b6bff', href: '/admin/settings' },
  ] : [];

  return (
    <div style={{ padding: '28px 28px 48px', maxWidth: '1280px', margin: '0 auto' }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--fg-0)', margin: '0 0 2px 0' }}>Dashboard</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--fg-3)', margin: 0 }}>Welcome back — here's what's happening.</p>
      </div>

      {/* ── Stat cards ──────────────────────────────────────── */}
      <div className="dt-stat-grid" style={{ display: 'grid', gap: '14px', marginBottom: '24px' }}>
        {loading ? Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ backgroundColor: 'var(--bg-1)', borderRadius: '12px', padding: '20px', border: '1px solid var(--line)' }}>
            <Skeleton w="60%" h="12px" />
            <div style={{ marginTop: '12px' }}><Skeleton w="40%" h="28px" /></div>
            <div style={{ marginTop: '8px' }}><Skeleton w="50%" h="11px" /></div>
          </div>
        )) : statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            style={{
              backgroundColor: 'var(--bg-1)', borderRadius: '12px', padding: '20px',
              border: '1px solid var(--line)', borderTop: `3px solid ${card.accent}`,
              textDecoration: 'none', display: 'block', transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-2)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-3)', margin: '0 0 10px 0' }}>
                  {card.label}
                </p>
                <p style={{ fontSize: '1.9rem', fontWeight: '700', color: 'var(--fg-0)', margin: '0 0 4px 0', lineHeight: 1 }}>
                  {card.value}
                </p>
                {card.sub && (
                  <p style={{ fontSize: '0.72rem', color: 'var(--fg-3)', margin: 0 }}>{card.sub}</p>
                )}
              </div>
              <div style={{
                width: '36px', height: '36px', borderRadius: '9px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: `${card.accent}18`,
              }}>
                <Icon name={card.icon as any} size="sm" style={{ color: card.accent }} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Bottom row ──────────────────────────────────────── */}
      <div className="dt-bottom-grid" style={{ display: 'grid', gap: '16px' }}>

        {/* Recent Posts */}
        <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '12px', border: '1px solid var(--line)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--line)' }}>
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-3)', margin: '0 0 2px 0' }}>Content</p>
              <h2 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--fg-0)', margin: 0 }}>Recent Posts</h2>
            </div>
            <Link
              href="/admin/posts"
              style={{
                fontSize: '0.75rem', fontWeight: '500', color: 'var(--brand-blue)',
                textDecoration: 'none', padding: '5px 10px', borderRadius: '6px',
                border: '1px solid rgba(75,107,255,0.25)', backgroundColor: 'rgba(75,107,255,0.06)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(75,107,255,0.14)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(75,107,255,0.06)'; }}
            >
              View all →
            </Link>
          </div>

          {loading ? (
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton w="55%" h="13px" />
                  <Skeleton w="15%" h="11px" />
                </div>
              ))}
            </div>
          ) : !stats?.recentPosts.length ? (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
              <Icon name="file-text" size="md" style={{ color: 'var(--fg-3)', marginBottom: '8px' }} />
              <p style={{ color: 'var(--fg-2)', fontSize: '0.85rem', margin: 0 }}>No posts yet</p>
            </div>
          ) : (
            <div>
              {stats.recentPosts.map((post, i) => (
                <div
                  key={post.id}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '13px 20px', gap: '16px',
                    borderBottom: i < stats.recentPosts.length - 1 ? '1px solid var(--line)' : 'none',
                    transition: 'background-color 0.12s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <p style={{
                      fontWeight: '500', color: 'var(--fg-0)', margin: 0,
                      fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {post.title}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: '600', padding: '2px 8px', borderRadius: '20px',
                      backgroundColor: post.status === 'PUBLISHED' ? 'rgba(75,107,255,0.12)' : 'rgba(192,38,211,0.12)',
                      color: post.status === 'PUBLISHED' ? 'var(--brand-blue)' : 'var(--brand-magenta)',
                      border: `1px solid ${post.status === 'PUBLISHED' ? 'rgba(75,107,255,0.25)' : 'rgba(192,38,211,0.25)'}`,
                    }}>
                      {post.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--fg-3)', whiteSpace: 'nowrap' }}>
                      {timeAgo(post.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Lead pipeline summary */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '12px', border: '1px solid var(--line)', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--fg-0)', margin: 0 }}>Leads</h2>
              <Link
                href="/admin/leads"
                style={{ fontSize: '0.72rem', color: 'var(--brand-blue)', textDecoration: 'none', fontWeight: '500' }}
              >
                View all →
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'New', value: stats?.newLeads ?? 0, color: '#4b6bff', total: stats?.totalLeads ?? 1 },
                { label: 'Total', value: stats?.totalLeads ?? 0, color: '#8b5cf6', total: Math.max(stats?.totalLeads ?? 1, 1) },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--fg-2)', fontWeight: '500' }}>{item.label}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--fg-0)', fontWeight: '600' }}>{item.value}</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: 'var(--bg-3)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '2px',
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}99)`,
                      width: item.total > 0 ? `${Math.min((item.value / item.total) * 100, 100)}%` : '0%',
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '12px', border: '1px solid var(--line)', padding: '20px' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--fg-0)', margin: '0 0 14px 0' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { label: 'New Post', sub: 'Write & publish content', icon: 'plus', color: '#4b6bff', href: '/admin/posts?action=create' },
                { label: 'View Leads', sub: 'Check form submissions', icon: 'target', color: '#8b5cf6', href: '/admin/leads' },
                { label: 'Manage Users', sub: 'Invite or update roles', icon: 'users', color: '#c026d3', href: '/admin/users' },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 12px', borderRadius: '8px',
                    textDecoration: 'none', border: '1px solid transparent',
                    transition: 'all 0.15s', color: 'var(--fg-0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-2)';
                    e.currentTarget.style.borderColor = 'var(--line)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '7px', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: `${action.color}15`,
                  }}>
                    <Icon name={action.icon as any} size="sm" style={{ color: action.color }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--fg-0)', margin: 0 }}>{action.label}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--fg-3)', margin: 0 }}>{action.sub}</p>
                  </div>
                  <Icon name="arrow-right" size="sm" style={{ color: 'var(--fg-3)', marginLeft: 'auto' }} />
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .dt-stat-grid { grid-template-columns: repeat(4, 1fr); }
        .dt-bottom-grid { grid-template-columns: 1fr 320px; }
        @media (max-width: 1100px) { .dt-stat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 900px)  { .dt-bottom-grid { grid-template-columns: 1fr; } }
        @media (max-width: 640px)  { .dt-stat-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}

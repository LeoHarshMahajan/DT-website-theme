'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

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
  recentPosts: RecentPost[];
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalUsers: 0,
    activeUsers: 0,
    totalViews: 0,
    recentPosts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards: { label: string; value: number | string; icon: string; iconColor: string; borderAccent: string }[] = [
    {
      label: 'Total Posts',
      value: stats.totalPosts,
      icon: 'file-text',
      iconColor: '#4b6bff',
      borderAccent: 'rgba(75, 107, 255, 0.2)',
    },
    {
      label: 'Published',
      value: stats.publishedPosts,
      icon: 'check-circle',
      iconColor: '#10b981',
      borderAccent: 'rgba(16, 185, 129, 0.2)',
    },
    {
      label: 'Drafts',
      value: stats.draftPosts,
      icon: 'clock',
      iconColor: '#f59e0b',
      borderAccent: 'rgba(245, 158, 11, 0.2)',
    },
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: 'users',
      iconColor: '#a855f7',
      borderAccent: 'rgba(168, 85, 247, 0.2)',
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: 'activity',
      iconColor: '#10b981',
      borderAccent: 'rgba(16, 185, 129, 0.2)',
    },
    {
      label: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: 'eye',
      iconColor: '#ec4899',
      borderAccent: 'rgba(236, 72, 153, 0.2)',
    },
  ];

  return (
    <div style={{
      width: '100%',
      minHeight: '100%',
      backgroundColor: 'var(--bg-0)',
      padding: '24px 32px',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
      }}>
        {/* Header */}
        <Reveal direction="down">
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '12px', color: 'var(--fg-0)', lineHeight: '1.2' }}>Dashboard</h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--fg-1)', lineHeight: '1.5' }}>Welcome back! Here's your growth at a glance.</p>
          </div>
        </Reveal>

        {/* Stats Grid */}
        <Reveal direction="up" delay={0.1}>
          <div className="stats-grid" style={{ display: 'grid', gap: '24px', width: '100%' }}>
          {statCards.map((card, index) => (
            <div
              key={card.label}
              style={{
                backgroundColor: 'var(--bg-2)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = card.borderAccent;
                e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.3)`;
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.backgroundColor = 'var(--bg-3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'var(--bg-2)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-2)' }}>
                    {card.label}
                  </p>
                  <p style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.2', color: 'var(--fg-0)' }}>
                    {card.value}
                  </p>
                </div>
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                    background: `${card.iconColor}12`,
                    border: `2px solid ${card.iconColor}25`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08) rotate(5deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0)';
                  }}
                >
                  <Icon name={card.icon as any} size="lg" style={{ color: card.iconColor }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

        {/* Recent Activity & Quick Actions */}
        <div className="activity-grid" style={{ display: 'grid', gap: '24px', width: '100%' }}>
          {/* Recent Posts */}
          <Reveal direction="left" delay={0.2}>
            <div
              style={{
                borderRadius: '16px',
                padding: '32px',
                backgroundColor: 'var(--bg-1)',
                borderColor: 'var(--line)',
                border: '1px solid var(--line)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', color: 'var(--fg-2)' }}>RECENT</p>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0', color: 'var(--fg-0)' }}>Latest Posts</h2>
                </div>
                <a
                  href="/admin/posts"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    color: 'var(--brand-blue)',
                    backgroundColor: 'var(--brand-blue)12',
                    border: '1px solid var(--brand-blue)30',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--brand-blue)20';
                    e.currentTarget.style.borderColor = 'var(--brand-blue)50';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--brand-blue)12';
                    e.currentTarget.style.borderColor = 'var(--brand-blue)30';
                  }}
                >
                  View all →
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {loading ? (
                  <p style={{ color: 'var(--fg-2)', fontSize: '0.9rem', padding: '16px' }}>Loading…</p>
                ) : stats.recentPosts.length === 0 ? (
                  <div style={{ padding: '24px 16px', textAlign: 'center', backgroundColor: 'var(--bg-2)', borderRadius: '10px' }}>
                    <p style={{ color: 'var(--fg-1)', fontSize: '0.95rem', margin: '0 0 4px 0' }}>No posts yet</p>
                    <p style={{ color: 'var(--fg-2)', fontSize: '0.85rem', margin: '0' }}>Create your first post to see it here.</p>
                  </div>
                ) : (
                  stats.recentPosts.map((post) => {
                    const isPublished = post.status === 'PUBLISHED';
                    return (
                      <div
                        key={post.id}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          padding: '16px',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease',
                          backgroundColor: 'var(--bg-2)',
                          gap: '16px',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-3)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-2)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: '600', marginBottom: '4px', margin: '0', color: 'var(--fg-0)', fontSize: '0.95rem' }}>
                            {post.title}
                          </p>
                          <p style={{ fontSize: '0.85rem', color: 'var(--fg-2)', margin: '4px 0 0 0' }}>
                            {timeAgo(post.createdAt)}
                          </p>
                        </div>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            backgroundColor: isPublished ? 'rgba(75,107,255,0.15)' : 'rgba(192,38,211,0.15)',
                            color: isPublished ? 'var(--brand-blue)' : 'var(--brand-magenta)',
                            border: isPublished ? '1px solid rgba(75,107,255,0.35)' : '1px solid rgba(192,38,211,0.35)',
                            flexShrink: 0,
                            textTransform: 'capitalize',
                          }}
                        >
                          {post.status.toLowerCase()}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
          </div>
        </Reveal>

          {/* Quick Actions */}
          <Reveal direction="right" delay={0.2}>
            <div
              style={{
                borderRadius: '16px',
                padding: '32px',
                backgroundColor: 'var(--bg-1)',
                borderColor: 'var(--line)',
                border: '1px solid var(--line)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', color: 'var(--fg-2)' }}>ACTIONS</p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '32px', color: 'var(--fg-0)' }}>Quick Links</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a
                  href="/admin/posts?action=create"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '2px solid var(--brand-blue)25',
                    backgroundColor: 'var(--brand-blue)08',
                    color: 'var(--fg-0)',
                    fontWeight: '500',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand-blue)';
                    e.currentTarget.style.backgroundColor = 'var(--brand-blue)15';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand-blue)25';
                    e.currentTarget.style.backgroundColor = 'var(--brand-blue)08';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <Icon name="plus" size="md" style={{ color: 'var(--brand-blue)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '0.95rem', fontWeight: '500', margin: '0' }}>Create Post</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--fg-2)', margin: '2px 0 0 0' }}>Write new content</p>
                  </div>
                </a>

                <a
                  href="/admin/users"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '2px solid #a855f720',
                    backgroundColor: '#a855f708',
                    color: 'var(--fg-0)',
                    fontWeight: '500',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#a855f7';
                    e.currentTarget.style.backgroundColor = '#a855f715';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#a855f720';
                    e.currentTarget.style.backgroundColor = '#a855f708';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <Icon name="users" size="md" style={{ color: '#a855f7', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '0.95rem', fontWeight: '500', margin: '0' }}>Manage Users</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--fg-2)', margin: '2px 0 0 0' }}>View & edit users</p>
                  </div>
                </a>

                <a
                  href="/admin/settings"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '2px solid #ec489320',
                    backgroundColor: '#ec489308',
                    color: 'var(--fg-0)',
                    fontWeight: '500',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ec4893';
                    e.currentTarget.style.backgroundColor = '#ec489315';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#ec489320';
                    e.currentTarget.style.backgroundColor = '#ec489308';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <Icon name="settings" size="md" style={{ color: '#ec4893', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '0.95rem', fontWeight: '500', margin: '0' }}>Settings</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--fg-2)', margin: '2px 0 0 0' }}>Configure site</p>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Chart Placeholder */}
        <Reveal direction="up" delay={0.3}>
          <div
            style={{
              borderRadius: '16px',
              padding: '40px',
              border: '1px solid var(--line)',
              minHeight: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--bg-1)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px', color: 'var(--fg-0)' }}>Views Over Time</h2>
              <p style={{ color: 'var(--fg-2)', fontSize: '0.95rem' }}>
                {stats.totalViews === 0
                  ? 'No page-view data yet — analytics will appear here as traffic comes in.'
                  : `${stats.totalViews.toLocaleString()} total views tracked.`}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        .stats-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .stats-grid { grid-template-columns: 1fr; } }
        .activity-grid { grid-template-columns: 2fr 1fr; }
        @media (max-width: 900px)  { .activity-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

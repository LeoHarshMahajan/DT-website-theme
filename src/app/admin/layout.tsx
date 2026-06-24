'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession, SessionProvider } from 'next-auth/react';
import { Icon } from '@/components/ui/Icon';

interface AdminLayoutProps {
  children: ReactNode;
}

const navGroups = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', href: '/admin', icon: 'layout' as const },
      { name: 'Leads', href: '/admin/leads', icon: 'target' as const },
    ],
  },
  {
    label: 'Content',
    items: [
      { name: 'Posts', href: '/admin/posts', icon: 'file-text' as const },
      { name: 'Pages', href: '/admin/pages', icon: 'layout' as const },
    ],
  },
  {
    label: 'System',
    items: [
      { name: 'Users', href: '/admin/users', icon: 'users' as const },
      { name: 'Settings', href: '/admin/settings', icon: 'settings' as const },
    ],
  },
];

function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'Admin';
  const userEmail = session?.user?.email || '';
  const initials = userName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{
        height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', borderBottom: '1px solid var(--line)', flexShrink: 0,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0,
            background: 'linear-gradient(135deg, #4b6bff 0%, #8b5cf6 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: '800', color: 'white', letterSpacing: '-0.5px',
            boxShadow: '0 2px 8px rgba(75,107,255,0.35)',
          }}>DT</div>
          <div>
            <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--fg-0)', margin: 0, lineHeight: 1.1 }}>Digital Triangle</p>
            <p style={{ fontSize: '0.65rem', color: 'var(--fg-3)', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Admin Console</p>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-2)', padding: '4px', borderRadius: '6px' }}>
            <Icon name="x" size="sm" />
          </button>
        )}
      </div>

      {/* Nav groups */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {navGroups.map((group) => (
          <div key={group.label}>
            <p style={{
              fontSize: '0.62rem', fontWeight: '700', textTransform: 'uppercase',
              letterSpacing: '0.1em', color: 'var(--fg-3)', padding: '0 10px',
              marginBottom: '4px',
            }}>{group.label}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '8px 10px', borderRadius: '8px',
                      fontSize: '0.875rem', fontWeight: active ? '600' : '450',
                      textDecoration: 'none', transition: 'all 0.15s ease',
                      color: active ? 'var(--fg-0)' : 'var(--fg-2)',
                      backgroundColor: active ? 'var(--bg-3)' : 'transparent',
                      borderLeft: active ? '3px solid var(--brand-blue)' : '3px solid transparent',
                      paddingLeft: active ? '7px' : '10px',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = 'var(--bg-2)';
                        e.currentTarget.style.color = 'var(--fg-1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--fg-2)';
                      }
                    }}
                  >
                    <Icon
                      name={item.icon}
                      size="sm"
                      style={{ color: active ? 'var(--brand-blue)' : 'var(--fg-3)', flexShrink: 0 }}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User profile + logout */}
      <div style={{ borderTop: '1px solid var(--line)', padding: '12px 10px', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '8px 10px', borderRadius: '8px', marginBottom: '4px',
          backgroundColor: 'var(--bg-2)',
        }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, var(--brand-violet), var(--brand-magenta))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.7rem', fontWeight: '700', color: 'white',
          }}>{initials}</div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-0)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userName}</p>
            <p style={{ fontSize: '0.68rem', color: 'var(--fg-3)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userEmail}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            width: '100%', padding: '7px 10px', borderRadius: '8px',
            fontSize: '0.8rem', fontWeight: '500', color: 'var(--fg-3)',
            background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--fg-3)'; }}
        >
          <Icon name="log-out" size="sm" />
          Sign out
        </button>
      </div>
    </div>
  );
}

function PageTitle({ pathname }: { pathname: string }) {
  const seg = pathname.split('/admin/')[1] || '';
  if (!seg) return 'Dashboard';
  return seg.charAt(0).toUpperCase() + seg.slice(1);
}

function TodayDate() {
  const [date, setDate] = useState('');
  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
  }, []);
  return <span style={{ fontSize: '0.78rem', color: 'var(--fg-3)', fontWeight: '500' }}>{date}</span>;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <SessionProvider>
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-0)', overflow: 'hidden' }}>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 30, backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
        />
      )}

      {/* Desktop sidebar */}
      <aside
        className="dt-sidebar-desktop"
        style={{
          width: '230px', minWidth: '230px', flexShrink: 0,
          backgroundColor: 'var(--bg-1)', borderRight: '1px solid var(--line)',
          position: 'relative', zIndex: 10,
        }}
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile sidebar */}
      <aside style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '230px',
        transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 50, backgroundColor: 'var(--bg-1)', borderRight: '1px solid var(--line)',
      }}
      className="dt-sidebar-mobile"
      >
        <SidebarContent pathname={pathname} onClose={() => setMobileOpen(false)} />
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Header */}
        <header style={{
          height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', backgroundColor: 'var(--bg-1)', borderBottom: '1px solid var(--line)', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setMobileOpen(true)}
              className="dt-hamburger"
              style={{
                padding: '6px', borderRadius: '7px', background: 'transparent',
                border: 'none', cursor: 'pointer', color: 'var(--fg-1)', display: 'none',
              }}
              aria-label="Open menu"
            >
              <Icon name="menu" size="sm" />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--fg-3)' }}>Admin</span>
              <span style={{ color: 'var(--fg-3)', fontSize: '0.78rem' }}>/</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--fg-0)', textTransform: 'capitalize' }}>
                <PageTitle pathname={pathname} />
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TodayDate />
            <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--line)' }} />
            <a
              href="/"
              target="_blank"
              rel="noopener"
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '5px 10px', borderRadius: '7px', fontSize: '0.75rem',
                color: 'var(--fg-2)', border: '1px solid var(--line)',
                backgroundColor: 'transparent', textDecoration: 'none',
                fontWeight: '500', transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-2)'; e.currentTarget.style.color = 'var(--fg-0)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--fg-2)'; }}
            >
              <Icon name="eye" size="sm" />
              View site
            </a>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--bg-0)' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dt-sidebar-desktop { display: none !important; }
          .dt-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .dt-sidebar-mobile { display: none !important; }
        }
      `}</style>
    </div>
    </SessionProvider>
  );
}

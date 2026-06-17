'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Icon } from '@/components/ui/Icon';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: 'layout' },
    { name: 'Leads', href: '/admin/leads', icon: 'target' },
    { name: 'Posts', href: '/admin/posts', icon: 'file-text' },
    { name: 'Users', href: '/admin/users', icon: 'users' },
    { name: 'Settings', href: '/admin/settings', icon: 'settings' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-0)', overflow: 'hidden' }}>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 30,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* ─── Sidebar ─── */}
      <aside style={{
        /* Desktop: always visible, relative */
        position: 'relative',
        width: '256px',
        minWidth: '256px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-1)',
        borderRight: '1px solid var(--line)',
        zIndex: 40,
      }}
      className="hidden-mobile"
      >
        {/* Logo */}
        <div style={{
          height: '64px', display: 'flex', alignItems: 'center',
          padding: '0 24px', borderBottom: '1px solid var(--line)', flexShrink: 0,
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--fg-0)', textDecoration: 'none' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: '700', color: 'white',
            }}>DT</div>
            <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--fg-0)' }}>Digital Triangle</span>
          </Link>
        </div>

        {/* Nav label */}
        <div style={{ padding: '24px 16px 8px 16px' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-3)' }}>
            Menu
          </p>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0 12px', overflowY: 'auto' }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                marginBottom: '4px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: isActive(item.href) ? '600' : '500',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                color: isActive(item.href) ? 'var(--brand-blue)' : 'var(--fg-1)',
                backgroundColor: isActive(item.href) ? 'rgba(75, 107, 255, 0.12)' : 'transparent',
                border: isActive(item.href) ? '1px solid rgba(75, 107, 255, 0.2)' : '1px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.href)) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-2)';
                  e.currentTarget.style.color = 'var(--fg-0)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.href)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--fg-1)';
                }
              }}
            >
              <Icon name={item.icon as any} size="md" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--line)' }}>
          <button
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              width: '100%', padding: '10px 12px', borderRadius: '10px',
              fontSize: '0.9rem', fontWeight: '500', color: 'var(--fg-2)',
              background: 'transparent', border: '1px solid transparent', cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
              e.currentTarget.style.color = '#ef4444';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--fg-2)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <Icon name="log-out" size="md" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar (slide-in) */}
      <aside style={{
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        width: '256px',
        transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-1)',
        borderRight: '1px solid var(--line)',
      }}
      className="show-mobile"
      >
        {/* Logo */}
        <div style={{
          height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', borderBottom: '1px solid var(--line)', flexShrink: 0,
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--fg-0)', textDecoration: 'none' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: '700', color: 'white',
            }}>DT</div>
            <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--fg-0)' }}>Admin</span>
          </Link>
          <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-2)', padding: '4px' }}>
            <Icon name="x" size="md" />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '12px', overflowY: 'auto' }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px', marginBottom: '4px', borderRadius: '10px',
                fontSize: '0.9rem', fontWeight: isActive(item.href) ? '600' : '500',
                textDecoration: 'none', color: isActive(item.href) ? 'var(--brand-blue)' : 'var(--fg-1)',
                backgroundColor: isActive(item.href) ? 'rgba(75, 107, 255, 0.12)' : 'transparent',
              }}
            >
              <Icon name={item.icon as any} size="md" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* ─── Main content ─── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Header */}
        <header style={{
          height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px',
          backgroundColor: 'var(--bg-1)',
          borderBottom: '1px solid var(--line)',
          flexShrink: 0,
        }}>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="show-mobile"
            style={{
              padding: '8px', borderRadius: '8px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: 'var(--fg-0)', display: 'none',
            }}
            aria-label="Open menu"
          >
            <Icon name="menu" size="md" />
          </button>

          {/* Page breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--fg-3)' }}>Admin</span>
            <span style={{ color: 'var(--fg-4)' }}>/</span>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--fg-0)', textTransform: 'capitalize' }}>
              {pathname === '/admin' ? 'Dashboard' : pathname.split('/admin/')[1] || 'Dashboard'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Notification bell */}
            <button
              style={{
                position: 'relative', padding: '8px', borderRadius: '8px',
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: 'var(--fg-1)', transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-2)'; e.currentTarget.style.color = 'var(--fg-0)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--fg-1)'; }}
              aria-label="Notifications"
            >
              <Icon name="bell" size="md" />
              <span style={{
                position: 'absolute', top: '6px', right: '6px',
                width: '8px', height: '8px', borderRadius: '50%',
                backgroundColor: '#ef4444',
                border: '2px solid var(--bg-1)',
              }} />
            </button>

            {/* Avatar */}
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '700', fontSize: '0.9rem', color: 'white',
              cursor: 'pointer',
            }}>
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--bg-0)' }}>
          {children}
        </main>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}

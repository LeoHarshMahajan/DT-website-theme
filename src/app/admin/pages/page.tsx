'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { RichTextEditor } from '@/components/editor/RichTextEditor';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  isPublished: boolean;
  updatedAt: string;
}

type ViewMode = 'list' | 'edit' | 'create';

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function timeAgo(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (d === 0) return 'Today';
  if (d === 1) return '1 day ago';
  return `${d} days ago`;
}

// Static (code-defined) site routes — not editable here, but listed so the
// "Pages" screen reflects every page on the site, not just CMS-authored ones.
const SITE_ROUTES = [
  { path: '/', title: 'Home' },
  { path: '/about', title: 'About' },
  { path: '/solutions', title: 'Solutions' },
  { path: '/solutions/organic-growth', title: 'Solutions — Organic Growth' },
  { path: '/solutions/performance', title: 'Solutions — Performance' },
  { path: '/solutions/ai-automation', title: 'Solutions — AI & Automation' },
  { path: '/solutions/content-social', title: 'Solutions — Content & Social' },
  { path: '/solutions/analytics', title: 'Solutions — Analytics' },
  { path: '/solutions/retention', title: 'Solutions — Retention' },
  { path: '/solutions/brand-creative', title: 'Solutions — Brand & Creative' },
  { path: '/industries', title: 'Industries' },
  { path: '/case-studies', title: 'Case Studies' },
  { path: '/insights', title: 'Insights' },
  { path: '/blog', title: 'Blog' },
  { path: '/pricing', title: 'Pricing' },
  { path: '/contact', title: 'Contact' },
  { path: '/book-consultation', title: 'Book Consultation' },
  { path: '/free-growth-audit', title: 'Free Growth Audit' },
  { path: '/search-engine-optimization', title: 'SEO' },
];

// ─── Page Form ────────────────────────────────────────────────────────────────
function PageForm({
  page,
  onSave,
  onCancel,
}: {
  page: Page | null;
  onSave: (data: Partial<Page>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    title: page?.title ?? '',
    slug: page?.slug ?? '',
    content: page?.content ?? '',
    metaTitle: page?.metaTitle ?? '',
    metaDescription: page?.metaDescription ?? '',
    isPublished: page?.isPublished ?? false,
  });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const handleTitleChange = (v: string) => {
    setForm((f) => ({
      ...f,
      title: v,
      slug: !page && (f.slug === '' || f.slug === slugify(f.title)) ? slugify(v) : f.slug,
    }));
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)',
    color: 'var(--fg-0)', fontSize: '0.95rem', outline: 'none',
    transition: 'border-color 0.2s', boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.8rem', fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    color: 'var(--fg-2)', marginBottom: '8px',
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) { alert('Title is required'); return; }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div style={{ padding: '32px', backgroundColor: 'var(--bg-0)', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button onClick={onCancel}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)', color: 'var(--fg-1)', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500' }}>
          <Icon name="arrow-left" size="sm" /> Back
        </button>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginBottom: '2px' }}>
            {page ? 'Editing page' : 'New page'}
          </p>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--fg-0)', margin: 0 }}>
            {page ? 'Edit Page' : 'Create New Page'}
          </h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}
        className="page-form-grid">

        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Title */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '24px', border: '1px solid var(--line)' }}>
            <label style={labelStyle}>Page Title *</label>
            <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter page title..." style={{ ...inputStyle, fontSize: '1.1rem', fontWeight: '500' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')} />
          </div>

          {/* Slug */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '24px', border: '1px solid var(--line)' }}>
            <label style={labelStyle}>URL Slug</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--fg-3)', whiteSpace: 'nowrap' }}>/pages/</span>
              <input type="text" value={form.slug}
                onChange={(e) => set('slug', slugify(e.target.value))}
                placeholder="page-url-slug" style={inputStyle} disabled={!!page}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')} />
            </div>
            {page && <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginTop: '6px' }}>Slug cannot be changed after creation.</p>}
          </div>

          {/* Content editor */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '24px', border: '1px solid var(--line)' }}>
            <label style={labelStyle}>Page Content</label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => set('content', html)}
              placeholder="Write your page content here..."
            />
          </div>

          {/* SEO */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '24px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--fg-0)', margin: 0 }}>SEO Settings</p>
            <div>
              <label style={labelStyle}>Meta Title</label>
              <input type="text" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)}
                placeholder={form.title || 'Page title for search engines'} style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')} />
            </div>
            <div>
              <label style={labelStyle}>Meta Description</label>
              <textarea value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)}
                placeholder="Brief description for search results (150–160 chars recommended)"
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, fontFamily: 'inherit' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px' }}>
          {/* Publish */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '20px', border: '1px solid var(--line)' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)', marginBottom: '14px' }}>Publish</p>

            {/* Status toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--fg-1)' }}>Status</span>
              <button
                onClick={() => set('isPublished', !form.isPublished)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '5px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: '600',
                  backgroundColor: form.isPublished ? '#16a34a18' : 'var(--bg-3)',
                  color: form.isPublished ? '#16a34a' : 'var(--fg-2)',
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: form.isPublished ? '#16a34a' : 'var(--fg-3)' }} />
                {form.isPublished ? 'Published' : 'Draft'}
              </button>
            </div>

            {/* Save */}
            <button
              onClick={handleSubmit}
              disabled={saving}
              style={{
                width: '100%', padding: '11px', borderRadius: '10px', border: 'none',
                background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))',
                color: 'white', fontWeight: '700', fontSize: '0.95rem',
                cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.7 : 1, transition: 'opacity 0.2s',
              }}
            >
              {saving ? 'Saving…' : page ? 'Update Page' : 'Create Page'}
            </button>

            {page && (
              <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', textAlign: 'center', marginTop: '10px' }}>
                Last updated {timeAgo(page.updatedAt)}
              </p>
            )}
          </div>

          {/* Preview link */}
          {page?.isPublished && (
            <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '16px', border: '1px solid var(--line)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live URL</p>
              <a href={`/pages/${page.slug}`} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.82rem', color: 'var(--brand-blue)', wordBreak: 'break-all', textDecoration: 'none' }}>
                /pages/{page.slug} ↗
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .page-form-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

// ─── Pages List ───────────────────────────────────────────────────────────────
export default function AdminPagesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<Page | null>(null);

  const loadPages = () => {
    setLoading(true);
    fetch('/api/admin/pages')
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((d) => setPages(d.pages ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(loadPages, []);

  const handleSave = async (data: Partial<Page>) => {
    if (editingPage) {
      await fetch(`/api/admin/pages/${editingPage.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        alert(d.error || 'Failed to save page.');
        return;
      }
    }
    setViewMode('list');
    setEditingPage(null);
    loadPages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this page permanently?')) return;
    await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' });
    loadPages();
  };

  const handleTogglePublish = async (page: Page) => {
    setPages((ps) => ps.map((p) => p.id === page.id ? { ...p, isPublished: !p.isPublished } : p));
    await fetch(`/api/admin/pages/${page.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPublished: !page.isPublished }),
    }).catch(() => loadPages());
  };

  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <PageForm
        key={editingPage?.id ?? 'new'}
        page={editingPage}
        onSave={handleSave}
        onCancel={() => { setViewMode('list'); setEditingPage(null); }}
      />
    );
  }

  const publishedCount = pages.filter((p) => p.isPublished).length;

  return (
    <div style={{ padding: '32px', backgroundColor: 'var(--bg-0)', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--fg-0)', margin: 0 }}>Pages</h1>
          <p style={{ color: 'var(--fg-2)', marginTop: '4px', fontSize: '0.9rem' }}>
            {pages.length} total &nbsp;·&nbsp; {publishedCount} published &nbsp;·&nbsp; {pages.length - publishedCount} drafts
          </p>
        </div>
        <button
          onClick={() => { setEditingPage(null); setViewMode('create'); }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))',
            color: 'white', fontWeight: '600', fontSize: '0.9rem',
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >
          <Icon name="plus" size="sm" /> New Page
        </button>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', border: '1px solid var(--line)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '64px 32px', textAlign: 'center', color: 'var(--fg-2)' }}>Loading pages…</div>
        ) : pages.length === 0 ? (
          <div style={{ padding: '64px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>◻</div>
            <p style={{ color: 'var(--fg-1)', marginBottom: '8px', fontWeight: '600' }}>No pages yet</p>
            <p style={{ color: 'var(--fg-3)', fontSize: '0.85rem', marginBottom: '24px' }}>
              Create standalone pages like Terms, Privacy Policy, Thank You, etc.
            </p>
            <button
              onClick={() => { setEditingPage(null); setViewMode('create'); }}
              style={{
                padding: '10px 24px', borderRadius: '10px', border: 'none',
                background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))',
                color: 'white', fontWeight: '600', cursor: 'pointer',
              }}
            >
              Create first page
            </button>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                {['Title', 'URL', 'Status', 'Updated', 'Actions'].map((h) => (
                  <th key={h} style={{
                    padding: '14px 20px', textAlign: h === 'Actions' ? 'right' : 'left',
                    fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase',
                    letterSpacing: '0.05em', color: 'var(--fg-3)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pages.map((page, i) => (
                <tr key={page.id}
                  style={{ borderBottom: i < pages.length - 1 ? '1px solid var(--line)' : 'none', transition: 'background-color 0.15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* Title */}
                  <td style={{ padding: '16px 20px', maxWidth: '260px' }}>
                    <p style={{ fontWeight: '600', color: 'var(--fg-0)', margin: 0, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {page.title}
                    </p>
                    {page.metaDescription && (
                      <p style={{ color: 'var(--fg-3)', margin: '3px 0 0', fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {page.metaDescription}
                      </p>
                    )}
                  </td>
                  {/* URL */}
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--fg-2)', fontFamily: 'var(--font-mono)' }}>
                      /pages/{page.slug}
                    </span>
                  </td>
                  {/* Status */}
                  <td style={{ padding: '16px 20px' }}>
                    <button
                      onClick={() => handleTogglePublish(page)}
                      title="Click to toggle"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '5px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                        fontSize: '0.8rem', fontWeight: '600',
                        backgroundColor: page.isPublished ? '#16a34a18' : 'var(--bg-3)',
                        color: page.isPublished ? '#16a34a' : 'var(--fg-2)',
                      }}
                    >
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: page.isPublished ? '#16a34a' : 'var(--fg-3)' }} />
                      {page.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  {/* Updated */}
                  <td style={{ padding: '16px 20px', color: 'var(--fg-3)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                    {timeAgo(page.updatedAt)}
                  </td>
                  {/* Actions */}
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      {page.isPublished && (
                        <a href={`/pages/${page.slug}`} target="_blank" rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)', color: 'var(--fg-2)', textDecoration: 'none', fontSize: '0.85rem' }}
                          title="View live">↗</a>
                      )}
                      <button
                        onClick={() => { setEditingPage(page); setViewMode('edit'); }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)', color: 'var(--fg-2)', cursor: 'pointer' }}
                        title="Edit"
                      >
                        <Icon name="edit" size="sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)', color: '#ef4444', cursor: 'pointer' }}
                        title="Delete"
                      >
                        <Icon name="trash" size="sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Site routes — read-only reference so every page on the site is listed here,
          not just CMS-authored ones. These are built into the code and aren't editable. */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--fg-0)', margin: '0 0 4px' }}>Site Pages</h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--fg-3)', margin: '0 0 16px' }}>
          Built-in pages on the site. These ship with the code and aren&rsquo;t edited here — use them to see everything that&rsquo;s live.
        </p>
        <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', border: '1px solid var(--line)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {SITE_ROUTES.map((r, i) => (
                <tr key={r.path} style={{ borderBottom: i < SITE_ROUTES.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <td style={{ padding: '10px 20px', fontSize: '0.88rem', color: 'var(--fg-0)', fontWeight: 500 }}>{r.title}</td>
                  <td style={{ padding: '10px 20px', fontSize: '0.82rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>{r.path}</td>
                  <td style={{ padding: '10px 20px', textAlign: 'right' }}>
                    <a href={r.path} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '7px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)', color: 'var(--fg-2)', textDecoration: 'none', fontSize: '0.8rem' }}
                      title="View">↗</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

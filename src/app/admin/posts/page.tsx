'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { BLOG_CATEGORIES } from '@/lib/constants';

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[] | string;
  tagsString?: string;
  category?: string;
  coverImage?: string;
  metaTitle?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  published: boolean;
  status?: string;
  createdAt: string;
  updatedAt: string;
  author: { name: string };
}

type ViewMode = 'list' | 'edit' | 'create';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return 'Today';
  if (d === 1) return '1 day ago';
  return `${d} days ago`;
}

// ─── Create / Edit Form ──────────────────────────────────────────────────────
function PostForm({
  post,
  onSave,
  onCancel,
}: {
  post: Post | null;
  onSave: (data: Partial<Post>) => void;
  onCancel: () => void;
}) {
  const isEditing = !!post;

  const [form, setForm] = useState({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    description: post?.description ?? '',
    content: post?.content ?? '',
    tags: post?.tagsString ?? (Array.isArray(post?.tags) ? post.tags.join(', ') : (post?.tags ?? '')),
    category: post?.category ?? '',
    coverImage: post?.coverImage ?? '',
    metaTitle: post?.metaTitle ?? '',
    ogImage: post?.ogImage ?? '',
    canonical: post?.canonical ?? '',
    noindex: post?.noindex ?? false,
    nofollow: post?.nofollow ?? false,
    published: post?.published ?? false,
  });

  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const handleCoverUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        set('coverImage', data.url);
      } else {
        alert(data.error || 'Upload failed. Paste an image URL instead.');
      }
    } catch {
      alert('Upload failed. Paste an image URL instead.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleTitleChange = (v: string) => {
    setForm((f) => ({
      ...f,
      title: v,
      // Only auto-generate slug for new posts; never overwrite slug on an existing post
      slug: !isEditing && (f.slug === '' || f.slug === slugify(f.title)) ? slugify(v) : f.slug,
    }));
  };

  function slugify(s: string) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid var(--line)',
    backgroundColor: 'var(--bg-2)',
    color: 'var(--fg-0)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--fg-2)',
    marginBottom: '8px',
  };

  return (
    <div style={{ padding: '32px', backgroundColor: 'var(--bg-0)', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button
          onClick={onCancel}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--line)',
            backgroundColor: 'var(--bg-2)', color: 'var(--fg-1)', fontSize: '0.85rem',
            cursor: 'pointer', transition: 'all 0.2s', fontWeight: '500',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--fg-3)'; e.currentTarget.style.color = 'var(--fg-0)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--fg-1)'; }}
        >
          <Icon name="arrow-left" size="sm" />
          Back
        </button>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginBottom: '2px' }}>
            {post ? 'Editing post' : 'New post'}
          </p>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--fg-0)', margin: 0 }}>
            {post ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}
        className="post-form-grid">
        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Title */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '24px', border: '1px solid var(--line)' }}>
            <label style={labelStyle}>Post Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter your post title here..."
              style={{ ...inputStyle, fontSize: '1.1rem', fontWeight: '500' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
            />
          </div>

          {/* Slug + Description */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '24px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>URL Slug</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                  color: 'var(--fg-3)', fontSize: '0.85rem',
                }}>/blog/</span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => set('slug', e.target.value)}
                  placeholder="post-url-slug"
                  style={{ ...inputStyle, paddingLeft: '52px' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Meta Description</label>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Brief description for SEO and post previews..."
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginTop: '6px' }}>
                {form.description.length}/160 characters recommended
              </p>
            </div>
          </div>

          {/* Content editor */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '24px', border: '1px solid var(--line)' }}>
            <label style={labelStyle}>Post Content *</label>
            <RichTextEditor
              value={form.content}
              onChange={(c) => set('content', c)}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Publish settings */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '20px', border: '1px solid var(--line)' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-3)', marginBottom: '16px' }}>
              Publish Settings
            </p>

            {/* Status toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--fg-0)', margin: 0 }}>Status</p>
                <p style={{ fontSize: '0.8rem', color: form.published ? 'var(--brand-blue)' : 'var(--fg-3)', margin: '2px 0 0 0' }}>
                  {form.published ? '● Published' : '○ Draft'}
                </p>
              </div>
              <button
                onClick={() => set('published', !form.published)}
                style={{
                  width: '44px', height: '24px', borderRadius: '12px', border: 'none',
                  backgroundColor: form.published ? 'var(--brand-blue)' : 'var(--bg-3)',
                  cursor: 'pointer', transition: 'background-color 0.3s', position: 'relative',
                }}
              >
                <span style={{
                  position: 'absolute', top: '3px',
                  left: form.published ? '22px' : '3px',
                  width: '18px', height: '18px', borderRadius: '50%',
                  backgroundColor: 'white', transition: 'left 0.3s',
                }} />
              </button>
            </div>

            {/* Save + Publish buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => onSave({ ...form })}
                style={{
                  width: '100%', padding: '12px', borderRadius: '10px', border: 'none',
                  background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))',
                  color: 'white', fontWeight: '600', fontSize: '0.95rem',
                  cursor: 'pointer', transition: 'opacity 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <Icon name="save" size="sm" />
                {form.published ? 'Save & Publish' : 'Save as Draft'}
              </button>
              <button
                onClick={onCancel}
                style={{
                  width: '100%', padding: '10px', borderRadius: '10px',
                  border: '1px solid var(--line)', backgroundColor: 'transparent',
                  color: 'var(--fg-2)', fontSize: '0.9rem', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-2)'; e.currentTarget.style.color = 'var(--fg-0)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--fg-2)'; }}
              >
                Discard Changes
              </button>
            </div>
          </div>

          {/* Tags */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '20px', border: '1px solid var(--line)' }}>
            <label style={labelStyle}>Tags</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => set('tags', e.target.value)}
              placeholder="nextjs, react, tutorial..."
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginTop: '8px' }}>
              Separate multiple tags with commas
            </p>
            {/* Tag chips preview */}
            {form.tags && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                {form.tags.split(',').map((t) => t.trim()).filter(Boolean).map((tag) => (
                  <span key={tag} style={{
                    padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem',
                    backgroundColor: 'rgba(75,107,255,0.1)', color: 'var(--brand-blue)',
                    border: '1px solid rgba(75,107,255,0.2)',
                  }}>{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '20px', border: '1px solid var(--line)' }}>
            <label style={labelStyle}>Category</label>
            <select
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
            >
              <option value="">— Select a category —</option>
              {BLOG_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
            <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginTop: '8px' }}>
              Highlighted on the article and used to pick related posts.
            </p>
          </div>

          {/* Cover image */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '20px', border: '1px solid var(--line)' }}>
            <label style={labelStyle}>Cover Image</label>
            {form.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.coverImage} alt="" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px', border: '1px solid var(--line)' }} />
            )}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                style={{ flex: 1, padding: '9px', borderRadius: '9px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)', color: 'var(--fg-1)', fontSize: '0.82rem', fontWeight: 600, cursor: uploading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Icon name="image" size="sm" />
                {uploading ? 'Uploading…' : form.coverImage ? 'Replace' : 'Upload image'}
              </button>
              {form.coverImage && (
                <button type="button" onClick={() => set('coverImage', '')}
                  style={{ padding: '9px 12px', borderRadius: '9px', border: '1px solid var(--line)', backgroundColor: 'transparent', color: 'var(--fg-3)', fontSize: '0.82rem', cursor: 'pointer' }}>
                  Remove
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCoverUpload(f); }}
            />
            <input
              type="url"
              value={form.coverImage}
              onChange={(e) => set('coverImage', e.target.value)}
              placeholder="…or paste an image URL"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
            />
          </div>

          {/* SEO */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '20px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-3)', margin: 0 }}>SEO</p>
            <div>
              <label style={labelStyle}>SEO Title <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(overrides post title in search)</span></label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => set('metaTitle', e.target.value)}
                placeholder={form.title || 'Leave blank to use post title'}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
              />
            </div>
            <div>
              <label style={labelStyle}>Social Share Image (OG) <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(defaults to cover)</span></label>
              <input
                type="url"
                value={form.ogImage}
                onChange={(e) => set('ogImage', e.target.value)}
                placeholder="https://... (optional)"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
              />
            </div>
            <div>
              <label style={labelStyle}>Canonical URL</label>
              <input
                type="url"
                value={form.canonical}
                onChange={(e) => set('canonical', e.target.value)}
                placeholder="https://thedigitaltriangle.com/blog/..."
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
              />
            </div>

            {/* Indexing controls */}
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-3)', margin: 0 }}>Search Indexing</p>
              {([
                { key: 'index',  desc: 'Allow search engines to index this page', on: !form.noindex,  toggle: () => set('noindex', !form.noindex) },
                { key: 'follow', desc: 'Allow search engines to follow its links', on: !form.nofollow, toggle: () => set('nofollow', !form.nofollow) },
              ] as const).map((row) => (
                <div key={row.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--fg-0)', margin: 0, textTransform: 'capitalize' }}>{row.key}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--fg-3)', margin: '2px 0 0 0' }}>{row.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={row.toggle}
                    aria-label={`Toggle ${row.key}`}
                    style={{ flexShrink: 0, width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer', position: 'relative', backgroundColor: row.on ? 'var(--brand-blue)' : 'var(--bg-3)', transition: 'background-color 0.2s' }}
                  >
                    <span style={{ position: 'absolute', top: '3px', left: row.on ? '22px' : '3px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Author */}
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', padding: '20px', border: '1px solid var(--line)' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-3)', marginBottom: '12px' }}>Author</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '700', color: 'white', fontSize: '0.9rem',
              }}>A</div>
              <div>
                <p style={{ fontWeight: '600', color: 'var(--fg-0)', margin: 0, fontSize: '0.9rem' }}>Admin User</p>
                <p style={{ color: 'var(--fg-3)', margin: 0, fontSize: '0.8rem' }}>admin@digitaltriangle.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .post-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Posts List ───────────────────────────────────────────────────────────────
export default function AdminPostsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  const loadPosts = () => {
    setLoading(true);
    fetch('/api/posts?limit=1000')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setPosts(data.posts ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(loadPosts, []);

  const filtered = posts.filter((p) => {
    if (filter === 'published') return p.published;
    if (filter === 'draft') return !p.published;
    return true;
  });

  const handleSave = async (data: Partial<Post>) => {
    if (editingPost) {
      await fetch(`/api/posts/${editingPost.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        alert(d.error || 'Failed to save post.');
        return;
      }
    }
    setViewMode('list');
    setEditingPost(null);
    loadPosts();
  };

  const handleEdit = (post: Post) => { setEditingPost(post); setViewMode('edit'); };
  const handleCreate = () => { setEditingPost(null); setViewMode('create'); };
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post permanently?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    loadPosts();
  };
  const handleToggle = async (id: string) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, published: !p.published } : p)));
    await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !post.published }),
    }).catch(() => loadPosts());
  };

  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <PostForm
        post={editingPost}
        onSave={handleSave}
        onCancel={() => { setViewMode('list'); setEditingPost(null); }}
      />
    );
  }

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;

  return (
    <div style={{ padding: '32px', backgroundColor: 'var(--bg-0)', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--fg-0)', margin: 0 }}>Posts</h1>
          <p style={{ color: 'var(--fg-2)', marginTop: '4px', fontSize: '0.9rem' }}>
            {posts.length} total &nbsp;·&nbsp; {publishedCount} published &nbsp;·&nbsp; {draftCount} drafts
          </p>
        </div>
        <button
          onClick={handleCreate}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))',
            color: 'white', fontWeight: '600', fontSize: '0.9rem',
            cursor: 'pointer', transition: 'opacity 0.2s', whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <Icon name="plus" size="sm" />
          New Post
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', backgroundColor: 'var(--bg-2)', padding: '4px', borderRadius: '10px', width: 'fit-content' }}>
        {(['all', 'published', 'draft'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '7px 16px', borderRadius: '8px', border: 'none',
              fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer',
              transition: 'all 0.2s', textTransform: 'capitalize',
              backgroundColor: filter === f ? 'var(--bg-1)' : 'transparent',
              color: filter === f ? 'var(--fg-0)' : 'var(--fg-2)',
              boxShadow: filter === f ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            {f} {f === 'all' ? `(${posts.length})` : f === 'published' ? `(${publishedCount})` : `(${draftCount})`}
          </button>
        ))}
      </div>

      {/* Table card */}
      <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', border: '1px solid var(--line)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '64px 32px', textAlign: 'center', color: 'var(--fg-2)' }}>Loading posts…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '64px 32px', textAlign: 'center' }}>
            <Icon name="file-text" size="lg" style={{ color: 'var(--fg-3)', marginBottom: '16px' }} />
            <p style={{ color: 'var(--fg-1)', marginBottom: '20px' }}>No posts found</p>
            <button onClick={handleCreate} style={{
              padding: '10px 24px', borderRadius: '10px', border: 'none',
              background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))',
              color: 'white', fontWeight: '600', cursor: 'pointer',
            }}>
              Create your first post
            </button>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                {['Title', 'Author', 'Status', 'Updated', 'Actions'].map((h) => (
                  <th key={h} style={{
                    padding: '14px 20px', textAlign: h === 'Actions' ? 'right' : 'left',
                    fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase',
                    letterSpacing: '0.05em', color: 'var(--fg-3)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((post, i) => (
                <tr
                  key={post.id}
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--line)' : 'none',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* Title */}
                  <td style={{ padding: '16px 20px', maxWidth: '320px' }}>
                    <p style={{ fontWeight: '600', color: 'var(--fg-0)', margin: 0, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {post.title}
                    </p>
                    <p style={{ color: 'var(--fg-3)', margin: '3px 0 0 0', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      /blog/{post.slug}
                    </p>
                  </td>
                  {/* Author */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', fontWeight: '700', color: 'white',
                      }}>
                        {post.author.name.charAt(0)}
                      </div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--fg-1)', whiteSpace: 'nowrap' }}>{post.author.name}</span>
                    </div>
                  </td>
                  {/* Status */}
                  <td style={{ padding: '16px 20px' }}>
                    <button
                      onClick={() => handleToggle(post.id)}
                      title="Click to toggle status"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '5px 12px', borderRadius: '20px', border: 'none',
                        cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600',
                        transition: 'all 0.2s',
                        backgroundColor: post.published ? 'rgba(75,107,255,0.15)' : 'rgba(192,38,211,0.15)',
                        color: post.published ? 'var(--brand-blue)' : 'var(--brand-magenta)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        backgroundColor: post.published ? 'var(--brand-blue)' : 'var(--brand-magenta)',
                      }} />
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  {/* Date */}
                  <td style={{ padding: '16px 20px', whiteSpace: 'nowrap' }}>
                    <p style={{ color: 'var(--fg-1)', margin: 0, fontSize: '0.85rem' }}>{timeAgo(post.updatedAt)}</p>
                    <p style={{ color: 'var(--fg-3)', margin: '2px 0 0 0', fontSize: '0.75rem' }}>{formatDate(post.updatedAt)}</p>
                  </td>
                  {/* Actions */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                      <button
                        onClick={() => handleEdit(post)}
                        title="Edit post"
                        style={{
                          padding: '7px', borderRadius: '8px', border: 'none',
                          backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(75,107,255,0.12)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        <Icon name="edit" size="sm" style={{ color: 'var(--brand-blue)' }} />
                      </button>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        title="View post"
                        style={{
                          padding: '7px', borderRadius: '8px', display: 'flex',
                          backgroundColor: 'transparent', transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-3)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        <Icon name="eye" size="sm" style={{ color: 'var(--fg-2)' }} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        title="Delete post"
                        style={{
                          padding: '7px', borderRadius: '8px', border: 'none',
                          backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.12)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        <Icon name="trash" size="sm" style={{ color: '#ef4444' }} />
                      </button>
                    </div>
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

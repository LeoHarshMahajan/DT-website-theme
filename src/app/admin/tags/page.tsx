'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';

interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  _count: { posts: number };
  createdAt: string;
}

const PRESET_COLORS = ['#4b6bff', '#8b5cf6', '#c026d3', '#e11d8a', '#f59e0b', '#22c55e', '#ef4444', '#06b6d4'];

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#4b6bff');
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetch('/api/admin/tags')
      .then((r) => r.json())
      .then((d) => setTags(d.tags ?? []))
      .finally(() => setLoading(false));
  }, []);

  const addTag = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    const res = await fetch('/api/admin/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim(), color: newColor }),
    });
    const data = await res.json();
    if (res.ok) {
      setTags((prev) => [...prev, { ...data.tag, _count: { posts: 0 } }].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName('');
    } else {
      alert(data.error || 'Failed to create tag');
    }
    setSaving(false);
  };

  const saveEdit = async (id: string) => {
    if (!editName.trim()) return;
    const res = await fetch(`/api/admin/tags/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName.trim() }),
    });
    if (res.ok) {
      setTags((prev) => prev.map((t) => (t.id === id ? { ...t, name: editName.trim() } : t)));
      setEditId(null);
    }
  };

  const deleteTag = async (id: string, postCount: number) => {
    if (postCount > 0 && !confirm(`This tag is used on ${postCount} post(s). Delete anyway?`)) return;
    const res = await fetch(`/api/admin/tags/${id}`, { method: 'DELETE' });
    if (res.ok) setTags((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: '28px', maxWidth: '760px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--fg-0)', margin: '0 0 4px' }}>Tags</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--fg-3)', margin: 0 }}>
          Create and manage blog post tags.
        </p>
      </div>

      {/* Add tag form */}
      <div style={{ backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--fg-3)', marginBottom: '14px' }}>New Tag</p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Tag name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
            style={{ flex: 1, minWidth: '180px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)', color: 'var(--fg-0)', fontSize: '0.85rem', outline: 'none' }}
          />
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setNewColor(c)}
                style={{ width: '20px', height: '20px', borderRadius: '50%', background: c, border: newColor === c ? '2px solid white' : '2px solid transparent', cursor: 'pointer', outline: 'none', boxShadow: newColor === c ? `0 0 0 2px ${c}` : 'none' }}
              />
            ))}
          </div>
          <button
            onClick={addTag}
            disabled={saving || !newName.trim()}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', background: 'var(--brand-blue)', color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', opacity: saving || !newName.trim() ? 0.5 : 1 }}
          >
            <Icon name="plus" size="sm" /> Add
          </button>
        </div>
      </div>

      {/* Tags table */}
      <div style={{ backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--fg-3)', fontSize: '0.9rem' }}>Loading…</div>
        ) : tags.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--fg-3)', fontSize: '0.9rem' }}>No tags yet. Create your first one above.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                {['Tag', 'Posts', 'Created', ''].map((h) => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--fg-3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tags.map((tag, i) => (
                <tr key={tag.id} style={{ borderBottom: i < tags.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <td style={{ padding: '12px 16px' }}>
                    {editId === tag.id ? (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          autoFocus
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(tag.id); if (e.key === 'Escape') setEditId(null); }}
                          style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--bg-2)', color: 'var(--fg-0)', fontSize: '0.85rem', outline: 'none' }}
                        />
                        <button onClick={() => saveEdit(tag.id)} style={{ padding: '4px 10px', borderRadius: '6px', background: 'var(--brand-blue)', color: '#fff', border: 'none', fontSize: '0.75rem', cursor: 'pointer' }}>Save</button>
                        <button onClick={() => setEditId(null)} style={{ padding: '4px 10px', borderRadius: '6px', background: 'transparent', color: 'var(--fg-3)', border: '1px solid var(--line)', fontSize: '0.75rem', cursor: 'pointer' }}>Cancel</button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: tag.color ?? '#4b6bff', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.87rem', fontWeight: '600', color: 'var(--fg-0)' }}>{tag.name}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>/{tag.slug}</span>
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.85rem', color: 'var(--fg-2)' }}>{tag._count.posts}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>
                    {new Date(tag.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => { setEditId(tag.id); setEditName(tag.name); }}
                        style={{ padding: '4px 10px', borderRadius: '6px', background: 'transparent', color: 'var(--fg-3)', border: '1px solid var(--line)', fontSize: '0.75rem', cursor: 'pointer' }}
                      >
                        Rename
                      </button>
                      <button
                        onClick={() => deleteTag(tag.id, tag._count.posts)}
                        style={{ padding: '4px 8px', borderRadius: '6px', background: 'transparent', color: 'var(--fg-3)', border: '1px solid var(--line)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--fg-3)'; }}
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
    </div>
  );
}

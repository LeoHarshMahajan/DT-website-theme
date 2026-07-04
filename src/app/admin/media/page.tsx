'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon } from '@/components/ui/Icon';

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
}

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/admin/media')
      .then((r) => r.json())
      .then((d) => setMedia(d.media ?? []))
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (res.ok) {
        const newItem: MediaItem = {
          id: Date.now().toString(),
          filename: file.name,
          url: data.url,
          size: file.size,
          mimeType: file.type,
          createdAt: new Date().toISOString(),
        };
        setMedia((prev) => [newItem, ...prev]);
      } else {
        alert(data.error || 'Upload failed');
      }
    }
    setUploading(false);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this file permanently?')) return;
    const res = await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
    if (res.ok) setMedia((prev) => prev.filter((m) => m.id !== id));
  };

  const totalSize = media.reduce((acc, m) => acc + m.size, 0);

  return (
    <div style={{ padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--fg-0)', margin: '0 0 4px' }}>Media Library</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--fg-3)', margin: 0 }}>
            {media.length} file{media.length !== 1 ? 's' : ''} · {fmtSize(totalSize)} total
          </p>
        </div>
        <div>
          <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={(e) => handleUpload(e.target.files)} />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '9px', background: 'var(--brand-blue)', color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', opacity: uploading ? 0.6 : 1 }}
          >
            <Icon name="image" size="sm" />
            {uploading ? 'Uploading…' : 'Upload Images'}
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '80px', textAlign: 'center', color: 'var(--fg-3)', fontSize: '0.9rem' }}>Loading…</div>
      ) : media.length === 0 ? (
        <div
          onClick={() => inputRef.current?.click()}
          style={{ border: '2px dashed var(--line)', borderRadius: '16px', padding: '80px', textAlign: 'center', cursor: 'pointer', color: 'var(--fg-3)' }}
        >
          <Icon name="image" size="lg" style={{ margin: '0 auto 12px', display: 'block', opacity: 0.4 }} />
          <p style={{ margin: 0, fontSize: '0.9rem' }}>No files yet. Click to upload.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
          {media.map((item) => (
            <div
              key={item.id}
              style={{ backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              {/* Thumbnail */}
              <div style={{ height: '120px', background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {item.mimeType.startsWith('image/') ? (
                  <img src={item.url} alt={item.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Icon name="file-text" size="lg" style={{ opacity: 0.3 }} />
                )}
              </div>
              {/* Info + actions */}
              <div style={{ padding: '10px 12px' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--fg-0)', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.filename}>
                  {item.filename}
                </p>
                <p style={{ fontSize: '0.68rem', color: 'var(--fg-3)', margin: '0 0 10px', fontFamily: 'var(--font-mono)' }}>{fmtSize(item.size)}</p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => copyUrl(item.url)}
                    style={{ flex: 1, padding: '5px 0', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', color: copied === item.url ? '#22c55e' : 'var(--fg-2)', fontSize: '0.72rem', cursor: 'pointer', fontWeight: '600' }}
                  >
                    {copied === item.url ? 'Copied!' : 'Copy URL'}
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--fg-3)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--fg-3)'; }}
                  >
                    <Icon name="trash" size="sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

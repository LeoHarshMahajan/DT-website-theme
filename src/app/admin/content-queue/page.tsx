'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

interface QaCheck { name: string; passed: boolean; note: string }
interface ContentTopic {
  id: string;
  topic: string;
  notes: string | null;
  status: string;
  createdAt: string;
}
interface ContentDraft {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  targetQuery: string;
  whyItWillRank: string;
  qaReport: string;
  status: string;
  rejectionReason: string | null;
  postId: string | null;
  createdAt: string;
}

const STATUS_COLOR: Record<string, string> = {
  QUEUED: 'var(--brand-blue)',
  APPROVED: 'var(--brand-violet)',
  REJECTED: 'var(--fg-3)',
};

function rgba(varColor: string, a: number) {
  const map: Record<string, string> = {
    'var(--brand-blue)': `rgba(75,107,255,${a})`,
    'var(--brand-violet)': `rgba(139,92,246,${a})`,
    'var(--fg-3)': `rgba(138,138,154,${a})`,
  };
  return map[varColor] || `rgba(138,138,154,${a})`;
}

export default function ContentQueuePage() {
  const [drafts, setDrafts] = useState<ContentDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [runMessage, setRunMessage] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [topics, setTopics] = useState<ContentTopic[]>([]);
  const [newTopic, setNewTopic] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const loadTopics = () => {
    fetch('/api/admin/content-topics')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setTopics(d.topics ?? []))
      .catch(() => {});
  };

  const load = () => {
    setLoading(true);
    fetch('/api/admin/content-queue')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setDrafts(d.drafts ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
    loadTopics();
  };
  useEffect(load, []);

  const addTopic = async () => {
    if (newTopic.trim().length < 3) return;
    await fetch('/api/admin/content-topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: newTopic.trim(), notes: newNotes.trim() || undefined }),
    });
    setNewTopic('');
    setNewNotes('');
    loadTopics();
  };

  const removeTopic = async (id: string) => {
    await fetch(`/api/admin/content-topics?id=${id}`, { method: 'DELETE' });
    loadTopics();
  };

  const runNow = async () => {
    setRunning(true);
    setRunMessage(null);
    try {
      const res = await fetch('/api/admin/content-queue', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setRunMessage(`Failed: ${data.error || 'unknown error'}`);
      } else if (data.passed === false) {
        setRunMessage(data.reason);
      } else {
        setRunMessage('New draft ready below.');
        load();
      }
    } catch {
      setRunMessage('Failed: could not reach the server.');
    } finally {
      setRunning(false);
    }
  };

  const act = async (id: string, action: 'approve' | 'edit' | 'reject', rejectionReason?: string) => {
    setRunMessage(null);
    try {
      const res = await fetch(`/api/admin/content-queue/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, rejectionReason }),
      });
      const data = await res.json();
      // Without this the button did nothing visible on failure — the 409
      // "already actioned" guard was invisible, and a dropped request looked
      // identical to success.
      if (!res.ok) {
        setRunMessage(data.error || `Couldn't ${action} that draft — please try again.`);
        load();
        return;
      }
      if (action === 'edit' && data.postId) {
        // Deep-links into the inline editor on the posts page. There is no
        // /admin/posts/<id> route — sending them there 404'd.
        window.location.href = `/admin/posts?edit=${data.postId}`;
        return;
      }
    } catch {
      setRunMessage('Network error — that action may not have gone through. Reloading.');
    }
    setRejectingId(null);
    setRejectReason('');
    load();
  };

  // CLAIMED = currently being written by a run in progress. Still shown, so a
  // topic never appears to vanish mid-run.
  const pendingTopics = topics.filter((t) => t.status !== 'USED');
  const usedTopics = topics.filter((t) => t.status === 'USED');
  const queued = drafts.filter((d) => d.status === 'QUEUED');
  const past = drafts.filter((d) => d.status !== 'QUEUED');

  return (
    <div style={{ padding: '32px', backgroundColor: 'var(--bg-0)', minHeight: '100%' }}>
      <Reveal direction="down">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--fg-0)', margin: 0 }}>Content Queue</h1>
            <p style={{ color: 'var(--fg-2)', marginTop: '4px', fontSize: '0.9rem' }}>
              {loading ? 'Loading…' : `${queued.length} awaiting review`}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button
              onClick={runNow}
              disabled={running}
              style={{
                padding: '10px 20px', borderRadius: '10px', border: 'none', fontWeight: 600, fontSize: '0.9rem',
                cursor: running ? 'default' : 'pointer', opacity: running ? 0.7 : 1,
                background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))', color: '#fff',
              }}
            >
              {running ? 'Running…' : 'Run now'}
            </button>
            {runMessage && <p style={{ color: 'var(--fg-2)', fontSize: '0.8rem', marginTop: '8px', maxWidth: 280 }}>{runMessage}</p>}
          </div>
        </div>
      </Reveal>

      {/* Topic direction — what you want written next */}
      <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', border: '1px solid var(--line)', padding: 20, marginBottom: 24 }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg-0)', margin: 0 }}>Your topics</h2>
        <p style={{ color: 'var(--fg-3)', fontSize: '0.8rem', margin: '4px 0 14px 0' }}>
          Each run takes the oldest topic here first. Empty list = it picks its own topic.
        </p>

        {pendingTopics.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            {pendingTopics.map((t, idx) => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 10, backgroundColor: 'var(--bg-2)' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: idx === 0 ? 'var(--brand-blue)' : 'var(--fg-3)', minWidth: 42, paddingTop: 2 }}>
                  {t.status === 'CLAIMED' ? 'WRITING' : idx === 0 ? 'NEXT' : `#${idx + 1}`}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: 'var(--fg-0)', fontSize: '0.88rem' }}>{t.topic}</p>
                  {t.notes && <p style={{ margin: '2px 0 0 0', color: 'var(--fg-3)', fontSize: '0.78rem' }}>{t.notes}</p>}
                </div>
                <button onClick={() => removeTopic(t.id)} style={{ background: 'none', border: 'none', color: 'var(--fg-3)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }} title="Remove">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <input
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addTopic(); }}
            placeholder="Topic you want covered, e.g. WhatsApp retention flows for D2C"
            style={{ flex: '2 1 280px', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--line-strong)', background: 'var(--bg-0)', color: 'var(--fg-0)', fontSize: '0.85rem' }}
          />
          <input
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addTopic(); }}
            placeholder="Optional angle / must-cover points"
            style={{ flex: '1 1 200px', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--line-strong)', background: 'var(--bg-0)', color: 'var(--fg-0)', fontSize: '0.85rem' }}
          />
          <button
            onClick={addTopic}
            disabled={newTopic.trim().length < 3}
            style={{
              padding: '9px 18px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '0.85rem',
              cursor: newTopic.trim().length < 3 ? 'default' : 'pointer',
              opacity: newTopic.trim().length < 3 ? 0.5 : 1,
              background: 'var(--brand-blue)', color: '#fff',
            }}
          >
            Add
          </button>
        </div>

        {usedTopics.length > 0 && (
          <p style={{ color: 'var(--fg-3)', fontSize: '0.75rem', marginTop: 12, marginBottom: 0 }}>
            Already used: {usedTopics.map((t) => t.topic).join(' · ')}
          </p>
        )}
      </div>

      <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', border: '1px solid var(--line)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '64px', textAlign: 'center', color: 'var(--fg-2)' }}>Loading…</div>
        ) : queued.length === 0 ? (
          <div style={{ padding: '64px 32px', textAlign: 'center' }}>
            <Icon name="file-text" size="lg" style={{ color: 'var(--fg-3)' }} />
            <p style={{ color: 'var(--fg-1)', marginTop: '16px' }}>Nothing queued</p>
            <p style={{ color: 'var(--fg-3)', fontSize: '0.85rem' }}>Click Run now to generate and self-verify a draft.</p>
          </div>
        ) : (
          queued.map((d, i) => {
            const qa: { passed: boolean; checks: QaCheck[] } = JSON.parse(d.qaReport || '{"passed":false,"checks":[]}');
            const isOpen = expanded === d.id;
            return (
              <div key={d.id} style={{ borderBottom: i < queued.length - 1 ? '1px solid var(--line)' : 'none', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, cursor: 'pointer' }} onClick={() => setExpanded(isOpen ? null : d.id)}>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--fg-0)', margin: 0, fontSize: '1rem' }}>{d.title}</p>
                    <p style={{ color: 'var(--fg-3)', margin: '4px 0 0 0', fontSize: '0.82rem' }}>Target: {d.targetQuery}</p>
                  </div>
                  <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, height: 'fit-content',
                    backgroundColor: rgba(STATUS_COLOR[d.status], 0.15), color: STATUS_COLOR[d.status], border: `1px solid ${rgba(STATUS_COLOR[d.status], 0.35)}` }}>
                    {d.status}
                  </span>
                </div>

                {isOpen && (
                  <div style={{ marginTop: 16 }}>
                    <p style={{ color: 'var(--fg-1)', fontSize: '0.88rem', fontStyle: 'italic' }}>{d.whyItWillRank}</p>
                    {d.excerpt && <p style={{ color: 'var(--fg-2)', fontSize: '0.85rem' }}>{d.excerpt}</p>}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '12px 0' }}>
                      {qa.checks.map((c) => (
                        <span key={c.name} title={c.note} style={{
                          padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 500,
                          backgroundColor: c.passed ? rgba('var(--brand-blue)', 0.12) : 'rgba(225,29,138,0.15)',
                          color: c.passed ? 'var(--brand-blue)' : '#e11d8a',
                        }}>
                          {c.passed ? '✓' : '✕'} {c.name}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{ border: '1px solid var(--line)', borderRadius: 10, padding: 16, maxHeight: 300, overflowY: 'auto', color: 'var(--fg-1)', fontSize: '0.85rem' }}
                      dangerouslySetInnerHTML={{ __html: d.content }}
                    />

                    <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                      {/* Single approve path: draft + open the full editor, so
                          images/meta/cover get set in one pass. Publishing
                          straight from here meant re-opening the post anyway. */}
                      <button onClick={() => act(d.id, 'edit')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', background: 'var(--brand-blue)', color: '#fff' }}>
                        Approve → open in editor
                      </button>
                      {rejectingId === d.id ? (
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flex: 1 }}>
                          <input
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Reason (optional)"
                            style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--line-strong)', background: 'var(--bg-0)', color: 'var(--fg-0)', fontSize: '0.85rem' }}
                          />
                          <button onClick={() => act(d.id, 'reject', rejectReason)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', background: '#e11d8a', color: '#fff' }}>
                            Confirm reject
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setRejectingId(d.id)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--line)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', background: 'transparent', color: 'var(--fg-3)' }}>
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {past.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--fg-0)', marginBottom: 12 }}>History</h2>
          <div style={{ backgroundColor: 'var(--bg-1)', borderRadius: '14px', border: '1px solid var(--line)', overflow: 'hidden' }}>
            {past.map((d, i) => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: i < past.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <div>
                  <p style={{ margin: 0, color: 'var(--fg-1)', fontSize: '0.88rem' }}>{d.title}</p>
                  {d.rejectionReason && <p style={{ margin: '2px 0 0 0', color: 'var(--fg-3)', fontSize: '0.78rem' }}>Reason: {d.rejectionReason}</p>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {d.postId && d.status === 'APPROVED' && (
                    <Link href={`/admin/posts?edit=${d.postId}`} style={{ fontSize: '0.8rem', color: 'var(--brand-blue)' }}>Open in editor →</Link>
                  )}
                  <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600,
                    backgroundColor: rgba(STATUS_COLOR[d.status], 0.15), color: STATUS_COLOR[d.status] }}>
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type Msg = { role: 'user' | 'assistant'; content: string };

export function DiscoveryWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, loading]);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/auth')) return null;

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setMsgs((m) => [...m, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, page: pathname, message: text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsgs((m) => [...m, { role: 'assistant', content: "This is still warming up on our end — leave a message via the contact form and we'll follow up." }]);
        return;
      }
      setConversationId(data.conversationId);
      setMsgs((m) => [...m, { role: 'assistant', content: data.reply }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 60 }}>
      {open && (
        <div
          style={{
            width: 360,
            maxWidth: 'calc(100vw - 48px)',
            height: 480,
            marginBottom: 12,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-1)',
            border: '1px solid var(--line-strong)',
            borderRadius: 16,
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)', color: 'var(--fg-0)', fontWeight: 600 }}>
            Digital Triangle Assistant
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.length === 0 && (
              <div style={{ color: 'var(--fg-2)', fontSize: 14 }}>
                Tell me what you&apos;re trying to grow — I can pull up your site and point out what&apos;s missing.
              </div>
            )}
            {msgs.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  background: m.role === 'user' ? 'var(--brand-blue)' : 'var(--bg-2)',
                  color: m.role === 'user' ? '#fff' : 'var(--fg-1)',
                  padding: '8px 12px',
                  borderRadius: 12,
                  fontSize: 14,
                  maxWidth: '85%',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && <div style={{ color: 'var(--fg-2)', fontSize: 13 }}>Thinking…</div>}
            <div ref={bottomRef} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            style={{ display: 'flex', borderTop: '1px solid var(--line)' }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              style={{ flex: 1, padding: '12px 14px', background: 'transparent', color: 'var(--fg-0)', border: 'none', outline: 'none', fontSize: 14 }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ padding: '0 16px', background: 'var(--brand-blue)', color: '#fff', border: 'none', fontWeight: 600 }}
            >
              Send
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open discovery assistant"
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet), var(--brand-magenta))',
          color: '#fff',
          fontSize: 24,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        {open ? '×' : '?'}
      </button>
    </div>
  );
}

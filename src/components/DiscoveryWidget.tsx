'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getPersona } from '@/lib/discovery/personas';

type Msg = { role: 'user' | 'assistant'; content: string };
type Slot = { start: string; end: string; label: string };

const IST = 'Asia/Kolkata';
const dayKey = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { timeZone: IST, weekday: 'short', day: 'numeric', month: 'short' });
const timeLabel = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-IN', { timeZone: IST, hour: 'numeric', minute: '2-digit', hour12: true });

export function DiscoveryWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [pickedDay, setPickedDay] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, loading]);

  // Welcome bubble is presentational (matches the persona the backend uses
  // for this page) and costs nothing — the real conversation starts once
  // the visitor sends their first message.
  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ role: 'assistant', content: getPersona(pathname ?? '/').opener }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
      setSlots(data.slots ?? []);
      setPickedDay(null);
    } catch {
      // Without this the request silently vanished — the visitor's message sat
      // there with no reply and no error, which reads as the bot ignoring them.
      setMsgs((m) => [
        ...m,
        { role: 'assistant', content: "Something dropped on our end there — mind sending that again?" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 60 }}>
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
            {slots.length > 0 && !loading && (
              <div style={{ border: '1px solid var(--line-strong)', borderRadius: 12, padding: 12, background: 'var(--bg-2)' }}>
                <div style={{ fontSize: 12, color: 'var(--fg-2)', marginBottom: 8 }}>
                  {pickedDay ? 'Pick a time (IST)' : 'Pick a day'}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {!pickedDay
                    ? [...new Set(slots.map((s) => dayKey(s.start)))].map((day) => (
                        <button
                          key={day}
                          onClick={() => setPickedDay(day)}
                          style={{
                            padding: '6px 10px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                            border: '1px solid var(--line-strong)', background: 'var(--bg-1)', color: 'var(--fg-1)',
                          }}
                        >
                          {day}
                        </button>
                      ))
                    : slots
                        .filter((s) => dayKey(s.start) === pickedDay)
                        .map((s) => (
                          <button
                            key={s.start}
                            onClick={() => {
                              setSlots([]);
                              send(`Book me for ${s.label} (exact slot start: ${s.start})`);
                            }}
                            style={{
                              padding: '6px 10px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                              border: 'none', background: 'var(--brand-blue)', color: '#fff', fontWeight: 600,
                            }}
                          >
                            {timeLabel(s.start)}
                          </button>
                        ))}
                </div>
                {pickedDay && (
                  <button
                    onClick={() => setPickedDay(null)}
                    style={{ marginTop: 8, background: 'none', border: 'none', color: 'var(--fg-2)', fontSize: 12, cursor: 'pointer', padding: 0 }}
                  >
                    ← other days
                  </button>
                )}
              </div>
            )}
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
        aria-label={open ? 'Close discovery assistant' : 'Open discovery assistant'}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet), var(--brand-magenta))',
          color: '#fff',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}

'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { common, createLowlight } from 'lowlight';
import { useEffect, useState, useRef } from 'react';

const lowlight = createLowlight(common);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

// ── Toolbar button ───────────────────────────────────────────────────────────
function TB({
  onClick,
  active,
  title,
  children,
  disabled,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      style={{
        minWidth: '32px',
        height: '32px',
        padding: '0 8px',
        borderRadius: '6px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '0.85rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: active ? 'var(--brand-blue)' : 'transparent',
        color: active ? '#fff' : disabled ? 'var(--fg-3)' : 'var(--fg-1)',
        transition: 'all 0.15s',
      }}
      onMouseEnter={(e) => { if (!active && !disabled) e.currentTarget.style.backgroundColor = 'var(--bg-3)'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: 'var(--line)', margin: '4px 2px' }} />;
}

// ── Modal ────────────────────────────────────────────────────────────────────
function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '14px', padding: '24px', width: '100%', maxWidth: '440px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--fg-0)', margin: '0 0 16px 0' }}>{title}</h3>
        {children}
      </div>
    </div>
  );
}

const fieldStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)',
  color: 'var(--fg-0)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--fg-2)', marginBottom: '6px',
};

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your content here…',
  readOnly = false,
}: RichTextEditorProps) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imgOpen, setImgOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [imgAlt, setImgAlt] = useState('');
  const [editingImage, setEditingImage] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [sourceMode, setSourceMode] = useState(false);
  const [sourceHtml, setSourceHtml] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Image.configure({ allowBase64: true, HTMLAttributes: { class: 'editor-image' } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener', target: '_blank' } }),
      Underline,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editable: !readOnly,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) {
    return <div style={{ padding: '16px', color: 'var(--fg-2)' }}>Loading editor…</div>;
  }

  const openLink = () => {
    setLinkUrl(editor.getAttributes('link').href || '');
    setLinkOpen(true);
  };
  const applyLink = () => {
    if (linkUrl) editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    else editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setLinkOpen(false);
  };

  const openImage = () => {
    const existing = editor.getAttributes('image');
    if (existing.src) {
      setImgUrl(existing.src);
      setImgAlt(existing.alt || '');
      setEditingImage(true);
    } else {
      setImgUrl('');
      setImgAlt('');
      setEditingImage(false);
    }
    setImgOpen(true);
  };
  const applyImage = () => {
    if (!imgUrl) { setImgOpen(false); return; }
    if (editingImage) {
      editor.chain().focus().updateAttributes('image', { src: imgUrl, alt: imgAlt }).run();
    } else {
      editor.chain().focus().setImage({ src: imgUrl, alt: imgAlt }).run();
    }
    setImgOpen(false);
  };

  const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setImgUrl(data.url);
        if (!imgAlt) setImgAlt(file.name.replace(/\.[^.]+$/, ''));
      } else {
        alert(data.error || 'Upload failed. You can paste an image URL instead.');
      }
    } catch {
      alert('Upload failed. You can paste an image URL instead.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const setBlock = (level: 1 | 2 | 3 | 0) => {
    if (level === 0) editor.chain().focus().setParagraph().run();
    else editor.chain().focus().toggleHeading({ level }).run();
  };

  const toggleSource = () => {
    if (sourceMode) {
      // Leaving source mode → apply edited HTML back to the visual editor
      editor.commands.setContent(sourceHtml || '<p></p>', false);
      onChange(editor.getHTML());
      setSourceMode(false);
    } else {
      // Entering source mode → load current HTML into the textarea
      setSourceHtml(editor.getHTML());
      setSourceMode(true);
    }
  };

  const onSourceChange = (html: string) => {
    setSourceHtml(html);
    onChange(html);
  };

  return (
    <div style={{ borderRadius: '12px', border: '1px solid var(--line)', overflow: 'hidden', backgroundColor: 'var(--bg-2)' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2px', padding: '8px', borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
        <TB onClick={() => setBlock(0)} active={editor.isActive('paragraph')} title="Paragraph">P</TB>
        <TB onClick={() => setBlock(1)} active={editor.isActive('heading', { level: 1 })} title="Heading 1">H1</TB>
        <TB onClick={() => setBlock(2)} active={editor.isActive('heading', { level: 2 })} title="Heading 2">H2</TB>
        <TB onClick={() => setBlock(3)} active={editor.isActive('heading', { level: 3 })} title="Heading 3">H3</TB>

        <Divider />

        <TB onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><span style={{ fontWeight: 800 }}>B</span></TB>
        <TB onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><span style={{ fontStyle: 'italic' }}>I</span></TB>
        <TB onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><span style={{ textDecoration: 'underline' }}>U</span></TB>
        <TB onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><span style={{ textDecoration: 'line-through' }}>S</span></TB>
        <TB onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight">H̲</TB>
        <TB onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline code"><span style={{ fontFamily: 'monospace' }}>{'</>'}</span></TB>

        <Divider />

        <TB onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align left">⯬</TB>
        <TB onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align center">≡</TB>
        <TB onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align right">⯮</TB>

        <Divider />

        <TB onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">•≡</TB>
        <TB onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">1.</TB>
        <TB onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">❝</TB>
        <TB onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">{'{ }'}</TB>
        <TB onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">―</TB>

        <Divider />

        <TB onClick={openLink} active={editor.isActive('link')} title="Add / edit link">🔗</TB>
        <TB onClick={openImage} active={editor.isActive('image')} title="Insert / edit image">🖼</TB>

        <Divider />

        <TB onClick={() => editor.chain().focus().undo().run()} title="Undo" disabled={!editor.can().undo()}>↶</TB>
        <TB onClick={() => editor.chain().focus().redo().run()} title="Redo" disabled={!editor.can().redo()}>↷</TB>
        <TB onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear formatting">⌫</TB>

        <Divider />

        <TB onClick={toggleSource} active={sourceMode} title="Toggle HTML / text source">{'</> HTML'}</TB>
      </div>

      {/* Editor — visual or HTML source */}
      {sourceMode ? (
        <textarea
          value={sourceHtml}
          onChange={(e) => onSourceChange(e.target.value)}
          spellCheck={false}
          placeholder="Paste or write HTML / text here…"
          style={{
            width: '100%', minHeight: '360px', padding: '20px 24px', border: 'none',
            outline: 'none', resize: 'vertical', backgroundColor: 'var(--bg-2)',
            color: 'var(--fg-1)', fontFamily: 'monospace', fontSize: '0.85rem',
            lineHeight: 1.6, boxSizing: 'border-box',
          }}
        />
      ) : (
        <EditorContent editor={editor} className="dt-editor" />
      )}

      {/* Link modal */}
      {linkOpen && (
        <Modal title="Link" onClose={() => setLinkOpen(false)}>
          <label style={labelStyle}>URL</label>
          <input style={fieldStyle} value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://example.com" autoFocus
            onKeyDown={(e) => e.key === 'Enter' && applyLink()} />
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button onClick={applyLink} className="btn btn-primary" style={{ flex: 1 }}>{linkUrl ? 'Apply' : 'Remove link'}</button>
            <button onClick={() => setLinkOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
          </div>
        </Modal>
      )}

      {/* Image modal */}
      {imgOpen && (
        <Modal title={editingImage ? 'Edit image' : 'Insert image'} onClose={() => setImgOpen(false)}>
          {!editingImage && (
            <>
              <label style={labelStyle}>Upload from computer</label>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="btn btn-secondary"
                style={{ width: '100%', marginBottom: '14px' }}
              >
                {uploading ? 'Uploading…' : '⬆ Choose file'}
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={onPickFile} style={{ display: 'none' }} />
              <p style={{ fontSize: '0.72rem', color: 'var(--fg-3)', textAlign: 'center', margin: '0 0 14px 0' }}>— or —</p>
            </>
          )}
          <label style={labelStyle}>Image URL</label>
          <input style={fieldStyle} value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder="https://…/image.jpg" autoFocus />
          <label style={{ ...labelStyle, marginTop: '14px' }}>Alt text (for SEO & accessibility)</label>
          <input style={fieldStyle} value={imgAlt} onChange={(e) => setImgAlt(e.target.value)} placeholder="Describe the image…"
            onKeyDown={(e) => e.key === 'Enter' && applyImage()} />
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button onClick={applyImage} className="btn btn-primary" style={{ flex: 1 }}>{editingImage ? 'Update' : 'Insert'}</button>
            <button onClick={() => setImgOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
          </div>
        </Modal>
      )}

      <style>{`
        .dt-editor .ProseMirror {
          min-height: 360px;
          padding: 20px 24px;
          outline: none;
          color: var(--fg-1);
          font-size: 1rem;
          line-height: 1.7;
        }
        .dt-editor .ProseMirror:focus { outline: none; }
        .dt-editor .ProseMirror > * + * { margin-top: 0.85em; }
        .dt-editor .ProseMirror h1 { font-size: 2rem; font-weight: 800; color: var(--fg-0); line-height: 1.25; }
        .dt-editor .ProseMirror h2 { font-size: 1.55rem; font-weight: 700; color: var(--fg-0); line-height: 1.3; }
        .dt-editor .ProseMirror h3 { font-size: 1.25rem; font-weight: 700; color: var(--fg-0); }
        .dt-editor .ProseMirror p { color: var(--fg-1); }
        .dt-editor .ProseMirror a { color: var(--brand-blue); text-decoration: underline; }
        .dt-editor .ProseMirror ul { list-style: disc; padding-left: 1.5em; }
        .dt-editor .ProseMirror ol { list-style: decimal; padding-left: 1.5em; }
        .dt-editor .ProseMirror li { margin: 0.25em 0; }
        .dt-editor .ProseMirror li p { margin: 0; }
        .dt-editor .ProseMirror blockquote {
          border-left: 3px solid var(--brand-violet);
          padding-left: 1em; margin-left: 0; color: var(--fg-2); font-style: italic;
        }
        .dt-editor .ProseMirror pre {
          background: var(--bg-0); border: 1px solid var(--line); border-radius: 8px;
          padding: 14px; font-family: monospace; font-size: 0.85rem; overflow-x: auto; color: var(--fg-1);
        }
        .dt-editor .ProseMirror code {
          background: var(--bg-3); padding: 2px 5px; border-radius: 4px; font-size: 0.85em; font-family: monospace;
        }
        .dt-editor .ProseMirror pre code { background: none; padding: 0; }
        .dt-editor .ProseMirror mark { background: var(--brand-blue); color: #fff; padding: 0 2px; border-radius: 3px; }
        .dt-editor .ProseMirror hr { border: none; border-top: 1px solid var(--line); margin: 1.5em 0; }
        .dt-editor .ProseMirror img.editor-image {
          max-width: 100%; height: auto; border-radius: 8px; margin: 0.5em 0;
        }
        .dt-editor .ProseMirror img.ProseMirror-selectednode { outline: 2px solid var(--brand-blue); }
        .dt-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder); color: var(--fg-3); float: left; height: 0; pointer-events: none;
        }
      `}</style>
    </div>
  );
}

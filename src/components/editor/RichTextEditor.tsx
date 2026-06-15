'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import { common, createLowlight } from 'lowlight';
import { useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';

const lowlight = createLowlight(common);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your content here...',
  readOnly = false,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image.configure({
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable: !readOnly,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleCode = () => editor.chain().focus().toggleCode().run();
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run();
  const toggleHeading1 = () => editor.chain().focus().toggleHeading({ level: 1 }).run();
  const toggleHeading2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleHeading3 = () => editor.chain().focus().toggleHeading({ level: 3 }).run();
  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };
  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
  const clearFormatting = () => editor.chain().focus().clearNodes().unsetAllMarks().run();

  if (readOnly) {
    return (
      <div className="prose dark:prose-invert max-w-none rounded-lg border border-line p-4">
        <EditorContent editor={editor} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-line overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-line bg-bg-1 p-2">
        {/* Text Formatting */}
        <button
          onClick={toggleHeading1}
          className={`p-2 rounded hover:bg-bg-2 transition ${
            editor.isActive('heading', { level: 1 }) ? 'bg-brand-blue text-white' : ''
          }`}
          title="Heading 1"
        >
          <Icon name="type" size="sm" />
        </button>
        <button
          onClick={toggleHeading2}
          className={`p-2 rounded hover:bg-bg-2 transition ${
            editor.isActive('heading', { level: 2 }) ? 'bg-brand-blue text-white' : ''
          }`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={toggleHeading3}
          className={`p-2 rounded hover:bg-bg-2 transition ${
            editor.isActive('heading', { level: 3 }) ? 'bg-brand-blue text-white' : ''
          }`}
          title="Heading 3"
        >
          H3
        </button>

        <div className="w-px bg-line" />

        <button
          onClick={toggleBold}
          className={`p-2 rounded hover:bg-bg-2 transition font-bold ${
            editor.isActive('bold') ? 'bg-brand-blue text-white' : ''
          }`}
          title="Bold"
        >
          B
        </button>
        <button
          onClick={toggleItalic}
          className={`p-2 rounded hover:bg-bg-2 transition italic ${
            editor.isActive('italic') ? 'bg-brand-blue text-white' : ''
          }`}
          title="Italic"
        >
          I
        </button>
        <button
          onClick={toggleUnderline}
          className={`p-2 rounded hover:bg-bg-2 transition underline ${
            editor.isActive('underline') ? 'bg-brand-blue text-white' : ''
          }`}
          title="Underline"
        >
          U
        </button>

        <div className="w-px bg-line" />

        <button
          onClick={toggleCode}
          className={`p-2 rounded hover:bg-bg-2 transition font-mono text-xs ${
            editor.isActive('code') ? 'bg-brand-blue text-white' : ''
          }`}
          title="Inline Code"
        >
          {'<>'}
        </button>
        <button
          onClick={toggleCodeBlock}
          className={`p-2 rounded hover:bg-bg-2 transition ${
            editor.isActive('codeBlock') ? 'bg-brand-blue text-white' : ''
          }`}
          title="Code Block"
        >
          <Icon name="code" size="sm" />
        </button>

        <div className="w-px bg-line" />

        <button
          onClick={toggleBulletList}
          className={`p-2 rounded hover:bg-bg-2 transition ${
            editor.isActive('bulletList') ? 'bg-brand-blue text-white' : ''
          }`}
          title="Bullet List"
        >
          <Icon name="list" size="sm" />
        </button>
        <button
          onClick={toggleOrderedList}
          className={`p-2 rounded hover:bg-bg-2 transition ${
            editor.isActive('orderedList') ? 'bg-brand-blue text-white' : ''
          }`}
          title="Numbered List"
        >
          <Icon name="list" size="sm" />
        </button>
        <button
          onClick={toggleBlockquote}
          className={`p-2 rounded hover:bg-bg-2 transition ${
            editor.isActive('blockquote') ? 'bg-brand-blue text-white' : ''
          }`}
          title="Blockquote"
        >
          <Icon name="quote" size="sm" />
        </button>

        <div className="w-px bg-line" />

        <button
          onClick={addLink}
          className="p-2 rounded hover:bg-bg-2 transition"
          title="Add Link"
        >
          <Icon name="link" size="sm" />
        </button>
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-bg-2 transition"
          title="Add Image"
        >
          <Icon name="image" size="sm" />
        </button>

        <div className="w-px bg-line" />

        <button
          onClick={clearFormatting}
          className="p-2 rounded hover:bg-bg-2 transition text-xs"
          title="Clear Formatting"
        >
          Clear
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="prose dark:prose-invert max-w-none focus:outline-none p-4 min-h-96"
      />
    </div>
  );
}

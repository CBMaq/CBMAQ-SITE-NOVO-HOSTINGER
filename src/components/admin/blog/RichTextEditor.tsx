"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Heading1, 
  Heading2, 
  Heading3, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Type,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Strikethrough,
  Underline as UnderlineIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/lib/supabase";
import { useRef } from "react";
import { MediaPicker } from "./MediaPicker";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Digite a URL do link:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleImageSelect = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  const buttons = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: "bold", label: "Negrito" },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: "italic", label: "Itálico" },
    { icon: UnderlineIcon, action: () => editor.chain().focus().toggleUnderline().run(), active: "underline", label: "Sublinhado" },
    { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), active: "strike", label: "Riscado" },
    { type: "divider" },
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: { heading: { level: 1 } }, label: "Título 1" },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: { heading: { level: 2 } }, label: "Título 2" },
    { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: { heading: { level: 3 } }, label: "Título 3" },
    { type: "divider" },
    { icon: AlignLeft, action: () => editor.chain().focus().setTextAlign("left").run(), active: { textAlign: "left" }, label: "Alinhar Esquerda" },
    { icon: AlignCenter, action: () => editor.chain().focus().setTextAlign("center").run(), active: { textAlign: "center" }, label: "Alinhar Centro" },
    { icon: AlignRight, action: () => editor.chain().focus().setTextAlign("right").run(), active: { textAlign: "right" }, label: "Alinhar Direita" },
    { type: "divider" },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: "bulletList", label: "Lista" },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: "orderedList", label: "Lista Numerada" },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: "blockquote", label: "Citação" },
    { type: "divider" },
    { icon: LinkIcon, action: addLink, active: "link", label: "Link" },
    { 
      type: "custom", 
      component: (
        <MediaPicker 
          onSelect={handleImageSelect}
          trigger={
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-md transition-all hover:bg-primary/10 hover:text-primary"
              title="Inserir Imagem da Galeria"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          }
        />
      )
    },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-muted/50 border-b border-border sticky top-0 z-10 backdrop-blur-md">
      {buttons.map((btn: any, i) => (
        btn.type === "divider" ? (
          <div key={i} className="w-px h-6 bg-border mx-1 self-center" />
        ) : btn.type === "custom" ? (
          <div key={i}>{btn.component}</div>
        ) : (
          <Button
            key={i}
            variant="ghost"
            size="sm"
            onClick={btn.action}
            className={cn(
              "h-8 w-8 p-0 rounded-md transition-all hover:bg-primary/10 hover:text-primary",
              btn.active && editor.isActive(btn.active) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-sm"
            )}
            title={btn.label}
          >
            <btn.icon className="h-4 w-4" />
          </Button>
        )
      ))}
      <div className="flex-1" />
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().undo().run()}
        className="h-8 w-8 p-0"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => editor.chain().focus().redo().run()}
        className="h-8 w-8 p-0"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function RichTextEditor({ content, onChange, placeholder = "Comece a escrever seu conteúdo profissional..." }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-2xl border border-border/50 max-w-full h-auto my-6 shadow-lg",
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg dark:prose-invert max-w-none min-h-[400px] p-6 focus:outline-none focus:ring-0",
      },
    },
  });

  return (
    <div className="bg-background border border-border rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <div className="p-2 bg-muted/20 border-t border-border/50 text-[10px] text-muted-foreground flex justify-between uppercase tracking-widest font-bold">
        <span>Editor Visual CBMaq</span>
        <span>{editor?.storage.characterCount?.characters?.() || 0} Caracteres</span>
      </div>
    </div>
  );
}

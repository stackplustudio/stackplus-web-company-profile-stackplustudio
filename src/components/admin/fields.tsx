"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Semua input form admin ada di sini supaya tampilannya seragam. */

export const inputClass =
  "w-full rounded-[12px] border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 " +
  "transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 disabled:opacity-60";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold text-ink-dark">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-ink/50">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={4} {...props} className={cn(inputClass, "resize-y leading-relaxed", props.className)} />;
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputClass, "pr-8", props.className)} />;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-bold text-ink-dark">{label}</p>
        {description && <p className="mt-0.5 text-xs text-ink/60">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-0.5 h-6 w-11 flex-shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
          checked ? "bg-primary" : "bg-line"
        )}
      >
        <span
          className={cn(
            "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-5"
          )}
        />
      </button>
    </div>
  );
}

/** Input tag: ketik lalu Enter atau koma untuk menambah, Backspace untuk menghapus yang terakhir. */
export function ChipsField({
  id,
  value,
  onChange,
  placeholder,
  max = 20,
}: {
  id?: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  max?: number;
}) {
  const [draft, setDraft] = useState("");

  function add(raw: string) {
    const item = raw.trim();
    if (!item || value.includes(item) || value.length >= max) return;
    onChange([...value, item]);
  }

  return (
    <div className="flex min-h-[44px] flex-wrap items-center gap-2 rounded-[12px] border border-line bg-white p-2 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15">
      {value.map((chip) => (
        <span key={chip} className="inline-flex items-center gap-1 rounded-full bg-primary/10 py-1 pl-3 pr-1.5 text-xs font-bold text-primary">
          {chip}
          <button
            type="button"
            aria-label={`Remove ${chip}`}
            onClick={() => onChange(value.filter((c) => c !== chip))}
            className="rounded-full p-0.5 hover:bg-primary hover:text-white"
          >
            <X size={12} aria-hidden />
          </button>
        </span>
      ))}
      <input
        id={id}
        value={draft}
        disabled={value.length >= max}
        placeholder={value.length === 0 ? placeholder : value.length >= max ? `Max ${max}` : ""}
        onChange={(e) => {
          const text = e.target.value;
          if (text.includes(",")) {
            text.split(",").forEach(add);
            setDraft("");
          } else setDraft(text);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add(draft);
            setDraft("");
          } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => {
          add(draft);
          setDraft("");
        }}
        className="min-w-[120px] flex-1 bg-transparent px-2 py-1 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
      />
    </div>
  );
}

/** Satu baris = satu item. Cocok untuk daftar kalimat (fitur, benefit). */
export function LinesField({
  id,
  value,
  onChange,
  placeholder,
  rows = 6,
}: {
  id?: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  rows?: number;
}) {
  const [text, setText] = useState(value.join("\n"));
  return (
    <TextArea
      id={id}
      rows={rows}
      value={text}
      placeholder={placeholder}
      onChange={(e) => {
        setText(e.target.value);
        onChange(e.target.value.split("\n").map((l) => l.trim()).filter(Boolean));
      }}
    />
  );
}
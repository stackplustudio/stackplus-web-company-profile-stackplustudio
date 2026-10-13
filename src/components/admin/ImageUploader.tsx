"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_BYTES = 4 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

export default function ImageUploader({
  value,
  onChange,
  max,
  error,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  max: number;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const remaining = max - value.length;
  const busy = uploading > 0;

  async function uploadFiles(files: File[]) {
    if (files.length === 0 || remaining <= 0) return;
    const queue = files.slice(0, remaining);
    setMessage(files.length > remaining ? `Only ${max} images are allowed. Extra files were skipped.` : null);
    setUploading(queue.length);

    const added: string[] = [];
    for (const file of queue) {
      if (!ACCEPTED.includes(file.type)) {
        setMessage(`${file.name}: only JPG, PNG or WebP images are allowed.`);
      } else if (file.size > MAX_BYTES) {
        setMessage(`${file.name}: image is larger than 4 MB.`);
      } else {
        try {
          const body = new FormData();
          body.append("file", file);
          const res = await fetch("/api/admin/upload", { method: "POST", body });
          const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
          if (res.ok && data.url) added.push(data.url);
          else setMessage(`${file.name}: ${data.error ?? "upload failed."}`);
        } catch {
          setMessage(`${file.name}: network error, please try again.`);
        }
      }
      setUploading((n) => n - 1);
    }
    if (added.length > 0) onChange([...value, ...added]);
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  const iconBtn =
    "flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-ink shadow hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-40";

  return (
    <div>
      {value.length > 0 && (
        <ul className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {value.map((url, i) => (
            <li key={url} className="group relative overflow-hidden rounded-[12px] border border-line bg-surface-alt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Project image ${i + 1}`} className="aspect-[16/10] w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-white shadow">
                  <Star size={11} aria-hidden /> Card preview
                </span>
              )}
              <div className="absolute inset-x-2 bottom-2 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <button type="button" aria-label="Move left" className={iconBtn} disabled={i === 0} onClick={() => move(i, i - 1)}>
                    <ArrowLeft size={14} aria-hidden />
                  </button>
                  <button type="button" aria-label="Move right" className={iconBtn} disabled={i === value.length - 1} onClick={() => move(i, i + 1)}>
                    <ArrowRight size={14} aria-hidden />
                  </button>
                  {i !== 0 && (
                    <button type="button" aria-label="Set as card preview" title="Set as card preview" className={iconBtn} onClick={() => move(i, 0)}>
                      <Star size={14} aria-hidden />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Remove image"
                  className={cn(iconBtn, "hover:bg-red-600")}
                  onClick={() => onChange(value.filter((u) => u !== url))}
                >
                  <Trash2 size={14} aria-hidden />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {remaining > 0 && (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            void uploadFiles(Array.from(e.dataTransfer.files));
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed px-6 py-8 text-center transition",
            dragging ? "border-primary bg-primary/5" : "border-line bg-white hover:border-primary/50",
            busy && "pointer-events-none opacity-70"
          )}
        >
          {busy ? <Loader2 size={24} className="animate-spin text-primary" aria-hidden /> : <ImagePlus size={24} className="text-primary" aria-hidden />}
          <span className="text-sm font-bold text-ink-dark">{busy ? "Uploading…" : "Click to upload or drag images here"}</span>
          <span className="text-xs text-ink/60">
            Landscape JPG, PNG or WebP, up to 4 MB each · {value.length}/{max} used
          </span>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(",")}
            multiple
            className="sr-only"
            disabled={busy}
            onChange={(e) => {
              void uploadFiles(Array.from(e.target.files ?? []));
              if (inputRef.current) inputRef.current.value = "";
            }}
          />
        </label>
      )}

      {(message || error) && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-600">{error ?? message}</p>
      )}
    </div>
  );
}
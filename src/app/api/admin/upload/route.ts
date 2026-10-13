import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { imageSize } from "image-size";
import { requireAdmin } from "@/lib/auth";

// Server upload di Vercel dibatasi ±4.5 MB per request, jadi batas file 4 MB.
const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

export async function POST(request: Request) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file uploaded." }, { status: 400 });

  const ext = ALLOWED[file.type];
  if (!ext) return NextResponse.json({ error: "Only JPG, PNG or WebP images are allowed." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Image is larger than 4 MB." }, { status: 400 });

  const buffer = new Uint8Array(await file.arrayBuffer());
  let width = 0, height = 0;
  try {
    const dim = imageSize(buffer);
    width = dim.width ?? 0; height = dim.height ?? 0;
  } catch {
    return NextResponse.json({ error: "File is not a valid image." }, { status: 400 });
  }
  if (!width || !height || width <= height)
    return NextResponse.json({ error: "Image must be landscape (wider than tall)." }, { status: 400 });

  const blob = await put(`portfolio/project.${ext}`, file, { access: "public", addRandomSuffix: true, contentType: file.type });
  return NextResponse.json({ url: blob.url, width, height });
}
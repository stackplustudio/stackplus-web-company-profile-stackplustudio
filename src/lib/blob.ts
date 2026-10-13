import "server-only";
import { del } from "@vercel/blob";

export function isBlobUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch { return false; }
}

export async function deleteBlobs(urls: string[]) {
  const targets = urls.filter(isBlobUrl);
  if (targets.length === 0) return;
  try { await del(targets); } catch (error) { console.error("Failed to delete blobs:", error); }
}
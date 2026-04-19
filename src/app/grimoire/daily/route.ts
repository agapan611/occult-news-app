import { redirect } from "next/navigation";
import { getAllStories } from "@/lib/stories";

export const dynamic = "force-dynamic";

function jstDateString(): string {
  const nowMs = Date.now() + 9 * 60 * 60 * 1000;
  return new Date(nowMs).toISOString().slice(0, 10);
}

function seedFromString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export async function GET() {
  const stories = getAllStories();
  if (stories.length === 0) redirect("/grimoire");
  const seed = seedFromString(jstDateString());
  const pick = stories[seed % stories.length];
  redirect(`/grimoire/${pick.id}`);
}

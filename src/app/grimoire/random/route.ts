import { redirect } from "next/navigation";
import { getAllStories } from "@/lib/stories";

export const dynamic = "force-dynamic";

export async function GET() {
  const stories = getAllStories();
  if (stories.length === 0) redirect("/grimoire");
  const pick = stories[Math.floor(Math.random() * stories.length)];
  redirect(`/grimoire/${pick.id}`);
}

"use client";

import { useHydrated } from "@/store/progress";
import LessonPage from "./lesson-client";

// Lessons and area tests shuffle questions with Math.random, so the prerendered HTML can never match
// the client render. Render the lesson only after hydration to avoid a hydration mismatch.
export default function LessonShell() {
  const hydrated = useHydrated();
  if (!hydrated) return <div className="text-sm text-[var(--muted)]">Loading…</div>;
  return <LessonPage />;
}

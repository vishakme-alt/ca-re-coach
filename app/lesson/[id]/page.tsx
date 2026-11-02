import { competencies, domains } from "@/content/curriculum";
import LessonShell from "./lesson-shell";

// Static export needs every lesson id up front: one per competency plus one area test per exam area.
export const dynamicParams = false;
export function generateStaticParams() {
  return [...competencies.map((c) => ({ id: c.id })), ...domains.map((d) => ({ id: `test-${d.code}` }))];
}

export default function Page() {
  return <LessonShell />;
}

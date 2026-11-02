import { competencies } from "@/content/curriculum";
import CompetencyPage from "./learn-client";

export const dynamicParams = false;
export function generateStaticParams() {
  return competencies.map((c) => ({ competency: c.id }));
}

export default function Page() {
  return <CompetencyPage />;
}

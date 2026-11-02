"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getCompetency, getNotes } from "@/lib/content";
import { DISTINCTIONS, FACTS, type FactTag } from "@/content/reference-structured";
import { GLOSSARY, type GlossaryTag } from "@/content/glossary";
import { Badge, Card, CardBody, PageHeader } from "@/components/ui";
import { Markdown } from "@/components/markdown";
import { Stagger, StaggerItem } from "@/components/motion";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

const TABS = ["Facts", "Distinctions", "Glossary", "Notes"] as const;
type Tab = (typeof TABS)[number];
const FACT_TAGS: ("All" | FactTag)[] = ["All", "Land", "Agency", "Money", "Practice"];
const GLOSSARY_TAGS: ("All" | GlossaryTag)[] = ["All", "Land & ownership", "Agency & contracts", "Finance & value", "Practice & law"];

export default function ReferencePage() {
  const [tab, setTab] = useState<Tab>("Facts");
  const [q, setQ] = useState("");
  const [factTag, setFactTag] = useState<(typeof FACT_TAGS)[number]>("All");
  const [glossTag, setGlossTag] = useState<(typeof GLOSSARY_TAGS)[number]>("All");
  const term = q.trim().toLowerCase();

  const facts = useMemo(() => FACTS.filter((f) => (factTag === "All" || f.tag === factTag) && (!term || f.fact.toLowerCase().includes(term))), [factTag, term]);
  const dists = useMemo(() => DISTINCTIONS.filter((d) => !term || (d.a + d.b + d.diff).toLowerCase().includes(term)), [term]);
  const notes = useMemo(() => getNotes().filter((n) => !term || (n.title + n.bodyMd).toLowerCase().includes(term)), [term]);
  const glossary = useMemo(
    () => GLOSSARY.filter((g) => (glossTag === "All" || g.tag === glossTag) && (!term || (g.term + " " + g.def).toLowerCase().includes(term))),
    [glossTag, term]
  );

  return (
    <div className="space-y-5">
      <PageHeader title="Reference" subtitle="Facts, look-alike pairs, glossary and notes. Re-verify dollar amounts and deadlines against current California law." />

      <div className="relative">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-9 pr-3 text-sm" />
      </div>

      <div className="flex gap-1 rounded-xl bg-[var(--surface-2)] p-1">
        {TABS.map((t) => (
          <button key={t} onClick={() => { haptic("tap"); setTab(t); }} className={cn("press flex-1 cursor-pointer whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold", tab === t ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm" : "text-[var(--muted)]")}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Facts" && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {FACT_TAGS.map((t) => (
              <button key={t} onClick={() => setFactTag(t)} className={cn("press cursor-pointer rounded-full px-3 py-1 text-xs font-semibold", factTag === t ? "bg-[var(--primary)] text-white" : "bg-[var(--surface-2)] text-[var(--muted)]")}>{t}</button>
            ))}
          </div>
          <Stagger className="space-y-2">
            {facts.map((f) => (
              <StaggerItem key={f.n}>
                <Card><CardBody className="flex items-start gap-3 p-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--primary)]/12 text-[11px] font-bold text-[var(--primary)]">{f.n}</span>
                  <p className="flex-1 text-sm leading-relaxed">{f.fact}</p>
                  <Badge>{f.tag}</Badge>
                </CardBody></Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}

      {tab === "Distinctions" && (
        <Stagger className="grid gap-3 sm:grid-cols-2">
          {dists.map((d) => (
            <StaggerItem key={d.a + d.b}>
              <Card><CardBody className="space-y-1.5 p-4">
                <div className="flex items-center gap-2 text-sm font-bold"><span>{d.a}</span><span className="text-[var(--muted)]">vs.</span><span>{d.b}</span></div>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{d.diff}</p>
              </CardBody></Card>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      {tab === "Glossary" && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {GLOSSARY_TAGS.map((t) => (
              <button key={t} onClick={() => setGlossTag(t)} className={cn("press cursor-pointer rounded-full px-3 py-1 text-xs font-semibold", glossTag === t ? "bg-[var(--primary)] text-white" : "bg-[var(--surface-2)] text-[var(--muted)]")}>{t}</button>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {glossary.map((g) => (
              <Card key={g.term}><CardBody className="space-y-1 p-3.5">
                <div className="text-sm font-bold">{g.term}</div>
                <p className="text-xs leading-relaxed text-[var(--muted)]">{g.def}</p>
              </CardBody></Card>
            ))}
          </div>
        </div>
      )}

      {tab === "Notes" && (
        <div className="space-y-3">
          {notes.map((n) => (
            <Card key={n.id}><CardBody className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold">{n.title}</h3>
                {n.competencyId && <Badge>{getCompetency(n.competencyId)?.code}</Badge>}
              </div>
              <div className="prose-sm text-sm leading-relaxed"><Markdown>{n.bodyMd}</Markdown></div>
            </CardBody></Card>
          ))}
        </div>
      )}
    </div>
  );
}

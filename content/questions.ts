import type { Question } from "@/lib/types";
import { areaI } from "./q-area-1";
import { areaII } from "./q-area-2";
import { areaIII } from "./q-area-3";
import { areaIV, areaV } from "./q-area-4-5";
import { areaVI } from "./q-area-6";
import { areaVII } from "./q-area-7";
import { extraIII, extraIV, extraV } from "./q-extra";

// Practice bank: original questions authored for this app against the DRE salesperson outline.
export const questions: Question[] = [...areaI, ...areaII, ...areaIII, ...extraIII, ...areaIV, ...extraIV, ...areaV, ...extraV, ...areaVI, ...areaVII];

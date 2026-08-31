import type { Achievement } from "./types";

/**
 * ===========================================================================
 *  ACHIEVEMENTS — the animated number strip.
 * ===========================================================================
 *  Every figure here must be defensible from the résumé. Add a new object to
 *  add a new counter; the grid re-flows on its own.
 */
export const achievements: Achievement[] = [
  {
    value: 8,
    label: "Evaluation Tasks Accepted",
    detail: "Containerised RL evaluation tasks authored — all 8 accepted.",
  },
  {
    value: 8,
    label: "Engineering Domains Covered",
    detail: "Including security, machine learning and data processing.",
  },
  {
    value: 15,
    suffix: "-stage",
    label: "CI Validation Pipeline",
    detail: "Static analysis, containerised validation and live trial runs.",
  },
  {
    value: 58,
    label: "Mutants Per Task (max)",
    detail: "Single-clause mutants used to prove every rule was enforced.",
  },
  {
    value: 30,
    suffix: "%",
    label: "Reliability Improvement",
    detail: "From automating deployment processes and reducing downtime.",
  },
];

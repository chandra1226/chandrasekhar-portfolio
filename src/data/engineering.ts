import type { EngineeringFocusArea, Highlight, PipelineStage } from "./types";

/**
 * ===========================================================================
 *  ENGINEERING FOCUS — the four "what I actually do" cards.
 * ===========================================================================
 */
export const focusAreas: EngineeringFocusArea[] = [
  {
    id: "ai-evaluation",
    icon: "sparkles",
    title: "AI Evaluation Infrastructure",
    description:
      "Containerised evaluation environments with golden reference solutions, automated pass/fail verifiers and per-rule mutation testing that proves the suite actually enforces the spec.",
    technologies: ["Python 3", "Docker", "pytest", "Mutation Testing"],
  },
  {
    id: "backend-microservices",
    icon: "boxes",
    title: "Backend Microservices",
    description:
      "Scalable Java and Spring Boot services for fintech and payments — Switch, Acquirer and Issuer platforms, plus Mastercard Version 3 and Version 4 integrations.",
    technologies: ["Java", "Spring Boot", "REST APIs", "Microservices"],
  },
  {
    id: "event-driven",
    icon: "radio",
    title: "Event-Driven Systems",
    description:
      "Kafka-based asynchronous workflows carrying transaction processing, designed so throughput and failure handling stay predictable as volume grows.",
    technologies: ["Kafka", "Event-Driven Architecture", "Async Processing"],
  },
  {
    id: "production-engineering",
    icon: "gauge",
    title: "Production Engineering",
    description:
      "Debugging and root-cause analysis on live incidents, containerised deployment with Docker, Kubernetes and Helm, and CI/CD automation that makes releases boring.",
    technologies: ["Kubernetes", "Helm", "CI/CD", "GitHub Actions", "AWS"],
  },
];

/**
 * ===========================================================================
 *  ARCHITECTURE PIPELINE — the animated conceptual diagram.
 * ===========================================================================
 *  This illustrates the shape of the evaluation work described above. It is a
 *  conceptual visualisation, not a diagram of any proprietary system.
 */
export const pipelineStages: PipelineStage[] = [
  {
    id: "task",
    label: "Developer Task",
    icon: "gitBranch",
    description: "A production-shaped engineering problem with an explicit rule set.",
  },
  {
    id: "container",
    label: "Containerised Environment",
    icon: "container",
    description: "A reproducible Docker image pinning the whole toolchain.",
  },
  {
    id: "service",
    label: "Python Service",
    icon: "layers",
    description: "A multi-module service the model has to modify correctly.",
  },
  {
    id: "golden",
    label: "Golden Solution",
    icon: "sparkles",
    description: "The reference implementation that defines what correct means.",
  },
  {
    id: "verifier",
    label: "Automated Verifier",
    icon: "shieldCheck",
    description: "A pass/fail harness running untrusted code under dropped privileges.",
  },
  {
    id: "mutation",
    label: "Mutation Testing",
    icon: "activity",
    description: "Single-clause mutants confirming every rule is genuinely enforced.",
  },
  {
    id: "ci",
    label: "CI/CD Validation",
    icon: "workflow",
    description: "Static analysis, containerised validation and live trial runs.",
  },
  {
    id: "result",
    label: "Evaluation Result",
    icon: "network",
    description: "A reproducible signal about how well the model actually codes.",
  },
];

/**
 * ===========================================================================
 *  ENGINEERING HIGHLIGHTS — six cards, each traceable to a real role.
 * ===========================================================================
 */
export const highlights: Highlight[] = [
  {
    id: "eval-tasks",
    icon: "sparkles",
    title: "AI Evaluation Tasks",
    context: "Handshake AI — Project Dynamo",
    description:
      "Eight containerised reinforcement-learning evaluation tasks authored and accepted, across eight engineering domains including security, machine learning and data processing. Each one pairs a multi-module Python service with a golden reference solution and an automated pass/fail verifier.",
    technologies: ["Python 3", "Docker", "pytest"],
  },
  {
    id: "verifier-infra",
    icon: "lock",
    title: "Secure Verifier Infrastructure",
    context: "Handshake AI — Project Dynamo",
    description:
      "Hardened verifier harnesses that execute untrusted third-party code under dropped privileges, sealed filesystems and symlink-safe file I/O — so a hostile submission cannot escape the evaluation sandbox or tamper with its own result.",
    technologies: ["Docker", "Linux", "Python 3"],
  },
  {
    id: "mutation-testing",
    icon: "activity",
    title: "Per-Rule Mutation Testing",
    context: "Handshake AI — Project Dynamo",
    description:
      "Up to 58 single-clause mutants per task, generated rule by rule, to demonstrate that every specified rule was genuinely enforced by the verifier suite rather than incidentally satisfied — with the reasoning behind each test design documented.",
    technologies: ["Mutation Testing", "pytest", "GitHub Actions"],
  },
  {
    id: "fintech-microservices",
    icon: "boxes",
    title: "Fintech Microservices",
    context: "HPS",
    description:
      "Backend microservices in Java and Spring Boot across payments and cards systems — Switch, Acquirer and Issuer platforms, plus Mastercard Version 3 and Version 4 integrations — developed and refactored for maintainability and long-term reliability.",
    technologies: ["Java", "Spring Boot", "Microservices"],
  },
  {
    id: "kafka-transactions",
    icon: "radio",
    title: "Kafka Transaction Processing",
    context: "HPS",
    description:
      "Asynchronous, event-driven workflows built on Kafka for transaction processing, with the resulting containerised services deployed to production using Docker, Kubernetes and Helm.",
    technologies: ["Kafka", "Docker", "Kubernetes", "Helm"],
  },
  {
    id: "deployment-automation",
    icon: "workflow",
    title: "Deployment Automation",
    context: "Key achievement",
    description:
      "Automated deployment processes, reducing downtime and increasing application reliability by 30% — alongside a monolith-to-microservices migration that improved scalability and maintainability.",
    technologies: ["CI/CD", "Docker", "Kubernetes"],
  },
];

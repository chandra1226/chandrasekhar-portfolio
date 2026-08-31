import type { Experience } from "./types";

/**
 * ===========================================================================
 *  EXPERIENCE — rendered by the timeline, newest first.
 * ===========================================================================
 *  To add a role, copy any object below, change the values and put it at the
 *  top of the array. Nothing else needs editing.
 *
 *  Set `featured: true` on at most one or two roles — featured entries get a
 *  brighter accent rail and a highlighted card in the timeline.
 */
export const experiences: Experience[] = [
  {
    id: "handshake-ai",
    company: "Handshake AI — Project Dynamo",
    role: "Software Engineer — AI Evaluation",
    employmentType: "Freelance",
    location: "Remote",
    startDate: "08/2026",
    endDate: "Present",
    summary:
      "Benchmark programme measuring the coding ability of frontier AI models, building reproducible task environments and golden reference solutions.",
    responsibilities: [
      "Authored 8 containerised reinforcement-learning evaluation tasks, all accepted, spanning 8 engineering domains including security, machine learning and data processing — each pairing a multi-module Python service, a golden reference solution and an automated pass/fail verifier.",
      "Built Docker evaluation environments and hardened verifier harnesses that execute untrusted third-party code under dropped privileges, sealed filesystems and symlink-safe file I/O.",
      "Drove every submission through a 15-stage GitHub Actions pipeline covering static analysis, containerised validation and live trial runs; diagnosed and cleared blocking failures — direct bug-fixing and debugging work under pipeline constraints.",
      "Applied per-rule mutation testing, up to 58 single-clause mutants per task, to prove every specified rule was enforced by the verifier suite, and documented the technical reasoning behind each solution and test design.",
    ],
    technologies: [
      "Python 3",
      "Docker",
      "pytest",
      "GitHub Actions",
      "Mutation Testing",
      "CI/CD",
    ],
    featured: true,
  },
  {
    id: "hps",
    company: "HPS",
    role: "Application Developer",
    location: "Pune, India",
    startDate: "11/2024",
    endDate: "Present",
    summary:
      "Backend engineering for fintech and payment platforms — card switching, acquiring and issuing.",
    responsibilities: [
      "Developed and refactored scalable backend microservices in Java and Spring Boot for fintech and payment applications, improving maintainability and long-term reliability.",
      "Built features across payments and cards systems — Switch, Acquirer and Issuer platforms, and Mastercard integrations (Version 3 and Version 4).",
      "Designed Kafka-based asynchronous, event-driven workflows for transaction processing, and deployed containerised services with Docker, Kubernetes and Helm in production.",
      "Performed production support and root-cause analysis on critical issues; contributed to CI/CD automation and deployment reliability.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Microservices",
      "Kafka",
      "Docker",
      "Kubernetes",
      "Helm",
      "CI/CD",
    ],
  },
  {
    id: "presecure",
    company: "PreSecure Solutions",
    role: "Java Backend Developer",
    location: "Pune, India",
    startDate: "11/2023",
    endDate: "10/2024",
    summary:
      "Backend services and REST APIs delivered end-to-end, from business logic through to production support.",
    responsibilities: [
      "Developed backend services and REST APIs using Java, Spring Boot and SQL; implemented new business logic and API integrations from conception through delivery.",
      "Optimised SQL queries and backend workflows to improve application performance.",
      "Resolved production issues and worked in Agile with code reviews and Git workflows.",
    ],
    technologies: ["Java", "Spring Boot", "REST APIs", "SQL", "Git", "Agile"],
  },
];

/**
 * Technical Interview & Coding Assistant Shortcuts
 * 8 Core topics requested as clickable prompt shortcuts
 */

export const INITIAL_SUGGESTIONS = [
  { id: "react", label: "React Fiber & Hooks", prompt: "How does React Fiber reconciliation work, and when to use useMemo vs useCallback?" },
  { id: "eventloop", label: "JavaScript Event Loop", prompt: "Explain the JavaScript Event Loop, Microtasks, and Macrotasks with an interview-ready answer." },
  { id: "node", label: "Node.js Concurrency", prompt: "How does Node.js handle concurrency with a single thread and libuv?" },
  { id: "nestjs", label: "NestJS Dependency Injection", prompt: "Explain Dependency Injection, IoC, and the Request Lifecycle in NestJS." },
  { id: "sql_nosql", label: "SQL vs NoSQL & Indexing", prompt: "Compare PostgreSQL vs MongoDB for high-scale systems and explain B-Tree database indexing." },
  { id: "rest_jwt", label: "REST API, Idempotency & JWT", prompt: "What makes an API idempotent, and how should JWT authentication with refresh tokens work?" },
  { id: "caching", label: "System Design: Caching", prompt: "Explain Redis caching strategies (Cache-Aside, Write-Through) and database sharding." },
  { id: "solid", label: "SOLID Principles", prompt: "Explain the SOLID principles in software engineering with practical examples." },
];

/**
 * Technical Interview & Coding Assistant NLP Engine
 * Focused exclusively on software engineering interview preparation, coding questions,
 * programming concepts, and technical architecture (React, JS, Node, Express, NestJS, SQL, Redis, REST APIs).
 * 
 * Strictly excludes personal/private life topics.
 */

export const INITIAL_SUGGESTIONS = [
  { id: "react", label: "⚛️ React Fiber & Hooks", prompt: "How does React Fiber reconciliation work, and when to use useMemo vs useCallback?" },
  { id: "eventloop", label: "⚡ JS Event Loop", prompt: "Explain the JavaScript Event Loop, Microtasks, and Macrotasks with an interview-ready answer." },
  { id: "node", label: "🟢 Node.js Concurrency", prompt: "How does Node.js handle concurrency with a single thread and libuv?" },
  { id: "nestjs", label: "🦅 NestJS DI & Lifecycle", prompt: "Explain Dependency Injection, IoC, and the Request Lifecycle in NestJS." },
  { id: "sql_nosql", label: "🗄️ SQL vs NoSQL & Indexing", prompt: "Compare PostgreSQL vs MongoDB for high-scale systems and explain B-Tree database indexing." },
  { id: "rest_jwt", label: "🛡️ REST Idempotency & JWT", prompt: "What makes an API idempotent, and how should JWT authentication with refresh tokens work?" },
  { id: "caching", label: "🏗️ System Design: Caching", prompt: "Explain Redis caching strategies (Cache-Aside, Write-Through) and database sharding." },
  { id: "solid", label: "🎯 SOLID Principles", prompt: "Explain the SOLID principles in software engineering with practical examples." },
];

/**
 * Checks if a query is asking for personal or private life information.
 */
function isPersonalOrPrivateQuery(query) {
  const personalPatterns = [
    /\b(who are you|who is maibub|about maibub|tell me about your|tell me about maibub|personal life|private life|girlfriend|boyfriend|wife|husband|married|marriage|dating|relationship|family|parents|father|mother|brother|sister|kids|children)\b/,
    /\b(how old|your age|maibub age|birth date|birthday|born in|where do you live|where does he live|home address|personal address|private address|phone number|mobile number|contact number|whatsapp number|salary|current salary|expected salary|how much do you make|net worth)\b/,
    /\b(religion|caste|political|hobbies|free time|daily routine|college life|school life|lifestyle|personal details|private details)\b/,
  ];

  return personalPatterns.some((pattern) => pattern.test(query));
}

/**
 * Main query processor for the Technical Interview Assistant.
 */
export async function processUserMessage(rawMessage) {
  const query = rawMessage.toLowerCase().trim();

  // Simulate realistic AI analysis delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  // 1. STRICT PERSONAL / PRIVATE INFORMATION GUARD
  if (isPersonalOrPrivateQuery(query)) {
    return {
      text: `### 🛡️ Technical Interview Assistant Scope\n\nI am a specialized **Technical Interview Assistant** dedicated exclusively to software engineering topics, coding interview questions, systems architecture, and technical interview preparation.\n\nI do not answer questions regarding **personal life, private matters, or non-technical personal details**.\n\nI'm ready to help you prepare for technical interviews! What technical topic would you like to explore?`,
      actions: [
        { type: "prompt", prompt: "Explain the JavaScript Event Loop, Microtasks, and Macrotasks", label: "⚡ JS Event Loop" },
        { type: "prompt", prompt: "How does React Fiber reconciliation work, and when to use useMemo vs useCallback?", label: "⚛️ React Fiber & Hooks" },
        { type: "prompt", prompt: "Explain Dependency Injection, IoC, and the Request Lifecycle in NestJS", label: "🦅 NestJS Architecture" },
        { type: "prompt", prompt: "Compare PostgreSQL vs MongoDB and explain database indexing", label: "🗄️ SQL & Indexing" },
      ],
    };
  }

  // 2. GREETINGS & GENERAL INTRODUCTIONS
  if (/^(hi|hello|hey|greetings|hola|good morning|good afternoon|good evening|help|what can you do)\b/.test(query)) {
    return {
      text: `### 👨‍💻 Technical Interview Assistant Ready!\n\nWelcome! I provide **interview-ready technical explanations**, **coding solutions**, and **architectural trade-offs** across software engineering topics:\n\n- **Frontend**: React.js 19 (Fiber, Hooks, Virtual DOM, State Management, SSR), TypeScript, Web Performance.\n- **JavaScript**: Event Loop, Closures, Prototypal Inheritance, Hoisting, Promises & Async/Await, Debounce/Throttle.\n- **Backend**: Node.js (Libuv, Streams, Worker Threads), Express.js (Middlewares, Security), NestJS (DI, IoC, Guards, Pipes).\n- **Databases & Caching**: PostgreSQL vs NoSQL, ACID Transactions, B-Tree Indexes, Horizontal Sharding, Redis Caching, BullMQ.\n- **API & System Design**: REST Constraints, Idempotency, JWT Auth, Microservices, Rate Limiting, SOLID Principles.\n\nAsk me any technical question or select an interview topic below!`,
      actions: [
        { type: "prompt", prompt: "What are the most common React.js interview questions?", label: "⚛️ Top React Questions" },
        { type: "prompt", prompt: "What are the most common Node.js and Express interview questions?", label: "🟢 Node/Express Questions" },
        { type: "prompt", prompt: "Explain ACID properties and Database Isolation Levels", label: "🗄️ ACID & Isolation" },
        { type: "prompt", prompt: "Explain SOLID principles with clean code examples", label: "🎯 SOLID Principles" },
      ],
    };
  }

  // 3. REACT.JS INTERVIEW TOPICS
  if (
    query.includes("react") ||
    query.includes("virtual dom") ||
    query.includes("fiber") ||
    query.includes("reconciliation") ||
    query.includes("usememo") ||
    query.includes("usecallback") ||
    query.includes("useeffect") ||
    query.includes("uselayouteffect") ||
    query.includes("hooks") ||
    query.includes("state management") ||
    query.includes("redux") ||
    query.includes("zustand") ||
    query.includes("prop drilling") ||
    query.includes("server component") ||
    query.includes("rsc")
  ) {
    // Specific: useMemo vs useCallback
    if (query.includes("usememo") || query.includes("usecallback")) {
      return {
        text: `### ⚛️ \`useMemo\` vs \`useCallback\` (Interview Explanation):\n\nBoth hooks optimize performance by memoizing values between renders, preventing unnecessary recalculations and re-renders.\n\n- **\`useMemo\`**: Caches the **result of a calculation**.\n  \`\`\`javascript\n  const expensiveValue = useMemo(() => computeHeavyData(items), [items]);\n  \`\`\`\n- **\`useCallback\`**: Caches a **function definition** between renders, ensuring referential equality for callbacks passed to memoized children (\`React.memo\`).\n  \`\`\`javascript\n  const handleClick = useCallback(() => doSomething(id), [id]);\n  \`\`\`\n\n**Key Interview Nuance**:\nDon't wrap everything in \`useMemo\`/\`useCallback\`! Each hook carries memory overhead for dependency arrays. Use them when passing callbacks to optimized children or when computing computationally heavy data ($O(n^2)$).`,
        actions: [
          { type: "prompt", prompt: "How does React Virtual DOM and Fiber reconciliation work?", label: "⚛️ Virtual DOM & Fiber" },
          { type: "prompt", prompt: "Explain useEffect vs useLayoutEffect in React", label: "⚛️ useEffect vs useLayoutEffect" },
        ],
      };
    }

    // Specific: Virtual DOM & Fiber
    if (query.includes("virtual dom") || query.includes("fiber") || query.includes("reconciliation")) {
      return {
        text: `### ⚛️ React Virtual DOM & Fiber Architecture:\n\n**1. Virtual DOM (VDOM)**:\n- An in-memory JavaScript representation of the real DOM tree.\n- On state change, React creates a new VDOM tree, diffs it with the previous one (**Reconciliation**), and computes the minimum set of real DOM mutations.\n- Uses heuristic assumptions ($O(n)$ diffing): elements of different types generate different trees; lists require stable \`key\` props.\n\n**2. React Fiber (The Reconciliation Engine)**:\n- Prior to Fiber, the reconciler worked synchronously via recursive stack traversal, which could block the browser thread and cause dropped frames.\n- Fiber rewrote the reconciler into a **linked-list tree of units of work** that enables **incremental rendering**:\n  - Can pause, abort, or prioritize work (e.g. user input prioritized over background fetches).\n  - Concurrency & Time Slicing: yields control back to the browser main thread.`,
        actions: [
          { type: "prompt", prompt: "When to use useMemo vs useCallback in React?", label: "⚛️ useMemo vs useCallback" },
          { type: "prompt", prompt: "Explain Server Components (RSC) vs Client Components", label: "⚛️ React Server Components" },
        ],
      };
    }

    // General React Interview Overview
    return {
      text: `### ⚛️ Core React.js Interview Concepts:\n\n1. **Virtual DOM & Fiber Reconciliation**: In-memory VDOM diffing with Fiber units of work allowing interruptible, prioritized rendering.\n2. **Rules of Hooks**: Hooks rely on an internal array/linked list per Fiber node; they must always be called at the top level in invariant order.\n3. **\`useEffect\` vs \`useLayoutEffect\`**:\n   - \`useEffect\`: Runs **asynchronously after the paint**, non-blocking.\n   - \`useLayoutEffect\`: Runs **synchronously after DOM mutations but before paint** (use for measuring DOM layout to avoid flickers).\n4. **State Management**: Local state (\`useState\`, \`useReducer\`) vs Context API (ideal for infrequent updates like themes) vs External Stores (Redux Toolkit, Zustand, Jotai) for high-frequency updates.\n5. **React 18/19 Server Components (RSC)**: Run exclusively on the server, zero client bundle cost, and stream HTML/JSON payloads directly.`,
      actions: [
        { type: "prompt", prompt: "When to use useMemo vs useCallback in React?", label: "⚛️ useMemo vs useCallback" },
        { type: "prompt", prompt: "Explain the JavaScript Event Loop, Microtasks, and Macrotasks", label: "⚡ JS Event Loop" },
      ],
    };
  }

  // 4. JAVASCRIPT CORE & ADVANCED INTERVIEW TOPICS
  if (
    query.includes("javascript") ||
    query.includes("event loop") ||
    query.includes("closure") ||
    query.includes("prototype") ||
    query.includes("hoisting") ||
    query.includes("promise") ||
    query.includes("async/await") ||
    query.includes("debounce") ||
    query.includes("throttle") ||
    query.includes("shallow copy") ||
    query.includes("deep copy") ||
    query.includes("this keyword")
  ) {
    // Specific: Event Loop
    if (query.includes("event loop") || query.includes("microtask") || query.includes("macrotask")) {
      return {
        text: `### ⚡ The JavaScript Event Loop & Task Queues:\n\nJavaScript is single-threaded with a non-blocking concurrency model powered by the runtime environment (browser/Node.js).\n\n**Execution Model**:\n1. **Call Stack**: Executes synchronous code line-by-line (LIFO).\n2. **Microtask Queue** (Highest Priority):\n   - Includes: \`Promise.then/catch/finally\`, \`queueMicrotask()\`, and Node's \`process.nextTick\`.\n   - **Crucial Rule**: The Call Stack will drain the **ENTIRE** Microtask Queue until empty before processing any macrotask.\n3. **Macrotask Queue / Task Queue**:\n   - Includes: \`setTimeout\`, \`setInterval\`, \`setImmediate\`, I/O events, and UI rendering.\n   - The Event Loop dequeues **one** macrotask, executes it, then checks and drains the microtask queue again.\n\n\`\`\`javascript\nconsole.log(1);\nsetTimeout(() => console.log(2), 0); // Macrotask\nPromise.resolve().then(() => console.log(3)); // Microtask\nconsole.log(4);\n// Output order: 1, 4, 3, 2\n\`\`\``,
        actions: [
          { type: "prompt", prompt: "Explain JavaScript Closures with interview examples", label: "⚡ Closures & Lexical Scope" },
          { type: "prompt", prompt: "How to implement Debounce and Throttle in JavaScript?", label: "💻 Debounce vs Throttle" },
        ],
      };
    }

    // Specific: Closures
    if (query.includes("closure")) {
      return {
        text: `### ⚡ Closures & Lexical Scoping:\n\n**Definition**:\nA **closure** is the combination of a function bundled together with references to its surrounding state (**lexical environment**). In JavaScript, every function retains access to variables in its outer scope even after the outer function has finished executing.\n\n**Practical Use Cases**:\n1. **Data Encapsulation & Private Variables**:\n   \`\`\`javascript\n   function createCounter() {\n     let count = 0; // Private variable\n     return {\n       increment: () => ++count,\n       get: () => count,\n     };\n   }\n   \`\`\`\n2. **Currying and Partial Application**.\n3. **Memoization / Function Caching**.\n\n**Interview Gotcha**: Closures hold references to outer variables in memory. If not dereferenced, unused closures can cause memory leaks.`,
        actions: [
          { type: "prompt", prompt: "Explain the JavaScript Event Loop, Microtasks, and Macrotasks", label: "⚡ Event Loop" },
          { type: "prompt", prompt: "Explain Prototypal Inheritance vs Classes in JS", label: "⚡ Prototypes & Classes" },
        ],
      };
    }

    // Specific: Debounce vs Throttle
    if (query.includes("debounce") || query.includes("throttle")) {
      return {
        text: `### ⚡ Debounce vs Throttle (Interview Comparison):\n\nBoth techniques control how frequently a callback executes in response to rapid events (resizing, scrolling, typing).\n\n- **Debounce**: Delays execution until a specified quiet period has elapsed with **no new events**.\n  *Best For*: Search auto-complete input, window resize recalculations.\n  \`\`\`javascript\n  function debounce(fn, delay) {\n    let timer;\n    return (...args) => {\n      clearTimeout(timer);\n      timer = setTimeout(() => fn(...args), delay);\n    };\n  }\n  \`\`\`\n- **Throttle**: Guarantees execution at most **once every $N$ milliseconds**, regardless of how many times the trigger fires.\n  *Best For*: Infinite scroll, scroll-based progress indicators, mouse move tracking.`,
        actions: [
          { type: "prompt", prompt: "Explain Shallow Copy vs Deep Copy in JavaScript", label: "⚡ Shallow vs Deep Copy" },
          { type: "prompt", prompt: "Explain Promise.all vs Promise.allSettled in JavaScript", label: "⚡ Promises Deep Dive" },
        ],
      };
    }

    // General JavaScript Overview
    return {
      text: `### ⚡ Core JavaScript Interview Concepts:\n\n1. **Event Loop**: Call stack, Web APIs, Microtask queue (\`Promise\`, \`process.nextTick\`) drained before Macrotask queue (\`setTimeout\`, I/O).\n2. **Closures**: Functions retaining access to their lexical scope after the outer function returns; key for data privacy and currying.\n3. **Hoisting & TDZ**: \`var\` is hoisted and initialized to \`undefined\`; \`let\` and \`const\` are hoisted but stay in the Temporal Dead Zone (TDZ) until evaluation.\n4. **Prototypal Inheritance**: Objects inherit properties via the prototype chain (\`__proto__\`); ES6 \`class\` is syntactic sugar over prototype chains.\n5. **Promises & Async/Await**: Non-blocking asynchronous flows; \`Promise.all\` is fail-fast, \`Promise.allSettled\` waits for all outcomes.`,
      actions: [
        { type: "prompt", prompt: "Explain the JavaScript Event Loop, Microtasks, and Macrotasks", label: "⚡ Event Loop" },
        { type: "prompt", prompt: "When to use useMemo vs useCallback in React?", label: "⚛️ React Hooks" },
      ],
    };
  }

  // 5. NODE.JS & EXPRESS.JS INTERVIEW TOPICS
  if (
    query.includes("node") ||
    query.includes("express") ||
    query.includes("libuv") ||
    query.includes("stream") ||
    query.includes("buffer") ||
    query.includes("worker thread") ||
    query.includes("cluster") ||
    query.includes("middleware")
  ) {
    // Specific: Streams & Buffers
    if (query.includes("stream") || query.includes("buffer")) {
      return {
        text: `### 🟢 Node.js Streams & Buffers:\n\n**1. Streams**:\nHandle continuous data piece-by-piece (**chunks**) without loading the entire payload into RAM, enabling constant $O(1)$ memory consumption for gigabyte-scale files.\n- Types: **Readable**, **Writable**, **Duplex** (both), **Transform** (modifies data as it passes through, e.g. \`zlib.createGzip()\`).\n- **Backpressure**: Occurs when a Writable stream cannot write as fast as the Readable stream provides data. Solved via \`pipeline()\`:\n  \`\`\`javascript\n  import { pipeline } from 'node:stream/promises';\n  import fs from 'node:fs';\n  import zlib from 'node:zlib';\n\n  await pipeline(\n    fs.createReadStream('input.txt'),\n    zlib.createGzip(),\n    fs.createWriteStream('input.txt.gz')\n  );\n  \`\`\`\n**2. Buffer**: Fixed-size chunk of raw binary memory allocated outside the V8 heap in Node.js C++ layer.`,
        actions: [
          { type: "prompt", prompt: "How does Node.js handle concurrency with a single thread and libuv?", label: "🟢 Node.js Concurrency" },
          { type: "prompt", prompt: "Explain Express.js Middleware pattern and error handling", label: "🟢 Express Middleware" },
        ],
      };
    }

    // Specific: Express Middleware
    if (query.includes("middleware") || query.includes("express")) {
      return {
        text: `### 🟢 Express.js Middleware Architecture:\n\n**How It Works**:\nExpress middleware functions form an onion-like pipeline that have access to the Request object (\`req\`), the Response object (\`res\`), and the \`next()\` function.\n\n**Key Patterns**:\n1. **Normal Middleware**: Runs sequentially. Calling \`next()\` passes execution to the next handler; forgetting \`next()\` hangs the request.\n2. **Error-Handling Middleware**: Takes **4 arguments** \`(err, req, res, next)\`. Express identifies it as an error catcher strictly by arity (\`fn.length === 4\`):\n   \`\`\`javascript\n   app.use((err, req, res, next) => {\n     console.error(err.stack);\n     res.status(err.status || 500).json({ error: err.message });\n   });\n   \`\`\`\n3. **Security Middleware**: Helmet (sets secure HTTP headers), CORS, \`express-rate-limit\` to defend against brute force and DDoS.`,
        actions: [
          { type: "prompt", prompt: "How does Node.js handle concurrency with a single thread and libuv?", label: "🟢 Node.js Concurrency" },
          { type: "prompt", prompt: "Explain Dependency Injection and Guards in NestJS", label: "🦅 NestJS Architecture" },
        ],
      };
    }

    // General Node.js Concurrency
    return {
      text: `### 🟢 Node.js Architecture & Concurrency:\n\n**Core Model**:\n- Node.js runs on a **single-threaded V8 JavaScript execution loop**, backed by **Libuv** for asynchronous I/O.\n- Non-blocking system calls (networking, sockets) utilize OS kernel mechanisms (epoll on Linux, kqueue on macOS, IOCP on Windows).\n- Blocking operations (file system \`fs\`, \`crypto\`, DNS lookups) are offloaded to **Libuv's internal thread pool** (default: 4 threads, configurable via \`UV_THREADPOOL_SIZE\`).\n\n**Scaling Strategies**:\n1. **Cluster Module**: Forks multiple worker processes on different CPU cores sharing the same server port via round-robin IPC.\n2. **Worker Threads**: True multi-threading within a single process sharing memory for CPU-intensive tasks (image processing, data encryption) without blocking the event loop.`,
      actions: [
        { type: "prompt", prompt: "Explain Node.js Streams and Backpressure handling", label: "🟢 Streams & Backpressure" },
        { type: "prompt", prompt: "Explain Dependency Injection, IoC, and the Request Lifecycle in NestJS", label: "🦅 NestJS Architecture" },
      ],
    };
  }

  // 6. NESTJS INTERVIEW TOPICS
  if (
    query.includes("nestjs") ||
    query.includes("dependency injection") ||
    query.includes("ioc") ||
    query.includes("guard") ||
    query.includes("interceptor") ||
    query.includes("pipe") ||
    query.includes("decorator")
  ) {
    return {
      text: `### 🦅 NestJS Architecture & Request Lifecycle:\n\n**1. Dependency Injection (DI) & Inversion of Control (IoC)**:\n- Classes decorated with \`@Injectable()\` are registered in the IoC container as **Providers**.\n- Injected via class constructors without manual instantiation (\`new Service()\`), enforcing loose coupling, modularity, and testability.\n- Provider Scopes: \`DEFAULT\` (Singleton - shared across app), \`REQUEST\` (new instance per incoming HTTP request), \`TRANSIENT\` (new instance per consumer).\n\n**2. Request Execution Lifecycle**:\n1. **Middleware**: Standard Express/Fastify request-response interceptor.\n2. **Guards** (\`canActivate\`): Determines if request can proceed (Authentication & RBAC permissions).\n3. **Interceptors (Pre-handler)**: Extra logic before route handler (request logging, timing).\n4. **Pipes** (\`PipeTransform\`): Payload validation & type transformation (e.g. \`ValidationPipe\` with \`class-validator\`).\n5. **Controller Handler**: Business route handler executes.\n6. **Interceptors (Post-handler)**: Response transformation, serialization, response caching.\n7. **Exception Filters**: Catches unhandled errors and maps them to clean standard HTTP responses.`,
      actions: [
        { type: "prompt", prompt: "Compare PostgreSQL vs MongoDB for high-scale systems", label: "🗄️ SQL vs NoSQL" },
        { type: "prompt", prompt: "What makes an API idempotent, and how should JWT authentication work?", label: "🛡️ REST & JWT Auth" },
      ],
    };
  }

  // 7. DATABASES, INDEXING, SHARDING & CACHING
  if (
    query.includes("database") ||
    query.includes("sql") ||
    query.includes("postgres") ||
    query.includes("mongodb") ||
    query.includes("nosql") ||
    query.includes("acid") ||
    query.includes("index") ||
    query.includes("sharding") ||
    query.includes("redis") ||
    query.includes("caching") ||
    query.includes("transaction") ||
    query.includes("isolation")
  ) {
    // Specific: ACID & Isolation Levels
    if (query.includes("acid") || query.includes("isolation") || query.includes("transaction")) {
      return {
        text: `### 🗄️ ACID Properties & Transaction Isolation Levels:\n\n**ACID Guarantees**:\n- **Atomicity**: All operations in a transaction succeed, or the entire transaction rolls back.\n- **Consistency**: Database transitions only between valid states that satisfy constraints.\n- **Isolation**: Concurrent transactions execute without mutual interference.\n- **Durability**: Committed transactions are permanently saved even across system crashes.\n\n**Transaction Isolation Levels (Weakest to Strongest)**:\n1. **Read Uncommitted**: Suffers from *Dirty Reads* (reading uncommitted changes from other transactions).\n2. **Read Committed** (PostgreSQL Default): Prevents dirty reads; allows *Non-Repeatable Reads* (re-reading a row yields different data).\n3. **Repeatable Read**: Guarantees snapshot consistency (using MVCC); prevents dirty & non-repeatable reads; may suffer from phantom writes.\n4. **Serializable**: Highest isolation; eliminates *Phantom Reads* by serializing concurrent execution graphs, at the cost of higher lock contention.`,
        actions: [
          { type: "prompt", prompt: "How do B-Tree database indexes work and how to optimize queries?", label: "🗄️ B-Tree Indexing" },
          { type: "prompt", prompt: "Explain Redis Caching Strategies (Cache-Aside vs Write-Through)", label: "🏗️ Redis Caching" },
        ],
      };
    }

    // Specific: Database Indexing
    if (query.includes("index") || query.includes("b-tree")) {
      return {
        text: `### 🗄️ Database Indexing (B-Tree Internals & Optimization):\n\n**1. B-Tree Indexes**:\n- Self-balancing search tree where each node contains multiple keys and child pointers.\n- Provides $O(\\log N)$ time complexity for search, sequential range scans (\`BETWEEN\`, \`>\`, \`<\`), and sorted queries (\`ORDER BY\`).\n\n**2. Composite Indexes & Leftmost Prefix Rule**:\n- An index on \`(tenant_id, created_at)\` accelerates queries on \`tenant_id\` and \`(tenant_id, created_at)\`, but CANNOT be used on queries filtering only by \`created_at\`.\n\n**3. Query Optimization Best Practices**:\n- Use \`EXPLAIN (ANALYZE, BUFFERS)\` to inspect the execution plan (Look out for \`Seq Scan\` on large tables vs \`Index Scan\` / \`Bitmap Heap Scan\`).\n- Avoid functions on indexed columns in the WHERE clause (e.g. \`WHERE UPPER(email) = ...\` bypasses standard index; requires an expression index).`,
        actions: [
          { type: "prompt", prompt: "Explain Horizontal Database Sharding with CRC32", label: "🗄️ Database Sharding" },
          { type: "prompt", prompt: "Explain Redis Caching Strategies and Eviction Policies", label: "🏗️ Redis Caching" },
        ],
      };
    }

    // Specific: Redis Caching
    if (query.includes("redis") || query.includes("caching")) {
      return {
        text: `### 🏗️ Redis Caching Strategies & Eviction Policies:\n\n**1. Caching Strategies**:\n- **Cache-Aside (Lazy Loading)**: Application queries Redis first. On cache miss, queries DB, populates Redis with a TTL, and returns data.\n- **Write-Through**: Application writes data to the cache and the database simultaneously (ensures strict consistency, adds write latency).\n- **Write-Behind (Write-Back)**: Application writes immediately to Redis; a background worker batches updates to the database (high write throughput, risk of data loss on crash).\n\n**2. Cache Stampede (Thundering Herd)**:\nOccurs when a popular cached key expires and hundreds of concurrent requests simultaneously hit the database. Mitigated with **Distributed Mutex Locks** or **Probabilistic Early Recomputation**.\n\n**3. Eviction Policies**: \`volatile-lru\` (Least Recently Used with TTL), \`allkeys-lru\`, \`allkeys-lfu\` (Least Frequently Used), \`volatile-ttl\`.`,
        actions: [
          { type: "prompt", prompt: "Explain Horizontal Database Sharding with CRC32", label: "🗄️ Database Sharding" },
          { type: "prompt", prompt: "Compare PostgreSQL vs MongoDB for high-scale systems", label: "🗄️ SQL vs NoSQL" },
        ],
      };
    }

    // General SQL vs NoSQL & Sharding
    return {
      text: `### 🗄️ SQL vs NoSQL & Database Sharding:\n\n**1. SQL (PostgreSQL, MySQL)**:\n- Strict schema, ACID transactional integrity, complex relational joins.\n- Scales vertically (CPU/RAM); horizontally via read replicas or sharding.\n\n**2. NoSQL (MongoDB, DynamoDB)**:\n- Schema-less document/key-value storage, horizontal partition by default, eventual consistency.\n- Ideal for rapidly evolving structures, semi-structured JSON, or massive unstructured writes.\n\n**3. Horizontal Database Sharding**:\n- Partitions records across multiple independent database instances using a deterministic **Shard Key** (e.g. \`hash(tenantId) % totalShards\`).\n- Eliminates table-level write locks across enterprise customers and distributes IOPS evenly.`,
      actions: [
        { type: "prompt", prompt: "Explain ACID properties and Database Isolation Levels", label: "🗄️ ACID & Isolation" },
        { type: "prompt", prompt: "Explain Redis Caching Strategies and Eviction Policies", label: "🏗️ Redis Caching" },
      ],
    };
  }

  // 8. REST APIS & SYSTEM DESIGN INTERVIEW TOPICS
  if (
    query.includes("rest") ||
    query.includes("api") ||
    query.includes("idempotent") ||
    query.includes("idempotency") ||
    query.includes("jwt") ||
    query.includes("auth") ||
    query.includes("status code") ||
    query.includes("rate limit") ||
    query.includes("pagination") ||
    query.includes("system design")
  ) {
    // Specific: Idempotency & HTTP Methods
    if (query.includes("idempotent") || query.includes("idempotency")) {
      return {
        text: `### 🛡️ REST API Idempotency (Interview Guide):\n\n**Definition**:\nAn HTTP method is **idempotent** if making multiple identical requests has the same effect on the server state as making a single request.\n\n- **Idempotent Methods**: \n  - \`GET\`: Safe & read-only.\n  - \`PUT\`: Replaces the entire resource state.\n  - \`DELETE\`: Deleting an ID multiple times leaves the resource non-existent (status can be 204 or 404, but server state is identical).\n- **Non-Idempotent Methods**: \n  - \`POST\`: Creates a new record every invocation (e.g. duplicate payment charges).\n\n**How to make POST idempotent**:\nClient sends an **\`Idempotency-Key\`** header (UUID). The server stores the key with a lock in Redis. If a duplicate key arrives within the TTL window, the server returns the cached response without re-processing.`,
        actions: [
          { type: "prompt", prompt: "How should JWT authentication with refresh tokens be implemented?", label: "🛡️ JWT Authentication" },
          { type: "prompt", prompt: "Compare Offset-based vs Cursor-based Pagination", label: "🛡️ Pagination Strategies" },
        ],
      };
    }

    // Specific: JWT Authentication
    if (query.includes("jwt") || query.includes("token") || query.includes("auth")) {
      return {
        text: `### 🛡️ Production JWT Authentication Architecture:\n\n**Structure**: \`Header.Payload.Signature\` (signed with HMAC-SHA256 or RSA-256).\n\n**Security Best Practice: Dual-Token Flow**:\n1. **Access Token**:\n   - Short expiration (e.g. **15 minutes**).\n   - Carried in the \`Authorization: Bearer <token>\` header for stateless API validation.\n2. **Refresh Token**:\n   - Long expiration (e.g. **7-30 days**).\n   - Stored in an **\`HttpOnly, Secure, SameSite=Strict\` Cookie** to protect against XSS attacks.\n   - Saved in Redis for revocation capabilities.\n3. **Token Rotation**:\n   - When refreshing, issue a NEW refresh token and invalidate the old one. If an old refresh token is reused, revoke the entire token family (detects token theft).`,
        actions: [
          { type: "prompt", prompt: "What makes an API idempotent, and how to implement it?", label: "🛡️ API Idempotency" },
          { type: "prompt", prompt: "Compare Offset-based vs Cursor-based Pagination", label: "🛡️ Pagination Strategies" },
        ],
      };
    }

    // General REST API Overview
    return {
      text: `### 🛡️ Core RESTful API & System Design Concepts:\n\n1. **REST Constraints**: Statelessness, Client-Server separation, Cacheable responses, Uniform Resource Identifiers (Nouns: \`/api/v1/orders\`, not verbs \`/api/v1/createOrder\`).\n2. **Status Codes**:\n   - \`201 Created\` vs \`204 No Content\`\n   - \`401 Unauthorized\` (Missing/Invalid credentials) vs \`403 Forbidden\` (Authenticated but lacks RBAC permissions).\n   - \`409 Conflict\` (State collision, e.g. duplicate email).\n   - \`429 Too Many Requests\` (Rate limited).\n3. **Pagination**:\n   - **Offset-based** (\`LIMIT 20 OFFSET 1000\`): Slow on large tables ($O(N)$ scan), skips/duplicates rows if items are inserted.\n   - **Cursor/Keyset-based** (\`WHERE id > :cursor LIMIT 20\`): Constant $O(1)$/$O(\\log N)$ index scan, consistent pagination.\n4. **Rate Limiting**: Token Bucket & Sliding Window Counter algorithms in Redis.`,
      actions: [
        { type: "prompt", prompt: "What makes an API idempotent, and how to implement it?", label: "🛡️ API Idempotency" },
        { type: "prompt", prompt: "How should JWT authentication with refresh tokens be implemented?", label: "🛡️ JWT Auth Architecture" },
      ],
    };
  }

  // 9. SOLID PRINCIPLES & SOFTWARE ENGINEERING
  if (
    query.includes("solid") ||
    query.includes("design pattern") ||
    query.includes("clean code") ||
    query.includes("oop") ||
    query.includes("algorithm") ||
    query.includes("data structure") ||
    query.includes("two sum") ||
    query.includes("lru")
  ) {
    if (query.includes("solid")) {
      return {
        text: `### 🎯 SOLID Principles (Software Architecture):\n\n- **S — Single Responsibility Principle (SRP)**: A class/module should have only one reason to change.\n- **O — Open/Closed Principle (OCP)**: Software entities should be open for extension, but closed for modification (e.g. use Strategy pattern/interfaces instead of modifying large switch statements).\n- **L — Liskov Substitution Principle (LSP)**: Subtypes must be substitutable for their base types without breaking client expectations.\n- **I — Interface Segregation Principle (ISP)**: Clients should not be forced to depend on methods they do not use (prefer small, role-specific interfaces).\n- **D — Dependency Inversion Principle (DIP)**: High-level modules should not depend on low-level modules; both should depend on abstractions (the foundation of NestJS Dependency Injection).`,
        actions: [
          { type: "prompt", prompt: "Explain Dependency Injection, IoC, and the Request Lifecycle in NestJS", label: "🦅 NestJS DI & SOLID" },
          { type: "prompt", prompt: "Explain the JavaScript Event Loop, Microtasks, and Macrotasks", label: "⚡ JS Event Loop" },
        ],
      };
    }

    if (query.includes("two sum") || query.includes("lru") || query.includes("algorithm")) {
      return {
        text: `### 💻 Coding Interview Algorithm: Two Sum ($O(n)$ Solution)\n\n**Problem**: Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\n**Approach**: Use a Hash Map to store complement values (\`target - num\`) in a single pass.\n\n\`\`\`javascript\nfunction twoSum(nums, target) {\n  const map = new Map(); // val -> index\n\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}\n// Time Complexity: O(n) | Space Complexity: O(n)\n\`\`\`\n*Interview Tip*: Always discuss trade-offs between brute force $O(n^2)$ and Hash Map $O(n)$ time complexity!`,
        actions: [
          { type: "prompt", prompt: "Explain How to Implement a Debounce Function in JavaScript", label: "💻 Code: Debounce" },
          { type: "prompt", prompt: "Explain the SOLID principles in software engineering", label: "🎯 SOLID Principles" },
        ],
      };
    }
  }

  // 10. INTELLIGENT TECHNICAL FALLBACK
  return {
    text: `### 👨‍💻 Technical Interview Assistant Response:\n\nRegarding **"${rawMessage}"**:\n\nIn software engineering interviews, key focus areas for this topic include:\n- **Core Mechanism**: Understanding the underlying runtime architecture (V8, Libuv, React Fiber, PostgreSQL storage engine).\n- **Performance & Time Complexity**: Evaluating Big-O trade-offs in CPU and memory.\n- **Production Edge Cases**: Handling concurrency, network latency, data consistency, and security vulnerabilities.\n\nWould you like me to walk through a specific coding example, architectural trade-off, or mock interview question on this topic?`,
    actions: [
      { type: "prompt", prompt: "Explain the JavaScript Event Loop, Microtasks, and Macrotasks", label: "⚡ JS Event Loop" },
      { type: "prompt", prompt: "How does React Fiber reconciliation work, and when to use useMemo vs useCallback?", label: "⚛️ React Fiber & Hooks" },
      { type: "prompt", prompt: "Compare PostgreSQL vs MongoDB for high-scale systems", label: "🗄️ SQL vs NoSQL" },
      { type: "prompt", prompt: "What makes an API idempotent, and how should JWT authentication work?", label: "🛡️ REST & JWT Auth" },
    ],
  };
}

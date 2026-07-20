# ZeroCarbon Architecture Context (AI Guide)

This document serves as an ultra-condensed guide for future AI agents to quickly understand the structure, data models, and logic of the ZeroCarbon project without needing to blindly grep the entire codebase, saving thousands of tokens.

---

## 1. Core Stack
- **Framework**: Next.js 15.5.12 (App Router)
- **Database**: PostgreSQL (via NEON) with Prisma ORM (`prisma/schema.prisma`)
- **Styling**: Tailwind CSS (`src/app/globals.css`)
- **Payments/Billing**: Dodo Payments SDK (`src/app/api/webhooks/dodo-payments`)
- **AI/LLM**: Google Gemini 2.5 (`src/lib/ai/gemini.ts`)
- **Vector DB**: `pgvector` inside Postgres (`src/lib/ai/rag.ts`)

---

## 2. Key Directories
- `src/app/`: Next.js frontend pages and API routes.
- `src/app/api/v1/mcp/`: The brain of the application. Contains the AI Operating System (MCP Server).
- `src/lib/`: Core backend logic.
  - `src/lib/ai/`: RAG, MCP Reasoning Loop, Prompts.
  - `src/lib/db/`: Prisma Client instance.
  - `src/lib/document/`: OCR and data extraction pipelines (Cloudinary).
  - `src/lib/core/emissions/`: Emission calculation engines and math formulas.

---

## 3. Database Schema Overview
The database uses `prisma/schema.prisma` and relies heavily on relational UUID strings (`cuid`).
- **`Company`**: The core tenant. Everything cascades from here. (No `email` field—emails belong to `User`).
- **`User`**: The authentication model. Linked to a `Company`.
- **`EmissionRecord`**: The heart of the ledger. Stores all Scope 1, 2, and 3 calculations. Uses `idempotency_key` to prevent duplicate writes during automated AI ingests.
- **`DocumentUpload`**: Tracks uploaded bills/invoices. Fields like `uploaded_by_ai_agent` are used for audit trails.
- **`CarbonCreditListing`**: Inventory for the Carbon Marketplace.
- **`OffsetCertificate` & `CarbonCreditRetirement`**: Ledgers generated when a user purchases offsets. Must contain strict attributes like `valid_from` and `total_cost`.

---

## 4. The MCP Server (AI Operating System)
Located at `src/app/api/v1/mcp/route.ts` and `src/lib/ai/mcp-reasoning.ts`.
- **Autonomous Loop**: The MCP does not blindly run 1 tool. It uses a `while` loop (capped at 10 iterations) to perform ReAct (Reasoning + Acting) chaining.
- **Parallel Execution**: Multiple AI tool calls are executed concurrently using `Promise.all()`.
- **Self-Healing**: If a tool crashes (e.g. Prisma constraint violation), the error is caught and returned as JSON *back* to the LLM, prompting the LLM to fix its own parameters and retry.
- **Caching**: Identical tool calls within the same conversational loop are cached in memory.

---

## 5. Idempotency & Concurrency
Automated AI actions (like parsing 50 invoices in bulk) rely on Idempotency Keys. 
- When the AI generates a draft emission record, it computes an idempotency key (usually a hash of date + supplier + amount).
- If the exact key exists, the backend skips creation and returns `duplicate: true`. Do NOT bypass this protection.

---

## 6. Carbon Credit Marketplace (Dodo MoR)
ZeroCarbon acts as a Broker. 
- We do not handle tax or VAT. We use **Dodo Payments as a Merchant of Record**.
- The `checkout` API calculates the base price + 3% platform fee, and passes it to Dodo. Dodo handles all localized taxes globally.
- Webhooks securely handle inventory decrements and Certificate issuance for both authenticated companies and "Guest Marketplace Users".

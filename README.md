# Reflectify

Reflectify is a "brutal but fair" AI study roguelike. It turns a topic or uploaded study material into a deck of atomic concepts, then builds a run around just-in-time questions, progression, rewards, and repetition.

The goal is to make review feel like a game loop rather than a flashcard interruption: concepts can return in different formats and at increasing difficulty as a run develops.

## What It Does

- Creates study decks from a topic or PDF source.
- Extracts atomic concepts with structured AI output.
- Generates multiple-choice, true/false, and boss-style questions during a run.
- Tracks score, XP, currency, streaks, shop purchases, and session history.
- Saves questions encountered during a run as deck review flashcards.
- Records per-user, per-concept learning progress with FSRS after a completed run.

## How A Run Works

1. Create a deck from a topic or PDF.
2. Reflectify extracts concepts and saves them under that deck.
3. Starting a run selects concepts and assigns question formats and difficulty from the run depth.
4. Server actions use the OpenAI API to generate playable questions from those concepts.
5. The client maintains a question queue while the player answers, earns rewards, and visits shops.
6. On completion, the server persists session results, generated flashcards, purchases, and raw concept attempts in a single completion flow.
7. FSRS replays each concept's attempts in timestamp order and upserts its `ConceptProgress` state for the player.

FSRS informs which concepts should be revisited; the roguelike loop still controls encounters, formats, rewards, bosses, and pacing.

## Stack

- Next.js 16 and React 19
- TypeScript
- PostgreSQL with Prisma 7
- NextAuth.js authentication (credentials, Google, and GitHub)
- Vercel AI SDK with OpenAI structured output
- Zustand for game state and TanStack Query for asynchronous generation
- Tailwind CSS 4 and shadcn/ui
- `ts-fsrs` for per-concept spaced-repetition scheduling

## Local Development

### Prerequisites

- Node.js 20 or later
- pnpm 10 (the repository pins `pnpm@10.16.1`)
- PostgreSQL database
- OpenAI API key

### Setup

```bash
git clone https://github.com/kristanica/reflectify.git
cd reflectify
pnpm install
cp .env.example .env
```

Set the values in `.env`:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma. |
| `DIRECT_URL` | Direct database connection used for Prisma operations. |
| `NEXTAUTH_SECRET` | Secret used to sign authentication sessions. |
| `NEXTAUTH_URL` | Application URL, such as `http://localhost:3000`. |
| `OPENAI_API_KEY` | Key used for concept extraction and question generation. |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Optional Google OAuth credentials. |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Optional GitHub OAuth credentials. |
| `BLOB_READ_WRITE_TOKEN` | Optional Vercel Blob token for supported file-storage flows. |

Generate the Prisma client, apply your local database schema, and start the development server:

```bash
pnpm db:generate
pnpm db:migrate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Next.js development server. |
| `pnpm build` | Create a production build. |
| `pnpm start` | Run the production server. |
| `pnpm lint` | Run ESLint. |
| `pnpm db:generate` | Generate the Prisma client. |
| `pnpm db:push` | Push the Prisma schema without creating a migration. |
| `pnpm db:migrate` | Create and apply a development migration. |
| `pnpm db:seed` | Run the Prisma seed script. |

## Project Layout

```text
src/
  actions/       Server actions for ingestion, runs, and persistence
  app/           Next.js routes and authenticated user areas
  components/    Deck, run, flashcard, and UI components
  hooks/         Client hooks for ingestion and question generation
  lib/           Database, authentication, parsing, and shared utilities
  store/         Zustand game-loop state
  schema/        Zod validation and generated-question contracts
prisma/
  schema.prisma  Database schema
```


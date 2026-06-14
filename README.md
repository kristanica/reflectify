# 🪞 Reflectify

**Reflectify** is a "brutal but fair" roguelike educational platform that merges Spaced Repetition learning with a continuous, infinite gameplay loop.

Instead of traditional, boring flashcards, Reflectify uses AI to dynamically generate tactical multiple-choice, true/false, and scenario-based questions _Just-In-Time_ (JIT) based on your current mastery level of specific concepts.

---

## ⚡ Core Features

- **The Infinite Game Loop:** Powered by TanStack Query, the game board maintains a silent background queue. As you answer questions, the engine seamlessly fetches new concepts from the database and generates new questions via AI without ever hitting a loading screen.
- **AI Concept Extraction:** Upload PDFs or type a general topic, and the AI "Researcher" will instantly break the source material down into atomic, testable "Concept Facts".
- **Dynamic Difficulty:** The engine tracks your mastery level for every single concept. As your mastery increases, the AI automatically shifts from basic Multiple Choice questions to brutal Scenario-based application questions.
- **Tactical Aesthetic:** A sleek, premium dark-mode UI inspired by terminal interfaces and cyberpunk aesthetics (zinc, gold, and monospace).

## 🛠️ Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **AI Generation:** [Vercel AI SDK](https://sdk.vercel.ai/) (`generateObject` with Zod Structured Outputs)
- **State Management:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Styling:** Tailwind CSS + shadcn/ui

## 🧠 How the Architecture Works

1. **Ingest (Day 8):** Users input a topic or upload a file. The Vercel AI SDK reads the text and extracts 15-20 specific, factual "Concepts" using a strict Zod schema.
2. **The Queue (Day 11):** When a user initiates a run, the frontend grabs the lowest-mastery concepts from the database (excluding any concepts already in the player's active queue).
3. **JIT Generation (Day 9):** Those raw concepts are sent to the `/actions/generateBatch` Server Action, where OpenAI transforms the raw facts into playable game questions with highly plausible distractors.
4. **The Loop:** As the player answers questions, the frontend queue shrinks. Once the "Low-Water Mark" is reached (e.g., < 10 questions left), TanStack Query silently triggers the pipeline again to refill the queue.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (or your preferred Prisma provider)
- An OpenAI API Key (`gpt-4o` or `gpt-4o-mini`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/reflectify.git
   cd reflectify
   ```

import prisma from "../src/lib/prisma";
import { faker } from "@faker-js/faker";
import { QuestionType, SourceType } from "@/generated/prisma/enums";
const fakeUsers = Array.from({ length: 10 }).map(() => ({
  email: faker.internet.email(),
  name: faker.person.fullName(),
  xp: faker.number.int({ min: 1, max: 100 }),
  level: faker.number.int({ min: 1, max: 50 }),
  currency: faker.number.int({ min: 100, max: 1000 }),
  password: faker.string.uuid(),
  profile: faker.image.avatarGitHub(),
}));

const items = [
  "Double XP Boost",
  "XP Freeze",
  "Hint Token",
  "Extra Lives Pack",
  "Dark Theme",
  "Neon Theme",
  "Animated Avatar Frame",
  "Card Shuffle",
  "Time Warp",
  "Premium Badge",
] as const;
async function main() {
  const users = await prisma.user.createManyAndReturn({
    data: fakeUsers,
    skipDuplicates: true,
  });
  console.log(`Seeded ${users.length} users`);

  const fakeUserInventory = users.flatMap((user) => ({
    userId: user.id,
  }));

  const userInventory = await prisma.inventory.createManyAndReturn({
    data: fakeUserInventory,
    skipDuplicates: true,
  });

  console.log(`Seeded ${userInventory.length} inventories`);

  const fakeUserInventoryItems = userInventory.flatMap((inventory) =>
    Array.from({ length: 3 }).map(() => ({
      inventoryId: inventory.id,
      keyItem: faker.helpers.arrayElement(items),
      quantity: faker.number.int({ min: 2, max: 10 }),
    })),
  );

  const inventoryItems = await prisma.inventoryItem.createMany({
    data: fakeUserInventoryItems,
    skipDuplicates: true,
  });

  console.log(`Seeded ${inventoryItems.count} inventory items`);

  const fakePurchases = users.flatMap((user) =>
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => ({
      userId: user.id,
      cost: faker.number.int({ min: 100, max: 2000 }),
      itemKey: faker.helpers.arrayElement(items),
    })),
  );

  const purchases = await prisma.purchase.createMany({
    data: fakePurchases,
    skipDuplicates: true,
  });

  console.log(`Seeded ${purchases.count} purchases`);

  const fakeDecks = users.flatMap((user) =>
    Array.from({
      length: faker.number.int({ min: 1, max: 3 }),
    }).map(() => ({
      userId: user.id,
      title: faker.word.words(3),
      description: faker.lorem.sentence(),
      sourceType: faker.helpers.enumValue(SourceType),
    })),
  );

  const decks = await prisma.deck.createManyAndReturn({
    data: fakeDecks,
    skipDuplicates: true,
  });
  console.log(`Seeded ${decks.length} decks`);

  const fakeCards = decks.flatMap((deck) =>
    Array.from({ length: faker.number.int({ min: 5, max: 25 }) }).map(
      (_, index) => ({
        deckId: deck.id,
        questionType: faker.helpers.enumValue(QuestionType),
        options:
          (index + 1) % 3
            ? Array.from({ length: 4 }).map(() => faker.word.words(1))
            : [],

        answer: faker.word.words(1),
        difficulty: faker.number.int({ min: 1, max: 5 }),
      }),
    ),
  );

  const cards = await prisma.card.createMany({
    data: fakeCards,
    skipDuplicates: true,
  });

  console.log(`Seeded ${cards.count} cards`);

  const fakeGameSession = users.flatMap((user) => {
    const usersWithDecks = decks.filter((deck) => deck.userId === user.id);

    const correctCount = faker.number.int({ min: 5, max: 10 });
    const incorrectCount = faker.number.int({ min: 5, max: 8 });

    return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(
      () => ({
        userId: user.id,
        deckId: faker.helpers.arrayElement(usersWithDecks).id,
        livesStart: 3,
        livesEnd: faker.number.int({ min: 0, max: 3 }),
        score: faker.number.int({ min: 0, max: 1000 }),
        xpEarned: faker.number.int({ min: 0, max: 100 }),
        currencyEarned: faker.number.int({ min: 0, max: 50 }),
        correctCount,
        incorrectCount,
        streak: faker.number.int({ min: 0, max: correctCount }), // can't exceed correct
        startedAt: faker.date.recent({ days: 30 }),
        endedAt: faker.date.recent({ days: 1 }),
      }),
    );
  });

  const gameSession = await prisma.gameSession.createMany({
    data: fakeGameSession,
    skipDuplicates: true,
  });

  console.log(`Seeded ${gameSession.count} gameSessions`);

  console.log("--Seeding Complete--");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // Remove all non-word characters
}

// ✅ Function to create comments for a post
async function createCommentsForPost(postId: string, authorIds: string[]) {
  const commentsData = Array.from({ length: 20 }).map(() => ({
    content: faker.lorem.sentence(),
    authorId: authorIds[Math.floor(Math.random() * authorIds.length)], // ✅ Use valid ObjectId
    postId, // Link to the correct post
  }));

  await prisma.comment.createMany({ data: commentsData });
}

async function main() {
  const defaultPassword = await hash('123');

  // ✅ Create users
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    password: defaultPassword,
  }));

  await prisma.user.createMany({ data: users });

  // ✅ Fetch valid user IDs from MongoDB
  const authors = await prisma.user.findMany({ select: { id: true } });
  const authorIds = authors.map((author) => author.id); // Ensure IDs are strings

  // ✅ Create posts
  const posts = await Promise.all(
    Array.from({ length: 40 }).map(async () => {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          slug: generateSlug(faker.lorem.sentence()),
          content: faker.lorem.paragraphs(3),
          thumbnail: faker.image.urlLoremFlickr({ height: 240, width: 320 }),
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)], // ✅ Use valid ObjectId
          published: true,
        },
      });

      // ✅ Create comments for the post
      await createCommentsForPost(post.id, authorIds);
      return post;
    }),
  );

  console.log('Seeding Completed!');
}

main()
  .then(() => {
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((e) => {
    prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });

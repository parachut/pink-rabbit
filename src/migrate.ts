import { PrismaClient } from '@prisma/client';

var knex = require('knex')({
  client: 'pg',
  connection: process.env.LEGACY_DATABASE_URL,
  searchPath: ['public'],
});

async function main() {
  const prisma = new PrismaClient();

  const brands = await knex.where({});

  for (const brand of brands) {
    prisma.brand.create({
      data: {
        name: brand,
      },
    });
  }
}

main();

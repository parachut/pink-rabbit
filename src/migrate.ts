require('dotenv').config();

import { PrismaClient } from '@prisma/client';
import knex from 'knex';

const legacy = knex({
  client: 'pg',
  connection: process.env.LEGACY_DATABASE_URL,
  searchPath: ['public'],
});

const current = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: ['public'],
});

async function main() {
  const prisma = new PrismaClient();

  await current('brand').where({}).del();

  const brands = await legacy('brands').where({});
  await current
    .batchInsert(
      'brand',
      brands.map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        created: b.createdAt,
      })),
      200,
    )
    .returning('id');

  console.log('brands inserted');

  await current('category').where({}).del();

  const categories = await legacy('categories').where({});
  await current
    .batchInsert(
      'category',
      categories.map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        created: b.createdAt,
        parent_id: b.parent_id,
      })),
      200,
    )
    .returning('id');

  console.log('categories inserted');

  await current('product').where({}).del();

  const slugs: string[] = [];

  const getSlug = (slug: string) => {
    if (slugs.find((s) => s === slug)) {
      return slug + '-1';
    } else {
      slugs.push(slug);
      return slug;
    }
  };

  const products = await legacy('products').where({});
  await current
    .batchInsert(
      'product',
      products.map((b) => ({
        id: b.id,
        name: b.name,
        slug: getSlug(b.slug),
        description: b.description,
        active: b.active,
        width: b.width,
        height: b.height,
        depth: b.length,
        weight: b.weight,
        images: b.images,
        mfr: b.mfr,
        price: b.points || 0,
        popularity: b.popularity,
        demand: b.demand,
        released: b.releasedAt,
        created: b.createdAt,
        brand_id: b.brand_id,
        category_id: b.category_id,
      })),
      200,
    )
    .returning('id');

  console.log('products insertered');

  await current('warehouse').where({}).del();

  const warehouses = await legacy('warehouses').where({});
  await current
    .batchInsert(
      'warehouse',
      warehouses.map((b) => ({
        id: b.id,
        street1: b.street1,
        street2: b.street2,
        city: b.city,
        state: b.state,
        zip: b.zip,
        country: b.country,
        residential: false,
        carrier_facility: 'a',
        name: b.name,
        phone: b.phone,
        email: b.email,
        easy_post_id: b.easy_post_id,
        created: b.createdAt,
      })),
      200,
    )
    .returning('id');

  console.log('warehouses insertered');

  await current('bin').where({}).del();

  const bins = await legacy('bins').where({});
  await current
    .batchInsert(
      'bin',
      bins.map((b) => ({
        id: b.id,
        width: b.width,
        height: b.height,
        cell: b.cell,
        column: b.column,
        row: b.row,
        location: b.location,
        warehouse_id: b.warehouse_id || warehouses[0].id,
        created: b.createdAt,
      })),
      200,
    )
    .returning('id');

  console.log('bins insertered');

  await current('bin_free_node').where({}).del();

  const freeNodes = await legacy('bin_free_nodes').where({});
  await current
    .batchInsert(
      'bin_free_node',
      freeNodes.map((b) => ({
        id: b.id,
        width: b.width,
        height: b.height,
        x: b.x,
        y: b.y,
        bin_id: b.bin_id,
        created: b.createdAt,
      })),
      200,
    )
    .returning('id');

  console.log('bin free nodes insertered');

  await current('inventory').where({}).del();

  const inventory = await legacy('inventories').where({});

  await current
    .batchInsert(
      'inventory',
      inventory
        .filter((ii) => ii.user_id)
        .map((item) => ({
          id: item.id,
          serial: item.serial,
          sku: item.sku,
          active: item.active,
          condition: item.condition,
          status: item.status,
          included_essentials: item.missing_essentials,
          return_reason: item.return_reason,
          return: item.marked_for_return,
          created: item.createdAt,
          bin_id: item.bin_id,
          product_id: item.product_id,
          user_id: item.user_id,
          member_id: item.member_id,
        })),
      200,
    )
    .returning('id');

  console.log('inventory insertered');

  await current('order').where({}).del();

  const carts = await legacy('carts').where({});
  const shipKits = await legacy('shipkits').where({});

  for (const order of [...carts, ...shipKits.map((s) => ({ ...s, shipKit: true }))]) {
    const orderInventory = order.shipKit
      ? await legacy('shipkit_inventories').where({ ship_kit_id: order.id })
      : await legacy('cart_inventories').where({ cart_id: order.id });
    const cartItems = order.shipKit ? [] : await legacy('cart_items').where({ cart_id: order.id });

    console.log(orderInventory, cartItems);

    await prisma.order.create({
      data: {
        created: order.createdAt,
        canceled: order.canceledAt,
        completed: order.compeltedAt,
        confirmed: order.confirmedAt,
        shipKit: order.shipKit,
        airbox: order.airbox,
        coupon: order.couponCode,
        plan: order.plan_id,
        expedited: order.expedited,
        userId: order.user_id,
        inventory: orderInventory.length
          ? {
              connect: orderInventory.map((i) => ({
                id: i.inventory_id,
              })),
            }
          : {},
        items: cartItems.length
          ? {
              create: cartItems.map((ci) => ({
                product: {
                  connect: {
                    id: ci.product_id,
                  },
                },
                quantity: ci.quantity,
                created: ci.createdAt,
              })),
            }
          : {},
      },
    });
  }

  console.log('orders insertered');
}

main();

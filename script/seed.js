'use strict'

const { db, models: { User, Product, Order, OrderDetails } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ email: 'cody@StreetStack.com', password: '123' }),
    User.create({ email: 'murphy@StreetStack.com', password: '123' }),
    User.create({ email: 'kazi@StreetStack.com', password: '32022', isAdmin: true })
  ])

  //creating products
  const products = await Promise.all([
    Product.create({ name: 'Mochas', price: 550, image: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-Dark-Mocha-2-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1616187367" }),
    Product.create({ name: 'yeezys', price: 380, image: "https://cdn.flightclub.com/750/TEMPLATE/800389/1.jpg" }),
    Product.create({ name: "Kith Begonia Floral Williams III Hoodie", price: 170, image: "https://cdn.shopify.com/s/files/1/0094/2252/products/KHM030295-413-1728_900x.jpg?v=1644431046" }),
    Product.create({ name: "Supreme Rick Rubin Tee", price: 99, image: "https://img.stadiumgoods.com/17/27/92/83/17279283_35295691_2048.jpg" }),
    Product.create({ name: "Stussy Basic Crew", price: 105, image: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/1914762_NAVY_1_43618e6f-58bf-473e-8c80-a1c4db1b97a5_1296x.jpg?v=1643045584" }),
    Product.create({ name: "Supreme Box Logo Hoodie", price: 536, image: "https://cdn-images.farfetch-contents.com/17/75/78/45/17757845_37966486_1000.jpg" }),
    Product.create({ name: "OffWhite Monalisa T-Shirt", price: 536, image: "https://cdn-images.farfetch-contents.com/17/59/38/37/17593837_36785539_1000.jpg?c=3" }),

  ])

  //creating orders
  const orders = await Promise.all([
    Order.create({ userId: 1 }),
    Order.create({ userId: 2 }),
  ])

  //creating orderDetails
  const orderDetails = await Promise.all([
    OrderDetails.create({ productId: 1, orderId: 1, userId: 1, price: 550, quantity: 1 }),
    OrderDetails.create({ productId: 2, orderId: 2, userId: 2, price: 380, quantity: 1 })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    products: {
      mochas: products[0],
      yeezys: products[1]
    },
    orders: {
      cody: orders[0],
      murphy: orders[1]
    },
    orderDetails: {
      order1: orderDetails[0]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

const { green, red } = require("chalk");
const { db } = require("./server/db");
const { User, Product } = require("./server/db/models");

const products = [
  {
    name: "Echeveria Arachnoides",
    quantity: 10,
    price: 7.99,
    imageUrl: "/product_images/echeveria_arachnoides.jpeg",
  },
  {
    name: "Monstera Deliciosa",
    quantity: 10,
    price: 35.0,
    imageUrl: "/product_images/monstera_deliciosa.jpg",
  },
  {
    name: "Zamioculcus Zamifolia",
    quantity: 10,
    price: 54.99,
    imageUrl: "/product_images/zamioculcus_zamifolia.jpeg",
  },
  {
    name: "Ficus Lyrata",
    quantity: 10,
    price: 95.0,
    imageUrl: "/product_images/ficus_lyrata.jpeg",
  },
  {
    name: "Begonia Rex",
    quantity: 10,
    price: 24.99,
    imageUrl: "/product_images/begonia_rex.jpeg",
  },
  {
    name: "Venus Fly Trap",
    quantity: 10,
    price: 12.0,
    imageUrl: "/product_images/venus_fly_trap.jpg",
  },
  {
    name: "Snake Plant",
    quantity: 10,
    price: 49.99,
    imageUrl: "/product_images/snake_plant.jpg",
  },
  {
    name: "Lady Palm",
    quantity: 10,
    price: 125.95,
    imageUrl: "/product_images/lady_palm.jpeg",
  },
  {
    name: "Ponytail Palm",
    quantity: 10,
    price: 69.95,
    imageUrl: "/product_images/ponytail_palm.jpg",
  },
  {
    name: "Corn Plant",
    quantity: 10,
    price: 79.95,
    imageUrl: "/product_images/corn_plant.jpeg",
  },
];

const users = [
  {
    username: "rockyRacoon",
    password: "hello",
    email: "rracoon@gmail.com",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      products.map((product) => {
        return Product.create(product);
      })
    );

    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    console.log(green("Seeding Success"));
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      db.close();
    })
    .catch((err) => {
      console.error(red("Something went wrong!"));
      console.error(err);
      db.close();
    });
}

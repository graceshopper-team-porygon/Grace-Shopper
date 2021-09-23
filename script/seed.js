"use strict";
const { green, red } = require("chalk");
const {
  db,
  models: { User, Product, CartItem },
} = require("../server/db");
// const { db } = require("../server/db");
// const { User, Product } = require("../server/db/models");

const products = [
  {
    name: "Echeveria Arachnoides",
    quantity: 10,
    price: 7.99,
    imageUrl: "/product_images/echeveria_arachnoides.jpeg",
    description: "Succulent",
  },
  {
    name: "Monstera Deliciosa",
    quantity: 10,
    price: 35.0,
    imageUrl: "/product_images/monstera_deliciosa.jpg",
    description:
      "the Swiss cheese plant, is a species of flowering plant native to tropical forests of southern Mexico.",
  },
  {
    name: "Zamioculcus Zamifolia",
    quantity: 10,
    price: 54.99,
    imageUrl: "/product_images/zamioculcus_zamifolia.jpeg",
    description:
      "Zamioculcas is a genus of flowering plants in the family Araceae, containing the single species Zamioculcas zamiifolia. It is a tropical perennial plant native to eastern Africa, from southern Kenya to northeastern South Africa.",
  },
  {
    name: "Ficus Lyrata",
    quantity: 10,
    price: 95.0,
    imageUrl: "/product_images/ficus_lyrata.jpeg",
    description:
      "Commonly known as the fiddle-leaf fig, is a species of flowering plant in the mulberry and fig family Moraceae. It is native to western Africa, from Cameroon west to Sierra Leone, where it grows in lowland tropical rainforest. It can grow up to 12–15 m tall.",
  },
  {
    name: "Begonia Rex",
    quantity: 10,
    price: 24.99,
    imageUrl: "/product_images/begonia_rex.jpeg",
    description:
      "The king begonia, is a species of flowering plant in the family Begoniaceae. It is found from Arunachal Pradesh to southeast China, and has been introduced to Bangladesh, Cuba, and Hispaniola.",
  },
  {
    name: "Venus Fly Trap",
    quantity: 10,
    price: 12.0,
    imageUrl: "/product_images/venus_fly_trap.jpg",
    description:
      "The Venus flytrap is a carnivorous plant native to subtropical wetlands on the East Coast of the United States in North Carolina and South Carolina.",
  },
  {
    name: "Snake Plant",
    quantity: 10,
    price: 49.99,
    imageUrl: "/product_images/snake_plant.jpg",
    description:
      "Dracaena trifasciata is a species of flowering plant in the family Asparagaceae, native to tropical West Africa from Nigeria east to the Congo. It is most commonly known as the snake plant, Saint George's sword, mother-in-law's tongue, and viper's bowstring hemp, among other names.",
  },
  {
    name: "Lady Palm",
    quantity: 10,
    price: 125.95,
    imageUrl: "/product_images/lady_palm.jpeg",
    description:
      "Rhapis excelsa, also known as broadleaf lady palm or bamboo palm, is a species of fan palm in the genus Rhapis, probably native to southern China and Taiwan. It is not known in the wild; all known plants come from cultivated groups in China. ",
  },
  {
    name: "Ponytail Palm",
    quantity: 10,
    price: 69.95,
    imageUrl: "/product_images/ponytail_palm.jpg",
    description:
      "Beaucarnea recurvata, the elephant's foot or ponytail palm, is a species of plant in the family Asparagaceae. The species was native to numerous states of eastern Mexico but is now confined to the state of Veracruz. Despite its common name, it is not closely related to the true palms. ",
  },
  {
    name: "Corn Plant",
    quantity: 10,
    price: 79.95,
    imageUrl: "/product_images/corn_plant.jpeg",
    description:
      "Dracaena fragrans, is a flowering plant species that is native throughout tropical Africa, from Sudan south to Mozambique, west to Côte d'Ivoire and southwest to Angola, growing in upland regions at 600–2,250 m altitude. It is also known as striped dracaena, compact dracaena, and corn plant. ",
  },
  {
    name: "Hammer Pants",
    quantity: 10,
    price: 25.0,
    imageUrl: "/product_images/hammer_pants",
    description:
      "Hammer pants are customized/modified baggy pants tapered at the ankle with a sagging rise made suitable for hip-hop dancing.",
  },
];

const users = [
  {
    username: "rockyRacoon",
    password: "hello",
    email: "rracoon@gmail.com",
  },
  {
    username: "lucyBronze",
    password: "soccer",
    email: "lbronze@england.com",
    isAdmin: true,
  },
  {
    username: "cfisher",
    password: "leia",
    email: "starwars@lucasfilm.com",
  },
  {
    username: "finnHuman",
    password: "adventureTime",
    email: "buffbaby@ooo.com",
  },
  {
    username: "orlaMcCool",
    password: "holySmirk",
    email: "omccool@derrygirls.com",
    isAdmin: true,
  },
];
const cartItems = [
  {
    productId: 1,
    quantity: 3,
    userId: 1,
  },
  {
    productId: 2,
    quantity: 5,
    userId: 1,
  },
  {
    productId: 3,
    quantity: 1,
    userId: 1,
  },
  {
    productId: 6,
    quantity: 7,
    userId: 4,
  },
  {
    productId: 8,
    quantity: 2,
    userId: 4,
  },
  {
    productId: 11,
    quantity: 5,
    userId: 5,
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
    await Promise.all(cartItems.map((item) => CartItem.create(item)));
    console.log(green("Seeding Success"));
  } catch (err) {
    console.log(red(err));
  }
};

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

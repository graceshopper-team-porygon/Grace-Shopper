"use strict";
const { green, red } = require("chalk");
const {
  db,
  models: { User, Product, CartItem, Order },
} = require("../server/db");

const products = [
  {
    name: "Echeveria Arachnoides",
    quantity: 10,
    price: 799,
    imageUrl: "/product_images/echeveria_arachnoides.jpeg",
    description: "Succulent",
    category: 'plant'
  },
  {
    name: "Monstera Deliciosa",
    quantity: 10,
    price: 3500,
    imageUrl: "/product_images/monstera_deliciosa.jpg",
    description:
      "the Swiss cheese plant, is a species of flowering plant native to tropical forests of southern Mexico.",
      category: 'plant'
  },
  {
    name: "Zamioculcus Zamifolia",
    quantity: 10,
    price: 5499,
    imageUrl: "/product_images/zamioculcus_zamifolia.jpeg",
    category: 'plant',
    description:
      "Zamioculcas is a genus of flowering plants in the family Araceae, containing the single species Zamioculcas zamiifolia. It is a tropical perennial plant native to eastern Africa, from southern Kenya to northeastern South Africa.",
  },
  {category: 'plant',
    name: "Ficus Lyrata",
    quantity: 10,
    price: 9500,
    imageUrl: "/product_images/ficus_lyrata.jpeg",
    description:
      "Commonly known as the fiddle-leaf fig, is a species of flowering plant in the mulberry and fig family Moraceae. It is native to western Africa, from Cameroon west to Sierra Leone, where it grows in lowland tropical rainforest. It can grow up to 12–15 m tall.",
  },
  {category: 'plant',
    name: "Begonia Rex",
    quantity: 10,
    price: 2499,
    imageUrl: "/product_images/begonia_rex.jpeg",
    description:
      "The king begonia, is a species of flowering plant in the family Begoniaceae. It is found from Arunachal Pradesh to southeast China, and has been introduced to Bangladesh, Cuba, and Hispaniola.",
  },
  {category: 'plant',
    name: "Venus Fly Trap",
    quantity: 10,
    price: 1200,
    imageUrl: "/product_images/venus_fly_trap.jpg",
    description:
      "The Venus flytrap is a carnivorous plant native to subtropical wetlands on the East Coast of the United States in North Carolina and South Carolina.",
  },
  {category: 'plant',
    name: "Snake Plant",
    quantity: 10,
    price: 4999,
    imageUrl: "/product_images/snake_plant.jpg",
    description:
      "Dracaena trifasciata is a species of flowering plant in the family Asparagaceae, native to tropical West Africa from Nigeria east to the Congo. It is most commonly known as the snake plant, Saint George's sword, mother-in-law's tongue, and viper's bowstring hemp, among other names.",
  },
  {category: 'plant',
    name: "Lady Palm",
    quantity: 10,
    price: 12595,
    imageUrl: "/product_images/lady_palm.jpeg",
    description:
      "Rhapis excelsa, also known as broadleaf lady palm or bamboo palm, is a species of fan palm in the genus Rhapis, probably native to southern China and Taiwan. It is not known in the wild; all known plants come from cultivated groups in China. ",
  },
  {category: 'plant',
    name: "Ponytail Palm",
    quantity: 10,
    price: 6995,
    imageUrl: "/product_images/ponytail_palm.jpg",
    description:
      "Beaucarnea recurvata, the elephant's foot or ponytail palm, is a species of plant in the family Asparagaceae. The species was native to numerous states of eastern Mexico but is now confined to the state of Veracruz. Despite its common name, it is not closely related to the true palms. ",
  },
  {category: 'plant',
    name: "Corn Plant",
    quantity: 10,
    price: 7995,
    imageUrl: "/product_images/corn_plant.jpeg",
    description:
      "Dracaena fragrans, is a flowering plant species that is native throughout tropical Africa, from Sudan south to Mozambique, west to Côte d'Ivoire and southwest to Angola, growing in upland regions at 600–2,250 m altitude. It is also known as striped dracaena, compact dracaena, and corn plant. ",
  },
  {category: 'pant',
    name: "Hammer Pants",
    quantity: 10,
    price: 2500,
    imageUrl: "/product_images/hammer_pants.jpeg",
    description:
      "Hammer pants are customized/modified baggy pants tapered at the ankle with a sagging rise made suitable for hip-hop dancing.",
  },
  {category: 'pant',
    name: "Harem Pants",
    quantity: 10,
    price: 4700,
    imageUrl: "/product_images/harem_pants.jpg",
    description:
      "Harem pants are loose fitted, flowing pants, that end right around the ankles and can have a straight fit that is pinched at the end or a drop crotch style.",
  },
  {category: 'pant',
    name: "Cow Print Pants",
    quantity: 10,
    price: 1300,
    imageUrl: "/product_images/cow_print_pants.webp",
    description:
      "A pair of knit pants featuring an allover cow print, a high-rise, elasticized waistband, and a flare leg.",
  },
  {category: 'pant',
    name: "Sailor Pants",
    quantity: 10,
    price: 7200,
    imageUrl: "/product_images/sailor_pants.jpeg",
    description:
      "Sailor trousers are wide-leg, high-waisted slacks with buttons along the pockets creating a bib front",
  },
  {category: 'pant',
    name: "Hearts Jeans",
    quantity: 10,
    price: 6799,
    imageUrl: "/product_images/hearts_jeans.jpeg",
    description:
      "The heart knows what it wants, and something tells me it’s these! Wide-leg jeans in high-waisted fit with super-fun graffiti-style heart graphic print all-over. Including button and zip closure, front round pockets and back patch pockets. Crushin’ hard.",
  },
  {category: 'pant',
    name: "Punk Jogger Cargo Pants",
    quantity: 10,
    price: 3699,
    imageUrl: "/product_images/punk_joggers.jpg",
    description:
      "These mens joggers pants are made of high quality imported cotton material and excellent imported polyester material. It is very comfortable and breathable. These joggers are suitable for all seasons.",
  },
  {category: 'pant',
    name: "Paint Pants",
    quantity: 10,
    price: 2899,
    imageUrl: "/product_images/paint_pant.jpg",
    description:
      "This casual sweatpant is soft and comfy. Great for festivals and birthday gift choice!",
  },
  {category: 'pant',
    name: "Khaki Pants",
    quantity: 10,
    price: 2900,
    imageUrl: "/product_images/khaki_pant.jpg",
    description:
      "Just your common khaki pant for those buyers that don't want to think too much about what to put on in the morning and blend in with the plaster",
  },
  {category: 'pant',
    name: "Yoga Pants",
    quantity: 10,
    price: 1999,
    imageUrl: "/product_images/yoga_pants.png",
    description:
      "Yoga pants are high-denier hosiery reaching from ankle to waist, originally designed for yoga as exercise and first sold in 1998 by Lululemon.",
  },
  {category: 'pant',
    name: "Pencil Pants",
    quantity: 10,
    price: 5499,
    imageUrl: "/product_images/pencil_pant.jpg",
    description:
      "These comfy casual tie waist pants are the perfect choice for Work, Office, Date, Vacation, Holiday, Party, Outdoors, Casual out, Daily wear, Shopping and any other occasions in Spring, Summer, Fall and Winter.",
  },
  {
    category:'pant',
    name: "Balloon Pants",
    quantity: 10,
    price: 99900,
    imageUrl: "/product_images/balloon_pants.jpeg",
    description:
      "Did someone say FASHUN?",
  },
];

const users = [
  { password: "admin", username: "admin@admin.com", isAdmin: true },
  {
    password: "hello",
    username: "rracoon@gmail.com",
  },
  {
    password: "soccer",
    username: "lbronze@england.com",
    isAdmin: true,
  },
  {
    password: "leia",
    username: "starwars@lucasfilm.com",
  },
  {
    password: "adventureTime",
    username: "buffbaby@ooo.com",
  },
  {
    password: "holySmirk",
    username: "omccool@derrygirls.com",
    isAdmin: true,
  },
];
const cartItems = [
  {
    productId: 1,
    quantity: 3,
    userId: 1,
    orderId: 1,
  },
  {
    productId: 2,
    quantity: 5,
    userId: 1,
    orderId: 1,
  },
  {
    productId: 3,
    quantity: 1,
    userId: 1,
    orderId: 1,
  },
  {
    productId: 6,
    quantity: 7,
    userId: 4,
    orderId: 2,
  },
  {
    productId: 8,
    quantity: 2,
    userId: 4,
    orderId: 2,
  },
  {
    productId: 11,
    quantity: 5,
    userId: 5,
    orderId: 3,
  },
];

const order = [
  {
    status: "In Progress",
    total: 100,
    userId: 1,
  },
  {
    status: "In Progress",
    total: 100,
    userId: 4,
  },
  {
    total: 100,
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

    await Promise.all(
      order.map((order) => {
        return Order.create(order);
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

module.exports = seed;

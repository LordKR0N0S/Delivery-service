import mongoose from 'mongoose';

const shopIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const shops = [
  {
    _id: shopIds[0],
    shopName: 'Pizza House',
    adress: 'вулиця Городоцька, Львів, Львівська область, Україна',
    coords: { lat: 49.83090699973777, lng: 23.96984572063978 },
    shopPicturePath:
      'https://res.cloudinary.com/dryevmdfj/image/upload/v1685527595/zkzxkluhmunm05vtovk5.png',
    goods: [
      {
        productName: 'Margarita',
        productId: 1,
        price: 7.99,
        productPicturePath:
          'https://res.cloudinary.com/dryevmdfj/image/upload/v1685526942/tpeewptoxj1jswnw3kiw.jpg',
        description:
          'tomatoes, mozzarella cheese, fresh basil, salt and extra-virgin olive oil.',
      },
      {
        productName: 'Quattro formaggi',
        productId: 2,
        price: 9.99,
        productPicturePath:
          'https://res.cloudinary.com/dryevmdfj/image/upload/v1685456539/fu2rfcooshvv0wkoag09.jpg',
        description: 'mozzarella, gorgonzola, parmesan, ricotta',
      },
      {
        productName: 'Capricciosa',
        productId: 3,
        price: 9.99,
        productPicturePath:
          'https://res.cloudinary.com/dryevmdfj/image/upload/v1685526847/zx6yo3nlaip6qoqsx2or.jpg',
        description:
          'mozzarella cheese, Italian baked ham, mushroom, artichoke and tomato',
      },
      {
        productName: 'Hawaiian',
        productId: 4,
        price: 8.99,
        productPicturePath:
          'https://res.cloudinary.com/dryevmdfj/image/upload/v1685527057/doismdt4dho0wltoadx4.jpg',
        description:
          ' pineapple, tomato sauce, cheese, and either ham or bacon',
      },
    ],
    createdAt: 1685532123925,
    updatedAt: 1685532123925,
    __v: 0,
  },
  {
    _id: shopIds[1],
    shopName: 'Burger House',
    adress: 'вулиця Героїв УПА, Львів, Львівська область',
    coords: { lat: 49.83171361966399, lng: 23.99824583321432 },
    shopPicturePath:
      'https://res.cloudinary.com/dryevmdfj/image/upload/v1685527747/letmbj9o0reoatlhadpk.jpg',
    goods: [
      {
        productName: 'Cheeseburger',
        productId: 5,
        price: 4.99,
        productPicturePath:
          'https://res.cloudinary.com/dryevmdfj/image/upload/v1685527336/dpekakeldktwjsngcde4.jpg',
        description:
          'Bun, marbled beef cutlet, cheddar cheese, tomato, iceberg lettuce, mayonnaise, barbecue sauce, weight 210g.',
      },
      {
        productName: 'Burger with turkey',
        productId: 6,
        price: 5.99,
        productPicturePath:
          'https://res.cloudinary.com/dryevmdfj/image/upload/v1685527371/lmvvakvx3lt9hepbuecp.jpg',
        description:
          'green bun, turkey cutlet, apple, cheddar cheese, arugula, cheese sauce, blackcurrant sauce, weight 280g.',
      },
      {
        productName: 'Vegetarian Burger',
        productId: 7,
        price: 3.99,
        productPicturePath:
          'https://res.cloudinary.com/dryevmdfj/image/upload/v1685527405/hmjjwezo1u0ovjh1grns.jpg',
        description:
          'white bun, mushroom cutlet, avocado, gouda, iceberg leaves, cheese sauce, weight 270g',
      },
      {
        productName: 'Burger with french fries',
        productId: 8,
        price: 5.99,
        productPicturePath:
          'https://res.cloudinary.com/dryevmdfj/image/upload/v1685527390/jddahzwpsszdwmkic9gr.jpg',
        description:
          'green bun, marbled beef cutlet, fried onion, tomato, gherkin, cheddar cheese, bacon, fried onion, iceberg lettuce, BBQ sauce, mayonnaise, weight 320g.',
      },
    ],
    createdAt: 1685532123925,
    updatedAt: 1685532123925,
    __v: 0,
  },
  {
    _id: shopIds[2],
    shopName: 'Kebab House',
    adress: 'вулиця Миколи Коперника, Львів, Львівська область',
    coords: { lat: 49.83687908734921, lng: 24.02383798348968 },
    shopPicturePath:
      'https://res.cloudinary.com/dryevmdfj/image/upload/v1685527664/lyfkxwtgrbtxbjhnjkwg.jpg',
    goods: [
      {
        productName: 'Kebab XXL Mix',
        productId: 9,
        price: 4.99,
        productPicturePath:
          'https://res.cloudinary.com/dryevmdfj/image/upload/v1685527228/aobcpmn8ulkm9yk4hogs.jpg',
        description:
          'pita bread, tomato, Iceberg salad, meat: pork and chicken, onion, spicy/non-spicy/semi-spicy',
      },
      {
        productName: 'Kebab XL with pork',
        productId: 10,
        price: 3.99,
        productPicturePath:
          'https://res.cloudinary.com/dryevmdfj/image/upload/v1685527212/oceme8oh64yuhnxxyqvk.jpg',
        description:
          'pita bread, tomato, Iceberg salad, meat: pork, onion, spicy/non-spicy/semi-spicy sauce',
      },
      {
        productName: 'Kebab XL with chicken',
        productId: 11,
        price: 3.99,
        productPicturePath:
          'https://res.cloudinary.com/dryevmdfj/image/upload/v1685527154/lhwaiv67afehcxkpaaob.jpg',
        description:
          'pita bread, tomato, Iceberg salad, meat: chicken, onion, spicy/non-spicy/semi-spicy sauce',
      },
      {
        productName: 'Kebab sandwich',
        productId: 12,
        price: 3.49,
        productPicturePath:
          'https://res.cloudinary.com/dryevmdfj/image/upload/v1685527250/lxnt16t2jptayufidwon.jpg',
        description:
          'pita bread, tomato, Iceberg salad, meat: pork, onion, spicy/non-spicy/semi-spicy sauce',
      },
    ],
    createdAt: 1685532123925,
    updatedAt: 1685532123925,
    __v: 0,
  },
];

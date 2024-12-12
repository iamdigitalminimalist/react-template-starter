import { factory, primaryKey, manyOf } from '@mswjs/data';
import { faker } from '@faker-js/faker';

export const db = factory({
  product: {
    id: primaryKey(faker.number.int),
    name: faker.commerce.productName,
    description: faker.commerce.productDescription,
    price: () => faker.number.int({ min: 1, max: 1000 }),
    image: faker.image.url,
  },

  category: {
    id: primaryKey(faker.number.int),
    name: faker.word.noun,
  },

  tech: {
    id: primaryKey(faker.number.int),
    name: faker.commerce.productName,
    description: faker.commerce.productDescription,
    categories: manyOf('category'),
  },
});

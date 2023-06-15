import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const menuArray = [
  {
    name: 'Pizza',
    ingredients: ['pepperoni', 'mushrom', 'mozarella'],
    price: 14,
    emoji: 'images/item graphic pizza.png',
    id: 1,
    uuid: uuidv4(),
  },
  {
    name: 'Hamburger',
    ingredients: ['beef', 'cheese', 'lettuce'],
    price: 12,
    emoji: 'images/item graphic hamburger.png',
    id: 2,
    uuid: uuidv4(),
  },
  {
    name: 'Beer',
    ingredients: ['grain, hops, yeast, water'],
    price: 13,
    emoji: 'images/item graphic beer.png',
    id: 3,
    uuid: uuidv4(),
  },
];

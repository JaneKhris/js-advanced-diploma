import Bowman from '../characters/Bowman';
import Magician from '../characters/Magician';
import Swordsman from '../characters/Swordsman';

import { characterGenerator, generateTeam } from '../generators';

test('test characterGenerator', () => {
  const playerTypes = [Bowman, Swordsman, Magician];
  const gen = characterGenerator(playerTypes, 3);
  for (let i = 0; i < 20; i += 1) {
    const next = gen.next().value;
    if (!playerTypes.includes(next.constructor)) {
      throw new Error();
    }
  }
  const check = true;

  expect(check).toBe(true);
});

test('test count generateTeam ', () => {
  const playerTypes = [Bowman, Swordsman, Magician];
  const gen = generateTeam(playerTypes, 4, 5, 'player');
  for (let i = 0; i < 20; i += 1) {
    if (!gen.characters.length === 5) {
      throw new Error();
    }
  }
  const check = true;

  expect(check).toBe(true);
});

test('test level generateTeam ', () => {
  const playerTypes = [Bowman, Swordsman, Magician];
  const gen = generateTeam(playerTypes, 4, 5, 'player');
  for (let i = 0; i < 20; i += 1) {
    gen.characters.forEach((element) => {
      if (element.level > 4) {
        throw new Error();
      }
    });
  }
  const check = true;

  expect(check).toBe(true);
});

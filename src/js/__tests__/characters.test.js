import Character from '../Character';
import Bowman from '../characters/Bowman';
import Daemon from '../characters/Daemon';
import Magician from '../characters/Magician';
import Swordsman from '../characters/Swordsman';
import Undead from '../characters/Undead';
import Vampire from '../characters/Vampire';

test('test create Character', () => {
  expect(() => new Character(1)).toThrow(new Error('Невозможно создать персонаж Character'));
});

test.each([
  [Bowman, 1, 25, 25],
  [Daemon, 1, 10, 10],
  [Magician, 1, 10, 40],
  [Swordsman, 1, 40, 10],
  [Undead, 1, 40, 10],
  [Vampire, 1, 25, 25],
])('teas create characters', (Class, level, attack, defence) => {
  const char = new Class(level);
  expect([char.attack, char.defence]).toEqual([attack, defence]);
});

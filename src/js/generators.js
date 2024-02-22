import PlayerTeam from "./PlayerTeam";
import ComputerTeam from "./ComputerTeam";

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  const types = allowedTypes;
  const level = maxLevel;
  while (true) {
    yield new types[Math.floor(Math.random() * (types.length))](Math.ceil(Math.random() * level));
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде -
 * characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount, owner) {
  const types = allowedTypes;
  const level = maxLevel;
  const count = characterCount;

    const characters = [];
    for (let i = 0; i < count; i += 1) {
      characters.push(new types[Math.floor(Math.random() * (types.length))](Math.ceil(Math.random() * level)));
    }
    switch (owner) {
      case 'player':
        return new PlayerTeam(characters);
      case 'computer':
        return new ComputerTeam(characters);
      default:
        throw new Error()
    }    
}

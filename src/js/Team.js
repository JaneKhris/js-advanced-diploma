 import PositionedCharacter from "./PositionedCharacter";
import { getArea } from "./utils";
 /**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
  constructor(characters) {
    this.characters = [];
    characters.forEach((element) => {
      const ch = element;
      this.characters.push(ch);
    });

    if (new.target === Team) {
      throw new Error('Невозможно создать команду Team');
    }
  }

  getPositions(boardSize, count) {
    const available = this.getAvailable(boardSize);
    const positions = [];
    while (positions.length < count) {
      const item = available[Math.floor(Math.random() * available.length)];
      if (!positions.includes(item)) {
        positions.push(item);
      }
    }
    return positions;
  }

  getPositionedCharacters(boardSize, count) {
      const positions = this.getPositions(boardSize, count);
      const positionedCharacterArray = [];
      for (let i = 0; i < this.characters.length; i += 1) {
        const item = new PositionedCharacter(this.characters[i], positions[i]);
        positionedCharacterArray.push(item);
      }
      return positionedCharacterArray;
    }
  
}

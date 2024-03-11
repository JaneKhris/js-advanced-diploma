 import PositionedCharacter from "./PositionedCharacter";
 /**
 * Базовый класс, от которого наследуются команды
 * @property characters - массив персонажей в классе
 */
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

  /**
 * Формирует индексы полей для расположения персонажей
 * @param boardSize размер поля
 * @param count количесвто персонажей в команде
 * @returns массив, содержащий индексы полей, в которыых будут расположены персонажи команды
 * */

  getPositions(boardSize, count, positionsUsed) {
    const available = this.getAvailable(boardSize);
    const positions = [];
    while (positions.length < count) {
      const item = available[Math.floor(Math.random() * available.length)];
      if (!positions.includes(item) && (!positionsUsed.includes(item))) {
        positions.push(item);
      }
    }
    return positions;
  }

/**
 * Формирует массив персонажей, расположенных на игровои поле
 * @param boardSize размер поля
 * @param count количесвто персонажей в команде
 * @returns массив, содержащий экземпляры класса PositionedCharacter
 * */

  getPositionedCharacters(boardSize, count, positionsUsed) {
      const positions = this.getPositions(boardSize, count, positionsUsed);
      const positionedCharacterArray = [];
      for (let i = 0; i < this.characters.length; i += 1) {
        const item = new PositionedCharacter(this.characters[i], positions[i]);
        positionedCharacterArray.push(item);
      }
      return positionedCharacterArray;
    }
  
}

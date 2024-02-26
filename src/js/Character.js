import { getArea } from "./utils";

/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;

    if (new.target === Character) {
      throw new Error('Невозможно создать персонаж Character');
    }
  }

/**
 * Формирует область, доступную для перемещения персонажа
 * @param index индекс поля
 * @param boardSize размер поля
 * @returns массив, содержащий индексы полей, доступных для перемещения персонажа
 * */
  getAttackArea(index, boardSize) {
    return getArea(index, this.attackArea, boardSize)
  }
  
/**
 * Формирует область, в которой персонаж может атаковать противника
 * @param index индекс поля
 * @param boardSize размер поля
 * @returns массив, содержащий индексы полей, в которыых персонаж может атаковать противника
 * */
  getMoveArea(index, boardSize) {
    return getArea(index, this.moveArea, boardSize)
  }

}

import Character from '../Character';

export default class Bowman extends Character {
  constructor(level) {
    super(level);
    this.attack = 25;
    this.defence = 25;
    this.type = 'bowman';
    this.moveArea = 2;
    this.attackArea = 7;
  }
}

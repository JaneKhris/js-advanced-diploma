import Character from '../Character';

export default class Swordsman extends Character {
  constructor(level) {
    super(level);
    this.attack = 40;
    this.defence = 10;
    this.type = 'swordsman';
    this.moveArea = 4;
    this.attackArea = 1;
  }
}

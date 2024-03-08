import themes from "./themes";

export default class GameState {
  constructor() {
    this.next = {
      player: true,
      computer: false
    };
    this.level = 1;
  }

  change() {
    this.next.player = !this.next.player;
    this.next.computer = !this.next.computer;
  }
  
  static from(object) {
    // TODO: create object
    return null;
  }

  getLevel() {
    switch (this.level) {
      case 1:
        return themes.prairie;
      case 2:
        return themes.desert;
      case 3:
        return themes.arctic;
      case 4:
        return themes.arctic;
      default:
        break;
    }
  }
}

export default class GameState {
  constructor() {
    this.next = {
      player: true,
      computer: false
    };
    // this.playerTeam = [];
    // this.computerTeam = [];
    // this.activeCharacter = {};
    
  }

  change() {
    this.next.player = !this.next.player;
    this.next.computer = !this.next.computer;
  }
  
  static from(object) {
    // TODO: create object
    return null;
  }
}

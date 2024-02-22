import { getPositions, getPositionedCharacterArray } from './utils';
import { generateTeam } from './generators';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi('prairie');

    this.playerTeam = generateTeam(this.gamePlay.playerTypes, this.gamePlay.maxLevel, this.gamePlay.charInTeam, 'player');
    this.computerTeam = generateTeam(this.gamePlay.computerTypes, this.gamePlay.maxLevel, this.gamePlay.charInTeam, 'computer');

    this.playerArray = this.playerTeam.getPositionedCharacters(this.gamePlay.boardSize, this.gamePlay.charInTeam);
    this.computerArray = this.computerTeam.getPositionedCharacters(this.gamePlay.boardSize, this.gamePlay.charInTeam);
    this.positionedCharacters = this.playerArray.concat(this.computerArray)

    this.gamePlay.redrawPositions(this.positionedCharacters);
    
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    const character = this.positionedCharacters.find(positionedCharacter => positionedCharacter.position == index);
    
    if (character) {
      const char = character.character;
      this.gamePlay.showCellTooltip(`\u{1F396}${char.level} \u{2694}${char.attack} \u{1F6E1}${char.defence} \u{2764}${char.health} `,index)
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}

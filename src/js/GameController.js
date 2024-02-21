import { getPositions, getPositionedCharacterArray } from './utils';
import { generateTeam } from './generators';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi('prairie');
    this.teamPlayer = generateTeam(this.gamePlay.playerTypes, this.gamePlay.maxLevel, this.gamePlay.charInTeam).next().value;
    this.teamRival = generateTeam(this.gamePlay.rivalTypes, this.gamePlay.maxLevel, this.gamePlay.charInTeam).next().value;
    this.teamPlayerPositions = getPositions(this.gamePlay.getPositionsAvailable().player, this.gamePlay.charInTeam);
    this.teamRivalPositions = getPositions(this.gamePlay.getPositionsAvailable().rival, this.gamePlay.charInTeam);
    this.teamPlayerArray = getPositionedCharacterArray(this.teamPlayer.characters, this.teamPlayerPositions);
    this.teamRivalArray = getPositionedCharacterArray(this.teamRival.characters, this.teamRivalPositions);
    this.positionedCharacterArray = this.teamPlayerArray.concat(this.teamRivalArray);
    this.gamePlay.redrawPositions(this.positionedCharacterArray);

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}

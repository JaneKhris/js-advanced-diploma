import { generateTeam } from './generators';
import GamePlay from './GamePlay';
import GameState from './GameState';
import cursors from './cursors';

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

    this.gameState = new GameState();
    
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));

    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));


    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));






    
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    if (this.gameState.next.player === true) {
      this.selectCharacter(this.playerArray, index);
    } else {
      this.selectCharacter(this.computerArray, index)
    }
  }

  selectCharacter(teamArray, index) {
    if (teamArray.find(positionedCharacter => positionedCharacter.position == index)) {
    teamArray.forEach((char) => {
      if (char.position != index) {
        this.gamePlay.deselectCell(char.position);
      }
    this.gamePlay.selectCell(index);
    this.activeCharacter = teamArray.find(positionedCharacter => positionedCharacter.position == index);
    console.log(this.activeCharacter)
    })
    } else {
      GamePlay.showError('Невозможно выбрать эту ячейку');
    }
  }

  onCellEnter(index) {
    this.gamePlay.setCursor(cursors.auto);

    const character = this.positionedCharacters.find(positionedCharacter => positionedCharacter.position == index);
    
    if (character) {
      if (this.activeCharacter) {
        console.log(character)
        if ((this.playerArray.includes(character) && this.gameState.next.player) ||
        (this.computerArray.includes(character) && this.gameState.next.computer)) {
          this.gamePlay.setCursor(cursors.pointer)
        } 
        if ((this.playerArray.includes(character) && this.gameState.next.computer) ||
        (this.computerArray.includes(character) && this.gameState.next.player)) {
          this.gamePlay.setCursor(cursors.notallowed)
        }
        
      }

      const char = character.character;
      this.gamePlay.showCellTooltip(`\u{1F396}${char.level} \u{2694}${char.attack} \u{1F6E1}${char.defence} \u{2764}${char.health} `,index)
    }

    if (this.activeCharacter) {
      console.log(this.positionedCharacters.find(positionedCharacter => positionedCharacter.position == index))
      // this.gamePlay.deselectCell(index)
      if (this.activeCharacter.character.getMoveArea(this.activeCharacter.position, this.gamePlay.boardSize).includes(index) &&
      !(this.positionedCharacters.find(positionedCharacter => positionedCharacter.position == index))) {
      this.gamePlay.cells[index].classList.add('selected', `selected-green`);
      }
    }

    

  }

  onCellLeave(index) {
    // const character = this.positionedCharacters.find(positionedCharacter => positionedCharacter.position == index);
    // if (character) {
    //   this.gamePlay.setCursor(cursors.auto);
    // }

    // TODO: react to mouse leave
  }
}

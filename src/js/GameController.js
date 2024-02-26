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

    // Формирование команд
    this.playerTeam = generateTeam(this.gamePlay.playerTypes, this.gamePlay.maxLevel, this.gamePlay.charInTeam, 'player');
    this.computerTeam = generateTeam(this.gamePlay.computerTypes, this.gamePlay.maxLevel, this.gamePlay.charInTeam, 'computer');

    // Формирование массивов персонажей расположенных на игровом поле
    this.playerArray = this.playerTeam.getPositionedCharacters(this.gamePlay.boardSize, this.gamePlay.charInTeam);
    this.computerArray = this.computerTeam.getPositionedCharacters(this.gamePlay.boardSize, this.gamePlay.charInTeam);
    this.positionedCharacters = this.playerArray.concat(this.computerArray)

    // Отрисовка поля
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
    })
    } else {
      GamePlay.showError('Невозможно выбрать эту ячейку');
    }
  }

  onCellEnter(index) {
    this.gamePlay.setCursor(cursors.auto);

    if (this.activeCharacter) {
      if (this.stateSameCharacter(index)) {}
      if (this.stateSameTeamCharacter(index)) {
        this.gamePlay.setCursor(cursors.pointer)
      }
      if (this.stateOppositeTeamCharacter(index)) {
        this.gamePlay.setCursor(cursors.notallowed);
      }
      if (this.stateAvailableAttack(index)) {
        this.gamePlay.cells[index].classList.add('selected', `selected-red`);
        this.gamePlay.setCursor(cursors.crosshair);
      }
      if (this.stateAvailableMove(index)) {
        this.gamePlay.cells[index].classList.add('selected', `selected-green`);
      }
    } else {
      const character = this.positionedCharacters.find(positionedCharacter => positionedCharacter.position == index);
      if (character) {
        const char = character.character;
        this.gamePlay.showCellTooltip(`\u{1F396}${char.level} \u{2694}${char.attack} \u{1F6E1}${char.defence} \u{2764}${char.health} `,index)
      }
    }
  }


  onCellLeave(index) {
    if (this.activeCharacter) {
      if ((this.stateAvailableAttack(index) || this.stateAvailableMove(index)) && this.activeCharacter.position != index) {
        this.gamePlay.deselectCell(index)
      }
    }

    // TODO: react to mouse leave
  }

  stateSameCharacter(index) {
    return this.activeCharacter.position == index;
  }

  stateSameTeamCharacter(index) {
    return (this.playerArray.find(positionedCharacter => positionedCharacter.position == index) &&
    this.playerArray.find(positionedCharacter => positionedCharacter.position == this.activeCharacter.position)) || 
    (this.computerArray.find(positionedCharacter => positionedCharacter.position == index) &&
    this.computerArray.find(positionedCharacter => positionedCharacter.position == this.activeCharacter.position))
  }
  

  stateOppositeTeamCharacter(index) {
    return (this.playerArray.find(positionedCharacter => positionedCharacter.position == index) &&
    this.computerArray.find(positionedCharacter => positionedCharacter.position == this.activeCharacter.position)) || 
    (this.computerArray.find(positionedCharacter => positionedCharacter.position == index) &&
    this.playerArray.find(positionedCharacter => positionedCharacter.position == this.activeCharacter.position))
  }
  

  stateAvailableAttack(index) {
    return this.stateOppositeTeamCharacter(index) &&
    this.activeCharacter.character.getAttackArea(this.activeCharacter.position, this.gamePlay.boardSize).includes(index)
  }

  stateAvailableMove(index) {
    return (this.activeCharacter.character.getMoveArea(this.activeCharacter.position, this.gamePlay.boardSize).includes(index) &&
    !(this.positionedCharacters.find(positionedCharacter => positionedCharacter.position == index)))
  }



}
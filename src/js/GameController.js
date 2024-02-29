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

    this.gameState = new GameState();
    this.activeCharacter = {};


    // Формирование команд
    this.playerTeam = generateTeam(this.gamePlay.playerTypes, this.gamePlay.maxLevel, this.gamePlay.charInTeam, 'player');
    this.computerTeam = generateTeam(this.gamePlay.computerTypes, this.gamePlay.maxLevel, this.gamePlay.charInTeam, 'computer');

    // Формирование массивов персонажей расположенных на игровом поле
    this.playerArray = this.playerTeam.getPositionedCharacters(this.gamePlay.boardSize, this.gamePlay.charInTeam);
    this.computerArray = this.computerTeam.getPositionedCharacters(this.gamePlay.boardSize, this.gamePlay.charInTeam);
    this.positionedCharacters = this.playerArray.concat(this.computerArray)

    // Отрисовка поля
    this.gamePlay.redrawPositions(this.positionedCharacters);


    
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));

    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));

    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    if (this.activeCharacter.position) {
      if (this.stateAvailableMove(this.activeCharacter, index)) {
        if (this.gameState.next.player) {
          this.moveCharacter(this.playerArray,index);
          this.computerMove();
        } 
        // else {
        //   this.moveCharacter(this.computerArray,index);
        // }
        return null
      }
      if (this.stateAvailableAttack(this.activeCharacter, index)) {
        if ((this.gameState.next.player)) {
          this.attackCharacter(this.computerArray,index);
          this.computerMove();
        } 
        // else {
        //   this.attackCharacter(this.playerArray,index);
        // }
        return null;
      }

    }
    if (this.gameState.next.player === true) {
      this.selectCharacter(this.playerArray, index);
    } 
    // else {
    //   this.selectCharacter(this.computerArray, index)
    // }
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

    if (this.activeCharacter.position) {
      if (this.stateSameCharacter(index)) {}
      if (this.stateSameTeamCharacter(index)) {
        this.gamePlay.setCursor(cursors.pointer)
      }
      if (this.stateOppositeTeamCharacter(index)) {
        this.gamePlay.setCursor(cursors.notallowed);
      }
      if (this.stateAvailableAttack(this.activeCharacter, index)) {
        this.gamePlay.cells[index].classList.add('selected', `selected-red`);
        this.gamePlay.setCursor(cursors.crosshair);
      }
      if (this.stateAvailableMove(this.activeCharacter, index)) {
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
    if (this.activeCharacter.position) {
      if ((this.stateAvailableAttack(this.activeCharacter, index) ||
      this.stateAvailableMove(this.activeCharacter, index)) &&
      this.activeCharacter.position != index) {
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
  

  stateAvailableAttack(character, index) {
    return this.stateOppositeTeamCharacter(index) &&
    character.character.getAttackArea(character.position, this.gamePlay.boardSize).includes(index)
  }
r
  stateAvailableMove(character, index) {
    return (character.character.getMoveArea(character.position, this.gamePlay.boardSize).includes(index) &&
    !(this.positionedCharacters.find(positionedCharacter => positionedCharacter.position == index)))
  }

  moveCharacter(teamArray, index) {
    this.gamePlay.deselectCell(this.activeCharacter.position);
    teamArray.forEach((charPos) => {
      if (charPos.position == this.activeCharacter.position) {
        charPos.position = index;
      }
    })
    this.changePlayer(index);
  }

  attackCharacter(teamArray, index) {
    this.gamePlay.deselectCell(this.activeCharacter.position);
    const attacker = this.activeCharacter.character;
    const target = teamArray.find(positionedCharacter => positionedCharacter.position == index).character;
    const damage = Math.max(attacker.attack - target.defence, attacker.attack * 0.1);
    const promise1 = this.gamePlay.showDamage(index,damage);
    promise1.then(() => {
      target.health -= damage;
      this.changePlayer(index);
    });
  }

  changePlayer(index) {
    this.gamePlay.deselectCell(index);
    this.activeCharacter = {};
    this.gamePlay.redrawPositions(this.positionedCharacters);
    this.gameState.change();
  }

  computerMove() {
    this.computerArray.forEach((computerCharacter) => {
      this.playerArray.forEach((playerCharacter) => {
        if (this.stateAvailableAttack(computerCharacter,playerCharacter.position)) {
          this.activeCharacter = computerCharacter;
          this.attackCharacter(this.playerArray, playerCharacter.position)
          return null
        } 
      })
    })
    this.computerArray.forEach((computerCharacter) => {
      if (this.stateAvailableMove(computerCharacter, computerCharacter.position-1)) {
        this.moveCharacter(this.computerArray,computerCharacter.position-1)
        return null
      }
    })


  }
      
}



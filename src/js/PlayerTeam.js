 import Team from "./Team";

 export default class PlayerTeam extends Team {
    constructor(characters) {
        super(characters)
    }

    getAvailable(boardSize) {
        const positions = [];
        const n = boardSize;
        for (let i = 0; i < n * n; i += 1) {
            if ( i%n < 2 ) {
                positions.push(i);
            }
        }
        return positions
        };
    
}
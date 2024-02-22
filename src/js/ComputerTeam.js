import Team from "./Team";

export default class ComputerTeam extends Team {
   constructor(characters) {
       super(characters)
   }

   getAvailable(boardSize) {
       const positions = [];
       const n = boardSize;
       for (let i = 0; i < n * n; i += 1) {
           if ( (i%n == n-1) || (i%n == n-1) ) {
            positions.push(i);
           }
       }
       return positions
       };
}
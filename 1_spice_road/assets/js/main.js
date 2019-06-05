$(document).ready(intializeApp)
var playerOne = new Player;
var playerTwo = new Player;

function intializeApp() {
    Game.createFirstPointCards();
    Game.createFirstMerchantCards();
    playerOne.yellow = 3;
    playerTwo.yellow = 4;
    Game.currentPlayer = playerOne;
    Game.clickHandlers();
}
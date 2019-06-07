$(document).ready(intializeApp)

var newGame;

function intializeApp() {
    newGame = new Game();
    newGame.createFirstPointCards();
    newGame.createFirstMerchantCards();
    newGame.updateVictoryPointCardsDisplay();
    newGame.displayMerchantCardsInHand();
    newGame.clickHandlers();
}
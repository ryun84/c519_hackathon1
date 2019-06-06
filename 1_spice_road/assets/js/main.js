$(document).ready(intializeApp)
    // var playerOne = new Player;
    // var playerTwo = new Player;
var newGame;

function intializeApp() {
    newGame = new Game();
    newGame.createFirstPointCards();
    newGame.createFirstMerchantCards();
    newGame.updateVictoryPointCardsDisplay();
    // playerOne.yellow = 3;
    // playerTwo.yellow = 4;
    // newGame.currentPlayer = playerOne;
    newGame.clickHandlers();
    // TODO: descriptive function name "addClickHandlers"
    // $('.point').click(newGame.clickHandlers);

    // function clickHandlers() {
    //     console.log(playerTwo);

    // }
}


// function clickHandlers() {
//     $('.cardContainer').click(console.log(this));

// }
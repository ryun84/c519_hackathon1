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
    // $('.point').click(newGame.clickHandlers);

    // function clickHandlers() {
    //     console.log(playerTwo);

    // }
    console.log(newGame.pointsCardArray);
    console.log(newGame.merchantCardArray);
}


// function clickHandlers() {
//     $('.cardContainer').click(console.log(this));

// }
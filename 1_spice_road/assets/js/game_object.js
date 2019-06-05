

class Game{
    constructor(){
        this.currentPlayer = null; // will be either playerOne or playerTwo
        this.totalTurns = 0;
    }

    createGameStartCard(){
        var startingCard = $("<civ>").addClass("card").text("3 YELLOW");
        // this is just a static element that will start with 3 yellow spices and be placed into the availableCards(?) array of both players
    }
}
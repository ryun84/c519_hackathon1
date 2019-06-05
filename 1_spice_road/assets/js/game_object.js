

class Game{
    constructor(){
        this.currentPlayer = null; // will be either playerOne or playerTwo
        this.totalTurns = 0;
    }

    initiateGame(){
        var startingYellowSpiceValue = null;
        // will need to add the starting yellow spice values to both players
        $(".yellow").text(startingYellowSpiceValue);

        // will need to call the createGameStartCard function
        createGameStartCard();
    }

    createGameStartCard(){
        var startingCard = $("<civ>").addClass("card").text("3 YELLOW");
        // the above creation is probably not the way we want to do this
        // this is just a static element that will start with 3 yellow spices and be placed into the availableCards(?) array of both players
        // but once this is created, it should still function like any other merchant card and be able to be popped/deleted from players availableCards(?) array and
        // pushed into the discardedCards(?) array (and vice versa after clicking REST), all while updating what is displayed.
    }
}
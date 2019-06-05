class Game {
    constructor() {
        this.currentPlayer = null; // will be either playerOne or playerTwo
        this.totalTurns = 0;
        this.pointsCardArray = [];
        this.merchantCardArray = [];
    }

<<<<<<< HEAD
    initiateGame(){
        var startingYellowSpiceValue = null;
        // will need to add the starting yellow spice values to both players
        $(".yellow").text(startingYellowSpiceValue);

        // will need to call the createGameStartCard function
        createGameStartCard();
    }

    createGameStartCard(){
=======
    createGameStartCard() {
>>>>>>> dca12d8ba17c8619e5a4c8ea52491bcb0b4a97b3
        var startingCard = $("<civ>").addClass("card").text("3 YELLOW");
        // the above creation is probably not the way we want to do this
        // this is just a static element that will start with 3 yellow spices and be placed into the availableCards(?) array of both players
        // but once this is created, it should still function like any other merchant card and be able to be popped/deleted from players availableCards(?) array and
        // pushed into the discardedCards(?) array (and vice versa after clicking REST), all while updating what is displayed.
    }

    createFirstPointCards() {
        for (var i = 0; i < 5; i++) {
            this.generatePointCards();
        }
    }

    createFirstMerchantCards() {
        for (var i = 0; i < 6; i++) {
            MerchantCard.createMerchantCard();
        }

    }

    generatePointCards() {
        var pointsValue = Math.floor(Math.random() * 20) - 6;
        this.pointsCardArray.push(pointsValue);

    }
}
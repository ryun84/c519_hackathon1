class Game {
    constructor() {
        this.currentPlayer = null; // will be either playerOne or playerTwo
        this.totalTurns = 0;
        this.pointsCardArray = [];
        this.merchantCardArray = [];
        this.pointClickHandler = this.pointClickHandler.bind(this); //going to contain individual numbers alongside arrays with 2 values so we will need to search for arrays and display the values inside the array.
    }

    clickHandlers() {
        $('.points').click(pointClickHandler);

    }

    createGameStartCard() {
        var startingCard = $("<civ>").addClass("card").text("3 YELLOW");
        // this is just a static element that will start with 3 yellow spices and be placed into the availableCards(?) array of both players
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

    pointClickHandler(event) {

    }
}
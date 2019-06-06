class Game {
    constructor() {
        this.playerOne = new Player();
        this.playerTwo = new Player();
        this.playerOne.yellow = 3;
        this.playerTwo.yellow = 4;
        this.currentPlayer = this.playerOne;
        this.totalTurns = 0;
        this.pointsCardArray = [];
        this.merchantCardArray = [];
        this.pointClickHandler = this.pointClickHandler.bind(this); //going to contain individual numbers alongside arrays with 2 values so we will need to search for arrays and display the values inside the array.
    }

    clickHandlers() {
        $('.points').click(this.pointClickHandler);
        $('.merchant').click(this.currentPlayer.merchantClickHandler);

    }

    createGameStartCard() {
        var startingCard = {
            // properties of however many yellow spices we want the players to start with
        }
        var startingCardDivIndex = $("*[data-index='0']");
        // this is selecting the first div in the availableCards container div
        // once the above div is selected, we will have to pass in value from startingCard
        // this card should still function like any other merchant card and be able to be popped/deleted from players availableCards(?) array and...
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

    pointClickHandler(event) {
        var pointIndex = $(event.currentTarget).attr('data-index');
        debugger;
        console.log(pointIndex);
        if (this.currentPlayer.yellow > 0) {
            this.currentPlayer.yellow -= 1;
            this.currentPlayer.victoryPoints += this.pointsCardArray[pointIndex];
            console.log(this.pointsCardArray[pointIndex])
            this.currentPlayer.pointCardCount += 1;
            this.pointsCardArray.splice(pointIndex, 1, Math.floor(Math.random() * 20) - 6);
        } else {
            alert("You do not have enough yellow spice to make this move");
        }
    }
}
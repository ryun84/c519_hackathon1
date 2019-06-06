class Player {
    constructor() {
        this.yellow = 0;
        this.red = 0;
        this.green = 0;
        this.brown = 0;
        this.victoryPoints = 0;
        this.pointCardCount = 0;
        this.merchantCardsInHand = [];
        this.merchantCardsInDiscard = [];
    }


    receiveVictoryPoints() {
        //this.victoryPoints += (victory card object point value);
        this.updateVictoryPointsDisplay();
    }

    updateVictoryPointsDisplay() {
        if (Game.currentPlayer === "playerOne") {
            $('.totalPoints1').text(this.victoryPoints);
        } else {
            $('.totalPoints2').text(this.victoryPoints);
        }
    }

    receiveSpices(yellow, red, green, brown) {
        // this.yellow += (merchant card object point value);
        // this.red += (merchant card object point value); 
        // this.green += (merchant card object point value); 
        // this.brown += (merchant card object point value); 
        this.updateSpicePointsDisplay();
    }

    spendSpices(yellow, red, green, brown){
        // this.yellow -= (merchant card object point value);
        // this.red -= (merchant card object point value); 
        // this.green -= (merchant card object point value); 
        // this.brown -= (merchant card object point value);
        this.updateSpicePointsDisplay();
    }

    spiceTransaction(){
        if( Array.isArray(merch))
    }

    updateSpicePointsDisplay() {
        if (Game.currentPlayer === "playerOne") {
            $('.playerOne.yellow').text(this.yellow);
            $('.playerOne.green').text(this.green);
            $('.playerOne.red').text(this.red);
            $('.playerOne.brown').text(this.brown);
        } else {
            $('.playerTwo.yellow').text(this.yellow);
            $('.playerTwo.green').text(this.green);
            $('.playerTwo.red').text(this.red);
            $('.playerTwo.brown').text(this.brown);
        }
    }

    merchantClickHandler(event) {
        var merchantIndex = $(event.currentTarget).attr('data-index');
        var merchantCardValue = Game.merchantCardArray[ merchantIndex ];
        if( Array.isArray( merchantCardValue ) ) {
            // push merchantCardValue to array merchantCardsInHand
        } else {

        }
    }

    receiveCard() {}



    rest() {}





}
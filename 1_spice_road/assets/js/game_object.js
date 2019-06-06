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
        this.endTurn = this.endTurn.bind(this);
        this.turnsLeft = 0;
        this.winCondition = 5;
        // this.getMerchantToHand = this.getMerchantToHand.bind(this);
    }

    clickHandlers() {
        $('.points').click(this.pointClickHandler);
        // $('.merchant').click(this.currentPlayer.merchantClickHandler);
        $('.merchant').click(this.getMerchantToHand);
        $('.discardArea').click(this.endTurn);

    }

    // merchant info transfer in work - DL
    // getMerchantToHand(event) {
    //     debugger;
    //     var merchIndex = parseFloat($(event.currentTarget).attr('data-index'));
    //     var merchCardInfo = this.merchantCardArray[merchIndex];
    //     this.currentPlayer.merchantCardsInHand.push(merchCardInfo);
    //     this.displayMerchantCardsInHand();    
    // }

    // displayMerchantCardsInHand() {
    //     for( var counter = 0; counter < 5; counter++ ){
    //         var merchantHandArray = this.currentPlayer.merchantCardsInHand[counter];
    //         if( Array.isArray( merchantHandArray ) ){
    //             $(".playerMerchant [data-index='" + counter + "']").html("Trade " + merchantHandArray[0] + "<br/> for " + merchantHandArray[1] );
    //         } else {
    //             $(".playerMerchant [data-index='" + counter + "']").text("Receive " + merchantHandArray );
    //         }
    //     }
    // }

    endTurn() {
        if (this.currentPlayer === this.playerOne) {
            this.currentPlayer = this.playerTwo;
        } else {
            this.currentPlayer = this.playerOne;
        }
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
            this.createMerchantCard();
        }
    }

    generatePointCards() {
        var pointsValue = Math.floor(Math.random() * 20) + 6;
        this.pointsCardArray.push(pointsValue);

    }

    pointClickHandler(event) {
        var pointIndex = $(event.currentTarget).attr('data-index');
        if (this.currentPlayer.yellow > 0) {
            this.currentPlayer.yellow -= 1;
            this.currentPlayer.victoryPoints += this.pointsCardArray[pointIndex];
            this.currentPlayer.pointCardCount += 1;
            this.pointsCardArray.splice(pointIndex, 1, Math.floor(Math.random() * 20) + 6);

            this.updateVictoryPointsDisplay();
            this.updateVictoryPointCardsDisplay();
        } else {
            alert("You do not have enough yellow spice to make this move");
        }
    }

    updateVictoryPointsDisplay() {
        var victoryValue = parseFloat(this.playerOne.victoryPoints);
        if (this.currentPlayer === this.playerOne) {
            $('.cardCount.playerOne').text(this.playerOne.pointCardCount);
            $('.victoryPoints.playerOne').text(victoryValue);
            this.checkWinCondition();
        } else {
            $('.victoryPoints.playerTwo').text(this.playerTwo.victoryPoints);
            $('.cardCount.playerTwo').text(this.playerTwo.pointCardCount);
            this.checkWinCondition();
        }
    }

    updateVictoryPointCardsDisplay() {
        $("#zeroIndex").html("Victory Points: <br/> " + this.pointsCardArray[0]);
        $("#oneIndex").html("Victory Points: <br/>" + this.pointsCardArray[1]);
        $("#twoIndex").html("Victory Points: <br/>" + this.pointsCardArray[2]);
        $("#threeIndex").html("Victory Points: <br/>" + this.pointsCardArray[3]);
        $("#fourIndex").html("Victory Points: <br/>" + this.pointsCardArray[4]);


    }

    createMerchantCard() {
        var rNG = Math.ceil(Math.random() * 2);
        if (rNG === 1) {
            var gatherCard = this.createMerchantGatherCard();
            this.merchantCardArray.push(gatherCard);
        } else {
            var tradeCard = this.createMerchantTradeCard();
            this.merchantCardArray.push(tradeCard);
        }
        this.displayMerchantCardInfo();
    }

    checkWinCondition() {
        if (this.playerOne.pointCardCount === 5 || this.playerTwo.pointCardCount === 5) {

            if (this.turnsLeft === 1) {

                if (this.playerOne.victoryPoints > this.playerTwo.victoryPoints) {
                    this.updateVictoryPointCardsDisplay();
                    this.playerOneWins();
                } else {
                    updateVictoryPointCardsDisplay();
                    this.playerTwoWins();
                }
            }
            if (this.currentPlayer === this.playerOne) {
                this.currentPlayer = this.playerTwo;
                this.turnsLeft = 1;
            } else {
                this.currentPlayer = this.playerOne;
                this.turnsLeft = 1;
            }
        }

    }
    playerOneWins() {
        alert("Player One wins with " + this.playerOne.victoryPoints + " vs Player Two with " + this.playerTwo.victoryPoints)
    }
    playerTwoWins() {
        alert("Player Two wins with " + this.playerTwo.victoryPoints + " vs Player One with " + this.playerOne.victoryPoints)
    }

    createMerchantGatherCard() {
        var spiceValue = Math.floor(Math.random() * 4) + 2;
        return spiceValue;
    }

    createMerchantTradeCard() {
        var topValue = Math.floor(Math.random() * 5) + 2;
        var bottomValue = Math.floor(Math.random() * 5) + 2;
        var tradeCard = [];
        tradeCard.push(topValue);
        tradeCard.push(bottomValue);
        return tradeCard;
    }

    displayMerchantCardInfo() {
        for (var counter = 0; counter < 6; counter++) {
            var merchantInnerArray = this.merchantCardArray[counter];
            if (Array.isArray(merchantInnerArray)) {
                $(".merchantCardRowDiv [data-index='" + counter + "']").html("Trade " + merchantInnerArray[0] + "<br/> for " + merchantInnerArray[1]);
            } else {
                $(".merchantCardRowDiv [data-index='" + counter + "']").text("Receive " + merchantInnerArray);
            }
        }

    }
}
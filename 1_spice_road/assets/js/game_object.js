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
        this.playerOne.merchantCardsInHand.push(3);
        this.playerTwo.merchantCardsInHand.push(3)
        this.pointClickHandler = this.pointClickHandler.bind(this); //going to contain individual numbers alongside arrays with 2 values so we will need to search for arrays and display the values inside the array.
        this.endTurn = this.endTurn.bind(this);
        this.firstTurn = true;
        this.winCondition = 5;
        this.turnsLeft = 0;
        this.getMerchantToHand = this.getMerchantToHand.bind(this);
        this.disableClick = false;
        // this.getMerchantToHand = this.getMerchantToHand.bind(this);
    }

    clickHandlers() {
        $('.points').click(this.pointClickHandler);
        $('.merchant').click(this.currentPlayer.merchantClickHandler);
        $('.merchant').click(this.getMerchantToHand);
        $('.discardArea').click(this.endTurn);
    }

    getMerchantToHand(event) {
        if (this.disableClick === true) {
            return;
        }
        if (this.currentPlayer.merchantCardsInHand.length === 5) {
            return;
        }
        var merchIndex = parseFloat($(event.currentTarget).attr('data-index'));
        var merchCardInfo = this.merchantCardArray[merchIndex];
        this.currentPlayer.merchantCardsInHand.push(merchCardInfo);
        var newMerchCard;
        var rNG = Math.ceil(Math.random() * 2);
        if (rNG === 1) {
            var newMerchCard = this.createMerchantGatherCard();
        } else {
            var newMerchCard = this.createMerchantTradeCard();
        }

        this.merchantCardArray.splice(merchIndex, 1, newMerchCard);
        this.displayMerchantCardsInHand();
        this.displayMerchantCardInfo();
        this.disableClick = true;
        setTimeout(this.endTurn, 3000);
    }

    displayMerchantCardsInHand() {
        var merchantHandArray = this.currentPlayer.merchantCardsInHand;
        $(".availableCardsRowDiv [data-index='" + 0 + "']").text("Receive " + merchantHandArray[merchIndex]);
        for (var merchIndex = 0; merchIndex <= this.currentPlayer.merchantCardsInHand.length - 1; merchIndex++) {
            if (Array.isArray(merchantHandArray[merchIndex])) {
                $(".availableCardsRowDiv [data-index='" + merchIndex + "']").html("Trade " + merchantHandArray[merchIndex][0] + "<br/> for " + merchantHandArray[merchIndex][1]);
            } else {
                $(".availableCardsRowDiv [data-index='" + merchIndex + "']").text("Receive " + merchantHandArray[merchIndex]);
            }
        }
    }

    endTurn() {
        var currentPlayerTitle;
        if (this.currentPlayer === this.playerOne) {
            this.disableClick = false;
            this.currentPlayer = this.playerTwo;
            currentPlayerTitle = "Player Two";
            $('#playerMerchantCardsInHandNameDisplay').text(currentPlayerTitle + " Hand");
            if (this.firstTurn === true) {
                $('.resetTurnOne').text(' ');
                this.firstTurn = false;
            }
            this.displayMerchantCardsInHand();
        } else {
            this.disableClick = false;
            this.currentPlayer = this.playerOne;
            currentPlayerTitle = "Player One";
            $('#playerMerchantCardsInHandNameDisplay').text(currentPlayerTitle + " Hand");
            this.displayMerchantCardsInHand();
        }
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
        if (this.disableClick === true) {
            return;
        }
        var pointIndex = $(event.currentTarget).attr('data-index');
        if (this.currentPlayer.yellow > 0) {
            this.currentPlayer.yellow -= 1;
            this.currentPlayer.victoryPoints += this.pointsCardArray[pointIndex];
            this.currentPlayer.pointCardCount += 1;
            this.pointsCardArray.splice(pointIndex, 1, Math.floor(Math.random() * 20) + 6);

            this.updateVictoryPointsDisplay();
            this.updateVictoryPointCardsDisplay();
            this.disableClick = true;
            setTimeout(this.endTurn, 3000);
        } else {
            alert("You do not have enough yellow spice to make this move");
        }
    }

    updateVictoryPointsDisplay() {
        if (this.currentPlayer === this.playerOne) {
            $('.cardCount.playerOne').html("Victory Card Count <br/>" + this.playerOne.pointCardCount);
            $('.victoryPoints.playerOne').html("Victory Points <br/>" + this.playerOne.victoryPoints);
            this.checkWinCondition();
        } else {
            $('.victoryPoints.playerTwo').html("Victory Points <br/>" + this.playerTwo.victoryPoints);
            $('.cardCount.playerTwo').html("Victory Card Count <br/>" + this.playerTwo.pointCardCount);
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
                    return;
                } else {
                    updateVictoryPointCardsDisplay();
                    this.playerTwoWins();
                    return;
                }
            }
            if (this.currentPlayer === this.playerOne) {
                this.currentPlayer = this.playerTwo;
                alert("Player Two has one turn left to outspice Player One");
                this.turnsLeft = 1;
            } else {
                this.currentPlayer = this.playerOne;
                alert("Player One has one turn left to outspice Player Two");
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
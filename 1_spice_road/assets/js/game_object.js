class Game {
    constructor() {
        this.getMerchantToHand = this.getMerchantToHand.bind(this);
        this.pointClickHandler = this.pointClickHandler.bind(this); //going to contain individual numbers alongside arrays with 2 values so we will need to search for arrays and display the values inside the array.
        this.endTurn = this.endTurn.bind(this);
        this.merchantClickHandler = this.merchantClickHandler.bind(this);
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
        this.firstTurn = true;
        this.winCondition = 5;
        this.turnsLeft = 0;
        this.disableClick = false;
    }

    clickHandlers() {
        $('.points').click(this.pointClickHandler);
        $('.playerMerchant').click(this.merchantClickHandler);
        $('.merchant').click(this.getMerchantToHand);
        $('.discardArea').click(this.endTurn);
    }

    showGameMessageModal( message ){
        $(".modal-body-message").text(message);
        $("#gameMessageModal").modal("show");
    }

    generateRandomNumber( min, max ){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getMerchantToHand(event) {
        if (this.disableClick === true || this.currentPlayer.merchantCardsInHand.length === 5) {
            return;
        }
        var merchIndex = parseFloat($(event.currentTarget).attr('data-index'));
        var merchCardInfo = this.merchantCardArray[merchIndex];
        this.currentPlayer.merchantCardsInHand.push(merchCardInfo);
        var newMerchCard;
        var randomNumber = this.generateRandomNumber(1,2);
        if (randomNumber === 1) {
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
            this.clearPlayerCardsFromDisplay();
            this.displayMerchantCardsInHand();
            currentPlayerTitle = "Player Two";
            $('#playerMerchantCardsInHandNameDisplay').text(currentPlayerTitle + " Hand");
            if (this.firstTurn === true) {
                $('.resetTurnOne').text(' ');
                this.firstTurn = false;
            }
        } else {
            this.disableClick = false;
            this.clearPlayerCardsFromDisplay();
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
        var pointsValue = this.generateRandomNumber(6,25);
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
            this.pointsCardArray.splice(pointIndex, 1, this.generateRandomNumber(6,25));
            this.updateVictoryPointsDisplay();
            this.updateVictoryPointCardsDisplay();
            this.updateSpiceCountDisplay();
            this.disableClick = true;
            if (this.turnsLeft === 0) {
                setTimeout(this.endTurn, 3000);
            }
        } else {
            this.showGameMessageModal("You do not have enough yellow spice to make this move!");
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
        $("#zeroIndex").html("Victory Points<br/> " + this.pointsCardArray[0]);
        $("#oneIndex").html("Victory Points<br/>" + this.pointsCardArray[1]);
        $("#twoIndex").html("Victory Points<br/>" + this.pointsCardArray[2]);
        $("#threeIndex").html("Victory Points<br/>" + this.pointsCardArray[3]);
        $("#fourIndex").html("Victory Points<br/>" + this.pointsCardArray[4]);
    }

    clearPlayerCardsFromDisplay() {
        for (var currentPlayerIndex = 5; currentPlayerIndex >= this.currentPlayer.merchantCardsInHand.length; currentPlayerIndex--) {
            if (this.currentPlayer.merchantCardsInHand[currentPlayerIndex] == undefined) {
                $(".availableCardsRowDiv [data-index='" + currentPlayerIndex + "']").text(" ");
            }
        }



    }

    createMerchantCard() {
        var randomNumber = this.generateRandomNumber(1,2);
        if (randomNumber === 1) {
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
                    this.showGameMessageModal("Player One wins with " + this.playerOne.victoryPoints + " vs Player Two with " + this.playerTwo.victoryPoints + "!");
                    return;
                } else {
                    updateVictoryPointCardsDisplay();
                    this.showGameMessageModal("Player Two wins with " + this.playerTwo.victoryPoints + " vs Player One with " + this.playerOne.victoryPoints + "!");
                    return;
                }
            }
            if (this.currentPlayer === this.playerOne) {
                this.showGameMessageModal("Player Two has one turn left to outspice Player One!");
                this.turnsLeft = 1;
                setTimeout(this.endTurn, 3000);
            } else {
                this.showGameMessageModal("Player One has one turn left to outspice Player Two!");
                this.turnsLeft = 1;
                setTimeout(this.endTurn, 3000);
            }
        }
    }

    createMerchantGatherCard() {
        var spiceValue = this.generateRandomNumber(2,5);
        return spiceValue;
    }

    createMerchantTradeCard() {
        var topValue = this.generateRandomNumber(2,6);
        var bottomValue = this.generateRandomNumber(2,6);
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

    merchantClickHandler(event) {
        if (this.disableClick === true) {
            return;
        }
        var useCardIndex = $(event.currentTarget).attr('data-index');
        var merchCardToUseData = this.currentPlayer.merchantCardsInHand[useCardIndex];
        if (merchCardToUseData == undefined) {
            return;
        }
        if (Array.isArray(merchCardToUseData)) {
            var spiceToDeduct = merchCardToUseData[0];
            var spiceToAdd = merchCardToUseData[1];
            if (spiceToDeduct > this.currentPlayer.yellow) {
                this.showGameMessageModal("You do not have enough resources!");
                return;
            } else {
                this.currentPlayer.yellow -= spiceToDeduct;
                this.currentPlayer.yellow += spiceToAdd;
            }
        } else {
            var spiceToStraightAdd = merchCardToUseData;
            this.currentPlayer.yellow += spiceToStraightAdd;
        }
        this.disableClick = true;
        this.updateSpiceCountDisplay();
        setTimeout(this.endTurn, 3000);
    }

    updateSpiceCountDisplay() {
        if (this.currentPlayer === this.playerOne) {
            $("#p1_sq4").html("Yellow Spices<br/>" + this.playerOne.yellow);
        } else {
            $("#p2_sq4").html("Yellow Spices<br/>" + this.playerTwo.yellow);
        }
    }
}
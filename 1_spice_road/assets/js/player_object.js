class Player {
    constructor(){
        this.yellow = 0;
        this.red = 0;
        this.green = 0;
        this.brown = 0;
        this.victoryPoints = 0;
        this.pointCardCount = 0;
        this.merchantCardsInHand = [];
        this.merchantCardsInDiscard = [];
    }


    receiveVictoryPoints(){
        //this.victoryPoints += (victory card object point value);
        this.updateVictoryPointsDisplay();

    }

    updateVictoryPointsDisplay(){
        if(Game.currentPlayer === "playerOne"){
            $('.totalPoints1'+ playerPoint).text(this.victoryPoints);
        }else{
            $('.totalPoints2'+ playerPoint).text(this.victoryPoints);
        }
    }
      

    getresources(){
    }


    receiveCard(){
    }



    rest(){
    }





}
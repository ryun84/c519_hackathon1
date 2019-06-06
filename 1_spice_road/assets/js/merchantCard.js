class MerchantCard {
    constructor() {

    }

    createMerchantCard() {
        var rNG = Math.floor(Math.random() * 2);
        if (rNG === 1) {
            Game.merchantCardArray.push(createMerchantGatherCard);
        } else if (rNG === 2) {
            Game.merchantCardArray.push(createMerchantTradeCard);
        }
        //generates a randon number (either 1 or 2), depending on what number it is, creates either a Merchant gather card
        // or a merchant trade card, and pushes it into the Game.merchantCardArray;
        // if it is a trade Card, it is assigned 2 values, a top value and a bottom value, which are pushed into their own array and pushed into
        // the game.merchant card array.




    }

    createMerchantGatherCard() {
        var spiceValue = Math.floor(Math.random() * 4) - 2;
        return spiceValue;


    }

    createMerchantTradeCard() {
        var topValue = Math.floor(Math.random() * 5) - 2;
        var bottomValue = Math.floor(Math.random() * 5) - 2;
        var tradeCard = [];
        tradeCard.push(topValue);
        tradeCard.push(bottomValue);
        return tradeCard;
    }


}
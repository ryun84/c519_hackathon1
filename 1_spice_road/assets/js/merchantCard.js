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
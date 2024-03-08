// Function to calculate the percentage difference
async function calculatePercentageDifference(compareAtPrice, price) {
    const discountPercentage = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(discountPercentage);
}

// Function to determine the sale tag
async function determineSaleTagValue(percentageDifference) {
    if (percentageDifference >= 0 && percentageDifference <= 8) {
        return "5";
    } else if (percentageDifference >= 9 && percentageDifference <= 13) {
        return "10";
    } else if (percentageDifference >= 14 && percentageDifference <= 18) {
        return "15";
    } else if (percentageDifference >= 19 && percentageDifference <= 23) {
        return "20";
    } else if (percentageDifference >= 24 && percentageDifference <= 28) {
        return "25";
    } else if (percentageDifference >= 29 && percentageDifference <= 33) {
        return "30";
    } else if (percentageDifference >= 34 && percentageDifference <= 38) {
        return "35";
    } else if (percentageDifference >= 39 && percentageDifference <= 43) {
        return "40";
    } else if (percentageDifference >= 44 && percentageDifference <= 48) {
        return "45";
    } else if (percentageDifference >= 49 && percentageDifference <= 53) {
        return "50";
    } else if (percentageDifference >= 54 && percentageDifference <= 58) {
        return "55";
    } else if (percentageDifference >= 59 && percentageDifference <= 63) {
        return "60";
    } else if (percentageDifference >= 64 && percentageDifference <= 68) {
        return "65";
    } else if (percentageDifference >= 69 && percentageDifference <= 73) {
        return "70";
    } else if (percentageDifference >= 74 && percentageDifference <= 78) {
        return "75";
    } else if (percentageDifference >= 79 && percentageDifference <= 83) {
        return "80";
    } else if (percentageDifference >= 84 && percentageDifference <= 88) {
        return "85";
    } else if (percentageDifference >= 89 && percentageDifference <= 93) {
        return "90";
    } else if (percentageDifference >= 94 && percentageDifference <= 98) {
        return "95";
    } else if (percentageDifference >= 99 && percentageDifference <= 100) {
        return "100";
    } else {
        return null;
    }
}

// Function to determine lowestDiscountValue from all variants
async function determineLowestDiscountValue(lowestDiscountValue, saleTag) {
    let smallestNum;
    lowestDiscountValue.push(parseInt(saleTag));
    if (lowestDiscountValue.length > 0) {
        smallestNum = Math.min(...lowestDiscountValue);
    } else {
        smallestNum = null;
    }
    return smallestNum;
}

module.exports = {
    calculatePercentageDifference,
    determineSaleTagValue,
    determineLowestDiscountValue
};

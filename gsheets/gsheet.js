const GSheetReader = require("g-sheets-api");

const { google } = require("googleapis");

async function pullSheetsData() {
    const sheetId = "1F6BvjBRKMf6cVTzrb3O-4uORjnhHN0I6DC9jkuxQibo";
    const auth = process.env.API_KEY;
    const sheets = google.sheets({ version: "v4", auth });
    const options = {
        spreadsheetId: sheetId,
        ranges: ["IPHONES!A1:J66", "IPHONES!L1:U66"],
    };
    return await sheets.spreadsheets.values.batchGet(options);
}

function parseSheetsData(data) {
    let [buyRequest, sellRequest] = data.valueRanges;
    let brRows = buyRequest.values;
    let srRows = sellRequest.values;
    var phoneNameRowIndexes = [
        2, 7, 12, 17, 21, 25, 29, 34, 39, 45, 51, 56, 61,
    ];

    var buyRequests = parseRequests(phoneNameRowIndexes, brRows);
    var sellRequests = parseRequests(phoneNameRowIndexes, srRows);
    return { buyRequests, sellRequests };
}

function parseRequests(phoneNameRowIndexes, requestsRows) {
    var res = [];
    phoneNameRowIndexes.forEach((item, index) => {
        let nextPhoneRowIndex = phoneNameRowIndexes[index + 1];
        let firstPriceRow = item + 2;
        for (let i = firstPriceRow; i < nextPhoneRowIndex; ++i) {
            var priceRow = requestsRows[i];
            var storageSize = priceRow[1];
            priceRow.slice(2).forEach((cell, ii) => {
                var obj = {};
                obj.storageSize = storageSize;
                obj.name = requestsRows[item][0];
                obj.price = cell;
                obj.condition = requestsRows[item+1].slice(2)[ii];
                res.push(obj);
            });
        }
    });
    return res;
}

module.exports = { pullSheetsData, parseSheetsData };

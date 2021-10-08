const GSheetReader = require("g-sheets-api");

const { google } = require("googleapis");

async function GetSheetData() {
    const sheetId = "1F6BvjBRKMf6cVTzrb3O-4uORjnhHN0I6DC9jkuxQibo";

    const apiKey = process.env.API_KEY;
    const options = {
        apiKey,
        sheetId,
        sheetNumber: 1,
        sheetName: "IPHONES",
        returnAllResults: true,
    };
    return await GSheetReader(options, console.log, console.log);
}

async function getSheet() {
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
    // var ignore = [0, 1]
    // name: 
    // condition:
    // storage_size:
    // price: 
    // }
    var phoneNames = [];
    var conditions = [];
    var priceValues = [];

    const whatDeterminesPrice = ["Storage Size", "New", "A1", 'A2', 'B1', 'B2', 'C', 'C/B', 'C/D'] 
    var phoneNameRows = [2, 7, 12, 17, 21, 25, 29, 34, 39, 45, 51, 56, 61];
    var conditionRows = phoneNameRows.map( item => ++item)

    for (let i of phoneNameRows) {
        phoneNames.push(brRows[i]);
    }

    for (let i of conditionRows) {
        if (whatDeterminesPrice.includes(brRows[i])) {
            conditions.push(brRows[i])
        }
    }

    phoneNameRows.forEach((item, index) => {
        let nextPhoneRow = phoneNameRows[index+1]
        for (let i = item+2; i < nextPhoneRow; ++i) {
            priceValues.push(brRows[i])
        }
    })
    return {phoneNames, conditions, priceValues}
}

module.exports = { GetSheetData, getSheet, parseSheetsData };

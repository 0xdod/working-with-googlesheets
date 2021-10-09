"use strict";

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
    const buyReqRows = data.valueRanges[0].values;
    const sellReqRows = data.valueRanges[1].values;
    const phoneNameRowIndexes = [
        2, 7, 12, 17, 21, 25, 29, 34, 39, 45, 51, 56, 61,
    ];

    const buyRequests = parseRequests(phoneNameRowIndexes, buyReqRows);
    const sellRequests = parseRequests(phoneNameRowIndexes, sellReqRows);
    return { buyRequests, sellRequests };
}

// parseRequests builds an array of objects from the sheets data,
// with each object representing a device with a name, condition, strorage size and price.
// For every row that contains a phone name e.g Iphone XS,
// the conditions and storage size are on the next row.
// The rows after conditions till the next row containing a phone name are the prices.
// Each price is affected by storage size and condition.
function parseRequests(phoneNameRowIndexes, requestsRows) {
    const res = [];
    phoneNameRowIndexes.forEach((pRowIndex, i) => {
        const phoneName = requestsRows[pRowIndex][0];
        const nextPhoneRowIndex = phoneNameRowIndexes[i + 1];
        const firstPriceRow = pRowIndex + 2;
        for (let j = firstPriceRow; j < nextPhoneRowIndex; ++j) {
            const priceRow = requestsRows[j];
            const storageSize = priceRow[1];
            priceRow.slice(2).forEach((price, k) => {
                const obj = {};
                obj.storageSize = storageSize;
                obj.name = phoneName;
                obj.price = price;
                obj.condition = requestsRows[pRowIndex + 1].slice(2)[k];
                res.push(obj);
            });
        }
    });
    return res;
}

async function getDataFromSheets() {
    const { data } = await pullSheetsData();
    return parseSheetsData(data);
}
module.exports = { getDataFromSheets };

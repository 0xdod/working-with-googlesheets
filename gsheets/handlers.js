const { getDataFromSheets } = require("./gsheet");
const { BuyRequest, SellRequest } = require("./models");

async function pullGsheets(req, res) {
    const { buyRequests, sellRequests } = await getDataFromSheets();
    await BuyRequest.insertMany(buyRequests);
    await SellRequest.insertMany(sellRequests);
    return res.json({
        success: true,
        message: "sheets data pulled and inserted to db",
    });
}

async function getRequest(req, res) {
    let request = req.query.r;
    let response = null;

    switch (request.toLowerCase()) {
        case "buy":
            response = await BuyRequest.find();
            break;
        case "sell":
            response = await SellRequest.find();
            break;
        default:
            response = {
                message: "specify a request (buy/sell) in the querystring",
            };
            return;
    }
    return res.json({
        success: true,
        message: `${request}Requests fetched from the database`,
        data: {
            request: `${request}Requests`,
            values: response,
        },
    });
}

module.exports = {
    getRequest,
    pullGsheets,
};

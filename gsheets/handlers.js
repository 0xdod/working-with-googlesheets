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
    let { page, limit } = req.query;
    let response = null;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    switch (request.toLowerCase()) {
        case "buy":
            response = await BuyRequest.find()
                .limit(limit)
                .skip(limit * page)
                .exec();
            break;
        case "sell":
            response = await SellRequest.find()
                .limit(limit)
                .skip(limit * page)
                .exec();
            break;
        default:
            return (response = {
                message: "specify a request (buy/sell) in the url query",
            });
    }

    return res.json({
        success: true,
        message: `${request}Requests fetched from the database`,
        data: {
            page,
            limit,
            request: `${request}Requests`,
            values: response,
        },
    });
}

module.exports = {
    getRequest,
    pullGsheets,
};

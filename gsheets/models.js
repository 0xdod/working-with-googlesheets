const mongoose = require('mongoose')

const requestsSchema = new mongoose.Schema({
    name: String,
    price: String,
    condition: String,
    storageSize: String,
})

exports.BuyRequest = mongoose.model("BuyRequest", requestsSchema)
exports.SellRequest = mongoose.model("SellRequest", requestsSchema)



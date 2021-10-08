const express = require("express")
const {pullSheetsData, parseSheetsData} = require("./gsheets/gsheet")


const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    const {data} = await pullSheetsData();
    
    let d = parseSheetsData(data)
    return res.json(d)
})

module.exports = app


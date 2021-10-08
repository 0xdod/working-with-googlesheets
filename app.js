const express = require("express")
const {getSheet, parseSheetsData} = require("./gsheets/gsheet")


const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    const {data} = await getSheet();
    
    let phonenames = parseSheetsData(data)
    return res.json(phonenames)
})

module.exports = app


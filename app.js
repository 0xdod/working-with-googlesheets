const express = require("express")
const {pullGsheets, getRequest} = require("./gsheets")

const app = express()

app.use(express.json())

app.get('/gsheet', pullGsheets)
app.get('/request', getRequest)

module.exports = app


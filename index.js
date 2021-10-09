const app = require("./app");
const db = require("./db");

require("dotenv/config");

const port = process.env["PORT"] || "3000";
const mongoURI =
    process.env["MONGO_URI"] || "mongodb://localhost:27017/buy-and-sell";

db.connect(mongoURI)
    .then(() => {
        console.log("connected to database successfully");
    })
    .catch(console.log);

app.listen(port, () => {
    console.log("listening on port %s", port);
});

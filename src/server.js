require("dotenv").config();

const app = require("./index");
const connect = require("./configs/db");

const PORT = process.env.PORT || 9900;

app.listen(PORT, async () => {
    console.log("starting");
    await connect();
    console.log("listening to port", PORT);
})
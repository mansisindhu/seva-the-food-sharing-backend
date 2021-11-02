const app = require("./index");

const connect = require("./configs/db");

const PORT = process.env.PORT || 2930;

app.listen(PORT, async () => {
    await connect();
    console.log("listening to port", PORT);
})
const express = require("express")
const cors = require("cors")
const { userRouter } = require("./routes/user.routes")
const { connection } = require("./config/db")

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use("/", userRouter)

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to db")
    }
    catch (err) {
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})
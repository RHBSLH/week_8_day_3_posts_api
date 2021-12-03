const express = require("express")
const bodyParser = require("body-parser")
require("dotenv").config()
const posts = require("./routes/posts")
const users = require("./routes/users")
const mongoose = require("mongoose")

mongoose
  .connect(`mongodb+srv://rehab34:${process.env.MONOGDB_PASSWORD}@cluster0.a0wcv.mongodb.net/testDB`)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch(error => {
    console.log("Error connecting to MongoDB ", error)
  })

// console.log(process.env.MONOGDB_PASSWORD)
const app = express()
app.use(express.json())
app.use("/api/posts", posts)
app.use("/api/auth", users)

app.listen(3000, () => {
  console.log("server is listening on port:" + 3000)
})

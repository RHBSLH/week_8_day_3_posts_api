const express = require("express")
const bodyParser = require("body-parser")
const posts = require("./routes/posts")
const  mongoose  = require("mongoose")

const app = express()
require("dotenv").config()

 mongoose.connect(
    `mongodb+srv://rehab34:${process.env.MONOGDB_PASSWORD}@cluster0.a0wcv.mongodb.net/testDB`
    ) 
    .then(()=>{
console.log("connected to MongoDB")
    })
    .catch(error=>{
        console.log("Error connecting to MongoDB ",error)
    })

// console.log(process.env.MONOGDB_PASSWORD)

app.use(bodyParser.json())
app.use("/api/posts", posts)
app.listen(3000, () => {
  console.log("server is listening on port:" + 3000)
})

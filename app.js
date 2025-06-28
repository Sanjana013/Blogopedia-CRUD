const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const connection = require("./db/db")

connection()

app.use(cors({
    // origin: "http://localhost:5173",
    origin: "*",
    method: ["GET","POST", "PATCH", "PUT", "DELETE"],
    // allowedHeaders: ["content-type", "Application/json"]
    allowedHeaders: ['content-type', 'Authorization']
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
const userRoute = require("./routes/user.routes")
app.use("/user", userRoute)

const articleRoute = require("./routes/article.routes")
app.use("/article", articleRoute)

const commentRoute = require("./routes/comments.routes")
app.use("/comment", commentRoute)

// app.use("/article", require("./routes/article.routes"));


// app.get("/", (req,res)=> {
//     res.send("This is home page")
// })

app.listen(process.env.PORT, ()=>{
    console.log("server is running on port 3000")
})
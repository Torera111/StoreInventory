require('dotenv').config
const express = require("express");
const cookieParser = require('cookie-parser')
const connectDB = require("./config/db")
const sellerRoutes = require("./Routes/SellerRoute")

const app = express();
connectDB();
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/sellers", sellerRoutes)

app.listen(port, () =>{
    console.log(`Server running on http://localhost:${port}`)
})

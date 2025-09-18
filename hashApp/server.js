const express = require('express')
const mongoose = require("mongoose");
const bodyparser = require("body-parser")
const connectDB = require('./config/db');
const userRoutes = require("./route/userRoute")

const app = express();
connectDB();
const port = process.env.PORT

app.use(bodyparser.json())
app.use('/api/user', userRoutes)

app.listen(port, () =>{
    console.log(`Server running on http://localhost:${port}`)
})
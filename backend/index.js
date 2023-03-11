const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

require("dotenv").config()

const app = express()
app.use(cors())

const port = process.env.PORT || 5000

app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    // useCreateIndex : true
})

const connection = mongoose.connection
connection.once("open", () => {
    console.log("MongoDB Atlas database connected succesfully")
})

const packagesRouter = require('./routes/packages')
// const createMap = require('./routes/createMap')
// const createMapRouter = createMap(connection, id)


app.use("/packages", packagesRouter)


// app.use("/createMap", createMapRouter)
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})
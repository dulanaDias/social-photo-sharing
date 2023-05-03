const express = require('express')
const mongoose = require('mongoose')

const app = express()
require('dotenv').config()

app.use(express.json())
app.use("/register", require('./endpoints/register'))
// handle authentication
app.use(require('./middleware/auth'))
app.use("/photo", require('./endpoints/photo'))

app.use((req,res)=>{
    res.status(404).json({
        error:true,
        message:"didn't match any route"
    })
})

const mongodbConnection = process.env.MONGO_URI;
console.log(`attempt to connect ${mongodbConnection}`)
mongoose.connect(mongodbConnection).then(() => {
    console.log("connected to mongo db")
}).catch((error) => {
    console.log(`failed to connected to database\n\t${error}`)
})
app.listen(process.env.PORT, () => {
    console.log(`server started on port: ${process.env.PORT}`)
})
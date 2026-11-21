import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/mongodb.js'

dotenv.config()
console.log("PORT:", process.env.PORT)
console.log("MONGO_URI:", process.env.MONGO_URI)

const app = express()

const port = process.env.PORT
connectDB()

app.listen(port, () => {
    console.log(`Server started at port`, port)
})
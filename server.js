import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/mongodb.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use('/api/products', productRoutes)

const port = process.env.PORT
connectDB()

app.listen(port, () => {
    console.log(`Server started at port`, port)
})
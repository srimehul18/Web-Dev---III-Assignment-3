import mongoose from 'mongoose'
const connectDB = async(req,res) => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connection successfull')
    }
    catch(error){
        console.log("Database connection failed",error.message)
    }
}
export default connectDB
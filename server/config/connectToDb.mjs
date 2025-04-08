import mongoose from 'mongoose'

export const connectToDb = async () => {
    try{

        const connect = await mongoose.connect("mongodb+srv://kesaridevaraya:1789@cluster0.omeolhc.mongodb.net/lms")
        console.log(`MongoDB connected: ${connect.connection.host} ${connect.connection.name}`)

    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
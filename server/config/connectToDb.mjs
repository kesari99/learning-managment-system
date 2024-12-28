import mongoose from 'mongoose'

export const connectToDb = async () => {
    try{

        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${connect.connection.host} ${connect.connection.name}`)

    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
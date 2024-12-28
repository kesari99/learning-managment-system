import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})




export const uploadMediaToCloudinary = async (filePath) => {
    try{
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
            transformation: [{ width: 800, height: 600, crop: 'limit' }],

        })

        return result

    }catch(error){
        console.log(error)
        throw new Error('Error uploading image to cloudinary')

    }
}

export const deleteMediaFromCloudinary = async (publicId) => {
    try{
        await cloudinary.uploader.destroy(publicId)

    }catch(error){
        console.log(error)
        throw new Error('Error deleting image from cloudinary') 
    }
}
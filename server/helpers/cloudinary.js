import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

dotenv.config()

cloudinary.config({
    cloud_name: "ds7oat6bl",
    api_key:"296386549815353",
    api_secret:"Hof4jhbVJXAiScpE_Q3u-4MyYwE"

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
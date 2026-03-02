import  {v2 as cloudinary } from "cloudinary";
import { error } from "console";
const connectCloudinary=async()=>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_API_SECRET,
        })

    }catch{
        console.log("error occur in cloudinary",error);

    }
}

export default connectCloudinary;
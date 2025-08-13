import {v2 as clodinary} from "cloudinary";
import fs from "fs";

 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default clodinary

// const uploadOnClodinary = async(localFilePath)=>{
//     try {
//         if(!localFilePath){
//             return res.json({success: false, message: "Path not found"})
//         }
//         const response = await clodinary.uploader(localFilePath, {
//             resource_type: "auto"
//         })

//         res.json({success: true, message: "File uploaded successfully", url: response.url})
        
//     } catch (error) {
//         fs.unlinkSync(localFilePath);
//         return res.json({success: false, message: error.message});
//     }
// }

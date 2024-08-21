import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";

// (async function() {

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("Error in LocalFilePath");
      return null;
    }
    const uploadResult = await cloudinary.uploader
      .upload(
        "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
        {
          // public_id: "shoes",
          resource_type: "auto",
        }
      )
      .catch((error) => {
        console.log(error);
      });

    console.log("File Uploaded Success Fully ", uploadResult.url);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath); // removes locaaly saved temporary file as upload failed
    return null;
  }
};

//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);
// })();

export { uploadOnCloudinary };

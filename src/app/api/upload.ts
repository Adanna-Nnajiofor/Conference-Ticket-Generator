import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const file = req.body.image; // Expecting a base64 image string

      const uploadResponse = await cloudinary.v2.uploader.upload(file, {
        folder: "attendees", // Optional: organize in a folder
        resource_type: "image",
      });

      return res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Upload failed", message: String(error) });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

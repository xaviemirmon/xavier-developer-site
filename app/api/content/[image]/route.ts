import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// This function serves images dynamically from the 'content' folder.
export async function GET(req: Request) {
    const { pathname } = new URL(req.url)

    const imageFilename = pathname.split("/").slice(-1)[0] 

  // Path to the image in the 'content' folder at the project root
  const imagePath = path.join(process.cwd(), 'content', imageFilename);

  try {
    // Check if the image file exists
    if (fs.existsSync(imagePath)) {
      // Read the file as a buffer
      const imageBuffer = fs.readFileSync(imagePath);

      // Determine the correct content type based on the file extension
      const extension = path.extname(imagePath).toLowerCase();
      const contentType = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
      }[extension];

      // If we have a recognized content type, return the image with the right headers
      if (contentType) {
        return new NextResponse(imageBuffer, {
          headers: {
            'Content-Type': contentType,
          },
        });
      } else {
        return new NextResponse('Unsupported file type', { status: 400 });
      }
    } else {
      return new NextResponse('Image not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
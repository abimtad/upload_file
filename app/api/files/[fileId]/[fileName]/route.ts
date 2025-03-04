import { type NextRequest, NextResponse } from "next/server";
import { getFile } from "@/lib/file-storage";

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string; fileName: string } }
) {
  const fileId = params.fileId;
  const fileName = params.fileName;

  const fileData = await getFile(fileId);

  if (!fileData) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }

  // Determine content type based on file extension
  let contentType = "application/octet-stream";
  if (fileName.endsWith(".pdf")) {
    contentType = "application/pdf";
  } else if (fileName.endsWith(".png")) {
    contentType = "image/png";
  } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
    contentType = "image/jpeg";
  }

  // Set headers for file download
  const headers = new Headers();
  headers.set("Content-Type", contentType);
  headers.set("Content-Disposition", `inline; filename="${fileName}"`);

  return new NextResponse(fileData, {
    status: 200,
    headers,
  });
}

import { type NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import { uploadFile, saveProcessedFile } from "@/lib/file-storage";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { message: "File must be a PDF" },
        { status: 400 }
      );
    }

    // Generate a unique ID for the file
    const fileId = uuidv4();

    // Read the file as ArrayBuffer
    const fileBuffer = await file.arrayBuffer();

    // Upload the original file
    const fileUrl = await uploadFile(
      fileId,
      file.name,
      new Uint8Array(fileBuffer),
      "application/pdf"
    );

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(fileBuffer);
    const pageCount = pdfDoc.getPageCount();

    // Generate QR code for the file URL
    const qrCodeDataUrl = await QRCode.toDataURL(fileUrl, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 200,
    });

    // Convert data URL to image bytes
    const qrCodeImageBytes = await pdfDoc.embedPng(qrCodeDataUrl);

    // Add QR code to each page
    const pages = pdfDoc.getPages();
    for (let i = 0; i < pageCount; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();

      // Calculate position (bottom center)
      const qrCodeSize = 100;
      const x = width / 2 - qrCodeSize / 2;
      const y = 20; // 20 points from bottom

      page.drawImage(qrCodeImageBytes, {
        x,
        y,
        width: qrCodeSize,
        height: qrCodeSize,
      });
    }

    // Save the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();

    // Upload the processed file
    const processedFileUrl = await uploadFile(
      `${fileId}-processed`,
      file.name.replace(".pdf", "-with-qr.pdf"),
      modifiedPdfBytes,
      "application/pdf"
    );

    // Upload the QR code image
    const qrCodeUrl = await uploadFile(
      `${fileId}-qr`,
      "qr-code.png",
      Buffer.from(qrCodeDataUrl.split(",")[1], "base64"),
      "image/png"
    );

    // Save file metadata
    await saveProcessedFile(fileId, {
      fileName: file.name,
      fileUrl,
      processedFileUrl,
      qrCodeUrl,
      pageCount,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    });

    return NextResponse.json({
      fileId,
      message: "File processed successfully",
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { message: "Error processing file", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

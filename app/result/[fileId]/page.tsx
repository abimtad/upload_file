import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProcessedFile } from "@/lib/file-storage";
import { Download, ArrowLeft } from "lucide-react";

interface ResultPageProps {
  params: {
    fileId: string;
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const fileData = await getProcessedFile(params.fileId);

  if (!fileData) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to upload
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            PDF Successfully Processed!
          </h1>
          <p className="text-muted-foreground">
            Your PDF has been processed and QR codes have been embedded on each
            page.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-full max-w-[200px] aspect-square">
              <Image
                src={fileData.qrCodeUrl || "/placeholder.svg"}
                alt="QR Code"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{fileData.fileName}</h2>
                <p className="text-sm text-muted-foreground">
                  {fileData.pageCount} pages • {fileData.fileSize}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">File URL:</span>{" "}
                  <Link
                    href={fileData.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-all"
                  >
                    {fileData.fileUrl}
                  </Link>
                </p>
                <p className="text-sm">
                  <span className="font-medium">QR Code:</span> Embedded at the
                  bottom of each page
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href={fileData.processedFileUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Processed PDF
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href={fileData.qrCodeUrl} download>
                  Download QR Code
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">What happens next?</h3>
          <p className="text-sm text-muted-foreground">
            Your processed PDF now has a QR code at the bottom of each page.
            When scanned, this QR code will direct users to the online version
            of your document. The file will be stored securely for 30 days.
          </p>
        </div>
      </div>
    </main>
  );
}

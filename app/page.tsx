import { FileUploader } from "@/components/file-uploader"
import { ProcessingSteps } from "@/components/processing-steps"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">PDF QR Code Embedder</h1>
          <p className="text-muted-foreground">
            Upload a PDF file and we'll embed a QR code at the bottom of each page that links back to the file.
          </p>
        </div>

        <div className="space-y-8">
          <FileUploader />
          <ProcessingSteps />
        </div>
      </div>
    </main>
  )
}


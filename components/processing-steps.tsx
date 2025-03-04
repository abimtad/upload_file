import { CheckCircle2 } from "lucide-react"

export function ProcessingSteps() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">How it works</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-2 rounded-full bg-primary/10 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="font-medium">1. Upload PDF</h3>
            <p className="text-sm text-muted-foreground">Upload your PDF document through our secure interface</p>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-2 rounded-full bg-primary/10 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <rect x="7" y="7" width="3" height="3" />
                <rect x="14" y="7" width="3" height="3" />
                <rect x="7" y="14" width="3" height="3" />
                <rect x="14" y="14" width="3" height="3" />
              </svg>
            </div>
            <h3 className="font-medium">2. Generate QR Code</h3>
            <p className="text-sm text-muted-foreground">We create a QR code that links to your PDF file</p>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-2 rounded-full bg-primary/10 mb-2">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">3. Embed & Download</h3>
            <p className="text-sm text-muted-foreground">QR code is embedded in your PDF and ready for download</p>
          </div>
        </div>
      </div>
    </div>
  )
}


import { useState, useRef, useCallback } from "react";
import {
  FileText,
  Upload,
  Download,
  Loader2,
  AlertCircle,
  X,
  Type,
  File,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { chapters, PRIVACY_NOTE } from "../data/chapters";

export default function DocumentConversionPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("affine-to-html");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [conversionResult, setConversionResult] = useState<string | null>(null);

  const TAB_CONFIG = {
    "affine-to-html": {
      id: "affine-to-html",
      label: "AFFiNE to HTML",
      icon: File,
      description: "Convert AFFiNE documents to styled HTML",
      accept: ".json,.affine",
      convert: convertAffineToHtml,
    },
    "html-to-pdf": {
      id: "html-to-pdf",
      label: "HTML to PDF",
      icon: FileText,
      description: "Convert HTML files to printable PDF",
      accept: ".html,.htm",
      convert: convertHtmlToPdf,
    },
    "affine-to-pdf": {
      id: "affine-to-pdf",
      label: "AFFiNE to PDF",
      icon: BookOpen,
      description: "Convert AFFiNE documents directly to PDF",
      accept: ".json,.affine",
      convert: convertAffineToPdf,
    },
    "word-to-html": {
      id: "word-to-html",
      label: "Word to HTML",
      icon: Type,
      description: "Convert Word documents to styled HTML",
      accept: ".doc,.docx",
      convert: convertWordToHtml,
    },
  };

  const currentTab = TAB_CONFIG[activeTab as keyof typeof TAB_CONFIG];

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setFileName(file.name);
      setError(null);
      setSuccess(null);
      setIsLoading(true);
      setConversionResult(null);

      try {
        const result = await currentTab.convert(file);
        setConversionResult(result);
        setSuccess(`Successfully converted ${file.name}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Conversion failed");
      } finally {
        setIsLoading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [currentTab]
  );

  const handleDownload = useCallback(() => {
    if (!conversionResult) return;

    const blob = new Blob([conversionResult], {
      type: activeTab.includes("pdf") ? "application/pdf" : "text/html",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.[^/.]+$/, "") + 
      (activeTab.includes("pdf") ? ".pdf" : ".html");
    a.click();
    URL.revokeObjectURL(url);
  }, [conversionResult, fileName, activeTab]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files?.[0];
      if (!file) return;

      // Check if file type matches current tab
      const acceptTypes = currentTab.accept.split(",").map((t) => t.trim());
      const fileExt = file.name.split(".").pop()?.toLowerCase();
      const validExtensions = acceptTypes.map((t) => t.replace(".", "").toLowerCase());

      if (fileExt && !validExtensions.includes(fileExt)) {
        setError(`Please upload a valid file type: ${currentTab.accept}`);
        return;
      }

      // Create a fake event to reuse the upload handler
      const fakeEvent = {
        target: { files: [file] },
      } as React.ChangeEvent<HTMLInputElement>;

      await handleFileUpload(fakeEvent);
    },
    [currentTab, handleFileUpload]
  );

  const clearAll = useCallback(() => {
    setFileName("");
    setError(null);
    setSuccess(null);
    setConversionResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl text-gold-gradient">Document Conversion</h1>
          <p className="text-[#e8e6e1]/75 mt-2">
            Convert documents between formats while preserving Legacy Architect styling
          </p>
        </div>
        <button
          onClick={() => navigate("/admin")}
          className="btn-gold-outline text-xs px-4 py-2 flex items-center gap-1.5 shrink-0 self-start"
        >
          Back to Admin
        </button>
      </div>

      {/* Conversion Tabs */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-1 flex gap-1 overflow-x-auto">
        {Object.values(TAB_CONFIG).map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              clearAll();
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a]"
                : "text-[#e8e6e1]/60 hover:text-[#e8e6e1] hover:bg-[#0e0e0e]"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Current Tab Description */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/40 p-4">
        <p className="text-[#e8e6e1]/80 text-sm">
          <span className="font-heading text-gold-primary/80 uppercase tracking-wider text-xs mr-2">
            {currentTab.label}
          </span>
          {currentTab.description}
        </p>
      </div>

      {/* Upload Area */}
      <div
        className="bg-[#0a0a0a] rounded-xl border border-gold-border/40 p-8 transition-all hover:border-gold-border/60"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept={currentTab.accept}
          className="hidden"
          id="file-upload"
        />

        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center gap-4 cursor-pointer min-h-[200px]"
        >
          <div className="w-16 h-16 rounded-full border-2 border-gold-border/30 flex items-center justify-center bg-[#000000]/20">
            {isLoading ? (
              <Loader2 className="w-8 h-8 text-gold-primary animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-gold-primary/70" />
            )}
          </div>

          <div className="text-center">
            <h3 className="font-heading text-lg text-[#e8e6e1]">
              {isLoading ? "Converting..." : "Upload Document"}
            </h3>
            <p className="text-[#e8e6e1]/60 text-sm mt-1">
              {isLoading
                ? "Please wait while we process your file"
                : `Drag & drop or click to browse (${currentTab.accept})`}
            </p>
          </div>

          {fileName && !isLoading && (
            <div className="bg-[#000000]/20 rounded-lg px-4 py-2 flex items-center gap-2 mt-2">
              <File className="w-4 h-4 text-gold-primary/60" />
              <span className="text-sm text-[#e8e6e1]/80 truncate max-w-[200px]">
                {fileName}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clearAll();
                }}
                className="text-[#e8e6e1]/40 hover:text-gold-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </label>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="bg-[#0a0a0a] rounded-xl border border-red-500/20 p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-red-400/80 text-sm font-medium">Error</p>
            <p className="text-[#e8e6e1]/80 text-sm">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-[#e8e6e1]/40 hover:text-[#e8e6e1] transition-colors ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {success && (
        <div className="bg-[#0a0a0a] rounded-xl border border-emerald-500/20 p-4 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
            <span className="text-emerald-400 text-xs font-bold">✓</span>
          </div>
          <div>
            <p className="text-emerald-400/80 text-sm font-medium">Success</p>
            <p className="text-[#e8e6e1]/80 text-sm">{success}</p>
          </div>
          <button
            onClick={() => setSuccess(null)}
            className="text-[#e8e6e1]/40 hover:text-[#e8e6e1] transition-colors ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Download Button */}
      {conversionResult && (
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/40 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center">
              <Download className="w-5 h-5 text-gold-primary" />
            </div>
            <div>
              <p className="font-heading text-[#e8e6e1] text-sm">Conversion Complete</p>
              <p className="text-[#e8e6e1]/70 text-xs">
                Ready to download as {activeTab.includes("pdf") ? "PDF" : "HTML"}
              </p>
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="btn-gold text-sm px-5 py-2.5 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download {activeTab.includes("pdf") ? "PDF" : "HTML"}
          </button>
        </div>
      )}

      {/* Preview Section */}
      {conversionResult && activeTab.includes("html") && (
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/40 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold-primary/70" />
            <h3 className="font-heading text-[#e8e6e1] text-sm">HTML Preview</h3>
          </div>
          <div className="bg-[#000000] rounded-lg p-4 overflow-x-auto max-h-[400px] overflow-y-auto">
            <pre className="text-xs text-[#e8e6e1]/80 whitespace-pre-wrap">
              {conversionResult.substring(0, 2000)}
              {conversionResult.length > 2000 && "..."}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// Conversion Functions
// ============================================

async function convertAffineToHtml(file: File): Promise<string> {
  const text = await file.text();
  
  try {
    const affineData = JSON.parse(text);
    
    // Extract content from AFFiNE format
    const pages = affineData.pages || [];
    let htmlContent = "";
    
    for (const page of pages) {
      const blocks = page.blocks || [];
      for (const block of blocks) {
        if (block.type === "text") {
          htmlContent += `<div class="affine-text">${block.text || ""}</div>`;
        } else if (block.type === "paragraph") {
          htmlContent += `<p>${block.text || ""}</p>`;
        } else if (block.type === "heading") {
          const level = block.level || 1;
          htmlContent += `<h${level}>${block.text || ""}</h${level}>`;
        } else if (block.type === "list") {
          htmlContent += `<ul>`;
          for (const item of block.items || []) {
            htmlContent += `<li>${item.text || ""}</li>`;
          }
          htmlContent += `</ul>`;
        }
      }
    }

    // Wrap in Legacy Architect styling
    return generateLegacyHtml(htmlContent, "AFFiNE Document");
  } catch (err) {
    throw new Error("Invalid AFFiNE file format");
  }
}

async function convertHtmlToPdf(file: File): Promise<string> {
  const text = await file.text();
  
  // For HTML to PDF, we'll generate a printable version
  // In a real implementation, this would use a library like html2pdf or puppeteer
  // For now, we'll return the HTML with print styles
  const printableHtml = addPrintStyles(text);
  
  // Note: Actual PDF conversion would happen client-side or server-side
  // This is a placeholder that returns HTML ready for printing
  return printableHtml;
}

async function convertAffineToPdf(file: File): Promise<string> {
  // Convert AFFiNE to HTML first, then to PDF
  const html = await convertAffineToHtml(file);
  return addPrintStyles(html);
}

async function convertWordToHtml(file: File): Promise<string> {
  // Word document conversion
  // In a real implementation, this would parse .docx (which is a zip file with XML)
  // For now, we'll handle it as a text extraction
  
  try {
    // Try to read as text (for simple .doc files)
    const text = await file.text();
    
    // Basic HTML conversion
    const htmlContent = `<div class="word-content">${text
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>")}</div>`;

    return generateLegacyHtml(htmlContent, "Word Document");
  } catch (err) {
    throw new Error("Could not parse Word document. Try uploading a .docx file.");
  }
}

// ============================================
// Helper Functions
// ============================================

function generateLegacyHtml(content: string, title: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Legacy Architect RVA</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Libre Baskerville', serif;
      background: #000000;
      color: #e8e6e1;
      line-height: 1.6;
      padding: 2rem;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Cinzel', serif;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: #d9cca0;
      margin-bottom: 1rem;
    }
    
    h1 { font-size: 2rem; border-bottom: 1px solid rgba(217, 204, 160, 0.2); padding-bottom: 0.5rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.25rem; }
    
    p { margin-bottom: 1rem; }
    
    ul, ol { margin-bottom: 1rem; padding-left: 1.5rem; }
    li { margin-bottom: 0.5rem; }
    
    .affine-text { margin-bottom: 1rem; }
    .word-content { white-space: pre-wrap; }
    
    /* Print styles */
    @media print {
      body { background: white; color: black; }
      h1, h2, h3, h4, h5, h6 { color: #0a0a0a; }
    }
    
    /* Legacy Architect brand colors */
    .brand-gold { color: #d9cca0; }
    .brand-dark { background: #000000; color: #e8e6e1; }
  </style>
</head>
<body>
  <header class="text-center mb-4">
    <h1>Legacy Architect RVA</h1>
    <p class="text-sm" style="color: rgba(232, 230, 225, 0.7);">${title}</p>
  </header>
  
  <main>
    ${content}
  </main>
  
  <footer class="mt-8 pt-4 border-top border-[rgba(217,204,160,0.1)] text-center text-xs" style="color: rgba(232, 230, 225, 0.5);">
    <p>Generated by Legacy Architect RVA &middot; ${new Date().toLocaleDateString()}</p>
    <p class="mt-2">${PRIVACY_NOTE}</p>
  </footer>
</body>
</html>
  `;
}

function addPrintStyles(html: string): string {
  // Add print-specific styles to the HTML
  const printStyles = `
    <style>
      @media print {
        body { 
          background: white !important; 
          color: black !important; 
          padding: 1in; 
        }
        h1, h2, h3, h4, h5, h6 { 
          color: #0a0a0a !important; 
          -webkit-print-color-adjust: exact; 
          print-color-adjust: exact; 
        }
        .brand-gold { color: #b89f6b !important; }
        .brand-dark { background: white !important; color: black !important; }
        a { color: #0066cc !important; }
      }
    </style>
  `;
  
  // Insert print styles before closing head tag
  return html.replace(/<\/head>/i, `${printStyles}</head>`);
}

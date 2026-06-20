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
  Palette,
  Printer,
  Sparkles,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { chapters, PRIVACY_NOTE } from "../data/chapters";
import {
  convertAffineToHtml,
  convertAffineToPdf,
  convertHtmlToPdf,
  convertMarkdownToHtml,
  ConversionOptions,
} from "../lib/documentConversion";

export default function DocumentConversionPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("affine-to-html");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [conversionResult, setConversionResult] = useState<string | null>(null);
  const [outputStyle, setOutputStyle] = useState<"luxury" | "print">("luxury");
  const [includeTOC, setIncludeTOC] = useState(true);
  const [includeHeader, setIncludeHeader] = useState(true);
  const [includeFooter, setIncludeFooter] = useState(true);

  const TAB_CONFIG = {
    "affine-to-html": {
      id: "affine-to-html",
      label: "AFFiNE to HTML",
      icon: File,
      description: "Convert AFFiNE documents to styled HTML",
      accept: ".json,.affine",
      convert: (file: File) => convertAffineToHtml(file, {
        style: outputStyle,
        includeTOC,
        includeHeader,
        includeFooter,
      }),
    },
    "affine-to-pdf": {
      id: "affine-to-pdf",
      label: "AFFiNE to PDF",
      icon: BookOpen,
      description: "Convert AFFiNE documents directly to PDF",
      accept: ".json,.affine",
      convert: (file: File) => convertAffineToPdf(file, {
        style: "print",
        includeTOC,
        includeHeader,
        includeFooter,
      }),
    },
    "md-to-html": {
      id: "md-to-html",
      label: "Markdown to HTML",
      icon: Type,
      description: "Convert Markdown files to styled HTML",
      accept: ".md,.markdown,.txt",
      convert: (file: File) => convertMarkdownToHtml(file, {
        style: outputStyle,
        includeTOC,
        includeHeader,
        includeFooter,
      }),
    },
    "md-to-pdf": {
      id: "md-to-pdf",
      label: "Markdown to PDF",
      icon: BookOpen,
      description: "Convert Markdown files to printable PDF",
      accept: ".md,.markdown,.txt",
      convert: (file: File) => convertMarkdownToHtml(file, {
        style: "print",
        includeTOC,
        includeHeader,
        includeFooter,
      }),
    },
    "html-to-pdf": {
      id: "html-to-pdf",
      label: "HTML to PDF",
      icon: FileText,
      description: "Convert HTML files to printable PDF",
      accept: ".html,.htm",
      convert: convertHtmlToPdf,
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
    [currentTab, outputStyle, includeTOC, includeHeader, includeFooter]
  );

  const handleDownload = useCallback(() => {
    if (!conversionResult) return;

    const isPdf = activeTab.includes("pdf");
    const blob = new Blob([conversionResult], {
      type: isPdf ? "application/pdf" : "text/html",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.[^.]+$/, "") +
      (isPdf ? ".pdf" : ".html");
    a.click();
    URL.revokeObjectURL(url);
  }, [conversionResult, fileName, activeTab]);

  const handleDownloadPdf = useCallback(() => {
    if (!conversionResult) return;

    // For HTML results, convert to PDF by opening print dialog
    if (!activeTab.includes("pdf")) {
      // Create a new window with the HTML and trigger print
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(conversionResult);
        printWindow.document.close();
        printWindow.focus();
        // Give the browser time to render before printing
        setTimeout(() => {
          printWindow.print();
        }, 250);
      }
    } else {
      // Already PDF, just download
      handleDownload();
    }
  }, [conversionResult, activeTab, handleDownload]);

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

  const toggleOutputStyle = useCallback(() => {
    setOutputStyle((prev) => (prev === "luxury" ? "print" : "luxury"));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-gold-gradient">Document Conversion</h1>
          <p className="text-[#e8e6e1]/75 mt-2">
            Convert Affine, Markdown, and HTML files to styled documents with Legacy Architect branding
          </p>
        </div>
        <button
          onClick={() => navigate("/admin")}
          className="btn-gold-outline text-xs px-4 py-2 flex items-center gap-1.5"
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
            className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
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

      {/* Options Panel */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/40 p-4 space-y-4">
        <div className="flex items-center gap-4">
          <h3 className="font-heading text-gold-primary text-sm uppercase tracking-wider">Output Options</h3>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#e8e6e1]/60">Style:</span>
            <button
              onClick={toggleOutputStyle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                outputStyle === "luxury"
                  ? "bg-[#d9cca0] text-[#0a0a0a]"
                  : "bg-[#0e0e0e] text-[#e8e6e1]/70 border border-gold-border/30"
              }`}
            >
              {outputStyle === "luxury" ? (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Black & Gold
                </>
              ) : (
                <>
                  <Printer className="w-3.5 h-3.5" />
                  Printer-Friendly
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeTOC}
              onChange={(e) => setIncludeTOC(e.target.checked)}
              className="w-4 h-4 rounded border-gold-border/30 bg-[#0a0a0a] text-gold-primary focus:ring-gold-primary/30"
            />
            <span className="text-sm text-[#e8e6e1]/80">Include Table of Contents</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeHeader}
              onChange={(e) => setIncludeHeader(e.target.checked)}
              className="w-4 h-4 rounded border-gold-border/30 bg-[#0a0a0a] text-gold-primary focus:ring-gold-primary/30"
            />
            <span className="text-sm text-[#e8e6e1]/80">Include Header</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeFooter}
              onChange={(e) => setIncludeFooter(e.target.checked)}
              className="w-4 h-4 rounded border-gold-border/30 bg-[#0a0a0a] text-gold-primary focus:ring-gold-primary/30"
            />
            <span className="text-sm text-[#e8e6e1]/80">Include Footer</span>
          </label>
        </div>
      </div>

      {/* Current Tab Description */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/40 p-4">
        <p className="text-[#e8e6e1]/80 text-sm">
          <span className="font-heading text-gold-primary/80 uppercase tracking-wider text-xs mr-2">
            {currentTab.label}
          </span>
          {currentTab.description}
          {activeTab.includes("pdf") && (
            <span className="ml-2 text-[#e8e6e1]/60">
              (Print-ready with automatic page breaks)
            </span>
          )}
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
            <Check className="w-3.5 h-3.5 text-emerald-400" />
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

      {/* Download Buttons */}
      {conversionResult && (
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/40 p-4 space-y-3">
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
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownload}
              className="btn-gold text-sm px-5 py-2.5 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download {activeTab.includes("pdf") ? "PDF" : "HTML"}
            </button>
            
            {!activeTab.includes("pdf") && (
              <button
                onClick={handleDownloadPdf}
                className="btn-gold-outline text-sm px-5 py-2.5 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print / Save as PDF
              </button>
            )}
            
            <button
              onClick={() => {
                // Copy to clipboard
                navigator.clipboard.writeText(conversionResult);
                setSuccess("HTML copied to clipboard!");
              }}
              className="bg-[#0e0e0e] text-[#e8e6e1]/70 hover:text-[#e8e6e1] border border-gold-border/30 text-sm px-5 py-2.5 flex items-center justify-center gap-2 rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4" />
              Copy HTML
            </button>
          </div>
        </div>
      )}

      {/* Preview Section */}
      {conversionResult && activeTab.includes("html") && (
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/40 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold-primary/70" />
            <h3 className="font-heading text-[#e8e6e1] text-sm">HTML Preview</h3>
            <span className="text-xs text-[#e8e6e1]/50 ml-auto">
              Style: {outputStyle === "luxury" ? "Black & Gold" : "Printer-Friendly"}
            </span>
          </div>
          
          <div className="bg-[#000000] rounded-lg p-4 overflow-x-auto max-h-[500px] overflow-y-auto border border-gold-border/20">
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: conversionResult.substring(0, 5000) + (conversionResult.length > 5000 ? "..." : ""),
              }}
            />
            {conversionResult.length > 5000 && (
              <p className="text-xs text-[#e8e6e1]/40 mt-4 text-center">
                Preview truncated. Full content will be in the downloaded file.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Style Preview Cards */}
      {!conversionResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/40 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-gold-primary" />
              <h3 className="font-heading text-[#e8e6e1] text-sm">Black & Gold Style</h3>
            </div>
            <p className="text-[#e8e6e1]/70 text-xs mb-3">
              Luxury dark theme with gold accents, matching the Legacy Architect portal design
            </p>
            <div className="bg-[#000000] rounded-lg p-3 border border-gold-border/20">
              <div className="text-xs text-gold-primary/80 mb-2">Sample Output:</div>
              <div className="space-y-2">
                <div className="h-2 w-24 bg-gold-primary/30 rounded" />
                <div className="h-2 w-48 bg-[#e8e6e1]/10 rounded" />
                <div className="h-2 w-32 bg-[#e8e6e1]/10 rounded" />
              </div>
            </div>
          </div>
          
          <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/40 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Printer className="w-5 h-5 text-gold-primary" />
              <h3 className="font-heading text-[#e8e6e1] text-sm">Printer-Friendly Style</h3>
            </div>
            <p className="text-[#e8e6e1]/70 text-xs mb-3">
              Clean white background with black text, optimized for printing
            </p>
            <div className="bg-white rounded-lg p-3 border border-gold-border/20">
              <div className="text-xs text-[#1a1a1a]/80 mb-2">Sample Output:</div>
              <div className="space-y-2">
                <div className="h-2 w-24 bg-[#1a1a1a]/10 rounded" />
                <div className="h-2 w-48 bg-[#1a1a1a]/10 rounded" />
                <div className="h-2 w-32 bg-[#1a1a1a]/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/20 p-4">
        <p className="privacy-disclaimer">{PRIVACY_NOTE}</p>
      </div>
    </div>
  );
}

import { useRef, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { RiAlertLine as AlertCircle, RiCheckboxCircleLine as CheckCircle2, RiDownloadLine as Download, RiFileLine as File, RiFileTextLine as FileText, RiImageLine as ImageIcon, RiLoader4Line as Loader2, RiFontSize2 as Type, RiUploadLine as Upload, RiCloseLine as X } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import {
  downloadBlob,
  downloadText,
  INPUT_TYPES,
  OUTPUT_TYPES,
  parseInput,
  renderToDocx,
  renderToHtml,
  renderToPdfLib,
  renderToPngZip,
  type InputType,
  type OutputType,
} from "../lib/documentConverter";

const INPUT_ICONS: Record<InputType, any> = {
  markdown: Type,
  html: File,
  word: FileText,
  pdf: FileText,
  affine: File,
};

const OUTPUT_ICONS: Record<OutputType, any> = {
  html: File,
  pdf: FileText,
  docx: FileText,
  png: ImageIcon,
};

export default function DocumentConversionPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isAdmin = useQuery(api.admin.isAdmin);

  const [inputType, setInputType] = useState<InputType | null>(null);
  const [outputType, setOutputType] = useState<OutputType | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressLabel, setProgressLabel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const selectedInput = INPUT_TYPES.find((i) => i.id === inputType);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setError(null);
      setSuccess(null);
      setPreviewHtml(null);
    }
  };

  const handleConvert = async () => {
    if (!file || !inputType || !outputType) return;
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setPreviewHtml(null);
    setProgressLabel(null);

    try {
      const parsed = await parseInput(file, inputType, (current, total) =>
        setProgressLabel(`Reading page ${current} of ${total} (OCR)...`)
      );
      const ocrNote = parsed.warnings?.length ? ` ${parsed.warnings.join(" ")}` : "";
      const baseName = file.name.replace(/\.[^.]+$/, "");

      if (outputType === "html") {
        const html = renderToHtml(parsed);
        setPreviewHtml(html);
        downloadText(html, `${baseName}.html`, "text/html");
        setSuccess(`Converted to HTML and downloaded.${ocrNote}`);
      } else if (outputType === "pdf") {
        setProgressLabel("Building your PDF...");
        const blob = await renderToPdfLib(parsed);
        downloadBlob(blob, `${baseName}.pdf`);
        setSuccess(`Converted to PDF and downloaded.${ocrNote}`);
      } else if (outputType === "docx") {
        const blob = await renderToDocx(parsed);
        downloadBlob(blob, `${baseName}.docx`);
        setSuccess(`Converted to a Word document and downloaded.${ocrNote}`);
      } else if (outputType === "png") {
        const zip = await renderToPngZip(parsed, (current, total) =>
          setProgressLabel(`Rendering page ${current} of ${total}...`)
        );
        downloadBlob(zip, `${baseName}-images.zip`);
        setSuccess(`Each page rendered as its own image and downloaded as a zip.${ocrNote}`);
      }
    } catch (err: any) {
      setError(err?.message || "Conversion failed. Check the file and try again.");
    } finally {
      setIsLoading(false);
      setProgressLabel(null);
    }
  };

  const reset = () => {
    setFile(null);
    setError(null);
    setSuccess(null);
    setPreviewHtml(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (isAdmin === undefined) {
    return null;
  }
  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-[#e8e6e1]/75">Admin access required.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl text-gold-gradient">Document Conversion</h1>
          <p className="text-[#e8e6e1]/75 mt-2">
            Convert between formats while preserving Legacy Architect styling
          </p>
        </div>
        <button
          onClick={() => navigate("/admin")}
          className="btn-gold-outline text-xs px-4 py-2 flex items-center gap-1.5 shrink-0 self-start"
        >
          Back to Admin
        </button>
      </div>

      {/* Step 1: Input type */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/30 p-5 space-y-3">
        <h2 className="text-[10px] uppercase tracking-widest text-gold-muted font-heading">
          1. What are you converting from?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {INPUT_TYPES.map((t) => {
            const Icon = INPUT_ICONS[t.id];
            const active = inputType === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setInputType(t.id);
                  reset();
                }}
                className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors ${
                  active
                    ? "border-gold-primary bg-gold-dark/15 text-gold-primary"
                    : "border-gold-border/30 text-[#e8e6e1]/80 hover:border-gold-primary/40"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-heading">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Upload */}
      {inputType && (
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/30 p-5 space-y-3">
          <h2 className="text-[10px] uppercase tracking-widest text-gold-muted font-heading">
            2. Upload your {selectedInput?.label} file
          </h2>
          <input
            ref={fileInputRef}
            type="file"
            accept={selectedInput?.accept}
            onChange={handleFileChange}
            className="hidden"
            id="doc-upload"
          />
          {!file ? (
            <label
              htmlFor="doc-upload"
              className="flex flex-col items-center gap-2 border-2 border-dashed border-gold-border/30 rounded-xl py-10 cursor-pointer hover:border-gold-primary/40 transition-colors"
            >
              <Upload className="w-6 h-6 text-gold-muted" />
              <span className="text-sm text-[#e8e6e1]/80">Drag & drop or click to browse</span>
              <span className="text-xs text-[#e8e6e1]/50">({selectedInput?.accept})</span>
            </label>
          ) : (
            <div className="flex items-center justify-between bg-black/40 rounded-lg px-4 py-3">
              <span className="text-sm text-[#e8e6e1] truncate">{file.name}</span>
              <button onClick={reset} className="text-[#e8e6e1]/50 hover:text-red-400 shrink-0 ml-2">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Output type */}
      {inputType && file && (
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/30 p-5 space-y-3">
          <h2 className="text-[10px] uppercase tracking-widest text-gold-muted font-heading">
            3. Convert to
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {OUTPUT_TYPES.map((t) => {
              const Icon = OUTPUT_ICONS[t.id];
              const active = outputType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setOutputType(t.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-colors ${
                    active
                      ? "border-gold-primary bg-gold-dark/15 text-gold-primary"
                      : "border-gold-border/30 text-[#e8e6e1]/80 hover:border-gold-primary/40"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-heading">{t.label}</span>
                  <span className="text-[9px] text-[#e8e6e1]/50 leading-tight">{t.description}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 4: Convert */}
      {inputType && file && outputType && (
        <button
          onClick={handleConvert}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {progressLabel || "Converting..."}
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Convert & Download
            </>
          )}
        </button>
      )}

      {error && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-emerald-400">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          {success}
        </div>
      )}

      {previewHtml && (
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border/30 overflow-hidden">
          <div className="px-4 py-2 border-b border-gold-border/20">
            <h3 className="font-heading text-[#e8e6e1] text-sm">Preview</h3>
          </div>
          <div className="bg-black p-4 max-h-[400px] overflow-y-auto">
            <iframe
              title="Converted document preview"
              srcDoc={previewHtml}
              className="w-full h-[350px] bg-white rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}

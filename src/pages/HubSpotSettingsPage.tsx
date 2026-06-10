import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Key,
  Loader2,
  Save,
  Settings,
  XCircle,
} from "lucide-react";

export default function HubSpotSettingsPage() {
  const navigate = useNavigate();
  const isAdmin = useQuery(api.admin.isAdmin);
  const hubSpotConfig = useQuery(api.admin.getHubSpotConfig);
  const setHubSpotConfig = useMutation(api.admin.setHubSpotConfig);
  
  const [apiKey, setApiKey] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  
  // Load existing API key
  useState(() => {
    if (hubSpotConfig) {
      setApiKey(hubSpotConfig);
    }
  }, [hubSpotConfig]);
  
  const handleSave = async () => {
    if (!apiKey.trim()) {
      setError("API key is required");
      return;
    }
    
    setSaving(true);
    setError(null);
    try {
      await setHubSpotConfig({ apiKey: apiKey.trim() });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError("Failed to save API key. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  
  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
    }
  };
  
  const handleTestConnection = async () => {
    // This would test the HubSpot connection
    // For now, just show a message
    alert("HubSpot connection test: Placeholder - API key is configured");
  };
  
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Settings className="w-10 h-10 text-gold-muted mb-4" />
        <p className="text-[#e8e6e1]/75">Admin access required.</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-gold-gradient">
            HubSpot Settings
          </h1>
          <p className="text-[#e8e6e1]/75 mt-1">
            Configure HubSpot API integration for client sync
          </p>
        </div>
        <button
          onClick={() => navigate("/admin")}
          className="text-sm text-gold-muted hover:text-gold-primary transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </button>
      </div>
      
      {/* Settings Card */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border overflow-hidden">
        <div className="p-4 border-b border-gold-border/30">
          <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
            <Key className="w-4 h-4" />
            API Configuration
          </h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* API Key Input */}
          <div>
            <label className="block text-sm font-medium text-[#e8e6e1] mb-2">
              HubSpot API Key
            </label>
            <p className="text-[10px] text-[#e8e6e1]/50 mb-3">
              Enter your HubSpot API key to enable client data synchronization.
              This key will be used to authenticate requests to the HubSpot API.
            </p>
            <div className="relative">
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setSaved(false);
                }}
                placeholder="hapikey-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                className="w-full bg-black border border-gold-border/30 rounded-lg px-4 py-3 text-[#e8e6e1] placeholder:text-[#e8e6e1]/30 focus:outline-none focus:border-gold-primary font-mono text-sm"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e8e6e1]/50 hover:text-gold-primary transition-colors"
              >
                {showApiKey ? (
                  <XCircle className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {apiKey && (
              <button
                onClick={handleCopy}
                className="mt-2 text-[10px] text-gold-muted hover:text-gold-primary transition-colors flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                Copy API Key
              </button>
            )}
          </div>
          
          {/* Save Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save API Key
                </>
              )}
            </button>
            
            {saved && (
              <span className="flex items-center gap-1 text-emerald-400 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Saved
              </span>
            )}
            
            {error && (
              <span className="text-red-400 text-sm">{error}</span>
            )}
          </div>
          
          {/* Test Connection */}
          {apiKey && (
            <div className="pt-4 border-t border-gold-border/10">
              <button
                onClick={handleTestConnection}
                className="flex items-center gap-2 text-sm text-gold-muted hover:text-gold-primary transition-colors"
              >
                <Settings className="w-4 h-4" />
                Test Connection
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border overflow-hidden">
        <div className="p-4 border-b border-gold-border/30">
          <h2 className="font-heading text-sm text-gold-primary">
            How to Get Your HubSpot API Key
          </h2>
        </div>
        <div className="p-6">
          <ol className="space-y-4 text-sm text-[#e8e6e1]/75">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center text-xs font-bold shrink-0">
                1
              </span>
              <span>Log in to your HubSpot account</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center text-xs font-bold shrink-0">
                2
              </span>
              <span>Click on your profile picture in the top right corner</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center text-xs font-bold shrink-0">
                3
              </span>
              <span>Select &quot;Settings&quot; from the dropdown menu</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center text-xs font-bold shrink-0">
                4
              </span>
              <span>Navigate to &quot;Integrations&quot; > &quot;API Key&quot;</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center text-xs font-bold shrink-0">
                5
              </span>
              <span>Click &quot;Generate API Key&quot; or copy your existing key</span>
            </li>
          </ol>
          
          <div className="mt-6 p-4 bg-black rounded-lg border border-gold-border/20">
            <p className="text-[10px] text-[#e8e6e1]/50">
              <strong className="text-gold-muted">Note:</strong> Keep your API key secure. 
              Anyone with access to this key can make API requests on behalf of your HubSpot account.
            </p>
          </div>
        </div>
      </div>
      
      {/* Sync Status */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border overflow-hidden">
        <div className="p-4 border-b border-gold-border/30">
          <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Sync Status
          </h2>
        </div>
        <div className="p-6">
          {hubSpotConfig ? (
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm text-[#e8e6e1]">HubSpot integration is configured</p>
                <p className="text-[10px] text-[#e8e6e1]/50">
                  API key is set and ready for synchronization
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-sm text-[#e8e6e1]">HubSpot integration not configured</p>
                <p className="text-[10px] text-[#e8e6e1]/50">
                  Add your API key to enable client synchronization
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper component for loading state
function Loader2({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="M19.12 4.88a2 2 0 0 0-2.24 0l-.88.88a2 2 0 0 0 0 2.82l.88.88a2 2 0 0 0 2.24 0l.88-.88a2 2 0 0 0 0-2.82l-.88-.88Z" />
      <path d="M4.88 19.12a2 2 0 0 0 2.24 0l.88-.88a2 2 0 0 0 0-2.82l-.88-.88a2 2 0 0 0-2.24 0l-.88.88a2 2 0 0 0 0 2.82l.88.88Z" />
      <path d="M19.12 19.12a2 2 0 0 0-2.24 0l-.88-.88a2 2 0 0 0-2.82 0l-.88.88a2 2 0 0 0 0 2.24l.88.88a2 2 0 0 0 2.24 0l.88-.88a2 2 0 0 0 0-2.82l-.88-.88Z" />
      <path d="M4.88 4.88a2 2 0 0 0 2.24 0l.88.88a2 2 0 0 0 2.82 0l.88-.88a2 2 0 0 0 0-2.24l-.88-.88a2 2 0 0 0-2.82 0l-.88.88a2 2 0 0 0 0 2.24Z" />
    </svg>
  );
}

// Helper component for eye icon
function Eye({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Helper component for arrow left
function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

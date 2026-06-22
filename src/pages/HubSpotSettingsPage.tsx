import { useAction, useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { RiArrowLeftLine as ArrowLeft, RiCheckboxCircleLine as CheckCircle2, RiFileCopyLine as Copy, RiEyeLine as Eye, RiKeyLine as Key, RiLoader4Line as Loader2, RiSaveLine as Save, RiSettings3Line as Settings, RiCloseCircleLine as XCircle } from "@remixicon/react";

export default function HubSpotSettingsPage() {
  const navigate = useNavigate();
  const isAdmin = useQuery(api.admin.isAdmin);
  const hubSpotConfig = useQuery(api.admin.getHubSpotConfig);
  const setHubSpotConfig = useMutation(api.admin.setHubSpotConfig);
  const testConnectionAction = useAction(api.hubspot.testConnection);

  const [apiKey, setApiKey] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ connected: boolean; message: string } | null>(null);
  
  // Load existing API key
  useEffect(() => {
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
    setTesting(true);
    setTestResult(null);
    try {
      const result = await testConnectionAction({});
      setTestResult(result);
    } catch (err: any) {
      setTestResult({ connected: false, message: err?.message || "Test failed." });
    } finally {
      setTesting(false);
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl text-gold-gradient">
            HubSpot Settings
          </h1>
          <p className="text-[#e8e6e1]/75 mt-1">
            Connect your HubSpot account to push client records, pull contact data,
            and link straight to each client's CRM profile
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

      {/* What This Enables */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border overflow-hidden">
        <div className="p-4 border-b border-gold-border/30">
          <h2 className="font-heading text-sm text-gold-primary">What This Enables</h2>
        </div>
        <div className="p-6 space-y-3 text-sm text-[#e8e6e1]/80">
          <div className="flex gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#e8e6e1]">Push to HubSpot</strong> — from any client's row in
              Client Management, send their name, email, and phone to HubSpot as a contact.
            </span>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#e8e6e1]">Pull from HubSpot</strong> — look up a client's
              current HubSpot contact record right next to their portal data.
            </span>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#e8e6e1]">Go to Portal Profile</strong> — after a successful
              sync, jump straight from HubSpot context to that client's full CRM profile in the portal.
            </span>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#e8e6e1]">View in HubSpot</strong> — once synced, a client's
              profile page links directly back to their HubSpot contact record.
            </span>
          </div>
        </div>
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
              HubSpot Private App Token
            </label>
            <p className="text-[10px] text-[#e8e6e1]/50 mb-3">
              Enter your HubSpot Private App Token to enable client data synchronization.
              This key will be used to authenticate requests to the HubSpot API.
              <br/>
              <span className="text-gold-muted/70">Recommended scopes: crm.objects.contacts.* and crm.schemas.contacts.*</span>
            </p>
            <div className="relative">
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setSaved(false);
                }}
                placeholder="pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
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
            <div className="pt-4 border-t border-gold-border/10 space-y-2">
              <button
                onClick={handleTestConnection}
                disabled={testing}
                className="flex items-center gap-2 text-sm text-gold-muted hover:text-gold-primary transition-colors disabled:opacity-50"
              >
                {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
                Test Connection
              </button>
              {testResult && (
                <p className={`text-xs ${testResult.connected ? "text-emerald-400" : "text-red-400"}`}>
                  {testResult.message}
                </p>
              )}
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
              <span>Select "Settings" from the dropdown menu</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center text-xs font-bold shrink-0">
                4
              </span>
              <span>Navigate to "Integrations" &gt; "Private Apps"</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center text-xs font-bold shrink-0">
                5
              </span>
              <span>Click "Create a private app" and select the scopes below</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center text-xs font-bold shrink-0">
                6
              </span>
              <span>Copy the access token (starts with "pat-")</span>
            </li>
          </ol>
          
          <div className="mt-6 p-4 bg-black rounded-lg border border-gold-border/20">
            <p className="text-[10px] text-[#e8e6e1]/50 break-words">
              <strong className="text-gold-muted">Note:</strong> Keep this token secure. 
              Anyone with access to this key can make API requests on behalf of your HubSpot account.
              <br/>
              <strong className="text-gold-muted">Recommended scopes:</strong> 
              <code className="text-gold-muted/70">crm.objects.contacts.highly_sensitive.read</code>, 
              <code className="text-gold-muted/70">crm.objects.contacts.read</code>, 
              <code className="text-gold-muted/70">crm.objects.contacts.sensitive.read</code>, 
              <code className="text-gold-muted/70">crm.objects.contacts.write</code>, 
              <code className="text-gold-muted/70">crm.schemas.contacts.read</code>, 
              <code className="text-gold-muted/70">crm.schemas.contacts.write</code>
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
          {testResult ? (
            <div className="flex items-center gap-3">
              {testResult.connected ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-amber-400" />
              )}
              <div>
                <p className="text-sm text-[#e8e6e1]">
                  {testResult.connected ? "Connected to HubSpot" : "Not connected"}
                </p>
                <p className="text-[10px] text-[#e8e6e1]/50">{testResult.message}</p>
              </div>
            </div>
          ) : hubSpotConfig ? (
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm text-[#e8e6e1]">HubSpot integration is configured</p>
                <p className="text-[10px] text-[#e8e6e1]/50">
                  A key is saved. Use Test Connection above to verify it actually works.
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

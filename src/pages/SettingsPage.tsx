import { useMutation, useQuery } from "convex/react";
import { AlertTriangle, Loader2, Shield, Trash2 } from "lucide-react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

export default function SettingsPage() {
  const profile = useQuery(api.profile.getMyProfile);
  const purgeAllData = useMutation(api.sections.purgeAllMyData);
  const [showPurge, setShowPurge] = useState(false);
  const [purging, setPurging] = useState(false);
  const [purgeResult, setPurgeResult] = useState<string | null>(null);

  const handlePurge = async () => {
    setPurging(true);
    try {
      const result = await purgeAllData();
      setPurgeResult(`All data purged successfully. ${result.deleted} item(s) cleared.`);
      setTimeout(() => {
        setShowPurge(false);
        setPurgeResult(null);
      }, 3000);
    } catch {
      setPurgeResult("Error purging data. Please try again.");
    } finally {
      setPurging(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="font-heading text-3xl text-gold-gradient">Settings</h1>

      {/* Account Info */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 space-y-3">
        <h2 className="font-heading text-sm text-gold-primary">Account</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-[#e8e6e1]/50 uppercase tracking-widest">Name</p>
            <p className="text-sm text-[#e8e6e1]">{profile?.name || "Not set"}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#e8e6e1]/50 uppercase tracking-widest">Email</p>
            <p className="text-sm text-[#e8e6e1]">{profile?.email || "Not set"}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#e8e6e1]/50 uppercase tracking-widest">Tier</p>
            <p className="text-sm text-[#e8e6e1] capitalize">{profile?.tier || "Vault"}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#e8e6e1]/50 uppercase tracking-widest">Status</p>
            <p className="text-sm text-[#e8e6e1]">{profile?.isActivated ? "Active" : "Pending"}</p>
          </div>
        </div>
      </div>

      {/* Zero-Knowledge Protocol */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gold-primary" />
          <h2 className="font-heading text-sm text-gold-primary">Zero-Knowledge Standard</h2>
        </div>
        <p className="text-xs text-[#e8e6e1]/60 leading-relaxed">
          Legacy Architect RVA does not store or retain your credentials. All data is accessible
          only to you and can be purged at any time from this page.
        </p>
      </div>

      {/* Data Purge */}
      <div className="bg-[#0a0a0a] rounded-xl border border-red-500/20 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <h2 className="font-heading text-sm text-red-400">Danger Zone</h2>
        </div>
        <p className="text-xs text-[#e8e6e1]/60 leading-relaxed">
          All data across all 7 chapters will be permanently deleted.
          This action cannot be undone.
        </p>

        {!showPurge ? (
          <button
            onClick={() => setShowPurge(true)}
            className="flex items-center gap-2 text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Purge All Portal Data
          </button>
        ) : (
          <div className="space-y-3 bg-red-500/5 rounded-lg p-4 border border-red-500/20">
            <p className="text-sm text-red-400 font-medium">
              Are you sure? This will permanently delete all your Life Manual data.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handlePurge}
                disabled={purging}
                className="flex items-center gap-2 text-xs bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {purging ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                {purging ? "Purging..." : "Yes, Purge Everything"}
              </button>
              <button
                onClick={() => setShowPurge(false)}
                className="text-xs text-[#e8e6e1]/60 hover:text-[#e8e6e1]/60 px-4 py-2"
              >
                Cancel
              </button>
            </div>
            {purgeResult && (
              <p className="text-xs text-emerald-400">{purgeResult}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

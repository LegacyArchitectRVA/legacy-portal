import { useAction, useMutation, useQuery } from "convex/react";
import {
  BookOpen,
  CheckCircle2,
  Crown,
  Eye,
  FileText,
  Loader2,
  Paintbrush,
  Settings,
  UserCog,
  Users,
  UploadCloud,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconMedallion } from "../components/TrustIcons";
import { api } from "../../convex/_generated/api";
import { tiers } from "../data/tiers";

export default function AdminPage() {
  const navigate = useNavigate();
  const isAdmin = useQuery(api.admin.isAdmin);
  const clients = useQuery(api.admin.listClients);
  const updateTier = useMutation(api.admin.updateClientTier);
  const activateClient = useMutation(api.admin.activateClient);
  const pushToHubSpot = useAction(api.hubspot.pushClientToHubSpot);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [hubspotSyncingId, setHubspotSyncingId] = useState<string | null>(null);
  const [hubspotResult, setHubspotResult] = useState<{ id: string; ok: boolean; message: string } | null>(null);

  const handlePushToHubSpot = async (client: any) => {
    setHubspotSyncingId(client._id);
    setHubspotResult(null);
    try {
      const result = await pushToHubSpot({ clientUserId: client.userId });
      setHubspotResult({ id: client._id, ok: true, message: result.message });
    } catch (err: any) {
      setHubspotResult({ id: client._id, ok: false, message: err?.message || "Sync failed." });
    } finally {
      setHubspotSyncingId(null);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Crown className="w-10 h-10 text-gold-muted mb-4" />
        <p className="text-[#e8e6e1]/75">Admin access required.</p>
      </div>
    );
  }

  const handleTierChange = async (clientId: string, tier: string) => {
    setUpdatingId(clientId);
    try {
      await updateTier({ clientId: clientId as any, tier });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleActivate = async (clientId: string, isActivated: boolean) => {
    setUpdatingId(clientId);
    try {
      await activateClient({ clientId: clientId as any, isActivated });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-gold-gradient">Admin Dashboard</h1>
          <p className="text-[#e8e6e1]/75 mt-1">
            Manage clients, tiers, and Life Manual generation
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate("/admin/visual-editor")}
            className="flex items-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            <Paintbrush className="w-4 h-4" />
            Visual Editor
          </button>
          <button
            onClick={() => navigate("/admin/hubspot")}
            className="flex items-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            <Settings className="w-4 h-4" />
            HubSpot
          </button>
          <button
            onClick={() => navigate("/generate")}
            className="flex items-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <BookOpen className="w-4 h-4" />
            Generate Manual
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-4 text-center space-y-2">
          <IconMedallion icon={Users} size={16} className="mx-auto" />
          <p className="text-2xl font-heading text-gold-bright">{clients?.length || 0}</p>
          <p className="text-[10px] text-[#e8e6e1]/75 uppercase tracking-widest mt-1">Total Clients</p>
        </div>
        {tiers.map((t) => {
          const tierIcon = t.id === "legacy" ? Crown : t.id === "archive" ? BookOpen : UserCog;
          return (
            <div key={t.id} className="bg-[#0a0a0a] rounded-xl border border-gold-border p-4 text-center space-y-2">
              <IconMedallion icon={tierIcon} size={16} className="mx-auto" />
              <p className="text-2xl font-heading text-gold-primary">
                {clients?.filter((c: any) => c.tier === t.id).length || 0}
              </p>
              <p className="text-[10px] text-[#e8e6e1]/75 uppercase tracking-widest mt-1">{t.name}</p>
            </div>
          );
        })}
      </div>

      {/* Client List */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border overflow-hidden">
        <div className="p-4 border-b border-gold-border/30">
          <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
            <UserCog className="w-4 h-4" /> Client Management
          </h2>
        </div>

        {clients && clients.length > 0 ? (
          <div className="divide-y divide-gold-border/10">
            {clients.map((client: any) => {
              const isUpdating = updatingId === client._id;
              const isSyncing = hubspotSyncingId === client._id;
              const syncResult = hubspotResult?.id === client._id ? hubspotResult : null;
              return (
                <div
                  key={client._id}
                  className="px-4 py-3 hover:bg-[#e8c46a]/5 transition-colors"
                >
                <div className="flex items-center gap-4">
                  {/* Status */}
                  <div className="shrink-0">
                    {client.isActivated ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-amber-400" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#e8e6e1] truncate font-medium">
                      {client.userName || client.userEmail || "Unknown"}
                    </p>
                    <p className="text-[10px] text-[#e8e6e1]/75 truncate">{client.userEmail}</p>
                  </div>

                  {/* Tier Selector */}
                  <select
                    value={client.tier || "vault"}
                    onChange={(e) => handleTierChange(client._id, e.target.value)}
                    disabled={isUpdating}
                    className="bg-black border border-gold-border/30 rounded px-2 py-1 text-xs text-[#e8e6e1] focus:outline-none cursor-pointer"
                  >
                    {tiers.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>

                  {/* Activate/Deactivate */}
                  <button
                    onClick={() => handleActivate(client._id, !client.isActivated)}
                    disabled={isUpdating}
                    className={`text-[10px] px-2 py-1 rounded ${
                      client.isActivated
                        ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    } transition-colors`}
                  >
                    {isUpdating ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : client.isActivated ? (
                      "Deactivate"
                    ) : (
                      "Activate"
                    )}
                  </button>

                  {/* View Manual */}
                  <button
                    onClick={() => navigate(`/manual/${client._id}`)}
                    className="text-[10px] text-gold-muted hover:text-gold-primary transition-colors flex items-center gap-1"
                    title="View Manual"
                  >
                    <Eye className="w-3 h-3" />
                  </button>

                  {/* Generate */}
                  <button
                    onClick={() => navigate(`/generate?client=${client._id}`)}
                    className="text-[10px] text-gold-muted hover:text-gold-primary transition-colors flex items-center gap-1"
                    title="Generate Manual"
                  >
                    <FileText className="w-3 h-3" />
                  </button>

                  {/* Push to HubSpot */}
                  <button
                    onClick={() => handlePushToHubSpot(client)}
                    disabled={isSyncing}
                    className="text-[10px] text-gold-muted hover:text-gold-primary transition-colors flex items-center gap-1 disabled:opacity-50"
                    title="Push to HubSpot"
                  >
                    {isSyncing ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <UploadCloud className="w-3 h-3" />
                    )}
                  </button>
                </div>
                {syncResult && (
                  <p className={`text-[10px] mt-1.5 pl-8 ${syncResult.ok ? "text-emerald-400" : "text-red-400"}`}>
                    {syncResult.message}
                  </p>
                )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-[#e8e6e1]/75">
            No clients yet.
          </div>
        )}
      </div>
    </div>
  );
}

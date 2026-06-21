import { useAction, useMutation, useQuery } from "convex/react";
import { BookOpen, CheckCircle as CheckCircle2, Crown, ArrowSquareOut as ExternalLink, Eye, FileText, CircleNotch as Loader2, PaintBrush as Paintbrush, MagnifyingGlass as Search, Gear as Settings, UserGear as UserCog, UserPlus, Users, CloudArrowUp as UploadCloud, CloudArrowDown as DownloadCloud, XCircle } from "@phosphor-icons/react";
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
  const pullFromHubSpot = useAction(api.hubspot.pullContactFromHubSpot);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [hubspotSyncingId, setHubspotSyncingId] = useState<string | null>(null);
  const [hubspotResult, setHubspotResult] = useState<{ id: string; ok: boolean; message: string } | null>(null);
  const [pullingId, setPullingId] = useState<string | null>(null);
  const [pulledData, setPulledData] = useState<{ id: string; properties: Record<string, any> } | null>(null);
  const [showAddClient, setShowAddClient] = useState(false);
  const [addingTierFor, setAddingTierFor] = useState<string | null>(null);
  const [addClientError, setAddClientError] = useState("");
  const addableUsers = useQuery(api.admin.listAddableUsers, showAddClient ? {} : "skip");
  const addClientMutation = useMutation(api.admin.addClient);
  const [searchTerm, setSearchTerm] = useState("");
  const searchResults = useQuery(api.crm.searchClients, searchTerm.trim() ? { search: searchTerm.trim() } : "skip");

  const handleAddClient = async (userId: string, tier: string) => {
    setAddingTierFor(userId);
    setAddClientError("");
    try {
      await addClientMutation({ userId: userId as any, tier: tier as any });
      setShowAddClient(false);
    } catch (err: any) {
      setAddClientError(err?.message || "Could not add this client.");
    } finally {
      setAddingTierFor(null);
    }
  };

  const handlePullFromHubSpot = async (client: any) => {
    setPullingId(client._id);
    setPulledData(null);
    setHubspotResult(null);
    try {
      const result = await pullFromHubSpot({ email: client.userEmail });
      if (result.found) {
        setPulledData({ id: client._id, properties: result.properties || {} });
      } else {
        setHubspotResult({ id: client._id, ok: false, message: result.message || "Not found in HubSpot." });
      }
    } catch (err: any) {
      setHubspotResult({ id: client._id, ok: false, message: err?.message || "Pull failed." });
    } finally {
      setPullingId(null);
    }
  };

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
          <button
            onClick={() => navigate("/admin/prospects")}
            className="flex items-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Users className="w-4 h-4" />
            Prospects
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="flex items-center gap-2 bg-[#0a0a0a] border border-gold-border rounded-xl px-3 py-2.5">
          <Search className="w-4 h-4 text-gold-muted shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="flex-1 bg-transparent text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/50 focus:outline-none"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="text-[#e8e6e1]/50 hover:text-[#e8e6e1]">
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
        {searchTerm.trim() && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#0a0a0a] border border-gold-border rounded-xl z-10 max-h-72 overflow-y-auto">
            {searchResults === undefined ? (
              <p className="text-sm text-[#e8e6e1]/75 p-4">Searching...</p>
            ) : searchResults.length === 0 ? (
              <p className="text-sm text-[#e8e6e1]/75 p-4">No matches.</p>
            ) : (
              searchResults.map((r) => (
                <button
                  key={r.userId}
                  onClick={() => {
                    setSearchTerm("");
                    navigate(`/admin/client/${r.userId}`);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors border-b border-gold-border/10 last:border-0"
                >
                  <div className="w-7 h-7 rounded-full bg-gold-dark/20 flex items-center justify-center shrink-0">
                    <span className="text-gold-primary text-[10px] font-heading">
                      {(r.name || r.email).slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[#e8e6e1] truncate">{r.name || r.email}</p>
                    <p className="text-[10px] text-[#e8e6e1]/75 truncate">{r.email}</p>
                  </div>
                  {r.isClient ? (
                    <span className="text-[9px] bg-gold-dark/20 text-gold-muted px-1.5 py-0.5 rounded-full capitalize shrink-0">
                      {r.tier}
                    </span>
                  ) : (
                    <span className="text-[9px] text-[#e8e6e1]/50 shrink-0">Not a client</span>
                  )}
                </button>
              ))
            )}
          </div>
        )}
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
        <div className="p-4 border-b border-gold-border/30 flex items-center justify-between">
          <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
            <UserCog className="w-4 h-4" /> Client Management
          </h2>
          <button
            onClick={() => setShowAddClient(true)}
            className="flex items-center gap-1.5 bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 text-[10px] font-heading px-3 py-1.5 rounded-lg transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Add Client
          </button>
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
                  className="px-4 py-3 hover:bg-[#e8c46a]/5 transition-colors space-y-2"
                >
                <div className="flex items-center gap-3">
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
                </div>

                <div className="flex flex-wrap items-center gap-2 pl-7">
                  {/* Tier Selector */}
                  <select
                    value={client.tier || "vault"}
                    onChange={(e) => handleTierChange(client._id, e.target.value)}
                    disabled={isUpdating}
                    className="bg-black border border-gold-border/30 rounded px-2 py-1 text-xs text-[#e8e6e1] focus:outline-none cursor-pointer shrink-0"
                  >
                    {tiers.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>

                  {/* Activate/Deactivate */}
                  <button
                    onClick={() => handleActivate(client._id, !client.isActivated)}
                    disabled={isUpdating}
                    className={`text-[10px] px-2 py-1 rounded shrink-0 ${
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

                  {/* View Profile (CRM detail) */}
                  <button
                    onClick={() => navigate(`/admin/client/${client.userId}`)}
                    className="text-[10px] text-gold-muted hover:text-gold-primary transition-colors flex items-center gap-1 shrink-0 p-1"
                    title="View Profile"
                  >
                    <UserCog className="w-3.5 h-3.5" />
                  </button>

                  {/* View Manual */}
                  <button
                    onClick={() => navigate(`/manual/${client.userId}`)}
                    className="text-[10px] text-gold-muted hover:text-gold-primary transition-colors flex items-center gap-1 shrink-0 p-1"
                    title="View Manual"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  {/* Generate */}
                  <button
                    onClick={() => navigate(`/generate?client=${client._id}`)}
                    className="text-[10px] text-gold-muted hover:text-gold-primary transition-colors flex items-center gap-1 shrink-0 p-1"
                    title="Generate Manual"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>

                  {/* Push to HubSpot */}
                  <button
                    onClick={() => handlePushToHubSpot(client)}
                    disabled={isSyncing}
                    className="text-[10px] text-gold-muted hover:text-gold-primary transition-colors flex items-center gap-1 disabled:opacity-50 shrink-0 p-1"
                    title="Push to HubSpot"
                  >
                    {isSyncing ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <UploadCloud className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Pull from HubSpot */}
                  <button
                    onClick={() => handlePullFromHubSpot(client)}
                    disabled={pullingId === client._id}
                    className="text-[10px] text-gold-muted hover:text-gold-primary transition-colors flex items-center gap-1 disabled:opacity-50 shrink-0 p-1"
                    title="Pull from HubSpot"
                  >
                    {pullingId === client._id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <DownloadCloud className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {syncResult && (
                  <div className="flex items-center gap-2 mt-1.5 pl-8">
                    <p className={`text-[10px] ${syncResult.ok ? "text-emerald-400" : "text-red-400"}`}>
                      {syncResult.message}
                    </p>
                    {syncResult.ok && (
                      <button
                        onClick={() => navigate(`/admin/client/${client.userId}`)}
                        className="text-[10px] text-gold-primary hover:underline flex items-center gap-0.5"
                      >
                        <ExternalLink className="w-2.5 h-2.5" /> Go to Portal Profile
                      </button>
                    )}
                  </div>
                )}
                {pulledData?.id === client._id && (
                  <div className="text-[10px] mt-1.5 pl-8 text-[#e8e6e1]/80 space-y-0.5">
                    <p className="text-gold-muted">From HubSpot:</p>
                    {Object.entries(pulledData.properties)
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <p key={k}>
                          <span className="text-[#e8e6e1]/50">{k}:</span> {String(v)}
                        </p>
                      ))}
                  </div>
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

      {showAddClient && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70"
          onClick={() => setShowAddClient(false)}
        >
          <div
            className="bg-[#0a0a0a] border border-gold-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm max-h-[70vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gold-border/20">
              <h2 className="font-heading text-sm text-gold-primary">Add Client</h2>
              <button onClick={() => setShowAddClient(false)} className="text-[#e8e6e1]/75">
                <XCircle className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {addClientError && (
                <p className="text-xs text-red-400 bg-red-400/10 m-3 rounded-lg px-3 py-2">{addClientError}</p>
              )}
              {addableUsers === undefined ? (
                <p className="text-sm text-[#e8e6e1]/75 p-4">Loading...</p>
              ) : addableUsers.length === 0 ? (
                <p className="text-sm text-[#e8e6e1]/75 p-4">
                  No registered users available to add. They need to create a portal
                  account first, then they'll show up here.
                </p>
              ) : (
                addableUsers.map((u) => (
                  <div
                    key={u.userId}
                    className="flex items-center gap-3 px-4 py-3 border-b border-gold-border/10"
                  >
                    <div className="w-8 h-8 rounded-full bg-gold-dark/20 flex items-center justify-center shrink-0">
                      <span className="text-gold-primary text-xs font-heading">
                        {(u.name || u.email).slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-[#e8e6e1] truncate">{u.name || u.email}</p>
                      {u.name && <p className="text-xs text-[#e8e6e1]/75 truncate">{u.email}</p>}
                    </div>
                    <select
                      defaultValue=""
                      disabled={addingTierFor === u.userId}
                      onChange={(e) => handleAddClient(u.userId, e.target.value)}
                      className="bg-black border border-gold-border/30 rounded px-2 py-1 text-xs text-[#e8e6e1] focus:outline-none cursor-pointer shrink-0"
                    >
                      <option value="" disabled>
                        {addingTierFor === u.userId ? "Adding..." : "Add as..."}
                      </option>
                      {tiers.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

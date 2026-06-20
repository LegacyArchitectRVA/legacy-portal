import { useQuery, useMutation } from "convex/react";
import { User, Save, Check, Camera, Crown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { api } from "../../convex/_generated/api";

export default function ProfilePage() {
  const profile = useQuery(api.profile.getMyProfile);
  const updateProfile = useMutation(api.profile.updateProfile);
  const generateUploadUrl = useMutation(api.profile.generateUploadUrl);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [crestPreview, setCrestPreview] = useState<string | null>(null);
  const profilePicRef = useRef<HTMLInputElement>(null);
  const crestRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhone(profile.phoneNumber || "");
      if (profile.profilePicUrl) setProfilePicPreview(profile.profilePicUrl);
      if (profile.crestUrl) setCrestPreview(profile.crestUrl);
    }
  }, [profile]);

  const handleImageUpload = async (file: File, type: "profilePic" | "crest") => {
    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();
      
      if (type === "profilePic") {
        await updateProfile({ profilePicId: storageId });
        setProfilePicPreview(URL.createObjectURL(file));
      } else {
        await updateProfile({ crestId: storageId });
        setCrestPreview(URL.createObjectURL(file));
      }
    } catch (e) {
      console.error("Upload failed:", e);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ name, phoneNumber: phone });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tierLabel = profile?.tier
    ? profile.tier.charAt(0).toUpperCase() + profile.tier.slice(1)
    : "Vault";
  const accessLabel = profile?.isAdmin ? "Administrator" : `${tierLabel} Edition`;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#e8e6e1]">Profile</h1>
        <p className="text-sm text-[#e8e6e1]/80 mt-1">
          Manage your account information
        </p>
      </div>

      <div className="bg-[#0a0a0a] rounded-xl p-6 gold-border-glow space-y-6">
        {/* Profile Picture & Info — stacked on mobile */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Profile Picture */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 rounded-full bg-[#111] flex items-center justify-center border-2 border-[rgba(217,204,160,0.15)] overflow-hidden shadow-[0_0_15px_rgba(217,204,160,0.06)]">
              {profilePicPreview ? (
                <img src={profilePicPreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-[#d9cca0]/75" />
              )}
            </div>
            <button
              type="button"
              onClick={() => profilePicRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-gold-bright to-gold-dark flex items-center justify-center text-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={profilePicRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImageUpload(f, "profilePic");
              }}
            />
          </div>

          {/* Name & Info */}
          <div className="flex-1 text-center sm:text-left">
            <p className="font-heading text-xl font-semibold text-[#e8e6e1]">
              {profile?.name || "Your Name"}
            </p>
            <p className="text-sm text-[#e8e6e1]/80 mt-0.5">{profile?.email}</p>
            <p className="text-sm text-[#d9cca0]/70 capitalize mt-0.5 font-heading">
              {accessLabel}
            </p>
          </div>

          {/* Family Crest */}
          <div className="relative group shrink-0 w-full sm:w-auto">
            <div className="w-24 h-24 rounded-xl bg-[#111] flex flex-col items-center justify-center border-2 border-[rgba(217,204,160,0.15)] overflow-hidden gap-1 shadow-[0_0_15px_rgba(217,204,160,0.06)] mx-auto">
              {crestPreview ? (
                <img src={crestPreview} alt="Family Crest" className="w-full h-full object-contain p-2" />
              ) : (
                <>
                  <Crown className="w-8 h-8 text-[#d9cca0]/70" />
                  <span className="text-[9px] text-[#d9cca0]/70 font-heading uppercase tracking-wider">Crest</span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => crestRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-gold-bright to-gold-dark flex items-center justify-center text-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={crestRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImageUpload(f, "crest");
              }}
            />
            <p className="text-[9px] text-[#e8e6e1]/75 mt-1.5 text-center font-heading tracking-wide">Family Crest</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#e8e6e1]/80 mb-1.5 font-heading uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-[rgba(217,204,160,0.15)] rounded-lg px-4 py-3 text-sm text-[#e8e6e1] focus:outline-none focus:border-[#d9cca0]/40 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-[#e8e6e1]/80 mb-1.5 font-heading uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={profile?.email || ""}
              disabled
              className="w-full bg-black border border-[rgba(217,204,160,0.08)] rounded-lg px-4 py-3 text-sm text-[#e8e6e1]/75 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs text-[#e8e6e1]/80 mb-1.5 font-heading uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full bg-black border border-[rgba(217,204,160,0.15)] rounded-lg px-4 py-3 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/35 focus:outline-none focus:border-[#d9cca0]/40 transition-colors"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn-gold px-6 py-2.5 text-sm flex items-center gap-2"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

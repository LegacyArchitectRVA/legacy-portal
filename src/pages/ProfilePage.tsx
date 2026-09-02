import {
  RiVipCrownLine as Crown,
  RiLoader4Line as Loader2,
} from "@remixicon/react";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { Camera, Check, Save, User } from "reicon-react";
import { api } from "../../convex/_generated/api";
import { EditableText } from "../components/EditableText";
import { FullPageLoader } from "../components/FullPageLoader";
import { OrientationTour } from "../components/OrientationTour";

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function ProfilePage() {
  const profile = useQuery(api.profile.getMyProfile);
  const updateProfile = useMutation(api.profile.updateProfile);
  const generateUploadUrl = useMutation(api.profile.generateUploadUrl);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    null,
  );
  const [crestPreview, setCrestPreview] = useState<string | null>(null);
  const [uploadingType, setUploadingType] = useState<
    "profilePic" | "crest" | null
  >(null);
  const [uploadError, setUploadError] = useState("");
  const profilePicRef = useRef<HTMLInputElement>(null);
  const crestRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhone(formatPhoneNumber(profile.phoneNumber || ""));
      if (profile.profilePicUrl) setProfilePicPreview(profile.profilePicUrl);
      if (profile.crestUrl) setCrestPreview(profile.crestUrl);
    }
  }, [profile]);

  const handleImageUpload = async (
    file: File,
    type: "profilePic" | "crest",
  ) => {
    setUploadError("");
    setUploadingType(type);
    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!result.ok) {
        throw new Error(`Upload failed (${result.status}).`);
      }
      const { storageId } = await result.json();
      if (!storageId) {
        throw new Error("Upload didn't return a file reference.");
      }

      if (type === "profilePic") {
        await updateProfile({ profilePicId: storageId });
      } else {
        await updateProfile({ crestId: storageId });
      }
    } catch (e) {
      console.error("Upload failed:", e);
      setUploadError(
        type === "profilePic"
          ? "Couldn't upload that photo. Try again."
          : "Couldn't upload that crest. Try again.",
      );
    } finally {
      setUploadingType(null);
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
    : "Personal";
  const accessLabel = profile?.isAdmin
    ? "Administrator"
    : `${tierLabel} Edition`;

  if (profile === undefined) {
    return <FullPageLoader />;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
      <OrientationTour />

      <div>
        <h1 className="font-heading text-2xl font-bold text-[#f2ede2]">
          <EditableText cmsKey="profile_title" as="span" />
        </h1>
        <p className="text-sm text-[#f2ede2]/80 mt-1">
          Manage your account information
        </p>
      </div>

      <div className="bg-[#0f0c08] rounded-xl p-6 gold-border-glow space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative group shrink-0">
            <div className="w-[96px] h-[96px] rounded-full bg-[#111] flex items-center justify-center border-2 border-[rgba(212, 182, 97,0.15)] overflow-hidden shadow-[0_0_15px_rgba(212, 182, 97,0.06)]">
              {profilePicPreview ? (
                <img
                  src={profilePicPreview}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={() => {
                    setProfilePicPreview(null);
                    setUploadError(
                      "Your photo saved, but the image itself won't load right now. Try uploading it again.",
                    );
                  }}
                />
              ) : (
                <User className="w-12 h-12 text-[#d4b661]/75" />
              )}
            </div>
            <button
              type="button"
              onClick={() => profilePicRef.current?.click()}
              disabled={uploadingType === "profilePic"}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-gold-bright to-gold-dark flex items-center justify-center text-black shadow-lg opacity-60 group-hover:opacity-100 transition-opacity disabled:opacity-90"
            >
              {uploadingType === "profilePic" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Camera className="w-4 h-4" />
              )}
            </button>
            <input
              ref={profilePicRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const f = e.target.files?.[0];
                if (f) handleImageUpload(f, "profilePic");
              }}
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <p className="font-heading text-xl font-semibold text-[#f2ede2]">
              {profile?.name || "Your Name"}
            </p>
            <p className="text-sm text-[#f2ede2]/80 mt-0.5">{profile?.email}</p>
            <p className="text-sm text-[#d4b661]/70 capitalize mt-0.5 font-heading">
              {accessLabel}
            </p>
          </div>

          <div className="relative group shrink-0 w-full sm:w-auto">
            <div className="w-[96px] h-[96px] rounded-xl bg-[#111] flex flex-col items-center justify-center border-2 border-[rgba(212, 182, 97,0.15)] overflow-hidden gap-1 shadow-[0_0_15px_rgba(212, 182, 97,0.06)] mx-auto">
              {crestPreview ? (
                <img
                  src={crestPreview}
                  alt=""
                  className="w-full h-full object-contain p-2"
                  onError={() => {
                    setCrestPreview(null);
                    setUploadError(
                      "Your crest saved, but the image itself won't load right now. Try uploading it again.",
                    );
                  }}
                />
              ) : (
                <>
                  <Crown className="w-8 h-8 text-[#d4b661]/70" />
                  <span className="text-[9px] text-[#d4b661]/70 font-heading uppercase tracking-wider">
                    Crest
                  </span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => crestRef.current?.click()}
              disabled={uploadingType === "crest"}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-gold-bright to-gold-dark flex items-center justify-center text-black shadow-lg opacity-60 group-hover:opacity-100 transition-opacity disabled:opacity-90"
            >
              {uploadingType === "crest" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Camera className="w-4 h-4" />
              )}
            </button>
            <input
              ref={crestRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const f = e.target.files?.[0];
                if (f) handleImageUpload(f, "crest");
              }}
            />
            <p className="text-[9px] text-[#f2ede2]/75 mt-1.5 text-center font-heading tracking-wide">
              Family Crest
            </p>
          </div>
        </div>

        {uploadError && (
          <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
            {uploadError}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#f2ede2]/80 mb-1.5 font-heading uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-black border border-[rgba(212, 182, 97,0.15)] rounded-lg px-4 py-3 text-sm text-[#f2ede2] focus:outline-none focus:border-[#d4b661]/40 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-[#f2ede2]/80 mb-1.5 font-heading uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={profile?.email || ""}
              disabled
              className="w-full bg-black border border-[rgba(212, 182, 97,0.08)] rounded-lg px-4 py-3 text-sm text-[#f2ede2]/75 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs text-[#f2ede2]/80 mb-1.5 font-heading uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(formatPhoneNumber(e.target.value))}
              placeholder="(555) 123-4567"
              className="w-full bg-black border border-[rgba(212, 182, 97,0.15)] rounded-lg px-4 py-3 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/35 focus:outline-none focus:border-[#d4b661]/40 transition-colors"
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

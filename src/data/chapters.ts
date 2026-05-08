// Complete Chapter & Sub-Section Definitions
// 39 sub-sections across 7 chapters - matches AFFiNE Life Manual structure exactly.
// Chapter order per Operating Manual: "This order may not be altered."

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface FieldDef {
  id: string;
  label: string;
  type: "text" | "textarea" | "checkbox";
  placeholder?: string;
}

export interface SubSection {
  id: string;
  title: string;
  description: string;
  howToUse: string;
  tableColumns: TableColumn[];
  fields?: FieldDef[];
  structuralRules?: string[];
  crossRefs?: string[];
  icon: string; // Lucide icon name
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  shortTitle: string;
  description: string;
  color: string;
  colorName: string;
  tier: "vault" | "archive" | "legacy";
  subSections: SubSection[];
}

const PRIVACY_DISCLAIMER =
  "This section provides high-level orientation and location guidance. It does not contain passwords, security codes, recovery keys, full account numbers, or sensitive credentials. Nothing here replaces formal legal documents or professional advice. Refer to original records and trusted advisors as appropriate.";

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 1: DIGITAL LIFE
// ═══════════════════════════════════════════════════════════════════
const ch01: Chapter = {
  id: "digital",
  chapterNumber: 1,
  title: "Digital & Access Systems",
  shortTitle: "Digital Life",
  description:
    "High-level map of digital systems. Linked sections define operational role, authority structure, recovery location, and transition handling.",
  color: "#3B82F6",
  colorName: "blue",
  tier: "vault",
  subSections: [
    {
      id: "cloud_storage",
      title: "Cloud Storage",
      icon: "Cloud",
      description:
        "This section outlines primary cloud storage platforms and where key digital records are maintained.",
      howToUse:
        "Use this section to identify storage platforms, high-level content categories, and access authority.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "18%" },
        { key: "impact", label: "Operational Impact", width: "22%" },
        { key: "authority", label: "Authority / Location", width: "20%" },
        { key: "records", label: "Where Records Live", width: "20%" },
        { key: "transition", label: "Transition Guidance", width: "20%" },
      ],
    },
    {
      id: "communication_messaging",
      title: "Communication & Messaging",
      icon: "MessageSquare",
      description:
        "This section outlines primary communication platforms and their operational role.",
      howToUse:
        "Use this page to identify communication platforms, typical contacts, and continuity handling.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "16%" },
        { key: "impact", label: "Operational Impact", width: "20%" },
        { key: "context", label: "Context / Stakeholders", width: "20%" },
        { key: "escalation", label: "Escalation Priority", width: "20%" },
        { key: "transition", label: "Transition Instruction", width: "24%" },
      ],
    },
    {
      id: "devices_os",
      title: "Devices & Operating Systems",
      icon: "Laptop",
      description: "This section outlines primary devices and the access they may hold.",
      howToUse:
        "Use this page to identify device categories, associated access, and retention guidance.",
      tableColumns: [
        { key: "device", label: "Device Category", width: "16%" },
        { key: "os", label: "Operating System", width: "18%" },
        { key: "access", label: "What It Provides Access To", width: "22%" },
        { key: "managed", label: "Access Managed Where", width: "22%" },
        { key: "retention", label: "Retention Instruction", width: "22%" },
      ],
      structuralRules: [
        "Devices often contain saved access, recent files, and active sessions.",
        "Preserve until access and continuity are fully reviewed.",
      ],
    },
    {
      id: "digital_financial",
      title: "Digital Financial Accounts",
      icon: "CreditCard",
      description:
        "This section outlines digital financial platform categories and where authoritative records are maintained.",
      howToUse:
        "Use this section to identify digital financial platforms, account access, and continuity handling.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "18%" },
        { key: "impact", label: "Operational Impact", width: "22%" },
        { key: "authority", label: "Authority / Location", width: "20%" },
        { key: "records", label: "Where Records Live", width: "20%" },
        { key: "transition", label: "Transition Guidance", width: "20%" },
      ],
    },
    {
      id: "password_manager",
      title: "Password Manager",
      icon: "KeyRound",
      description:
        "This section identifies the password management system used and how access authority is structured at a high level.",
      howToUse:
        "Use this section to understand the credential vault system and succession access path.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "20%" },
        { key: "impact", label: "Operational Impact", width: "25%" },
        { key: "authority", label: "Authority / Location", width: "25%" },
        { key: "transition", label: "Transition Guidance", width: "30%" },
      ],
    },
    {
      id: "primary_email",
      title: "Primary E-Mail",
      icon: "Mail",
      description:
        "This section outlines primary and recovery email accounts and their role in identity verification, account access, and communication systems.",
      howToUse:
        "Use this page to identify email roles, access authority, and recovery structure.",
      tableColumns: [
        { key: "account", label: "Email Account", width: "16%" },
        { key: "impact", label: "Operational Impact", width: "22%" },
        { key: "authority", label: "Authority / Location", width: "20%" },
        { key: "recovery", label: "Recovery Structure", width: "20%" },
        { key: "transition", label: "Transition Guidance", width: "22%" },
      ],
    },
    {
      id: "subscriptions_renewals",
      title: "Subscriptions & Renewals",
      icon: "RefreshCw",
      description: "This section outlines recurring digital services and renewal structures.",
      howToUse:
        "Use this page to identify renewal status, billing source, continuity impact, and recommended action.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "18%" },
        { key: "impact", label: "Operational Impact", width: "20%" },
        { key: "authority", label: "Authority / Location", width: "20%" },
        { key: "records", label: "Where Records Live", width: "20%" },
        { key: "transition", label: "Transition Guidance", width: "22%" },
      ],
      crossRefs: ["Digital Financial Accounts", "Accounts & Institutions"],
    },
    {
      id: "twofa_recovery",
      title: "2FA & Recovery Codes",
      icon: "ShieldCheck",
      description: "This section outlines protection methods and recovery structure.",
      howToUse:
        "Use this page to identify protection methods, recovery material locations, and escalation timing.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "22%" },
        { key: "impact", label: "Operational Impact", width: "26%" },
        { key: "authority", label: "Authority / Location", width: "26%" },
        { key: "transition", label: "Transition Guidance", width: "26%" },
      ],
      structuralRules: [
        "This section describes structure and readiness, not direct access instructions.",
        "If access issues arise, preserve existing security settings first and review recovery locations before making any changes.",
      ],
    },
    {
      id: "online_presence",
      title: "Online Presence",
      icon: "Globe",
      description:
        "This section identifies platform accounts, social media profiles, and online properties.",
      howToUse:
        "Use this page to identify online accounts, ownership, and disposition guidance.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "14%" },
        { key: "impact", label: "Operational Impact", width: "16%" },
        { key: "authority", label: "Authority / Location", width: "16%" },
        { key: "records", label: "Where Records Live", width: "18%" },
        { key: "owner", label: "Primary Owner / Authorized", width: "16%" },
        { key: "transition", label: "Transition Guidance", width: "20%" },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 2: EMERGENCY & SUCCESSOR
// ═══════════════════════════════════════════════════════════════════
const ch02: Chapter = {
  id: "emergency",
  chapterNumber: 2,
  title: "Emergency & Successor Orientation",
  shortTitle: "Emergency",
  description:
    "In moments of urgency or uncertainty, this section exists to reduce confusion and establish calm direction.",
  color: "#F43F5E",
  colorName: "rose",
  tier: "vault",
  subSections: [
    {
      id: "emergency_contacts",
      title: "Emergency Contacts",
      icon: "Phone",
      description:
        "This section is here to provide clarity during moments when decisions may feel urgent, emotional, or overwhelming.",
      howToUse:
        "Use this table to determine: Who to call, When to involve them, Where their documents are stored.",
      tableColumns: [
        { key: "name", label: "Name / Role", width: "20%" },
        { key: "scope", label: "Authority Scope", width: "25%" },
        { key: "trigger", label: "Trigger for Involvement", width: "25%" },
        { key: "documents", label: "Where Documents Live", width: "30%" },
      ],
      structuralRules: ["Confirm authority before disclosing sensitive information."],
    },
    {
      id: "final_wishes",
      title: "Final Wishes",
      icon: "Heart",
      description:
        "This page is meant to share personal values, wishes, and context during a difficult and uncertain time.",
      howToUse:
        "Use this page to understand where specific wishes or personal guidance are documented.",
      tableColumns: [],
      fields: [
        {
          id: "care_preferences",
          label: "Care Preferences",
          type: "textarea",
          placeholder:
            "High-level thoughts about medical care, comfort, and quality-of-life decisions...",
        },
        {
          id: "memorial_remembrance",
          label: "Memorial & Remembrance",
          type: "textarea",
          placeholder:
            "Personal preferences related to services, gatherings, remembrance...",
        },
        {
          id: "personal_messages",
          label: "Personal Messages",
          type: "textarea",
          placeholder: "Letters, reflections, or notes intended for loved ones...",
        },
        {
          id: "sentimental_items",
          label: "Items of Personal or Sentimental Importance",
          type: "textarea",
          placeholder:
            "Guidance regarding meaningful belongings, keepsakes, or items of emotional significance...",
        },
      ],
      structuralRules: [
        "High-level intent, not legal detail.",
        "These reflections are not legal instructions and are not a replacement for formal documents.",
      ],
      crossRefs: ["Identification Documents", "Medical Information", "Insurance Policies"],
    },
    {
      id: "first_48_hours",
      title: "First 48-Hours Plan",
      icon: "Clock",
      description: "Immediate stabilization and priority decisions for the first 48 hours.",
      howToUse:
        "Follow the stabilization steps in order before making changes to accounts or systems.",
      tableColumns: [
        { key: "decision", label: "Decision", width: "30%" },
        { key: "context", label: "Context / Deadline", width: "35%" },
        { key: "action", label: "Action / Location", width: "35%" },
      ],
      fields: [
        {
          id: "crisis_step1",
          label: "Step 1: Secure the Home",
          type: "textarea",
          placeholder: "Security system status, keys, primary access points...",
        },
        {
          id: "crisis_step2",
          label: "Step 2: Access the Life Manual",
          type: "textarea",
          placeholder: "Confirm access to the Life Manual and related documents...",
        },
        {
          id: "crisis_step3",
          label: "Step 3: Contact Key People",
          type: "textarea",
          placeholder: "Who to notify first, in what order...",
        },
        {
          id: "crisis_step4",
          label: "Step 4: Secure Financial Systems",
          type: "textarea",
          placeholder: "Preserve accounts, do not close or transfer without review...",
        },
        {
          id: "crisis_step5",
          label: "Step 5: Review Legal Documents",
          type: "textarea",
          placeholder: "Locate will, POA, trust documents, advance directives...",
        },
      ],
      crossRefs: [
        "Emergency Contacts",
        "Digital Life",
        "Financial & Assets",
        "Home Systems & Shut-offs",
      ],
    },
    {
      id: "child_care_dependents",
      title: "Child Care & Dependents",
      icon: "Users",
      description:
        "This section outlines legal guardianship, temporary care designations, and operational responsibilities for dependents.",
      howToUse:
        "Use this page to confirm: Who has legal decision-making authority, Who provides immediate short-term care.",
      tableColumns: [
        { key: "dependent", label: "Dependent Name", width: "15%" },
        { key: "guardian", label: "Legal Guardian / Authority", width: "20%" },
        { key: "shortterm", label: "Short-Term Care Contact", width: "20%" },
        { key: "docs", label: "Key Documents Location", width: "20%" },
        { key: "routines", label: "Routines / Notes", width: "25%" },
      ],
      structuralRules: [
        "Do not rely on assumptions. Confirm authority before making permanent decisions.",
      ],
      crossRefs: [
        "First 48-Hours Plan",
        "Emergency Contacts",
        "Medical Information",
        "Insurance Policies",
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 3: FINANCIAL & ASSETS
// ═══════════════════════════════════════════════════════════════════
const ch03: Chapter = {
  id: "financial",
  chapterNumber: 3,
  title: "Financial & Asset Orientation",
  shortTitle: "Financial",
  description:
    "High-level map of accounts, institutions, beneficiaries, and ownership structures.",
  color: "#D4AF37",
  colorName: "gold",
  tier: "archive",
  subSections: [
    {
      id: "titles_ownership",
      title: "Titles & Ownership",
      icon: "FileText",
      description:
        "This section clarifies how key assets are legally owned so a successor understands who has authority.",
      howToUse:
        "Use this section to identify asset types, ownership structure, title locations, and transfer requirements.",
      tableColumns: [
        { key: "asset", label: "Asset / Account Type", width: "20%" },
        { key: "ownership", label: "Ownership Structure", width: "20%" },
        { key: "title_location", label: "Where Title Lives", width: "30%" },
        { key: "transfer", label: "Transfer Notes", width: "30%" },
      ],
    },
    {
      id: "beneficiaries",
      title: "Beneficiaries Overview",
      icon: "UserCheck",
      description:
        "Clear overview of how beneficiaries are designated across financial accounts, insurance policies, and legal documents.",
      howToUse:
        "Use this section to review beneficiary designations and confirm they align with current intentions.",
      tableColumns: [
        { key: "account", label: "Account / Policy", width: "20%" },
        { key: "institution", label: "Institution", width: "18%" },
        { key: "primary", label: "Primary Beneficiary", width: "18%" },
        { key: "contingent", label: "Contingent Beneficiary", width: "18%" },
        { key: "verification", label: "Verification Location", width: "26%" },
      ],
    },
    {
      id: "accounts_institutions",
      title: "Accounts & Institutions",
      icon: "Building",
      description:
        "This section documents where financial accounts exist, who has signing authority, and how access is structured.",
      howToUse:
        "Use this section to identify all financial accounts, their purpose, and access information.",
      tableColumns: [
        { key: "institution", label: "Institution", width: "16%" },
        { key: "account_type", label: "Account Type", width: "14%" },
        { key: "purpose", label: "Purpose", width: "18%" },
        { key: "authority", label: "Authority / Location", width: "18%" },
        { key: "records", label: "Where Records Live", width: "16%" },
        { key: "transition", label: "Transition Guidance", width: "18%" },
      ],
    },
    {
      id: "insurance_policies",
      title: "Insurance Policies",
      icon: "Shield",
      description:
        "This section documents active insurance policies, coverage types, and claim procedures.",
      howToUse:
        "Use this section to identify all active policies, verify coverage status, and understand claim procedures.",
      tableColumns: [
        { key: "policy_type", label: "Policy Type", width: "14%" },
        { key: "carrier", label: "Carrier / Provider", width: "16%" },
        { key: "purpose", label: "Coverage Purpose", width: "18%" },
        { key: "authority", label: "Authority / Location", width: "18%" },
        { key: "owner", label: "Primary Owner / Authorized", width: "16%" },
        { key: "transition", label: "Transition Guidance", width: "18%" },
      ],
      structuralRules: [
        "Do not allow policies to lapse during transition.",
        "Confirm active coverage status before making structural decisions.",
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 4: HOUSEHOLD CONTINUITY
// ═══════════════════════════════════════════════════════════════════
const ch04: Chapter = {
  id: "household",
  chapterNumber: 4,
  title: "Household Continuity",
  shortTitle: "Household",
  description:
    "Physical systems, routines, access considerations, and operational stability.",
  color: "#10B981",
  colorName: "emerald",
  tier: "vault",
  subSections: [
    {
      id: "home_systems",
      title: "Home Systems & Shut-offs",
      icon: "Wrench",
      description:
        "Centralized view of major home systems, primary controls, and emergency shut-off locations.",
      howToUse:
        "Use this section to understand what systems exist, where primary controls are located, and when shutoff may be appropriate.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "16%" },
        { key: "why", label: "Why It Matters", width: "20%" },
        { key: "controls", label: "Where Controls Live", width: "20%" },
        { key: "shutdown", label: "Shutdown Guidance", width: "22%" },
        { key: "routines", label: "Key Routines / Timers", width: "22%" },
      ],
    },
    {
      id: "security_access",
      title: "Security & Access",
      icon: "Lock",
      description:
        "This page identifies key physical and digital access systems and clarifies role-based authority.",
      howToUse:
        "Use this section to understand what security systems exist and how access authority is structured.",
      tableColumns: [
        { key: "system", label: "System / Access Area", width: "18%" },
        { key: "type", label: "Type (Physical/Digital)", width: "16%" },
        { key: "managed", label: "Where Managed", width: "18%" },
        { key: "authority", label: "Authority / Location", width: "24%" },
        { key: "transition", label: "Transition Guidance", width: "24%" },
      ],
      structuralRules: [
        "Specific codes, passwords, keys, or credentials are intentionally stored elsewhere.",
      ],
    },
    {
      id: "petcare",
      title: "Petcare",
      icon: "PawPrint",
      description:
        "This section documents pet care needs, veterinary information, and care instructions.",
      howToUse: "Use this section to understand immediate and ongoing pet care needs.",
      tableColumns: [],
      fields: [
        {
          id: "pet_name",
          label: "Pet Name(s)",
          type: "text",
          placeholder: "Name, species, breed...",
        },
        {
          id: "medications",
          label: "Medications",
          type: "textarea",
          placeholder: "Current medications, dosage and timing, storage location...",
        },
        {
          id: "vet_info",
          label: "Vet Information",
          type: "textarea",
          placeholder:
            "Primary veterinarian, clinic name and phone, emergency animal hospital...",
        },
        {
          id: "care_instructions",
          label: "Care Instructions",
          type: "textarea",
          placeholder:
            "Personality traits, behavior notes, grooming routine, preferred caregiver...",
        },
        {
          id: "feeding",
          label: "Feeding Schedule & Diet",
          type: "textarea",
          placeholder: "Food type, portion size, feeding times, dietary restrictions...",
        },
      ],
    },
    {
      id: "vehicle_info",
      title: "Vehicle Information",
      icon: "Car",
      description:
        "Identifies vehicles owned and where key documents and access details are located.",
      howToUse: "Use this section to locate vehicle documents and access information.",
      tableColumns: [
        { key: "vehicle", label: "Vehicle (Make/Model/Year)", width: "20%" },
        { key: "vin", label: "VIN", width: "16%" },
        { key: "plate", label: "License Plate", width: "12%" },
        { key: "title_loc", label: "Title Stored In", width: "22%" },
        { key: "keys", label: "Keys & Access", width: "14%" },
        { key: "insurance", label: "Insurance Reference", width: "16%" },
      ],
      crossRefs: ["Insurance Policies"],
    },
    {
      id: "maintenance_schedules",
      title: "Maintenance Schedules",
      icon: "Calendar",
      description:
        "Document routine maintenance patterns so household responsibilities can continue without disruption.",
      howToUse:
        "Use this page to understand what maintenance occurs, how often, and who is responsible.",
      tableColumns: [
        { key: "task", label: "Task / System", width: "22%" },
        { key: "frequency", label: "Frequency", width: "22%" },
        { key: "responsible", label: "Responsible Party", width: "22%" },
        { key: "records", label: "Records Location", width: "34%" },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 5: VITAL RECORDS
// ═══════════════════════════════════════════════════════════════════
const ch05: Chapter = {
  id: "vitals",
  chapterNumber: 5,
  title: "Vital Records",
  shortTitle: "Vital Records",
  description:
    "Legal, medical, identification, and insurance documentation locations.",
  color: "#FFFFFF",
  colorName: "white",
  tier: "vault",
  subSections: [
    {
      id: "identification_documents",
      title: "Identification Documents",
      icon: "Fingerprint",
      description: "Overview of critical identification documents and storage locations.",
      howToUse:
        "Use this page to locate identification documents when verification is required.",
      tableColumns: [
        { key: "document", label: "Document", width: "18%" },
        { key: "person", label: "Person", width: "14%" },
        { key: "original", label: "Original Location", width: "22%" },
        { key: "digital", label: "Digital Copy Location", width: "24%" },
        { key: "notes", label: "Notes", width: "22%" },
      ],
    },
    {
      id: "medical_information",
      title: "Medical Information",
      icon: "Stethoscope",
      description:
        "This section documents medical directives, providers, and health care coordination.",
      howToUse:
        "Use this section to identify medical authorities, directive locations, and active provider relationships.",
      tableColumns: [
        { key: "document", label: "Document / Directive", width: "18%" },
        { key: "authority", label: "Governing Authority", width: "20%" },
        { key: "location", label: "Document Location", width: "24%" },
        { key: "guidance", label: "Activation / Guidance", width: "38%" },
      ],
    },
    {
      id: "medical_providers",
      title: "Active Medical Providers",
      icon: "Hospital",
      description: "Active medical provider relationships and coordination guidance.",
      howToUse:
        "Use this section to identify active providers, contact coordination guidance, and records locations.",
      tableColumns: [
        { key: "practice", label: "Practice / Specialty", width: "16%" },
        { key: "authority", label: "Governing Authority", width: "18%" },
        { key: "directives", label: "Directives Ref. Location", width: "22%" },
        { key: "coordination", label: "Coordination Guidance", width: "22%" },
        { key: "records", label: "Records Location", width: "22%" },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 6: CONTEXT & LEGACY WISHES
// ═══════════════════════════════════════════════════════════════════
const ch06: Chapter = {
  id: "context",
  chapterNumber: 6,
  title: "Context & Legacy Wishes",
  shortTitle: "Context",
  description:
    "Additional areas included based on circumstances, priorities, or professional responsibilities held.",
  color: "#A855F7",
  colorName: "purple",
  tier: "archive",
  subSections: [
    {
      id: "digital_narrative_control",
      title: "Digital & Narrative Control",
      icon: "Megaphone",
      description:
        "Guidance on how digital identity, public narrative, and online presence should be handled during transition.",
      howToUse:
        "Use this section to document preferences for managing public accounts and narrative decisions.",
      tableColumns: [
        { key: "platform", label: "Platform / Channel", width: "18%" },
        { key: "action", label: "Preferred Action", width: "22%" },
        { key: "authority", label: "Who Has Authority", width: "20%" },
        { key: "timing", label: "Timing / Trigger", width: "18%" },
        { key: "notes", label: "Notes", width: "22%" },
      ],
    },
    {
      id: "personal_values",
      title: "Personal Values & Context",
      icon: "Sparkles",
      description:
        "This section captures values, guiding principles, and context that informs decision-making during transition.",
      howToUse:
        "Use this section to provide emotional context and values guidance for the successor.",
      tableColumns: [],
      fields: [
        {
          id: "core_values",
          label: "Core Values & Guiding Principles",
          type: "textarea",
          placeholder:
            "What matters most? What principles should guide decisions made on your behalf...",
        },
        {
          id: "family_context",
          label: "Family Context & Dynamics",
          type: "textarea",
          placeholder:
            "Important family dynamics, relationships, or sensitivities a successor should understand...",
        },
        {
          id: "charitable",
          label: "Charitable & Philanthropic Intentions",
          type: "textarea",
          placeholder:
            "Organizations, causes, or giving plans you want continued or honored...",
        },
        {
          id: "personal_notes",
          label: "Personal Notes & Reflections",
          type: "textarea",
          placeholder:
            "Any additional context, explanations, or guidance for your successor...",
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 7: BUSINESS CONTINUITY
// ═══════════════════════════════════════════════════════════════════
const ch07: Chapter = {
  id: "business",
  chapterNumber: 7,
  title: "Business Continuity",
  shortTitle: "Business",
  description:
    "Business-specific systems and governance. Designed to support continuity decisions, not day-to-day operation.",
  color: "#94A3B8",
  colorName: "silver",
  tier: "legacy",
  subSections: [
    {
      id: "business_systems",
      title: "Business-Specific Continuity",
      icon: "Server",
      description:
        "This section identifies the digital systems, platforms, and tools critical to business operations.",
      howToUse:
        "Use this section to identify business platforms, access authority, and transition handling.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "14%" },
        { key: "impact", label: "Operational Impact", width: "16%" },
        { key: "authority", label: "Authority / Location", width: "16%" },
        { key: "records", label: "Where Records Live", width: "18%" },
        { key: "owner", label: "Primary Owner / Authorized", width: "16%" },
        { key: "transition", label: "Transition Guidance", width: "20%" },
      ],
    },
    {
      id: "contracts_obligations",
      title: "Contracts & Obligations",
      icon: "FileSignature",
      description:
        "This section identifies binding contractual commitments that continue regardless of owner presence.",
      howToUse:
        "Use this section to identify active contracts, their terms, and continuity requirements.",
      tableColumns: [
        { key: "contract", label: "Contract / Agreement", width: "18%" },
        { key: "counterparty", label: "Counterparty", width: "14%" },
        { key: "impact", label: "Operational Impact", width: "16%" },
        { key: "authority", label: "Authority / Location", width: "16%" },
        { key: "records", label: "Where Records Live", width: "18%" },
        { key: "transition", label: "Transition Guidance", width: "18%" },
      ],
    },
    {
      id: "key_relationships",
      title: "Key Relationships",
      icon: "Handshake",
      description:
        "Individuals whose judgment, authority, or cooperation materially affects business continuity.",
      howToUse:
        "Identify individuals whose judgment materially impacts continuity. Clarify advisory scope and decision authority.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "14%" },
        { key: "impact", label: "Operational Impact", width: "16%" },
        { key: "authority", label: "Authority / Location", width: "16%" },
        { key: "records", label: "Where Records Live", width: "18%" },
        { key: "owner", label: "Primary Owner / Authorized", width: "16%" },
        { key: "transition", label: "Transition Guidance", width: "20%" },
      ],
    },
    {
      id: "financial_control",
      title: "Financial Control & Liquidity",
      icon: "Landmark",
      description:
        "This section identifies the systems that control business cash, liquidity, and financial authority.",
      howToUse:
        "Identify all financial control systems connected to the business. Confirm authorized signer and access hierarchy.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "14%" },
        { key: "impact", label: "Operational Impact", width: "16%" },
        { key: "authority", label: "Authority / Location", width: "16%" },
        { key: "records", label: "Where Records Live", width: "18%" },
        { key: "owner", label: "Primary Owner / Authorized", width: "16%" },
        { key: "transition", label: "Transition Guidance", width: "20%" },
      ],
      structuralRules: [
        "No credentials are stored in this Manual.",
        "This section records authority, location, and governance structure only.",
      ],
      crossRefs: ["Financial & Assets", "Contracts & Obligations", "Legal & Governance Structure"],
    },
    {
      id: "stabilization_protocol",
      title: "Stabilization Protocol",
      icon: "Activity",
      description:
        "Structured sequence for stabilizing the business following incapacity or death.",
      howToUse: "Follow these steps in order. Do not skip steps or take action without completing previous steps.",
      tableColumns: [],
      fields: [
        {
          id: "step1",
          label: "Phase 1: Immediate Stabilization (0-48 hours)",
          type: "textarea",
          placeholder: "Secure premises, notify key personnel, preserve financial systems...",
        },
        {
          id: "step2",
          label: "Phase 2: Authority Confirmation (48-72 hours)",
          type: "textarea",
          placeholder: "Confirm legal authority, notify advisors, review governance documents...",
        },
        {
          id: "step3",
          label: "Phase 3: Operational Continuity (Week 1-2)",
          type: "textarea",
          placeholder: "Client communication, vendor continuity, payroll and cash flow...",
        },
        {
          id: "step4",
          label: "Phase 4: Strategic Assessment (Week 2-4)",
          type: "textarea",
          placeholder: "Business valuation, continuation vs. wind-down decision...",
        },
      ],
    },
    {
      id: "business_insurance",
      title: "Business Insurance & Risk Coverage",
      icon: "ShieldAlert",
      description: "Active business insurance policies and risk transfer coverage.",
      howToUse: "Use this section to confirm active coverage and claim procedures.",
      tableColumns: [
        { key: "policy", label: "Policy Type", width: "16%" },
        { key: "carrier", label: "Carrier", width: "14%" },
        { key: "coverage", label: "Coverage Purpose", width: "18%" },
        { key: "authority", label: "Authority / Location", width: "16%" },
        { key: "owner", label: "Primary Owner / Authorized", width: "16%" },
        { key: "transition", label: "Transition Guidance", width: "20%" },
      ],
      structuralRules: [
        "Do not allow policies to lapse during transition.",
        "Confirm active coverage status before making structural decisions.",
      ],
    },
    {
      id: "business_assets",
      title: "Business Assets & Property",
      icon: "Package",
      description: "Tangible and intangible assets owned by the business.",
      howToUse:
        "Use this section to identify business assets, their location, and ownership structure.",
      tableColumns: [
        { key: "asset", label: "Asset Description", width: "20%" },
        { key: "type", label: "Type (Tangible/Intangible)", width: "16%" },
        { key: "value", label: "Approx. Value", width: "14%" },
        { key: "location", label: "Location / Records", width: "22%" },
        { key: "owner", label: "Ownership", width: "12%" },
        { key: "transition", label: "Transition Guidance", width: "16%" },
      ],
    },
    {
      id: "legal_governance",
      title: "Legal & Governance Structure",
      icon: "Scale",
      description:
        "Legal structure, governance documents, and ownership framework of the business.",
      howToUse:
        "Use this section to understand the legal entity structure and locate governing documents.",
      tableColumns: [
        { key: "document", label: "Document / Structure", width: "18%" },
        { key: "impact", label: "Operational Impact", width: "16%" },
        { key: "authority", label: "Authority / Location", width: "16%" },
        { key: "records", label: "Where Records Live", width: "18%" },
        { key: "owner", label: "Primary Owner / Authorized", width: "16%" },
        { key: "transition", label: "Transition Guidance", width: "16%" },
      ],
    },
    {
      id: "vendor_agreements",
      title: "Vendor & Service Agreements",
      icon: "ClipboardList",
      description: "Active vendor and service agreements critical to operations.",
      howToUse:
        "Use this section to identify ongoing vendor commitments, terms, and transition requirements.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "14%" },
        { key: "impact", label: "Operational Impact", width: "16%" },
        { key: "authority", label: "Authority / Location", width: "16%" },
        { key: "records", label: "Where Records Live", width: "18%" },
        { key: "owner", label: "Primary Owner / Authorized", width: "16%" },
        { key: "transition", label: "Transition Guidance", width: "20%" },
      ],
    },
    {
      id: "loan_credit",
      title: "Loan & Credit Agreements",
      icon: "Receipt",
      description: "Active loan and credit agreements (reference only).",
      howToUse:
        "Use this section to identify debt obligations, covenant requirements, and transition handling.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "14%" },
        { key: "impact", label: "Operational Impact", width: "16%" },
        { key: "authority", label: "Authority / Location", width: "16%" },
        { key: "records", label: "Where Records Live", width: "18%" },
        { key: "owner", label: "Primary Owner / Authorized", width: "16%" },
        { key: "transition", label: "Transition Guidance", width: "20%" },
      ],
    },
    {
      id: "internal_leadership",
      title: "Internal Leadership",
      icon: "Crown",
      description: "Internal leadership roles and their authority during transition (if applicable).",
      howToUse:
        "Use this section to identify decision-making authority and operational leadership.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "14%" },
        { key: "impact", label: "Operational Impact", width: "16%" },
        { key: "authority", label: "Authority / Location", width: "16%" },
        { key: "records", label: "Where Records Live", width: "18%" },
        { key: "owner", label: "Primary Owner / Authorized", width: "16%" },
        { key: "transition", label: "Transition Guidance", width: "20%" },
      ],
    },
    {
      id: "strategic_relationships",
      title: "Strategic External Relationships",
      icon: "Network",
      description:
        "External relationships whose disruption would materially impact business continuity.",
      howToUse:
        "Use this section to identify critical external dependencies and transition communication plans.",
      tableColumns: [
        { key: "system", label: "System Identified", width: "14%" },
        { key: "impact", label: "Operational Impact", width: "16%" },
        { key: "authority", label: "Authority / Location", width: "16%" },
        { key: "records", label: "Where Records Live", width: "18%" },
        { key: "owner", label: "Primary Owner / Authorized", width: "16%" },
        { key: "transition", label: "Transition Guidance", width: "20%" },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// CANONICAL ORDER (per Operating Manual)
// ═══════════════════════════════════════════════════════════════════
export const chapters: Chapter[] = [ch01, ch02, ch03, ch04, ch05, ch06, ch07];

export const PRIVACY_NOTE = PRIVACY_DISCLAIMER;

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getSubSection(
  chapterId: string,
  sectionId: string,
): SubSection | undefined {
  const ch = getChapter(chapterId);
  return ch?.subSections.find((s) => s.id === sectionId);
}

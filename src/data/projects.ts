/**
 * Centralized, typed case-study content.
 * Add or edit a project here — page layouts read from this file and never
 * need to change. Follow the narrative order: context → problem → system →
 * decisions → current state. Never fabricate metrics; label in-development work.
 */

export type ProjectStatus = "In development" | "Live / in use" | "Prototype";

export interface CaseSection {
  /** Context, Problem, System, Decisions, Current state */
  heading: string;
  body: string[];
}

export interface SystemNode {
  label: string;
  detail: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Short one-line descriptor for indexes and cards */
  kicker: string;
  /** One-sentence summary of what it does */
  summary: string;
  status: ProjectStatus;
  year: string;
  role: string;
  domain: string;
  stack: string[];
  /** Editorial narrative in the fixed case-study order */
  sections: CaseSection[];
  /** Optional system-map nodes rendered as a compact diagram */
  systemMap?: SystemNode[];
  /** Optional label for how the abstract interface frame should read */
  frame: "compliance" | "journal" | "events" | "vineyard" | "generic";
  accentNote?: string;
  /** Optional public URL of the live, deployed app for this project */
  liveUrl?: string;
  /** Optional GitHub URL (org/profile acceptable until per-repo links exist) */
  githubUrl?: string;
  /** Real in-app UI shot; when set, replaces the abstract InterfaceFrame schematic */
  screenshot?: { src: string; alt: string };
  featured: boolean;
}

/** Shared org GitHub until per-project public repos are published */
export const ORG_GITHUB = "https://github.com/jackcooperyc";

export const projects: Project[] = [
  {
    slug: "cupr-os",
    name: "CŪPR.OS",
    kicker: "Compliance-first operating system for dispensaries",
    summary:
      "An orchestration layer for dispensaries and smoke shops that ties compliance, marketing, and customer lifecycle into one system — not a point-of-sale clone.",
    status: "In development",
    year: "2025—",
    role: "Founder, product architecture & full-stack",
    domain: "B2B SaaS · Regulated retail",
    stack: ["Next.js", "Frappe patterns", "Compliance adapters", "CRM"],
    frame: "compliance",
    liveUrl: "https://os-demo.cupr.app",
    githubUrl: ORG_GITHUB,
    screenshot: {
      src: "/work/cupr-os/ui.png",
      alt: "CŪPR.OS operations dashboard with module navigation",
    },
    featured: true,
    accentNote:
      "Positioned as an orchestration layer that sits above existing point-of-sale hardware, not a replacement for it.",
    sections: [
      {
        heading: "Context",
        body: [
          "Dispensaries and smoke shops run on a patchwork of tools: a point-of-sale system for transactions, a spreadsheet for compliance, a separate service for the website, and yet another for outreach. Each one holds part of the truth and none of them talk to each other.",
          "CŪPR.OS starts from the operator's day, not the transaction. It treats compliance as the constraint that shapes everything else — inventory, marketing, and customer contact all inherit the same rules.",
        ],
      },
      {
        heading: "Problem",
        body: [
          "Regulated retail carries a compliance surface that changes by state and by product. Owners spend hours reconciling what they sold against what they are allowed to say, sell, and advertise.",
          "Bolt-on marketing tools make this worse: they let staff publish claims or promotions that violate state rules without ever checking. The gap between the sales system and the compliance system is where the risk lives.",
        ],
      },
      {
        heading: "System",
        body: [
          "CŪPR.OS is built as a set of connected modules over a shared data model. An AI compliance studio drafts and screens copy against state rules before anything ships. A website builder and an ad platform read from the same product and compliance data, so a promotion can't reference a product that isn't allowed in that market.",
          "A CRM and outreach lifecycle sits on top, tracking customers through their first visit, follow-up, and retention — with the same compliance guardrails applied to every message.",
        ],
      },
      {
        heading: "Decisions",
        body: [
          "Orchestration over replacement. Operators already have point-of-sale hardware they trust; CŪPR.OS integrates rather than forcing a rip-and-replace.",
          "Compliance as a first-class data concern, not a review step. Rules are modeled once and reused across the studio, the site builder, and the ad platform, so a single source governs every surface.",
          "Built across Next.js and Frappe patterns to keep the operational back office and the customer-facing surfaces on one coherent model.",
        ],
      },
      {
        heading: "Current state",
        body: [
          "In active development. Core modules — compliance studio, website builder, ad platform, and CRM/outreach — are being built against the shared model. Specific coverage and integration details are evolving as the product is validated with operators.",
        ],
      },
    ],
    systemMap: [
      { label: "Shared model", detail: "Products · rules · customers" },
      { label: "Compliance studio", detail: "Draft + screen copy" },
      { label: "Website builder", detail: "Reads product data" },
      { label: "Ad platform", detail: "Rule-aware promotions" },
      { label: "CRM / outreach", detail: "Lifecycle + retention" },
    ],
  },
  {
    slug: "budbook",
    name: "BudBook",
    kicker: "Cannabis journal, inventory & product intelligence",
    summary:
      "A consumer journal and product-intelligence experience for cannabis: track what you have, what you've tried, and what it actually was — backed by scanned lab data.",
    status: "In development",
    year: "2025—",
    role: "Founder, product & full-stack",
    domain: "Consumer app · Product intelligence",
    stack: ["Next.js", "Drizzle", "Neon Postgres"],
    frame: "journal",
    liveUrl: "https://budbook.cupr.app",
    githubUrl: ORG_GITHUB,
    featured: true,
    accentNote:
      "Recently explored under the Stashd: MT working name. Consumer-facing and personal in tone.",
    sections: [
      {
        heading: "Context",
        body: [
          "People who use cannabis regularly have no good way to remember what worked. Names change, packaging is inconsistent, and the lab data that actually describes a product is buried in a QR code no one scans twice.",
          "BudBook gives that record a home. It is a personal journal, an inventory, and a reference layer that connects what you own to what it actually contains.",
        ],
      },
      {
        heading: "Problem",
        body: [
          "The useful information — cannabinoid and terpene content from a Certificate of Analysis — is disconnected from the moment of use. Without it, a journal is just notes with no structure to compare across sessions.",
          "Existing consumer apps lean on strain names, which are unreliable. The data that would make entries comparable is the data people never capture.",
        ],
      },
      {
        heading: "System",
        body: [
          "BudBook is organized around a set of connected surfaces: a dashboard for the current picture, a journal for sessions, a stash for inventory, and a Cannadex reference. A COA scanner pulls lab data in so entries carry real product detail rather than guesses.",
          "A conversational assistant, Buddy AI, helps navigate and interpret that record. Friends and circles add a social layer for sharing finds without turning the journal into a public feed.",
        ],
      },
      {
        heading: "Decisions",
        body: [
          "Anchor entries to lab data, not strain names. The COA scanner makes the record trustworthy enough to compare over time.",
          "Keep the primary experience personal. Social features (friends, circles) are additive, never the default surface.",
          "Built on Next.js with Drizzle over Neon Postgres to keep the data model explicit and the schema easy to evolve as features land.",
        ],
      },
      {
        heading: "Current state",
        body: [
          "In development. The core surfaces — dashboard, journal, stash, Cannadex, Buddy AI, COA scanner, friends, and circles — define the product shape and are being built out. Feature depth and availability are still moving.",
        ],
      },
    ],
    systemMap: [
      { label: "Dashboard", detail: "Current picture" },
      { label: "Journal", detail: "Sessions over time" },
      { label: "Stash", detail: "Inventory" },
      { label: "Cannadex", detail: "Reference layer" },
      { label: "COA scanner", detail: "Lab data in" },
      { label: "Buddy AI", detail: "Interpret + navigate" },
    ],
  },
  {
    slug: "vineyard-platform",
    name: "Vineyard Platform",
    kicker: "Field operations for Cooper Estate Vineyard",
    summary:
      "An operations platform for a working vineyard, built around a hard product constraint: the field has no reliable connectivity, so the tool has to work offline.",
    status: "In development",
    year: "2025—",
    role: "Founder, product & full-stack",
    domain: "Operations · Agriculture · PWA",
    stack: ["Next.js 16", "Prisma 7", "Neon Postgres", "Vercel", "Mapbox"],
    frame: "vineyard",
    liveUrl: "https://cev.cupr.app",
    githubUrl: ORG_GITHUB,
    featured: true,
    accentNote:
      "Offline / PWA field mode is the central product challenge, not a nice-to-have.",
    sections: [
      {
        heading: "Context",
        body: [
          "Vineyard work happens in rows, on foot, away from the office. The people recording what's happening — pruning, spraying, harvest counts — are the least likely to have a stable connection when they need to log it.",
          "This platform models the vineyard as blocks and rows on a map and lets the crew record work where it happens, then reconcile with the office record.",
        ],
      },
      {
        heading: "Problem",
        body: [
          "Most operations software assumes the network is there. In the field it often isn't. A tool that fails when offline pushes people back to paper, and paper never makes it into the system.",
          "The real challenge is state: capturing work offline and merging it cleanly when the device reconnects, without losing or double-counting entries.",
        ],
      },
      {
        heading: "System",
        body: [
          "The platform is a Progressive Web App with an offline field mode. Map-based block and row data comes from Mapbox; the data model lives in Prisma 7 over Neon Postgres, deployed on Vercel.",
          "Field entries are captured locally and synced when connectivity returns, so the office view and the field view converge on one record of what actually happened.",
        ],
      },
      {
        heading: "Decisions",
        body: [
          "Treat offline as the primary case, not an edge case. The field mode is designed first; the connected experience is the reconciliation layer on top of it.",
          "Map-first data model. Blocks and rows are the unit of work, so the interface matches how the crew already thinks about the vineyard.",
          "Built on Next.js 16, Prisma 7, and Neon Postgres for a typed, evolvable schema, with Vercel handling deployment.",
        ],
      },
      {
        heading: "Current state",
        body: [
          "In development for Cooper Estate Vineyard. The offline/PWA field mode and map-based data model are the current focus. Details are still being validated against real seasonal work.",
        ],
      },
    ],
    systemMap: [
      { label: "Field mode (PWA)", detail: "Capture offline" },
      { label: "Local store", detail: "Entries queued" },
      { label: "Sync layer", detail: "Merge on reconnect" },
      { label: "Map model", detail: "Blocks · rows · Mapbox" },
      { label: "Office view", detail: "Reconciled record" },
    ],
  },
  {
    slug: "budbeat",
    name: "BudBeat",
    kicker: "Culture, events & community layer",
    summary:
      "The culture and community layer of the wider ecosystem — events and connection around the products, kept deliberately high-level for now.",
    status: "In development",
    year: "2025—",
    role: "Founder, product",
    domain: "Community · Events · Culture",
    stack: ["Next.js"],
    frame: "events",
    liveUrl: "https://budbeat.cupr.app",
    githubUrl: ORG_GITHUB,
    featured: false,
    accentNote:
      "Implementation details are intentionally kept high-level where they aren't finalized.",
    sections: [
      {
        heading: "Context",
        body: [
          "Products don't live on their own — the people who use them gather around music, events, and shared interest. BudBeat is the layer that holds that cultural and community activity within the wider ecosystem.",
        ],
      },
      {
        heading: "Problem",
        body: [
          "Community and culture are usually an afterthought bolted onto a product. When there's no dedicated home for events and connection, the activity scatters across channels no one owns.",
        ],
      },
      {
        heading: "System",
        body: [
          "BudBeat is designed as the events and community surface that connects to the rest of the ecosystem, giving culture a first-class place rather than leaving it to third-party channels. Exact mechanics are still being defined.",
        ],
      },
      {
        heading: "Decisions",
        body: [
          "Keep it a distinct layer with its own voice rather than folding community into a product tab. The tone here is present and cultural, not operational.",
        ],
      },
      {
        heading: "Current state",
        body: [
          "Early. BudBeat's role in the ecosystem is defined; specific features and implementation are being worked out and are described here at a high level on purpose.",
        ],
      },
    ],
  },
  {
    slug: "matchbox",
    name: "Matchbox",
    kicker: "Selected project",
    summary:
      "A selected project presented at a high level. Detailed scope and outcomes will be added as the work is ready to describe.",
    status: "In development",
    year: "2025—",
    role: "Founder, product & build",
    domain: "Product",
    stack: [],
    frame: "generic",
    liveUrl: "https://matchbox.cupr.app",
    githubUrl: ORG_GITHUB,
    screenshot: {
      src: "/work/matchbox/ui.png",
      alt: "Matchbox Glass & Smoke storefront hero",
    },
    featured: false,
    accentNote:
      "Presented deliberately without invented features, metrics, users, or outcomes.",
    sections: [
      {
        heading: "Context",
        body: [
          "Matchbox is part of Jack's current body of work. This entry is intentionally kept minimal: it names the project without claiming features, users, or results that aren't ready to be stated.",
        ],
      },
      {
        heading: "Problem",
        body: [
          "The problem Matchbox addresses will be described here once the framing is settled. Rather than fill the space with generic claims, this section is held open on purpose.",
        ],
      },
      {
        heading: "System",
        body: [
          "System and architecture details are not published yet. They will follow the same narrative structure as the other case studies — context, problem, system, decisions, current state — when there's something concrete to show.",
        ],
      },
      {
        heading: "Decisions",
        body: [
          "The main decision so far is one of restraint: present Matchbox honestly and add depth when the work supports it.",
        ],
      },
      {
        heading: "Current state",
        body: [
          "In development. A fuller write-up is planned once the project is further along.",
        ],
      },
    ],
  },
  {
    slug: "cupr-smokeworks-infrastructure",
    name: "Cupr Smokeworks Infrastructure",
    kicker: "Ecosystem maps & operational infrastructure",
    summary:
      "Infrastructure and mapping layer for the Cupr / JCS ecosystem — including the shared geographic and operational picture at maps.cupr.app.",
    status: "In development",
    year: "2025—",
    role: "Founder, systems & product",
    domain: "Infrastructure · Maps · Operations",
    stack: ["Next.js", "Mapbox", "Vercel"],
    frame: "generic",
    liveUrl: "https://maps.cupr.app",
    githubUrl: ORG_GITHUB,
    screenshot: {
      src: "/work/cupr-smokeworks-infrastructure/ui.png",
      alt: "JCS Ecosystem Map showing brands, commerce spine, and inventory network",
    },
    featured: false,
    accentNote:
      "Kept lighter on purpose: the maps surface is concrete; surrounding infra narrative stays high-level where it isn't finalized.",
    sections: [
      {
        heading: "Context",
        body: [
          "Cupr Smokeworks and the wider JCS ecosystem span products, places, and operations that need a shared spatial and infrastructural picture — not just a product UI for one app.",
          "The maps surface at maps.cupr.app is the public face of that layer: ecosystem geography and related operational context in one place.",
        ],
      },
      {
        heading: "Problem",
        body: [
          "Without a dedicated infrastructure view, context scatters across tools and tribal knowledge. Operators and builders lose the through-line between sites, products, and how they connect.",
        ],
      },
      {
        heading: "System",
        body: [
          "This entry covers the infrastructure and mapping layer that sits beneath and beside the product apps. The primary live surface today is the JCS Ecosystem maps experience — a map-first read on how the ecosystem is organized in space.",
        ],
      },
      {
        heading: "Decisions",
        body: [
          "Lead with the map as the concrete artifact people can open, rather than waiting for a full ops console write-up.",
          "Keep the portfolio narrative short until deeper infrastructure documentation is ready to publish honestly.",
        ],
      },
      {
        heading: "Current state",
        body: [
          "In development. Maps are live; fuller infrastructure documentation will expand as the system solidifies.",
        ],
      },
    ],
    systemMap: [
      { label: "Ecosystem maps", detail: "maps.cupr.app" },
      { label: "Sites & ops context", detail: "Shared geography" },
      { label: "Product surfaces", detail: "Apps that sit above" },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

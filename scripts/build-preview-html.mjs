/*
 * Generates preview/index.html from the same content as the production app.
 * Produces a single self-contained HTML file with anchor navigation and
 * expandable case-study sections. Relative asset references only.
 */
import { writeFile } from "node:fs/promises";

const site = {
  name: "Jack Cooper",
  role: "Startup founder & full-stack product builder",
  location: "Missoula, Montana",
  email: "jack@jclub.studio",
  github: "https://github.com/jackcooperyc",
  tagline:
    "I design and build product systems — compliance-aware software, data models, and the interfaces that sit on top of them.",
};

// escape helper
const e = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// ---- projects (mirrors src/data/projects.ts) ----
const projects = [
  {
    slug: "cupr-os", name: "CŪPR.OS",
    kicker: "Compliance-first operating system for dispensaries",
    summary: "An orchestration layer for dispensaries and smoke shops that ties compliance, marketing, and customer lifecycle into one system — not a point-of-sale clone.",
    status: "In development", year: "2025—", role: "Founder, product architecture & full-stack",
    domain: "B2B SaaS · Regulated retail", stack: ["Next.js", "Frappe patterns", "Compliance adapters", "CRM"],
    frame: "compliance", liveUrl: "https://os-demo.cupr.app", githubUrl: site.github,
    screenshot: { src: "work/cupr-os/ui.png", alt: "CŪPR.OS operations dashboard with module navigation" },
    logo: { src: "work/cupr-os/logo.png", alt: "CŪPR.OS logo" },
    featured: true,
    accentNote: "Positioned as an orchestration layer that sits above existing point-of-sale hardware, not a replacement for it.",
    sections: [
      { heading: "Context", body: ["Dispensaries and smoke shops run on a patchwork of tools: a point-of-sale system for transactions, a spreadsheet for compliance, a separate service for the website, and yet another for outreach. Each one holds part of the truth and none of them talk to each other.", "CŪPR.OS starts from the operator's day, not the transaction. It treats compliance as the constraint that shapes everything else — inventory, marketing, and customer contact all inherit the same rules."] },
      { heading: "Problem", body: ["Regulated retail carries a compliance surface that changes by state and by product. Owners spend hours reconciling what they sold against what they are allowed to say, sell, and advertise.", "Bolt-on marketing tools make this worse: they let staff publish claims or promotions that violate state rules without ever checking. The gap between the sales system and the compliance system is where the risk lives."] },
      { heading: "System", body: ["CŪPR.OS is built as a set of connected modules over a shared data model. An AI compliance studio drafts and screens copy against state rules before anything ships. A website builder and an ad platform read from the same product and compliance data, so a promotion can't reference a product that isn't allowed in that market.", "A CRM and outreach lifecycle sits on top, tracking customers through their first visit, follow-up, and retention — with the same compliance guardrails applied to every message."] },
      { heading: "Decisions", body: ["Orchestration over replacement. Operators already have point-of-sale hardware they trust; CŪPR.OS integrates rather than forcing a rip-and-replace.", "Compliance as a first-class data concern, not a review step. Rules are modeled once and reused across the studio, the site builder, and the ad platform, so a single source governs every surface.", "Built across Next.js and Frappe patterns to keep the operational back office and the customer-facing surfaces on one coherent model."] },
      { heading: "Current state", body: ["In active development. Core modules — compliance studio, website builder, ad platform, and CRM/outreach — are being built against the shared model. Specific coverage and integration details are evolving as the product is validated with operators."] },
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
    slug: "budbook", name: "BudBook",
    kicker: "Cannabis journal, inventory & product intelligence",
    summary: "A consumer journal and product-intelligence experience for cannabis: track what you have, what you've tried, and what it actually was — backed by scanned lab data.",
    status: "In development", year: "2025—", role: "Founder, product & full-stack",
    domain: "Consumer app · Product intelligence", stack: ["Next.js", "Drizzle", "Neon Postgres"],
    frame: "journal", liveUrl: "https://budbook.cupr.app", githubUrl: site.github,
    logo: { src: "work/budbook/logo.png", alt: "BudBook logo" },
    featured: true,
    accentNote: "Recently explored under the Stashd: MT working name. Consumer-facing and personal in tone.",
    sections: [
      { heading: "Context", body: ["People who use cannabis regularly have no good way to remember what worked. Names change, packaging is inconsistent, and the lab data that actually describes a product is buried in a QR code no one scans twice.", "BudBook gives that record a home. It is a personal journal, an inventory, and a reference layer that connects what you own to what it actually contains."] },
      { heading: "Problem", body: ["The useful information — cannabinoid and terpene content from a Certificate of Analysis — is disconnected from the moment of use. Without it, a journal is just notes with no structure to compare across sessions.", "Existing consumer apps lean on strain names, which are unreliable. The data that would make entries comparable is the data people never capture."] },
      { heading: "System", body: ["BudBook is organized around a set of connected surfaces: a dashboard for the current picture, a journal for sessions, a stash for inventory, and a Cannadex reference. A COA scanner pulls lab data in so entries carry real product detail rather than guesses.", "A conversational assistant, Buddy AI, helps navigate and interpret that record. Friends and circles add a social layer for sharing finds without turning the journal into a public feed."] },
      { heading: "Decisions", body: ["Anchor entries to lab data, not strain names. The COA scanner makes the record trustworthy enough to compare over time.", "Keep the primary experience personal. Social features (friends, circles) are additive, never the default surface.", "Built on Next.js with Drizzle over Neon Postgres to keep the data model explicit and the schema easy to evolve as features land."] },
      { heading: "Current state", body: ["In development. The core surfaces — dashboard, journal, stash, Cannadex, Buddy AI, COA scanner, friends, and circles — define the product shape and are being built out. Feature depth and availability are still moving."] },
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
    slug: "vineyard-platform", name: "Vineyard Platform",
    kicker: "Field operations for Cooper Estate Vineyard",
    summary: "An operations platform for a working vineyard, built around a hard product constraint: the field has no reliable connectivity, so the tool has to work offline.",
    status: "In development", year: "2025—", role: "Founder, product & full-stack",
    domain: "Operations · Agriculture · PWA", stack: ["Next.js 16", "Prisma 7", "Neon Postgres", "Vercel", "Mapbox"],
    frame: "vineyard", liveUrl: "https://cev.cupr.app", githubUrl: site.github, featured: true,
    accentNote: "Offline / PWA field mode is the central product challenge, not a nice-to-have.",
    sections: [
      { heading: "Context", body: ["Vineyard work happens in rows, on foot, away from the office. The people recording what's happening — pruning, spraying, harvest counts — are the least likely to have a stable connection when they need to log it.", "This platform models the vineyard as blocks and rows on a map and lets the crew record work where it happens, then reconcile with the office record."] },
      { heading: "Problem", body: ["Most operations software assumes the network is there. In the field it often isn't. A tool that fails when offline pushes people back to paper, and paper never makes it into the system.", "The real challenge is state: capturing work offline and merging it cleanly when the device reconnects, without losing or double-counting entries."] },
      { heading: "System", body: ["The platform is a Progressive Web App with an offline field mode. Map-based block and row data comes from Mapbox; the data model lives in Prisma 7 over Neon Postgres, deployed on Vercel.", "Field entries are captured locally and synced when connectivity returns, so the office view and the field view converge on one record of what actually happened."] },
      { heading: "Decisions", body: ["Treat offline as the primary case, not an edge case. The field mode is designed first; the connected experience is the reconciliation layer on top of it.", "Map-first data model. Blocks and rows are the unit of work, so the interface matches how the crew already thinks about the vineyard.", "Built on Next.js 16, Prisma 7, and Neon Postgres for a typed, evolvable schema, with Vercel handling deployment."] },
      { heading: "Current state", body: ["In development for Cooper Estate Vineyard. The offline/PWA field mode and map-based data model are the current focus. Details are still being validated against real seasonal work."] },
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
    slug: "budbeat", name: "BudBeat",
    kicker: "Culture, events & community layer",
    summary: "The culture and community layer of the wider ecosystem — events and connection around the products, kept deliberately high-level for now.",
    status: "In development", year: "2025—", role: "Founder, product",
    domain: "Community · Events · Culture", stack: ["Next.js"],
    frame: "events", liveUrl: "https://budbeat.cupr.app.cupr.app/budbeat-app", githubUrl: site.github,
    screenshot: { src: "work/budbeat/ui.png", alt: "BudBeat home dashboard with freestyle session CTA" },
    logo: { src: "work/budbeat/logo.png", alt: "BudBeat logo" },
    featured: false,
    accentNote: "Implementation details are intentionally kept high-level where they aren't finalized.",
    sections: [
      { heading: "Context", body: ["Products don't live on their own — the people who use them gather around music, events, and shared interest. BudBeat is the layer that holds that cultural and community activity within the wider ecosystem."] },
      { heading: "Problem", body: ["Community and culture are usually an afterthought bolted onto a product. When there's no dedicated home for events and connection, the activity scatters across channels no one owns."] },
      { heading: "System", body: ["BudBeat is designed as the events and community surface that connects to the rest of the ecosystem, giving culture a first-class place rather than leaving it to third-party channels. Exact mechanics are still being defined."] },
      { heading: "Decisions", body: ["Keep it a distinct layer with its own voice rather than folding community into a product tab. The tone here is present and cultural, not operational."] },
      { heading: "Current state", body: ["Early. BudBeat's role in the ecosystem is defined; specific features and implementation are being worked out and are described here at a high level on purpose."] },
    ],
  },
  {
    slug: "matchbox", name: "Matchbox",
    kicker: "Selected project",
    summary: "A selected project presented at a high level. Detailed scope and outcomes will be added as the work is ready to describe.",
    status: "In development", year: "2025—", role: "Founder, product & build",
    domain: "Product", stack: [],
    frame: "generic", liveUrl: "https://matchbox.cupr.app", githubUrl: site.github,
    screenshot: { src: "work/matchbox/ui.png", alt: "Matchbox Glass & Smoke storefront hero" },
    featured: false,
    accentNote: "Presented deliberately without invented features, metrics, users, or outcomes.",
    sections: [
      { heading: "Context", body: ["Matchbox is part of Jack's current body of work. This entry is intentionally kept minimal: it names the project without claiming features, users, or results that aren't ready to be stated."] },
      { heading: "Problem", body: ["The problem Matchbox addresses will be described here once the framing is settled. Rather than fill the space with generic claims, this section is held open on purpose."] },
      { heading: "System", body: ["System and architecture details are not published yet. They will follow the same narrative structure as the other case studies — context, problem, system, decisions, current state — when there's something concrete to show."] },
      { heading: "Decisions", body: ["The main decision so far is one of restraint: present Matchbox honestly and add depth when the work supports it."] },
      { heading: "Current state", body: ["In development. A fuller write-up is planned once the project is further along."] },
    ],
  },
  {
    slug: "cupr-smokeworks-infrastructure", name: "Cupr Smokeworks Infrastructure",
    kicker: "Ecosystem maps & operational infrastructure",
    summary: "Infrastructure and mapping layer for the Cupr / JCS ecosystem — including the shared geographic and operational picture at maps.cupr.app.",
    status: "In development", year: "2025—", role: "Founder, systems & product",
    domain: "Infrastructure · Maps · Operations", stack: ["Next.js", "Mapbox", "Vercel"],
    frame: "generic", liveUrl: "https://maps.cupr.app", githubUrl: site.github,
    screenshot: { src: "work/cupr-smokeworks-infrastructure/ui.png", alt: "JCS Ecosystem Map showing brands, commerce spine, and inventory network" },
    logo: { src: "work/cupr-smokeworks-infrastructure/logo.png", alt: "CŪPR brand logo" },
    featured: false,
    accentNote: "Kept lighter on purpose: the maps surface is concrete; surrounding infra narrative stays high-level where it isn't finalized.",
    sections: [
      { heading: "Context", body: ["Cupr Smokeworks and the wider JCS ecosystem span products, places, and operations that need a shared spatial and infrastructural picture — not just a product UI for one app.", "The maps surface at maps.cupr.app is the public face of that layer: ecosystem geography and related operational context in one place."] },
      { heading: "Problem", body: ["Without a dedicated infrastructure view, context scatters across tools and tribal knowledge. Operators and builders lose the through-line between sites, products, and how they connect."] },
      { heading: "System", body: ["This entry covers the infrastructure and mapping layer that sits beneath and beside the product apps. The primary live surface today is the JCS Ecosystem maps experience — a map-first read on how the ecosystem is organized in space."] },
      { heading: "Decisions", body: ["Lead with the map as the concrete artifact people can open, rather than waiting for a full ops console write-up.", "Keep the portfolio narrative short until deeper infrastructure documentation is ready to publish honestly."] },
      { heading: "Current state", body: ["In development. Maps are live; fuller infrastructure documentation will expand as the system solidifies."] },
    ],
    systemMap: [
      { label: "Ecosystem maps", detail: "maps.cupr.app" },
      { label: "Sites & ops context", detail: "Shared geography" },
      { label: "Product surfaces", detail: "Apps that sit above" },
    ],
  },
  {
    slug: "lockbox-apache-110", name: "LockBox · Apache 110",
    kicker: "Series-origin LockBox hardware — Apache 110 (OG)",
    summary: "The blueprint that started the LockBox lineage: a rugged, weather-sealed vault with the first-generation CŪPR lock — documented as Apache 110 (OG) in the hardware archive.",
    status: "Prototype", year: "2025—", role: "Founder, industrial design & product",
    domain: "Hardware · LockBox series · Consumer",
    stack: ["Hard-anodized aluminum", "Mechanical override + biometric", "Weather-sealed enclosure"],
    frame: "generic", githubUrl: site.github,
    screenshot: { src: "work/lockbox-apache-110/ui.png", alt: "Apache 110 LockBox product mockup on black" },
    logo: { src: "work/lockbox-apache-110/logo.png", alt: "LockBox Apache 110 logo" },
    featured: false,
    accentNote: "Archive record from the CŪPR / jcs-consumer-app proprietary hardware lineage — LEGACY series origin, not a software app case study.",
    archive: {
      serial: "CP-LB-110-APC", status: "LEGACY", clearance: "LVL 01",
      specs: ["Weight: 850g", "Volume: 1.1L", "Material: Hard-Anodized Aluminum", "Lock: Mechanical Override + Bio"],
    },
    canvaWatchUrl: "https://www.canva.com/design/DAHIv90k8-I/h8SkSvncP5dMIaI6Ctlu3Q/watch?utm_content=DAHIv90k8-I&utm_campaign=designshare&utm_medium=embeds&utm_source=link",
    sections: [
      { heading: "Context", body: ["Apache 110 (OG) is the series-origin blueprint in the LockBox hardware lineage — the form, sealing, and lock language that later vaults in the CŪPR catalog build on.", "In the jcs-consumer-app proprietary archive it sits as the LEGACY origin record: serial CP-LB-110-APC, clearance LVL 01."] },
      { heading: "Problem", body: ["Secure, weather-ready storage for cannabis hardware usually splits into soft cases that fail outdoors or vaults that feel industrial and immobile. Early LockBox work needed a single sealed unit that could travel and still feel intentional."] },
      { heading: "System", body: ["Apache 110 is specified as a hard-anodized aluminum enclosure at 850g / 1.1L with the first-generation CŪPR lock: mechanical override plus biometric path.", "The portfolio preserves the archive record and a 360° anatomy walkthrough (Canva) so the industrial story — form, airflow, and precision — stays readable without inventing shipping metrics."] },
      { heading: "Decisions", body: ["Treat Apache 110 as the documented origin of the LockBox series rather than a silent SKU footnote.", "Keep software case studies and hardware archive entries distinct: this page carries serial, clearance, specs, and anatomy — not fabricated unit sales."] },
      { heading: "Current state", body: ["Archived as LEGACY in the proprietary hardware panel. Specs and Canva 360° anatomy are published here as the public portfolio record; deeper patent / series write-ups stay with the LockBox Ūtility Bong filing where they belong."] },
    ],
    systemMap: [
      { label: "Enclosure", detail: "Hard-anodized aluminum · 1.1L" },
      { label: "Lock gen-1", detail: "Mechanical override + bio" },
      { label: "Seal", detail: "Weather-sealed travel shell" },
      { label: "Lineage", detail: "Origin for later LockBox SKUs" },
    ],
  },
];

const homeApproach = [
  { title: "Product architecture", body: "I start from the data model and the constraints, then design the interfaces on top. The system's shape comes first; the screens follow from it." },
  { title: "Systems integration", body: "Most of my work connects tools that weren't built to talk to each other — point-of-sale, compliance, maps, lab data — into one coherent record." },
  { title: "Compliance-aware workflows", body: "In regulated spaces, the rules aren't a review step at the end. I model them once and reuse them across every surface a product touches." },
  { title: "Shipping across disciplines", body: "Founder-built means I move between schema, backend, interface, and copy. The product ships because one person can carry it end to end." },
];

const aboutPillars = [
  { title: "Product architecture", body: "I design from the data model outward. Getting the entities, relationships, and constraints right first means the interface has something solid to stand on — and stays coherent as the product grows." },
  { title: "Systems integration", body: "The interesting work is usually in the seams: connecting point-of-sale, compliance rules, mapping data, and lab records into one system that agrees with itself. I build the connective layer, not just another silo." },
  { title: "Compliance-aware workflows", body: "In regulated industries, the rules shape everything. I model them as first-class data and reuse them across every surface — so a product can't quietly do something it isn't allowed to." },
  { title: "Shipping across disciplines", body: "Founder-built means moving fluidly between schema, backend, frontend, and copy. I'd rather own the whole path from problem to shipped product than hand it off at every boundary." },
];

// ---- SVG monogram (mirrors Monogram.tsx) ----
const monogram = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" role="img" aria-label="Jack Cooper"><path d="M25 7.5a11 11 0 1 0 0 17" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M19 6.5v12.5a5 5 0 0 1-8.2 3.9" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="19" cy="6.5" r="1.7" fill="var(--accent)"/></svg>`;

const bar = (w, accent) => `<span class="bar${accent ? " accent" : ""}" style="width:${w}"></span>`;

// interface frames (mirror InterfaceFrame.tsx)
function frameHTML(p) {
  const chrome = (label, inner, bare) =>
    `<div class="chrome"><div class="chrome-bar"><span class="dotc"></span><span class="dotc"></span><span class="dotc"></span><span class="label">${e(label)}</span></div>${bare ? inner : `<div class="chrome-body">${inner}</div>`}</div>`;

  if (p.screenshot) {
    const host = (p.liveUrl || "").replace(/^https?:\/\//, "").replace(/\/$/, "") || p.name.toLowerCase();
    return chrome(
      host,
      `<div class="shot"><img src="${e(p.screenshot.src)}" alt="${e(p.screenshot.alt)}" loading="lazy" /></div>`,
      true,
    );
  }

  if (p.frame === "compliance") {
    return chrome("cupr.os / compliance-studio", `
      <div class="frame-grid2">
        <div class="frame-col">${bar("60%")}${bar("80%")}${bar("45%", true)}${bar("70%")}</div>
        <div class="frame-card">
          <div class="cardlabel">RULE CHECK · MT</div>
          <div class="frame-col">
            <div class="frame-row"><span class="dot-accent"></span>${bar("70%")}</div>
            <div class="frame-row"><span class="dot-accent"></span>${bar("55%")}</div>
            <div class="frame-row dim"><span class="dot-ring"></span>${bar("60%")}</div>
          </div>
        </div>
      </div>`);
  }
  if (p.frame === "journal") {
    const tiles = ["Stash", "Journal", "Cannadex"].map((t, i) =>
      `<div class="tile"><span class="swatch${i === 1 ? " on" : ""}"></span><div class="tlabel">${t}</div><div class="stack">${bar("80%")}${bar("55%")}</div></div>`
    ).join("");
    return chrome("budbook / journal", `<div class="frame-tiles">${tiles}</div>`);
  }
  if (p.frame === "vineyard") {
    const plots = Array.from({ length: 12 }, (_, i) =>
      `<span class="plot${i === 5 || i === 6 ? " on" : ""}"></span>`).join("");
    return chrome("vineyard / field-mode (offline)", `
      <div class="frame-map">
        <div class="grid-field"><div class="plots">${plots}</div></div>
        <div class="frame-side">
          <div class="offline"><span class="dot-accent"></span>OFFLINE · 3 queued</div>
          ${bar("70%")}${bar("90%")}${bar("50%")}
          <div class="cardlabel" style="margin:0">Block 4 · Row 12</div>
        </div>
      </div>`);
  }
  if (p.frame === "events") {
    const rows = [0, 1, 2].map((i) =>
      `<div class="event"><span class="badge${i === 0 ? " live" : ""}">${i === 0 ? "LIVE" : "SAT"}</span><div class="lines">${bar(i === 0 ? "60%" : "45%", i === 0)}${bar("80%")}</div></div>`
    ).join("");
    return chrome("budbeat / community", `<div class="frame-events">${rows}</div>`);
  }
  // generic
  return chrome(p.name.toLowerCase(), `
    <div class="frame-col">
      ${bar("40%", true)}
      <div class="frame-grid2" style="grid-template-columns:1fr 1fr">
        <div class="frame-col">${bar("90%")}${bar("70%")}${bar("80%")}</div>
        <div class="frame-col">${bar("75%")}${bar("60%")}${bar("85%")}</div>
      </div>
    </div>`);
}

function projectLinksHTML(p, kind) {
  const bits = [];
  if (p.liveUrl) {
    bits.push(
      kind === "cta"
        ? `<a class="live-cta" href="${e(p.liveUrl)}" target="_blank" rel="noreferrer noopener" aria-label="Visit the live ${e(p.name)} app (opens in a new tab)">Visit live app <span aria-hidden="true">\u2197</span></a>`
        : `<a class="live-link" href="${e(p.liveUrl)}" target="_blank" rel="noreferrer noopener" aria-label="Visit the live ${e(p.name)} app (opens in a new tab)">Visit live app <span aria-hidden="true">\u2197</span></a>`,
    );
  }
  if (p.githubUrl) {
    bits.push(
      kind === "cta"
        ? `<a class="live-cta" href="${e(p.githubUrl)}" target="_blank" rel="noreferrer noopener" aria-label="View ${e(p.name)} on GitHub (opens in a new tab)">GitHub <span aria-hidden="true">\u2197</span></a>`
        : `<a class="live-link" href="${e(p.githubUrl)}" target="_blank" rel="noreferrer noopener" aria-label="View ${e(p.name)} on GitHub (opens in a new tab)">GitHub <span aria-hidden="true">\u2197</span></a>`,
    );
  }
  return bits.join("");
}

function caseDetail(p) {
  const secs = p.sections.map((s) =>
    `<div class="case-section"><h4>${e(s.heading)}</h4>${s.body.map((b) => `<p>${e(b)}</p>`).join("")}</div>`
  ).join("");
  const note = p.accentNote ? `<p class="accent-note">${e(p.accentNote)}</p>` : "";
  const stackVal = p.stack.length ? p.stack.join(" · ") : "Not published";
  const sidebar = `
    <aside>
      ${p.systemMap ? `<div class="systemmap"><div class="smhead">System map</div>${p.systemMap.map((n, i) => `<div class="smnode"><span class="idx">${String(i + 1).padStart(2, "0")}</span><span class="nlabel">${e(n.label)}</span><span class="ndetail">${e(n.detail)}</span></div>`).join("")}</div>` : ""}
      <div class="metatable">
        <div class="mrow"><span class="mkey">Role</span><span class="mval">${e(p.role)}</span></div>
        <div class="mrow"><span class="mkey">Domain</span><span class="mval">${e(p.domain)}</span></div>
        <div class="mrow"><span class="mkey">Year</span><span class="mval">${e(p.year)}</span></div>
        <div class="mrow"><span class="mkey">Stack</span><span class="mval">${e(stackVal)}</span></div>
      </div>
      ${
        p.archive
          ? `<div class="archive-record"><div class="eyebrow">Archive record</div><div class="mrow"><span class="mkey">Serial</span><span class="mval mono">${e(p.archive.serial)}</span></div><div class="mrow"><span class="mkey">Status</span><span class="mval">${e(p.archive.status)}</span></div><div class="mrow"><span class="mkey">Clearance</span><span class="mval mono">${e(p.archive.clearance)}</span></div><ul class="archive-specs">${p.archive.specs.map((s) => `<li>${e(s)}</li>`).join("")}</ul></div>`
          : ""
      }
      ${
        p.canvaWatchUrl
          ? `<p class="canva-note"><a class="live-link" href="${e(p.canvaWatchUrl)}" target="_blank" rel="noreferrer noopener">Apache 110 · 360° anatomy on Canva <span aria-hidden="true">\u2197</span></a></p>`
          : ""
      }
      <div class="link-row">${projectLinksHTML(p, "cta")}</div>
    </aside>`;
  return `<div class="case-detail" id="detail-${p.slug}"><div class="case-grid"><div>${secs}${note}</div>${sidebar}</div></div>`;
}

function workRow(p, i) {
  const flip = i % 2 === 1;
  const chips = p.stack.length
    ? p.stack.map((s) => `<span class="chip">${e(s)}</span>`).join("")
    : `<span class="chip empty">Stack: Not published</span>`;
  return `
  <article class="work-row${flip ? " flip" : ""}" id="${p.slug}">
    <div class="work-presentation">
      <div class="work-visual">${frameHTML(p)}</div>
      <div class="work-copy">
        <div class="status-row">
          <span class="pill"><span class="dot"></span>${e(p.status)}</span>
          <span class="mono faint" style="font-size:0.7rem">${e(p.year)}</span>
        </div>
        ${
          p.logo
            ? `<div class="project-logo"><img src="${e(p.logo.src)}" alt="${e(p.logo.alt)}" loading="lazy" /></div>`
            : ""
        }
        <h3>${e(p.name)}</h3>
        <p class="kicker">${e(p.kicker)}</p>
        <p class="summary">${e(p.summary)}</p>
        <div class="meta">${chips}</div>
        <div class="actions">
          <button class="read-more" data-expand="detail-${p.slug}" aria-expanded="false" aria-controls="detail-${p.slug}">Read the case study \u2192</button>
          ${projectLinksHTML(p, "inline")}
        </div>
      </div>
    </div>
    ${caseDetail(p)}
  </article>`;
}

const iconTheme = `
  <svg class="icon-moon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  <svg class="icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${e(site.name)} — ${e(site.role)}</title>
<meta name="description" content="Jack Cooper is a startup founder and full-stack product builder in Missoula, Montana, working on compliance-first software, product intelligence, and operations tooling." />
<link rel="preconnect" href="https://api.fontshare.com" />
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,600,700&f[]=general-sans@400,500,600&display=swap" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" />
<link rel="stylesheet" href="./styles.css" />
</head>
<body>
<a href="#work" class="skip-link">Skip to content</a>

<header class="site-header">
  <div class="wrap header-inner">
    <a href="#top" class="brand" aria-label="Jack Cooper — home">${monogram(26)}<span class="wordmark">Jack Cooper</span></a>
    <nav class="nav" aria-label="Primary">
      <a class="navlink" href="#work" data-spy>Work</a>
      <a class="navlink" href="#about" data-spy>About</a>
      <a class="navlink" href="mailto:${site.email}">Contact</a>
      <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Switch to dark mode">${iconTheme}</button>
    </nav>
  </div>
</header>

<main id="top">
  <!-- Hero -->
  <section class="wrap hero">
    <p class="eyebrow reveal">Selected work · ${e(site.location)}</p>
    <h1 class="reveal">Product systems for regulated, real-world work.</h1>
    <p class="lede reveal" style="animation-delay:.05s">${e(site.tagline)}</p>
    <div class="cta-row reveal" style="animation-delay:.1s">
      <a href="#work" class="btn">View the work</a>
      <a href="mailto:${site.email}" class="link-underline muted">${e(site.email)}</a>
    </div>
  </section>

  <div class="wrap"><div class="rule"></div></div>

  <!-- Work -->
  <section class="wrap section" id="work" aria-labelledby="work-heading">
    <div class="section-head">
      <div>
        <p class="eyebrow">01 — Selected work</p>
        <h2 id="work-heading">What I'm building</h2>
      </div>
    </div>
    <div class="work-list">
      ${projects.map((p, i) => workRow(p, i)).join("")}
    </div>
  </section>

  <div class="wrap"><div class="rule"></div></div>

  <!-- About / Approach -->
  <section class="wrap section" id="about" aria-labelledby="about-heading">
    <div class="split">
      <div>
        <p class="eyebrow">02 — About</p>
        <h2 id="about-heading">How the work fits together</h2>
      </div>
      <div>
        <div class="approach-grid">
          ${homeApproach.map((a) => `<div><h3>${e(a.title)}</h3><p>${e(a.body)}</p></div>`).join("")}
        </div>
      </div>
    </div>
  </section>

  <div class="wrap"><div class="rule"></div></div>

  <section class="wrap section" aria-labelledby="howiwork">
    <div class="split">
      <div><h2 id="howiwork">How I work</h2></div>
      <div class="pillars">
        ${aboutPillars.map((p, i) => `<div class="pillar"><span class="pidx">${String(i + 1).padStart(2, "0")}</span><h3>${e(p.title)}</h3><p>${e(p.body)}</p></div>`).join("")}
      </div>
    </div>
  </section>

  <div class="wrap"><div class="rule"></div></div>

  <section class="wrap section" aria-labelledby="bio-heading">
    <div class="bio">
      <div><h2 id="bio-heading">Where the work comes from</h2></div>
      <div class="prose">
        <p>Most of what I build shares a starting point: a real operation running on tools that don't fit it. A dispensary reconciling sales against compliance by hand. A cannabis user with no reliable record of what worked. A vineyard crew logging fieldwork on paper because the software gives up when the signal does.</p>
        <p>I take those constraints seriously and design the system around them first. Compliance, offline reliability, and trustworthy data aren't features bolted on at the end — they're the shape of the product from the first schema.</p>
        <p>As a founder, I carry projects across disciplines: data modeling, backend, interface design, and the writing that makes a product legible. That range is what lets these systems actually ship.</p>
      </div>
    </div>
  </section>

  <div class="wrap"><div class="rule"></div></div>

  <!-- Contact -->
  <section class="wrap section" id="contact" aria-labelledby="contact-heading">
    <p class="eyebrow">03 — Contact</p>
    <h2 id="contact-heading" style="max-width:48rem;margin-top:.75rem">Working on something in a regulated or operations-heavy space?</h2>
    <p class="contact-copy">The best way to reach me is email. I read everything and reply to messages that are specific.</p>
    <div class="cta-links">
      <a href="mailto:${site.email}" class="btn">${e(site.email)}</a>
      <a href="${site.github}" target="_blank" rel="noreferrer noopener" class="link-underline muted">GitHub \u2197</a>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <div class="brand">${monogram(24)}<span class="wordmark">Jack Cooper</span></div>
      <p>${e(site.role)} in ${e(site.location)}.</p>
    </div>
    <div class="footer-col">
      <p class="eyebrow" style="margin-bottom:.75rem">Site</p>
      <ul>
        <li><a class="link-underline" href="#work">Work</a></li>
        <li><a class="link-underline" href="#about">About</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="eyebrow" style="margin-bottom:.75rem">Contact</p>
      <ul>
        <li><a class="link-underline" href="mailto:${site.email}">${e(site.email)}</a></li>
        <li><a class="link-underline" href="${site.github}" target="_blank" rel="noreferrer noopener">GitHub</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span class="mono">© 2026 Jack Cooper</span>
    <span class="mono">Missoula, MT · 46.87°N 113.99°W</span>
  </div>
</footer>

<script src="./app.js"></script>
</body>
</html>
`;

await writeFile(new URL("../preview/index.html", import.meta.url), html, "utf8");
console.log("preview/index.html written (" + html.length + " bytes)");

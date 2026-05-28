# bellmyer.com

Personal site for Chris Bellmyer — Wastewater Reclamation Plant Operator III, GIS practitioner, and water quality advocate.

The site's mission: tell a story, not list a resume. It traces a career that has followed water wherever it needed protecting — from Alabama bayous to Baltimore harbor, to Puerto Rico disaster response, to a Maryland reclamation plant. The tools change. The water doesn't.

---

## Stack

- **Generator:** [Hugo](https://gohugo.io/) with the `hypercat-theme`
- **Hosting:** Cloudflare Pages
- **Content dir:** `content/` (Hugo `contentDir` override — pages generate at root-level URLs)

## Design

SCADA-inspired dark interface, referencing the Foxboro control panel aesthetic:

- Dark charcoal background
- Yellow accent for values and results
- Teal for flow indicators
- Space Mono (monospace) for labels, section headers, and data readouts
- Barlow / Barlow Condensed for body and display text

The goal is a site that feels like a plant operator's workstation — not a marketing page.

---

## Pages

### Home
Hero with name, tagline, credential tags (5A license, 10+ years, White House), and a narrative section that frames the full career arc through a single through-line.

### Story (`/story/`)
Long-form narrative account of the career — written in a field-report voice, as if by a knowledgeable colleague. Covers Blue Water Baltimore, MES, CrowdRescue / FEMA / White House, the COVID pivot into wastewater operations, and rapid advancement to Operator III.

### Career (`/career/`)
SCADA-styled timeline. Each role rendered as a Foxboro process unit with:
- Telemetry table (dates, org, location, type)
- Field report narrative
- Foxboro-style visual framing

The COVID gap is styled as a bypassed/diverted flow path. Notable Events Log at the bottom mimics an alarm acknowledgment log.

### Toolkit (`/toolkit/`)
Process calculators for wastewater operations:

**Liquids Processing:** SVI, F/M Ratio, MCRT, Surface Loading Rate, Weir Overflow Rate, Mass Loading, Hydraulic Retention Time, Chemical Dosing

**Solids Handling & Dewatering:** Solids Loading Rate

**Digester Operations:** Volatile Solids Reduction, VS Loading Rate, Digester Detention Time

Each calculator includes inputs, a yellow result readout, and a Process Impact description explaining what the number means in field terms. Also includes a Local Station Telemetry widget (live weather).

**Interactive Process Decision Matrix:** An SVG flow diagram of the full treatment train — liquids line (Headworks through Disinfection) and solids handling (GBT / Gravity Thickeners → Sludge Storage → Digesters → P-Precip → Centrifuges → ANAMMOX / Thermal Dryers). Clicking any process unit opens a side panel with common issues, quick diagnostic checks, and solutions. WAS and primary sludge routing are color-coded (teal and gray). Digester biogas line routes to Thermal Dryers.

**Conversions & Constants:** Live unit-converter (MGD → GPM, GPH, CFS, L/s, and mass loading) and temperature converter (°F ↔ °C with dissolved oxygen saturation via Benson & Krause formula), implemented as reusable web components.

---

## Layout System

Project-level template overrides live in `content/layouts/` and take precedence over the theme:

| File | Purpose |
|------|---------|
| `content/layouts/partials/header.html` | Adds hamburger nav toggle for mobile |
| `content/layouts/partials/footer.html` | Footer with copyright + tagline |
| `content/layouts/partials/extend_head.html` | Removes favicon; loads Google Fonts |
| `content/layouts/partials/process-decision-matrix.html` | SVG process flow diagram with clickable nodes, side-panel troubleshooting data, and all process JS |
| `content/layouts/toolkit/single.html` | Standalone full-width toolkit page (bypasses theme's 720px content constraint) |

Styles are in `content/assets/css/extended/bellmyer.css`.

---

## Configuration

Two `hugo.yaml` files must be kept in sync:

- **`/hugo.yaml`** — root config (used by Hugo CLI)
- **`/content/hugo.yaml`** — content-dir config

Both carry the full site configuration including menu items, social icons, and profile mode settings.

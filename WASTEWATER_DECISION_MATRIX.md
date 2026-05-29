# Wastewater Treatment Process Decision Matrix

## Overview

A comprehensive, interactive troubleshooting guide integrated into your **Operator Toolkit** (`/toolkit/`). This decision matrix provides operators with an intuitive visual process flow diagram showing the complete wastewater treatment train, with clickable sections for exploring common issues, diagnostic checks, and solution steps.

## What Was Built

### Files Created

1. **Shortcode:** `/content/layouts/shortcodes/process-decision-matrix.html`
   - Interactive SVG process flow diagram
   - Decision tree data structure with troubleshooting guidance
   - Slide-out right-panel interface for detailed guidance
   - JavaScript event handlers for click-through interaction

2. **Styling Updates:**
   - Updated `/content/assets/css/extended/bellmyer.css` with PDM wrapper styles
   - All styling integrated with existing theme variables (teal, yellow, dark background)
   - Responsive design for mobile (panel becomes full-width)

3. **Toolkit Integration:**
   - New section added to `/content/layouts/toolkit.html`
   - Includes brief intro text explaining the matrix
   - Positioned between Digester Operations and Quick Reference sections

## Features

### Process Coverage

**Liquids Treatment (Influent to Effluent):**

- Headworks (Bar Screens)
- Grit Chamber (Classifiers & Cyclones)
- Primary Clarifiers
- Process Reactors (Activated Sludge)
- Final Clarifiers
- Denitrification Filters
- Disinfection (UV, Chlorine, Bisulfate)

**Solids Handling (Sludge Management):**

- Gravity Belt Thickening
- Gravity Thickeners
- Cake Feed Cells
- Digesters (with biogas capture loop visualization)
- Phosphorus Precipitation
- DSS (Dissolved Sludge System)
- Centrifuges (Dewatering)
- EQ Tanks (Anammox Treatment)
- Thermal Dryers (Class A/B Biosolids)

### Interactive Elements

1. **Visual Flow Diagram (SVG)**
   - Shows complete process train from influent to effluent and biosolids
   - Color-coded:
     - **Teal** (#4ab8c8): Flow paths and main process line
     - **Yellow** (#e8b44a): Clickable process units
     - **Gray** (#8892a0): Labels and secondary text
   - Dashed biogas line from digesters showing gas reuse
   - Clear separation between liquids (top) and solids (bottom) handling

2. **Clickable Process Boxes**
   - Hover effect: Dims yellow to `var(--yellow-dim)` with shadow glow
   - Click opens right-side panel with troubleshooting content
   - Cursor changes to pointer on hover

3. **Right-Side Decision Panel**
   - Slides in from right edge on click
   - Header shows selected process unit name
   - Close button (×) to dismiss
   - Scrollable content area

4. **Troubleshooting Structure**
   Each process unit includes:
   - **Description**: Plain-language explanation of the unit's role
   - **Common Issues** (typically 3-4 per unit):
     - Issue title
     - **Quick Checks** (diagnostic steps with → bullets)
     - **Solutions** (fix steps with ✓ bullets)

### Design Philosophy

- **Approachable to General Audience**: Plain language with technical terms explained
- **Mixed Experience Levels**: Quick wins first, advanced troubleshooting available on deeper inspection
- **Thematic Integration**: Uses existing color palette and typography (Space Mono labels, Barlow Condensed headings, Barlow body)
- **Operator-Focused**: Practical, actionable guidance rather than theory
- **Responsive**: Adapts to mobile/tablet (full-width panel on screens < 768px)

## Troubleshooting Examples Included

### Headworks (Bar Screens)

- Screen Blinding
- Equipment Noise/Vibration
- Incomplete Screening

### Grit Chamber

- Grit Not Settling
- Cyclone Discharge Issues
- Organic Matter in Grit

### Primary Clarifiers

- High Effluent TSS
- Sludge Odor/Septic Conditions
- Grease/Scum Layer Buildup

### Process Reactors

- MLSS Too High
- MLSS Too Low
- Poor Nitrification
- Denitrification Insufficient

### Final Clarifiers

- Rising Sludge
- High Effluent TSS
- Solids Carryover to Filters

### Denitrification Filters

- High Headloss
- Poor Effluent Quality
- Filter Media Deterioration

### Disinfection

- UV Lamp Fouling
- Chlorine Residual Issues
- Bisulfate Dechlorination Imbalance

### Gravity Belt Thickening

- Low Cake Solids
- Cake Runoff/Turbidity
- Belt Wear or Plugging

### Gravity Thickeners

- Poor Thickening
- Floating Grease/Scum
- Rising Sludge / Septic Odor

### Cake Feed Cells

- Cell Overflow
- Sludge Not Feeding Digesters
- Odor Generation

### Digesters

- Poor Gas Production
- Digester Upset (VFA Spike)
- Biogas Line Blockage

### Phosphorus Precipitation

- High Effluent Phosphorus
- Excessive Sludge Production
- Precipitate Not Settling

### DSS

- High Return Ammonia
- Solid Separation Issues
- DSS Unit Not Operating

### Centrifuges

- Low Cake Solids%
- High Centrate TSS
- Vibration/Noise
- Centrate Pump Cavitation

### EQ Tanks (Anammox)

- High Effluent Ammonia
- Nitritation Imbalance
- Odor / Tank Contents Look Off

### Thermal Dryers

- Low Cake Temperature / Inadequate Drying
- High Moisture in Final Biosolids
- Odor from Dryer
- Class B → Class A Transition

## How to Use

### For Site Visitors

1. Navigate to the **Toolkit** page (`/toolkit/`)
2. Scroll to the "Troubleshooting Guide" section
3. Click any process unit in the flow diagram
4. Read the description and common issues
5. Click an issue title to expand and see:
   - Quick diagnostic checks (→)
   - Solution steps (✓)
6. Close the panel with the × button

### For Your Portfolio

This tool demonstrates:

- **Process Engineering Knowledge**: Comprehensive understanding of wastewater treatment plant operations
- **Problem-Solving Mindset**: Structured troubleshooting approach across 13 major process areas
- **Technical Communication**: Ability to make complex systems accessible
- **Front-End Development**: Interactive SVG, responsive design, vanilla JavaScript
- **Systems Thinking**: Shows interconnected process train from headworks through biosolids

## Technical Details

### Shortcode Usage

In any Hugo markdown file, use:

```hugo
{{< process-decision-matrix >}}
```

The shortcode includes:

- Self-contained HTML, CSS, and JavaScript
- No external dependencies
- Uses CSS variables from theme (colors, fonts)
- Responsive SVG viewBox scaling

### CSS Classes

All PDM classes are prefixed with `pdm-` to avoid conflicts:

- `.pdm-container`: Main wrapper
- `.pdm-flow-diagram`: SVG container
- `.pdm-node-box`: Clickable process units
- `.pdm-decision-panel`: Right slide-out panel
- `.pdm-issue`: Expandable issue cards

### JavaScript Interactivity

- Event listeners on `.pdm-node-box` elements for clicks
- Toggle handlers for `.pdm-issue-toggle` buttons
- Slide-in animation via CSS transition on `.pdm-decision-panel.active` class
- Data attribute `data-section` links SVG boxes to decision tree data

### Responsive Breakpoints

- **Desktop (> 768px):** Panel slides in from right at 500px width
- **Tablet/Mobile (≤ 768px):** Panel becomes full-width, scaled SVG

## Styling Notes

The matrix uses your existing design system:

- **Colors:**
  - Background: `var(--entry)`, `var(--bg2)`, `var(--bg3)`
  - Text: `var(--primary)`, `var(--secondary)`, `var(--content)`
  - Accents: `var(--teal)`, `var(--yellow)`, `var(--border)`

- **Typography:**
  - Labels: `'Space Mono', monospace` (0.7-0.75rem, uppercase)
  - Headers: `'Barlow Condensed', sans-serif` (bold, 0.95-1.4rem)
  - Body: `Barlow, sans-serif` (300 weight, 0.85-0.95rem)

- **Spacing & Layout:**
  - Consistent 1-2rem padding in sections
  - 1rem gaps between flex items
  - Smooth 0.3s transitions for hover states

## Future Enhancement Ideas

1. **Permit Parameter Integration**
   - Add effluent limits and compare against troubleshooting limits
   - Highlight violations or approaching thresholds

2. **Dynamic Data**
   - Connect to live plant data for real-time guidance
   - Surface issues proactively based on sensor data

3. **Expanded Solids Path**
   - More detail on nutrient recovery (phosphorus, anammox)
   - Class A vs. Class B testing requirements and optimization

4. **Search/Filter**
   - Quick search for specific issues across all units
   - Filter by severity (quick-fix vs. maintenance)

5. **Mobile App**
   - Offline decision matrix for field technicians
   - Photo capture and issue logging

6. **Knowledge Base Integration**
   - Links to detailed SOP documents
   - Reference to maintenance manuals and spare parts

## Building the Site

With Hugo installed (v0.156.0+), test locally:

```bash
cd bellmyer
hugo server
```

Then navigate to `http://localhost:1313/toolkit/` to see the decision matrix in action.

To build for production:

```bash
hugo
```

Output will be in `public/`.

## Files Modified

| File                                                       | Changes                                                        |
| ---------------------------------------------------------- | -------------------------------------------------------------- |
| `/content/layouts/shortcodes/process-decision-matrix.html` | **Created** - Full shortcode with SVG, data, and interactivity |
| `/content/layouts/toolkit.html`                            | Added new section + `{{< process-decision-matrix >}}` call     |
| `/content/assets/css/extended/bellmyer.css`                | Added `.pdm-section-wrapper` and `.pdm-intro` styles           |

## Notes

- All styling is self-contained within the shortcode and theme CSS
- No external JavaScript libraries required (vanilla ES6)
- SVG is resolution-independent and scales responsively
- Panel interaction works on touch devices (click/tap to open, close button to dismiss)
- Accessible via keyboard (button has visible focus state)

---

**Created:** May 28, 2026
**Status:** Ready for deployment to bellmyer.com/toolkit/

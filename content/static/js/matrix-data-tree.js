/* ═══════════════════════════════════════════════════════════════════
   PROCESS DECISION MATRIX — ZONES & SYMPTOM TREE
   /static/js/matrix-data-tree.js

   HOW TO ADD CONTENT:
   ─────────────────────────────────────────────────────────────────
   New zone:    Add entry to MX_ZONES, add matching key to MX_TREE
   New symptom: Push object to zone.symptoms[] in MX_TREE
   New question branch: Add to symptom.questions[]
   New diagnosis: Add to MX_DIAGNOSES in matrix-data-diagnoses.js
   Link SOP:    In MX_DIAGNOSES, change sop:null to
                sop:{ id:"SOP-XXX", title:"...", url:"..." }
   ═══════════════════════════════════════════════════════════════════ */

/* ── ZONES ──────────────────────────────────────────────────────── */
var MX_ZONES = [
  { id:"headworks", label:"Headworks",           abbr:"HW",   desc:"Bar screens, grit basin, grit pumps, cyclones, classifier" },
  { id:"influent",  label:"Influent / Loading",  abbr:"INF",  desc:"Flow, strength, FOG, nutrient balance" },
  { id:"primary",   label:"Primary Clarifier",   abbr:"PRI",  desc:"Scum, sludge, effluent quality, odor" },
  { id:"aeration",  label:"Aeration Basin",      abbr:"AER",  desc:"Biology, DO, MLSS, foam, bulking" },
  { id:"clarifier", label:"Secondary Clarifier", abbr:"SEC",  desc:"Settling, RAS/WAS, effluent quality" },
  { id:"sludge",    label:"Solids Train",         abbr:"SOL",  desc:"GBT, gravity thickener, digesters, centrifuge, dryers, ANAMMOX" },
  { id:"dnfilter",  label:"DN Filters",           abbr:"DNF",  desc:"Tertiary filters, carbon dose, backwash" },
  { id:"disinfect", label:"Disinfection",         abbr:"DIS",  desc:"UV, chlorination, dechlorination, CT" },
  { id:"effluent",  label:"Effluent / Permit",   abbr:"EFF",  desc:"Final quality, permit limits, discharge" }
];

/* ── SYMPTOM TREE ────────────────────────────────────────────────
   Each zone has label + symptoms[].
   Each symptom: { id, label, questions[] }
   Each question: { id:"q1", text, options:[ { label, next, diagnosisId? } ] }
   next: "qN" → go to that question | "diagnosis" → show diagnosisId  */
var MX_TREE = {

  headworks: {
    label: "Headworks",
    symptoms: [
      { id:"hw_screen_blind", label:"Bar screen blinding / high differential level alarm",
        questions: [
          { id:"q1", text:"Is the screen cleaner (rake) operating?", options: [
            { label:"No — rake is stopped or faulted", next:"diagnosis", diagnosisId:"hw_screen_rake_fault" },
            { label:"Yes — rake running but screen still blinding", next:"q2" }]},
          { id:"q2", text:"Is there an unusually heavy screenings load?", options: [
            { label:"Yes — high flow or solids event", next:"diagnosis", diagnosisId:"hw_screen_overload" },
            { label:"Normal conditions — screen accumulating faster than cleaning", next:"diagnosis", diagnosisId:"hw_screen_cleaning_rate" }]}
        ]},
      { id:"hw_screen_bypass", label:"Screen bypass — flow going around screen unscreened",
        questions: [
          { id:"q1", text:"Is the bypass intentional or uncontrolled?", options: [
            { label:"Intentional — bypass open for maintenance or high flow", next:"diagnosis", diagnosisId:"hw_screen_bypass_planned" },
            { label:"Uncontrolled — bypass occurring without intent", next:"diagnosis", diagnosisId:"hw_screen_bypass_uncontrolled" }]}
        ]},
      { id:"hw_screen_drive", label:"Bar screen drive or mechanism failure",
        questions: [
          { id:"q1", text:"What type of failure is occurring?", options: [
            { label:"Motor fault / electrical failure", next:"diagnosis", diagnosisId:"hw_screen_motor" },
            { label:"Mechanical jam — rake stuck or broken", next:"diagnosis", diagnosisId:"hw_screen_jam" },
            { label:"Screenings compaction — press or conveyor issue", next:"diagnosis", diagnosisId:"hw_screen_compactor" }]}
        ]},
      { id:"hw_screen_odor", label:"Strong odor from screenings / screening area",
        questions: [
          { id:"q1", text:"Are screenings being removed frequently enough?", options: [
            { label:"No — screenings sitting in container too long", next:"diagnosis", diagnosisId:"hw_screen_odor_storage" },
            { label:"Yes — regular removal but odor persists", next:"diagnosis", diagnosisId:"hw_screen_odor_influent" }]}
        ]},
      { id:"hw_grit_poor_capture", label:"Poor grit capture / grit passing through basin",
        questions: [
          { id:"q1", text:"Has influent flow rate increased significantly?", options: [
            { label:"Yes — high flow event", next:"diagnosis", diagnosisId:"hw_grit_washout_flow" },
            { label:"No — normal flow", next:"q2" }]},
          { id:"q2", text:"Is the grit basin aeration or mixing system operating normally?", options: [
            { label:"Aeration / mixer issue suspected", next:"diagnosis", diagnosisId:"hw_grit_aeration" },
            { label:"Aeration appears normal", next:"diagnosis", diagnosisId:"hw_grit_design" }]}
        ]},
      { id:"hw_grit_organics", label:"High organic content in collected grit",
        questions: [
          { id:"q1", text:"Is the grit classifier wash system operating?", options: [
            { label:"No — wash water not flowing", next:"diagnosis", diagnosisId:"hw_grit_wash_failure" },
            { label:"Yes — washing running but organics still high", next:"diagnosis", diagnosisId:"hw_grit_organics_process" }]}
        ]},
      { id:"hw_grit_fog", label:"FOG / scum accumulation on grit basin surface",
        questions: [
          { id:"q1", text:"Is this a recurring issue or recent change?", options: [
            { label:"Recurring — chronic FOG in influent", next:"diagnosis", diagnosisId:"hw_grit_fog_chronic" },
            { label:"Recent change — slug of grease in influent", next:"diagnosis", diagnosisId:"hw_grit_fog_slug" }]}
        ]},
      { id:"hw_grit_pump", label:"Grit pump problems — low flow, no flow, or wear",
        questions: [
          { id:"q1", text:"What is the primary symptom?", options: [
            { label:"No flow — pump running but not pumping", next:"diagnosis", diagnosisId:"hw_pump_airlock" },
            { label:"Low flow / reduced capacity", next:"diagnosis", diagnosisId:"hw_pump_wear" },
            { label:"Pump plugged — won't start or overloading", next:"diagnosis", diagnosisId:"hw_pump_plugged" }]}
        ]},
      { id:"hw_pump_rags", label:"Rags / debris accumulating at grit pump suction",
        questions: [
          { id:"q1", text:"Is bar screen performing properly upstream?", options: [
            { label:"No — bar screen issue allowing debris through", next:"diagnosis", diagnosisId:"hw_pump_rags_screen" },
            { label:"Screen appears normal", next:"diagnosis", diagnosisId:"hw_pump_rags_size" }]}
        ]},
      { id:"hw_cyclone_separation", label:"Hydrocyclone poor separation — grit in overflow or low underflow",
        questions: [
          { id:"q1", text:"What does the cyclone underflow (apex discharge) look like?", options: [
            { label:"Thin or watery — not concentrating grit", next:"diagnosis", diagnosisId:"hw_cyclone_apex_open" },
            { label:"No underflow — apex appears plugged", next:"diagnosis", diagnosisId:"hw_cyclone_apex_plug" },
            { label:"Normal underflow but overflow still carrying grit", next:"diagnosis", diagnosisId:"hw_cyclone_overflow_grit" }]}
        ]},
      { id:"hw_cyclone_vortex", label:"Hydrocyclone vortex finder plugging or damage",
        questions: [
          { id:"q1", text:"Is overflow (vortex finder discharge) absent or restricted?", options: [
            { label:"Yes — overflow is blocked or very low", next:"diagnosis", diagnosisId:"hw_cyclone_vortex_plug" },
            { label:"Overflow normal but separation poor", next:"diagnosis", diagnosisId:"hw_cyclone_vortex_wear" }]}
        ]},
      { id:"hw_cyclone_pressure", label:"Hydrocyclone feed pressure too low or too high",
        questions: [
          { id:"q1", text:"Is feed pressure above or below design range?", options: [
            { label:"Below design — low pressure", next:"diagnosis", diagnosisId:"hw_cyclone_low_pressure" },
            { label:"Above design — excessive pressure", next:"diagnosis", diagnosisId:"hw_cyclone_high_pressure" }]}
        ]},
      { id:"hw_classifier_screw", label:"Grit classifier screw / conveyor problems",
        questions: [
          { id:"q1", text:"What is the nature of the problem?", options: [
            { label:"Screw not turning — motor fault or jam", next:"diagnosis", diagnosisId:"hw_class_screw_jam" },
            { label:"Screw turning but grit not advancing / spillage", next:"diagnosis", diagnosisId:"hw_class_screw_overload" },
            { label:"Screw wear — grit falling back into tank", next:"diagnosis", diagnosisId:"hw_class_screw_wear" }]}
        ]},
      { id:"hw_classifier_overflow", label:"Grit classifier overflow quality — high TSS or organics",
        questions: [
          { id:"q1", text:"Is the classifier overflow returning to headworks or a channel?", options: [
            { label:"Yes — overflow goes back to plant headworks", next:"diagnosis", diagnosisId:"hw_class_overflow_recycle" },
            { label:"Overflow quality concern for other reason", next:"diagnosis", diagnosisId:"hw_class_overflow_quality" }]}
        ]},
      { id:"hw_classifier_wash", label:"Grit classifier wash water issues",
        questions: [
          { id:"q1", text:"What is the wash water problem?", options: [
            { label:"No wash water flow — supply line or valve issue", next:"diagnosis", diagnosisId:"hw_class_wash_no_flow" },
            { label:"Wash water present but grit still organics-laden", next:"diagnosis", diagnosisId:"hw_class_wash_insufficient" },
            { label:"Wash water causing classifier overflow quality issues", next:"diagnosis", diagnosisId:"hw_class_wash_excess" }]}
        ]}
    ]
  },

  influent: {
    label: "Influent / Loading",
    symptoms: [
      { id:"high_flow", label:"Sudden high flow / hydraulic surge",
        questions: [
          { id:"q1", text:"Is there a rain event or storm occurring?", options: [
            { label:"Yes — wet weather event", next:"diagnosis", diagnosisId:"inf_wet_weather" },
            { label:"No — dry weather conditions", next:"q2" }]},
          { id:"q2", text:"Has there been any industrial discharge reported upstream?", options: [
            { label:"Yes / possibly", next:"diagnosis", diagnosisId:"inf_industrial_surge" },
            { label:"No unusual activity", next:"diagnosis", diagnosisId:"inf_unknown_surge" }]}
        ]},
      { id:"high_strength", label:"High-strength influent / elevated BOD or ammonia",
        questions: [
          { id:"q1", text:"Is the elevated load sustained or a one-time slug?", options: [
            { label:"Sustained over multiple days", next:"diagnosis", diagnosisId:"inf_sustained_load" },
            { label:"Short-term slug load", next:"diagnosis", diagnosisId:"inf_slug_load" }]}
        ]},
      { id:"odor_headworks", label:"Strong odor at headworks (H2S / septic smell)",
        questions: [
          { id:"q1", text:"What is the collection system travel time to the plant?", options: [
            { label:"Long (>4–6 hours transit)", next:"diagnosis", diagnosisId:"inf_septic_long" },
            { label:"Short (<4 hours transit)", next:"diagnosis", diagnosisId:"inf_septic_short" }]}
        ]},
      { id:"fog_loading", label:"High FOG / grease in influent (visible sheen or scum)",
        questions: [
          { id:"q1", text:"Is the grease coming in concentrated slugs or continuously?", options: [
            { label:"Periodic slug — likely a grease trap pump-out", next:"diagnosis", diagnosisId:"inf_fog_slug" },
            { label:"Continuous elevated levels", next:"diagnosis", diagnosisId:"inf_fog_chronic" }]}
        ]},
      { id:"low_flow", label:"Unusually low flow / low-strength influent",
        questions: [
          { id:"q1", text:"Is this a known seasonal or diurnal pattern?", options: [
            { label:"Yes — expected (resort community, seasonal)", next:"diagnosis", diagnosisId:"inf_low_seasonal" },
            { label:"No — unexpected drop", next:"diagnosis", diagnosisId:"inf_low_unexpected" }]}
        ]},
      { id:"nutrient_deficiency", label:"Suspected nutrient deficiency (low N or P relative to BOD)",
        questions: [
          { id:"q1", text:"What type of wastewater is being treated?", options: [
            { label:"Industrial / food processing dominant", next:"diagnosis", diagnosisId:"inf_nutrient_industrial" },
            { label:"Municipal with unusual characteristics", next:"diagnosis", diagnosisId:"inf_nutrient_municipal" }]}
        ]}
    ]
  },

  primary: {
    label: "Primary Clarifier",
    symptoms: [
      { id:"pc_scum_accumulation", label:"Scum accumulating on surface — not being removed",
        questions: [
          { id:"q1", text:"Is the scum collection blade or skimmer operating?", options: [
            { label:"No — skimmer stopped or faulted", next:"diagnosis", diagnosisId:"pc_scum_skimmer_fault" },
            { label:"Yes — skimmer running but scum not clearing", next:"q2" }]},
          { id:"q2", text:"Is the scum pit or scum pump functional?", options: [
            { label:"Scum pit full or scum pump failed", next:"diagnosis", diagnosisId:"pc_scum_pump" },
            { label:"Scum pit and pump appear OK", next:"diagnosis", diagnosisId:"pc_scum_blade" }]}
        ]},
      { id:"pc_scum_odor", label:"Scum odor — strong sulfur or rancid smell from scum pit",
        questions: [
          { id:"q1", text:"How often is the scum pit pumped out?", options: [
            { label:"Infrequently — scum sitting for long periods", next:"diagnosis", diagnosisId:"pc_scum_pit_septic" },
            { label:"Regularly pumped — odor persists anyway", next:"diagnosis", diagnosisId:"pc_scum_influent_septic" }]}
        ]},
      { id:"pc_sludge_mechanism", label:"Sludge collector mechanism problem",
        questions: [
          { id:"q1", text:"What type of collector is in use?", options: [
            { label:"Circular clarifier — rotating scraper", next:"q2" },
            { label:"Rectangular clarifier — chain and flight", next:"q3" }]},
          { id:"q2", text:"What is the problem with the rotating scraper?", options: [
            { label:"Drive torque overload or motor fault", next:"diagnosis", diagnosisId:"pc_scraper_torque" },
            { label:"Scraper arm deflection or visible damage", next:"diagnosis", diagnosisId:"pc_scraper_damage" }]},
          { id:"q3", text:"What is the problem with the chain and flight?", options: [
            { label:"Chain broken, slipped, or jammed", next:"diagnosis", diagnosisId:"pc_flight_chain" },
            { label:"Flight boards worn or missing", next:"diagnosis", diagnosisId:"pc_flight_wear" }]}
        ]},
      { id:"pc_sludge_blanket", label:"Sludge blanket too deep or rising toward weirs",
        questions: [
          { id:"q1", text:"Is the primary sludge pump operating?", options: [
            { label:"No — pump stopped or failed", next:"diagnosis", diagnosisId:"pc_sludge_pump_failure" },
            { label:"Yes — pumping but blanket still rising", next:"q2" }]},
          { id:"q2", text:"Has influent solids loading increased?", options: [
            { label:"Yes — higher loading than normal", next:"diagnosis", diagnosisId:"pc_sludge_overload" },
            { label:"No — loading normal, sludge just accumulating", next:"diagnosis", diagnosisId:"pc_sludge_pump_rate" }]}
        ]},
      { id:"pc_sludge_thin", label:"Primary sludge too thin / watery",
        questions: [
          { id:"q1", text:"Is the sludge pump running too frequently or at too high a rate?", options: [
            { label:"Yes — pump running almost continuously", next:"diagnosis", diagnosisId:"pc_sludge_overthin_pump" },
            { label:"No — pump rate seems normal", next:"diagnosis", diagnosisId:"pc_sludge_overthin_loading" }]}
        ]},
      { id:"pc_sludge_ferment", label:"Sludge fermenting in hopper — gas rising, odor, floating sludge",
        questions: [
          { id:"q1", text:"How long has sludge been sitting in the hopper without being pumped?", options: [
            { label:"Many hours or days — pump rate too low", next:"diagnosis", diagnosisId:"pc_sludge_ferment_pump" },
            { label:"Normal pumping schedule — fermentation happening anyway", next:"diagnosis", diagnosisId:"pc_sludge_ferment_temp" }]}
        ]},
      { id:"pc_effluent_tss", label:"High primary effluent TSS — poor solids removal",
        questions: [
          { id:"q1", text:"Has influent flow increased significantly?", options: [
            { label:"Yes — high flow event", next:"diagnosis", diagnosisId:"pc_effluent_hydraulic" },
            { label:"No — normal flow", next:"q2" }]},
          { id:"q2", text:"Is the sludge collector operating and sludge being pumped?", options: [
            { label:"Collector or pump issue present", next:"diagnosis", diagnosisId:"pc_effluent_blanket" },
            { label:"Collector and pump operating normally", next:"diagnosis", diagnosisId:"pc_effluent_shortcircuit" }]}
        ]},
      { id:"pc_effluent_bod", label:"Poor BOD removal in primary / high primary effluent BOD",
        questions: [
          { id:"q1", text:"Is the influent BOD predominantly soluble or particulate?", options: [
            { label:"Mostly soluble — influent is clear but high BOD", next:"diagnosis", diagnosisId:"pc_bod_soluble" },
            { label:"Particulate — high TSS and BOD together", next:"diagnosis", diagnosisId:"pc_bod_tss" }]}
        ]},
      { id:"pc_floatables", label:"Floatables / foam passing over weir into effluent",
        questions: [
          { id:"q1", text:"What type of floating material is escaping?", options: [
            { label:"Grease, FOG, or oily sheen", next:"diagnosis", diagnosisId:"pc_floatables_fog" },
            { label:"Plastic, rags, or non-biodegradable debris", next:"diagnosis", diagnosisId:"pc_floatables_debris" },
            { label:"Foam or biological scum", next:"diagnosis", diagnosisId:"pc_floatables_foam" }]}
        ]},
      { id:"pc_odor_basin", label:"Odor from primary clarifier basin",
        questions: [
          { id:"q1", text:"How is the odor best described?", options: [
            { label:"H2S / rotten egg — sulfide-based", next:"diagnosis", diagnosisId:"pc_odor_h2s" },
            { label:"Rancid / butyric — fermentation odor", next:"diagnosis", diagnosisId:"pc_odor_ferment" }]}
        ]},
      { id:"pc_hydraulic_overload", label:"Hydraulic overload — high SOR at peak flow",
        questions: [
          { id:"q1", text:"Is this a recurring peak flow issue or a one-time event?", options: [
            { label:"Recurring — happens regularly at peak hours or wet weather", next:"diagnosis", diagnosisId:"pc_hydraulic_recurring" },
            { label:"One-time event — unusual conditions", next:"diagnosis", diagnosisId:"pc_hydraulic_event" }]}
        ]},
      { id:"pc_weir_uneven", label:"Uneven weir flow — effluent not leaving evenly",
        questions: [
          { id:"q1", text:"Is weir unevenness caused by structural or fouling issues?", options: [
            { label:"Algae or biological growth on weir", next:"diagnosis", diagnosisId:"pc_weir_algae" },
            { label:"Weir out of level or structurally uneven", next:"diagnosis", diagnosisId:"pc_weir_level" }]}
        ]}
    ]
  },

  aeration: {
    label: "Aeration Basin",
    symptoms: [
      { id:"low_do", label:"Low dissolved oxygen (DO < 1.0 mg/L)",
        questions: [
          { id:"q1", text:"Has influent flow or loading increased recently?", options: [
            { label:"Yes — loading increase", next:"diagnosis", diagnosisId:"aer_do_loading" },
            { label:"No change in loading", next:"q2" }]},
          { id:"q2", text:"Is aeration equipment operating normally?", options: [
            { label:"Equipment issue suspected", next:"diagnosis", diagnosisId:"aer_do_equipment" },
            { label:"Equipment appears normal", next:"diagnosis", diagnosisId:"aer_do_nitrification" }]}
        ]},
      { id:"high_do", label:"Excessively high DO (> 4–5 mg/L consistently)",
        questions: [
          { id:"q1", text:"Has loading dropped or flow decreased?", options: [
            { label:"Yes — lower loading than normal", next:"diagnosis", diagnosisId:"aer_high_do_loading" },
            { label:"No — loading is normal", next:"diagnosis", diagnosisId:"aer_high_do_control" }]}
        ]},
      { id:"foaming", label:"Foaming / scum on basin surface",
        questions: [
          { id:"q1", text:"Describe the foam appearance:", options: [
            { label:"White, sudsy, dissipates quickly", next:"diagnosis", diagnosisId:"aer_foam_surfactant" },
            { label:"Thick, stable, brown or greasy", next:"q2" },
            { label:"White, stable, pillowy — won't break", next:"diagnosis", diagnosisId:"aer_foam_nocardia" }]},
          { id:"q2", text:"Is the MLSS decreasing or SRT low?", options: [
            { label:"Yes — low SRT or declining MLSS", next:"diagnosis", diagnosisId:"aer_foam_nocardia" },
            { label:"No — SRT is normal or high", next:"diagnosis", diagnosisId:"aer_foam_microthrix" }]}
        ]},
      { id:"bulking", label:"Poor settling / high SVI (> 150 mL/g)",
        questions: [
          { id:"q1", text:"What does the settled sludge look like in a settleability test?", options: [
            { label:"Fluffy, diffuse edges — slow settling", next:"diagnosis", diagnosisId:"aer_bulk_filamentous" },
            { label:"Compact but rising back to surface", next:"diagnosis", diagnosisId:"aer_bulk_denitrification" },
            { label:"Watery, dispersed — no clear floc", next:"diagnosis", diagnosisId:"aer_bulk_dispersed" },
            { label:"Viscous, jelly-like, very slow", next:"diagnosis", diagnosisId:"aer_bulk_viscous" }]}
        ]},
      { id:"high_mlss", label:"MLSS climbing / sludge inventory increasing",
        questions: [
          { id:"q1", text:"Is WAS being wasted regularly?", options: [
            { label:"No — wasting paused or reduced", next:"diagnosis", diagnosisId:"aer_mlss_wasting" },
            { label:"Yes — wasting on schedule", next:"diagnosis", diagnosisId:"aer_mlss_loading" }]}
        ]},
      { id:"low_mlss", label:"MLSS dropping / losing sludge inventory",
        questions: [
          { id:"q1", text:"Is solids loss visible in the effluent?", options: [
            { label:"Yes — turbid effluent, solids carryover", next:"diagnosis", diagnosisId:"aer_mlss_washout" },
            { label:"No — effluent looks OK", next:"q2" }]},
          { id:"q2", text:"Has WAS rate increased or was there an accidental over-wasting event?", options: [
            { label:"Yes — over-wasting suspected", next:"diagnosis", diagnosisId:"aer_mlss_overwaste" },
            { label:"No — wasting is normal", next:"diagnosis", diagnosisId:"aer_mlss_loading_drop" }]}
        ]},
      { id:"high_ammonia_aer", label:"High effluent ammonia / nitrification failure",
        questions: [
          { id:"q1", text:"Has temperature dropped significantly (below 12°C / 54°F)?", options: [
            { label:"Yes — cold weather", next:"diagnosis", diagnosisId:"aer_nitrif_temp" },
            { label:"No — normal temperature", next:"q2" }]},
          { id:"q2", text:"What is the current SRT?", options: [
            { label:"Low SRT (< 8–10 days)", next:"diagnosis", diagnosisId:"aer_nitrif_srt" },
            { label:"SRT seems adequate", next:"diagnosis", diagnosisId:"aer_nitrif_inhibition" }]}
        ]},
      { id:"ph_swing", label:"pH swings in aeration basin",
        questions: [
          { id:"q1", text:"Which direction is the pH moving?", options: [
            { label:"pH dropping — becoming acidic", next:"diagnosis", diagnosisId:"aer_ph_low" },
            { label:"pH rising — becoming alkaline", next:"diagnosis", diagnosisId:"aer_ph_high" }]}
        ]},
      { id:"color_change", label:"Mixed liquor color change (very dark, pale, or unusual)",
        questions: [
          { id:"q1", text:"What color is the mixed liquor?", options: [
            { label:"Very dark brown / black", next:"diagnosis", diagnosisId:"aer_color_black" },
            { label:"Pale gray or tan — lighter than normal", next:"diagnosis", diagnosisId:"aer_color_pale" },
            { label:"Unusual color (orange, purple, red)", next:"diagnosis", diagnosisId:"aer_color_unusual" }]}
        ]}
    ]
  },

  clarifier: {
    label: "Secondary Clarifier",
    symptoms: [
      { id:"high_tss", label:"High effluent TSS / turbid effluent",
        questions: [
          { id:"q1", text:"Is solids carryover visible as a rising blanket or fine turbidity?", options: [
            { label:"Rising blanket / bulk sludge rising", next:"q2" },
            { label:"Fine pin floc or turbidity — no blanket", next:"diagnosis", diagnosisId:"clar_pin_floc" },
            { label:"Large fluffy clumps floating", next:"diagnosis", diagnosisId:"clar_floating_sludge" }]},
          { id:"q2", text:"Has the sludge blanket been rising gradually or suddenly?", options: [
            { label:"Gradual rise over hours", next:"diagnosis", diagnosisId:"clar_blanket_denitrification" },
            { label:"Sudden — hydraulic or load surge", next:"diagnosis", diagnosisId:"clar_blanket_hydraulic" }]}
        ]},
      { id:"thin_blanket", label:"Sludge blanket too thin or absent",
        questions: [
          { id:"q1", text:"Is the MLSS in the aeration basin also low?", options: [
            { label:"Yes — MLSS is declining too", next:"diagnosis", diagnosisId:"clar_thin_mlss" },
            { label:"No — aeration MLSS is normal", next:"diagnosis", diagnosisId:"clar_thin_ras" }]}
        ]},
      { id:"ras_issues", label:"RAS flow problems / not returning sludge effectively",
        questions: [
          { id:"q1", text:"What is the RAS pump status?", options: [
            { label:"Pump failure / mechanical issue", next:"diagnosis", diagnosisId:"clar_ras_mechanical" },
            { label:"Pump running but RAS looks thin/watery", next:"diagnosis", diagnosisId:"clar_ras_thin" },
            { label:"RAS flow OK but blanket still rising", next:"diagnosis", diagnosisId:"clar_ras_rate" }]}
        ]},
      { id:"clarifier_odor", label:"Septic / sulfur odor from clarifier",
        questions: [
          { id:"q1", text:"Is the sludge blanket deep or holding long in the clarifier?", options: [
            { label:"Yes — deep blanket, long retention", next:"diagnosis", diagnosisId:"clar_odor_blanket" },
            { label:"No — blanket depth looks normal", next:"diagnosis", diagnosisId:"clar_odor_influent" }]}
        ]},
      { id:"scum_buildup", label:"Scum / grease accumulation on clarifier surface",
        questions: [
          { id:"q1", text:"Is the scum greasy/oily or biological foam?", options: [
            { label:"Greasy, oily sheen — FOG-related", next:"diagnosis", diagnosisId:"clar_scum_fog" },
            { label:"Biological foam / dark stable scum", next:"diagnosis", diagnosisId:"clar_scum_bio" }]}
        ]},
      { id:"short_circuit", label:"Suspected short-circuiting / uneven flow in clarifier",
        questions: [
          { id:"q1", text:"Are effluent quality problems worst during peak flow periods?", options: [
            { label:"Yes — problems spike at peak flow", next:"diagnosis", diagnosisId:"clar_shortcircuit_hydraulic" },
            { label:"Problems are random / not flow-related", next:"diagnosis", diagnosisId:"clar_shortcircuit_structural" }]}
        ]},
      { id:"weir_issues", label:"Uneven effluent weir flow / one side overloaded",
        questions: [
          { id:"q1", text:"Is the clarifier level or are there obvious structural issues?", options: [
            { label:"Clarifier may not be level", next:"diagnosis", diagnosisId:"clar_weir_level" },
            { label:"Level seems OK — weir flow still uneven", next:"diagnosis", diagnosisId:"clar_weir_algae" }]}
        ]}
    ]
  },

  sludge: {
    label: "Solids Train",
    symptoms: [
      { id:"gbt_poor_thickening", label:"GBT — poor thickening / low TWAS density (target ~5–6% TS)",
        questions: [
          { id:"q1", text:"Has polymer dose or type changed recently?", options: [
            { label:"Yes — polymer change or pump issue", next:"diagnosis", diagnosisId:"gbt_polymer" },
            { label:"No polymer change", next:"q2" }]},
          { id:"q2", text:"Has WAS quality changed — SVI high or bulking in secondary?", options: [
            { label:"Yes — WAS is thin or bulking", next:"diagnosis", diagnosisId:"gbt_was_quality" },
            { label:"No — WAS quality normal", next:"diagnosis", diagnosisId:"gbt_belt_condition" }]}
        ]},
      { id:"gbt_blinding", label:"GBT — belt blinding / frequent wash cycles needed",
        questions: [
          { id:"q1", text:"What does the belt look like?", options: [
            { label:"Caked and blinded — pores visibly blocked", next:"diagnosis", diagnosisId:"gbt_blind_mechanical" },
            { label:"Wet cake squeezing through — poor floc conditioning", next:"diagnosis", diagnosisId:"gbt_blind_polymer" }]}
        ]},
      { id:"gbt_alarm", label:"GBT — PLC comm failure, polymer pump fault, or drive alarm",
        questions: [
          { id:"q1", text:"Which system is in alarm?", options: [
            { label:"PLC / communication fault", next:"diagnosis", diagnosisId:"gbt_plc_fault" },
            { label:"Polymer pump failure", next:"diagnosis", diagnosisId:"gbt_polymer_pump" },
            { label:"Belt drive or tension alarm", next:"diagnosis", diagnosisId:"gbt_drive_alarm" }]}
        ]},
      { id:"gbt_filtrate", label:"GBT — cloudy or high-TSS filtrate returning to plant",
        questions: [
          { id:"q1", text:"Is polymer conditioning adequate — does floc look well-formed?", options: [
            { label:"Poor floc — polymer issue", next:"diagnosis", diagnosisId:"gbt_filtrate_polymer" },
            { label:"Floc looks OK — belt or mechanical issue", next:"diagnosis", diagnosisId:"gbt_filtrate_belt" }]}
        ]},
      { id:"gt_poor_thickening", label:"Gravity thickener — thin underflow / poor primary sludge concentration",
        questions: [
          { id:"q1", text:"Is the thickener blanket level visible and adequate?", options: [
            { label:"No blanket — very thin, no concentration", next:"diagnosis", diagnosisId:"gt_no_blanket" },
            { label:"Blanket present but underflow still thin", next:"diagnosis", diagnosisId:"gt_overthin_pump" }]}
        ]},
      { id:"gt_screen_grinder", label:"Gravity thickener — screen or grinder/compactor issue",
        questions: [
          { id:"q1", text:"What is the nature of the problem?", options: [
            { label:"Screen blinding — flow backing up", next:"diagnosis", diagnosisId:"gt_screen_blind" },
            { label:"Grinder/compactor jam or fault", next:"diagnosis", diagnosisId:"gt_grinder_fault" },
            { label:"High dilution flow needed to compensate for thick sludge", next:"diagnosis", diagnosisId:"gt_dilution" }]}
        ]},
      { id:"gt_alarm", label:"Gravity thickener — active alarm or flow anomaly",
        questions: [
          { id:"q1", text:"What does the SCADA show?", options: [
            { label:"Sludge flow reading zero or negative", next:"diagnosis", diagnosisId:"gt_flow_zero" },
            { label:"Transfer flow not matching sludge flow", next:"diagnosis", diagnosisId:"gt_flow_mismatch" },
            { label:"Active alarm on thickener equipment", next:"diagnosis", diagnosisId:"gt_equipment_alarm" }]}
        ]},
      { id:"ths_level", label:"THS storage cell — level too high or too low",
        questions: [
          { id:"q1", text:"Which condition is present?", options: [
            { label:"Cell level rising — digester feed not keeping up", next:"diagnosis", diagnosisId:"ths_high_level" },
            { label:"Cell level dropping — thickening not keeping up with demand", next:"diagnosis", diagnosisId:"ths_low_level" }]}
        ]},
      { id:"dig_low_gas", label:"Digester — low gas production / dropping gas flow",
        questions: [
          { id:"q1", text:"Has VS loading to digesters changed recently?", options: [
            { label:"Yes — feed reduced or composition changed", next:"diagnosis", diagnosisId:"dig_gas_loading" },
            { label:"No — loading appears normal", next:"q2" }]},
          { id:"q2", text:"Is digester temperature holding at ~99°F?", options: [
            { label:"No — temperature has dropped", next:"diagnosis", diagnosisId:"dig_gas_temp" },
            { label:"Yes — temperature normal", next:"diagnosis", diagnosisId:"dig_gas_biology" }]}
        ]},
      { id:"dig_upset", label:"Digester — souring, low pH, or VFA accumulation",
        questions: [
          { id:"q1", text:"What is the digester pH reading?", options: [
            { label:"Below 6.8 — acidic, souring in progress", next:"diagnosis", diagnosisId:"dig_souring" },
            { label:"6.8–7.4 — normal range but other upset signs", next:"diagnosis", diagnosisId:"dig_early_upset" },
            { label:"Above 7.6 — elevated", next:"diagnosis", diagnosisId:"dig_high_ph" }]}
        ]},
      { id:"dig_temp", label:"Digester — temperature out of range (target ~99°F)",
        questions: [
          { id:"q1", text:"Is temperature rising or falling?", options: [
            { label:"Falling below setpoint", next:"diagnosis", diagnosisId:"dig_temp_low" },
            { label:"Rising above setpoint", next:"diagnosis", diagnosisId:"dig_temp_high" }]}
        ]},
      { id:"dig_mixing", label:"Digester — mixing pump fault or poor mixing",
        questions: [
          { id:"q1", text:"Are mixing pumps running per SCADA?", options: [
            { label:"No — mixing pump stopped or faulted", next:"diagnosis", diagnosisId:"dig_mix_fault" },
            { label:"Running but mixing seems ineffective", next:"diagnosis", diagnosisId:"dig_mix_stratification" }]}
        ]},
      { id:"dig_foam", label:"Digester — foaming or foam in gas system",
        questions: [
          { id:"q1", text:"Was there a recent change in feed sludge composition?", options: [
            { label:"Yes — new input or loading increase", next:"diagnosis", diagnosisId:"dig_foam_load" },
            { label:"No change — foam appeared without obvious cause", next:"diagnosis", diagnosisId:"dig_foam_filaments" }]}
        ]},
      { id:"dig_negative_flow", label:"Digester — negative or near-zero flow reading",
        questions: [
          { id:"q1", text:"Is the digester currently in active feed rotation?", options: [
            { label:"No — digester is in standby or holding", next:"diagnosis", diagnosisId:"dig_flow_standby" },
            { label:"Yes — should be receiving feed but showing zero/negative", next:"diagnosis", diagnosisId:"dig_flow_meter" }]}
        ]},
      { id:"gas_flare", label:"Digester gas — high flare flow / excess gas to flare",
        questions: [
          { id:"q1", text:"Is there a known reason for excess gas?", options: [
            { label:"Yes — expected from operational change", next:"diagnosis", diagnosisId:"gas_flare_expected" },
            { label:"No — unexpected flare increase", next:"diagnosis", diagnosisId:"gas_flare_unexpected" }]}
        ]},
      { id:"gas_conditioning", label:"Gas conditioning system — flow, pressure, or quality issue",
        questions: [
          { id:"q1", text:"What is the nature of the issue?", options: [
            { label:"Gas conditioning flow dropping", next:"diagnosis", diagnosisId:"gas_cond_flow" },
            { label:"H2S or moisture in conditioned gas", next:"diagnosis", diagnosisId:"gas_cond_quality" },
            { label:"Pressure issue in gas system", next:"diagnosis", diagnosisId:"gas_cond_pressure" }]}
        ]},
      { id:"phos_precip_ph", label:"Phos precip — pH out of range or not holding at setpoint (~9.1)",
        questions: [
          { id:"q1", text:"Is the reactor blower operating?", options: [
            { label:"No — blower stopped or faulted", next:"diagnosis", diagnosisId:"phos_blower_fault" },
            { label:"Yes — blower running but pH still off", next:"diagnosis", diagnosisId:"phos_ph_chemical" }]}
        ]},
      { id:"phos_precip_flow", label:"Phos precip — underflow or influent flow anomaly",
        questions: [
          { id:"q1", text:"Which flow is abnormal?", options: [
            { label:"Influent flow low — Digester 3 not feeding adequately", next:"diagnosis", diagnosisId:"phos_influent_low" },
            { label:"Underflow pump issue — precipitate not removing", next:"diagnosis", diagnosisId:"phos_underflow_pump" },
            { label:"Precip pump fault", next:"diagnosis", diagnosisId:"phos_precip_pump" }]}
        ]},
      { id:"cent_performance", label:"Centrifuge — poor cake solids / low capture",
        questions: [
          { id:"q1", text:"Has polymer dose or type changed?", options: [
            { label:"Yes — polymer issue", next:"diagnosis", diagnosisId:"cent_polymer" },
            { label:"No — polymer unchanged", next:"q2" }]},
          { id:"q2", text:"Has digested sludge quality changed?", options: [
            { label:"Yes — feed quality change", next:"diagnosis", diagnosisId:"cent_feed_quality" },
            { label:"No — feed appears normal", next:"diagnosis", diagnosisId:"cent_mechanical" }]}
        ]},
      { id:"cent_load", label:"Centrifuge — load reading low or unit not running",
        questions: [
          { id:"q1", text:"Is the low load intentional — only one unit needed?", options: [
            { label:"Yes — running single unit per current production", next:"diagnosis", diagnosisId:"cent_load_planned" },
            { label:"No — units should be running but aren't", next:"diagnosis", diagnosisId:"cent_load_fault" }]}
        ]},
      { id:"cent_vibration", label:"Centrifuge — vibration alarm or bearing temperature high",
        questions: [
          { id:"q1", text:"Is the vibration accompanied by unusual noise?", options: [
            { label:"Yes — grinding or knocking sound", next:"diagnosis", diagnosisId:"cent_vibe_mechanical" },
            { label:"No — smooth running but vibration sensor alarming", next:"diagnosis", diagnosisId:"cent_vibe_imbalance" }]}
        ]},
      { id:"cent_centrate", label:"Centrifuge centrate — high TSS or high ammonia going to ANAMMOX",
        questions: [
          { id:"q1", text:"Is centrate TSS high or ammonia high — or both?", options: [
            { label:"High TSS — solids capture poor", next:"diagnosis", diagnosisId:"cent_centrate_tss" },
            { label:"High ammonia — expected from digested sludge", next:"diagnosis", diagnosisId:"cent_centrate_ammonia" }]}
        ]},
      { id:"dryer_discharge_screw", label:"Dryer — discharge screw MCC fault",
        questions: [
          { id:"q1", text:"Is the MCC fault an electrical or mechanical issue?", options: [
            { label:"MCC communication or electrical fault", next:"diagnosis", diagnosisId:"dryer_screw_mcc" },
            { label:"Screw mechanically jammed or overloaded", next:"diagnosis", diagnosisId:"dryer_screw_jam" }]}
        ]},
      { id:"dryer_silo", label:"Dryer silo level — too high or too low",
        questions: [
          { id:"q1", text:"Which condition is present?", options: [
            { label:"Silo level rising — product not being removed fast enough", next:"diagnosis", diagnosisId:"dryer_silo_high" },
            { label:"Silo level low — dryer production insufficient", next:"diagnosis", diagnosisId:"dryer_silo_low" }]}
        ]},
      { id:"dryer_product", label:"Dryer — Class A / Class B determination concern",
        questions: [
          { id:"q1", text:"What is the concern with pathogen reduction classification?", options: [
            { label:"Fecal coliform sample borderline or failing — risk of Class B", next:"diagnosis", diagnosisId:"dryer_class_fecal" },
            { label:"Temperature or residence time not meeting Class A criteria", next:"diagnosis", diagnosisId:"dryer_class_temp" }]}
        ]},
      { id:"dryer_cooling", label:"Dryer — cooling water pump issue or high temperature alarm",
        questions: [
          { id:"q1", text:"Is the cooling water pump running?", options: [
            { label:"No — cooling pump stopped or faulted", next:"diagnosis", diagnosisId:"dryer_cooling_pump" },
            { label:"Yes — pump running but temperature still elevated", next:"diagnosis", diagnosisId:"dryer_cooling_flow" }]}
        ]},
      { id:"anammox_performance", label:"ANAMMOX — poor nitrogen removal / high ammonia in effluent",
        questions: [
          { id:"q1", text:"What does SCADA show for DO in the reactors?", options: [
            { label:"DO too high — suppressing ANAMMOX activity", next:"diagnosis", diagnosisId:"anammox_do_high" },
            { label:"DO too low — insufficient nitrite for ANAMMOX", next:"diagnosis", diagnosisId:"anammox_do_low" },
            { label:"DO in range but performance still poor", next:"diagnosis", diagnosisId:"anammox_inhibition" }]}
        ]},
      { id:"anammox_temp", label:"ANAMMOX — reactor temperature out of range (~94–95°F)",
        questions: [
          { id:"q1", text:"Is temperature rising or falling?", options: [
            { label:"Falling — centrate cooling or heat loss", next:"diagnosis", diagnosisId:"anammox_temp_low" },
            { label:"Rising — excessive heat input or reduced cooling", next:"diagnosis", diagnosisId:"anammox_temp_high" }]}
        ]},
      { id:"anammox_eq", label:"ANAMMOX — EQ tank level too high or centrate pump issue",
        questions: [
          { id:"q1", text:"Are both EQ tanks accumulating or just one?", options: [
            { label:"Both tanks rising — centrate flow exceeding ANAMMOX capacity", next:"diagnosis", diagnosisId:"anammox_eq_overflow" },
            { label:"One tank rising — centrate pump or routing issue", next:"diagnosis", diagnosisId:"anammox_eq_pump" }]}
        ]},
      { id:"dss_level", label:"DSS — dewatered sludge storage level too high",
        questions: [
          { id:"q1", text:"Is dewatered cake being conveyed to dryers?", options: [
            { label:"No — conveyor or dryer issue stopping flow", next:"diagnosis", diagnosisId:"dss_high_dryer" },
            { label:"Yes — dryers running but DSS still accumulating", next:"diagnosis", diagnosisId:"dss_high_production" }]}
        ]},
      { id:"dss_pump", label:"Centrifuge feed pump — flow anomaly or pump fault",
        questions: [
          { id:"q1", text:"What is the pump showing?", options: [
            { label:"Pump showing negative flow reading", next:"diagnosis", diagnosisId:"dss_pump_negative" },
            { label:"Pump not delivering design flow", next:"diagnosis", diagnosisId:"dss_pump_low" },
            { label:"Pump fault or alarm", next:"diagnosis", diagnosisId:"dss_pump_fault" }]}
        ]}
    ]
  },

  dnfilter: {
    label: "Denitrification Filters",
    symptoms: [
      { id:"dn_high_nitrate", label:"High effluent nitrate / filter not denitrifying",
        questions: [
          { id:"q1", text:"Is carbon source (methanol, acetate, glycerol) being fed?", options: [
            { label:"No carbon or feed appears to have stopped", next:"diagnosis", diagnosisId:"dnf_no_carbon" },
            { label:"Carbon is feeding — dose may be off", next:"q2" }]},
          { id:"q2", text:"What is the DO concentration in filter influent?", options: [
            { label:"DO is elevated (> 1.0 mg/L entering filter)", next:"diagnosis", diagnosisId:"dnf_do_breakthrough" },
            { label:"DO is low — not a DO problem", next:"q3" }]},
          { id:"q3", text:"Has water temperature dropped recently?", options: [
            { label:"Yes — significant temperature drop", next:"diagnosis", diagnosisId:"dnf_temp_rate" },
            { label:"No — temperature is normal", next:"diagnosis", diagnosisId:"dnf_underdose" }]}
        ]},
      { id:"dn_carbon_issues", label:"Carbon source feed problems (methanol / acetate)",
        questions: [
          { id:"q1", text:"What type of carbon source is in use?", options: [
            { label:"Methanol", next:"diagnosis", diagnosisId:"dnf_carbon_methanol" },
            { label:"Acetate or sodium acetate", next:"diagnosis", diagnosisId:"dnf_carbon_acetate" },
            { label:"Glycerol or other alternative carbon", next:"diagnosis", diagnosisId:"dnf_carbon_alt" }]}
        ]},
      { id:"dn_backwash", label:"Backwash issues — frequency, turbidity spike, or media loss",
        questions: [
          { id:"q1", text:"What is the primary backwash concern?", options: [
            { label:"Backwash not cleaning filter — headloss still high after wash", next:"diagnosis", diagnosisId:"dnf_bw_incomplete" },
            { label:"Turbidity spike after backwash lasting too long (>15–20 min)", next:"diagnosis", diagnosisId:"dnf_bw_turbidity" },
            { label:"Media loss — filter losing media over time", next:"diagnosis", diagnosisId:"dnf_bw_media_loss" },
            { label:"Backwash frequency too high — running too short", next:"diagnosis", diagnosisId:"dnf_bw_frequency" }]}
        ]},
      { id:"dn_air_binding", label:"Air / gas binding in filter bed",
        questions: [
          { id:"q1", text:"Is the gas accumulation worst at start of filter run?", options: [
            { label:"Yes — immediately after backwash", next:"diagnosis", diagnosisId:"dnf_gas_post_bw" },
            { label:"No — accumulates gradually through the run", next:"diagnosis", diagnosisId:"dnf_gas_biological" }]}
        ]},
      { id:"dn_high_tss", label:"High effluent TSS from filter",
        questions: [
          { id:"q1", text:"When does the TSS spike occur?", options: [
            { label:"Immediately / shortly after backwash (filter ripening)", next:"diagnosis", diagnosisId:"dnf_tss_ripening" },
            { label:"Late in the filter run — near end of cycle", next:"diagnosis", diagnosisId:"dnf_tss_breakthrough" },
            { label:"Continuously throughout run", next:"diagnosis", diagnosisId:"dnf_tss_continuous" }]}
        ]},
      { id:"dn_headloss", label:"Rapid headloss / short filter runs",
        questions: [
          { id:"q1", text:"Has influent TSS to the filter increased?", options: [
            { label:"Yes — higher solids loading from upstream", next:"diagnosis", diagnosisId:"dnf_hl_tss" },
            { label:"No — solids loading appears normal", next:"q2" }]},
          { id:"q2", text:"Is biological slime or excess biofilm visible on media?", options: [
            { label:"Yes — visible biomass accumulation", next:"diagnosis", diagnosisId:"dnf_hl_biofilm" },
            { label:"Not visible — media looks normal", next:"diagnosis", diagnosisId:"dnf_hl_carbon" }]}
        ]},
      { id:"dn_overdose", label:"Carbon overdose — excess methanol / acetate passing through",
        questions: [
          { id:"q1", text:"Is effluent BOD elevated alongside low nitrate?", options: [
            { label:"Yes — BOD rising, nitrate very low or zero", next:"diagnosis", diagnosisId:"dnf_overdose_confirmed" },
            { label:"Unsure — monitoring gap", next:"diagnosis", diagnosisId:"dnf_overdose_monitoring" }]}
        ]},
      { id:"dn_biomass_loss", label:"Biomass washout / losing denitrifying community",
        questions: [
          { id:"q1", text:"Was there a recent aggressive backwash or process interruption?", options: [
            { label:"Yes — unusual backwash event or extended shutdown", next:"diagnosis", diagnosisId:"dnf_biomass_wash" },
            { label:"No — normal operations", next:"diagnosis", diagnosisId:"dnf_biomass_gradual" }]}
        ]}
    ]
  },

  disinfect: {
    label: "Disinfection",
    symptoms: [
      { id:"dis_uv_low_dose", label:"UV — low calculated dose / permit CT not achieved",
        questions: [
          { id:"q1", text:"Is the UV intensity (UVI) reading lower than normal?", options: [
            { label:"Yes — intensity has dropped", next:"q2" },
            { label:"No — intensity OK but dose still low", next:"diagnosis", diagnosisId:"dis_uv_flow_high" }]},
          { id:"q2", text:"When were the UV lamps last cleaned?", options: [
            { label:"Fouling is likely — cleaning overdue", next:"diagnosis", diagnosisId:"dis_uv_fouling" },
            { label:"Recently cleaned — still low", next:"diagnosis", diagnosisId:"dis_uv_lamp_age" }]}
        ]},
      { id:"dis_uv_lamp", label:"UV — lamp failure or alarm",
        questions: [
          { id:"q1", text:"How many lamps are affected?", options: [
            { label:"Single lamp out", next:"diagnosis", diagnosisId:"dis_uv_single_lamp" },
            { label:"Multiple lamps or entire bank", next:"diagnosis", diagnosisId:"dis_uv_multi_lamp" }]}
        ]},
      { id:"dis_uv_transmittance", label:"UV — low UV transmittance (UVT) in effluent",
        questions: [
          { id:"q1", text:"Has there been a process upset or unusual influent upstream?", options: [
            { label:"Yes — upstream process issue", next:"diagnosis", diagnosisId:"dis_uv_uvt_upstream" },
            { label:"No — conditions appear normal", next:"diagnosis", diagnosisId:"dis_uv_uvt_seasonal" }]}
        ]},
      { id:"dis_uv_quartz", label:"UV — quartz sleeve fouling or damage",
        questions: [
          { id:"q1", text:"What type of fouling is visible on sleeves?", options: [
            { label:"White / gray mineral scale", next:"diagnosis", diagnosisId:"dis_uv_sleeve_scale" },
            { label:"Brown / biological film", next:"diagnosis", diagnosisId:"dis_uv_sleeve_bio" },
            { label:"Sleeve cracked or broken", next:"diagnosis", diagnosisId:"dis_uv_sleeve_broken" }]}
        ]},
      { id:"dis_cl_residual_low", label:"Chlorine — low or no residual at compliance point",
        questions: [
          { id:"q1", text:"Is chlorine feed system operating?", options: [
            { label:"No — feed has stopped or pump failed", next:"diagnosis", diagnosisId:"dis_cl_feed_failure" },
            { label:"Yes — feed running but residual still low", next:"q2" }]},
          { id:"q2", text:"Has effluent quality or turbidity changed?", options: [
            { label:"Yes — higher TSS or turbidity noted", next:"diagnosis", diagnosisId:"dis_cl_demand_tss" },
            { label:"No — effluent quality is normal", next:"diagnosis", diagnosisId:"dis_cl_demand_other" }]}
        ]},
      { id:"dis_cl_residual_high", label:"Chlorine — high residual / over-chlorination",
        questions: [
          { id:"q1", text:"Is a dechlorination system (bisulfite / SO2) in use?", options: [
            { label:"Yes — dechlorination system present", next:"diagnosis", diagnosisId:"dis_cl_high_dechlor" },
            { label:"No dechlorination — chlorine only system", next:"diagnosis", diagnosisId:"dis_cl_high_nodechlor" }]}
        ]},
      { id:"dis_bisulfite_high", label:"Bisulfite — over-dechlorination / excess bisulfite in effluent",
        questions: [
          { id:"q1", text:"Is the bisulfite dose controlled manually or automatically?", options: [
            { label:"Manual / fixed dose", next:"diagnosis", diagnosisId:"dis_bisulfite_manual_high" },
            { label:"Automated / residual-based control", next:"diagnosis", diagnosisId:"dis_bisulfite_auto_high" }]}
        ]},
      { id:"dis_bisulfite_low", label:"Bisulfite — under-dechlorination / chlorine residual remaining",
        questions: [
          { id:"q1", text:"Has chlorine dose increased recently?", options: [
            { label:"Yes — chlorine dose was raised", next:"diagnosis", diagnosisId:"dis_bisulfite_lag" },
            { label:"No — chlorine dose unchanged", next:"q2" }]},
          { id:"q2", text:"Is the bisulfite feed pump operating correctly?", options: [
            { label:"Pump failure or feed issue", next:"diagnosis", diagnosisId:"dis_bisulfite_pump" },
            { label:"Pump running — dose may just be insufficient", next:"diagnosis", diagnosisId:"dis_bisulfite_underdose" }]}
        ]},
      { id:"dis_bisulfite_system", label:"Bisulfite system — storage, mixing, or feed issues",
        questions: [
          { id:"q1", text:"What is the nature of the issue?", options: [
            { label:"Tank empty or low supply", next:"diagnosis", diagnosisId:"dis_bisulfite_supply" },
            { label:"Crystallization or plugging in feed line", next:"diagnosis", diagnosisId:"dis_bisulfite_crystal" },
            { label:"Mixing or dilution issue", next:"diagnosis", diagnosisId:"dis_bisulfite_mixing" }]}
        ]},
      { id:"dis_ct_compliance", label:"CT compliance — contact time or dose-response concern",
        questions: [
          { id:"q1", text:"Is this a UV or chlorine system?", options: [
            { label:"UV system", next:"diagnosis", diagnosisId:"dis_ct_uv" },
            { label:"Chlorine system", next:"diagnosis", diagnosisId:"dis_ct_cl" }]}
        ]},
      { id:"dis_toxicity", label:"Effluent toxicity — disinfection byproducts or residual concern",
        questions: [
          { id:"q1", text:"Which disinfectant is in use?", options: [
            { label:"Chlorine (hypochlorite or gas)", next:"diagnosis", diagnosisId:"dis_tox_chlorine" },
            { label:"UV — no chemical added", next:"diagnosis", diagnosisId:"dis_tox_uv" }]}
        ]}
    ]
  },

  effluent: {
    label: "Effluent / Permit",
    symptoms: [
      { id:"high_bod", label:"High effluent BOD / permit exceedance risk",
        questions: [
          { id:"q1", text:"Is the effluent visibly turbid or does it look clear?", options: [
            { label:"Turbid — visible solids carryover", next:"diagnosis", diagnosisId:"eff_bod_tss" },
            { label:"Clear — soluble BOD issue", next:"diagnosis", diagnosisId:"eff_bod_soluble" }]}
        ]},
      { id:"high_ammonia_eff", label:"High effluent ammonia (permit limit at risk)",
        questions: [
          { id:"q1", text:"Is this a seasonal issue or sudden change?", options: [
            { label:"Seasonal — cold weather onset", next:"diagnosis", diagnosisId:"eff_ammonia_seasonal" },
            { label:"Sudden — unexpected failure", next:"diagnosis", diagnosisId:"eff_ammonia_sudden" }]}
        ]},
      { id:"high_phosphorus", label:"High effluent total phosphorus",
        questions: [
          { id:"q1", text:"Is chemical phosphorus removal in use?", options: [
            { label:"Yes — chemical addition (alum, ferric)", next:"diagnosis", diagnosisId:"eff_phos_chemical" },
            { label:"Biological P removal (EBPR)", next:"diagnosis", diagnosisId:"eff_phos_bio" },
            { label:"No P removal currently used", next:"diagnosis", diagnosisId:"eff_phos_none" }]}
        ]},
      { id:"high_nitrate", label:"High effluent nitrate / total nitrogen",
        questions: [
          { id:"q1", text:"Is denitrification designed into the process?", options: [
            { label:"Yes — anoxic zone or step feed", next:"diagnosis", diagnosisId:"eff_nitrate_process" },
            { label:"No denitrification — nitrification only", next:"diagnosis", diagnosisId:"eff_nitrate_no_denox" }]}
        ]},
      { id:"effluent_turbidity", label:"High effluent turbidity / NTU exceedance",
        questions: [
          { id:"q1", text:"Is filtration part of the treatment train?", options: [
            { label:"Yes — filter in use", next:"diagnosis", diagnosisId:"eff_turbidity_filter" },
            { label:"No — secondary clarifier is final step", next:"diagnosis", diagnosisId:"eff_turbidity_clarifier" }]}
        ]},
      { id:"permit_exceedance", label:"Permit limit exceeded — regulatory response needed",
        questions: [
          { id:"q1", text:"What parameter is in exceedance?", options: [
            { label:"TSS or BOD — solids-related", next:"diagnosis", diagnosisId:"eff_permit_tss_bod" },
            { label:"Nutrients (N or P)", next:"diagnosis", diagnosisId:"eff_permit_nutrients" },
            { label:"Flow — exceeding permitted volume", next:"diagnosis", diagnosisId:"eff_permit_flow" }]}
        ]}
    ]
  }

}; /* end MX_TREE */

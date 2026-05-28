/* ═══════════════════════════════════════════════════════════════════
   PROCESS DECISION MATRIX — DIAGNOSES
   /static/js/matrix-data-diagnoses.js

   Each entry: { title, severity, causes[], actions[], note, sop }
   sop: null = not yet linked
   sop: { id:"SOP-XXX", title:"...", url:"..." } = linked SOP
   ═══════════════════════════════════════════════════════════════════ */

var MX_DIAGNOSES = {

  /* ── HEADWORKS: BAR SCREENS ───────────────────────────────── */
  hw_screen_rake_fault: { title:"Bar Screen Rake Stopped or Faulted", severity:"high",
    causes:["Motor overload trip from heavy screenings load","Limit switch failure preventing rake cycle","Drive chain or sprocket failure","Control system fault or E-stop engaged","Rake jammed on debris"],
    actions:["Check motor overload relay — reset if tripped, investigate cause before restarting","Inspect rake mechanism for visible jam — do not reach into screen channel without lockout/tagout","Verify limit switches are functioning — test manually if accessible","Check drive chain tension and sprocket condition","If rake cannot be quickly restored, initiate manual screenings removal protocol","Monitor differential level closely — blinding will occur rapidly without rake operation"],
    note:"A stopped rake on a mechanically cleaned bar screen will blind within minutes to hours depending on solids load. Never attempt to clear a jam without proper lockout/tagout — bar screen rakes can restart unexpectedly.", sop:null },

  hw_screen_overload: { title:"Bar Screen Overload — High Flow or Solids Event", severity:"high",
    causes:["Wet weather event dramatically increasing solids loading","Combined sewer overflow condition","Upstream sewer flushing event mobilizing accumulated debris","Industrial discharge with unusual solids"],
    actions:["Increase rake cycle frequency — switch to continuous operation if possible","Monitor differential level alarm — be prepared to open bypass if level approaches overflow point","Ensure screenings container has adequate capacity — arrange emergency hauling if needed","Alert downstream operations — high screenings load often precedes high hydraulic and organic loading","Document event for regulatory reporting if overflow occurs"],
    note:"High-flow events can produce several times the normal screenings volume. Pre-positioning an extra screenings container before predicted storm events is good operational practice.", sop:null },

  hw_screen_cleaning_rate: { title:"Screen Cleaning Rate Insufficient for Current Loading", severity:"moderate",
    causes:["Rake cycle interval set too long for current solids load","Screen opening size accumulating finer material faster than expected","Seasonal increase in debris (leaves, rags, wipes)"],
    actions:["Increase rake cycle frequency — most controls allow interval adjustment","Consider switching to differential-level-triggered operation rather than fixed interval","Inspect screen for any partial physical blockage between rake passes","Review seasonal differential level trends to anticipate and adjust proactively"],
    note:"Differential level control (rake triggers when level difference reaches setpoint) is generally more responsive than fixed-interval timing. If the system has both modes, differential control is preferred.", sop:null },

  hw_screen_bypass_planned: { title:"Planned Screen Bypass — Maintenance or High Flow Diversion", severity:"moderate",
    causes:["Maintenance bypass open for screen cleaning or repair","High flow exceeding screen hydraulic capacity — bypass gate opened"],
    actions:["Ensure bypass is documented in the operations log","Minimize bypass duration — restore screen to service as quickly as possible","Notify regulatory agency if bypass of preliminary treatment is required by permit","Inspect downstream equipment after bypass — rags and debris will pass to grit basin, pumps, and beyond","Check grit pumps and downstream pump stations for rag accumulation after bypass event"],
    note:"Even a brief unscreened bypass can send enough rags downstream to plug grit pumps, clog diffusers, and wrap around mixers and impellers. A thorough downstream inspection after any bypass is essential.", sop:null },

  hw_screen_bypass_uncontrolled: { title:"Uncontrolled Screen Bypass — Flow Overtopping or Gate Failure", severity:"high",
    causes:["Screen blinding so severely that flow overtops channel walls or emergency bypass","Bypass gate or penstock failing open","Channel overflow due to blocked screen and high influent flow"],
    actions:["Clear screen blockage immediately — emergency rake operation or manual clearing with lockout/tagout","Close bypass gate if it can be safely operated","Notify supervisor and regulatory agency immediately — uncontrolled bypasses are typically reportable","Inspect and flush downstream equipment as soon as screen is restored","Document time, cause, volume estimate, and corrective actions for regulatory report"],
    note:"Uncontrolled bypass at the bar screen is a regulatory event at most plants. Notification requirements vary by permit but are often 24 hours or less. Know your permit requirements before an emergency.", sop:null },

  hw_screen_motor: { title:"Bar Screen Motor / Electrical Failure", severity:"high",
    causes:["Motor burned out from sustained overload","Electrical fault — blown fuse, tripped breaker, or wiring issue","Variable frequency drive fault","Control panel fault preventing start signal"],
    actions:["Check motor control panel for alarms, faults, and tripped breakers","Verify power supply to motor — check VFD display if equipped","Do not attempt to restart repeatedly without identifying cause","Contact maintenance immediately — this is an urgent mechanical priority","Initiate manual screenings management protocol while motor is repaired"],
    note:"Bar screen motors are often rated for intermittent duty — continuous operation during high-flow events can cause overheating. Ensure motor thermal protection settings are appropriate for the duty cycle.", sop:null },

  hw_screen_jam: { title:"Bar Screen Mechanical Jam — Rake Stuck", severity:"high",
    causes:["Large debris (timber, rope, plastic sheeting) wedged across screen","Rake tooth broken and lodged in bar spacing","Foreign object caught in drive mechanism","Rake guide rail damage causing misalignment"],
    actions:["Implement full lockout/tagout before any manual intervention — screens can restart automatically","Use a hook or rod to attempt to free obstruction from a safe position first","If manual entry to channel is required, follow confined space entry procedures","Inspect rake teeth and guide rails for damage after clearing jam","Do not force the drive motor — repeated starts against a jam will damage motor and drive components"],
    note:"Bar screen channels are permit-required confined spaces at most plants. Confined space entry requires a written program, atmospheric testing, attendant, and proper rescue equipment. Never enter alone.", sop:null },

  hw_screen_compactor: { title:"Screenings Compactor or Conveyor Issue", severity:"moderate",
    causes:["Compactor auger jammed with rags or hard debris","Conveyor belt slip or drive failure","Screenings container full — compactor won't cycle","Compactor wash water nozzles plugged"],
    actions:["Check screenings container level — replace or empty if full","Inspect compactor feed for jams — lockout/tagout before any clearing","Verify wash water supply to compactor is flowing","Check conveyor drive motor and belt tension","If compactor is out of service, manual screenings management is required"],
    note:"Screenings volume can be surprising during wet weather events. Pre-positioning extra containers before predicted storms prevents compactor overflow situations.", sop:null },

  hw_screen_odor_storage: { title:"Screenings Odor — Storage and Hauling Issue", severity:"low",
    causes:["Screenings container not emptied frequently enough","Warm weather accelerating decomposition","Screenings container without cover or drain"],
    actions:["Increase screenings hauling frequency — daily during summer is often necessary","Ensure screenings container has a drain to prevent liquid accumulation","Use covered containers to reduce odor dispersion","Consider odor suppression spray (chemical oxidant) in container during warm weather","Locate containers downwind of plant administrative areas where possible"],
    note:"Screenings decompose quickly, especially in warm weather. The odor from a full, uncovered screenings container can create significant community complaints. Frequent removal is the simplest solution.", sop:null },

  hw_screen_odor_influent: { title:"Screenings Odor — Septic Influent", severity:"low",
    causes:["Septic influent releasing H2S at the screen","Long collection system travel time producing sulfides","Grease and organics in screenings decomposing rapidly"],
    actions:["Address septicity at source — see Influent/Loading section for collection system odor control","Consider chemical oxidant (hydrogen peroxide, sodium hypochlorite) addition upstream of headworks","Improve ventilation in screenings area if enclosed","Provide personal protective equipment (H2S monitor, respirator) for operators working in screenings area"],
    note:"H2S from septic influent is dangerous as well as odorous. Operators working in enclosed headworks areas should always carry personal H2S monitors. Levels above 10 ppm require immediate attention.", sop:null },

  /* ── HEADWORKS: GRIT ──────────────────────────────────────── */
  hw_grit_washout_flow: { title:"Grit Washout at High Flow — Inadequate Capture Velocity", severity:"moderate",
    causes:["Horizontal velocity in grit basin exceeding design limit at high flows","Grit particles entrained in flow before settling","Aerated grit basin air supply not compensating for high flow velocity"],
    actions:["Monitor downstream equipment during high flow — grit reaching pumps causes accelerated wear","If multiple grit basins available, bring additional chambers online to distribute hydraulic load","Verify grit basin air flow is adequate — higher air may help maintain vortex at elevated flows","Consider temporarily increasing grit pump frequency to remove accumulated grit faster","Document high-flow grit carryover events — if frequent, a capacity study may be warranted"],
    note:"Aerated grit basins are typically designed for a maximum horizontal velocity around 0.9–1.0 ft/s. Above this, grit capture efficiency drops off rapidly. At 2x design flow, grit removal may be nearly ineffective.", sop:null },

  hw_grit_aeration: { title:"Grit Basin Aeration or Mixing Issue Reducing Capture", severity:"moderate",
    causes:["Blower or diffuser failure reducing grit basin air supply","Uneven air distribution creating dead zones","Air flow too high — washing grit out of basin rather than settling it"],
    actions:["Check grit basin blower status and air flow rate","Inspect air diffusers for fouling or damage — uneven bubbling indicates a distribution problem","Verify air flow rate is within design range — excessive air increases velocity and reduces settling","For vortex-type grit basins, verify inducer or paddle mechanism is operating","Check differential grit accumulation — if one side accumulates much more, distribution is uneven"],
    note:"Grit basin air serves to create a spiral roll pattern that separates grit (high density) from organics (lower density). Too little air loses capture; too much air becomes a mixer that sends grit out with the flow.", sop:null },

  hw_grit_design: { title:"Chronic Poor Grit Capture — Design or Operational Limitation", severity:"moderate",
    causes:["Grit basin undersized for current flow","Grit particle size in collection system finer than basin design assumption","Grit basin not being pumped out frequently enough, reducing effective volume"],
    actions:["Check grit accumulation depth — if basin is partially full of settled grit, effective volume is reduced","Increase grit pump frequency to prevent accumulation reducing capture volume","Review grit basin design specifications against current flow — may require engineering evaluation","Monitor downstream pump impeller wear as an indirect indicator of grit carryover"],
    note:"Fine grit (< 0.1 mm) is very difficult to capture in conventional aerated grit basins. If fine grit is a chronic problem, a vortex grit system or other high-efficiency design may be needed.", sop:null },

  hw_grit_wash_failure: { title:"Grit Classifier Wash Water Not Flowing — High Organics in Grit", severity:"moderate",
    causes:["Wash water supply valve closed or failed","Wash water pump failure","Wash nozzles plugged with scale or debris"],
    actions:["Check wash water supply valve and pump status","Inspect wash nozzles for plugging — flush or clean if blocked","Verify wash water flow rate is within design specification","As interim measure, increase classifier screw speed slightly to improve drainage"],
    note:"Classified grit without wash water will contain high organics — typically > 20% volatile fraction. Regulatory limits for grit disposal often require organics content below 10–15%. Wash water is not optional.", sop:null },

  hw_grit_organics_process: { title:"High Organics in Grit — Process Issue", severity:"moderate",
    causes:["Grit basin capturing organic solids along with grit due to aeration imbalance","Classifier wash water insufficient for current grit/organic load","High organic loading in influent co-settling with grit"],
    actions:["Check and optimize grit basin air flow — proper spiral roll separates organics from grit","Increase classifier wash water rate if possible","Verify cyclone underflow is primarily grit — if it looks dark and organic-rich, cyclone parameters need adjustment","Consider adjusting grit pump rate — pumping more frequently at lower concentration reduces organics"],
    note:"Grit classified with high organics content creates disposal problems and odor at landfills. Most landfills have limits on VS content of grit. A jar settleability test on the grit slurry can help diagnose where organics are entering.", sop:null },

  hw_grit_fog_chronic: { title:"Chronic FOG Accumulation on Grit Basin Surface", severity:"moderate",
    causes:["Consistently high oil and grease in influent","Inadequate grease trap enforcement in service area","Food service or industrial FOG contributors upstream"],
    actions:["Increase grit basin surface scum removal frequency","Investigate grease sources in collection system — enhance pretreatment program enforcement","Ensure FOG is captured and not recycled through grit pump to classifier","Consider upstream chemical addition (ferric chloride) to aid FOG coagulation before headworks"],
    note:"FOG in the grit basin will foul the grit classifier, coat screw auger surfaces, and create odor problems. If not removed at the surface, it travels to the grit pump and cyclones where it complicates separation.", sop:null },

  hw_grit_fog_slug: { title:"FOG Slug Load — Acute Grease Event", severity:"moderate",
    causes:["Grease trap pump-out discharged to sewer","Industrial food processing event","Sewer flushing mobilizing accumulated grease"],
    actions:["Increase manual skimming of grit basin surface","Monitor grit pump for increased discharge pressure — grease can partially block lines","Alert downstream operations — FOG slug will reach aeration basin and may cause foaming in 1–2 weeks","Document grease event source if identifiable"],
    note:"A FOG slug at the headworks is an early warning for potential Microthrix or Nocardia foam issues in the aeration basin 1–3 weeks later. Log the event and alert biological process operators.", sop:null },

  /* ── HEADWORKS: GRIT PUMPS ────────────────────────────────── */
  hw_pump_airlock: { title:"Grit Pump Air Lock — Running but Not Pumping", severity:"high",
    causes:["Air entrained in suction line from turbulent grit basin surface","Suction line not fully submerged at low grit basin level","Check valve failed — allowing air back-siphon on pump stop","Pump cavitating — air entering around worn shaft seal"],
    actions:["Prime pump manually — vent air from highest point of suction line","Verify suction line is fully submerged and inlet is not drawing air","Check suction line check valve function — test that it holds on pump shutdown","Inspect pump seal for wear — air infiltration through worn seal causes persistent cavitation","Reduce pump speed temporarily — slower speed can help establish prime"],
    note:"Grit pumps are often centrifugal and self-priming — but heavily worn impellers or suction air infiltration can prevent re-priming. If the pump runs dry on grit slurry, impeller wear accelerates dramatically.", sop:null },

  hw_pump_wear: { title:"Grit Pump Reduced Capacity — Impeller or Liner Wear", severity:"moderate",
    causes:["Grit abrasion wearing pump impeller and casing liner","Operating past scheduled maintenance interval","Harder grit (sand, gravel) accelerating wear rate"],
    actions:["Measure pump flow rate or discharge pressure — compare to baseline to quantify wear","Check pump manufacturer wear indicator or perform internal inspection","Schedule impeller and liner replacement — grit pump internals are wear parts with finite life","Review pump duty cycle — alternating two pumps extends individual pump life","Verify correct impeller material — high-chrome or rubber-lined impellers perform better in grit service"],
    note:"Grit pump wear is inevitable. Tracking pump flow rate over time gives early warning of wear before failure. Most manufacturers recommend scheduled impeller inspection every 6–12 months in grit service.", sop:null },

  hw_pump_plugged: { title:"Grit Pump Plugged — Rags, Debris, or Dense Grit Slug", severity:"high",
    causes:["Rags or stringy material passing bar screen wrapping in pump","Dense grit slug from bottom of grit basin settling in suction line when pump stopped","Large solids bypassing screen during high-flow event"],
    actions:["Shut down pump — do not force against a plugged condition","Implement lockout/tagout before inspection","Open clean-out access port on pump suction or casing — clear obstruction","If rags are the culprit, inspect bar screen for gaps or bypass condition","Flush suction line with water under pressure before restarting","Restart slowly and monitor discharge pressure — verify flow has restored"],
    note:"Grit pump plugging with rags is a strong indicator that the bar screen is not capturing all screenable material. Inspect screen bar spacing, rake condition, and for any bypass paths after clearing the pump.", sop:null },

  hw_pump_rags_screen: { title:"Rags at Grit Pump — Bar Screen Not Capturing Material", severity:"high",
    causes:["Bar screen rake not functioning — material passing unscreened","Screen bar spacing too wide for current debris type","Bypass gate open or partially open","Rake teeth worn or broken — material passing through gaps"],
    actions:["Restore bar screen to full operation immediately","Inspect rake teeth for wear or breakage — replace if teeth are missing or significantly worn","Verify bypass gate is fully closed","After restoring screen, flush grit pump suction line to clear accumulated rags","Inspect downstream pump stations for rag accumulation as well"],
    note:"Rags downstream of a properly functioning bar screen almost always indicate a screen problem. If the screen appears to be working but rags still pass, inspect the bar spacing and rake tooth clearance.", sop:null },

  hw_pump_rags_size: { title:"Rags at Grit Pump — Material Too Small for Screen Opening", severity:"moderate",
    causes:["Wipes and non-dispersible materials smaller than screen bar spacing","Fine fibrous material (hair, food debris) accumulating downstream of screen","Screen bar spacing too wide — community using flushable wipes"],
    actions:["Review screen opening size — consider whether a finer screen is warranted","Increase grit pump inspection frequency — plan for more frequent clean-outs","Community outreach on wipes — 'flushable' wipes are a leading cause of pump and equipment problems","Consider adding a fine screen downstream of the coarse bar screen"],
    note:"Non-dispersible wipes are one of the fastest-growing causes of pump failures at wastewater plants. A coarse bar screen (1-inch spacing) is ineffective against wipes. Fine screens (3–6mm) capture wipes but require more maintenance.", sop:null },

  /* ── HEADWORKS: HYDROCYCLONES ─────────────────────────────── */
  hw_cyclone_apex_open: { title:"Hydrocyclone Apex Too Open — Thin, Dilute Underflow", severity:"moderate",
    causes:["Apex (underflow orifice) too large — allowing water to short-circuit with grit","Apex wear — rubber apex has enlarged over time","Inlet pressure too low to create adequate centrifugal separation"],
    actions:["Inspect apex size — compare to manufacturer specification","Replace worn apex with correct size insert","Check inlet pressure — low pressure reduces centrifugal force and separation efficiency","Verify grit pump is delivering adequate flow and pressure to cyclone","A properly operating cyclone underflow should look like a rope or fan discharge — not a stream"],
    note:"The cyclone underflow pattern (rope vs. spray discharge) is one of the best visual indicators of correct operation. A rope discharge indicates good separation; a spray or dilute stream indicates the apex is too large or pressure is too low.", sop:null },

  hw_cyclone_apex_plug: { title:"Hydrocyclone Apex Plugged — No Underflow", severity:"high",
    causes:["Dense grit slug plugging the apex orifice","Oversized material bypassing screen and lodging in apex","Grit accumulation in cyclone body when flow was stopped"],
    actions:["Isolate cyclone from service — divert to backup cyclone if available","Shut down feed pump before attempting to clear apex","Clear apex from below — use a rod or water jet to dislodge plug","Inspect apex insert for damage after clearing","Flush cyclone body thoroughly before returning to service"],
    note:"A plugged apex means all feed is being discharged through the overflow (vortex finder) — grit is going back to the plant rather than being classified. Downstream grit accumulation in the classifier will stop.", sop:null },

  hw_cyclone_overflow_grit: { title:"Grit Passing to Cyclone Overflow — Poor Separation", severity:"moderate",
    causes:["Feed pressure too low for effective centrifugal separation","Grit particle size too fine for cyclone design cut point","Cyclone body worn — loss of vortex geometry","Feed rate too high — hydraulic overload"],
    actions:["Verify feed pressure is within design range (typically 10–20 psi for most grit cyclones)","Check cyclone body for wear — visible wear on liner reduces separation efficiency","If feed rate is high, consider splitting flow across multiple cyclones","Compare grit particle size to cyclone design cut point — very fine grit may require a smaller cyclone diameter"],
    note:"Cyclone separation efficiency drops significantly for particles smaller than the design cut size. If fine grit is passing to the overflow chronically, a smaller diameter cyclone or a two-stage cyclone arrangement may be needed.", sop:null },

  hw_cyclone_vortex_plug: { title:"Cyclone Vortex Finder Plugged — Overflow Restricted", severity:"high",
    causes:["Fibrous material (rags, hair) accumulating on vortex finder tube","Biological growth on vortex finder restricting opening","Debris from upstream plugging overflow outlet"],
    actions:["Isolate cyclone — divert to backup if available","Shut down feed before opening cyclone","Clear vortex finder from overflow end — remove debris with a hook or water jet","Inspect vortex finder tube for wear or damage after clearing","Check bar screen — fibrous material at cyclone vortex finder usually indicates screen bypass"],
    note:"A plugged vortex finder backs up pressure in the cyclone and may force all flow through the underflow (apex). This can cause the classifier to be overloaded with a mixture of grit and water rather than concentrated grit.", sop:null },

  hw_cyclone_vortex_wear: { title:"Cyclone Vortex Finder Wear — Separation Efficiency Loss", severity:"moderate",
    causes:["Abrasion from grit particles wearing the vortex finder tube","Extended operation beyond recommended maintenance interval","Higher-hardness grit accelerating wear"],
    actions:["Inspect vortex finder for wear — compare internal diameter to specification","Replace vortex finder insert if worn beyond tolerance","Schedule cyclone internal inspection per manufacturer interval","Log cyclone performance metrics (pressure, underflow appearance) to track wear trend"],
    note:"Cyclone internals are wear items — vortex finder, apex, and body liner all degrade over time in grit service. Tracking performance trends allows planned replacement rather than reactive repair.", sop:null },

  hw_cyclone_low_pressure: { title:"Cyclone Feed Pressure Too Low — Insufficient Centrifugal Force", severity:"moderate",
    causes:["Grit pump worn — reduced head and flow","Feed line partially plugged reducing pressure","Cyclone inlet valve partially closed","Too many cyclones operating in parallel — flow split too much"],
    actions:["Measure feed pressure at cyclone inlet — compare to design specification","Check grit pump discharge pressure — if low, impeller may be worn","Inspect feed line for blockages","If multiple cyclones in parallel, reduce number in service to increase pressure per unit","Verify inlet valve is fully open"],
    note:"Most grit cyclones require 10–20 psi of inlet pressure for effective separation. Below the minimum, centrifugal force is insufficient to separate finer grit particles. Pressure is everything for cyclone performance.", sop:null },

  hw_cyclone_high_pressure: { title:"Cyclone Feed Pressure Too High — Risk of Wear and Overflow", severity:"moderate",
    causes:["Apex plugged partially — backing up pressure","Too few cyclones in service for current flow","Grit pump speed set too high"],
    actions:["Check for partial apex plugging — inspect underflow discharge pattern","Add additional cyclones in parallel to distribute flow if available","Reduce grit pump speed if VFD controlled","High pressure accelerates wear — verify pressure is within design limits promptly"],
    note:"Cyclone pressure above design maximum accelerates internal wear dramatically and can cause apex and vortex finder ejection. Most units have pressure relief or bypass provisions for this reason.", sop:null },

  /* ── HEADWORKS: GRIT CLASSIFIER ──────────────────────────── */
  hw_class_screw_jam: { title:"Grit Classifier Screw Jammed or Motor Faulted", severity:"high",
    causes:["Dense grit overload jamming screw auger","Hard debris (rocks, metal) lodging in screw","Motor overload trip from excessive torque","Screw flight contacting trough due to wear or misalignment"],
    actions:["Stop feed to classifier immediately — do not run screw against a jam","Check motor overload relay — do not reset repeatedly without clearing obstruction","Implement lockout/tagout before any manual intervention","Inspect screw inlet for hard debris — remove manually if accessible","If screw flight is contacting trough, inspect for wear or bearing failure causing shaft sag","Check screw drive gearbox for abnormal noise indicating gear damage"],
    note:"Forcing a jammed classifier screw will damage screw flights, the trough liner, and the drive gearbox. Stop the feed and identify the cause before attempting restart.", sop:null },

  hw_class_screw_overload: { title:"Classifier Screw Overloaded — Grit Spillage or Flooding", severity:"moderate",
    causes:["Cyclone underflow rate exceeding classifier capacity","Grit pump running too fast — delivering more slurry than classifier can process","Single classifier receiving flow from multiple cyclones simultaneously beyond design"],
    actions:["Reduce grit pump speed or cycle frequency to reduce feed rate to classifier","Reduce number of cyclones feeding classifier if multiple are running","Increase classifier screw speed if adjustable — faster conveyance reduces flooding","Verify classifier design flow rate against current grit slurry volume"],
    note:"Classifier flooding causes grit-laden water to spill around the screw rather than being conveyed upward. This grit goes back to the plant through overflow — the whole purpose of the classifier is defeated.", sop:null },

  hw_class_screw_wear: { title:"Classifier Screw Wear — Grit Falling Back", severity:"moderate",
    causes:["Screw flight edges worn thin — grit slides back rather than being conveyed","Trough liner worn — excessive clearance between screw and trough","Long service interval without wear inspection"],
    actions:["Inspect screw flight leading edges for wear — compare thickness to original specification","Inspect trough liner for wear — excessive clearance allows grit to bypass screw","Schedule screw and trough replacement during planned outage","Increase classified grit output sampling — if output volume decreasing with same input, wear is likely"],
    note:"Classifier screw wear is gradual but cumulative. A worn screw loses conveyance efficiency and returns grit to the tank, reducing overall grit removal. Annual wear inspections are recommended.", sop:null },

  hw_class_overflow_recycle: { title:"Classifier Overflow Recycling Grit or High TSS to Plant", severity:"moderate",
    causes:["Cyclone separation poor — grit passing to overflow and then classifier overflow","Classifier overloaded — slurry level too high and grit washing over with overflow","Wash water volume too high relative to grit load — carrying fines over"],
    actions:["Sample classifier overflow — measure TSS and check for grit particles visually","If grit is in overflow, improve cyclone separation first","Reduce wash water rate if overflow TSS is high and wash water volume is excessive","Verify overflow return pipe — confirm it is returning to an appropriate location"],
    note:"Classifier overflow always contains some fine solids and organics. Returning directly to the aeration basin bypasses primary treatment and adds to biological load.", sop:null },

  hw_class_overflow_quality: { title:"Classifier Overflow Quality Issue — High Turbidity or Odor", severity:"low",
    causes:["High organic content in grit slurry from poor grit basin separation","Anaerobic conditions developing in classifier tank during low-flow periods","Wash water quality issue"],
    actions:["Check grit basin aeration — improved separation reduces organics in classifier feed","Verify classifier is not sitting idle with stagnant slurry for extended periods","Ensure classifier overflow drains completely during low-flow or offline periods"],
    note:"Classifier overflow odor typically indicates anaerobic conditions in the classifier tank or high organic content from poor upstream separation. The root cause is in the grit basin or cyclone operation.", sop:null },

  hw_class_wash_no_flow: { title:"No Classifier Wash Water Flow", severity:"moderate",
    causes:["Wash water supply valve closed","Supply pump failure","Wash nozzle or distribution header plugged","Backpressure in wash line preventing flow"],
    actions:["Verify wash water supply valve is open","Check wash water pump or supply pressure","Inspect wash nozzles for plugging — flush or replace if blocked","Measure wash water flow rate — compare to design","Document that grit is being classified without wash water — disposal may be affected"],
    note:"Classified grit without wash water will have high volatile solids content and poor appearance. Most landfill disposal contracts specify maximum organics in classified grit — typically 10–15% VS.", sop:null },

  hw_class_wash_insufficient: { title:"Classifier Wash Water Insufficient — Grit Still Organics-Laden", severity:"moderate",
    causes:["Wash water flow rate below design minimum","Grit loading higher than wash water system designed for","Wash nozzle distribution poor — channeling leaving some grit unwashed"],
    actions:["Increase wash water flow rate to design specification","Inspect wash nozzle distribution — verify all nozzles are flowing evenly","Sample classified grit for VS content — compare to permit or disposal requirements","If design flow is insufficient, evaluate nozzle additions or upgrade"],
    note:"Wash water flow rate is a critical classifier design parameter. Undersizing wash water is a common issue that only becomes apparent when grit disposal samples show high VS content.", sop:null },

  hw_class_wash_excess: { title:"Excess Wash Water Causing Classifier Overflow Quality Issues", severity:"low",
    causes:["Wash water rate too high — carrying fine grit and organics into overflow","Wash water rate not matched to actual grit loading — excess wash when grit is low"],
    actions:["Reduce wash water rate — target rate that cleans grit without excessive overflow turbidity","Consider flow-pacing wash water to grit pump operation — only wash when grit is being classified","Monitor overflow TSS before and after adjustment to confirm improvement"],
    note:"Wash water is a balancing act — enough to clean the grit, not so much that it fluidizes the bed and carries material into the overflow. Most manufacturers provide a design wash water rate that should be treated as a target, not a minimum.", sop:null },

  /* ── INFLUENT ─────────────────────────────────────────────── */
  inf_wet_weather: { title:"Wet Weather / Inflow & Infiltration Event", severity:"moderate",
    causes:["Storm-related I&I entering collection system","Combined or leaky sewer connections"],
    actions:["Activate wet weather operational plan if in place","Monitor clarifier overflow rates — consider diverting to equalization if available","Reduce RAS rate to maintain sludge blanket under hydraulic surge","Notify downstream receiving water authority if bypass risk exists","Document flows for regulatory reporting"],
    note:"Sustained I&I events may require infrastructure assessment. Wet weather events are often the #1 cause of permit exceedances at small municipal plants.", sop:null },

  inf_industrial_surge: { title:"Industrial or Commercial Slug Load", severity:"high",
    causes:["Uncoordinated industrial discharge","Pretreatment program failure","Trucked waste dumping at non-designated time"],
    actions:["Contact industrial discharger immediately — halt or reduce discharge","Increase aeration to buffer oxygen demand","Check effluent for toxicity indicators (foam, odor, unexpected color)","Notify regulatory agency if permit limits are at risk","Collect grab samples of influent for forensic documentation"],
    note:"A well-run pretreatment program prevents most of these events. Slug loads can trigger filamentous bulking 3–7 days later due to substrate shock.", sop:null },

  inf_unknown_surge: { title:"Unexplained Dry-Weather Flow Surge", severity:"moderate",
    causes:["Illegal discharge","Groundwater infiltration during high water table","Flow meter error or air in meter"],
    actions:["Verify flow metering accuracy — check for air or fouling","Check upstream pump stations for anomalies","Review collection system inspection records","Notify collection system supervisor for investigation"],
    note:"Log the event carefully — patterns may point to a recurring source. Repeated unexplained surges warrant a system-wide I&I study.", sop:null },

  inf_sustained_load: { title:"Sustained High-Strength Loading", severity:"high",
    causes:["New industrial customer online","Seasonal commercial activity (food processing, brewery, resort)","Increased septic hauler activity"],
    actions:["Verify biological system can handle increased F/M ratio","Consider increasing MLSS to buffer higher loading","Evaluate aeration capacity — may need supplemental blower output","Review permit limits against projected effluent quality","Contact regulatory agency proactively if limits are at risk"],
    note:"Sustained load increases may require a permit modification or capacity study. Getting ahead of regulators is always better than explaining a violation after the fact.", sop:null },

  inf_slug_load: { title:"Short-Term Slug Load", severity:"moderate",
    causes:["One-time industrial batch discharge","Trucked septage or high-strength waste","Seasonal event (e.g., holiday food waste surge)"],
    actions:["Boost aeration rate temporarily","Monitor DO closely for 4–8 hours post-event","Watch SVI for filamentous response in 3–5 days","Notify pretreatment coordinator if source is a permitted user"],
    note:"Slug loads can trigger filamentous bulking because the brief feast-famine cycle selects for filamentous organisms. Stay alert for settleability changes the following week.", sop:null },

  inf_septic_long: { title:"Septicity from Long Collection System Travel Time", severity:"moderate",
    causes:["Anaerobic conditions developing during transit","H2S generation in force mains or long gravity sewers","Warm weather accelerating sulfate-reducing bacteria"],
    actions:["Add hydrogen peroxide or ferric chloride to collection system upstream","Consider air injection points in force mains","Evaluate odor control chemicals at headworks","Supplement dissolved oxygen at influent channel if possible"],
    note:"Chronic septicity increases H2S corrosion risk to concrete structures. Pipe degradation can be significant and costly if unaddressed for years.", sop:null },

  inf_septic_short: { title:"Local Septic Condition / Grease or Low-Flow Accumulation", severity:"low",
    causes:["Low-flow periods allowing sediment buildup","Grease accumulation in collection system","Dead-end sewer sections"],
    actions:["Schedule collection system flushing in problem areas","Review grease trap inspection and cleaning program","Evaluate diurnal flow patterns — early morning influent is typically most septic"],
    note:"Early morning influent is often the most septic — this is normal for many systems and not necessarily a cause for alarm.", sop:null },

  inf_fog_slug: { title:"FOG Slug Load from Grease Trap Pump-Out", severity:"moderate",
    causes:["Restaurant or food service grease trap cleanout discharged to sewer","Grease hauler using non-approved disposal method","Large food processing event"],
    actions:["Increase aeration immediately — FOG creates high oxygen demand","Monitor primary clarifier (if present) for grease accumulation","Watch for Microthrix or Nocardia foam development in 1–2 weeks","Verify grease hauler is using licensed receiving facility","Document event — consider requiring grease hauler permits"],
    note:"A single large FOG slug can destabilize a well-running plant for weeks due to its impact on SVI and foaming potential.", sop:null },

  inf_fog_chronic: { title:"Chronic Elevated FOG Loading", severity:"high",
    causes:["Inadequate grease trap enforcement in service area","High density of food service establishments","Industrial food processing discharge"],
    actions:["Audit grease trap cleaning frequency for food service customers","Consider requiring more frequent grease trap servicing","Evaluate primary treatment improvements (better skimming)","Review F/M and SRT — higher SRT helps organisms degrade FOG","Monitor for Microthrix filamentous organisms monthly"],
    note:"Microthrix parvicella thrives on long-chain fatty acids from grease. If FOG is chronically elevated, expect persistent low-F/M type bulking and foam.", sop:null },

  inf_low_seasonal: { title:"Expected Low-Flow / Low-Strength Season", severity:"low",
    causes:["Seasonal population drop (resort, university, agricultural community)","Summer vacation period reducing residential flows"],
    actions:["Increase WAS rate to prevent over-stabilization (too long SRT)","Monitor for Microthrix foam — low F/M conditions favor it","Consider taking aeration capacity offline to save energy","Maintain minimum MLSS for permit compliance buffer"],
    note:"Low-flow periods increase SRT if wasting isn't adjusted. This is one of the most common operator mistakes — failing to increase wasting when loading drops.", sop:null },

  inf_low_unexpected: { title:"Unexpected Flow Reduction", severity:"moderate",
    causes:["Upstream collection system blockage","Major industrial customer shut down","Pump station failure diverting flow","Meter malfunction"],
    actions:["Verify influent meter reading against visual flow observation","Check pump stations upstream for failures","Contact large industrial users for operational status","Inspect upstream collection system for blockages or bypasses"],
    note:"An unexpected flow drop can quickly push SRT too high if wasting is not reduced. Monitor closely and adjust WAS accordingly.", sop:null },

  inf_nutrient_industrial: { title:"Nutrient Deficiency — Industrial Wastewater", severity:"high",
    causes:["Industrial wastewater with high BOD but low nitrogen or phosphorus","Carbohydrate-heavy waste (sugar, starch, beverage) with no added nutrients","Inadequate nutrient supplementation program"],
    actions:["Calculate BOD:N:P ratio — target approximately 100:5:1","Add supplemental nitrogen (urea, ammonium sulfate) and/or phosphorus (phosphoric acid) to influent","Monitor effluent for improved settleability and floc quality","Watch for filamentous response — Type 021N and Thiothrix thrive in nutrient-deficient conditions"],
    note:"Nutrient deficiency is underdiagnosed. Filamentous bulking that doesn't respond to DO or SRT adjustment is often actually a nutrient problem.", sop:null },

  inf_nutrient_municipal: { title:"Nutrient Imbalance — Municipal System", severity:"moderate",
    causes:["Dilute influent with insufficient nitrogen relative to BOD","Very high BOD loading temporarily overwhelming nitrogen supply","Septic or stale influent with reduced nutrient availability"],
    actions:["Verify influent TKN and TP alongside BOD","If ratio is off, consider supplemental nutrient addition","Evaluate primary treatment — removing too much BOD upstream can starve biology of carbon"],
    note:"Municipal wastewater typically has adequate nutrients, but very dilute or unusual influent can still create imbalances.", sop:null },

  /* ── PRIMARY CLARIFIER ────────────────────────────────────── */
  pc_scum_skimmer_fault: { title:"Primary Clarifier Scum Skimmer Stopped or Faulted", severity:"moderate",
    causes:["Skimmer drive motor tripped or faulted","Skimmer blade jammed on debris or structural obstruction","Limit switch or control fault preventing skimmer cycle","Scum trough blocked preventing blade from completing travel"],
    actions:["Check skimmer drive panel for alarms or fault codes","Inspect skimmer blade travel path for visible obstructions","Verify limit switches are cycling correctly — test manually if accessible","Clear any debris blocking skimmer trough or blade","Manually push scum toward scum pit if skimmer cannot be quickly restored"],
    note:"A stopped scum skimmer in warm weather allows scum to become thick, odorous, and difficult to move once it solidifies. Daily skimmer inspection is good practice even when automated.", sop:null },

  pc_scum_pump: { title:"Scum Pit Full or Scum Pump Failed", severity:"moderate",
    causes:["Scum pump motor failure or trip","Scum pump plugged with solidified grease or rags","Scum pit discharge line blocked or valve closed","Scum pump not cycling frequently enough"],
    actions:["Check scum pump motor status and control panel","Verify discharge valve is open and discharge line is clear","If pump is plugged, implement lockout/tagout and clear obstruction","Increase pump cycle frequency if pit fills faster than current schedule","Consider heat tracing scum lines in cold climates — grease solidifies in cold pipes"],
    note:"Scum pump lines are prone to grease solidification, especially in cold weather or when pumping is infrequent. Flushing scum lines with water after each pump cycle helps prevent buildup.", sop:null },

  pc_scum_blade: { title:"Scum Blade Not Effectively Moving Scum to Pit", severity:"low",
    causes:["Scum blade set too high — not contacting water surface properly","Scum blade worn or damaged — not pushing scum effectively","Scum too thick and viscous to move with blade force"],
    actions:["Check and adjust scum blade depth — blade should skim just at the water surface","Inspect blade for wear, warping, or damage","If scum is very thick, manually assist with a hose — spray hot water to soften grease","For outdoor clarifiers, consider adjusting skimmer speed or timing to account for wind direction"],
    note:"Scum blade adjustment is often overlooked during commissioning and after water level changes. Even a centimeter difference in blade depth can dramatically affect scum collection efficiency.", sop:null },

  pc_scum_pit_septic: { title:"Scum Pit Septic — Odor from Infrequent Pumping", severity:"moderate",
    causes:["Scum sitting in pit for extended periods going anaerobic","Pump cycle too infrequent for ambient temperature and loading","Scum pit not draining completely between cycles"],
    actions:["Increase scum pump frequency — scum should not sit more than a few hours in warm weather","After pumping, flush scum pit with water to remove residual organics","Consider odor suppression chemical in scum pit during summer"],
    note:"Scum decomposing in a pit produces H2S and other volatile sulfur compounds. The scum pit should be treated as a confined space — never enter without atmospheric testing and proper procedures.", sop:null },

  pc_scum_influent_septic: { title:"Scum Odor from Septic Influent", severity:"moderate",
    causes:["H2S-laden influent releasing gas at the primary clarifier surface","Septic influent arriving at plant with dissolved sulfide","Long collection system travel time generating sulfides upstream"],
    actions:["Address septicity at headworks and collection system — see Influent/Loading section","Consider adding hydrogen peroxide or ferric chloride to influent channel ahead of primary","Improve ventilation in primary clarifier building if enclosed","Ensure operators working around primary clarifiers have H2S monitors"],
    note:"Primary clarifiers are the first quiescent zone in the plant — dissolved H2S from septic influent will off-gas here. This is a collection system problem, not a primary clarifier problem.", sop:null },

  pc_scraper_torque: { title:"Rotating Sludge Scraper — Drive Torque Overload", severity:"high",
    causes:["Excessive sludge accumulation increasing scraper resistance","Grit from headworks bypassing and settling in primary — abrasive load on scraper","Foreign object (rock, debris) jammed under scraper arm","Scraper arm deflection causing contact with floor"],
    actions:["Do not repeatedly reset torque overload — investigate cause before restarting","Check sludge blanket depth — if very deep and thick, pump down before restarting scraper","Inspect for foreign objects in the path of the scraper arm","Check scraper arm alignment and floor clearance — deflection causes dragging","Increase primary sludge pump rate to reduce blanket depth before restart","If scraper cannot be restarted, monitor effluent TSS closely"],
    note:"Forcing a torque-overloaded scraper drive will damage the drive gearbox, torque tube, and scraper arm — often a very expensive repair. The overload is protecting the equipment. Respect it.", sop:null },

  pc_scraper_damage: { title:"Rotating Scraper Arm Damage or Deflection", severity:"high",
    causes:["Structural fatigue of scraper arm from long service","Impact damage from large debris entering clarifier","Corrosion weakening arm connection points","Excessive sludge load causing arm to deflect and contact floor"],
    actions:["Take clarifier out of service if arm deflection or damage is visually confirmed","Inspect arm welds and connection points — particularly at center column attachment","Check floor clearance at multiple points around the tank","Do not operate a damaged scraper — contact with the floor causes rapid wear and further damage","Engage structural engineer or equipment supplier for repair assessment"],
    note:"Primary clarifier scraper arm repairs typically require draining the clarifier. Operating with a damaged arm risks catastrophic structural failure of the rotating mechanism.", sop:null },

  pc_flight_chain: { title:"Rectangular Clarifier — Chain or Flight Chain Broken / Slipped", severity:"high",
    causes:["Chain elongation from wear causing skipping on sprockets","Chain link failure from corrosion or overload","Sprocket wear reducing engagement","Debris jamming chain mechanism"],
    actions:["Stop mechanism immediately — a broken chain can cause serious damage if mechanism continues","Implement lockout/tagout before any inspection inside the clarifier","Drain clarifier if necessary for chain inspection and repair","Inspect all chain links and sprockets — replace worn sprockets along with chain","When replacing chain, replace both sides simultaneously — uneven stretch causes tracking problems"],
    note:"Chain and flight mechanisms require periodic inspection of chain stretch. Most manufacturers specify a maximum chain elongation before replacement. Tracking chain stretch with regular measurement prevents sudden failures.", sop:null },

  pc_flight_wear: { title:"Rectangular Clarifier — Flight Boards Worn or Missing", severity:"moderate",
    causes:["Wood or plastic flight boards worn from extended service","Flights broken by debris or improper operation","Flights detached from chain attachment points"],
    actions:["Inspect all flights during next clarifier drain and inspection","Replace worn or missing flights — partial flight coverage dramatically reduces sludge collection efficiency","Check flight attachment hardware for corrosion","Review inspection interval — flights should be inspected annually at minimum"],
    note:"Missing or worn flights reduce the effective sludge sweep area. A clarifier with half its flights damaged may be removing only a fraction of the sludge it should. This is often not apparent without a tank inspection.", sop:null },

  pc_sludge_pump_failure: { title:"Primary Sludge Pump Failure — Blanket Rising", severity:"high",
    causes:["Pump motor failure","Pump plugged with rags, grit, or dense sludge","Discharge line blocked or valve closed","Control system fault stopping pump cycling"],
    actions:["Switch to standby sludge pump immediately if available","Check pump motor, discharge valve, and control status","If pump is plugged, lock out and clear obstruction — grit in primary sludge is common and abrasive","Monitor sludge blanket depth closely — a stopped pump will allow blanket to deepen rapidly","If blanket approaches weir depth, effluent quality will deteriorate quickly — notify supervisor","Contact maintenance for pump repair — this is an urgent priority"],
    note:"Primary sludge pumps often deal with grit carryover from headworks. This makes impeller wear and plugging more common than in secondary sludge service. Standby pump availability is critical.", sop:null },

  pc_sludge_overload: { title:"Sludge Blanket Rising — Solids Overload", severity:"moderate",
    causes:["Influent TSS spike from wet weather, industrial discharge, or I&I","Higher-than-design solids loading","Primary clarifier undersized for current flow and loading"],
    actions:["Increase primary sludge pump rate to maximum to draw down blanket","If multiple clarifiers available, bring additional unit online to distribute load","Monitor effluent TSS — rising blanket approaching weir depth will carry solids over","Notify biological process operators — higher primary effluent TSS will increase aeration basin loading"],
    note:"Primary clarifier surface overflow rate (SOR) is the key design parameter. At design SOR (~600–800 gpd/ft² for municipal wastewater), removal efficiency is typically 50–70% TSS.", sop:null },

  pc_sludge_pump_rate: { title:"Primary Sludge Pump Rate Insufficient for Current Accumulation", severity:"moderate",
    causes:["Pump cycle frequency set too low for current solids loading","Pump runtime per cycle too short","Pump wear reducing output volume"],
    actions:["Increase pump cycle frequency or runtime per cycle","Measure sludge blanket depth before and after pump cycle to verify drawdown","Check pump discharge flow — worn pump may deliver less than expected","Establish baseline: how many minutes of pumping are needed to drop blanket by 6 inches"],
    note:"Primary sludge pump scheduling is often set at commissioning and never revisited. Seasonal changes in loading, influent character, and sludge settleability all affect how often pumping is needed.", sop:null },

  pc_sludge_overthin_pump: { title:"Primary Sludge Too Thin — Over-Pumping", severity:"moderate",
    causes:["Pump rate too high — pulling clarified water with sludge","Sludge hopper volume small — pump depletes concentrated sludge and starts pulling dilute slurry","Pump intake too far above hopper bottom — drawing from dilute zone"],
    actions:["Reduce pump frequency or runtime per cycle","Allow sludge to accumulate and concentrate in hopper before pumping","Target primary sludge TSS of 3–8% for good downstream thickening and digestion performance","Measure sludge TSS at pump discharge — if < 2%, pump rate is too aggressive"],
    note:"Thin primary sludge (< 2% TSS) significantly reduces digester loading efficiency and thickener performance. Pumping less frequently but allowing better hopper accumulation is almost always more efficient.", sop:null },

  pc_sludge_overthin_loading: { title:"Primary Sludge Too Thin — Low Influent Solids", severity:"low",
    causes:["Low influent TSS — dilute wastewater or low-flow period","Seasonal population reduction reducing solids loading"],
    actions:["Reduce pump cycle frequency to allow sludge to concentrate","Check influent TSS to confirm loading is genuinely reduced","Adjust wasting volume to digester accordingly — sending very thin sludge wastes digester capacity"],
    note:"Thin primary sludge is not necessarily a problem if it reflects genuinely low loading. The issue arises when thin sludge is pumped at the same rate as concentrated sludge, wasting volume and diluting the digester.", sop:null },

  pc_sludge_ferment_pump: { title:"Sludge Fermenting in Hopper — Insufficient Pumping Frequency", severity:"moderate",
    causes:["Sludge sitting in hopper for extended periods going anaerobic","Pump cycle too infrequent for ambient temperature and loading","Sludge hopper dead zones where sludge accumulates without being pumped"],
    actions:["Increase pump frequency — in warm weather, primary sludge can go septic within hours","Ensure hopper geometry allows sludge to drain to pump inlet — check for dead zones","If fermentation has already occurred, pump out hopper contents and monitor for gas production","Add ferric chloride or hydrogen peroxide to hopper if chronic septicity is a problem"],
    note:"Fermented primary sludge creates VFAs (volatile fatty acids) that can benefit biological phosphorus removal if routed correctly. However, it also creates severe odors and can upset digester alkalinity. Know your system design before deciding whether fermentation is beneficial or harmful.", sop:null },

  pc_sludge_ferment_temp: { title:"Sludge Fermenting — Warm Weather Accelerating Anaerobic Activity", severity:"moderate",
    causes:["High summer temperatures accelerating anaerobic fermentation even with normal pumping","High-strength or high-temperature industrial influent warming primary sludge"],
    actions:["Increase pump frequency during summer months — establish a seasonal pumping schedule","Consider adding iron salt (ferric or ferrous) to primary to suppress sulfide production","Ensure primary sludge reaches digester quickly — minimize sludge sitting in intermediate piping","Check if any thermal discharges are increasing influent temperature"],
    note:"Primary sludge fermentation is almost inevitable in summer at plants with warm climates. Some plants intentionally ferment primary sludge to produce VFAs for biological nutrient removal. If this is not the design intent, faster pumping and iron addition are the controls.", sop:null },

  pc_effluent_hydraulic: { title:"High Primary Effluent TSS — Hydraulic Overload", severity:"high",
    causes:["Peak flow or wet weather event exceeding clarifier surface overflow rate","Multiple clarifiers not online to distribute hydraulic load"],
    actions:["Bring additional primary clarifier units online if available","Reduce influent flow through equalization if available","Alert biological process operators — higher primary effluent TSS increases secondary loading","Increase primary sludge pumping to prevent blanket from compounding the issue"],
    note:"Primary clarifier SOR above 1,200 gpd/ft² produces minimal TSS removal. During wet weather, many plants operate primaries in pass-through mode and manage the additional secondary loading instead.", sop:null },

  pc_effluent_blanket: { title:"High Primary Effluent TSS — Sludge Blanket Too Deep", severity:"high",
    causes:["Sludge blanket depth encroaching on settling zone","Sludge collector or pump not keeping up with accumulation","Dense sludge rising due to gas production from fermentation"],
    actions:["Restore sludge collector and pump to full operation immediately","Pump down sludge blanket aggressively — increase pump rate","Check for gas rising from sludge blanket — may indicate fermentation lifting solids","Monitor effluent turbidity continuously during recovery"],
    note:"A primary clarifier sludge blanket should never exceed half the water depth. At that point, the settling zone is compromised and TSS carryover becomes significant. Blanket depth measurement should be part of every operating shift.", sop:null },

  pc_effluent_shortcircuit: { title:"High Primary Effluent TSS — Short-Circuiting", severity:"moderate",
    causes:["Inlet energy not dissipated — flow jetting across tank surface","Missing or damaged inlet baffle","Density currents from temperature differences driving flow along floor or surface"],
    actions:["Inspect inlet baffle — verify it is intact and properly positioned","Conduct a dye tracer test to visualize actual flow patterns","For outdoor clarifiers, consider wind baffle additions","Evaluate whether tank geometry is contributing — consult engineer if short-circuiting is chronic"],
    note:"Short-circuiting in a primary clarifier can reduce effective detention time from the design 1.5–2.5 hours to as little as 20–30 minutes. A plug flow tracer test (t10/T determination) quantifies the problem.", sop:null },

  pc_bod_soluble: { title:"Poor Primary BOD Removal — Soluble BOD in Influent", severity:"low",
    causes:["Influent BOD is predominantly soluble — primary clarification removes particulate BOD only","Industrial or septic influent with high dissolved organics","Fermented collection system converting particulate BOD to soluble"],
    actions:["Understand that primary clarifiers do not remove soluble BOD — this is the biological system's job","If soluble BOD is higher than expected, investigate industrial sources or collection system septicity","Adjust biological system loading expectations — secondary treatment will need to handle higher soluble BOD"],
    note:"A primary clarifier removes 50–70% of TSS but typically only 25–40% of BOD, because much influent BOD is soluble. If operators are expecting high BOD removal from primary treatment alone, expectation management is needed.", sop:null },

  pc_bod_tss: { title:"Poor Primary BOD Removal — Particulate BOD Carryover with TSS", severity:"moderate",
    causes:["Poor TSS removal carrying particulate BOD over weir","Hydraulic overload or short-circuiting","Sludge blanket too deep"],
    actions:["Improve primary TSS removal — address hydraulic or collector issues","Measure both primary effluent TSS and BOD — confirm they are tracking together","Improving TSS removal will proportionally improve BOD removal"],
    note:"Particulate BOD tracks TSS. If primary TSS removal is good but BOD removal is poor, the BOD is soluble. If both are poor together, the TSS removal problem is the root cause.", sop:null },

  pc_floatables_fog: { title:"FOG / Grease Floatables Passing Weir into Primary Effluent", severity:"moderate",
    causes:["Scum removal system not capturing all FOG","High influent FOG overwhelming scum skimmer capacity","Weir deflector board missing or improperly set"],
    actions:["Check weir deflector board — a submerged board downstream of the weir prevents floatables from passing over","Increase scum skimmer frequency","Verify scum blade is reaching full weir perimeter","Address upstream FOG sources — grease trap enforcement","FOG reaching biological system contributes to Microthrix/Nocardia foam — notify aeration operators"],
    note:"A properly set effluent weir deflector board (scum baffle) is the last line of defense against floatables entering the primary effluent. It should be inspected for damage and positioning regularly.", sop:null },

  pc_floatables_debris: { title:"Debris / Plastics Passing Weir — Screening Failure", severity:"high",
    causes:["Bar screen bypass or failure allowing debris to reach primary","Screen opening too large for current debris types"],
    actions:["Investigate bar screen for bypass or mechanical failure — see Headworks section","Manually remove debris from clarifier surface","Ensure weir deflector board is in place and properly set","Debris reaching primary and passing weir will enter biological system — inspect downstream equipment"],
    note:"Plastic, wipes, and rags that pass the bar screen will eventually reach the aeration basin. They can foul diffusers, wrap around mixers, and accumulate in clarifier mechanisms. Restoring the bar screen is the priority.", sop:null },

  pc_floatables_foam: { title:"Foam / Biological Scum at Primary Weir", severity:"low",
    causes:["Surfactant foam from detergents in influent","Biological activity in warm primary sludge producing surface foam","Fermentation gases from sludge hopper rising through tank creating surface turbulence"],
    actions:["Check if foam is surfactant-based — spray water to break it (surfactant foam disappears quickly)","If foam persists and is biological, check for fermentation in sludge hopper","Increase sludge pumping frequency to reduce fermentation","Ensure scum skimmer is capturing foam before it reaches the weir"],
    note:"Some foam at the primary surface is common and usually harmless. Persistent, odorous, or stable foam warrants investigation. Surfactant foam is white and bubbly; fermentation foam is often darker and more stable.", sop:null },

  pc_odor_h2s: { title:"H2S Odor at Primary Clarifier", severity:"moderate",
    causes:["Septic influent releasing dissolved H2S at the quiescent primary surface","Anaerobic decomposition in sludge hopper producing sulfide gas","Sulfate-reducing bacteria active in sludge blanket"],
    actions:["Measure H2S levels in clarifier area — ensure operator safety before proceeding","Address influent septicity upstream — hydrogen peroxide or ferric chloride addition","Increase sludge pump frequency to reduce blanket depth and hopper retention time","Improve ventilation in primary clarifier building if enclosed","Add iron salt to primary influent — ferric or ferrous reacts with sulfide to form insoluble iron sulfide"],
    note:"H2S is detectable at 0.5–1 ppb and immediately dangerous at 100 ppm. Operators should always use personal H2S monitors around primary clarifiers handling septic influent.", sop:null },

  pc_odor_ferment: { title:"Fermentation / Butyric Odor at Primary Clarifier", severity:"moderate",
    causes:["Sludge fermentation in hopper producing VFAs — butyric, propionic, acetic acid","Warm temperature accelerating anaerobic activity in sludge blanket","Long sludge retention time in hopper"],
    actions:["Increase sludge pump frequency to reduce hopper retention time","Consider whether VFA production is beneficial for downstream biological P removal — consult process design","If VFAs are not needed, add ferric chloride to hopper to suppress fermentation","Check that sludge is moving to digester without sitting in intermediate piping"],
    note:"VFAs from primary sludge fermentation can be a valuable carbon source for biological phosphorus removal (EBPR) and denitrification if intentionally managed. Some plants specifically design for controlled primary fermentation.", sop:null },

  pc_hydraulic_recurring: { title:"Recurring Primary Clarifier Hydraulic Overload", severity:"high",
    causes:["Plant influent flow regularly exceeding primary clarifier design capacity","I&I causing routine wet weather overloads","Population growth exceeding original design"],
    actions:["Evaluate whether additional primary clarifier capacity or flow equalization is needed","Develop a wet weather operational protocol — when to bring additional units online","Engage engineer for capacity analysis if recurring overloads are frequent","Notify regulatory agency if primary treatment bypasses are occurring regularly","Document all events — frequency data supports capital improvement funding requests"],
    note:"Recurring hydraulic overloads at the primary clarifier are a capacity problem, not an operational problem. Operations can manage around it, but the long-term solution is capital investment.", sop:null },

  pc_hydraulic_event: { title:"One-Time Primary Clarifier Hydraulic Overload Event", severity:"moderate",
    causes:["Unusual storm event","Upstream pump station failure routing extra flow","Emergency bypass from another system"],
    actions:["Operate primary in pass-through mode if SOR is severely exceeded","Alert biological process operators to expect higher loading","Document event conditions and duration","Inspect primary sludge collector after event — heavy grit or debris loading during high flow"],
    note:"During severe hydraulic overloads, some plants deliberately minimize primary clarifier detention to maximize biological system capacity. Know your plant's wet weather protocol in advance.", sop:null },

  pc_weir_algae: { title:"Primary Clarifier Weir Algae or Biological Growth", severity:"low",
    causes:["Algae growing on wetted weir surface in outdoor clarifiers","Biofilm accumulation on weir plates restricting flow evenness"],
    actions:["Power wash weir surfaces — schedule during low-flow period","Apply algaecide to weir if algae growth is persistent","Increase weir cleaning frequency — monthly at minimum for outdoor clarifiers","Remove any debris caught in weir notches"],
    note:"Weir cleanliness directly affects flow distribution across the clarifier. Uneven weir loading creates dead zones in the tank and preferential flow paths that reduce settling efficiency.", sop:null },

  pc_weir_level: { title:"Primary Clarifier Weir Out of Level", severity:"moderate",
    causes:["Differential settlement of clarifier structure","Weir plate damage or modification","Corrosion of weir attachment hardware causing weir to shift"],
    actions:["Survey weir elevation at multiple points — measure height difference","Add adjustable weir plates or shims to equalize weir height","Inspect weir attachment hardware for corrosion — replace if needed","Schedule structural assessment if settlement is suspected"],
    note:"Even small weir level differences (< 5 mm) can significantly affect flow distribution in a primary clarifier. An out-of-level weir means one side of the tank is doing most of the work.", sop:null },


  /* ── AERATION BASIN ───────────────────────────────────────── */
  aer_do_loading: { title:"Low DO Due to Increased Organic Loading", severity:"moderate",
    causes:["Higher BOD/ammonia loading increasing oxygen demand","Seasonal or wet weather loading increase"],
    actions:["Increase blower output or aeration rate immediately","Verify diffuser integrity — fouled diffusers reduce oxygen transfer efficiency","Consider temporarily increasing MLSS to buffer higher F/M","Monitor effluent ammonia — nitrification will fail first under low DO"],
    note:"Target DO of 1.5–2.5 mg/L in mixed liquor. Below 1.0 mg/L begins selecting for filamentous organisms — effects may not appear for 5–10 days.", sop:null },

  aer_do_equipment: { title:"Low DO Due to Aeration Equipment Failure", severity:"high",
    causes:["Blower fault or reduced capacity","Fouled or broken membrane diffusers","Air line blockage or broken lateral"],
    actions:["Inspect all blowers for alarms, faults, or reduced amperage draw","Check air flow distribution — blocked headers or broken laterals","Measure diffuser back pressure — elevated pressure indicates fouling","Switch to standby blower if available","Contact maintenance immediately for repairs"],
    note:"A DO crash from equipment failure can devastate the biological community within hours. This is a plant emergency — escalate immediately.", sop:null },

  aer_do_nitrification: { title:"Low DO from High Nitrification Oxygen Demand", severity:"moderate",
    causes:["High ammonia load increasing nitrification oxygen demand","Seasonal temperature increase accelerating nitrification rate","Inadequate aeration capacity for current loading"],
    actions:["Check effluent ammonia and nitrate to assess nitrification extent","Increase aeration rate to meet nitrification oxygen demand","Verify SRT is adequate (typically >8–10 days at warmer temperatures)","Review MLSS — may need to increase biomass inventory"],
    note:"Nitrification consumes ~4.6 mg O2 per mg NH4-N oxidized. Large ammonia spikes can overwhelm aeration capacity within a single shift.", sop:null },

  aer_high_do_loading: { title:"High DO Due to Reduced Loading", severity:"low",
    causes:["Lower organic load reducing oxygen demand","Seasonal low-flow period","Industrial customer offline"],
    actions:["Reduce aeration rate — turn off blowers or lower speed on VFDs","Check that DO control system (if automated) is responding to load changes","Increase WAS rate to avoid SRT climbing too high","Monitor for Microthrix foam — low F/M conditions favor it"],
    note:"Running excess aeration wastes energy and can drive SRT too high if wasting isn't adjusted. Low F/M + high DO is the classic setup for Microthrix problems.", sop:null },

  aer_high_do_control: { title:"High DO Due to Control System Issue", severity:"low",
    causes:["DO probe fouled — reading low, causing blowers to over-respond","DO control loop tuned too aggressively","Manual override left on"],
    actions:["Clean and recalibrate DO probe — compare reading to grab sample Winkler test","Check DO controller setpoint and output","Review blower control for manual overrides","If automated, verify control loop is responding correctly"],
    note:"A fouled DO probe reading low is one of the most common causes of unnecessary high aeration. Probe maintenance is often neglected.", sop:null },

  aer_foam_surfactant: { title:"Surfactant Foam (Detergent-Based)", severity:"low",
    causes:["High detergent loading from residential or commercial sources","Low MLSS concentration reducing foam suppression","New cleaning product discharged upstream"],
    actions:["This foam is usually self-limiting — monitor, don't panic","Spray water on foam surface to break it down physically","Investigate any new upstream discharge sources","If persistent, increase MLSS slightly to improve foam suppression"],
    note:"Surfactant foam is white and sudsy and disappears when pressed. It does not indicate a biological problem and usually resolves on its own.", sop:null },

  aer_foam_nocardia: { title:"Nocardia-Type Foam (Filamentous Actinomycetes)", severity:"high",
    causes:["Nocardia amarae or similar actinomycetes proliferating","Low F/M ratio or over-aeration","High oil and grease in influent","SRT too high for current conditions"],
    actions:["Increase wasting to reduce SRT — target lower end of design range","Investigate and reduce O&G loading from influent if possible","Chlorinate RAS at low dose (1–2 mg/L) to selectively suppress filaments","Do NOT spray foam back into basin — it will re-seed the system","Increase MLSS slightly if SRT cannot be adjusted"],
    note:"Nocardia foam is viscous, chocolate-brown, and stable. Recovery takes weeks. Microscopy confirms organism. Consistent SRT control is the only reliable long-term fix.", sop:null },

  aer_foam_microthrix: { title:"Microthrix Foam (High-SRT / High-Fat Conditions)", severity:"moderate",
    causes:["Very high SRT or over-stabilized sludge","High fat/oil/grease loading from influent","Cold temperatures reducing biological activity and driving up SRT"],
    actions:["Review current SRT — reduce slightly by increasing WAS","Investigate O&G sources in influent","Improve primary treatment to capture more grease before aeration","Selective wasting of foam concentrate if equipment allows"],
    note:"Microthrix thrives at long SRTs and low F/M. Common in winter when operators hold extra sludge to protect nitrification. The fix creates the problem — a difficult tradeoff.", sop:null },

  aer_bulk_filamentous: { title:"Filamentous Bulking", severity:"high",
    causes:["Low DO selecting for filamentous organisms (Thiothrix, Type 021N)","Low F/M selecting for Microthrix or Nocardia","Nutrient deficiency (N or P) favoring filaments","Septic influent feeding sulfur-utilizing filaments"],
    actions:["Identify filament type via microscopy — treatment strategy differs by organism","Low-DO filaments: increase DO immediately to 2+ mg/L","Low-F/M filaments: increase F/M by wasting or reducing MLSS","RAS chlorination (2–5 mg/L) as a temporary suppression measure","Verify influent N:P:BOD ratios — nutrient deficiency is often overlooked"],
    note:"SVI >200 mL/g indicates severe bulking. Recovery can take 2–4 weeks of consistent corrective operation. Microscopy is essential for accurate diagnosis.", sop:null },

  aer_bulk_denitrification: { title:"Denitrification-Related Blanket Rise in Settling", severity:"moderate",
    causes:["Nitrate-laden sludge denitrifying in clarifier dead zones, producing N2 gas","Deep sludge blanket allowing extended anaerobic retention","High nitrate in RAS combined with slow return rate"],
    actions:["Increase RAS rate to reduce sludge retention time in clarifier","Add anoxic zone or selector upstream if not present (long-term fix)","If nitrification is unintentional, reduce SRT to suppress nitrifiers","Reduce sludge blanket depth by wasting more frequently"],
    note:"Denitrification in the clarifier is common in systems with strong nitrification but no anoxic zone. Rising sludge is buoyant and can overflow weirs rapidly.", sop:null },

  aer_bulk_dispersed: { title:"Dispersed Growth / Poor Floc Formation", severity:"high",
    causes:["Very low SRT — floc-forming bacteria washed out","Toxic inhibition disrupting biological community","Extreme loading or temperature shock"],
    actions:["Check for toxic upstream discharge — effluent toxicity test can identify","Increase SRT if below design minimum","Reduce loading if possible during recovery period","Add polymer to clarifier feed to aid settling temporarily"],
    note:"Dispersed growth produces chronically turbid effluent with no visible floc structure. If toxicity is suspected, bioassay and upstream sampling should be prioritized.", sop:null },

  aer_bulk_viscous: { title:"Viscous / Zoogleal Bulking", severity:"moderate",
    causes:["Excess exopolysaccharide production by zoogleal organisms","High BOD or starch loading creating thick slime matrix","Low F/M with certain industrial waste types (paper, food processing)"],
    actions:["Increase F/M ratio by reducing MLSS or increasing loading proportion","Reduce carbohydrate-heavy industrial inputs if possible","Chlorinate RAS at low dose to disrupt slime matrix","Monitor SVI — viscous bulking can be just as damaging as filamentous"],
    note:"Viscous bulking is less common than filamentous but produces similar SVI problems. The jelly-like consistency of the settleometer contents is the diagnostic tell.", sop:null },

  aer_mlss_wasting: { title:"Insufficient Wasting / MLSS Buildup", severity:"low",
    causes:["WAS rate too low or wasting suspended","WAS pump failure","Operator error in wasting schedule"],
    actions:["Resume normal wasting schedule immediately","Calculate target SRT and compare to actual — adjust WAS rate","Verify WAS flow meter and pump operation","Monitor clarifier blanket depth — high MLSS can overload settling capacity"],
    note:"High MLSS alone is not always harmful but reduces safety margin in clarifiers. During peak flow events, an already-deep blanket can quickly overflow weirs.", sop:null },

  aer_mlss_loading: { title:"MLSS Increase from Higher Loading", severity:"low",
    causes:["Higher BOD loading producing more biomass at the same SRT","Seasonal loading increase"],
    actions:["Increase WAS rate proportionally to loading increase","Monitor F/M ratio — may need to hold more MLSS as a buffer","Verify aeration capacity keeps pace with higher oxygen demand"],
    note:"At constant SRT, biomass production tracks loading. More food = more bugs. This is normal — just manage WAS accordingly.", sop:null },

  aer_mlss_washout: { title:"MLSS Dropping Due to Solids Loss in Effluent", severity:"high",
    causes:["Clarifier overflow carrying solids out of system","Bulking or denitrification blanket rise","Hydraulic surge washing out biomass"],
    actions:["Address clarifier issue immediately — identify cause of solids carryover","Reduce WAS or suspend wasting to preserve remaining MLSS","Increase RAS rate to recover sludge from clarifier","Monitor MLSS twice daily until recovery is confirmed"],
    note:"Biomass recovery after a washout can take 1–3 weeks. SRT must be maintained high enough for recovery, which means minimizing WAS during the recovery period.", sop:null },

  aer_mlss_overwaste: { title:"MLSS Drop Due to Accidental Over-Wasting", severity:"moderate",
    causes:["WAS valve or pump error causing excessive sludge removal","Incorrect SRT calculation leading to over-wasting","Extended wasting period due to operator error"],
    actions:["Stop or drastically reduce WAS immediately","Allow MLSS to recover — expect 1–3 weeks depending on severity","Do not compensate by dramatically increasing loading — the biology needs time","Monitor nitrification — it is most sensitive to SRT drops"],
    note:"A sludge inventory crash is one of the harder process upsets to recover from quickly. Patience and stable operation are the best medicine.", sop:null },

  aer_mlss_loading_drop: { title:"MLSS Drop Due to Reduced Loading", severity:"low",
    causes:["Lower loading reducing net biomass production","Current wasting rate higher than needed for actual loading"],
    actions:["Reduce WAS rate to allow MLSS to rebuild","Recalculate target SRT based on current loading","Monitor nitrification performance — SRT may have dropped below nitrifier threshold"],
    note:"This is a normal and manageable process condition. Failing to adjust WAS when loading drops is a common oversight that can lead to unintended MLSS decline.", sop:null },

  aer_nitrif_temp: { title:"Nitrification Failure Due to Cold Temperature", severity:"high",
    causes:["Water temperature below 10–12°C dramatically slowing nitrifier growth rate","SRT no longer sufficient for nitrifiers at cold temperatures","Seasonal drop catching operators off guard"],
    actions:["Increase SRT immediately — reduce WAS rate significantly","Maintain higher MLSS to compensate for slower nitrifier growth","Reduce loading or provide additional treatment capacity if possible","Monitor effluent ammonia daily during cold-weather transition periods"],
    note:"Nitrifier growth rate roughly halves for every 10°C drop in temperature. A system that nitrifies well at 20°C may fail completely at 10°C with the same SRT.", sop:null },

  aer_nitrif_srt: { title:"Nitrification Failure Due to Insufficient SRT", severity:"high",
    causes:["SRT below minimum threshold for nitrifier washout","Over-wasting or solids loss reducing effective SRT","Increased loading without corresponding MLSS increase"],
    actions:["Increase SRT by reducing WAS — do not over-correct too fast","Increase MLSS to build nitrifier population","Verify actual SRT calculation — check for solids losses in effluent","Expect 2–4 weeks for full nitrification recovery"],
    note:"Nitrifiers are the most SRT-sensitive organisms in activated sludge. They are always the first to wash out and the last to recover.", sop:null },

  aer_nitrif_inhibition: { title:"Nitrification Inhibition — Potential Toxic Influent", severity:"high",
    causes:["Heavy metals, solvents, or other toxics inhibiting nitrifiers","High free ammonia concentrations (above 2–5 mg/L at high pH)","Industrial slug load with inhibitory compounds"],
    actions:["Collect influent and aeration basin samples for toxicity screening","Identify and stop toxic discharge at source","If free ammonia inhibition suspected, check pH and total ammonia","Allow system to recover — nitrification should resume once inhibitor is removed","Notify pretreatment coordinator and regulatory agency"],
    note:"Free ammonia inhibition is self-limiting — as ammonia oxidizes, inhibition decreases. External toxics require source identification and control.", sop:null },

  aer_ph_low: { title:"Low pH in Aeration Basin", severity:"moderate",
    causes:["High nitrification consuming alkalinity, driving down pH","Industrial acid discharge in influent","Low influent alkalinity combined with high ammonia load","CO2 buildup in poorly ventilated basin"],
    actions:["Check alkalinity — nitrification requires ~7.1 mg alkalinity per mg NH4-N oxidized","Add sodium bicarbonate or lime to supplement alkalinity if depleted","Investigate industrial acid sources in influent","If pH is below 6.5, biological activity is significantly impaired — treat urgently"],
    note:"pH below 6.5 will begin inhibiting nitrifiers significantly. Below 6.0, even heterotrophs struggle. Alkalinity supplementation is often the fastest fix.", sop:null },

  aer_ph_high: { title:"High pH in Aeration Basin", severity:"moderate",
    causes:["Industrial alkaline discharge (lime, caustic, concrete washout)","Chemical addition error upstream","Very low CO2 and high photosynthetic activity (algae in open basin)"],
    actions:["Identify source of alkaline discharge and stop it","Check chemical feed systems for over-dosing","If algae-related, consider shade structures or algaecide for open basins","Monitor nitrification — free ammonia inhibition increases above pH 7.5"],
    note:"High pH in activated sludge is less common than low pH but can still impair biology. Above pH 8.5, floc structure can deteriorate.", sop:null },

  aer_color_black: { title:"Dark / Black Mixed Liquor Color", severity:"moderate",
    causes:["Septic or anaerobic conditions in the basin","Sulfide formation causing iron sulfide precipitation","Industrial waste with dark pigment (ink, dye, coffee, molasses)"],
    actions:["Check DO immediately — black color often indicates anaerobic zones","Increase aeration to oxygenate the basin","Investigate influent for industrial colored waste","Check for septicity in influent — may need odor control upstream"],
    note:"A slight grayish tint can be normal at low F/M, but jet-black mixed liquor almost always indicates anaerobic conditions or a toxic/industrial episode.", sop:null },

  aer_color_pale: { title:"Pale / Light Mixed Liquor Color", severity:"moderate",
    causes:["Very low MLSS or dilute mixed liquor","High loading washing out biomass faster than it grows","Large proportion of inert TSS diluting active biomass"],
    actions:["Measure MLSS — confirm low concentration is real, not visual illusion","Reduce WAS if MLSS is genuinely low","Check for solids loss in effluent","Evaluate VSS:TSS ratio — very pale liquor may have high inorganic content"],
    note:"Healthy mixed liquor is typically medium to dark brown. Very light tan or gray coloration usually means low volatile solids content or very low MLSS.", sop:null },

  aer_color_unusual: { title:"Unusual Mixed Liquor Color (Industrial Discharge)", severity:"high",
    causes:["Industrial dye, ink, or pigment discharge","Chemical addition error (too much ferric, lime, polymer)","Unusual industrial waste type entering system"],
    actions:["Collect and preserve influent grab sample immediately","Notify pretreatment coordinator and begin source investigation","Assess impact on biological community — unusual colors can indicate toxicity","Increase monitoring frequency for effluent quality"],
    note:"Document everything with time-stamped photos. If toxicity is confirmed, regulatory notification may be required.", sop:null },

  /* ── SECONDARY CLARIFIER ──────────────────────────────────── */
  clar_pin_floc: { title:"Pin Floc / Turbid Effluent (No Blanket Rise)", severity:"moderate",
    causes:["Very low SRT — floc-forming organisms washed out","High hydraulic shear breaking floc apart","Nutrient deficiency affecting floc structure"],
    actions:["Increase SRT — reduce WAS rate gradually","Check effluent coliform to assess biological health","Reduce hydraulic turbulence where possible (check baffles, inlet structures)","Evaluate polymer addition to improve settleability temporarily","Review influent N and P — nutrient deficiency produces weak, dispersed floc"],
    note:"Pin floc is very fine and won't settle even in a calm jar test. This is a biological community problem, not a hydraulic one. Recovery requires patience and stable SRT.", sop:null },

  clar_floating_sludge: { title:"Floating Sludge / Scum in Clarifier", severity:"moderate",
    causes:["Denitrification in blanket lifting sludge to surface","Grease or oil entrapped in floc","Nocardia foam migrating from aeration basin"],
    actions:["Check nitrate levels in clarifier — if denitrification, increase RAS rate","Inspect surface scum — is it greasy, biological foam, or sludge floc?","Increase scum removal if mechanical skimmers are available","If Nocardia-related, treat aeration basin"],
    note:"Floating sludge and rising blanket look similar. Key difference: floating sludge accumulates at the surface while a rising blanket is an upward-moving mass throughout the clarifier.", sop:null },

  clar_blanket_denitrification: { title:"Rising Sludge Blanket — Denitrification-Driven", severity:"high",
    causes:["Nitrate-laden sludge denitrifying in clarifier, producing N2 gas bubbles","Excess sludge retention time in clarifier creating anaerobic pockets","High nitrate in RAS with slow return rate"],
    actions:["Immediately increase RAS rate by 25–50% to clear blanket","Reduce WAS temporarily to maintain MLSS while clearing clarifier","Consider adding carbon to anoxic zone (if present) to drive denitrification before clarifier","Increase sludge removal frequency"],
    note:"Long-term fix is process redesign with anoxic selectors or pre-anoxic zone if this recurs frequently. Denitrification in the clarifier is a systemic design gap.", sop:null },

  clar_blanket_hydraulic: { title:"Rising Sludge Blanket — Hydraulic Overload", severity:"high",
    causes:["Flow surge exceeding clarifier surface overflow rate design","High MLSS combined with peak flow event","Storm or I&I event"],
    actions:["If equalization basin available, divert excess flow","Increase RAS rate to prevent blanket from deepening further","Reduce WAS temporarily to preserve MLSS","Alert supervisors — potential permit exceedance risk","Document flows and conditions for regulatory reporting"],
    note:"Surface overflow rate (SOR) should stay below design maximum. During storms, SOR can spike 3–5x, overwhelming even well-designed clarifiers quickly.", sop:null },

  clar_thin_mlss: { title:"Thin Clarifier Blanket — Low System MLSS", severity:"moderate",
    causes:["System-wide MLSS decline from over-wasting or solids loss","Low loading period with wasting not reduced accordingly","Biological washout event"],
    actions:["Reduce or stop WAS to allow MLSS recovery","Check for solids loss in effluent as a contributing factor","Confirm with aeration basin MLSS measurement","Expect 1–3 weeks for MLSS recovery at reduced wasting"],
    note:"A thin clarifier blanket itself is not harmful — it just reflects low system inventory. The problem is what led to the low inventory and whether permit compliance is at risk.", sop:null },

  clar_thin_ras: { title:"Thin Clarifier Blanket — RAS Rate Too High", severity:"low",
    causes:["RAS pumping rate so high that sludge can't concentrate in clarifier","Low influent flow with RAS rate not reduced accordingly","Blanket being continuously pulled into RAS before concentrating"],
    actions:["Reduce RAS rate — allow blanket to concentrate and deepen slightly","Target RAS TSS of 3–6x MLSS as a concentration indicator","Verify flow meter on RAS line is accurate"],
    note:"Counterintuitively, running RAS too fast can prevent the blanket from forming properly, resulting in dilute RAS that doesn't effectively seed the aeration basin.", sop:null },

  clar_ras_mechanical: { title:"RAS Pump Mechanical Failure", severity:"high",
    causes:["Pump motor failure","Clogged impeller or valve failure","Electrical fault"],
    actions:["Switch to standby RAS pump immediately","Notify maintenance for immediate repair","Monitor sludge blanket — it will deepen rapidly without RAS","Consider reducing influent loading or diverting flow if blanket approaches weir"],
    note:"Loss of RAS is a plant emergency. MLSS will crash and solids will carry over within hours if not addressed. Standby pumps should be exercised regularly.", sop:null },

  clar_ras_thin: { title:"Thin / Watery RAS", severity:"moderate",
    causes:["Sludge not concentrating due to bulking or poor settling","RAS rate too high, pulling clarified effluent","Poor floc formation limiting blanket concentration"],
    actions:["Measure RAS TSS — if <2,000 mg/L, blanket is not concentrating","Reduce RAS rate slightly to allow blanket to concentrate","Check settleability (SVI) — high SVI means the problem is biological","Review aeration basin for filamentous conditions"],
    note:"RAS TSS should typically be 3–6x the MLSS concentration. Thin RAS means you're diluting the aeration basin rather than seeding it with concentrated biomass.", sop:null },

  clar_ras_rate: { title:"RAS Rate Insufficient for Current Conditions", severity:"moderate",
    causes:["RAS flow set too low for current MLSS or loading","High F/M requiring faster biomass return","Peak flow event requiring elevated RAS"],
    actions:["Increase RAS rate — start with 50–100% of influent flow as a baseline","Monitor blanket depth response after adjustment","Verify RAS flow meter accuracy"],
    note:"RAS rate is the primary lever for managing sludge blanket depth. Operators should check blanket depth at least once per shift under normal conditions.", sop:null },

  clar_odor_blanket: { title:"Septic Odor — Anaerobic Sludge Blanket", severity:"moderate",
    causes:["Sludge held too long in clarifier becoming anaerobic and producing H2S","Insufficient wasting creating excessive blanket depth","Poor sludge collection mechanism"],
    actions:["Increase RAS rate to turn over the blanket faster","Increase WAS to reduce total sludge inventory","Inspect sludge collection mechanism (rakes, scrapers) for malfunction","Check clarifier dead zones — sediment accumulation is often hidden"],
    note:"An anaerobic blanket produces H2S and degrades effluent quality. Keep sludge blanket below 3–4 feet in most conventional clarifiers.", sop:null },

  clar_odor_influent: { title:"Septic Odor — Carryover from Influent/Aeration", severity:"low",
    causes:["Septic influent bringing H2S into secondary treatment","Sulfide-rich effluent passing through aeration without full oxidation","Low DO in aeration basin allowing sulfides to persist"],
    actions:["Address septicity at influent / headworks","Verify aeration is providing sufficient DO to oxidize sulfides","Check primary clarifier performance if present"],
    note:"If aeration basin is functioning well, sulfides should be oxidized before reaching the secondary clarifier. Persistent odor here usually indicates an upstream problem.", sop:null },

  clar_scum_fog: { title:"FOG-Related Scum Accumulation on Clarifier", severity:"moderate",
    causes:["High oil and grease loading from influent passing through treatment","Inadequate primary treatment grease removal","Warm weather reducing grease viscosity and floatability"],
    actions:["Increase scum removal frequency","Review grease trap enforcement for service area","Improve primary treatment skimming if primary clarifiers are present","Ensure scum is properly removed and not recirculated"],
    note:"Clarifier scum accumulation can cause weir fouling and localized short-circuiting. It should be removed before it builds up significantly.", sop:null },

  clar_scum_bio: { title:"Biological Foam / Scum on Clarifier Surface", severity:"moderate",
    causes:["Nocardia or Microthrix foam migrating from aeration basin","Filamentous organisms accumulating at clarifier surface"],
    actions:["Address root cause in aeration basin (see foam diagnoses)","Do not recirculate clarifier scum to aeration basin","Waste foam directly if possible — do not let it accumulate","Consider chlorinated foam spray to suppress surface growth"],
    note:"Clarifier scum that is brown, stable, and greasy to touch is almost always Nocardia or Microthrix. The aeration basin is the source — treat there.", sop:null },

  clar_shortcircuit_hydraulic: { title:"Hydraulic Short-Circuiting at Peak Flows", severity:"moderate",
    causes:["Inlet energy causing density currents bypassing settling zone","Insufficient inlet baffle or energy dissipation","High SOR during peak flows driving flow across surface"],
    actions:["Review inlet baffle design — energy dissipation is critical","Consider flow equalization to reduce peak SOR","Schedule peak flow dye tracing or tracer study to confirm short-circuiting","Evaluate feasibility of adding baffles or internal launders"],
    note:"Short-circuiting is often invisible and underdiagnosed. If effluent quality spikes predictably at peak flows, hydraulic short-circuiting is a prime suspect.", sop:null },

  clar_shortcircuit_structural: { title:"Structural Short-Circuiting / Clarifier Dead Zones", severity:"moderate",
    causes:["Damaged or missing baffles","Sludge blanket dead zones in corners or edges","Corroded or plugged sludge collection arms","Uneven weir causing flow to preferentially leave one side"],
    actions:["Inspect clarifier during planned shutdown — look for structural damage","Check weir level and cleanliness","Verify sludge collector mechanism is operating and all arms are moving","Dye test to visualize flow patterns"],
    note:"Structural issues require a clarifier inspection, which means a planned dewatering and entry. Schedule during low-flow season if possible.", sop:null },

  clar_weir_level: { title:"Uneven Clarifier — Weir and Structural Leveling Issue", severity:"moderate",
    causes:["Settlement or construction variation causing clarifier to sit unlevel","One weir section damaged or modified","Uneven weir notches from corrosion or damage"],
    actions:["Survey clarifier weir elevation — measure at multiple points","Add weir plates or adjust weir elevation to balance flow","Schedule structural repair if clarifier is significantly out of level","Redistribute influent piping if possible"],
    note:"Even a few millimeters of weir height difference can cause significantly uneven flow distribution. Weir leveling is a routine maintenance item that is often overlooked.", sop:null },

  clar_weir_algae: { title:"Weir Fouling — Algae or Biological Growth", severity:"low",
    causes:["Algae growing on wetted weir surfaces","Biofilm or slime accumulating on weir plates"],
    actions:["Power wash weir surfaces during low-flow periods","Apply algaecide to weir surfaces if algae growth is persistent","Increase weir cleaning frequency — consider weekly schedule","Check if weir material can be replaced with less-fouling surface"],
    note:"Algae and biofilm on weirs can create localized short-circuiting and affect effluent sampling accuracy. Regular cleaning is the simple fix.", sop:null },


  /* ── SOLIDS TRAIN: GBT ────────────────────────────────────── */
  gbt_polymer: { title:"GBT Poor Thickening — Polymer Issue", severity:"moderate",
    causes:["Wrong polymer type for current WAS characteristics","Polymer dose too low for current feed solids","Polymer pump calibration drift or failure"],
    actions:["Perform bench jar test with current polymer at varying doses","Test alternative polymer products if jar test fails at all doses","Check polymer dilution system — verify proper mixing and concentration","Inspect polymer storage — verify age and storage conditions"],
    note:"Polymer optimization is highly sludge-specific. Small changes in WAS composition (seasonal changes, varying SVI) often require re-optimization.", sop:null },

  gbt_was_quality: { title:"GBT Poor Thickening — WAS Quality Issue", severity:"moderate",
    causes:["Bulking sludge (high SVI) in secondary reducing GBT performance","Thin WAS (low TSS) providing too little solids for belt to dewater","Filamentous organisms causing poor floc consolidation"],
    actions:["Address root cause of bulking in secondary clarifier — see Aeration section","If SVI is high, increase polymer dose as a bridge measure","Check WAS TSS — if very dilute (<2,000 mg/L), adjust WAS pump rate and RAS"],
    note:"GBT performance is directly tied to feed WAS quality. Fixing the secondary process is the only lasting solution — polymer can only compensate so far.", sop:null },

  gbt_belt_condition: { title:"GBT Poor Thickening — Belt Condition Issue", severity:"moderate",
    causes:["Belt blinded from accumulated solids — pores clogged","Belt worn or stretched — insufficient tension for effective dewatering","Wash water nozzles partially plugged reducing belt cleaning"],
    actions:["Inspect belt visually — hold up to light to check pore openness","Increase wash water pressure and verify all nozzles are unobstructed","Check belt tension per manufacturer specification","If belt is severely blinded, perform acid wash or chemical cleaning","Schedule belt replacement if cleaning doesn't restore performance"],
    note:"Belt press belts have a finite life in grit-laden or high-solids service. Tracking cake solids over time makes gradual belt degradation visible before it becomes a hauling cost problem.", sop:null },

  gbt_blind_mechanical: { title:"GBT Belt Blinding — Mechanical Pore Blockage", severity:"moderate",
    causes:["Accumulated solids physically blocking belt pores","Mineral scale from hard water or chemical addition","Biological growth on belt surface between wash cycles"],
    actions:["Increase wash water pressure — verify spray pattern covers full belt width","Perform chemical cleaning per manufacturer protocol (citric acid for mineral scale)","Increase wash water volume or add additional spray bars","Reduce belt speed to allow more wash contact time"],
    note:"Belt blinding is cumulative — regular preventive cleaning is far better than reactive deep cleaning. A scheduled acid wash every few months prevents chronic blinding.", sop:null },

  gbt_blind_polymer: { title:"GBT Belt Blinding — Poor Floc Conditioning", severity:"moderate",
    causes:["Insufficient polymer dose leaving sludge unconditioned","Wrong polymer type producing unstable floc","Poor polymer mixing time before belt contact"],
    actions:["Increase polymer dose in increments — observe floc quality and cake dryness","Evaluate polymer injection point — adequate mixing time is critical","Perform jar test to find optimal dose range","Test alternative polymer products if dose increase doesn't help"],
    note:"Sludge squeezing through the belt (wet, sticky cake) is usually a conditioning problem, not a belt problem. Adequate flocculation before the belt is the critical step.", sop:null },

  gbt_plc_fault: { title:"GBT PLC / Communication Fault", severity:"high",
    causes:["PLC communication loss between GBT control panel and plant SCADA","Power supply issue to PLC","PLC program fault or watchdog timeout","Communication cable damage or connector failure"],
    actions:["Check PLC control panel for fault codes — document any displayed error codes","Verify power supply to PLC panel is stable","Check communication cable connections at both ends — reseat if loose","Attempt PLC restart per manufacturer procedure — document before resetting","Notify controls maintenance if fault persists after restart","GBT may require manual operation while PLC is being repaired"],
    note:"A PLC comm fault does not necessarily mean the GBT is mechanically failed. The belt may continue to run in local control while the comm issue is diagnosed.", sop:null },

  gbt_polymer_pump: { title:"GBT Polymer Pump Failure", severity:"high",
    causes:["Polymer pump motor fault","Polymer pump head plugged with crystallized polymer","Polymer supply line air lock","VFD fault on polymer pump"],
    actions:["Check polymer pump control panel for fault codes","Verify polymer supply line is free of air locks and blockages","Inspect pump head for polymer crystal buildup — flush with water if plugged","Switch to standby polymer pump if available","Without polymer, GBT cannot thicken WAS effectively — notify supervisor"],
    note:"Operating GBT without polymer produces very thin cake (< 2% TS) and sends unconditioned solids back to the plant through filtrate. Stop feeding WAS to GBT if polymer cannot be restored quickly.", sop:null },

  gbt_drive_alarm: { title:"GBT Belt Drive or Tension Alarm", severity:"high",
    causes:["Belt slip due to insufficient tension","Drive motor overload from belt blinding or excessive cake load","Belt tracking off-center — edge contact causing alarm","Drive gearbox or chain fault"],
    actions:["Check belt tracking — belt should run centered on rollers","Adjust belt tension per manufacturer specification","Inspect drive chain and sprockets for wear or damage","Check belt for damage that may be causing uneven loading","If belt is running off-center, adjust tracking roller as per O&M manual"],
    note:"Never attempt to adjust belt tracking or tension while the belt is moving unless the control system specifically requires it. Lockout/tagout before reaching into the belt area.", sop:null },

  gbt_filtrate_polymer: { title:"GBT Cloudy Filtrate — Polymer Issue", severity:"moderate",
    causes:["Polymer dose too low — solids not conditioned into filterable floc","Wrong polymer type producing fine, non-settable particles","Polymer injection point timing mismatch with feed pump"],
    actions:["Increase polymer dose — monitor filtrate clarity as leading indicator","Test alternative polymer products","Verify polymer injection timing is synchronized with WAS feed pump","Check that mixing turbulence is adequate — poor mixing wastes polymer"],
    note:"Filtrate TSS is the most sensitive indicator of polymer performance — it responds faster than cake dryness. Use it as a real-time process control indicator.", sop:null },

  gbt_filtrate_belt: { title:"GBT Cloudy Filtrate — Belt or Mechanical Issue", severity:"moderate",
    causes:["Belt tears or holes allowing solids to pass through","Belt blinded in localized areas causing bypass through adjacent zones","Gravity drainage section not functioning — solids carried to pressure zone"],
    actions:["Inspect belt for tears, holes, or damaged seams","Check gravity drainage section — verify free liquid draining before press zone","Inspect belt wash system for uniform coverage","If belt has holes, schedule belt replacement — patch repairs are temporary"],
    note:"Filtrate from a damaged belt will carry significant TSS back to the plant. If filtrate is visibly turbid despite good polymer conditioning, suspect belt damage.", sop:null },

  /* ── SOLIDS TRAIN: GRAVITY THICKENER ─────────────────────── */
  gt_no_blanket: { title:"Gravity Thickener No Blanket — Very Thin Underflow", severity:"moderate",
    causes:["Feed rate too low — thickener not receiving enough sludge to form blanket","Underflow pump removing sludge faster than it accumulates","Primary sludge extremely dilute and not forming blanket"],
    actions:["Check primary sludge feed rate — increase if below design","Reduce underflow pump cycle frequency to allow blanket to establish","Measure underflow TSS — if < 3%, thickener is not concentrating","Allow blanket to build over 12–24 hours with reduced underflow pumping"],
    note:"A gravity thickener needs adequate feed to maintain a blanket. Intermittent feed or very dilute feed can prevent blanket formation entirely.", sop:null },

  gt_overthin_pump: { title:"Gravity Thickener Thin Underflow — Over-Pumping", severity:"moderate",
    causes:["Underflow pump running too frequently — drawing clarified supernatant with thickened sludge","Pump rate not matched to actual thickening rate","Pump on timer set for high loading that no longer exists"],
    actions:["Reduce underflow pump cycle frequency or runtime","Allow sludge to sit and concentrate in hopper — measure blanket depth before pumping","Target underflow TSS of 4–8% for good performance","Adjust pump schedule based on current blanket depth measurements"],
    note:"Gravity thickener underflow should be pumped on a schedule based on blanket depth, not a fixed timer. A blanket depth probe or scheduled manual soundings are the key control inputs.", sop:null },

  gt_screen_blind: { title:"Gravity Thickener Screen Blinding", severity:"moderate",
    causes:["Rags and fibrous material accumulating on inline screen","High solids loading exceeding screen capacity","Screen basket not cleaned frequently enough"],
    actions:["Inspect screen basket — clear accumulated material manually or with water hose","Increase screen cleaning frequency","Check upstream for rag sources — bar screen bypass or equipment gaps","If screen requires frequent clearing, evaluate whether a finer bar screen is needed upstream"],
    note:"Gravity thickener screens protect downstream pumps and piping from rags and debris in primary sludge. A blinded screen causes flow backup and dilutes the sludge by backing up supernatant.", sop:null },

  gt_grinder_fault: { title:"Gravity Thickener Grinder / Compactor Fault", severity:"high",
    causes:["Grinder jammed with hard debris (grit, rags, hardware)","Motor overload trip","Grinder wear — cutting elements dull or damaged"],
    actions:["Stop feed to grinder — do not force against a jam","Implement lockout/tagout before any manual intervention","Inspect grinder chamber for hard debris — remove manually if accessible","Check motor overload relay — reset after clearing jam and verifying cause","Contact maintenance for grinder inspection and element replacement if worn"],
    note:"Grinder faults on gravity thickener discharge are often caused by grit carryover from primary treatment. If grit is a chronic issue, inspect primary clarifier collection for grit accumulation.", sop:null },

  gt_dilution: { title:"Gravity Thickener High Dilution Water Needed", severity:"low",
    causes:["Primary sludge too thick for pump to handle — approaching 8–10% TS","Cold weather causing sludge to become more viscous","Gravity thickener over-concentrating due to very low feed rate"],
    actions:["Increase dilution water flow rate to allow pump suction","Adjust underflow pump timing to pull sludge more frequently before it over-concentrates","Monitor feed sludge TSS — if consistently very high, review primary sludge pump scheduling"],
    note:"Some dilution water is normal and expected for pumping very thick primary sludge. The goal is the minimum dilution needed to maintain pump operation — excessive dilution defeats the purpose of thickening.", sop:null },

  gt_flow_zero: { title:"Gravity Thickener Sludge Flow Reading Zero or Negative", severity:"moderate",
    causes:["Flow meter in reverse orientation or with air in line showing negative reading","Sludge pump not running — flow meter correct","Flow meter failure or calibration error","Isolation valve closed upstream or downstream of meter"],
    actions:["Verify pump is actually running — check motor amp draw, not just status indication","Inspect flow meter installation — check for air entrainment or reverse flow reading","Verify all isolation valves in the flow path are open","Compare pump speed/position to expected flow — if mismatch, suspect meter issue","If reading is -5 to +5 GPM with pump off, the meter zero may need recalibration"],
    note:"Negative flow readings on sludge lines often indicate a flow meter issue (air in line, reverse installation, or drift) rather than actual reverse flow. Always cross-check with pump operation.", sop:null },

  gt_flow_mismatch: { title:"Gravity Thickener Transfer Flow Not Matching Sludge Flow", severity:"moderate",
    causes:["Transfer pump set point and sludge pump set point not coordinated","One pump bypassing or routing flow to different destination","SCADA display pulling data from wrong meter"],
    actions:["Verify which destination the transfer pump is currently routing to","Check transfer pump set point against current THS demand","Confirm SCADA flow readings correspond to correct instruments","Review operating log — confirm whether this is a recent change or chronic issue"],
    note:"Flow mismatches on the gravity thickener often reflect normal operational routing variations rather than equipment failure. Verify the routing intent before assuming an equipment problem.", sop:null },

  gt_equipment_alarm: { title:"Gravity Thickener Active Equipment Alarm", severity:"high",
    causes:["Rake mechanism torque overload from dense sludge or debris","Pump fault on underflow or transfer pump","Level sensor alarm on thickener or downstream storage"],
    actions:["Check SCADA alarm list for specific alarm source and code","If rake torque alarm: reduce feed temporarily, check for debris, pump down blanket before restarting","If pump alarm: switch to standby pump, notify maintenance","If level alarm: verify actual level with manual measurement — sensor may be fouled"],
    note:"Always verify the physical state of the equipment matches what the alarm is reporting. Instrument faults (fouled level sensors, failed flow meters) can trigger alarms without an actual process problem.", sop:null },

  /* ── SOLIDS TRAIN: THS STORAGE ────────────────────────────── */
  ths_high_level: { title:"THS Storage Cell Level Rising — Digester Feed Not Keeping Up", severity:"moderate",
    causes:["GBT and GT producing more thickened sludge than digester feed rate can accept","Digester feed pump fault reducing throughput","Seasonal increase in solids production with fixed digester feed schedule"],
    actions:["Increase digester feed pump rate or frequency to pull down THS level","Verify digester feed pump is operating and not faulted","Check THS level against digester VS loading — ensure loading remains within design","Coordinate with digester operators before significantly increasing feed rate"],
    note:"Overfilling THS storage limits buffer capacity for operational upsets. Keep cells below 80% capacity under normal operations. VS loading to digesters must be managed carefully — don't overfeed to draw down storage.", sop:null },

  ths_low_level: { title:"THS Storage Cell Level Dropping — Thickening Not Keeping Up", severity:"moderate",
    causes:["GBT or GT not running or underperforming — production too low","WAS feed to GBT reduced due to low loading","Primary sludge production low during seasonal low-flow period"],
    actions:["Check GBT and GT operational status — verify both are running on schedule","Review WAS production rate — if genuinely low, this may be a normal seasonal variation","Reduce digester feed rate to balance with reduced THS input","Ensure digester VS loading doesn't drop below design minimum — biology can be affected by starvation"],
    note:"THS storage exists to buffer variability in thickening production. Some level variation is normal. The concern is when storage approaches empty, removing the buffer for digester feed continuity.", sop:null },

  /* ── SOLIDS TRAIN: DIGESTERS ──────────────────────────────── */
  dig_gas_loading: { title:"Low Digester Gas Production — Feed Reduced or Changed", severity:"low",
    causes:["Reduced VS feed rate — less substrate for methanogens","Feed sludge composition shift reducing biodegradable fraction","Primary sludge reduced due to primary clarifier bypass or low primary production"],
    actions:["Verify VS loading rate from current feed data — compare to design and recent baseline","If VS loading has genuinely dropped, gas production will proportionally decrease (this is normal)","Monitor VFA/Alkalinity ratio — should remain below 0.3 for stable digestion","Check gas meter, piping, and collection system for leaks if loading appears unchanged"],
    note:"Gas production scales with VS loading. A 20% reduction in VS feed will produce roughly a 20% reduction in gas output. Benchmark: ~15–17 SCF of biogas per pound of VS destroyed.", sop:null },

  dig_gas_temp: { title:"Low Digester Gas Production — Temperature Drop", severity:"moderate",
    causes:["Digester temperature below optimal mesophilic range (~95–99°F)","Heat exchanger fouled or not functioning","Boiler or hot water system failure","Cold weather increasing heat loss through digester walls"],
    actions:["Verify digester temperature with independent thermometer — confirm SCADA reading is accurate","Check heat exchanger operation — verify hot water flow through sludge heat exchanger","Inspect boiler or hot water system for faults","Increase heat exchanger setpoint if system allows","Insulate sludge piping if significant heat loss is occurring"],
    note:"Mesophilic digester organisms are sensitive to temperature. A drop from 99°F to 85°F can reduce methane production by 30–50%. Temperature stability is more important than absolute temperature.", sop:null },

  dig_gas_biology: { title:"Low Digester Gas Production — Biological Issue", severity:"moderate",
    causes:["Gradual accumulation of inhibitory compounds (ammonia, sulfide, heavy metals)","Methanogen population declining from previous upset","Long-term VFA accumulation suppressing methanogens"],
    actions:["Check VFA/Alkalinity ratio — above 0.4 indicates stress; above 0.6 is a warning sign","Measure free ammonia — above 300–400 mg/L begins inhibiting methanogens","Reduce VS loading rate temporarily to allow biology to stabilize","Test for heavy metals in feed sludge if industrial sources are present","Consider adding alkalinity (sodium bicarbonate) to buffer pH and support methanogens"],
    note:"Biological causes of low gas production are harder to diagnose and slower to correct than temperature or loading causes. Patience and stable, conservative operation are required.", sop:null },

  dig_souring: { title:"Digester Souring (VFA Accumulation / Low pH)", severity:"high",
    causes:["Overloading with high-strength or rapidly biodegradable waste","Temperature fluctuation disrupting methanogens","Inhibitory compounds in feed sludge (ammonia, sulfide, heavy metals)","Sudden large increase in VS loading"],
    actions:["Stop or drastically reduce feed until pH recovers above 6.8","Add sodium bicarbonate to raise alkalinity and buffer pH — start with 50–100 mg/L per day","Do NOT add NaOH — it will cause pH overshoot and make things worse","Check VFA/Alkalinity ratio — target below 0.3 for stable digestion","Notify supervisor — consider laboratory analysis of VFAs, alkalinity, and ammonia"],
    note:"A fully soured digester can take weeks to months to restore. Methanogens grow very slowly. Prevention through stable, consistent loading is far easier than recovery.", sop:null },

  dig_early_upset: { title:"Digester Early Upset Signs — pH in Range but Other Indicators Off", severity:"moderate",
    causes:["Rising VFA/Alkalinity ratio despite normal pH — early warning of souring","Gas composition changing — CO2 fraction increasing relative to methane","Foam developing in headspace","Feed composition change introducing unusual substrate"],
    actions:["Measure VFA/Alkalinity ratio — if above 0.3, reduce feed rate proactively","Review gas composition if analyzer available — methane below 60% indicates stress","Check for recent feed changes — new waste streams or significant loading increase","Reduce VS loading by 20–30% until indicators normalize","Increase monitoring frequency — daily VFA/Alk during this period"],
    note:"Early intervention when VFA/Alk is 0.3–0.5 is far easier than responding to a fully soured digester at pH 6.5. Treat rising VFA/Alk seriously even when pH looks normal.", sop:null },

  dig_high_ph: { title:"Digester Elevated pH / Ammonia Inhibition", severity:"moderate",
    causes:["High protein sludge feed producing excess free ammonia","Free ammonia inhibiting methanogens above pH 7.6","Co-digestion with high-protein food waste or industrial sludge"],
    actions:["Review feed sludge — high protein sources include food scraps, meat processing, dairy","Reduce feed rate temporarily to allow system to stabilize","Consider diluting feed to reduce ammonia concentration","At elevated pH, free ammonia inhibition is more severe — lower pH target if possible"],
    note:"Free ammonia inhibition is common in co-digestion systems receiving high-protein wastes. It gets worse at higher temperatures, which is counterintuitive for digester optimization.", sop:null },

  dig_temp_low: { title:"Digester Temperature Falling Below Setpoint", severity:"moderate",
    causes:["Heat exchanger performance declining — fouling or scaling","Boiler or hot water system fault","Increased heat demand from cold weather with insufficient heating capacity","Sludge feed temperature very cold — diluting digester temperature"],
    actions:["Verify heat exchanger inlet and outlet temperatures — calculate heat transfer efficiency","Check boiler or hot water system status — is it maintaining setpoint?","Inspect heat exchanger for scaling or fouling — schedule descaling if needed","Reduce sludge feed rate temporarily to reduce thermal load while heating system is assessed"],
    note:"Temperature stability matters more than absolute temperature. Swings of ±5°F can stress methanogen populations more than a steady 90°F operation.", sop:null },

  dig_temp_high: { title:"Digester Temperature Rising Above Setpoint", severity:"moderate",
    causes:["Heat exchanger control valve failed open — excessive heat input","Temperature sensor failure — reporting low, causing system to over-heat","Sludge feed temperature very high — industrial thermal discharge"],
    actions:["Check heat exchanger control valve operation — verify it modulates correctly","Compare digester temperature to independent thermometer — confirm reading accuracy","Investigate hot sludge feed — check for industrial thermal discharge upstream","If temperature exceeds 105°F, reduce heating immediately — thermophiles may begin to dominate"],
    note:"Mesophilic organisms are stressed above 104°F. A brief excursion is not catastrophic, but sustained elevated temperature will shift the microbial community and can cause operational instability.", sop:null },

  dig_mix_fault: { title:"Digester Mixing Pump Stopped or Faulted", severity:"high",
    causes:["Mixing pump motor fault or overload trip","Pump impeller plugged with stringy solids or rags","Control fault — pump not receiving run signal","Pump isolation valve accidentally closed"],
    actions:["Check mixing pump motor and control panel for fault codes","Verify pump isolation valve is open","If pump is plugged, implement lockout/tagout and clear obstruction","Switch to backup mixing pump if available","Stratification will develop within 24–48 hours without mixing — monitor gas production and temperature distribution"],
    note:"Anaerobic digesters can tolerate brief mixing interruptions (hours) but extended periods without mixing lead to scum layer formation, temperature stratification, and reduced gas production.", sop:null },

  dig_mix_stratification: { title:"Digester Mixing Ineffective — Stratification Developing", severity:"moderate",
    causes:["Mixer running but impeller worn — insufficient flow velocity","Feed point and mixing pump discharge not coordinated — dead zones forming","Scum layer thick enough to resist mixing","Mixer duty cycle set too short — not mixing long enough per interval"],
    actions:["Increase mixing pump runtime per cycle","Check impeller for wear — reduced impeller diameter dramatically reduces mixing effectiveness","Inspect for thick scum layer on digester surface — this indicates stratification","Consider revising mixer duty cycle — longer runs at higher frequency","Review feed point location relative to mixer discharge"],
    note:"Stratification is often visible as a thick scum crust on the digester surface, temperature differences between top and bottom, and reduced gas production from the top zone.", sop:null },

  dig_foam_load: { title:"Digester Foaming — Feed Overload or New Substrate", severity:"high",
    causes:["Rapid increase in feed causing foam precursor buildup","New co-digestion substrate with high foam potential (food waste, grease)","Overloading producing excess VFAs that destabilize surface tension"],
    actions:["Immediately reduce or halt problem feed","Add defoamer to digester if available","Ensure gas system is not at risk of foam blockage — check condensate traps","Reduce loading rate and stabilize before resuming full feed"],
    note:"Digester foaming can block gas piping, pressure relief valves, and flow meters. It can become dangerous quickly. Do not ignore.", sop:null },

  dig_foam_filaments: { title:"Digester Foaming — Filamentous Organisms", severity:"moderate",
    causes:["Nocardia or Microthrix filaments from aeration basin carried into digester","Filamentous organisms stabilizing foam at digester surface","Long SRT in digestion system accumulating foam-producing organisms"],
    actions:["Address filamentous organism problem in aeration basin (primary source)","Add defoamer to digester surface","Reduce surface foam accumulation through mechanical means if possible","Do not recirculate foam back to plant — dispose of separately"],
    note:"Digester foam from filaments is directly connected to the aeration basin biology. Fixing the upstream biological process is the only lasting solution.", sop:null },

  dig_flow_standby: { title:"Digester Near-Zero Flow — Standby or Holding Mode", severity:"low",
    causes:["Digester intentionally in standby — not in active feed rotation","Feed pump to this digester closed per operational plan","Digester 3 (polishing digester) receiving flow from Digester 2 rather than direct feed"],
    actions:["Confirm operational intent — verify this digester is supposed to be in standby","If standby is unintended, check feed pump status and valve positions","For Digester 3: verify transfer from Digester 2 is active if it should be receiving sludge"],
    note:"Negative flow readings of -5 to +5 GPM with pump off are typically meter noise or drift, not actual reverse flow. Verify pump status before troubleshooting the reading.", sop:null },

  dig_flow_meter: { title:"Digester Flow Meter Showing Zero/Negative While Pump Running", severity:"moderate",
    causes:["Flow meter air lock — gas bubble in sensor preventing accurate reading","Flow meter calibration drift","Reverse flow meter installation or wiring"],
    actions:["Verify pump is actually pumping — check discharge pressure and motor amps","Purge air from flow meter if accessible — air locks are common in sludge service","Check flow meter zero calibration — drift toward negative is a known issue with some meters","Compare meter reading to manual flow calculation if possible"],
    note:"Flow meters on digester feed lines are often magnetic flowmeters (mag meters). These are affected by air entrainment, low conductivity, and coating of the electrodes. Regular verification against a manual benchmark improves reliability.", sop:null },

  /* ── SOLIDS TRAIN: GAS SYSTEM ─────────────────────────────── */
  gas_flare_expected: { title:"High Flare Flow — Expected from Operational Change", severity:"low",
    causes:["Increased VS loading period producing more biogas","Digester feed schedule change routing gas to flare before gas utilization can capture","Post-upset gas surge as digester stabilizes"],
    actions:["Document gas production rate and VS loading relationship — confirm it is proportional","Verify gas utilization systems (boilers, generators) are operating at capacity","If gas utilization is at capacity, flaring is the only option — monitor flare operation","Review whether gas utilization capacity can be increased or waste heat recovered"],
    note:"The flare is a safety device, not a primary gas disposition method. Chronic high flare flow indicates gas utilization capacity is insufficient for current production.", sop:null },

  gas_flare_unexpected: { title:"High Flare Flow — Unexpected Increase", severity:"moderate",
    causes:["Gas utilization equipment (boiler, generator) offline — all gas routed to flare","Gas pressure building due to partial blockage between digesters and utilization","Sudden increase in digester gas production from loading surge"],
    actions:["Check gas utilization equipment status — boiler or cogeneration system may be offline","Inspect gas piping for partial blockages or closed valves","Verify gas pressure in system is within normal range","If gas utilization can't be restored, ensure flare is operating properly — do not allow uncontrolled gas release"],
    note:"Unexpected high flare flow can indicate gas utilization failure. Flaring is safe but wastes energy. Identify and resolve the cause promptly.", sop:null },

  gas_cond_flow: { title:"Gas Conditioning Flow Dropping", severity:"moderate",
    causes:["Condensate knockout pot full — restricting gas flow","Gas conditioning equipment (chiller, dryer) fault","Partial blockage in gas conditioning piping from condensate or solids"],
    actions:["Check and drain condensate knockout pots — overfilled pots restrict flow","Inspect gas conditioning equipment status — chiller, refrigerated dryer, or desiccant system","Check gas piping between digesters and conditioning unit for liquid accumulation","Verify gas pressure drop across conditioning system — excessive drop indicates obstruction"],
    note:"Gas conditioning flow affects the ability to use biogas in boilers or cogeneration. Low conditioning flow with adequate digester gas production points to a conditioning system issue rather than a digester problem.", sop:null },

  gas_cond_quality: { title:"H2S or Moisture in Conditioned Gas", severity:"moderate",
    causes:["H2S scrubber media exhausted — not removing H2S effectively","Moisture separator not removing water — condensate carryover","Bypass around conditioning equipment — raw gas entering utilization system"],
    actions:["Check H2S scrubber media condition — replace if at end of life","Verify moisture separator and condensate drain are operating","Check for bypass valves in open position routing raw gas around conditioning","Monitor H2S concentration in conditioned gas with portable sensor or fixed analyzer"],
    note:"H2S above 100 ppm in combustion gas significantly shortens boiler and engine life. High moisture causes corrosion in utilization equipment. Both issues require prompt attention.", sop:null },

  gas_cond_pressure: { title:"Gas System Pressure Issue", severity:"moderate",
    causes:["Digester producing more gas than utilization and flare capacity — pressure building","Gas leak reducing system pressure","Pressure relief valve opening — high pressure event","Pressure control valve malfunction"],
    actions:["Check flare is operational and able to accept excess gas","Inspect gas piping and fittings for leaks — soapy water test on accessible fittings","Verify pressure relief valve is not stuck open — compare system pressure to relief setting","Check pressure control valve operation and setpoint"],
    note:"Gas system pressure should be maintained within the design range for the digester covers and utilization equipment. Both high and low pressure events require investigation.", sop:null },

  /* ── SOLIDS TRAIN: PHOSPHORUS PRECIPITATION ──────────────── */
  phos_blower_fault: { title:"Phos Precip Blower Stopped or Faulted", severity:"high",
    causes:["Blower motor fault or overload trip","Blower air line blocked or kinked","Control system fault preventing blower start","Blower overheating from continuous operation"],
    actions:["Check blower control panel for fault codes","Inspect air supply line from blower to reactor for blockages or damage","Verify power supply and control signal to blower","If blower is overheating, check for blocked air inlet or insufficient cooling","Without blower, struvite or calcium phosphate precipitation rate drops — monitor effluent phosphorus"],
    note:"The phos precip reactor blower provides CO2 stripping and mixing. Without it, pH will not rise adequately for precipitation and phosphorus removal will be impaired.", sop:null },

  phos_ph_chemical: { title:"Phos Precip pH Off — Chemical Feed Issue", severity:"moderate",
    causes:["Caustic (NaOH) or lime dose insufficient to reach target pH (~9.1)","Chemical feed pump calibration drift or partial failure","CO2 in influent higher than expected — more base required than normal","pH sensor fouled — reading lower than actual"],
    actions:["Calibrate or verify pH sensor with buffer solution before adjusting chemical dose","If sensor is accurate, increase caustic dose incrementally to reach setpoint","Check chemical feed pump output — verify it is delivering correct volume","Inspect chemical storage tank level — low caustic concentration from dilution or old stock"],
    note:"Always verify pH sensor accuracy before increasing chemical dose. A fouled or drifted pH sensor is a common cause of apparent pH control failure. Sensor maintenance is the first diagnostic step.", sop:null },

  phos_influent_low: { title:"Phos Precip Influent Flow Low — Digester 3 Not Feeding Adequately", severity:"moderate",
    causes:["Digester 3 level low — insufficient sludge to generate adequate centrate/overflow for phos precip","Transfer pump from Digester 2 to Digester 3 not running","Digester 3 in standby or holding mode"],
    actions:["Check Digester 3 level on SCADA — verify it is receiving adequate feed","Verify transfer pump from Digester 2 is operating and delivering flow","If Digester 3 is in standby, confirm this is intentional and adjust phos precip operation accordingly","Monitor phos precip influent flow meter — confirm reading is accurate"],
    note:"Phos precip performance depends on adequate flow of phosphorus-rich centrate or digester overflow. Low influent flow reduces both reaction time and phosphorus mass removal.", sop:null },

  phos_underflow_pump: { title:"Phos Precip Underflow Pump Issue — Precipitate Not Removing", severity:"moderate",
    causes:["Underflow pump not running — precipitate accumulating in reactor","Underflow line plugged with dense struvite or calcium phosphate solids","Pump suction at wrong elevation — not drawing from settled solids zone"],
    actions:["Check underflow pump status — verify motor and control are operational","Inspect underflow line for precipitate plugging — flush with water under pressure if blocked","Verify pump suction location is at the bottom of the reactor where precipitate settles","Increase pump frequency if precipitate is accumulating faster than current schedule removes it"],
    note:"Dense phosphorus precipitate (struvite, calcium phosphate) will plug underflow lines if not removed regularly. A plugged underflow line fills the reactor with solids and dramatically reduces residence time.", sop:null },

  phos_precip_pump: { title:"Phos Precip Feed/Recirculation Pump Fault", severity:"high",
    causes:["Pump motor fault","Pump impeller plugged with precipitate solids","Control system fault preventing pump start","Isolation valve inadvertently closed"],
    actions:["Check pump control panel for faults","Verify all isolation valves in pump flow path are open","Implement lockout/tagout if pump must be cleared manually — precipitate can be very dense and abrasive","Switch to standby pump if available","Without recirculation, reactor mixing and reaction kinetics will be impaired"],
    note:"Phos precip pumps handle dense, abrasive slurry. Impeller wear is common and should be tracked with periodic flow measurements. Worn impellers that deliver reduced flow still appear to 'run' but don't provide adequate mixing.", sop:null },

  /* ── SOLIDS TRAIN: CENTRIFUGE ─────────────────────────────── */
  cent_polymer: { title:"Centrifuge Poor Cake Solids — Polymer Issue", severity:"moderate",
    causes:["Wrong polymer type for current digested sludge characteristics","Polymer dose too low for feed solids concentration","Polymer dilution water flow incorrect — affecting conditioning"],
    actions:["Perform bench jar test with current polymer at varying doses","Test alternative polymer products designed for digested sludge","Verify polymer dilution water flow rate — too much dilution reduces contact time","Check polymer injection point — must be upstream of feed pump to allow adequate mixing"],
    note:"Digested sludge dewatering is more polymer-demanding than primary sludge. A polymer that works well on primary may perform poorly on mixed or WAS-only digested sludge.", sop:null },

  cent_feed_quality: { title:"Centrifuge Poor Performance — Feed Quality Change", severity:"moderate",
    causes:["Digested sludge more dilute than normal — lower feed TSS","VS content or biodegradation different from baseline","Feed temperature lower — cold digested sludge dewaters less well"],
    actions:["Measure feed TSS and VS — compare to recent baseline","If feed is very dilute, reduce feed flow rate to increase polymer-to-solids ratio","Increase polymer dose to compensate for changing feed characteristics","Check digester performance — poor digestion produces harder-to-dewater sludge"],
    note:"Centrifuge performance is highly sensitive to feed consistency. Track feed TSS and VS weekly as process indicators. Sudden changes in feed quality are often the first sign of a digester issue.", sop:null },

  cent_mechanical: { title:"Centrifuge Poor Performance — Mechanical Issue", severity:"moderate",
    causes:["Differential speed (scroll speed relative to bowl) out of optimal range","Bowl speed below setpoint","Internal wear — scroll flights or bowl liner damaged"],
    actions:["Check bowl speed and differential speed settings — compare to baseline operating parameters","Verify centrifuge is not running in reduced-speed mode for any reason","Schedule internal inspection if performance decline is gradual — may indicate scroll or bowl wear","Contact manufacturer if optimizing settings does not restore performance"],
    note:"Centrifuge performance degrades gradually as internal components wear. Tracking cake solids trending over time (not just current reading) gives early warning of wear before it becomes a cake quality problem.", sop:null },

  cent_load_planned: { title:"Centrifuge Low Load — Single Unit Intentional Operation", severity:"low",
    causes:["Current production requires only one centrifuge","Other units on standby or in maintenance","Planned operation to reduce polymer costs during low-loading period"],
    actions:["Verify that production (dewatered cake volume) is adequate for dryer feed","Confirm DSS storage levels are being maintained — single-unit operation must keep up with dryer demand","Document reason for reduced centrifuge operation in operating log"],
    note:"Running fewer centrifuge units is operationally normal during low solids production periods. The key check is whether DSS levels are stable — if DSS is dropping, single-unit operation may not be sufficient.", sop:null },

  cent_load_fault: { title:"Centrifuge Units Not Running — Unplanned", severity:"high",
    causes:["Centrifuge fault — vibration alarm, bearing temperature, or drive fault","Feed pump failure — centrifuge can't receive feed","Control system issue preventing start"],
    actions:["Check centrifuge control panel for active faults — document fault codes before resetting","If vibration or bearing fault: do not restart without maintenance inspection","Check feed pump status — if feed pump is faulted, centrifuge cannot run","Notify supervisor — dryer feed will be interrupted and DSS levels will drop"],
    note:"Centrifuge vibration and bearing alarms should never be ignored or reset without investigation. Running through a vibration alarm risks catastrophic bearing failure and extended downtime.", sop:null },

  cent_vibe_mechanical: { title:"Centrifuge Vibration — Mechanical Issue (Noise Present)", severity:"high",
    causes:["Bearing failure — worn or damaged bowl or scroll bearings","Scroll contact with bowl — internal misalignment or wear","Hard debris (grit, metal) entering centrifuge and damaging internals","Imbalance from scroll wear or internal solids buildup"],
    actions:["Shut down centrifuge immediately — grinding or knocking sounds indicate mechanical damage risk","Do not restart without maintenance inspection","Notify centrifuge maintenance — internal inspection required before return to service","Document the noise description and onset time for maintenance","Prepare for potential extended outage — shift dewatering schedule to other units if available"],
    note:"A centrifuge making grinding or knocking sounds has an internal mechanical problem. Running through it risks catastrophic bowl failure, which can be both dangerous and extremely expensive to repair.", sop:null },

  cent_vibe_imbalance: { title:"Centrifuge Vibration — Imbalance (No Unusual Noise)", severity:"moderate",
    causes:["Uneven solids distribution in bowl — localized buildup causing imbalance","Bowl speed above balanced operating range for current feed","Vibration sensor drift — alarming at normal vibration level"],
    actions:["Verify vibration sensor reading with portable vibration meter if available","Run centrifuge through a cleaning cycle — flush with water to remove any build-up","Reduce bowl speed slightly and monitor vibration level response","If cleaning and speed adjustment don't resolve, schedule inspection"],
    note:"Minor vibration increases are common in centrifuge service and can result from feed variability. Steady increases over days indicate real imbalance that requires attention before it becomes a mechanical problem.", sop:null },

  cent_centrate_tss: { title:"Centrifuge Centrate — High TSS, Poor Solids Capture", severity:"moderate",
    causes:["Polymer dose insufficient — fine solids not captured","Differential speed too high — scroll moving solids out of bowl too quickly","Bowl speed too low — insufficient centrifugal force for separation"],
    actions:["Increase polymer dose — monitor centrate clarity as leading indicator","Reduce differential speed slightly — slower scroll speed gives more residence time in bowl","Verify bowl speed is at or above minimum design speed","Check feed TSS — if very high, the centrifuge may be overloaded"],
    note:"Centrate TSS directly loads the ANAMMOX system with additional ammonia and solids. High centrate TSS from poor capture increases ANAMMOX hydraulic and solids loading simultaneously.", sop:null },

  cent_centrate_ammonia: { title:"Centrifuge Centrate — High Ammonia to ANAMMOX", severity:"low",
    causes:["High ammonia in digested sludge — expected from protein breakdown during digestion","Digestion process releasing more ammonia than previous baseline","Feed sludge protein content increased"],
    actions:["Verify ammonia concentration in centrate is above normal baseline — confirm this is a change","Check digester performance — higher VS destruction often correlates with higher ammonia release","Review ANAMMOX reactor capacity relative to current centrate ammonia load","Notify ANAMMOX operators of increased ammonia load — they may need to adjust DO setpoints"],
    note:"Some centrate ammonia is expected and normal — it is why the ANAMMOX system exists. The concern is when ammonia exceeds ANAMMOX design capacity. Track centrate ammonia monthly as a key performance indicator.", sop:null },

  /* ── SOLIDS TRAIN: DRYERS ─────────────────────────────────── */
  dryer_screw_mcc: { title:"Dryer Discharge Screw MCC / Electrical Fault", severity:"high",
    causes:["MCC communication loss between dryer control system and screw drive MCC","Power supply fault to screw drive panel","VFD fault on screw drive motor","Control wiring fault or damaged signal cable"],
    actions:["Check MCC panel for fault indicators — document fault code before resetting","Verify power supply to MCC panel is present","Check VFD display if equipped — VFD faults often provide specific diagnostic codes","Notify electrical maintenance — MCC faults require qualified technician","Without discharge screw, dried product will back up in dryer and trip the unit on high level"],
    note:"An MCC comm fault may be a communication issue rather than an actual motor fault. Verify physical screw operation before assuming mechanical failure. Comm faults can sometimes be cleared by cycling power to the communication module.", sop:null },

  dryer_screw_jam: { title:"Dryer Discharge Screw Mechanically Jammed", severity:"high",
    causes:["Dried product cake buildup plugging screw housing","Hard debris (grit, hardware) entering drying system and lodging in screw","Screw flight contact with housing from wear or thermal expansion"],
    actions:["Stop dryer feed immediately — do not continue feeding cake into a jammed discharge","Implement lockout/tagout before any manual intervention","Inspect screw housing clean-out access for the jam location","Clear jam manually or with water flush — dried product is friable and usually can be broken up","Inspect screw for damage — replace or repair before returning to service"],
    note:"Dried biosolids in the screw are hot (150–200°F) and can be a burn hazard. Allow adequate cooling before manual intervention. Wear appropriate PPE including heat-resistant gloves.", sop:null },

  dryer_silo_high: { title:"Dryer Silo Level High — Product Not Being Removed", severity:"moderate",
    causes:["Biosolids hauler not picking up product on schedule","Silo discharge auger fault preventing removal","Land application or distribution site unavailable","High production period exceeding normal pickup schedule"],
    actions:["Contact biosolids hauler to arrange additional pickups","Check silo discharge auger/conveyor for faults if product is not flowing","If silo approaches capacity, reduce dryer feed rate or prepare to halt operations","Coordinate with biosolids management program for emergency disposal options if needed"],
    note:"Running the silo to capacity and then halting dryer operations disrupts the entire solids dewatering train. Proactive hauling schedule management prevents this situation.", sop:null },

  dryer_silo_low: { title:"Dryer Silo Level Low — Dryer Production Insufficient", severity:"moderate",
    causes:["Centrifuge dewatered cake production insufficient to feed dryer at design rate","Dryer running below capacity due to maintenance or operational adjustment","DSS level low — insufficient cake stored to maintain dryer feed"],
    actions:["Check DSS storage levels — if DSS is low, the root cause is upstream (centrifuge or GBT)","Verify dryer feed conveyor is operating and delivering cake","Confirm centrifuge is running and producing adequate cake for dryer feed","Adjust dryer feed rate to match available cake supply — do not run dryer starved"],
    note:"Dryers should not be run with insufficient feed — low feed rates cause product to over-dry, increasing fire risk in some dryer designs. Match dryer throughput to available cake supply.", sop:null },

  dryer_class_fecal: { title:"Dryer — Fecal Coliform Sample Concern / Class A Risk", severity:"high",
    causes:["Dryer outlet temperature insufficient for required time at temperature","Product contamination after drying — recontamination from wet surfaces or poor hygiene","Sampling or analysis error — contaminated sample"],
    actions:["Verify dryer outlet temperature and residence time meet Class A requirements (70°C for 30 min, or equivalent)","Review temperature recorder logs for the period before the suspect sample","Check for recontamination sources — wet conveyor surfaces, leaking connections after dryer","If Class A cannot be confirmed, product must be handled as Class B until resampling confirms compliance","Notify regulatory agency per permit requirements if Class A requirements are not being met"],
    note:"Class A biosolids require demonstrated pathogen reduction. If a sample fails, the product from that run must be reclassified as Class B and managed accordingly. Do not blend failing product with confirmed Class A material.", sop:null },

  dryer_class_temp: { title:"Dryer — Temperature or Residence Time Not Meeting Class A Criteria", severity:"high",
    causes:["Dryer outlet temperature below design setpoint","Feed rate too high — product moving through dryer too fast for adequate residence time","Dryer heating system (steam, hot oil) underperforming"],
    actions:["Reduce dryer feed rate to increase residence time — product must meet time-at-temperature criteria","Verify heating system is delivering design heat input","Review dryer O&M manual for Class A compliance verification requirements","Document all temperature readings and feed rates for regulatory records","Do not market or land-apply product as Class A until temperature and time criteria are confirmed"],
    note:"Class A designation requires both a specific time AND temperature combination. Meeting temperature alone is not sufficient — residence time must also be demonstrated. Know your permit requirements.", sop:null },

  dryer_cooling_pump: { title:"Dryer Cooling Water Pump Stopped or Faulted", severity:"high",
    causes:["Cooling pump motor fault or overload trip","Cooling water supply line blocked or isolation valve closed","Pump impeller clogged with debris"],
    actions:["Check cooling pump control panel for fault codes","Verify cooling water supply isolation valve is open","Switch to standby cooling pump if available","If cooling cannot be restored, reduce dryer operating temperature or shut down to prevent overheating of bearings and seals","Contact maintenance — cooling pump restoration is urgent"],
    note:"Dryers generate significant heat and require continuous cooling water for bearings, seals, and product cooling. Loss of cooling can cause rapid temperature rise in critical components and should be treated as an urgent mechanical priority.", sop:null },

  dryer_cooling_flow: { title:"Dryer Cooling Water Inadequate — Temperature Still Elevated", severity:"moderate",
    causes:["Cooling water flow rate below design — partially blocked supply line","Cooling water temperature too high — inadequate heat rejection","Cooling tower or heat exchanger upstream not performing"],
    actions:["Measure actual cooling water flow rate — compare to design specification","Check cooling water supply temperature — if too high, upstream cooling system needs attention","Inspect supply piping for partial blockages or scale buildup","Reduce dryer operating load until cooling system can be assessed and repaired"],
    note:"Cooling water temperature matters as much as flow rate. A high cooling water supply temperature provides inadequate heat removal regardless of flow. Check both parameters.", sop:null },

  /* ── SOLIDS TRAIN: ANAMMOX ────────────────────────────────── */
  anammox_do_high: { title:"ANAMMOX — DO Too High, Suppressing Activity", severity:"high",
    causes:["Blower or aeration control providing too much air — DO above 0.5 mg/L in anoxic zones","DO control loop not responding — blower running at fixed speed","Centrate feed temperature too low — reducing biological activity and appearing similar to DO suppression"],
    actions:["Reduce aeration rate — target DO of 0.2–0.5 mg/L in ANAMMOX reactors (very low, partially anoxic)","Verify DO sensor calibration — membrane fouling can cause false high readings","Check DO control loop setpoint and response — may need retuning","If DO cannot be controlled to setpoint, contact process engineer — ANAMMOX process requires very precise DO management"],
    note:"ANAMMOX organisms are extremely sensitive to DO. Even 1–2 mg/L of DO can suppress activity significantly. DO control for ANAMMOX is much more precise than for conventional activated sludge.", sop:null },

  anammox_do_low: { title:"ANAMMOX — DO Too Low, Insufficient Nitrite Production", severity:"moderate",
    causes:["Aeration rate too low — insufficient partial nitritation to produce nitrite for ANAMMOX","DO sensor fouled — reading high when actual DO is lower","Ammonia loading too high for current aeration rate"],
    actions:["Increase aeration rate slightly — target DO at the lower end of the design range","Calibrate DO sensor — compare to portable meter reading in the reactor","Monitor effluent nitrite and ammonia — insufficient nitrite means ANAMMOX has inadequate substrate","Check ammonia loading to ANAMMOX from centrate — high loading may require more aeration"],
    note:"ANAMMOX requires partial nitritation (AOB converting ~55% of ammonia to nitrite) before ANAMMOX organisms can complete nitrogen removal. Without adequate nitrite production, ANAMMOX efficiency drops regardless of ANAMMOX organism health.", sop:null },

  anammox_inhibition: { title:"ANAMMOX — DO in Range but Performance Still Poor", severity:"high",
    causes:["Inhibitory compounds in centrate — heavy metals, antibiotics, industrial chemicals","Free ammonia or free nitrous acid inhibition at elevated concentration","ANAMMOX biomass washout from previous upset or aggressive backwash","Temperature outside optimal range despite appearing within spec"],
    actions:["Review centrate composition — test for heavy metals if industrial sludge is in the digester feed","Check free ammonia and free nitrous acid levels — both can inhibit ANAMMOX at elevated pH/low pH respectively","Verify temperature at multiple points in reactor — sensor may not reflect actual temperature distribution","If washout is suspected, reduce hydraulic loading and allow biomass to recover — ANAMMOX grows very slowly (doubling time ~11 days)"],
    note:"ANAMMOX biomass recovery after inhibition or washout takes weeks to months. Patience and stable, conservative operation are required. Do not overcorrect while the system is stressed.", sop:null },

  anammox_temp_low: { title:"ANAMMOX Temperature Falling — Heat Loss or Cold Centrate", severity:"moderate",
    causes:["Centrate temperature lower than normal — digesters running cool","Inadequate insulation on reactor or piping in cold weather","Heat exchanger on centrate feed not operational"],
    actions:["Check centrate temperature — if cold, address digester temperature issue first","Verify heat exchanger on centrate pre-heating is operating if equipped","Inspect reactor insulation for damage during cold weather","ANAMMOX optimal temperature is 30–37°C (86–99°F) — performance drops sharply below 25°C"],
    note:"ANAMMOX organisms are more temperature-sensitive than conventional nitrifiers. Activity can decrease 50% when temperature drops from 35°C to 25°C. Cold weather operation requires careful attention to centrate preheat.", sop:null },

  anammox_temp_high: { title:"ANAMMOX Temperature Rising — Overheating Risk", severity:"moderate",
    causes:["Centrate temperature very high — digesters running hot","Heat exchanger set point too aggressive","Lack of cooling water to reactor during hot weather"],
    actions:["Check centrate temperature at feed point — reduce digester temperature if excessively high","Reduce heat exchanger output — lower centrate preheat temperature","Ensure cooling water is available during very hot weather","ANAMMOX organisms begin to be inhibited above 40°C — monitor closely"],
    note:"ANAMMOX organisms are killed at sustained temperatures above 45°C. Process upsets from overheating are difficult to recover from given the slow growth rate of ANAMMOX. Temperature monitoring is a critical control parameter.", sop:null },

  anammox_eq_overflow: { title:"ANAMMOX EQ Tanks Both Rising — Capacity Exceeded", severity:"high",
    causes:["Centrate volume from centrifuges exceeding ANAMMOX hydraulic capacity","ANAMMOX reactor offline or at reduced capacity","Feed pump to ANAMMOX reactor faulted"],
    actions:["Check ANAMMOX reactor status — is it receiving feed at design rate?","Verify feed pumps from EQ tanks to ANAMMOX are operating","If ANAMMOX is at design capacity, consider reducing centrifuge throughput to match","If EQ tanks approach overflow, divert centrate to plant headworks — notify process operators of ammonia surge loading"],
    note:"Centrate routed to plant headworks carries very high ammonia that will overwhelm the secondary biological system if not anticipated. Proactive communication with biological process operators is critical.", sop:null },

  anammox_eq_pump: { title:"ANAMMOX EQ — Single Tank Rising, Pump or Routing Issue", severity:"moderate",
    causes:["Centrate pump from one centrifuge not routing to the correct EQ tank","EQ tank level sensor fault causing incorrect fill logic","Centrate pump from one EQ tank to ANAMMOX faulted — other tank filling"],
    actions:["Check which centrifuge is discharging centrate and verify its routing valve position","Inspect EQ tank level sensors — verify they match actual visible levels","Check ANAMMOX feed pumps from each EQ tank — verify both are operating if both tanks have inventory","Manually balance flow between EQ tanks if possible while pump or routing issue is investigated"],
    note:"EQ tank routing issues are often valve position or control logic problems rather than pump failures. Verify physical valve positions against SCADA display — manual position and displayed position sometimes disagree.", sop:null },

  /* ── SOLIDS TRAIN: DSS ────────────────────────────────────── */
  dss_high_dryer: { title:"DSS Level High — Conveyor or Dryer Issue Stopping Cake Flow", severity:"high",
    causes:["Dryer discharge screw fault — cake not leaving dryer, backing up to DSS","Conveyor from DSS to dryer faulted — cake not feeding forward","Dryer offline — not consuming cake from DSS"],
    actions:["Check dryer status — is it running and accepting feed?","Check conveyor system from DSS to dryer for faults or blockages","If dryer is offline, reduce centrifuge operation to match storage capacity","As DSS approaches capacity, notify supervisor — centrifuge must be stopped if DSS is full"],
    note:"A full DSS with nowhere to put cake forces centrifuge shutdown. The chain reaction can disrupt the entire solids train. Early identification of dryer/conveyor issues prevents DSS overflow.", sop:null },

  dss_high_production: { title:"DSS Level High — Production Exceeding Dryer Capacity", severity:"moderate",
    causes:["Centrifuges producing more dewatered cake than dryers can process","Dryer running at reduced capacity due to throughput limitation","Increased VS loading to digesters producing more cake than normal"],
    actions:["Check dryer throughput — verify it is running at design capacity","If production genuinely exceeds dryer capacity, reduce centrifuge throughput to match","Review digester VS loading and dewatering production trend — may indicate a sustained increase requiring operational adjustment","Consider alternative cake disposition (land application, composting) if dryer capacity is insufficient"],
    note:"Persistent high DSS level with dryers running at capacity indicates a solids production vs. processing capacity imbalance. This is a systems-level issue requiring supervisory review.", sop:null },

  dss_pump_negative: { title:"Centrifuge Feed Pump Showing Negative Flow Reading", severity:"low",
    causes:["Flow meter air entrainment — gas bubble causing negative reading","Flow meter zero drift — instrument reading below true zero","Pump off but meter showing residual negative reading from flow reversal on shutdown"],
    actions:["Verify pump is running — check motor amp draw and speed","If pump is off, the reading is likely meter noise — document and monitor","Purge air from flow meter if possible — air in line commonly causes negative readings on mag meters","Compare actual pump output to expected based on speed setting — if mismatch, suspect meter"],
    note:"Negative flow readings on sludge feed pumps are almost always instrumentation issues, not actual reverse flow. Verify pump operation physically before troubleshooting the meter.", sop:null },

  dss_pump_low: { title:"Centrifuge Feed Pump Not Delivering Design Flow", severity:"moderate",
    causes:["Pump impeller wear — reduced flow at same speed","Feed line restriction — partial blockage or valve not fully open","Pump speed setpoint lower than needed for current centrifuge demand"],
    actions:["Check pump speed setpoint — verify it matches what centrifuge requires","Measure actual discharge flow — compare to expected at current speed","Inspect feed line for partial blockages or valve issues","If pump is at maximum speed but flow is low, suspect impeller wear — schedule inspection"],
    note:"Centrifuge feed pump flow directly controls centrifuge throughput and cake dryness. Consistent low flow produces wetter cake and higher centrate TSS.", sop:null },

  dss_pump_fault: { title:"Centrifuge Feed Pump Fault or Alarm", severity:"high",
    causes:["Pump motor fault — overload, overtemperature, or electrical fault","Pump plugged with stringy solids","VFD fault on pump drive","Level switch in DSS triggering protective shutdown"],
    actions:["Check pump control panel for specific fault code — document before resetting","Verify DSS level is within normal range — low DSS level may have triggered protective shutdown","If pump is plugged, implement lockout/tagout and clear obstruction","Switch to standby centrifuge feed pump if available","Without feed pump, centrifuge cannot operate"],
    note:"Centrifuge feed pump faults typically stop centrifuge operation within minutes due to feed starvation. Restoring feed pump service is the first priority when centrifuge throughput drops unexpectedly.", sop:null },

  /* ── DN FILTERS ───────────────────────────────────────────── */
  dnf_no_carbon: { title:"No Carbon Feed — Denitrification Stalled", severity:"high",
    causes:["Carbon feed pump failure or alarm trip","Carbon storage tank empty or supply line blocked","Control system fault stopping feed","Isolation valve closed accidentally"],
    actions:["Verify carbon feed pump status — check for faults, alarms, or manual shutoff","Inspect carbon storage tank level and supply line for blockages or leaks","Check control system — verify feed signal is reaching pump","Manually initiate carbon feed if auto-control has failed","Notify supervisor — effluent nitrate will rise rapidly without carbon","Notify regulatory agency if TN permit limit is at risk"],
    note:"Denitrification filters are entirely dependent on external carbon when treating nitrified secondary effluent. Without carbon, they become simple TSS filters within hours. Keep carbon supply well stocked.", sop:null },

  dnf_do_breakthrough: { title:"DO Breakthrough — Oxygen Suppressing Denitrification", severity:"high",
    causes:["Secondary effluent DO too high entering filter","Over-aeration in secondary treatment","Cascade aeration or splash at transfer structures","Post-aeration upstream of filter"],
    actions:["Measure DO at filter influent — target typically < 0.5 mg/L for efficient denitrification","Reduce aeration in secondary process if possible","Check for cascading or splash aeration at weirs or channels transferring flow to filters","If DO cannot be reduced, increase carbon dose to account for the oxygen demand","Consider submerged transfer piping to reduce atmospheric reaeration"],
    note:"Each mg/L of DO entering a denitrification filter consumes roughly 0.2–0.3 mg/L equivalent methanol-carbon to satisfy before denitrification can proceed. High DO is expensive and inefficient.", sop:null },

  dnf_temp_rate: { title:"Low Temperature Reducing Denitrification Rate", severity:"moderate",
    causes:["Cold water temperatures slowing denitrifying bacteria metabolism","Insufficient carbon dose at lower biological rate","Hydraulic loading too high for reduced rate at cold temperature"],
    actions:["Increase carbon dose — denitrification rate drops roughly 40–50% from 20°C to 10°C","Reduce hydraulic loading rate per filter if multiple filters are in service","Verify carbon dose is calculated against a temperature-corrected rate constant","Review permit requirements — some permits allow seasonal TN limits recognizing temperature limitations"],
    note:"Denitrification rate at 10°C may require 1.5–2x the carbon dose needed at 20°C for the same effluent quality. Temperature correction is often overlooked until the first cold-weather permit violation.", sop:null },

  dnf_underdose: { title:"Carbon Underdose — Insufficient for Nitrate Load", severity:"moderate",
    causes:["Nitrate loading to filter higher than carbon dose was designed for","Carbon:nitrogen ratio too low for complete denitrification","Flow increase diluting carbon dose per unit of nitrate","Carbon feed set on fixed dose not tracking actual NOx load"],
    actions:["Calculate actual C:N ratio — for methanol, target ~2.5–3.5 mg methanol per mg NOx-N","Verify carbon dose is flow-paced or NOx-paced — fixed dose is unreliable with variable loading","Increase carbon dose in controlled increments and monitor effluent NOx response","Check if a nitrate analyzer is available for feed-forward or feedback control"],
    note:"Flow-paced or nitrate-paced carbon dosing significantly outperforms fixed-rate dosing. If the plant has only a fixed dose, consider adding online nitrate monitoring for tighter control.", sop:null },

  dnf_carbon_methanol: { title:"Methanol Feed System Issues", severity:"high",
    causes:["Methanol pump calibration drift","Methanol line clog or air lock","Tank level sensor malfunction giving false full reading","Methanol freeze-up in cold climates","Acclimation period after restart following shutdown"],
    actions:["Verify pump output by flow totalizer or bucket test","Check methanol supply line for air locks, ice, or blockages","Inspect tank level sensor — verify with manual measurement","If system restarted after shutdown, allow 3–7 days for methanol-utilizing biomass to re-acclimate","Maintain methanol storage and lines in heated space if in cold climate"],
    note:"Methanol-utilizing bacteria are specialized and take time to acclimate. A plant that shuts down carbon feed for even a few days may take a week or more to fully restore denitrification efficiency.", sop:null },

  dnf_carbon_acetate: { title:"Acetate Feed System Issues", severity:"moderate",
    causes:["Acetate pump failure or calibration error","Acetate solution concentration varying from batch to batch","Biological slime in feed line consuming acetate before filter"],
    actions:["Verify feed pump output and calibration","Check acetate solution concentration — if diluted from liquid or mixed on-site, verify concentration","Inspect feed line for biological fouling — flush if slime is present","Acetate typically requires lower dose than methanol (~1.5–2.0 mg/mg NOx-N) — verify ratio"],
    note:"Acetate is more rapidly biodegradable than methanol and is consumed very quickly at the top of the filter bed. Overdose potential is higher and requires good control.", sop:null },

  dnf_carbon_alt: { title:"Alternative Carbon Source Feed Issues (Glycerol / Other)", severity:"moderate",
    causes:["Variable carbon content in alternative source — especially food-grade glycerol by-products","Biological acclimation to new carbon source incomplete","Incorrect dose calculation for carbon type and COD equivalent"],
    actions:["Verify COD or TOC content of carbon source — use lab analysis, not just supplier data","Recalculate dose based on actual COD:NOx ratio for current carbon source batch","Allow 1–2 weeks for biofilm acclimation if carbon source was recently changed","Consider benchmarking against methanol dose as a reference if transitioning"],
    note:"Alternative carbon sources can be cost-effective but introduce variability. Waste glycerol from biodiesel, brewery byproduct, and food processing streams can vary significantly in COD content batch to batch.", sop:null },

  dnf_bw_incomplete: { title:"Incomplete Backwash — Headloss Persisting After Wash", severity:"moderate",
    causes:["Insufficient backwash flow rate not fluidizing media adequately","Air scour not functioning or air flow too low","Biological or chemical fouling cementing media particles","Backwash duration too short"],
    actions:["Verify backwash flow rate achieves 30–50% media bed expansion (check manufacturer spec)","Inspect air scour system — verify air flow, distribution header, and nozzles","Increase backwash duration and observe headloss response","If media appears cemented, consider chemical backwash (chlorine or caustic) to break up biological binding"],
    note:"Incomplete backwash compounds over time — each cycle leaves more residual fouling. Early intervention is much easier than addressing severely fouled media beds.", sop:null },

  dnf_bw_turbidity: { title:"Extended Turbidity Spike After Backwash", severity:"moderate",
    causes:["Filter ripening period naturally long due to media type or condition","Excessive backwash intensity disturbing deeper media layers","Media fines present from new media or attrition"],
    actions:["Allow filter to ripen — some turbidity spike is normal for 10–20 minutes","If spike exceeds 30 minutes, review backwash intensity — may be too aggressive","Consider filter-to-waste period after backwash before returning to service","Check for media fines in backwash waste — may indicate media attrition"],
    note:"Many plants route filter effluent back to the head of the plant (filter-to-waste) for the first 10–15 minutes after backwash to protect effluent quality during the ripening period.", sop:null },

  dnf_bw_media_loss: { title:"Filter Media Loss During Backwash", severity:"moderate",
    causes:["Backwash rate exceeding media settling velocity — media washing out","Underdrain or backwash distribution damage creating channeling","Media attrition reducing particle size over time","Trough height set too low allowing media to overflow"],
    actions:["Reduce backwash flow rate — check that bed expansion does not exceed 50% for most media types","Inspect backwash effluent collection troughs for height and damage","Inspect underdrain for distribution blockages or damage causing uneven flow","Sample and analyze media particle size — if significant attrition, media replacement may be needed"],
    note:"Media loss is cumulative and hard to reverse without full replacement. Tracking media bed depth annually is a simple way to catch gradual attrition before it becomes a performance problem.", sop:null },

  dnf_bw_frequency: { title:"Backwash Running Too Frequently / Short Filter Runs", severity:"moderate",
    causes:["High TSS loading from secondary clarifier causing rapid headloss","Carbon overdosing creating excess biological growth in filter","Incorrect headloss trigger setpoint","Air binding causing false headloss readings"],
    actions:["Check secondary clarifier effluent TSS — reducing solids loading extends runs","Evaluate carbon dose — excess carbon drives excess biofilm growth and headloss","Verify headloss sensors are calibrated and not reading false high","Review backwash trigger setpoints — may need adjustment for current conditions"],
    note:"Filter run time is a key performance indicator. Excessively short runs (< 4–6 hours) typically indicate an upstream solids problem or carbon overdosing rather than a filter-specific issue.", sop:null },

  dnf_gas_post_bw: { title:"Gas Binding Immediately After Backwash", severity:"moderate",
    causes:["Air introduced during backwash air scour not fully purged before returning to service","Dissolved gas coming out of solution during filter return sequence","Filter head space not properly vented"],
    actions:["Ensure backwash sequence includes a water flush step after air scour to purge air before service","Slow the transition from backwash to service mode — rapid pressure change can cause gas release","Check filter vent valves are functional and open during startup","Verify backwash sequence programming — air purge step may be missing or too short"],
    note:"Most proprietary filter designs have specific recommendations for air purge sequencing. The operations manual is the first place to check if post-backwash gas binding is a recurring issue.", sop:null },

  dnf_gas_biological: { title:"Biological Gas Accumulation (N2) During Filter Run", severity:"moderate",
    causes:["N2 gas produced by denitrification accumulating in filter voids","High denitrification rate creating gas faster than it can escape","Inadequate hydraulic head suppressing gas release in pressurized filters"],
    actions:["Verify hydraulic head over filter is adequate to keep gas in solution (typically 3–5 ft minimum)","Check for sudden pressure drops in the filter that could trigger gas release","For open gravity filters, ensure adequate water depth over media bed","More frequent backwash may be needed during high-rate denitrification periods"],
    note:"Biological gas (N2) accumulation is a fundamental challenge of deep-bed denitrification. It's a sign the process is working, but uncontrolled it causes headloss and channeling. Maintaining pressure and periodic backwash are the primary controls.", sop:null },

  dnf_tss_ripening: { title:"Post-Backwash Turbidity Spike (Filter Ripening)", severity:"low",
    causes:["Normal filter ripening period — media biofilm re-establishing after backwash","Loose fines from biological floc washing through before biofilm reattaches","Filter returned to service too quickly after backwash"],
    actions:["Implement a filter-to-waste period of 10–20 minutes after backwash before returning to service","Reduce flow rate on the filter immediately after backwash to promote gentler ripening","If ripening period is excessively long (>30 min), evaluate backwash intensity"],
    note:"Some turbidity spike after backwash is expected and normal in biofilm-based denitrification filters. Filter-to-waste is the standard solution at plants with strict effluent turbidity limits.", sop:null },

  dnf_tss_breakthrough: { title:"Late-Run TSS Breakthrough", severity:"moderate",
    causes:["Filter run length too long — solids storage capacity of media exhausted","Headloss not triggering backwash early enough","Solids loading higher than filter was designed for"],
    actions:["Shorten filter run time — trigger backwash at lower headloss or fixed time limit","Review influent TSS loading versus filter design capacity","If multiple filters available, adjust rotation to reduce run time per cell"],
    note:"TSS breakthrough at end-of-run is a classic filter failure mode. The filter's solids-holding capacity has been exceeded. Shortening run length is the immediate fix.", sop:null },

  dnf_tss_continuous: { title:"Continuous Elevated TSS from Filter", severity:"high",
    causes:["Underdrain damage allowing media to pass through","Filter media severely attrited — fines passing underdrain","Biological slough from excessive or unstable biofilm","Hydraulic short-circuiting through damaged filter sections"],
    actions:["Inspect underdrain system for damage or dislodged nozzles","Sample filter effluent for media-type particles vs. biological floc","Evaluate media bed depth and particle size — compare to original specification","Take filter cell out of service for inspection if damage is suspected"],
    note:"Continuous TSS regardless of run position almost always indicates a structural issue — underdrain damage, media loss, or channeling — rather than a process control problem.", sop:null },

  dnf_hl_tss: { title:"Short Filter Runs Due to High Influent TSS", severity:"moderate",
    causes:["Secondary clarifier performance declining — higher TSS reaching filters","Biological growth or solids from bulking event passing through clarifier","Seasonal or loading increase raising secondary effluent TSS"],
    actions:["Troubleshoot secondary clarifier TSS first — see Secondary Clarifier section","Consider adding a polishing step or improving clarifier performance before filters","Temporarily increase backwash frequency to compensate","Track influent TSS to filters daily — provides early warning of clarifier problems"],
    note:"Denitrification filters are not designed to be primary TSS removal devices. Clarifier effluent TSS above 15–20 mg/L will dramatically shorten filter runs and increase backwash frequency.", sop:null },

  dnf_hl_biofilm: { title:"Rapid Headloss from Excess Biofilm Growth", severity:"moderate",
    causes:["Carbon overdosing stimulating excessive biological growth in filter","Warm temperatures accelerating biofilm development","Nutrient imbalance favoring biofilm over planktonic denitrification"],
    actions:["Reduce carbon dose — check actual effluent nitrate before cutting dose","Increase backwash frequency temporarily to control biofilm thickness","Consider periodic chlorine backwash to thin biofilm (check manufacturer guidance first)","Review C:N ratio — target ratio, not excess"],
    note:"A healthy denitrification filter biofilm is thin, dark-colored, and evenly distributed. Thick, layered slime or visible biomass mounds indicate overdosing or stagnant zones.", sop:null },

  dnf_hl_carbon: { title:"Unexplained Headloss Buildup", severity:"moderate",
    causes:["Chemical precipitation in filter (iron, calcium, phosphorus)","Filter media surface scaling from hard water or chemical addition upstream","Colloidal or non-settling particles from upstream loading"],
    actions:["Review upstream chemical addition — ferric or alum can precipitate in filter if not fully removed by clarifier","Check filter influent for elevated iron, calcium, or phosphorus","Consider acid wash backwash if scaling is suspected","Sample and examine media surface for chemical deposits"],
    note:"Chemical precipitation in filter media is irreversible with normal backwash. If ferric or alum carryover from upstream chemical P removal is reaching the filters, it will eventually cement the media.", sop:null },

  dnf_overdose_confirmed: { title:"Carbon Overdose — BOD Rising with Very Low Nitrate", severity:"high",
    causes:["Carbon dose set too high for actual nitrate load","Nitrate load decreased while carbon dose remained constant","Fixed carbon dose not tracking variable nitrate concentration"],
    actions:["Reduce carbon dose immediately — prioritize effluent BOD compliance","Verify effluent nitrate is still within permit before cutting dose significantly","Implement flow-paced or nitrate-paced carbon dosing to prevent recurrence","Monitor effluent BOD closely for 24–48 hours after adjustment","Notify supervisor and check permit BOD limits"],
    note:"Carbon overdose trades a nitrogen problem for a BOD problem. Most permits have both limits. Automated ratio-based dosing is the most reliable way to prevent overdose across varying loads.", sop:null },

  dnf_overdose_monitoring: { title:"Possible Carbon Overdose — Monitoring Gap", severity:"moderate",
    causes:["Lack of real-time effluent nitrate or BOD monitoring","Carbon dose not verified against actual nitrate removal","Fixed dose applied regardless of influent nitrate variation"],
    actions:["Install or verify online nitrate analyzer on filter effluent if not present","Run manual effluent BOD and nitrate tests to establish current operating point","Compare carbon dose rate to actual nitrate removal — calculate actual C:N ratio","Establish upper and lower dose bounds based on permit limits for both nitrate and BOD"],
    note:"Operating a carbon-fed denitrification filter without effluent nitrate monitoring is flying blind. Online sensors have become significantly more affordable — this is usually a worthwhile investment.", sop:null },

  dnf_biomass_wash: { title:"Biomass Washout After Aggressive Backwash or Shutdown", severity:"moderate",
    causes:["Overly aggressive backwash removing established denitrifying biofilm","Extended shutdown allowing biofilm to die off and slough","Chlorinated water used for backwash killing biomass"],
    actions:["Resume normal carbon feed at moderate dose — allow biofilm to re-establish","Expect 1–2 weeks for full denitrification performance to return","Do not use chlorinated water for backwash unless specifically required and followed by dechlorination","Reduce backwash intensity temporarily while biofilm recovers","Monitor effluent nitrate daily during recovery period"],
    note:"Denitrifying biofilm in a filter typically takes 1–3 weeks to fully recover after a washout event. Patience and consistent carbon feed at a moderate dose is the right approach — avoid over-correcting with very high doses.", sop:null },

  dnf_biomass_gradual: { title:"Gradual Decline in Denitrification Efficiency", severity:"moderate",
    causes:["Slow biofilm thinning from slightly too-aggressive backwash regimen over time","Inhibitory compounds in secondary effluent gradually affecting biofilm","Long-term media attrition reducing biofilm attachment surface area","Seasonal temperature effects not compensated in carbon dose"],
    actions:["Review backwash intensity and frequency — reduce slightly and monitor response","Check secondary effluent for inhibitory compounds — chlorine residual, heavy metals","Sample media for biofilm health — compare biofilm thickness to historical","Recalculate carbon dose for current temperature if seasonal adjustment was not made"],
    note:"Gradual decline in denitrification efficiency is harder to catch without consistent effluent nitrate trending. Monthly or weekly effluent nitrate averages graphed over time will reveal slow degradation early.", sop:null },

  /* ── DISINFECTION ─────────────────────────────────────────── */
  dis_uv_fouling: { title:"UV Intensity Loss — Lamp or Sleeve Fouling", severity:"moderate",
    causes:["Iron, calcium, or biological deposits on quartz sleeves reducing UV transmission","Cleaning interval too long for water quality","Automatic wiper system not functioning"],
    actions:["Clean quartz sleeves per manufacturer protocol — citric acid soak for mineral scale, mild detergent for biological film","Verify automatic wiper system is cycling correctly if equipped","Check cleaning frequency schedule — high-iron or hard water systems may need weekly cleaning","Measure UVI before and after cleaning to confirm fouling was the cause","Document baseline UVI after cleaning as a reference point"],
    note:"Sleeve fouling is the most common cause of UV dose loss. A clean sleeve can recover 20–40% of lost intensity. If UVI doesn't recover after cleaning, suspect lamp age or damage.", sop:null },

  dis_uv_lamp_age: { title:"UV Intensity Loss — Aging Lamps", severity:"moderate",
    causes:["Lamps past rated service life (typically 9,000–12,000 hours)","Lamp output declining gradually — not visible to operators without monitoring","UV sensor drift masking actual lamp output decline"],
    actions:["Check lamp hours on all lamps — compare to manufacturer rated life","Replace lamps that have exceeded rated hours","Verify UV sensor calibration — sensor drift can mask actual intensity changes","Consider replacing all lamps in a bank simultaneously to normalize output","Log lamp installation dates and hours for each position"],
    note:"UV lamps decline gradually — they rarely fail outright. A lamp at 80% of rated life may be delivering only 70–75% of original intensity. Lamp hour tracking is essential for permit compliance.", sop:null },

  dis_uv_flow_high: { title:"UV Dose Insufficient Due to High Flow Rate", severity:"high",
    causes:["Flow exceeding UV system hydraulic design capacity","Wet weather or I&I event driving excess flow through UV channels","Dose calculation not accounting for velocity/exposure time at high flows"],
    actions:["Verify actual flow rate through UV system — confirm it does not exceed rated design flow","If multiple UV channels available, bring additional channels online to distribute flow","Notify supervisor — high flow may cause permit exceedance for fecal coliform or pathogen reduction","If flow cannot be controlled, document event for regulatory reporting"],
    note:"UV dose is inversely related to flow rate — double the flow means roughly half the exposure time and dose. UV systems are sized for a maximum design flow; exceeding it compromises disinfection.", sop:null },

  dis_uv_single_lamp: { title:"Single UV Lamp Failure", severity:"low",
    causes:["Lamp end-of-life failure","Ballast or power supply fault","Lamp socket corrosion or connection failure"],
    actions:["Identify failed lamp position via system alarm or manual check","Replace failed lamp — follow lockout/tagout procedures before entering channel","Check ballast associated with failed lamp — ballast failure can cause lamp failure","Verify replacement lamp is correct model and wattage","Log replacement with date, lamp hours, and position"],
    note:"A single lamp failure in a multi-lamp system typically has minimal impact on overall dose if the system has adequate redundancy. Calculate dose with the failed lamp out to confirm compliance is maintained.", sop:null },

  dis_uv_multi_lamp: { title:"Multiple UV Lamp Failures / Bank Outage", severity:"high",
    causes:["Mass lamp end-of-life — lamps installed at same time reaching end simultaneously","Electrical supply fault affecting entire bank or module","Power surge damaging multiple ballasts"],
    actions:["Check electrical supply to affected bank — breaker, fuse, or power feed","Verify control system is not commanding bank off due to a fault signal","Calculate remaining dose with bank offline — determine if permit compliance is at risk","If compliance is at risk, notify regulatory agency immediately","Replace all lamps in affected bank — if mass aging, replace entire system proactively"],
    note:"Multiple simultaneous lamp failures almost always point to an electrical issue or mass aging. If all lamps were installed at the same time, this is predictable — proactive replacement prevents emergency situations.", sop:null },

  dis_uv_uvt_upstream: { title:"Low UVT — Upstream Process Upset Affecting UV Transmittance", severity:"high",
    causes:["Higher TSS or colloidal solids from clarifier or filter reducing UVT","Iron or other compounds from chemical addition passing through treatment","Biological upset causing effluent quality decline"],
    actions:["Measure UVT directly at UV system influent — confirm it has dropped","Identify upstream source: check clarifier TSS, filter effluent, chemical feed","Address upstream process issue to restore UVT","Increase UV power output if system allows variable intensity — compensate temporarily","Notify supervisor if dose compliance cannot be maintained"],
    note:"UVT directly determines UV penetration through the water. A drop from 65% to 55% UVT can reduce effective dose by 30% or more. Upstream water quality is just as important as lamp output.", sop:null },

  dis_uv_uvt_seasonal: { title:"Low UVT — Seasonal or Chronic Water Quality Issue", severity:"moderate",
    causes:["Seasonal algae growth increasing color and UV-absorbing compounds","Natural organic matter (NOM) variation in source water","Effluent quality naturally lower during certain loading periods"],
    actions:["Review seasonal UVT trends — establish expected seasonal range","Increase UV power output during low-UVT periods if system allows","Evaluate upstream treatment for NOM or color removal if it's a chronic issue","Report UVT data to regulatory agency if dose compliance is consistently at risk seasonally"],
    note:"Many plants experience predictable seasonal UVT swings. Proactive power increases in advance of low-UVT seasons maintain compliance without scrambling.", sop:null },

  dis_uv_sleeve_scale: { title:"Quartz Sleeve Mineral Scaling", severity:"moderate",
    causes:["High calcium or magnesium hardness precipitating on sleeve surface","Iron deposits from high-iron water or ferric chemical carryover","Manganese deposits from source water or upstream treatment"],
    actions:["Soak sleeves in citric acid solution (10–20%) for 30–60 minutes — rinse thoroughly","For iron scale, use mild hydrochloric acid solution per manufacturer guidance","Inspect automatic wipers — wipers may need cleaning or replacement if not removing scale","Increase cleaning frequency for high-mineral-content effluent"],
    note:"Mineral scale on quartz sleeves can be nearly invisible to the naked eye but reduce UV transmission by 20–50%. Regular cleaning and UVI trending are the best early warning tools.", sop:null },

  dis_uv_sleeve_bio: { title:"Quartz Sleeve Biological Fouling", severity:"moderate",
    causes:["Biofilm growth on sleeve surface — common in warm weather","Algae growth if system is exposed to daylight","Biological slough from upstream treatment coating sleeves"],
    actions:["Clean sleeves with mild detergent and soft cloth — do not use abrasive materials","Ensure automatic wiper system is functional and cycling regularly","Increase cleaning frequency during warm months","Check that UV channels are covered to prevent algae growth if light intrusion is possible"],
    note:"Biological fouling on sleeves is common in warm weather. Wiper systems help but do not eliminate manual cleaning needs. Even thin biofilms reduce UV transmission significantly.", sop:null },

  dis_uv_sleeve_broken: { title:"Quartz Sleeve Cracked or Broken", severity:"high",
    causes:["Physical impact during maintenance","Thermal shock from cold water contacting hot sleeve","Manufacturing defect or aged brittle sleeve"],
    actions:["Take affected lamp offline immediately — broken sleeve allows lamp to contact water (electrical hazard)","Follow lockout/tagout and confined space procedures before entering channel","Replace broken sleeve and inspect lamp for damage","Verify no glass fragments entered the flow channel","Check remaining sleeves for cracks — inspect carefully during next maintenance window"],
    note:"A broken quartz sleeve is a safety emergency, not just a maintenance item. Water contact with an energized UV lamp presents electrocution risk. Always lock out power before entering the UV channel.", sop:null },

  dis_cl_feed_failure: { title:"Chlorine Feed Failure — No Disinfectant Reaching Contact Chamber", severity:"high",
    causes:["Chemical feed pump failure or trip","Chlorine supply tank empty or isolation valve closed","Hypochlorite line plugged or air-locked","Control system fault stopping feed signal"],
    actions:["Verify chemical feed pump status — check for faults, alarms, or manual shutoff","Check hypochlorite tank level — inspect supply line and isolation valves","Prime feed line if air lock is suspected","Switch to standby pump if available","Notify supervisor — loss of disinfection is a permit compliance emergency","Notify regulatory agency per permit requirements if compliance is at risk"],
    note:"Loss of disinfection requires immediate escalation. Most permits require notification within 24 hours of a disinfection system failure. Know your permit reporting requirements before an emergency happens.", sop:null },

  dis_cl_demand_tss: { title:"High Chlorine Demand Due to Elevated TSS", severity:"moderate",
    causes:["Solids in effluent exerting immediate chlorine demand","Biological floc shielding pathogens from chlorine — reducing disinfection efficacy","Turbidity absorbing chlorine before it reaches target organisms"],
    actions:["Address upstream solids removal — clarifier or filter performance","Increase chlorine dose temporarily to compensate for elevated demand","Measure chlorine residual at multiple points in contact chamber to identify where demand is being exerted","Verify permit requires effluent TSS < 5–10 mg/L before UV or chlorine — high TSS compromises both"],
    note:"Chlorine and UV both perform better in low-turbidity effluent. TSS > 10 mg/L significantly increases chlorine demand and shields pathogens. Upstream treatment quality is critical to disinfection efficacy.", sop:null },

  dis_cl_demand_other: { title:"High Chlorine Demand — Non-TSS Causes", severity:"moderate",
    causes:["High ammonia or reduced nitrogen compounds consuming chlorine as chloramines","Organic compounds from industrial discharge exerting immediate demand","Warm temperatures increasing biological and chemical chlorine demand"],
    actions:["Check effluent ammonia — chlorine reacts with ammonia first (breakpoint chlorination), consuming large amounts before free residual forms","Review influent for industrial discharges with high organic chlorine demand","Ensure dosing point allows adequate contact time — dose too close to measurement point gives false low readings","Consider breakpoint chlorination analysis if ammonia is suspected"],
    note:"If effluent ammonia is high, you may need to chlorinate to breakpoint before achieving a free residual — this requires a dramatically higher dose. Combined chloramine residual and free chlorine residual have very different disinfection efficacy.", sop:null },

  dis_cl_high_dechlor: { title:"Over-Chlorination with Active Dechlorination System", severity:"moderate",
    causes:["Chlorine dose set too high for actual demand","Chlorine feed not trimmed after upstream improvements reduced demand","Fixed chlorine dose not tracking variable flow or demand"],
    actions:["Reduce chlorine dose — verify residual at compliance point remains above permit minimum","Verify dechlorination system is functioning and will cover any residual above permit","Implement flow-paced chlorine dosing if currently on fixed dose","Tune chlorine residual analyzer — confirm readings are accurate before adjusting doses"],
    note:"Over-chlorination wastes chemical and increases bisulfite demand for dechlorination. Both costs add up. Ratio-based or residual-feedback dosing is far more efficient than fixed dosing.", sop:null },

  dis_cl_high_nodechlor: { title:"Over-Chlorination — No Dechlorination System", severity:"high",
    causes:["Chlorine dose too high for current demand","Effluent quality improved reducing demand without dose adjustment","Flow decreased while fixed dose continued at same rate"],
    actions:["Reduce chlorine dose immediately — excess residual is toxic to receiving water aquatic life","Check permit for maximum effluent chlorine residual — most receiving water permits require < 0.1 mg/L","Consider installing dechlorination as a safety margin — bisulfite or SO2 is standard","Implement flow-paced dosing to automatically adjust with flow variation"],
    note:"Chlorine is highly toxic to aquatic organisms at very low concentrations (LC50 for many fish species is < 0.1 mg/L). Discharging excess chlorine without dechlorination is a serious permit and receiving water issue.", sop:null },

  dis_bisulfite_manual_high: { title:"Bisulfite Overdose — Fixed Manual Dose", severity:"moderate",
    causes:["Manual dose set higher than needed for actual chlorine residual","Chlorine dose was reduced but bisulfite dose not correspondingly reduced"],
    actions:["Measure effluent for residual chlorine AND for excess bisulfite (check with ORP or titration)","Reduce bisulfite dose in increments — target just enough to neutralize remaining chlorine residual","Verify effluent ORP is in the range associated with dechlorinated but not over-reduced water","Establish bisulfite-to-chlorine ratio baseline under normal conditions"],
    note:"Excess sodium bisulfite depletes dissolved oxygen in the receiving water, which can harm aquatic life similarly to over-chlorination. Dechlorination is not 'more is better' — precision matters.", sop:null },

  dis_bisulfite_auto_high: { title:"Bisulfite Overdose — Automated Control System Issue", severity:"moderate",
    causes:["ORP or chlorine analyzer setpoint too aggressive — driving excess bisulfite feed","Sensor fouling causing false high chlorine reading — triggering excess bisulfite","Control loop tuning issue causing overshoot"],
    actions:["Clean and calibrate ORP or chlorine residual sensor","Verify sensor reading against manual grab sample analysis","Review control loop setpoint — ensure target ORP or residual is appropriate for permit","Check for control loop overshoot — may need PID tuning adjustment","Collect effluent sample for full analysis including DO — check for oxygen depression"],
    note:"Automated bisulfite systems are only as good as the sensors controlling them. A fouled ORP electrode is the most common cause of erratic bisulfite dosing. Weekly sensor maintenance is minimum best practice.", sop:null },

  dis_bisulfite_lag: { title:"Under-Dechlorination — Bisulfite Dose Not Keeping Up with Chlorine Increase", severity:"high",
    causes:["Chlorine dose was recently increased but bisulfite dose not adjusted proportionally","Fixed bisulfite dose insufficient for higher chlorine residual"],
    actions:["Increase bisulfite dose to match new chlorine demand — use stoichiometric ratio as a starting point","Sodium bisulfite: approximately 1.46 mg bisulfite per mg Cl2 to be neutralized","Sodium metabisulfite: approximately 1.34 mg per mg Cl2","Sulfur dioxide (SO2): approximately 0.9 mg per mg Cl2","Monitor effluent residual chlorine immediately after adjustment","Notify supervisor — effluent chlorine residual may be exceeding permit"],
    note:"Always adjust bisulfite dose simultaneously when increasing chlorine dose. The stoichiometric ratios above are starting points — actual demand may vary with water chemistry. Verify with effluent residual measurement.", sop:null },

  dis_bisulfite_pump: { title:"Bisulfite Feed Pump Failure", severity:"high",
    causes:["Pump motor failure","Clogged pump head from bisulfite crystallization","Air lock in feed line","Control signal not reaching pump"],
    actions:["Switch to standby bisulfite pump immediately if available","Inspect pump head and feed line for bisulfite crystal plugging — flush with warm water","Verify control signal and power supply to pump","If no standby available, reduce chlorine dose to minimum permit-compliant level while pump is repaired","Notify supervisor — effluent chlorine residual may exceed permitted levels","Consider manual addition of bisulfite solution as emergency measure"],
    note:"Bisulfite pump failure is a compliance emergency. Chlorine residual in the effluent becomes toxic to receiving water immediately. Standby pump capability and regular preventive maintenance are essential.", sop:null },

  dis_bisulfite_underdose: { title:"Bisulfite Underdose — Insufficient for Current Chlorine Residual", severity:"high",
    causes:["Dose ratio too low for actual chlorine residual leaving contact chamber","Bisulfite solution concentration lower than assumed (dilution or degradation)"],
    actions:["Verify bisulfite solution concentration — sample and test if mixed on-site","Recalculate dose based on actual measured chlorine residual entering dechlorination","Increase bisulfite dose incrementally — monitor effluent residual after each adjustment","Check bisulfite storage — sodium bisulfite degrades rapidly once dissolved and in warm conditions","Verify pump calibration — actual output may differ from set dose"],
    note:"Sodium bisulfite solution degrades over time, especially when warm or exposed to air. Solution older than 2–3 weeks at warm temperatures may have significantly reduced potency. Fresh solution is always preferred.", sop:null },

  dis_bisulfite_supply: { title:"Bisulfite Supply — Tank Empty or Delivery Issue", severity:"high",
    causes:["Tank run dry due to higher-than-expected consumption","Delivery delayed or missed","Level sensor malfunction giving false full reading"],
    actions:["Verify actual tank level by manual measurement — do not rely solely on level sensor","Contact chemical supplier for emergency delivery if tank is critically low","As interim measure, reduce chlorine dose to minimum permit-compliant level to reduce bisulfite demand","Establish minimum reorder point — bisulfite supply should never drop below 3–5 day reserve","Verify level sensor calibration after refilling"],
    note:"Running out of bisulfite is a preventable emergency. Establish automatic reorder alerts at 25% tank capacity. Bisulfite consumption should be tracked daily during normal operations.", sop:null },

  dis_bisulfite_crystal: { title:"Bisulfite Crystallization / Feed Line Plugging", severity:"moderate",
    causes:["Sodium bisulfite crystallizing in feed lines, pump heads, or injection points","Cold temperatures causing crystallization in outdoor feed systems","Concentrated bisulfite solution sitting in lines during low-flow periods"],
    actions:["Flush affected lines with warm water to dissolve crystals","Inspect and clean pump head, check valves, and injection point","Insulate outdoor feed lines and storage in cold climates","Consider diluting bisulfite solution to reduce crystallization tendency","Establish regular flushing protocol for lines during low-use periods"],
    note:"Sodium bisulfite crystallization is especially problematic in cold weather and in concentrated solutions. A 25% solution is significantly more prone to crystallization than a 10–15% solution. Dilution trades storage volume for reliability.", sop:null },

  dis_bisulfite_mixing: { title:"Bisulfite Mixing or Dilution Issue", severity:"moderate",
    causes:["On-site dilution system producing incorrect concentration","Poor mixing at injection point — bisulfite not contacting full flow","Injection point location allowing short-circuit before compliance measurement"],
    actions:["Verify dilution water flow rate and bisulfite concentrate feed rate at mixing system","Test diluted solution concentration against expected value","Inspect injection point — verify bisulfite is injecting into turbulent zone for rapid mixing","Check injection point location relative to compliance measurement point — allow adequate contact/mixing time"],
    note:"Bisulfite reacts very rapidly with chlorine — mixing is typically not a problem if the injection is in a well-mixed zone. Poor mixing at the injection point is more likely if the pipe cross-section is very large or flow is low.", sop:null },

  dis_ct_uv: { title:"UV CT / Dose Compliance — Contact Time and Intensity Management", severity:"moderate",
    causes:["Dose (mJ/cm²) calculated product insufficient for permit target log inactivation","Flow rate exceeding system design causing short exposure time","Low UVT reducing effective dose despite adequate lamp output"],
    actions:["Calculate actual UV dose: Dose (mJ/cm²) = Intensity (mW/cm²) × Time (s)","Verify UVT is being measured and used in dose calculation — not assumed constant","Confirm flow rate through system is at or below design maximum","Review permit required log inactivation and associated dose — most secondary effluent targets 100 mJ/cm² for 4-log virus reduction"],
    note:"UV systems must be validated under actual water quality conditions. A system validated at 65% UVT may not deliver the same log inactivation at 55% UVT even if dose meters show the same number.", sop:null },

  dis_ct_cl: { title:"Chlorine CT Compliance — Contact Time and Residual Management", severity:"moderate",
    causes:["Insufficient contact time in chlorine contact chamber at peak flow","Residual at compliance point dropping below permit minimum","Short-circuiting in contact chamber reducing effective CT"],
    actions:["Calculate CT: Residual (mg/L) × Contact Time (min) — verify against permit target","Check contact chamber for short-circuiting — baffling may be needed","Measure residual at multiple points through chamber to map decay curve","Verify flow rate through chamber does not exceed design at peak flows"],
    note:"Effective CT is often much less than theoretical CT due to short-circuiting. A tracer study (t10 determination) gives actual effective contact time and is sometimes required by permit.", sop:null },

  dis_tox_chlorine: { title:"Effluent Toxicity — Chlorination Byproducts or Residual", severity:"high",
    causes:["Chlorine residual exceeding receiving water acute or chronic toxicity thresholds","Chlorinated organic byproducts (trihalomethanes, haloacetic acids) from high organics in effluent","Chloramines persisting through dechlorination and toxic to aquatic organisms"],
    actions:["Verify dechlorination is achieving complete chlorine neutralization — measure total and free residual in effluent","Check ORP at discharge — should be in dechlorinated range (typically +200 to +350 mV)","If chlorinated organics suspected, evaluate upstream organic loading and consider alternative disinfection (UV)","Review whole effluent toxicity (WET) test results — compare to permit limits"],
    note:"Chlorine disinfection byproducts are regulated differently than residual chlorine. Some permits include WET testing specifically because chlorinated effluent can be toxic even after apparent dechlorination.", sop:null },

  dis_tox_uv: { title:"Effluent Toxicity Concern — UV System (No Disinfection Byproduct Risk)", severity:"low",
    causes:["UV disinfection adds no chemical residuals — toxicity from other sources","Upstream chemical additions in treatment contributing to toxicity"],
    actions:["Investigate other sources of effluent toxicity — upstream industrial discharge, chemical addition in treatment","Review whole effluent toxicity (WET) test results for trends","UV itself is not a source of toxic byproducts under typical municipal effluent conditions","Check for other chemical additions upstream (coagulants, polymers, odor control) that may contribute"],
    note:"UV disinfection has essentially no disinfection byproduct concern under typical municipal wastewater conditions. If WET tests are failing at a UV plant, the source is almost certainly upstream chemistry, not the UV system.", sop:null },

  /* ── EFFLUENT / PERMIT ────────────────────────────────────── */
  eff_bod_tss: { title:"High Effluent BOD Caused by Solids Carryover", severity:"high",
    causes:["TSS in effluent contributing particulate BOD","Clarifier overload or bulking carrying biomass out","BOD permit exceedance driven by poor clarification"],
    actions:["Address clarifier performance first — solve the solids carryover","Check settleability and diagnose clarifier issue","Consider polymer addition as emergency measure","Notify regulatory agency proactively if permit exceedance is imminent"],
    note:"Effluent BOD is closely linked to effluent TSS. Rule of thumb: 1 mg/L of effluent TSS contributes roughly 0.5–0.7 mg/L of effluent BOD as cellular oxygen demand.", sop:null },

  eff_bod_soluble: { title:"High Effluent Soluble BOD (Biological Underperformance)", severity:"high",
    causes:["Insufficient SRT to fully oxidize soluble BOD","Biological inhibition or toxicity","Hydraulic short-circuiting bypassing biological treatment","Temperature too low for full BOD removal"],
    actions:["Increase SRT to improve treatment efficiency","Verify MLSS is adequate for current loading","Check HRT — minimum contact time may not be met at high flows","Investigate potential toxic inhibition if SRT increase doesn't help"],
    note:"Soluble BOD in effluent despite a clear sample indicates the biology is not completing oxidation. This is a process performance problem, not a solids problem.", sop:null },

  eff_ammonia_seasonal: { title:"Seasonal Effluent Ammonia Rise — Cold Weather", severity:"high",
    causes:["Cold water temperatures reducing nitrifier growth and activity rate","Insufficient SRT for winter nitrification","Operator not anticipating seasonal adjustment needs"],
    actions:["Begin increasing SRT in fall before temperatures drop — be proactive","Reduce WAS rate to hold more nitrifier biomass through winter","Consider increasing MLSS to buffer temperature-dependent rate changes","Notify regulatory agency if seasonal ammonia permit cannot be met"],
    note:"Cold-weather nitrification management is one of the most common operational challenges in temperate climates. The time to act is fall — not after the first permit exceedance.", sop:null },

  eff_ammonia_sudden: { title:"Sudden Effluent Ammonia Rise — Process Upset", severity:"high",
    causes:["Nitrifier washout from low SRT or toxic event","Sudden loading increase overwhelming nitrification capacity","Aeration failure reducing DO below nitrification threshold"],
    actions:["Check DO in aeration basin — must be >1.5 mg/L for nitrification","Verify SRT is adequate for nitrifiers","Investigate for toxic industrial discharge","Reduce WAS immediately to maximize SRT","Notify regulatory agency if permit limit is exceeded"],
    note:"Nitrification failure is one of the most serious permit compliance issues at plants with ammonia limits. Escalate quickly and document everything.", sop:null },

  eff_phos_chemical: { title:"High Effluent Phosphorus — Chemical Addition Issue", severity:"moderate",
    causes:["Insufficient chemical dose for current phosphorus load","Chemical feed system malfunction (pump, piping, plugging)","Poor mixing at chemical addition point"],
    actions:["Verify chemical feed pump is operating and delivering correct dose","Check feed point and mixing — inadequate mixing wastes chemical","Increase dose if loading has increased","Collect and test effluent for soluble vs. particulate phosphorus"],
    note:"If soluble P is still high despite chemical addition, check for poor mixing. If particulate P is the problem, address clarifier solids removal first.", sop:null },

  eff_phos_bio: { title:"High Effluent Phosphorus — EBPR Process Upset", severity:"high",
    causes:["Insufficient anaerobic zone for PAO development","Nitrate entering anaerobic zone inhibiting PAOs","Low VFA in anaerobic zone — inadequate carbon for PAOs","Temperature change affecting PAO activity"],
    actions:["Verify anaerobic zone has zero DO and zero nitrate","Check RAS nitrate carryover — denitrify before anaerobic zone if needed","Evaluate VFA availability — may need supplemental carbon source","Ensure adequate SRT for PAO population maintenance"],
    note:"EBPR is process-sensitive and can be disrupted by many factors. Nitrate in the anaerobic zone is the single most common cause of EBPR failure at well-designed plants.", sop:null },

  eff_phos_none: { title:"High Effluent Phosphorus — No Current Removal Process", severity:"moderate",
    causes:["No phosphorus removal designed into the process","Permit limit newly added or tightened","Seasonal eutrophication concern in receiving water"],
    actions:["Evaluate chemical addition (alum or ferric chloride) as a near-term solution","Consult with regulatory agency about compliance schedule if needed","Consider long-term biological P removal design if permit is ongoing","Document current effluent P concentrations for permit negotiation baseline"],
    note:"If this is a new or surprise permit requirement, proactive communication with the regulatory agency is important. A compliance schedule can often be negotiated.", sop:null },

  eff_nitrate_process: { title:"High Effluent Nitrate — Denitrification Underperformance", severity:"moderate",
    causes:["Insufficient anoxic zone volume or contact time","Inadequate carbon source for denitrification","DO carryover into anoxic zone","High nitrate load from strong nitrification"],
    actions:["Verify anoxic zone DO is below 0.2 mg/L","Evaluate internal recycle rate — higher recycle increases denitrification potential","Check carbon availability — BOD:TKN ratio may be too low","Consider supplemental carbon addition (methanol, acetate, glycerol) if carbon-limited"],
    note:"Denitrification efficiency is ultimately limited by the carbon:nitrogen ratio of the influent. Carbon-limited systems often cannot meet stringent TN limits without supplemental carbon.", sop:null },

  eff_nitrate_no_denox: { title:"High Effluent Nitrate — No Denitrification in Process", severity:"moderate",
    causes:["Process designed for nitrification only — all ammonia converted to nitrate","Permit limit newly added for total nitrogen","Seasonal TN concern in receiving water"],
    actions:["Consult regulatory agency regarding total nitrogen permit applicability","Evaluate retrofit options: pre-anoxic zone, step-feed, or post-anoxic with carbon","If TN limit is new, request a compliance schedule","Document that high nitrate is the expected product of nitrification-only design"],
    note:"Nitrification alone converts ammonia to nitrate — it doesn't reduce total nitrogen. Meeting TN limits requires denitrification, which is a process design, not just an operational, change.", sop:null },

  eff_turbidity_filter: { title:"High Effluent Turbidity — Filter Performance Issue", severity:"moderate",
    causes:["Filter media fouling or channeling","Backwash frequency or duration inadequate","Filter run time too long between backwashes","Media loss from excessive backwash rate"],
    actions:["Increase backwash frequency","Check backwash flow rate and duration — verify media is properly scoured","Inspect filter media for mudballing, channeling, or media loss","Review filter effluent turbidity trend — is this a sudden or gradual rise?"],
    note:"Filter turbidity spikes immediately after backwash are normal (filter ripening). Persistent turbidity throughout the run indicates a media or hydraulic problem.", sop:null },

  eff_turbidity_clarifier: { title:"High Effluent Turbidity — Clarifier Solids Carryover", severity:"moderate",
    causes:["Fine solids (pin floc or filamentous carryover) in clarifier effluent","Hydraulic short-circuiting","Sludge blanket too high approaching weir"],
    actions:["Diagnose clarifier performance — see Secondary Clarifier section","Check SVI and settleability","Measure sludge blanket depth","Consider polymer addition as emergency aid"],
    note:"For direct effluent discharge without filtration, clarifier turbidity directly becomes effluent turbidity. Clarifier performance is the last line of defense.", sop:null },

  eff_permit_tss_bod: { title:"TSS / BOD Permit Exceedance — Response Protocol", severity:"high",
    causes:["Process upset causing solids carryover or incomplete treatment","Hydraulic overload during storm event","Equipment failure (RAS pump, aeration, clarifier mechanism)"],
    actions:["Document exact exceedance: date, parameter, value, and likely cause","Notify regulatory agency per permit reporting requirements (typically within 24 hours for significant violations)","Implement corrective actions immediately — address root cause, not just symptoms","Prepare written report describing event, cause, and corrective actions taken","Review permit for self-monitoring reporting requirements and deadlines"],
    note:"Self-reporting violations with a clear corrective action plan is always treated more favorably than discovered violations. Know your permit reporting timelines — they are often 24 hours for significant violations.", sop:null },

  eff_permit_nutrients: { title:"Nutrient Permit Exceedance — Response Protocol", severity:"high",
    causes:["Biological treatment failure (nitrification, EBPR)","Chemical addition system malfunction","Loading increase exceeding treatment capacity"],
    actions:["Notify regulatory agency per permit requirements","Implement emergency chemical addition if possible (for P exceedances)","Increase WAS reduction for N issues (SRT management)","Document cause and corrective actions","Consult with engineer if structural process changes are needed"],
    note:"Nutrient permit limits are increasingly stringent as eutrophication concerns grow. Proactive management and early regulatory communication are essential.", sop:null },

  eff_permit_flow: { title:"Permitted Flow Exceedance", severity:"high",
    causes:["Wet weather I&I event exceeding plant design capacity","Population growth exceeding permitted flow","Flow meter malfunction over-reporting flows"],
    actions:["Verify flow meter accuracy first — rule out instrumentation error","Notify regulatory agency per permit requirements","Document flows and contributing conditions","Evaluate I&I reduction program if wet weather is the cause","Consult engineer about capacity expansion if growth is the driver"],
    note:"Flow permit exceedances due to I&I are common at older plants. They typically require a formal response plan and often trigger a capacity analysis by regulators.", sop:null }

}; /* end MX_DIAGNOSES */

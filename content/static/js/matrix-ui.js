/* ═══════════════════════════════════════════════════════════════════
   PROCESS DECISION MATRIX — UI LOGIC
   /static/js/matrix-ui.js
   Requires: matrix-data-tree.js, matrix-data-diagnoses.js loaded first
   ═══════════════════════════════════════════════════════════════════ */

/* ── State ──────────────────────────────────────────────────────── */
var state = {
  zone:       null,
  symptomId:  null,
  qId:        'q1',
  history:    [],   /* [{qId, label}] — path taken for breadcrumb / back */
  diagnosisId: null
};

/* Stores current question options so onclick handlers can index into
   them without embedding complex strings in HTML attributes. */
var _opts = [];

/* ── Utilities ──────────────────────────────────────────────────── */

function escHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sevOrder(s) {
  return s === 'high' ? 3 : s === 'moderate' ? 2 : 1;
}

/* Walk the question tree from q1 and return the highest severity
   found across all reachable diagnoses. */
function symMaxSev(symptom) {
  var qMap = {};
  (symptom.questions || []).forEach(function(q) { qMap[q.id] = q; });
  var best = 'low';

  function visit(qId, depth) {
    if (depth > 20) return; /* guard against cycles */
    var q = qMap[qId];
    if (!q) return;
    (q.options || []).forEach(function(opt) {
      if (opt.next === 'diagnosis' && opt.diagnosisId) {
        var d = MX_DIAGNOSES[opt.diagnosisId];
        if (d && sevOrder(d.severity) > sevOrder(best)) best = d.severity;
      } else if (opt.next && opt.next !== 'diagnosis') {
        visit(opt.next, depth + 1);
      }
    });
  }

  visit('q1', 0);
  return best;
}

/* ── Zone Bar ────────────────────────────────────────────────────── */

function initZoneBar() {
  var bar = document.getElementById('mx-zone-bar');
  if (!bar) return;
  bar.innerHTML = MX_ZONES.map(function(z) {
    return '<button class="mx-zone-btn" data-zone="' + z.id + '" ' +
      'onclick="selectZone(\'' + z.id + '\')">' +
      '<span class="mx-zone-btn-abbr">' + escHtml(z.abbr)  + '</span>' +
      '<span class="mx-zone-btn-label">' + escHtml(z.label) + '</span>' +
      '</button>';
  }).join('');
}

function syncZoneBar() {
  document.querySelectorAll('.mx-zone-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.zone === state.zone);
  });
}

/* ── Actions ─────────────────────────────────────────────────────── */

function selectZone(zoneId) {
  state.zone       = zoneId;
  state.symptomId  = null;
  state.qId        = 'q1';
  state.history    = [];
  state.diagnosisId = null;
  syncZoneBar();
  renderCanvas();
  updateStatusBar();
  /* scroll symptom list into view on mobile */
  var canvas = document.getElementById('mx-canvas');
  if (canvas) canvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function selectSymptom(symId) {
  state.symptomId  = symId;
  state.qId        = 'q1';
  state.history    = [];
  state.diagnosisId = null;
  renderCanvas();
  updateStatusBar();
  var canvas = document.getElementById('mx-canvas');
  if (canvas) canvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* Called by numbered option buttons via onclick="handleOption(i)" */
function handleOption(idx) {
  var opt = _opts[idx];
  if (!opt) return;
  state.history.push({ qId: state.qId, label: opt.label });
  if (opt.next === 'diagnosis') {
    state.diagnosisId = opt.diagnosisId || null;
    state.qId        = null;
  } else {
    state.qId        = opt.next;
    state.diagnosisId = null;
  }
  renderCanvas();
  updateStatusBar();
}

function handleBack() {
  if (state.history.length === 0) {
    backToSymptoms();
    return;
  }
  var prev      = state.history.pop();
  state.qId     = prev.qId;
  state.diagnosisId = null;
  renderCanvas();
  updateStatusBar();
}

function backToSymptoms() {
  state.symptomId  = null;
  state.qId        = 'q1';
  state.history    = [];
  state.diagnosisId = null;
  renderCanvas();
  updateStatusBar();
}

/* ── Breadcrumb ──────────────────────────────────────────────────── */

function renderBreadcrumb(symptomLabel) {
  if (!state.history.length) return '';
  var rows = state.history.map(function(h) {
    return '<div class="mx-breadcrumb-row">' +
      '<span class="mx-bc-q">' + escHtml(h.qId.toUpperCase()) + ' &rsaquo;</span>' +
      '<span class="mx-bc-a">' + escHtml(h.label) + '</span>' +
    '</div>';
  }).join('');
  return '<div class="mx-breadcrumb">' +
    '<div class="mx-breadcrumb-hdr">PATH &middot; ' + escHtml(symptomLabel) + '</div>' +
    rows +
  '</div>';
}

/* ── Question Renderer ───────────────────────────────────────────── */

function renderQuestion(symptom, q) {
  /* Store options globally so handleOption(idx) can read them */
  _opts = q.options || [];

  var qNum    = (q.id || 'q1').replace('q', '');
  var options = _opts.map(function(opt, i) {
    return '<button class="mx-q-option" onclick="handleOption(' + i + ')">' +
      escHtml(opt.label) +
      '<span class="mx-q-option-arrow">&rsaquo;</span>' +
    '</button>';
  }).join('');

  return renderBreadcrumb(symptom.label) +
    '<div class="mx-q-card">' +
      '<div class="mx-q-hdr">' +
        '<span class="mx-q-step">Question ' + qNum + '</span>' +
        '<span class="mx-q-symptom-hint">' + escHtml(symptom.label) + '</span>' +
      '</div>' +
      '<div class="mx-q-body">' +
        '<div class="mx-q-text">' + escHtml(q.text) + '</div>' +
        '<div class="mx-q-options">' + options + '</div>' +
      '</div>' +
    '</div>' +
    '<button class="mx-back-btn" onclick="handleBack()">&larr; Back</button>';
}

/* ── Diagnosis Renderer ──────────────────────────────────────────── */

function renderDiagnosis(symptom, diagId) {
  var d = MX_DIAGNOSES[diagId];
  if (!d) {
    return '<div class="mx-await"><div class="mx-await-icon">&#9888;</div>' +
      '<div class="mx-await-label">Diagnosis record not found</div>' +
      '<div class="mx-await-hint">ID: ' + escHtml(diagId) + '</div></div>';
  }

  var sev      = d.severity || 'low';
  var sevLabel = sev === 'high' ? 'High Severity' : sev === 'moderate' ? 'Moderate Severity' : 'Low Severity';

  var causes = (d.causes || []).map(function(c) {
    return '<li class="mx-cause-item">' + escHtml(c) + '</li>';
  }).join('');

  var actions = (d.actions || []).map(function(a, i) {
    var n = String(i + 1).padStart(2, '0');
    return '<li class="mx-action-item"><span class="mx-action-num">' + n + '</span>' + escHtml(a) + '</li>';
  }).join('');

  var noteHtml = d.note
    ? '<div class="mx-note-box">' +
        '<div class="mx-note-label">OPERATOR NOTE</div>' +
        '<div style="margin-top:0.3rem">' + escHtml(d.note) + '</div>' +
      '</div>'
    : '';

  var sopHtml;
  if (d.sop) {
    sopHtml = '<div class="mx-sop-box">' +
      '<span class="mx-sop-icon">SOP</span>' +
      '<div class="mx-sop-content">' +
        '<div class="mx-sop-title">' + escHtml(d.sop.title) + '</div>' +
        '<div style="font-family:\'Space Mono\',monospace;font-size:0.44rem;color:var(--gray-dim)">' + escHtml(d.sop.id) + '</div>' +
      '</div>' +
      '<a href="' + escHtml(d.sop.url) + '" class="mx-sop-link-btn" target="_blank" rel="noopener">Open &rarr;</a>' +
    '</div>';
  } else {
    sopHtml = '<div class="mx-sop-box">' +
      '<span class="mx-sop-icon">SOP</span>' +
      '<div class="mx-sop-content">' +
        '<div class="mx-sop-title" style="color:var(--gray-dim)">Standard Operating Procedure</div>' +
      '</div>' +
      '<span class="mx-sop-pending">Not yet linked</span>' +
    '</div>';
  }

  return renderBreadcrumb(symptom.label) +
    '<div class="mx-diag-card ' + sev + '">' +
      '<div class="mx-diag-hdr ' + sev + '">' +
        '<div class="mx-diag-title">' + escHtml(d.title) + '</div>' +
        '<span class="mx-sev-badge ' + sev + '">' + sevLabel + '</span>' +
      '</div>' +
      '<div class="mx-diag-body">' +
        '<div>' +
          '<div class="mx-section-label">Probable Causes</div>' +
          '<ul class="mx-cause-list">' + causes + '</ul>' +
        '</div>' +
        '<div>' +
          '<div class="mx-section-label">Recommended Actions</div>' +
          '<ul class="mx-action-list">' + actions + '</ul>' +
        '</div>' +
        noteHtml +
        sopHtml +
      '</div>' +
    '</div>' +
    '<button class="mx-back-btn" onclick="handleBack()">&larr; Back</button>';
}

/* ── No-Zone Splash ──────────────────────────────────────────────── */

function renderNoZone(canvas) {
  canvas.dataset.state = 'no-zone';
  var cards = MX_ZONES.map(function(z) {
    return '<button class="mx-zone-card" onclick="selectZone(\'' + z.id + '\')">' +
      '<span class="mx-zone-card-abbr">' + escHtml(z.abbr) + '</span>' +
      '<span class="mx-zone-card-label">' + escHtml(z.label) + '</span>' +
      '<span class="mx-zone-card-desc">' + escHtml(z.desc) + '</span>' +
    '</button>';
  }).join('');

  canvas.innerHTML = '<div class="mx-no-zone">' +
    '<div class="mx-no-zone-title">Select a Process Zone</div>' +
    '<div class="mx-no-zone-hint">Choose a treatment area to begin troubleshooting</div>' +
    '<div class="mx-zone-grid">' + cards + '</div>' +
  '</div>';
}

/* ── Two-Column Layout ───────────────────────────────────────────── */

function renderTwoCol(canvas) {
  var zoneData = MX_TREE[state.zone];
  var zoneMeta = MX_ZONES.find(function(z) { return z.id === state.zone; });
  if (!zoneData || !zoneMeta) { renderNoZone(canvas); return; }

  var symptoms = zoneData.symptoms || [];

  /* Left panel — symptom list */
  var symItems = symptoms.map(function(sym) {
    var sev    = symMaxSev(sym);
    var active = sym.id === state.symptomId ? ' active' : '';
    return '<div class="mx-symptom-item' + active + '" onclick="selectSymptom(\'' + sym.id + '\')">' +
      '<span class="mx-sev-dot ' + sev + '"></span>' +
      '<span>' + escHtml(sym.label) + '</span>' +
    '</div>';
  }).join('');

  var leftPanel = '<div class="mx-panel">' +
    '<div class="mx-panel-hdr">' +
      '<span class="mx-panel-hdr-label">Symptoms</span>' +
      '<span class="mx-panel-hdr-count">' + symptoms.length + ' items</span>' +
    '</div>' +
    '<div class="mx-zone-info">' +
      '<div class="mx-zone-info-name">' + escHtml(zoneMeta.label) + '</div>' +
      '<div class="mx-zone-info-desc">' + escHtml(zoneMeta.desc) + '</div>' +
    '</div>' +
    '<div class="mx-symptom-list">' + symItems + '</div>' +
  '</div>';

  /* Right panel — await / question / diagnosis */
  var rightHtml;
  if (!state.symptomId) {
    rightHtml = '<div class="mx-await">' +
      '<div class="mx-await-icon">&#11041;</div>' +
      '<div class="mx-await-label">Awaiting Input</div>' +
      '<div class="mx-await-hint">Select a symptom from the list to begin diagnosis.</div>' +
    '</div>';
  } else {
    var sym = symptoms.find(function(s) { return s.id === state.symptomId; });
    if (!sym) {
      rightHtml = '<div class="mx-await"><div class="mx-await-label">Symptom not found</div></div>';
    } else if (state.diagnosisId) {
      rightHtml = renderDiagnosis(sym, state.diagnosisId);
    } else {
      var qMap = {};
      (sym.questions || []).forEach(function(q) { qMap[q.id] = q; });
      var currentQ = qMap[state.qId || 'q1'];
      if (!currentQ) {
        rightHtml = '<div class="mx-await"><div class="mx-await-label">Question not found</div></div>';
      } else {
        rightHtml = renderQuestion(sym, currentQ);
      }
    }
  }

  canvas.dataset.state = state.symptomId ? 'active' : 'idle';
  canvas.innerHTML = leftPanel + '<div class="mx-diag-col">' + rightHtml + '</div>';
}

/* ── Main Canvas ─────────────────────────────────────────────────── */

function renderCanvas() {
  var canvas = document.getElementById('mx-canvas');
  if (!canvas) return;
  if (!state.zone) {
    renderNoZone(canvas);
  } else {
    renderTwoCol(canvas);
  }
}

/* ── Status Bar ──────────────────────────────────────────────────── */

function updateStatusBar() {
  var bar = document.getElementById('mx-statusbar');
  if (!bar) return;

  var zoneMeta = state.zone
    ? MX_ZONES.find(function(z) { return z.id === state.zone; })
    : null;

  var sym = null;
  if (state.zone && state.symptomId) {
    var zd = MX_TREE[state.zone];
    if (zd) sym = (zd.symptoms || []).find(function(s) { return s.id === state.symptomId; });
  }

  var diag    = state.diagnosisId ? MX_DIAGNOSES[state.diagnosisId] : null;
  var sevClass = diag ? diag.severity : (sym ? symMaxSev(sym) : 'none');

  bar.innerHTML =
    '<div class="mx-statusbar-item">' +
      '<span class="mx-statusbar-key">ZONE:</span>' +
      '<span class="mx-statusbar-val">' +
        (zoneMeta ? escHtml(zoneMeta.abbr) + ' &middot; ' + escHtml(zoneMeta.label) : '&mdash;') +
      '</span>' +
    '</div>' +
    '<div class="mx-statusbar-item">' +
      '<span class="mx-statusbar-key">SYMPTOM:</span>' +
      '<span class="mx-statusbar-val">' + (sym ? escHtml(sym.label) : '&mdash;') + '</span>' +
    '</div>' +
    (diag
      ? '<div class="mx-statusbar-sev ' + diag.severity + '">' + diag.severity.toUpperCase() + '</div>'
      : '<div class="mx-statusbar-sev none">&mdash;</div>');
}

/* ── Clock ───────────────────────────────────────────────────────── */

(function clockLoop() {
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var el = document.getElementById('mx-clock');
    if (!el) return;
    var d = new Date();
    el.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }
  tick();
  setInterval(tick, 1000);
})();

/* ── Bootstrap ───────────────────────────────────────────────────── */

initZoneBar();
renderCanvas();
updateStatusBar();

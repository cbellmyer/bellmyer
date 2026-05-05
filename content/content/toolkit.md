---
title: "Operator Toolkit"
date: 2024-06-15
draft: false
layout: "page"
hideMeta: true
ShowToc: false
menu:
  main:
    name: "Toolkit"
    weight: 30
---

<style>
    .scada-panel {
        background: var(--entry, #1e1e1e);
        border: 1px solid var(--border, #333);
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    weather-widget, process-calculator {
        display: block;
        height: 100%;
    }
    .scada-meta { display: block; color: var(--secondary, #888); font-size: 0.9rem; margin-bottom: 15px; line-height: 1.4; }
    .toolkit-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }
    .scada-form-group {
        margin-bottom: 12px;
    }
    .scada-form-group label {
        display: block;
        color: var(--secondary);
        font-size: 0.85rem;
        margin-bottom: 4px;
        font-family: "JetBrains Mono", Consolas, monospace;
    }
    .scada-input {
        width: 100%;
        background: var(--code-bg, #1e1e1e);
        border: 1px solid var(--border, #333);
        color: var(--primary, #ccc);
        padding: 8px;
        font-family: monospace;
        border-radius: 2px;
        box-sizing: border-box;
    }
    .scada-input:focus {
        border-color: #FFC107;
        outline: none;
        box-shadow: 0 0 5px rgba(255, 193, 7, 0.2);
    }
    .result-display {
        font-size: 1.8rem;
        color: #FFC107;
        text-align: center;
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px dashed var(--border, #333);
        text-shadow: 0 0 8px rgba(255, 193, 7, 0.4);
        font-family: "JetBrains Mono", Consolas, monospace;
    }
    .weather-data {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }
    .weather-temp {
        font-size: 2rem;
        color: #FFC107;
    }
    .scada-importance {
        font-size: 0.85rem;
        color: var(--secondary, #888);
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px dotted var(--border, #333);
        line-height: 1.4;
    }
    .scada-section-title {
        color: var(--primary, #ccc);
        border-bottom: 2px solid #FFC107;
        padding-bottom: 5px;
        margin-top: 40px;
        font-family: "JetBrains Mono", Consolas, monospace;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
</style>

<!-- Modular Web Components -->

<weather-widget class="scada-panel" style="display: block;"></weather-widget>

<h2 class="scada-section-title">Liquids Processing</h2>
<div class="toolkit-grid">
    <process-calculator
        type="svi"
        title="Sludge Volume Index (SVI)"
        desc="Calculates the settling characteristics of activated sludge (mL/g)."
        importance="Crucial for monitoring sludge compaction and identifying biological foaming or bulking trends before they cause solids wash-out.">
    </process-calculator>
    <process-calculator
        type="fm"
        title="F/M Ratio"
        desc="Calculates the Food-to-Microorganism ratio."
        importance="Guides wasting strategies by balancing incoming BOD load with active biomass inventory, ensuring stable biological treatment efficiency.">
    </process-calculator>
    <process-calculator
        type="mcrt"
        title="MCRT (Days)"
        desc="Mean Cell Residence Time / Sludge Age calculation."
        importance="Dictates the dominant microorganism populations in the bioreactor; critical for maintaining consistent nitrification and nutrient removal.">
    </process-calculator>
    <process-calculator
        type="slr"
        title="Surface Loading Rate"
        desc="Calculates the gallons per day per square foot (gpd/sq ft)."
        importance="Monitors hydraulic stress on secondary clarifiers to prevent sludge blanket failure and effluent TSS violations during peak flows.">
    </process-calculator>
    <process-calculator
        type="hrt"
        title="Hydraulic Retention Time"
        desc="Calculates the retention time in hours."
        importance="Ensures wastewater maintains adequate contact time with active biomass for complete biological degradation and permit compliance.">
    </process-calculator>
    <process-calculator
        type="dosing"
        title="Chemical Dosing"
        desc="Calculates chemical dose in pounds per day (lbs/day)."
        importance="Optimizes chemical usage for phosphorus precipitation and solids conditioning, preventing wasteful over-dosing and process toxicity.">
    </process-calculator>
    <process-calculator
        type="wor"
        title="Weir Overflow Rate"
        desc="Calculates gallons per day per foot of weir (gpd/ft)."
        importance="Identifies excessive hydraulic velocities over clarifier weirs that can pull solids into the final effluent.">
    </process-calculator>
    <process-calculator
        type="bodLoad"
        title="Mass Loading (BOD/TSS)"
        desc="Calculates total mass load in pounds per day (lbs/day)."
        importance="Critical for anticipating increased oxygen demand and preventing aeration basins from becoming septic during high-strength industrial dumps.">
    </process-calculator>
</div>

<h2 class="scada-section-title">Solids Handling & Dewatering</h2>
<div class="toolkit-grid">
    <process-calculator
        type="solidsLoad"
        title="Solids Loading Rate"
        desc="Calculates lbs/day/sq ft for clarifiers or thickeners."
        importance="Ensures thickening mechanisms aren't overloaded, preventing torque faults and maintaining consistent sludge blanket depths.">
    </process-calculator>
</div>

<h2 class="scada-section-title">Digester Operations</h2>
<div class="toolkit-grid">
    <process-calculator
        type="vsr"
        title="Volatile Solids Reduction"
        desc="Calculates % VSR using the Van Kleeck formula."
        importance="Mandatory regulatory metric for anaerobic digesters to prove vector attraction reduction and pathogen destruction for biosolids land application.">
    </process-calculator>
    <process-calculator
        type="vsLoading"
        title="VS Loading Rate"
        desc="Calculates lbs VS added per day per cubic foot."
        importance="Prevents organic overloading, which can lead to digester souring (acid accumulation) and foaming issues.">
    </process-calculator>
    <process-calculator
        type="digDt"
        title="Digester Detention Time"
        desc="Calculates the hydraulic detention time in days."
        importance="Ensures sufficient time for methanogens to break down volatile acids into methane gas and stabilize the sludge.">
    </process-calculator>
</div>
<script>
if (!customElements.get('weather-widget')) {
class WeatherWidget extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <h3>Local Station Telemetry</h3>
            <span class="scada-meta" id="weather-status">Acquiring signal...</span>
            <div class="weather-data" id="weather-content" style="display: none;">
                <div>
                    <div style="color: var(--primary); font-weight: bold;" id="weather-desc">--</div>
                    <div style="font-size: 0.85rem; color: var(--secondary);" id="weather-details">--</div>
                </div>
                <div style="text-align: right;">
                    <div class="weather-temp" id="weather-temp">--°F</div>
                    <div style="font-size: 0.85rem; color: var(--secondary); font-weight: bold;" id="weather-feels-like">Feels like --°F</div>
                </div>
            </div>
        `;
        this.fetchWeather();
    }

    getWeatherCondition(code) {
        const conditions = {
            0: 'Clear sky',
            1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
            45: 'Fog', 48: 'Depositing rime fog',
            51: 'Light Drizzle', 53: 'Moderate Drizzle', 55: 'Dense Drizzle',
            56: 'Light Freezing Drizzle', 57: 'Dense Freezing Drizzle',
            61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
            66: 'Light Freezing Rain', 67: 'Heavy Freezing Rain',
            71: 'Slight Snow', 73: 'Moderate Snow', 75: 'Heavy Snow',
            77: 'Snow Grains',
            80: 'Slight Rain Showers', 81: 'Moderate Rain Showers', 82: 'Violent Rain Showers',
            85: 'Slight Snow Showers', 86: 'Heavy Snow Showers',
            95: 'Thunderstorm', 96: 'Thunderstorm (slight hail)', 99: 'Thunderstorm (heavy hail)'
        };
        return conditions[code] || 'Unknown Conditions';
    }

    async fetchWeather() {
        try {
            const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=39.29&longitude=-76.61&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph');
            const data = await res.json();

            const feelsLike = Math.round(data.current.apparent_temperature);
            let hiColor = '#4CAF50'; // Green (Safe)
            let hiWarning = '';

            if (feelsLike >= 115) { hiColor = '#E91E63'; hiWarning = ' - EXTREME DANGER'; } // Fuchsia
            else if (feelsLike >= 103) { hiColor = '#F44336'; hiWarning = ' - DANGER'; } // Red
            else if (feelsLike >= 90) { hiColor = '#FF9800'; hiWarning = ' - EXTREME CAUTION'; } // Orange
            else if (feelsLike >= 80) { hiColor = '#FFC107'; hiWarning = ' - CAUTION'; } // Yellow

            document.getElementById('weather-status').style.display = 'none';
            document.getElementById('weather-content').style.display = 'flex';
            document.getElementById('weather-temp').innerText = `${Math.round(data.current.temperature_2m)}°F`;

            const feelsLikeEl = document.getElementById('weather-feels-like');
            feelsLikeEl.innerText = `Feels like ${feelsLike}°F${hiWarning}`;
            feelsLikeEl.style.color = hiColor;

            document.getElementById('weather-details').innerText = `Wind: ${Math.round(data.current.wind_speed_10m)} mph`;
            document.getElementById('weather-desc').innerText = this.getWeatherCondition(data.current.weather_code);
        } catch (error) {
            document.getElementById('weather-status').innerText = 'Telemetry offline. Unable to fetch weather.';
        }
    }

    customElements.define('weather-widget', WeatherWidget);
}
}

if (!customElements.get('process-calculator')) {
class ProcessCalculator extends HTMLElement {
connectedCallback() {
this.type = this.getAttribute('type');
this.title = this.getAttribute('title');
this.desc = this.getAttribute('desc');
this.importance = this.getAttribute('importance');
this.render();
this.addEventListener('input', this.calculate.bind(this));
}
render() {
let fields = '';
if (this.type === 'svi') {
fields = `                 ${this.createInput('ssv', 'Settled Sludge Volume (mL/L)')}
                ${this.createInput('mlss', 'MLSS (mg/L)')}
            `;
} else if (this.type === 'fm') {
fields = `                 ${this.createInput('flow', 'Plant Flow (MGD)')}
                ${this.createInput('bod', 'Primary Effluent BOD (mg/L)')}
                ${this.createInput('vol', 'Aeration Volume (MG)')}
                ${this.createInput('mlvss', 'MLVSS (mg/L)')}
            `;
} else if (this.type === 'mcrt') {
fields = `                 ${this.createInput('vol', 'Aeration Volume (MG)')}
                ${this.createInput('mlss', 'MLSS (mg/L)')}
                ${this.createInput('wasFlow', 'WAS Flow (MGD)')}
                ${this.createInput('wasTss', 'WAS TSS (mg/L)')}
                ${this.createInput('effFlow', 'Effluent Flow (MGD)')}
                ${this.createInput('effTss', 'Effluent TSS (mg/L)')}
            `;
} else if (this.type === 'slr') {
fields = `                 ${this.createInput('flow', 'Plant Flow (MGD)')}
                ${this.createInput('area', 'Surface Area (sq ft)')}
            `;
} else if (this.type === 'hrt') {
fields = `                 ${this.createInput('vol', 'Tank Volume (MG)')}
                ${this.createInput('flow', 'Plant Flow (MGD)')}
            `;
} else if (this.type === 'dosing') {
fields = `                 ${this.createInput('flow', 'Plant Flow (MGD)')}
                ${this.createInput('concentration', 'Chemical Concentration (mg/L)')}
            `;
} else if (this.type === 'wor') {
fields = `                 ${this.createInput('flow', 'Plant Flow (MGD)')}
                ${this.createInput('length', 'Total Weir Length (ft)')}
            `;
} else if (this.type === 'bodLoad') {
fields = `                 ${this.createInput('flow', 'Plant Flow (MGD)')}
                ${this.createInput('concentration', 'Concentration (mg/L)')}
            `;
} else if (this.type === 'solidsLoad') {
fields = `                 ${this.createInput('flow', 'Sludge Feed Flow (MGD)')}
                ${this.createInput('tss', 'Sludge Feed TSS (mg/L)')}
                ${this.createInput('area', 'Unit Surface Area (sq ft)')}
            `;
} else if (this.type === 'vsr') {
fields = `                 ${this.createInput('rawVs', 'Raw Sludge VS (%)')}
                ${this.createInput('digVs', 'Digested Sludge VS (%)')}
            `;
} else if (this.type === 'vsLoading') {
fields = `                 ${this.createInput('vsFeed', 'VS Feed Rate (lbs/day)')}
                ${this.createInput('volCuFt', 'Digester Volume (cu ft)')}
            `;
} else if (this.type === 'digDt') {
fields = `                 ${this.createInput('vol', 'Digester Volume (MG)')}
                ${this.createInput('flow', 'Sludge Feed Flow (MGD)')}
            `;
}
this.innerHTML = `            <div class="scada-panel" style="height: 100%; display: flex; flex-direction: column;">
                <h3>${this.title}</h3>
                <span class="scada-meta" style="margin-bottom: 15px;">${this.desc}</span>
                <div style="flex-grow: 1;">
                    ${fields}
                    <div class="result-display" id="res-${this.type}">0.00</div>
                </div>
                ${this.importance ?`<div class="scada-importance"><strong>Process Impact:</strong> ${this.importance}</div>` : ''}
            </div>
        `;
    }
    createInput(id, label) {
        return `
            <div class="scada-form-group">
                <label>${label}</label>
<input type="number" class="scada-input" id="${this.type}-${id}" placeholder="0" step="any">
</div>
`;
    }
    calculate() {
        const val = (id) => parseFloat(this.querySelector(`#${this.type}-${id}`).value) || 0;
        let result = 0;
        if (this.type === 'svi') {
            const ssv = val('ssv'), mlss = val('mlss');
            if (mlss > 0) result = (ssv / mlss) * 1000;
        } else if (this.type === 'fm') {
            const flow = val('flow'), bod = val('bod'), vol = val('vol'), mlvss = val('mlvss');
            if (vol > 0 && mlvss > 0) result = (flow * bod) / (vol * mlvss);
        } else if (this.type === 'mcrt') {
            const vol = val('vol'), mlss = val('mlss');
            const wasFlow = val('wasFlow'), wasTss = val('wasTss');
            const effFlow = val('effFlow'), effTss = val('effTss');
            const inventory = vol * mlss;
            const waste = (wasFlow * wasTss) + (effFlow * effTss);
            if (waste > 0) result = inventory / waste;
        } else if (this.type === 'slr') {
            const flow = val('flow'), area = val('area');
            if (area > 0) result = (flow * 1000000) / area;
        } else if (this.type === 'hrt') {
            const vol = val('vol'), flow = val('flow');
            if (flow > 0) result = (vol / flow) * 24;
        } else if (this.type === 'dosing') {
            const flow = val('flow'), concentration = val('concentration');
            result = flow * concentration * 8.34;
        } else if (this.type === 'wor') {
            const flow = val('flow'), length = val('length');
            if (length > 0) result = (flow * 1000000) / length;
        } else if (this.type === 'bodLoad') {
            const flow = val('flow'), concentration = val('concentration');
            result = flow * concentration * 8.34;
        } else if (this.type === 'solidsLoad') {
            const flow = val('flow'), tss = val('tss'), area = val('area');
            if (area > 0) result = (flow * tss * 8.34) / area;
        } else if (this.type === 'vsr') {
            const rawVs = val('rawVs') / 100, digVs = val('digVs') / 100;
            if (rawVs > 0 && (rawVs - (rawVs * digVs)) > 0) {
                result = ((rawVs - digVs) / (rawVs - (rawVs * digVs))) * 100;
            }
        } else if (this.type === 'vsLoading') {
            const vsFeed = val('vsFeed'), vol = val('volCuFt');
            if (vol > 0) result = vsFeed / vol;
        } else if (this.type === 'digDt') {
            const vol = val('vol'), flow = val('flow');
            if (flow > 0) result = vol / flow;
        }
        this.querySelector(`#res-${this.type}`).innerText = (this.type === 'vsr') ? result.toFixed(1) + '%' : result.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

    customElements.define('process-calculator', ProcessCalculator);
}
}
</script>

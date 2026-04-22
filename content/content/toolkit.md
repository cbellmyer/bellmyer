---
title: "Operator Toolkit"
date: 2024-06-15
draft: false
layout: "page"
menu:
  main:
    name: "Toolkit"
    weight: 30
---

<style>
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
</style>

<!-- Modular Web Components -->

<weather-widget class="scada-panel" style="display: block;"></weather-widget>

<div class="toolkit-grid">
    <process-calculator
        type="svi"
        title="Sludge Volume Index (SVI)"
        desc="Calculates the settling characteristics of activated sludge (mL/g).">
    </process-calculator>

    <process-calculator
        type="fm"
        title="F/M Ratio"
        desc="Calculates the Food-to-Microorganism ratio.">
    </process-calculator>

    <process-calculator
        type="mcrt"
        title="MCRT (Days)"
        desc="Mean Cell Residence Time / Sludge Age calculation.">
    </process-calculator>

</div>

<script>
/**
 * Weather Widget Component
 * Fetches local weather based on IP geolocation using free APIs.
 */
class WeatherWidget extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <h3>Local Station Telemetry</h3>
            <span class="scada-meta" id="weather-status">Acquiring signal...</span>
            <div class="weather-data" id="weather-content" style="display: none;">
                <div>
                    <div style="color: var(--primary);" id="weather-desc">--</div>
                    <div style="font-size: 0.85rem; color: var(--secondary);" id="weather-wind">--</div>
                </div>
                <div class="weather-temp" id="weather-temp">--°F</div>
            </div>
        `;
        this.fetchWeather();
    }

    async fetchWeather() {
        try {
            // Open-Meteo allows free, keyless API calls. Defaulting to Baltimore/MD coordinates roughly.
            const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=39.29&longitude=-76.61&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph');
            const data = await res.json();

            document.getElementById('weather-status').style.display = 'none';
            document.getElementById('weather-content').style.display = 'flex';
            document.getElementById('weather-temp').innerText = `${data.current_weather.temperature}°F`;
            document.getElementById('weather-wind').innerText = `Wind: ${data.current_weather.windspeed} mph`;
            document.getElementById('weather-desc').innerText = `Status: ACTIVE (Code ${data.current_weather.weathercode})`;
        } catch (error) {
            document.getElementById('weather-status').innerText = 'Telemetry offline. Unable to fetch weather.';
        }
    }
}
customElements.define('weather-widget', WeatherWidget);

/**
 * Process Calculator Component
 * Modular component to handle specific wastewater calculations.
 */
class ProcessCalculator extends HTMLElement {
    connectedCallback() {
        this.type = this.getAttribute('type');
        this.title = this.getAttribute('title');
        this.desc = this.getAttribute('desc');
        this.render();
        this.addEventListener('input', this.calculate.bind(this));
    }

    render() {
        let fields = '';
        if (this.type === 'svi') {
            fields = `
                ${this.createInput('ssv', 'Settled Sludge Volume (mL/L)')}
                ${this.createInput('mlss', 'MLSS (mg/L)')}
            `;
        } else if (this.type === 'fm') {
            fields = `
                ${this.createInput('flow', 'Plant Flow (MGD)')}
                ${this.createInput('bod', 'Primary Effluent BOD (mg/L)')}
                ${this.createInput('vol', 'Aeration Volume (MG)')}
                ${this.createInput('mlvss', 'MLVSS (mg/L)')}
            `;
        } else if (this.type === 'mcrt') {
            fields = `
                ${this.createInput('vol', 'Aeration Volume (MG)')}
                ${this.createInput('mlss', 'MLSS (mg/L)')}
                ${this.createInput('wasFlow', 'WAS Flow (MGD)')}
                ${this.createInput('wasTss', 'WAS TSS (mg/L)')}
                ${this.createInput('effFlow', 'Effluent Flow (MGD)')}
                ${this.createInput('effTss', 'Effluent TSS (mg/L)')}
            `;
        }

        this.innerHTML = `
            <div class="scada-panel" style="height: 100%;">
                <h3>${this.title}</h3>
                <span class="scada-meta" style="margin-bottom: 15px;">${this.desc}</span>
                ${fields}
                <div class="result-display" id="res-${this.type}">0.00</div>
            </div>
        `;
    }

    createInput(id, label) {
        return `
            <div class="scada-form-group">
                <label>${label}</label>
                <input type="number" class="scada-input" id="${this.type}-${id}" placeholder="0">
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
        }

        this.querySelector(`#res-${this.type}`).innerText = result.toFixed(2);
    }
}
customElements.define('process-calculator', ProcessCalculator);
</script>

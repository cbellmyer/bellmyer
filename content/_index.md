---
title: "Home"
layout: "home"
---

<style>
    @keyframes fadeSlideUp {
        0% { opacity: 0; transform: translateY(15px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-slide-up {
        animation: fadeSlideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        opacity: 0;
    }
    .hero-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 4rem;
    }
    .hero-headline {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        color: var(--primary);
    }
    .hero-subheadline {
        color: var(--secondary);
        font-size: 1.2rem;
        font-weight: normal;
        line-height: 1.6;
        max-width: 650px;
        margin: 0 auto;
    }
    .content-section {
        margin-bottom: 2.5rem;
    }
</style>

<div class="hero-section">
    {{< img src="images/profile.jpg" alt="Chris Bellmyer Headshot" >}}
    <h1 class="hero-headline">Chris Bellmyer</h1>
    <h2 class="hero-subheadline">Wastewater Reclamation Plant Operator III</h2>
    <p class="hero-subheadline animate-fade-slide-up" style="animation-delay: 0.15s; margin-top: 1rem;">
        Specializing in advanced process control calculations, biological nutrient removal (BNR), and hands-on operational troubleshooting to drive system optimization.
    </p>
</div>

<div class="scada-panel content-section animate-fade-slide-up" style="animation-delay: 0.3s;">
    <h3>Leadership & Incident Command</h3>
    <span class="scada-meta">Executive Experience</span>
    <div class="scada-desc">
        <p>Drawing from my background as a President, I leverage Incident Command System (ICS) principles to manage high-pressure, critical events effectively. This executive leadership experience translates directly to strategic operational planning, rapid decision-making during emergencies, and the continuous development of high-performing, resilient teams.</p>
    </div>
</div>

<div class="scada-system-overview content-section animate-fade-slide-up" style="animation-delay: 0.45s;">
    <h3 style="text-transform: uppercase; letter-spacing: 0.5px; color: var(--primary);">Current Mission & Focus</h3>
    <p>I am deeply committed to advancing the wastewater treatment industry by building modern, accessible resources that empower operators in the field. Active projects include:</p>
    <div class="scada-desc">
        <ul>
            <li><strong>Technical Troubleshooting Matrix:</strong> A systematic framework designed to streamline problem-solving and rapid diagnosis for mechanical and biological process deviations.</li>
            <li><strong>Digital Toolkit for Wastewater Operators:</strong> A comprehensive suite of digital resources and calculators built to improve daily efficiency and support data-driven decision-making.</li>
        </ul>
    </div>
</div>

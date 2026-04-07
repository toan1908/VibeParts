// Circuit Analysis (Advanced)

export const ANALYSIS_DATA = {
  wheatstone: {
    title: 'Cầu Wheatstone (Wheatstone Bridge)',
    description: 'Tính toán điện trở chưa biết hoặc điện áp lệch của cầu cân bằng/không cân bằng.',
    visual: `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Top -->
      <text x="100" y="15" font-size="10" fill="var(--accent-orange)" text-anchor="middle" font-weight="600">+ Vin</text>
      <line x1="100" y1="20" x2="100" y2="40" stroke="var(--primary)" stroke-width="2"/>
      <circle cx="100" cy="40" r="3" fill="var(--primary)"/>
      <!-- Left branch R1 -->
      <line x1="100" y1="40" x2="50" y2="65" stroke="var(--primary)" stroke-width="2"/>
      <rect x="60" y="45" width="25" height="14" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="1.5" transform="rotate(-30,72,52)"/>
      <text x="55" y="48" font-size="10" fill="var(--primary)" font-weight="600">R1</text>
      <!-- Right branch R2 -->
      <line x1="100" y1="40" x2="150" y2="65" stroke="var(--primary)" stroke-width="2"/>
      <text x="140" y="48" font-size="10" fill="var(--primary)" font-weight="600">R2</text>
      <!-- Left node A -->
      <circle cx="50" cy="100" r="3" fill="var(--primary)"/>
      <line x1="50" y1="65" x2="50" y2="100" stroke="var(--primary)" stroke-width="2"/>
      <!-- Right node B -->
      <circle cx="150" cy="100" r="3" fill="var(--primary)"/>
      <line x1="150" y1="65" x2="150" y2="100" stroke="var(--primary)" stroke-width="2"/>
      <!-- Galvanometer -->
      <line x1="50" y1="100" x2="150" y2="100" stroke="var(--accent-orange)" stroke-width="1.5" stroke-dasharray="4,3"/>
      <circle cx="100" cy="100" r="12" fill="var(--bg-input)" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <text x="100" y="104" font-size="11" fill="var(--accent-orange)" text-anchor="middle" font-weight="600">G</text>
      <!-- Bottom left R3 -->
      <line x1="50" y1="100" x2="50" y2="135" stroke="var(--primary)" stroke-width="2"/>
      <line x1="50" y1="135" x2="100" y2="160" stroke="var(--primary)" stroke-width="2"/>
      <text x="55" y="148" font-size="10" fill="var(--primary)" font-weight="600">R3</text>
      <!-- Bottom right Rx -->
      <line x1="150" y1="100" x2="150" y2="135" stroke="var(--primary)" stroke-width="2"/>
      <line x1="150" y1="135" x2="100" y2="160" stroke="var(--primary)" stroke-width="2"/>
      <text x="140" y="148" font-size="10" fill="var(--accent-green)" font-weight="700">Rx</text>
      <!-- Bottom -->
      <circle cx="100" cy="160" r="3" fill="var(--primary)"/>
      <line x1="100" y1="160" x2="100" y2="180" stroke="var(--primary)" stroke-width="2"/>
      <line x1="88" y1="180" x2="112" y2="180" stroke="var(--primary)" stroke-width="2"/>
      <line x1="92" y1="185" x2="108" y2="185" stroke="var(--primary)" stroke-width="1.5"/>
      <text x="100" y="198" font-size="9" fill="var(--text-muted)" text-anchor="middle">Rx = R2×R3/R1</text>
    </svg>`,
    html: `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="calc-input-group"><label>Vin</label><input type="number" id="wbVin" value="5"><span class="unit">V</span></div>
        <div class="calc-input-group"><label>R1</label><input type="number" id="wbR1"><span class="unit">Ω</span></div>
        <div class="calc-input-group"><label>R2</label><input type="number" id="wbR2"><span class="unit">Ω</span></div>
        <div class="calc-input-group"><label>R3</label><input type="number" id="wbR3"><span class="unit">Ω</span></div>
        <div class="calc-input-group"><label>Rx (Cần tìm)</label><input type="number" id="wbRx"><span class="unit">Ω</span></div>
      </div>
      <button class="btn btn-primary" id="calcWbBtn" style="margin-top:12px; width:100%">Tính Toán</button>
      <div class="calc-result" id="wbResult" style="display:none;"></div>
    `
  },
  resonance: {
    title: 'Tần số cộng hưởng (LC Resonance)',
    description: 'Tính toán tần số cộng hưởng f₀ = 1 / (2π√(LC)).',
    visual: `<svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Parallel LC -->
      <line x1="50" y1="20" x2="50" y2="40" stroke="var(--primary)" stroke-width="2"/>
      <line x1="50" y1="20" x2="150" y2="20" stroke="var(--primary)" stroke-width="2"/>
      <line x1="150" y1="20" x2="150" y2="40" stroke="var(--primary)" stroke-width="2"/>
      <!-- Inductor L (left) -->
      <path d="M50 40 Q57 50 50 60 Q43 70 50 80 Q57 90 50 100" stroke="var(--primary)" stroke-width="2" fill="none"/>
      <text x="35" y="75" font-size="12" fill="var(--primary)" text-anchor="end" font-weight="600">L</text>
      <!-- Capacitor C (right) -->
      <line x1="150" y1="40" x2="150" y2="60" stroke="var(--primary)" stroke-width="2"/>
      <line x1="138" y1="60" x2="162" y2="60" stroke="var(--primary)" stroke-width="2.5"/>
      <line x1="138" y1="68" x2="162" y2="68" stroke="var(--primary)" stroke-width="2.5"/>
      <line x1="150" y1="68" x2="150" y2="100" stroke="var(--primary)" stroke-width="2"/>
      <text x="168" y="68" font-size="12" fill="var(--primary)" font-weight="600">C</text>
      <!-- Bottom -->
      <line x1="50" y1="100" x2="150" y2="100" stroke="var(--primary)" stroke-width="2"/>
      <!-- Formula -->
      <text x="100" y="130" font-size="11" fill="var(--text-muted)" text-anchor="middle" font-weight="600">f₀ = 1 / (2π√LC)</text>
      <!-- Resonance curve -->
      <path d="M30 150 Q100 100 170 150" stroke="var(--accent-orange)" stroke-width="1.5" fill="none"/>
      <line x1="100" y1="108" x2="100" y2="155" stroke="var(--accent-orange)" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="100" y="160" font-size="8" fill="var(--accent-orange)" text-anchor="middle">f₀</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>Cuộn cảm (L)</label><input type="number" id="resL"><span class="unit">mH</span></div>
      <div class="calc-input-group"><label>Tụ điện (C)</label><input type="number" id="resC"><span class="unit">µF</span></div>
      <button class="btn btn-primary" id="calcResBtn" style="margin-top:8px; width:100%">Tính f₀</button>
      <div class="calc-result" id="resResult" style="display:none;"></div>
    `
  }
};

export function bindAnalysis(calcId) {
  if (calcId === 'wheatstone') bindWheatstone();
  if (calcId === 'resonance') bindResonance();
}

function bindWheatstone() {
  document.getElementById('calcWbBtn').addEventListener('click', () => {
    let vin = parseFloat(document.getElementById('wbVin').value);
    let r1 = parseFloat(document.getElementById('wbR1').value);
    let r2 = parseFloat(document.getElementById('wbR2').value);
    let r3 = parseFloat(document.getElementById('wbR3').value);
    let rx = parseFloat(document.getElementById('wbRx').value);

    const res = document.getElementById('wbResult'); res.style.display = 'block';
    if (!isNaN(vin) && !isNaN(r1) && !isNaN(r2) && !isNaN(r3) && !isNaN(rx)) {
      let va = vin * (r3 / (r1 + r3));
      let vb = vin * (rx / (r2 + rx));
      let vgalv = va - vb;
      let balanced = Math.abs(vgalv) < 0.0001;
      res.innerHTML = `<h4>Điện áp lệch (Vg):</h4><div class="calc-result-value">${vgalv.toFixed(4)} V</div>
        <div style="font-size:12px; color:${balanced ? 'var(--accent-green)' : 'var(--accent-orange)'}; margin-top:4px;">${balanced ? '✓ Cầu cân bằng' : '⚠ Cầu không cân bằng'}</div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
          <strong>Công thức:</strong><br>
          Va = Vin × R3/(R1+R3) = ${vin} × ${r3}/(${r1}+${r3}) = <strong>${va.toFixed(4)} V</strong><br>
          Vb = Vin × Rx/(R2+Rx) = ${vin} × ${rx}/(${r2}+${rx}) = <strong>${vb.toFixed(4)} V</strong><br>
          Vg = Va − Vb = ${va.toFixed(4)} − ${vb.toFixed(4)} = <strong>${vgalv.toFixed(4)} V</strong>
        </div>`;
    } else if (!isNaN(r1) && !isNaN(r2) && !isNaN(r3)) {
      rx = (r2 * r3) / r1;
      document.getElementById('wbRx').value = rx.toFixed(2);
      res.innerHTML = `<h4>Rx cân bằng:</h4><div class="calc-result-value">${rx.toFixed(2)} Ω</div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
          <strong>Công thức (cầu cân bằng):</strong> Rx = R2 × R3 / R1<br>
          Rx = ${r2} × ${r3} / ${r1} = ${r2*r3} / ${r1} = <strong>${rx.toFixed(2)} Ω</strong>
        </div>`;
    } else {
      res.innerHTML = '<div style="color:var(--accent-red)">Vui lòng nhập đủ R1, R2, R3 (và Rx nếu muốn tính Vg).</div>';
    }
  });
}

function bindResonance() {
  document.getElementById('calcResBtn').addEventListener('click', () => {
    let l_mH = parseFloat(document.getElementById('resL').value);
    let c_uF = parseFloat(document.getElementById('resC').value);
    if (isNaN(l_mH) || isNaN(c_uF)) return;
    let l = l_mH / 1000; let c = c_uF / 1e6;
    let f0 = 1 / (2 * Math.PI * Math.sqrt(l * c));
    let fStr = f0 > 1e6 ? (f0/1e6).toFixed(2)+' MHz' : f0 > 1000 ? (f0/1000).toFixed(2)+' kHz' : f0.toFixed(2)+' Hz';
    let omega = 2 * Math.PI * f0;
    const res = document.getElementById('resResult'); res.style.display = 'block';
    res.innerHTML = `<h4>Tần số cộng hưởng (f₀):</h4><div class="calc-result-value">${fStr}</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> f₀ = 1 / (2π × √(L×C))<br>
        f₀ = 1 / (2π × √(${l_mH}mH × ${c_uF}µF))<br>
        f₀ = 1 / (2π × √(${(l*c).toExponential(4)}))<br>
        f₀ = 1 / (2π × ${Math.sqrt(l*c).toExponential(4)}) = <strong>${fStr}</strong><br>
        ω₀ = 2πf₀ = <strong>${omega.toFixed(1)} rad/s</strong>
      </div>`;
  });
}

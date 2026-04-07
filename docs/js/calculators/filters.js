// Active Filters (Sallen-Key)

export const FILTER_DATA = {
  filterLP: {
    title: 'Bộ lọc Thông thấp (Active Low-pass)',
    description: 'Tính toán tần số cắt (fc) và hệ số phẩm chất (Q) của bộ lọc Sallen-Key bậc 2.',
    visual: `<svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 100 L60 100 L80 60 L100 60 L180 60" stroke="var(--accent-red)" stroke-width="2.5" fill="none"/>
      <path d="M10 60 L180 60" stroke="var(--border-color)" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="30" y="50" font-size="11" fill="var(--text-secondary)">Passband</text>
      <text x="120" y="95" font-size="11" fill="var(--accent-red)">Stopband</text>
      <path d="M80 55 V105" stroke="var(--primary)" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="75" y="115" font-size="10" fill="var(--primary)" text-anchor="middle">fc</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>R1</label><input type="number" id="lpR1" value="10000"><span class="unit">Ω</span></div>
      <div class="calc-input-group"><label>R2</label><input type="number" id="lpR2" value="10000"><span class="unit">Ω</span></div>
      <div class="calc-input-group"><label>C1</label><input type="number" id="lpC1" value="0.01"><span class="unit">µF</span></div>
      <div class="calc-input-group"><label>C2</label><input type="number" id="lpC2" value="0.01"><span class="unit">µF</span></div>
      <button class="btn btn-primary" id="calcLpBtn" style="margin-top:8px; width:100%">Tính fc</button>
      <div class="calc-result" id="lpResult" style="display:none;"></div>
    `
  },
  filterHP: {
    title: 'Bộ lọc Thông cao (Active High-pass)',
    description: 'Tính toán fc và Q cho bộ lọc Sallen-Key bậc 2 thông cao.',
    visual: `<svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 60 L80 60 L100 60 L120 100 L180 100" stroke="var(--primary)" stroke-width="2.5" fill="none"/>
      <path d="M10 60 L180 60" stroke="var(--border-color)" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="20" y="95" font-size="11" fill="var(--primary)">Stopband</text>
      <text x="130" y="50" font-size="11" fill="var(--text-secondary)">Passband</text>
      <path d="M100 55 V105" stroke="var(--accent-orange)" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="100" y="115" font-size="10" fill="var(--accent-orange)" text-anchor="middle">fc</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>R1</label><input type="number" id="hpR1" value="10000"><span class="unit">Ω</span></div>
      <div class="calc-input-group"><label>R2</label><input type="number" id="hpR2" value="10000"><span class="unit">Ω</span></div>
      <div class="calc-input-group"><label>C1</label><input type="number" id="hpC1" value="0.01"><span class="unit">µF</span></div>
      <div class="calc-input-group"><label>C2</label><input type="number" id="hpC2" value="0.01"><span class="unit">µF</span></div>
      <button class="btn btn-primary" id="calcHpBtn" style="margin-top:8px; width:100%">Tính fc</button>
      <div class="calc-result" id="hpResult" style="display:none;"></div>
    `
  }
};

export function bindFilter(calcId) {
  if (calcId === 'filterLP') bindLp();
  if (calcId === 'filterHP') bindHp();
}

function formatFreq(f) {
  if (f >= 1e6) return (f/1e6).toFixed(2) + ' MHz';
  if (f >= 1e3) return (f/1e3).toFixed(2) + ' kHz';
  return f.toFixed(2) + ' Hz';
}

function bindLp() {
  document.getElementById('calcLpBtn').addEventListener('click', () => {
    let r1 = parseFloat(document.getElementById('lpR1').value);
    let r2 = parseFloat(document.getElementById('lpR2').value);
    let c1 = parseFloat(document.getElementById('lpC1').value) * 1e-6;
    let c2 = parseFloat(document.getElementById('lpC2').value) * 1e-6;
    if (isNaN(r1) || isNaN(r2) || isNaN(c1) || isNaN(c2)) return;
    let fc = 1 / (2 * Math.PI * Math.sqrt(r1 * r2 * c1 * c2));
    let q = Math.sqrt(r1 * r2 * c1 * c2) / (c2 * (r1 + r2));
    const res = document.getElementById('lpResult'); res.style.display = 'block';
    let c1_orig = parseFloat(document.getElementById('lpC1').value);
    let c2_orig = parseFloat(document.getElementById('lpC2').value);
    res.innerHTML = `<h4>Tần số cắt (fc):</h4><div class="calc-result-value">${formatFreq(fc)}</div>
      <div style="font-size:13px; color:var(--text-muted); margin-top:4px;">• Q-factor: <strong>${q.toFixed(3)}</strong></div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức Sallen-Key LPF:</strong><br>
        fc = 1 / (2π × √(R1×R2×C1×C2))<br>
        fc = 1 / (2π × √(${r1}×${r2}×${c1_orig}µF×${c2_orig}µF))<br>
        fc = <strong>${formatFreq(fc)}</strong><br>
        Q = √(R1×R2×C1×C2) / (C2×(R1+R2)) = <strong>${q.toFixed(3)}</strong>
      </div>`;
  });
}

function bindHp() {
  document.getElementById('calcHpBtn').addEventListener('click', () => {
    let r1 = parseFloat(document.getElementById('hpR1').value);
    let r2 = parseFloat(document.getElementById('hpR2').value);
    let c1 = parseFloat(document.getElementById('hpC1').value) * 1e-6;
    let c2 = parseFloat(document.getElementById('hpC2').value) * 1e-6;
    if (isNaN(r1) || isNaN(r2) || isNaN(c1) || isNaN(c2)) return;
    let fc = 1 / (2 * Math.PI * Math.sqrt(r1 * r2 * c1 * c2));
    let q = Math.sqrt(r1 * r2 * c1 * c2) / (r1 * (c1 + c2));
    const res = document.getElementById('hpResult'); res.style.display = 'block';
    let c1_orig = parseFloat(document.getElementById('hpC1').value);
    let c2_orig = parseFloat(document.getElementById('hpC2').value);
    res.innerHTML = `<h4>Tần số cắt (fc):</h4><div class="calc-result-value">${formatFreq(fc)}</div>
      <div style="font-size:13px; color:var(--text-muted); margin-top:4px;">• Q-factor: <strong>${q.toFixed(3)}</strong></div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức Sallen-Key HPF:</strong><br>
        fc = 1 / (2π × √(R1×R2×C1×C2))<br>
        fc = 1 / (2π × √(${r1}×${r2}×${c1_orig}µF×${c2_orig}µF))<br>
        fc = <strong>${formatFreq(fc)}</strong><br>
        Q = √(R1×R2×C1×C2) / (R1×(C1+C2)) = <strong>${q.toFixed(3)}</strong>
      </div>`;
  });
}

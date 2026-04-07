// Circuit Analysis Calculators

export const CIRCUITS_DATA = {
  rcTime: {
    title: 'Hằng số thời gian RC',
    description: 'Tính thời gian nạp/xả τ (Tau) và tần số cắt của mạch lọc RC.',
    visual: `<svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Input -->
      <line x1="10" y1="50" x2="40" y2="50" stroke="var(--primary)" stroke-width="2"/>
      <text x="10" y="40" font-size="11" fill="var(--text-muted)">Vin</text>
      <!-- Resistor R -->
      <rect x="40" y="40" width="45" height="20" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="62" y="54" font-size="11" fill="var(--primary)" text-anchor="middle" font-weight="600">R</text>
      <!-- Wire to junction -->
      <line x1="85" y1="50" x2="120" y2="50" stroke="var(--primary)" stroke-width="2"/>
      <circle cx="120" cy="50" r="3" fill="var(--primary)"/>
      <!-- Output -->
      <line x1="120" y1="50" x2="180" y2="50" stroke="var(--accent-orange)" stroke-width="2"/>
      <text x="185" y="54" font-size="11" fill="var(--accent-orange)" font-weight="600">Vout</text>
      <!-- Capacitor C -->
      <line x1="120" y1="50" x2="120" y2="80" stroke="var(--primary)" stroke-width="2"/>
      <line x1="108" y1="80" x2="132" y2="80" stroke="var(--primary)" stroke-width="2.5"/>
      <line x1="108" y1="88" x2="132" y2="88" stroke="var(--primary)" stroke-width="2.5"/>
      <text x="138" y="88" font-size="11" fill="var(--primary)" font-weight="600">C</text>
      <line x1="120" y1="88" x2="120" y2="110" stroke="var(--primary)" stroke-width="2"/>
      <!-- GND -->
      <line x1="10" y1="110" x2="180" y2="110" stroke="var(--primary)" stroke-width="2"/>
      <line x1="108" y1="118" x2="132" y2="118" stroke="var(--primary)" stroke-width="2"/>
      <line x1="113" y1="123" x2="127" y2="123" stroke="var(--primary)" stroke-width="1.5"/>
      <text x="100" y="148" font-size="10" fill="var(--text-muted)" text-anchor="middle">τ = R × C</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>Điện trở R</label><input type="number" id="rcR" placeholder="Ω"><span class="unit">Ω</span></div>
      <div class="calc-input-group"><label>Tụ điện C</label><input type="number" id="rcC" placeholder="µF"><span class="unit">µF</span></div>
      <button class="btn btn-primary" id="calcRcBtn" style="margin-top:8px; width:100%">Tính Toán</button>
      <div class="calc-result" id="rcResult" style="display:none;"></div>
    `
  },
  ledResistor: {
    title: 'Trở hạn dòng LED',
    description: 'Tính toán điện trở bảo vệ LED (Vs, Vf, I).',
    visual: `<svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Source -->
      <text x="10" y="50" font-size="11" fill="var(--accent-orange)" font-weight="600">+Vs</text>
      <line x1="30" y1="55" x2="50" y2="55" stroke="var(--primary)" stroke-width="2"/>
      <!-- Resistor -->
      <rect x="50" y="45" width="45" height="20" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="72" y="59" font-size="11" fill="var(--primary)" text-anchor="middle" font-weight="600">R</text>
      <!-- Wire -->
      <line x1="95" y1="55" x2="120" y2="55" stroke="var(--primary)" stroke-width="2"/>
      <!-- LED triangle -->
      <polygon points="120,42 120,68 145,55" fill="var(--accent-red)" fill-opacity="0.3" stroke="var(--accent-red)" stroke-width="2"/>
      <line x1="145" y1="42" x2="145" y2="68" stroke="var(--accent-red)" stroke-width="2"/>
      <!-- LED arrows (light) -->
      <line x1="135" y1="38" x2="142" y2="30" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <line x1="140" y1="40" x2="147" y2="32" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <!-- Wire to GND -->
      <line x1="145" y1="55" x2="190" y2="55" stroke="var(--primary)" stroke-width="2"/>
      <!-- GND -->
      <line x1="190" y1="48" x2="190" y2="62" stroke="var(--primary)" stroke-width="2"/>
      <line x1="195" y1="50" x2="195" y2="60" stroke="var(--primary)" stroke-width="1.5"/>
      <line x1="200" y1="52" x2="200" y2="58" stroke="var(--primary)" stroke-width="1"/>
      <!-- Labels -->
      <text x="72" y="85" font-size="10" fill="var(--text-muted)" text-anchor="middle">R = (Vs - Vf) / I</text>
      <text x="132" y="85" font-size="10" fill="var(--accent-red)">LED (Vf)</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>Nguồn (Vs)</label><input type="number" id="ledVs"><span class="unit">V</span></div>
      <div class="calc-input-group"><label>Áp LED (Vf)</label><input type="number" id="ledVf" placeholder="VD: 2V, 3.3V"><span class="unit">V</span></div>
      <div class="calc-input-group"><label>Dòng (I)</label><input type="number" id="ledI" value="20"><span class="unit">mA</span></div>
      <button class="btn btn-primary" id="calcLedBtn" style="margin-top:8px; width:100%">Tính Toán</button>
      <div class="calc-result" id="ledResult" style="display:none;"></div>
    `
  },
  ne555Timer: {
    title: 'Bộ định thời NE555 (Astable)',
    description: 'Tính tần số và Duty Cycle mạch tạo xung vuông.',
    visual: `<svg width="200" height="180" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- IC body -->
      <rect x="60" y="30" width="80" height="100" rx="4" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="100" y="65" font-size="16" fill="var(--primary)" text-anchor="middle" font-weight="800">555</text>
      <text x="100" y="82" font-size="10" fill="var(--text-muted)" text-anchor="middle">Astable</text>
      <!-- Pins -->
      <text x="55" y="50" font-size="9" fill="var(--text-muted)" text-anchor="end">Vcc</text>
      <text x="55" y="75" font-size="9" fill="var(--text-muted)" text-anchor="end">DIS</text>
      <text x="55" y="100" font-size="9" fill="var(--text-muted)" text-anchor="end">THR</text>
      <text x="55" y="125" font-size="9" fill="var(--text-muted)" text-anchor="end">GND</text>
      <text x="145" y="50" font-size="9" fill="var(--text-muted)">OUT</text>
      <text x="145" y="75" font-size="9" fill="var(--text-muted)">RST</text>
      <text x="145" y="100" font-size="9" fill="var(--text-muted)">TRG</text>
      <!-- R1 -->
      <line x1="20" y1="45" x2="20" y2="70" stroke="var(--accent-orange)" stroke-width="2"/>
      <rect x="12" y="50" width="16" height="12" rx="1" fill="var(--accent-orange)" fill-opacity="0.2" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <text x="20" y="44" font-size="9" fill="var(--accent-orange)" text-anchor="middle" font-weight="600">R1</text>
      <!-- R2 -->
      <line x1="20" y1="70" x2="20" y2="95" stroke="var(--accent-orange)" stroke-width="2"/>
      <rect x="12" y="75" width="16" height="12" rx="1" fill="var(--accent-orange)" fill-opacity="0.2" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <text x="6" y="84" font-size="9" fill="var(--accent-orange)" text-anchor="end" font-weight="600">R2</text>
      <!-- C -->
      <line x1="20" y1="95" x2="20" y2="125" stroke="var(--accent-orange)" stroke-width="2"/>
      <line x1="12" y1="105" x2="28" y2="105" stroke="var(--accent-orange)" stroke-width="2"/>
      <line x1="12" y1="110" x2="28" y2="110" stroke="var(--accent-orange)" stroke-width="2"/>
      <text x="6" y="112" font-size="9" fill="var(--accent-orange)" text-anchor="end" font-weight="600">C</text>
      <!-- Output waveform -->
      <path d="M170 45 H180 V35 H188 V45 H196" stroke="var(--accent-green)" stroke-width="2" fill="none"/>
      <!-- Formula -->
      <text x="100" y="155" font-size="9" fill="var(--text-muted)" text-anchor="middle">f = 1.44 / ((R1 + 2R2) × C)</text>
      <text x="100" y="170" font-size="9" fill="var(--text-muted)" text-anchor="middle">Duty = (R1+R2) / (R1+2R2)</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>R1 (kΩ)</label><input type="number" id="neR1"><span class="unit">kΩ</span></div>
      <div class="calc-input-group"><label>R2 (kΩ)</label><input type="number" id="neR2"><span class="unit">kΩ</span></div>
      <div class="calc-input-group"><label>C (µF)</label><input type="number" id="neC"><span class="unit">µF</span></div>
      <button class="btn btn-primary" id="calcNeBtn" style="margin-top:8px; width:100%">Tính Xung</button>
      <div class="calc-result" id="neResult" style="display:none;"></div>
    `
  },
  ne555Mono: {
    title: 'Bộ định thời NE555 (Monostable)',
    description: 'Tính thời gian xung đầu ra (Pulse Width) của mạch đơn ổn.',
    visual: `<svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="30" width="80" height="80" rx="4" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="100" y="60" font-size="16" fill="var(--primary)" text-anchor="middle" font-weight="800">555</text>
      <text x="100" y="78" font-size="10" fill="var(--text-muted)" text-anchor="middle">Monostable</text>
      <!-- R -->
      <rect x="20" y="40" width="16" height="12" rx="1" fill="var(--accent-orange)" fill-opacity="0.2" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <text x="28" y="37" font-size="10" fill="var(--accent-orange)" text-anchor="middle" font-weight="600">R</text>
      <!-- C -->
      <line x1="20" y1="80" x2="20" y2="100" stroke="var(--accent-orange)" stroke-width="2"/>
      <line x1="12" y1="85" x2="28" y2="85" stroke="var(--accent-orange)" stroke-width="2"/>
      <line x1="12" y1="90" x2="28" y2="90" stroke="var(--accent-orange)" stroke-width="2"/>
      <text x="6" y="90" font-size="10" fill="var(--accent-orange)" text-anchor="end" font-weight="600">C</text>
      <!-- Output pulse -->
      <path d="M155 85 H165 V45 H185 V85 H195" stroke="var(--accent-green)" stroke-width="2" fill="none"/>
      <text x="175" y="40" font-size="9" fill="var(--accent-green)" text-anchor="middle">T</text>
      <!-- Formula -->
      <text x="100" y="135" font-size="10" fill="var(--text-muted)" text-anchor="middle" font-weight="600">T = 1.1 × R × C</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>R (kΩ)</label><input type="number" id="nemR"><span class="unit">kΩ</span></div>
      <div class="calc-input-group"><label>C (µF)</label><input type="number" id="nemC"><span class="unit">µF</span></div>
      <button class="btn btn-primary" id="calcNemBtn" style="margin-top:8px; width:100%">Tính Thời Gian T</button>
      <div class="calc-result" id="nemResult" style="display:none;"></div>
    `
  },
  rlcCircuit: {
    title: 'Mạch xoay chiều RLC nối tiếp',
    description: 'Tính tổng trở Z, góc pha và tần số cộng hưởng.',
    visual: `<svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Source AC -->
      <circle cx="20" cy="60" r="12" stroke="var(--primary)" stroke-width="1.5" fill="none"/>
      <text x="20" y="64" font-size="10" fill="var(--primary)" text-anchor="middle">~</text>
      <line x1="32" y1="60" x2="50" y2="60" stroke="var(--primary)" stroke-width="2"/>
      <!-- R -->
      <rect x="50" y="50" width="35" height="20" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="67" y="64" font-size="11" fill="var(--primary)" text-anchor="middle" font-weight="600">R</text>
      <line x1="85" y1="60" x2="100" y2="60" stroke="var(--primary)" stroke-width="2"/>
      <!-- L (inductor) -->
      <path d="M100 60 Q107 45 114 60 Q121 45 128 60 Q135 45 142 60" stroke="var(--primary)" stroke-width="2" fill="none"/>
      <text x="121" y="45" font-size="11" fill="var(--primary)" text-anchor="middle" font-weight="600">L</text>
      <line x1="142" y1="60" x2="155" y2="60" stroke="var(--primary)" stroke-width="2"/>
      <!-- C (capacitor) -->
      <line x1="165" y1="48" x2="165" y2="72" stroke="var(--primary)" stroke-width="2.5"/>
      <line x1="172" y1="48" x2="172" y2="72" stroke="var(--primary)" stroke-width="2.5"/>
      <text x="168" y="42" font-size="11" fill="var(--primary)" text-anchor="middle" font-weight="600">C</text>
      <line x1="155" y1="60" x2="165" y2="60" stroke="var(--primary)" stroke-width="2"/>
      <line x1="172" y1="60" x2="200" y2="60" stroke="var(--primary)" stroke-width="2"/>
      <!-- Return -->
      <line x1="200" y1="60" x2="200" y2="100" stroke="var(--primary)" stroke-width="2"/>
      <line x1="20" y1="72" x2="20" y2="100" stroke="var(--primary)" stroke-width="2"/>
      <line x1="20" y1="100" x2="200" y2="100" stroke="var(--primary)" stroke-width="2"/>
      <!-- Formula -->
      <text x="110" y="115" font-size="9" fill="var(--text-muted)" text-anchor="middle">Z = √(R² + (XL - XC)²)</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>Tần số (f)</label><input type="number" id="rlcF" value="1000"><span class="unit">Hz</span></div>
      <div class="calc-input-group"><label>Điện trở (R)</label><input type="number" id="rlcR"><span class="unit">Ω</span></div>
      <div class="calc-input-group"><label>Cuộn cảm (L)</label><input type="number" id="rlcL"><span class="unit">mH</span></div>
      <div class="calc-input-group"><label>Tụ điện (C)</label><input type="number" id="rlcC"><span class="unit">µF</span></div>
      <button class="btn btn-primary" id="calcRlcBtn" style="margin-top:8px; width:100%">Tính Toán</button>
      <div class="calc-result" id="rlcResult" style="display:none;"></div>
    `
  }
};

export function bindCircuits(calcId) {
  if (calcId === 'rcTime') bindRcTime();
  if (calcId === 'ledResistor') bindLedResistor();
  if (calcId === 'ne555Timer') bindNe555Timer();
  if (calcId === 'ne555Mono') bindNe555Mono();
  if (calcId === 'rlcCircuit') bindRlcCircuit();
}

function bindRcTime() {
  document.getElementById('calcRcBtn').addEventListener('click', () => {
    let r = parseFloat(document.getElementById('rcR').value);
    let c = parseFloat(document.getElementById('rcC').value);
    if (isNaN(r) || isNaN(c)) return;
    let c_F = c * 1e-6;
    let tau = r * c_F; 
    let fcut = 1 / (2 * Math.PI * r * c_F);
    const res = document.getElementById('rcResult'); res.style.display = 'block';
    let tauStr = tau >= 1 ? tau.toFixed(3) + ' s' : (tau * 1000).toFixed(2) + ' ms';
    res.innerHTML = `<h4>Hằng số thời gian (τ):</h4><div class="calc-result-value">${tauStr}</div>
      <div style="font-size:13px; color:var(--text-muted); margin-top:4px;">• Tần số cắt (-3dB): <strong>${fcut.toFixed(2)} Hz</strong></div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong><br>
        τ = R × C = ${r} Ω × ${c} µF = ${r} × ${c}×10⁻⁶ = <strong>${tauStr}</strong><br>
        fc = 1 / (2π × R × C) = 1 / (2π × ${r} × ${c}×10⁻⁶) = <strong>${fcut.toFixed(2)} Hz</strong><br>
        <em>5τ (nạp 99%): ${(tau*5 >= 1 ? (tau*5).toFixed(3)+' s' : (tau*5*1000).toFixed(2)+' ms')}</em>
      </div>`;
  });
}

function bindLedResistor() {
  document.getElementById('calcLedBtn').addEventListener('click', () => {
    let vs = parseFloat(document.getElementById('ledVs').value);
    let vf = parseFloat(document.getElementById('ledVf').value);
    let i_mA = parseFloat(document.getElementById('ledI').value);
    if (isNaN(vs) || isNaN(vf) || isNaN(i_mA) || vs <= vf) return;
    let i = i_mA / 1000;
    let r = (vs - vf) / i;
    let p = (vs - vf) * i;
    const res = document.getElementById('ledResult'); res.style.display = 'block';
    res.innerHTML = `<h4>R cần:</h4><div class="calc-result-value">${r.toFixed(1)} Ω</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> R = (Vs - Vf) / I<br>
        <strong>Thay số:</strong> R = (${vs} - ${vf}) / ${i_mA}mA = ${(vs-vf).toFixed(1)} / ${i.toFixed(4)} = <strong>${r.toFixed(1)} Ω</strong><br>
        Công suất tiêu tán: P = (Vs-Vf) × I = ${(vs-vf).toFixed(1)} × ${i*1000}mA = <strong>${(p*1000).toFixed(1)} mW</strong>
      </div>`;
  });
}

function bindNe555Timer() {
  document.getElementById('calcNeBtn').addEventListener('click', () => {
    let r1_k = parseFloat(document.getElementById('neR1').value);
    let r2_k = parseFloat(document.getElementById('neR2').value);
    let c_uF = parseFloat(document.getElementById('neC').value);
    if (isNaN(r1_k) || isNaN(r2_k) || isNaN(c_uF)) return;
    let r1 = r1_k * 1000; let r2 = r2_k * 1000; let c = c_uF * 1e-6;
    let tH = 0.693 * (r1 + r2) * c;
    let tL = 0.693 * r2 * c;
    let T = tH + tL;
    let f = 1.44 / ((r1 + 2 * r2) * c);
    let duty = ((r1 + r2) / (r1 + 2 * r2)) * 100;
    const res = document.getElementById('neResult'); res.style.display = 'block';
    res.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        <div><h4>Tần số (f)</h4><div class="calc-result-value">${f.toFixed(2)} Hz</div></div>
        <div><h4>Duty Cycle</h4><div class="calc-result-value">${duty.toFixed(1)} %</div></div>
      </div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong><br>
        T_high = 0.693 × (R1+R2) × C = 0.693 × (${r1}+${r2}) × ${c_uF}µF = <strong>${(tH*1000).toFixed(2)} ms</strong><br>
        T_low = 0.693 × R2 × C = 0.693 × ${r2} × ${c_uF}µF = <strong>${(tL*1000).toFixed(2)} ms</strong><br>
        f = 1.44 / ((R1+2R2)×C) = 1.44 / ((${r1}+${2*r2})×${c_uF}µF) = <strong>${f.toFixed(2)} Hz</strong><br>
        Duty = (R1+R2)/(R1+2R2) = (${r1}+${r2})/(${r1}+${2*r2}) = <strong>${duty.toFixed(1)}%</strong>
      </div>`;
  });
}

function bindNe555Mono() {
  document.getElementById('calcNemBtn').addEventListener('click', () => {
    let r_k = parseFloat(document.getElementById('nemR').value);
    let c_uF = parseFloat(document.getElementById('nemC').value);
    if (isNaN(r_k) || isNaN(c_uF)) return;
    let r = r_k * 1000; let c = c_uF * 1e-6;
    let t = 1.1 * r * c;
    const res = document.getElementById('nemResult'); res.style.display = 'block';
    let tStr = t >= 1 ? t.toFixed(2) + ' s' : (t * 1000).toFixed(2) + ' ms';
    res.innerHTML = `<h4>Thời gian xung (T):</h4><div class="calc-result-value">${tStr}</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> T = 1.1 × R × C<br>
        <strong>Thay số:</strong> T = 1.1 × ${r_k}kΩ × ${c_uF}µF = 1.1 × ${r} × ${c.toExponential(2)} = <strong>${tStr}</strong>
      </div>`;
  });
}

function bindRlcCircuit() {
  document.getElementById('calcRlcBtn').addEventListener('click', () => {
    let f = parseFloat(document.getElementById('rlcF').value);
    let r = parseFloat(document.getElementById('rlcR').value);
    let l_mH = parseFloat(document.getElementById('rlcL').value);
    let c_uF = parseFloat(document.getElementById('rlcC').value);
    if (isNaN(f) || isNaN(r) || isNaN(l_mH) || isNaN(c_uF)) return;
    let l = l_mH / 1000; let c = c_uF / 1e6;
    let xl = 2 * Math.PI * f * l;
    let xc = 1 / (2 * Math.PI * f * c);
    let x = xl - xc;
    let z = Math.sqrt(r * r + x * x);
    let phase = Math.atan2(x, r) * (180 / Math.PI);
    let fReson = 1 / (2 * Math.PI * Math.sqrt(l * c));

    const resArea = document.getElementById('rlcResult'); resArea.style.display = 'block';
    resArea.innerHTML = `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
        <div><h4>Z (Trở kháng)</h4><div class="calc-result-value">${z.toFixed(2)} Ω</div></div>
        <div><h4>Pha (Phase)</h4><div class="calc-result-value">${phase.toFixed(1)}°</div></div>
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-top:8px;">
        <div style="font-size:13px">XL: <strong>${xl.toFixed(1)} Ω</strong></div>
        <div style="font-size:13px">XC: <strong>${xc.toFixed(1)} Ω</strong></div>
      </div>
      <div style="font-size:13px; color:var(--accent-orange); margin-top:6px;">f₀ cộng hưởng: <strong>${fReson.toFixed(1)} Hz</strong></div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong><br>
        XL = 2πfL = 2π × ${f} × ${l_mH}mH = <strong>${xl.toFixed(1)} Ω</strong><br>
        XC = 1/(2πfC) = 1/(2π × ${f} × ${c_uF}µF) = <strong>${xc.toFixed(1)} Ω</strong><br>
        Z = √(R² + (XL-XC)²) = √(${r}² + (${xl.toFixed(1)}-${xc.toFixed(1)})²) = <strong>${z.toFixed(2)} Ω</strong><br>
        φ = arctan((XL-XC)/R) = arctan(${x.toFixed(1)}/${r}) = <strong>${phase.toFixed(1)}°</strong><br>
        f₀ = 1/(2π√(LC)) = <strong>${fReson.toFixed(1)} Hz</strong>
      </div>`;
  });
}

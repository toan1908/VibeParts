// Fundamental Electronics Calculators

export const FUNDAMENTAL_DATA = {
  ohmsLaw: {
    title: 'Định luật Ohm',
    description: 'Tính Toán Điện Áp (V), Dòng Điện (I), Điện Trở (R) và Công Suất (P).',
    visual: `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="85" stroke="var(--primary)" stroke-width="2.5" fill="var(--primary-surface)"/>
      <line x1="15" y1="100" x2="185" y2="100" stroke="var(--primary)" stroke-width="2"/>
      <line x1="100" y1="15" x2="100" y2="100" stroke="var(--primary)" stroke-width="2"/>
      <text x="100" y="65" font-family="sans-serif" font-size="32" fill="var(--primary)" text-anchor="middle" font-weight="800">V</text>
      <text x="55" y="145" font-family="sans-serif" font-size="28" fill="var(--text-primary)" text-anchor="middle" font-weight="700">I</text>
      <text x="145" y="145" font-family="sans-serif" font-size="28" fill="var(--text-primary)" text-anchor="middle" font-weight="700">R</text>
      <text x="100" y="185" font-family="sans-serif" font-size="10" fill="var(--text-muted)" text-anchor="middle">V = I × R | P = V × I</text>
    </svg>`,
    html: `
      <div class="calc-input-group">
        <label>Voltage (V)</label>
        <input type="number" id="calcV" step="0.01" placeholder="V">
        <span class="unit">V</span>
      </div>
      <div class="calc-input-group">
        <label>Current (I)</label>
        <input type="number" id="calcI" step="0.001" placeholder="A">
        <span class="unit">A</span>
      </div>
      <div class="calc-input-group">
        <label>Resistance (R)</label>
        <input type="number" id="calcR" step="0.1" placeholder="Ω">
        <span class="unit">Ω</span>
      </div>
      <div class="calc-input-group">
        <label>Power (P)</label>
        <input type="number" id="calcP" step="0.01" placeholder="W">
        <span class="unit">W</span>
      </div>
      <div style="display:flex; gap:12px; margin-top:8px;">
        <button class="btn btn-primary" id="calcOhmsBtn" style="flex:1;">Tính Toán</button>
        <button class="btn btn-outline" id="clearOhmsBtn">Xóa</button>
      </div>
      <div class="calc-result" id="ohmsResult" style="display:none;"></div>
    `
  },
  voltageDivider: {
    title: 'Cầu chia áp (Voltage Divider)',
    description: 'Tính toán điện áp đầu ra (Vout) dựa trên Vin, R1 và R2.',
    visual: `<svg width="160" height="200" viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Vin terminal -->
      <text x="25" y="18" font-size="13" fill="var(--accent-orange)" font-weight="700">+ Vin</text>
      <line x1="70" y1="20" x2="70" y2="40" stroke="var(--primary)" stroke-width="2"/>
      <!-- R1 -->
      <rect x="60" y="40" width="20" height="50" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="45" y="70" font-size="12" fill="var(--primary)" font-weight="600" text-anchor="end">R1</text>
      <!-- Junction to Vout -->
      <line x1="70" y1="90" x2="70" y2="110" stroke="var(--primary)" stroke-width="2"/>
      <line x1="70" y1="100" x2="130" y2="100" stroke="var(--accent-orange)" stroke-width="2"/>
      <circle cx="70" cy="100" r="3" fill="var(--primary)"/>
      <text x="135" y="104" font-size="13" fill="var(--accent-orange)" font-weight="700">Vout</text>
      <!-- R2 -->
      <rect x="60" y="110" width="20" height="50" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="45" y="140" font-size="12" fill="var(--primary)" font-weight="600" text-anchor="end">R2</text>
      <!-- GND -->
      <line x1="70" y1="160" x2="70" y2="180" stroke="var(--primary)" stroke-width="2"/>
      <line x1="55" y1="180" x2="85" y2="180" stroke="var(--primary)" stroke-width="2.5"/>
      <line x1="60" y1="185" x2="80" y2="185" stroke="var(--primary)" stroke-width="2"/>
      <line x1="65" y1="190" x2="75" y2="190" stroke="var(--primary)" stroke-width="1.5"/>
    </svg>`,
    html: `
      <div class="calc-input-group">
        <label>Điện áp vào (Vin)</label>
        <input type="number" id="vdVin" step="0.1" placeholder="Vin">
        <span class="unit">V</span>
      </div>
      <div class="calc-input-group">
        <label>Điện trở R1</label>
        <input type="number" id="vdR1" step="1" placeholder="R1">
        <span class="unit">Ω</span>
      </div>
      <div class="calc-input-group">
        <label>Điện trở R2</label>
        <input type="number" id="vdR2" step="1" placeholder="R2">
        <span class="unit">Ω</span>
      </div>
      <button class="btn btn-primary" id="calcVdBtn" style="margin-top:8px; width:100%;">Tính Vout</button>
      <div class="calc-result" id="vdResult" style="display:none;"></div>
    `
  },
  currentDivider: {
    title: 'Cầu chia dòng (Current Divider)',
    description: 'Tính toán dòng điện qua các nhánh song song dựa trên điện trở.',
    visual: `<svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Main wire in -->
      <line x1="10" y1="80" x2="50" y2="80" stroke="var(--primary)" stroke-width="2"/>
      <text x="15" y="72" font-size="12" fill="var(--accent-orange)" font-weight="700">It →</text>
      <!-- Split -->
      <line x1="50" y1="80" x2="50" y2="40" stroke="var(--primary)" stroke-width="2"/>
      <line x1="50" y1="80" x2="50" y2="120" stroke="var(--primary)" stroke-width="2"/>
      <!-- R1 branch -->
      <line x1="50" y1="40" x2="80" y2="40" stroke="var(--primary)" stroke-width="2"/>
      <rect x="80" y="30" width="40" height="20" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="100" y="44" font-size="11" fill="var(--primary)" text-anchor="middle" font-weight="600">R1</text>
      <line x1="120" y1="40" x2="150" y2="40" stroke="var(--primary)" stroke-width="2"/>
      <text x="130" y="30" font-size="10" fill="var(--text-muted)">I1 →</text>
      <!-- R2 branch -->
      <line x1="50" y1="120" x2="80" y2="120" stroke="var(--primary)" stroke-width="2"/>
      <rect x="80" y="110" width="40" height="20" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="100" y="124" font-size="11" fill="var(--primary)" text-anchor="middle" font-weight="600">R2</text>
      <line x1="120" y1="120" x2="150" y2="120" stroke="var(--primary)" stroke-width="2"/>
      <text x="130" y="110" font-size="10" fill="var(--text-muted)">I2 →</text>
      <!-- Merge -->
      <line x1="150" y1="40" x2="150" y2="120" stroke="var(--primary)" stroke-width="2"/>
      <line x1="150" y1="80" x2="190" y2="80" stroke="var(--primary)" stroke-width="2"/>
    </svg>`,
    html: `
      <div class="calc-input-group">
        <label>Tổng dòng (It)</label>
        <input type="number" id="cdIt" step="0.1" placeholder="It">
        <span class="unit">A</span>
      </div>
      <div class="calc-input-group">
        <label>R1 (nhánh 1)</label>
        <input type="number" id="cdR1" step="1" placeholder="R1">
        <span class="unit">Ω</span>
      </div>
      <div class="calc-input-group">
        <label>R2 (nhánh 2)</label>
        <input type="number" id="cdR2" step="1" placeholder="R2">
        <span class="unit">Ω</span>
      </div>
      <button class="btn btn-primary" id="calcCdBtn" style="margin-top:8px; width:100%;">Tính Dòng Nhánh</button>
      <div class="calc-result" id="cdResult" style="display:none;"></div>
    `
  },
  rmsCalc: {
    title: 'Trị hiệu dụng (RMS Voltage)',
    description: 'Chuyển đổi giữa các giá trị V-peak, V-peak-peak, V-avg và V-rms cho sóng sin.',
    visual: `<svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Axes -->
      <line x1="20" y1="70" x2="200" y2="70" stroke="var(--border-color)" stroke-width="1"/>
      <line x1="20" y1="10" x2="20" y2="130" stroke="var(--border-color)" stroke-width="1"/>
      <!-- Sine wave -->
      <path d="M20 70 Q55 10 90 70 Q125 130 160 70 Q178 35 200 70" stroke="var(--primary)" stroke-width="2.5" fill="none"/>
      <!-- Vpeak line -->
      <line x1="55" y1="18" x2="55" y2="70" stroke="var(--accent-orange)" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="62" y="30" font-size="10" fill="var(--accent-orange)" font-weight="600">Vp</text>
      <!-- Vrms line -->
      <line x1="20" y1="33" x2="160" y2="33" stroke="var(--accent-green)" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="165" y="37" font-size="10" fill="var(--accent-green)" font-weight="600">Vrms</text>
      <!-- Vpp annotation -->
      <line x1="10" y1="18" x2="10" y2="122" stroke="var(--accent-red)" stroke-width="1"/>
      <text x="5" y="75" font-size="9" fill="var(--accent-red)" transform="rotate(-90,5,75)">Vpp</text>
    </svg>`,
    html: `
      <div class="calc-input-group">
        <label>Giá trị Peak (Vp)</label>
        <input type="number" id="rmsVp" step="0.1" placeholder="Vp">
        <span class="unit">V</span>
      </div>
      <div class="calc-input-group">
        <label>Giá trị RMS (Vrms)</label>
        <input type="number" id="rmsVrms" step="0.1" placeholder="Vrms">
        <span class="unit">V</span>
      </div>
      <div class="calc-input-group">
        <label>Peak-to-Peak (Vpp)</label>
        <input type="number" id="rmsVpp" step="0.1" placeholder="Vpp">
        <span class="unit">V</span>
      </div>
      <div style="display:flex; gap:12px; margin-top:8px;">
        <button class="btn btn-primary" id="calcRmsBtn" style="flex:1;">Tính Toán</button>
        <button class="btn btn-outline" id="clearRmsBtn">Xóa</button>
      </div>
      <div class="calc-result" id="rmsResult" style="display:none;"></div>
    `
  },
  yDelta: {
    title: 'Chuyển đổi Sao - Tam giác (Y-Δ)',
    description: 'Chuyển đổi giữa sơ đồ mạng Sao (Wye/Y) và Tam giác (Delta/Δ).',
    visual: `<svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Delta -->
      <polygon points="50,20 20,100 80,100" fill="none" stroke="var(--primary)" stroke-width="2"/>
      <text x="18" y="70" font-size="10" fill="var(--primary)" font-weight="600">Rb</text>
      <text x="65" y="70" font-size="10" fill="var(--primary)" font-weight="600">Rc</text>
      <text x="38" y="115" font-size="10" fill="var(--primary)" font-weight="600">Ra</text>
      <text x="50" y="135" font-size="11" fill="var(--text-muted)" text-anchor="middle" font-weight="600">Δ (Delta)</text>
      <!-- Arrow -->
      <text x="110" y="65" font-size="20" fill="var(--accent-orange)" text-anchor="middle">⇄</text>
      <!-- Star -->
      <circle cx="170" cy="60" r="3" fill="var(--accent-orange)"/>
      <line x1="170" y1="60" x2="170" y2="20" stroke="var(--accent-orange)" stroke-width="2"/>
      <line x1="170" y1="60" x2="140" y2="100" stroke="var(--accent-orange)" stroke-width="2"/>
      <line x1="170" y1="60" x2="200" y2="100" stroke="var(--accent-orange)" stroke-width="2"/>
      <text x="175" y="38" font-size="10" fill="var(--accent-orange)" font-weight="600">R1</text>
      <text x="140" y="85" font-size="10" fill="var(--accent-orange)" font-weight="600">R2</text>
      <text x="195" y="85" font-size="10" fill="var(--accent-orange)" font-weight="600">R3</text>
      <text x="170" y="135" font-size="11" fill="var(--text-muted)" text-anchor="middle" font-weight="600">Y (Star)</text>
    </svg>`,
    html: `
      <div style="margin-bottom:12px;">
        <label style="font-size:12px; color:var(--text-muted)">Loại chuyển đổi:</label>
        <select id="ydMode" class="color-select" style="margin-top:4px;">
          <option value="d2y">Tam giác (Δ) → Sao (Y)</option>
          <option value="y2d">Sao (Y) → Tam giác (Δ)</option>
        </select>
      </div>
      <div id="ydInputs"></div>
      <button class="btn btn-primary" id="calcYdBtn" style="margin-top:12px; width:100%;">Chuyển đổi</button>
      <div class="calc-result" id="ydResult" style="display:none;"></div>
    `
  }
};

export function bindFundamental(calcId) {
  if (calcId === 'ohmsLaw') bindOhmsLaw();
  if (calcId === 'voltageDivider') bindVoltageDivider();
  if (calcId === 'currentDivider') bindCurrentDivider();
  if (calcId === 'rmsCalc') bindRmsCalc();
  if (calcId === 'yDelta') bindYDelta();
}

// ---- LOGIC: Ohm's Law ----
function bindOhmsLaw() {
  const btn = document.getElementById('calcOhmsBtn');
  const clearBtn = document.getElementById('clearOhmsBtn');
  if(!btn) return;
  
  clearBtn.addEventListener('click', () => {
    ['calcV', 'calcI', 'calcR', 'calcP'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('ohmsResult').style.display = 'none';
  });

  btn.addEventListener('click', () => {
    let v = parseFloat(document.getElementById('calcV').value);
    let i = parseFloat(document.getElementById('calcI').value);
    let r = parseFloat(document.getElementById('calcR').value);
    let p = parseFloat(document.getElementById('calcP').value);

    let count = (isNaN(v)?0:1) + (isNaN(i)?0:1) + (isNaN(r)?0:1) + (isNaN(p)?0:1);
    if (count < 2) {
      const res = document.getElementById('ohmsResult'); res.style.display = 'block';
      res.innerHTML = '<div style="color:var(--accent-red)">⚠ Vui lòng nhập ít nhất 2 thông số!</div>';
      return;
    }

    let formula = '';
    if (!isNaN(v) && !isNaN(i)) { r = v / i; p = v * i; formula = `R = V / I = ${v} / ${i} = ${r.toFixed(2)} Ω<br>P = V × I = ${v} × ${i} = ${p.toFixed(2)} W`; }
    else if (!isNaN(v) && !isNaN(r)) { i = v / r; p = (v * v) / r; formula = `I = V / R = ${v} / ${r} = ${i.toFixed(3)} A<br>P = V² / R = ${v}² / ${r} = ${p.toFixed(2)} W`; }
    else if (!isNaN(v) && !isNaN(p)) { i = p / v; r = (v * v) / p; formula = `I = P / V = ${p} / ${v} = ${i.toFixed(3)} A<br>R = V² / P = ${v}² / ${p} = ${r.toFixed(2)} Ω`; }
    else if (!isNaN(i) && !isNaN(r)) { v = i * r; p = i * i * r; formula = `V = I × R = ${i} × ${r} = ${v.toFixed(2)} V<br>P = I² × R = ${i}² × ${r} = ${p.toFixed(2)} W`; }
    else if (!isNaN(i) && !isNaN(p)) { v = p / i; r = p / (i * i); formula = `V = P / I = ${p} / ${i} = ${v.toFixed(2)} V<br>R = P / I² = ${p} / ${i}² = ${r.toFixed(2)} Ω`; }
    else if (!isNaN(r) && !isNaN(p)) { v = Math.sqrt(p * r); i = Math.sqrt(p / r); formula = `V = √(P×R) = √(${p}×${r}) = ${v.toFixed(2)} V<br>I = √(P/R) = √(${p}/${r}) = ${i.toFixed(3)} A`; }

    document.getElementById('calcV').value = v.toFixed(2);
    document.getElementById('calcI').value = i.toFixed(3);
    document.getElementById('calcR').value = r.toFixed(2);
    document.getElementById('calcP').value = p.toFixed(2);

    const res = document.getElementById('ohmsResult');
    res.style.display = 'block';
    res.innerHTML = `<h4>Kết quả</h4>
      <div style="display:flex; gap: 12px; flex-wrap:wrap; font-size:14px; margin-bottom:12px;">
        <div style="background:var(--bg-input); padding:4px 10px; border-radius:4px">V: <strong>${v.toFixed(2)}</strong>V</div>
        <div style="background:var(--bg-input); padding:4px 10px; border-radius:4px">I: <strong>${i.toFixed(3)}</strong>A</div>
        <div style="background:var(--bg-input); padding:4px 10px; border-radius:4px">R: <strong>${r.toFixed(2)}</strong>Ω</div>
        <div style="background:var(--bg-input); padding:4px 10px; border-radius:4px">P: <strong>${p.toFixed(2)}</strong>W</div>
      </div>
      <div style="font-size:12px; color:var(--text-muted); border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Cách tính:</strong><br>${formula}
      </div>`;
  });
}

// ---- LOGIC: Voltage Divider ----
function bindVoltageDivider() {
  const btn = document.getElementById('calcVdBtn');
  if(!btn) return;
  btn.addEventListener('click', () => {
    let vin = parseFloat(document.getElementById('vdVin').value);
    let r1 = parseFloat(document.getElementById('vdR1').value);
    let r2 = parseFloat(document.getElementById('vdR2').value);
    if (isNaN(vin) || isNaN(r1) || isNaN(r2)) {
      const res = document.getElementById('vdResult'); res.style.display = 'block';
      res.innerHTML = '<div style="color:var(--accent-red)">⚠ Nhập đủ Vin, R1, R2</div>';
      return;
    }
    let vout = vin * (r2 / (r1 + r2));
    const res = document.getElementById('vdResult');
    res.style.display = 'block';
    res.innerHTML = `<h4>Điện áp đầu ra (Vout)</h4><div class="calc-result-value">${vout.toFixed(2)} V</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:8px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> Vout = Vin × R2 / (R1 + R2)<br>
        <strong>Thay số:</strong> Vout = ${vin} × ${r2} / (${r1} + ${r2}) = ${vin} × ${r2} / ${r1+r2} = <strong>${vout.toFixed(2)} V</strong>
      </div>`;
  });
}

// ---- LOGIC: Current Divider ----
function bindCurrentDivider() {
  const btn = document.getElementById('calcCdBtn');
  if(!btn) return;
  btn.addEventListener('click', () => {
    let it = parseFloat(document.getElementById('cdIt').value);
    let r1 = parseFloat(document.getElementById('cdR1').value);
    let r2 = parseFloat(document.getElementById('cdR2').value);
    if (isNaN(it) || isNaN(r1) || isNaN(r2)) {
      const res = document.getElementById('cdResult'); res.style.display = 'block';
      res.innerHTML = '<div style="color:var(--accent-red)">⚠ Nhập đủ It, R1, R2</div>';
      return;
    }
    let i1 = it * (r2 / (r1 + r2));
    let i2 = it * (r1 / (r1 + r2));
    const res = document.getElementById('cdResult');
    res.style.display = 'block';
    res.innerHTML = `
      <div style="display:flex; gap:12px;">
        <div style="flex:1"><h4>Dòng qua R1 (I1)</h4><div class="calc-result-value">${i1.toFixed(3)} A</div></div>
        <div style="flex:1"><h4>Dòng qua R2 (I2)</h4><div class="calc-result-value">${i2.toFixed(3)} A</div></div>
      </div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong><br>
        I1 = It × R2 / (R1 + R2) = ${it} × ${r2} / (${r1} + ${r2}) = <strong>${i1.toFixed(3)} A</strong><br>
        I2 = It × R1 / (R1 + R2) = ${it} × ${r1} / (${r1} + ${r2}) = <strong>${i2.toFixed(3)} A</strong><br>
        <em>Kiểm tra: I1 + I2 = ${i1.toFixed(3)} + ${i2.toFixed(3)} = ${(i1+i2).toFixed(3)} A = It ✓</em>
      </div>`;
  });
}

// ---- LOGIC: RMS Voltage ----
function bindRmsCalc() {
  const btn = document.getElementById('calcRmsBtn');
  const clearBtn = document.getElementById('clearRmsBtn');
  if(!btn) return;
  
  clearBtn.addEventListener('click', () => {
    ['rmsVp', 'rmsVrms', 'rmsVpp'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('rmsResult').style.display = 'none';
  });

  btn.addEventListener('click', () => {
    let vp = parseFloat(document.getElementById('rmsVp').value);
    let vrms = parseFloat(document.getElementById('rmsVrms').value);
    let vpp = parseFloat(document.getElementById('rmsVpp').value);

    let source = '';
    if (!isNaN(vp)) { vrms = vp / Math.sqrt(2); vpp = vp * 2; source = `Từ Vp = ${vp} V`; }
    else if (!isNaN(vrms)) { vp = vrms * Math.sqrt(2); vpp = vp * 2; source = `Từ Vrms = ${vrms} V`; }
    else if (!isNaN(vpp)) { vp = vpp / 2; vrms = vp / Math.sqrt(2); source = `Từ Vpp = ${vpp} V`; }
    else {
      const res = document.getElementById('rmsResult'); res.style.display = 'block';
      res.innerHTML = '<div style="color:var(--accent-red)">⚠ Nhập ít nhất 1 giá trị</div>';
      return;
    }

    let vavg = vp * 0.637;
    document.getElementById('rmsVp').value = vp.toFixed(2);
    document.getElementById('rmsVrms').value = vrms.toFixed(2);
    document.getElementById('rmsVpp').value = vpp.toFixed(2);

    const res = document.getElementById('rmsResult');
    res.style.display = 'block';
    res.innerHTML = `<h4>Kết quả Sóng Sin</h4>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:10px;">
        <div style="font-size:14px">Vp: <strong>${vp.toFixed(2)} V</strong></div>
        <div style="font-size:14px">Vrms: <strong>${vrms.toFixed(2)} V</strong></div>
        <div style="font-size:14px">Vpp: <strong>${vpp.toFixed(2)} V</strong></div>
        <div style="font-size:14px">Vavg: <strong>${vavg.toFixed(2)} V</strong></div>
      </div>
      <div style="font-size:12px; color:var(--text-muted); border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức (${source}):</strong><br>
        Vrms = Vp / √2 = ${vp.toFixed(2)} / 1.414 = <strong>${vrms.toFixed(2)} V</strong><br>
        Vpp = 2 × Vp = 2 × ${vp.toFixed(2)} = <strong>${vpp.toFixed(2)} V</strong><br>
        Vavg = Vp × 2/π = ${vp.toFixed(2)} × 0.637 = <strong>${vavg.toFixed(2)} V</strong>
      </div>`;
  });
}

// ---- LOGIC: Y-Delta ----
function bindYDelta() {
  const modeSel = document.getElementById('ydMode');
  const inputContainer = document.getElementById('ydInputs');
  const btn = document.getElementById('calcYdBtn');
  if(!modeSel) return;

  function renderInputs() {
    const mode = modeSel.value;
    if (mode === 'd2y') {
      inputContainer.innerHTML = `
        <div class="calc-input-group"><label>Ra (giữa B-C)</label><input type="number" id="ydRa"><span class="unit">Ω</span></div>
        <div class="calc-input-group"><label>Rb (giữa A-C)</label><input type="number" id="ydRb"><span class="unit">Ω</span></div>
        <div class="calc-input-group"><label>Rc (giữa A-B)</label><input type="number" id="ydRc"><span class="unit">Ω</span></div>`;
    } else {
      inputContainer.innerHTML = `
        <div class="calc-input-group"><label>R1 (node A)</label><input type="number" id="ydR1"><span class="unit">Ω</span></div>
        <div class="calc-input-group"><label>R2 (node B)</label><input type="number" id="ydR2"><span class="unit">Ω</span></div>
        <div class="calc-input-group"><label>R3 (node C)</label><input type="number" id="ydR3"><span class="unit">Ω</span></div>`;
    }
  }

  modeSel.addEventListener('change', renderInputs);
  renderInputs();

  btn.addEventListener('click', () => {
    const res = document.getElementById('ydResult');
    res.style.display = 'block';
    if (modeSel.value === 'd2y') {
      let ra = parseFloat(document.getElementById('ydRa').value);
      let rb = parseFloat(document.getElementById('ydRb').value);
      let rc = parseFloat(document.getElementById('ydRc').value);
      if (isNaN(ra) || isNaN(rb) || isNaN(rc)) return;
      let sum = ra + rb + rc;
      let r1 = (rb * rc) / sum;
      let r2 = (ra * rc) / sum;
      let r3 = (ra * rb) / sum;
      res.innerHTML = `<h4>Kết quả Mạch Sao (Y)</h4>
        <div class="calc-result-value">R1 = ${r1.toFixed(2)} Ω, R2 = ${r2.toFixed(2)} Ω, R3 = ${r3.toFixed(2)} Ω</div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
          <strong>Công thức:</strong> Rn = (R_adj1 × R_adj2) / (Ra + Rb + Rc)<br>
          R1 = Rb×Rc / (Ra+Rb+Rc) = ${rb}×${rc} / ${sum} = <strong>${r1.toFixed(2)} Ω</strong><br>
          R2 = Ra×Rc / (Ra+Rb+Rc) = ${ra}×${rc} / ${sum} = <strong>${r2.toFixed(2)} Ω</strong><br>
          R3 = Ra×Rb / (Ra+Rb+Rc) = ${ra}×${rb} / ${sum} = <strong>${r3.toFixed(2)} Ω</strong>
        </div>`;
    } else {
      let r1 = parseFloat(document.getElementById('ydR1').value);
      let r2 = parseFloat(document.getElementById('ydR2').value);
      let r3 = parseFloat(document.getElementById('ydR3').value);
      if (isNaN(r1) || isNaN(r2) || isNaN(r3)) return;
      let sum = (r1 * r2) + (r2 * r3) + (r3 * r1);
      let ra = sum / r1;
      let rb = sum / r2;
      let rc = sum / r3;
      res.innerHTML = `<h4>Kết quả Mạch Tam giác (Δ)</h4>
        <div class="calc-result-value">Ra = ${ra.toFixed(2)} Ω, Rb = ${rb.toFixed(2)} Ω, Rc = ${rc.toFixed(2)} Ω</div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
          <strong>Công thức:</strong> ΣP = R1R2 + R2R3 + R3R1 = ${r1}×${r2} + ${r2}×${r3} + ${r3}×${r1} = ${sum}<br>
          Ra = ΣP / R1 = ${sum} / ${r1} = <strong>${ra.toFixed(2)} Ω</strong><br>
          Rb = ΣP / R2 = ${sum} / ${r2} = <strong>${rb.toFixed(2)} Ω</strong><br>
          Rc = ΣP / R3 = ${sum} / ${r3} = <strong>${rc.toFixed(2)} Ω</strong>
        </div>`;
    }
  });
}

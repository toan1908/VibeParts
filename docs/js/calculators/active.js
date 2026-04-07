// Active Component and Power IC Calculators

export const ACTIVE_DATA = {
  opAmpInv: {
    title: 'Op-Amp Khuếch đại Đảo (Inverting)',
    description: 'Tính toán hệ số khuếch đại (Gain) và điện áp đầu ra cho mạch khuếch đại đảo.',
    visual: `<svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Op-Amp triangle -->
      <polygon points="80,40 80,120 160,80" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="100" y="68" font-size="16" fill="var(--text-muted)" font-weight="700">−</text>
      <text x="100" y="100" font-size="16" fill="var(--text-muted)" font-weight="700">+</text>
      <!-- Vin -->
      <text x="5" y="58" font-size="11" fill="var(--accent-orange)" font-weight="600">Vin</text>
      <line x1="25" y1="55" x2="38" y2="55" stroke="var(--primary)" stroke-width="2"/>
      <!-- Rin -->
      <rect x="38" y="47" width="30" height="16" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="1.5"/>
      <text x="53" y="59" font-size="10" fill="var(--primary)" text-anchor="middle" font-weight="600">Rin</text>
      <line x1="68" y1="55" x2="80" y2="55" stroke="var(--primary)" stroke-width="2"/>
      <!-- Inverting input junction -->
      <circle cx="75" cy="55" r="2.5" fill="var(--primary)"/>
      <!-- Feedback path Rf -->
      <line x1="75" y1="55" x2="75" y2="25" stroke="var(--primary)" stroke-width="2"/>
      <line x1="75" y1="25" x2="110" y2="25" stroke="var(--primary)" stroke-width="2"/>
      <rect x="85" y="17" width="30" height="16" rx="2" fill="var(--accent-orange)" fill-opacity="0.2" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <text x="100" y="29" font-size="10" fill="var(--accent-orange)" text-anchor="middle" font-weight="600">Rf</text>
      <line x1="115" y1="25" x2="175" y2="25" stroke="var(--primary)" stroke-width="2"/>
      <line x1="175" y1="25" x2="175" y2="80" stroke="var(--primary)" stroke-width="2"/>
      <!-- Non-inv to GND -->
      <line x1="80" y1="95" x2="60" y2="95" stroke="var(--primary)" stroke-width="2"/>
      <line x1="52" y1="100" x2="68" y2="100" stroke="var(--primary)" stroke-width="1.5"/>
      <line x1="55" y1="104" x2="65" y2="104" stroke="var(--primary)" stroke-width="1"/>
      <line x1="58" y1="108" x2="62" y2="108" stroke="var(--primary)" stroke-width="0.5"/>
      <!-- Output -->
      <line x1="160" y1="80" x2="210" y2="80" stroke="var(--primary)" stroke-width="2"/>
      <text x="195" y="74" font-size="11" fill="var(--accent-green)" font-weight="600">Vout</text>
      <!-- Formula -->
      <text x="110" y="150" font-size="10" fill="var(--text-muted)" text-anchor="middle">Gain = −Rf/Rin</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>Vin</label><input type="number" id="oiVin" value="1"><span class="unit">V</span></div>
      <div class="calc-input-group"><label>Rin (R1)</label><input type="number" id="oiRin" value="1000"><span class="unit">Ω</span></div>
      <div class="calc-input-group"><label>Rf (R2)</label><input type="number" id="oiRf" value="10000"><span class="unit">Ω</span></div>
      <button class="btn btn-primary" id="calcOiBtn" style="margin-top:8px; width:100%">Tính Toán</button>
      <div class="calc-result" id="oiResult" style="display:none;"></div>
    `
  },
  opAmpNonInv: {
    title: 'Op-Amp Khuếch đại Không đảo',
    description: 'Tính toán Gain và Vout cho mạch khuếch đại không đảo.',
    visual: `<svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="80,40 80,120 160,80" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="100" y="68" font-size="16" fill="var(--text-muted)" font-weight="700">−</text>
      <text x="100" y="100" font-size="16" fill="var(--text-muted)" font-weight="700">+</text>
      <!-- Vin to Non-Inv (+) -->
      <line x1="20" y1="95" x2="80" y2="95" stroke="var(--primary)" stroke-width="2"/>
      <text x="5" y="99" font-size="11" fill="var(--accent-orange)" font-weight="600">Vin</text>
      <!-- Inv (-) to R1/Rf junction -->
      <line x1="80" y1="55" x2="60" y2="55" stroke="var(--primary)" stroke-width="2"/>
      <circle cx="60" cy="55" r="2.5" fill="var(--primary)"/>
      <!-- R1 to GND -->
      <line x1="60" y1="55" x2="60" y2="75" stroke="var(--primary)" stroke-width="2"/>
      <rect x="50" y="75" width="20" height="30" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="1.5"/>
      <text x="45" y="94" font-size="10" fill="var(--primary)" text-anchor="end" font-weight="600">R1</text>
      <line x1="60" y1="105" x2="60" y2="120" stroke="var(--primary)" stroke-width="2"/>
      <line x1="52" y1="120" x2="68" y2="120" stroke="var(--primary)" stroke-width="1.5"/>
      <line x1="55" y1="124" x2="65" y2="124" stroke="var(--primary)" stroke-width="1"/>
      <!-- Feedback Rf -->
      <line x1="60" y1="55" x2="60" y2="25" stroke="var(--primary)" stroke-width="2"/>
      <line x1="60" y1="25" x2="100" y2="25" stroke="var(--primary)" stroke-width="2"/>
      <rect x="80" y="17" width="30" height="16" rx="2" fill="var(--accent-orange)" fill-opacity="0.2" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <text x="95" y="29" font-size="10" fill="var(--accent-orange)" text-anchor="middle" font-weight="600">Rf</text>
      <line x1="110" y1="25" x2="175" y2="25" stroke="var(--primary)" stroke-width="2"/>
      <line x1="175" y1="25" x2="175" y2="80" stroke="var(--primary)" stroke-width="2"/>
      <!-- Output -->
      <line x1="160" y1="80" x2="210" y2="80" stroke="var(--primary)" stroke-width="2"/>
      <text x="195" y="74" font-size="11" fill="var(--accent-green)" font-weight="600">Vout</text>
      <text x="110" y="150" font-size="10" fill="var(--text-muted)" text-anchor="middle">Gain = 1 + Rf/R1</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>Vin</label><input type="number" id="oniVin" value="1"><span class="unit">V</span></div>
      <div class="calc-input-group"><label>R1 (Nối GND)</label><input type="number" id="oniR1" value="1000"><span class="unit">Ω</span></div>
      <div class="calc-input-group"><label>Rf (Hồi tiếp)</label><input type="number" id="oniRf" value="10000"><span class="unit">Ω</span></div>
      <button class="btn btn-primary" id="calcOniBtn" style="margin-top:8px; width:100%">Tính Toán</button>
      <div class="calc-result" id="oniResult" style="display:none;"></div>
    `
  },
  opAmpDiff: {
    title: 'Op-Amp Khuếch đại Vi sai (Difference)',
    description: 'Tính Vout = (R2/R1) × (V2 - V1) với điều kiện R2/R1 = R4/R3.',
    visual: `<svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="90,30 90,110 170,70" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="110" y="58" font-size="14" fill="var(--text-muted)" font-weight="700">−</text>
      <text x="110" y="88" font-size="14" fill="var(--text-muted)" font-weight="700">+</text>
      <!-- V1 → R1 → inv (-) -->
      <text x="5" y="48" font-size="10" fill="var(--accent-orange)" font-weight="600">V1</text>
      <line x1="20" y1="45" x2="40" y2="45" stroke="var(--primary)" stroke-width="2"/>
      <rect x="40" y="38" width="25" height="14" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="1.5"/>
      <text x="52" y="49" font-size="9" fill="var(--primary)" text-anchor="middle" font-weight="600">R1</text>
      <line x1="65" y1="45" x2="90" y2="45" stroke="var(--primary)" stroke-width="2"/>
      <!-- V2 → R3 → non-inv (+) -->
      <text x="5" y="98" font-size="10" fill="var(--accent-orange)" font-weight="600">V2</text>
      <line x1="20" y1="95" x2="40" y2="95" stroke="var(--primary)" stroke-width="2"/>
      <rect x="40" y="88" width="25" height="14" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="1.5"/>
      <text x="52" y="99" font-size="9" fill="var(--primary)" text-anchor="middle" font-weight="600">R3</text>
      <line x1="65" y1="95" x2="90" y2="95" stroke="var(--primary)" stroke-width="2"/>
      <!-- Rf from inv to output -->
      <circle cx="85" cy="45" r="2" fill="var(--primary)"/>
      <line x1="85" y1="45" x2="85" y2="20" stroke="var(--primary)" stroke-width="1.5"/>
      <rect x="100" y="13" width="25" height="14" rx="2" fill="var(--accent-orange)" fill-opacity="0.2" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <text x="112" y="24" font-size="9" fill="var(--accent-orange)" text-anchor="middle" font-weight="600">R2</text>
      <line x1="85" y1="20" x2="100" y2="20" stroke="var(--primary)" stroke-width="1.5"/>
      <line x1="125" y1="20" x2="185" y2="20" stroke="var(--primary)" stroke-width="1.5"/>
      <line x1="185" y1="20" x2="185" y2="70" stroke="var(--primary)" stroke-width="1.5"/>
      <!-- Output -->
      <line x1="170" y1="70" x2="215" y2="70" stroke="var(--primary)" stroke-width="2"/>
      <text x="195" y="64" font-size="11" fill="var(--accent-green)" font-weight="600">Vout</text>
      <text x="110" y="135" font-size="10" fill="var(--text-muted)" text-anchor="middle">Vout = (R2/R1)×(V2−V1)</text>
    </svg>`,
    html: `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="calc-input-group"><label>V1</label><input type="number" id="odV1"><span class="unit">V</span></div>
        <div class="calc-input-group"><label>V2</label><input type="number" id="odV2"><span class="unit">V</span></div>
        <div class="calc-input-group"><label>R1</label><input type="number" id="odR1"><span class="unit">Ω</span></div>
        <div class="calc-input-group"><label>R2</label><input type="number" id="odR2"><span class="unit">Ω</span></div>
      </div>
      <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Giả định mạch cân bằng: R1=R3, R2=R4.</div>
      <button class="btn btn-primary" id="calcOdBtn" style="margin-top:12px; width:100%">Tính Toán</button>
      <div class="calc-result" id="odResult" style="display:none;"></div>
    `
  },
  zenerReg: {
    title: 'Ổn áp Zener (Zener Diode Regulator)',
    description: 'Tính toán điện trở hạn dòng (Rs) để ổn định điện áp bằng Diode Zener.',
    visual: `<svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Vin -->
      <text x="5" y="38" font-size="11" fill="var(--accent-orange)" font-weight="600">Vin</text>
      <line x1="25" y1="35" x2="40" y2="35" stroke="var(--primary)" stroke-width="2"/>
      <!-- Rs -->
      <rect x="40" y="27" width="40" height="16" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="60" y="38" font-size="10" fill="var(--primary)" text-anchor="middle" font-weight="600">Rs</text>
      <line x1="80" y1="35" x2="110" y2="35" stroke="var(--primary)" stroke-width="2"/>
      <!-- Junction -->
      <circle cx="110" cy="35" r="3" fill="var(--primary)"/>
      <!-- Vout -->
      <line x1="110" y1="35" x2="170" y2="35" stroke="var(--accent-green)" stroke-width="2"/>
      <text x="175" y="39" font-size="11" fill="var(--accent-green)" font-weight="600">Vout</text>
      <!-- Zener Diode -->
      <line x1="110" y1="35" x2="110" y2="65" stroke="var(--primary)" stroke-width="2"/>
      <polygon points="100,65 120,65 110,90" fill="none" stroke="var(--accent-red)" stroke-width="2"/>
      <line x1="97" y1="90" x2="123" y2="90" stroke="var(--accent-red)" stroke-width="2.5"/>
      <line x1="97" y1="90" x2="93" y2="85" stroke="var(--accent-red)" stroke-width="2"/>
      <line x1="123" y1="90" x2="127" y2="95" stroke="var(--accent-red)" stroke-width="2"/>
      <text x="132" y="80" font-size="10" fill="var(--accent-red)" font-weight="600">Vz</text>
      <!-- Load -->
      <line x1="170" y1="35" x2="170" y2="55" stroke="var(--primary)" stroke-width="2"/>
      <rect x="160" y="55" width="20" height="40" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="1.5"/>
      <text x="170" y="79" font-size="9" fill="var(--primary)" text-anchor="middle" font-weight="600">RL</text>
      <line x1="170" y1="95" x2="170" y2="120" stroke="var(--primary)" stroke-width="2"/>
      <!-- GND -->
      <line x1="110" y1="90" x2="110" y2="120" stroke="var(--primary)" stroke-width="2"/>
      <line x1="25" y1="120" x2="170" y2="120" stroke="var(--primary)" stroke-width="2"/>
      <text x="100" y="150" font-size="10" fill="var(--text-muted)" text-anchor="middle">Rs = (Vin−Vz) / (Iz+IL)</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>Vin (Max)</label><input type="number" id="znVin"><span class="unit">V</span></div>
      <div class="calc-input-group"><label>V_zener (Vz)</label><input type="number" id="znVz"><span class="unit">V</span></div>
      <div class="calc-input-group"><label>Dòng tải (I_load)</label><input type="number" id="znIl"><span class="unit">mA</span></div>
      <button class="btn btn-primary" id="calcZnBtn" style="margin-top:8px; width:100%">Tính Toán</button>
      <div class="calc-result" id="znResult" style="display:none;"></div>
    `
  },
  adjustedReg: {
    title: 'Ổn áp điều chỉnh (LM317)',
    description: 'Tính toán điện trở để thiết lập điện áp đầu ra cho LM317/LM337.',
    visual: `<svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- LM317 IC -->
      <rect x="70" y="25" width="80" height="50" rx="4" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="110" y="50" font-size="14" fill="var(--primary)" text-anchor="middle" font-weight="800">LM317</text>
      <!-- Pins -->
      <text x="65" y="45" font-size="9" fill="var(--text-muted)" text-anchor="end">IN</text>
      <text x="155" y="45" font-size="9" fill="var(--text-muted)">OUT</text>
      <text x="110" y="85" font-size="9" fill="var(--text-muted)" text-anchor="middle">ADJ</text>
      <!-- Vin -->
      <line x1="20" y1="40" x2="70" y2="40" stroke="var(--primary)" stroke-width="2"/>
      <text x="10" y="44" font-size="10" fill="var(--accent-orange)" font-weight="600">Vin</text>
      <!-- Vout -->
      <line x1="150" y1="40" x2="200" y2="40" stroke="var(--primary)" stroke-width="2"/>
      <text x="195" y="34" font-size="10" fill="var(--accent-green)" font-weight="600">Vout</text>
      <!-- ADJ pin down -->
      <line x1="110" y1="75" x2="110" y2="90" stroke="var(--primary)" stroke-width="2"/>
      <!-- R1 from Vout to ADJ -->
      <circle cx="175" cy="40" r="2.5" fill="var(--primary)"/>
      <line x1="175" y1="40" x2="175" y2="55" stroke="var(--primary)" stroke-width="2"/>
      <rect x="165" y="55" width="20" height="25" rx="2" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="1.5"/>
      <text x="195" y="71" font-size="10" fill="var(--primary)" font-weight="600">R1</text>
      <line x1="175" y1="80" x2="175" y2="90" stroke="var(--primary)" stroke-width="2"/>
      <line x1="110" y1="90" x2="175" y2="90" stroke="var(--primary)" stroke-width="2"/>
      <circle cx="142" cy="90" r="2.5" fill="var(--primary)"/>
      <!-- R2 from ADJ to GND -->
      <line x1="142" y1="90" x2="142" y2="100" stroke="var(--primary)" stroke-width="2"/>
      <rect x="132" y="100" width="20" height="25" rx="2" fill="var(--accent-orange)" fill-opacity="0.2" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <text x="160" y="116" font-size="10" fill="var(--accent-orange)" font-weight="600">R2</text>
      <line x1="142" y1="125" x2="142" y2="135" stroke="var(--primary)" stroke-width="2"/>
      <line x1="134" y1="135" x2="150" y2="135" stroke="var(--primary)" stroke-width="1.5"/>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>R1 (Thường 240Ω)</label><input type="number" id="arR1" value="240"><span class="unit">Ω</span></div>
      <div class="calc-input-group"><label>R2 (Biến trở)</label><input type="number" id="arR2"><span class="unit">Ω</span></div>
      <div style="font-size:11px; color:var(--text-muted); margin-bottom:8px;">Vout = 1.25 × (1 + R2/R1)</div>
      <div style="display:flex; gap:12px;">
        <button class="btn btn-primary" id="calcArBtn" style="flex:1">Tính Vout</button>
        <button class="btn btn-outline" id="calcArR2Btn" style="flex:1">Tìm R2</button>
      </div>
      <div class="calc-input-group" id="arTargetDiv" style="display:none; margin-top:12px;">
        <label>Vout Mong muốn</label>
        <input type="number" id="arVoutTarget"><span class="unit">V</span>
      </div>
      <div class="calc-result" id="arResult" style="display:none;"></div>
    `
  }
};

export function bindActive(calcId) {
  if (calcId === 'opAmpInv') bindOpAmpInv();
  if (calcId === 'opAmpNonInv') bindOpAmpNonInv();
  if (calcId === 'opAmpDiff') bindOpAmpDiff();
  if (calcId === 'zenerReg') bindZenerReg();
  if (calcId === 'adjustedReg') bindAdjustedReg();
}

function bindOpAmpInv() {
  document.getElementById('calcOiBtn').addEventListener('click', () => {
    let vin = parseFloat(document.getElementById('oiVin').value);
    let rin = parseFloat(document.getElementById('oiRin').value);
    let rf = parseFloat(document.getElementById('oiRf').value);
    if (isNaN(vin) || isNaN(rin) || isNaN(rf)) return;
    let gain = - (rf / rin);
    let vout = vin * gain;
    const res = document.getElementById('oiResult'); res.style.display = 'block';
    res.innerHTML = `<h4>Kết quả</h4>
      <div style="display:flex; gap:16px; margin-bottom:8px;">
        <div>Gain: <strong>${gain.toFixed(2)}</strong></div>
        <div class="calc-result-value">Vout = ${vout.toFixed(2)} V</div>
      </div>
      <div style="font-size:12px; color:var(--text-muted); border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> Gain = −Rf / Rin<br>
        Gain = −${rf} / ${rin} = <strong>${gain.toFixed(2)}</strong><br>
        Vout = Vin × Gain = ${vin} × (${gain.toFixed(2)}) = <strong>${vout.toFixed(2)} V</strong>
      </div>`;
  });
}

function bindOpAmpNonInv() {
  document.getElementById('calcOniBtn').addEventListener('click', () => {
    let vin = parseFloat(document.getElementById('oniVin').value);
    let r1 = parseFloat(document.getElementById('oniR1').value);
    let rf = parseFloat(document.getElementById('oniRf').value);
    if (isNaN(vin) || isNaN(r1) || isNaN(rf)) return;
    let gain = 1 + (rf / r1);
    let vout = vin * gain;
    const res = document.getElementById('oniResult'); res.style.display = 'block';
    res.innerHTML = `<h4>Kết quả</h4>
      <div style="display:flex; gap:16px; margin-bottom:8px;">
        <div>Gain: <strong>${gain.toFixed(2)}</strong></div>
        <div class="calc-result-value">Vout = ${vout.toFixed(2)} V</div>
      </div>
      <div style="font-size:12px; color:var(--text-muted); border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> Gain = 1 + Rf / R1<br>
        Gain = 1 + ${rf} / ${r1} = 1 + ${(rf/r1).toFixed(2)} = <strong>${gain.toFixed(2)}</strong><br>
        Vout = Vin × Gain = ${vin} × ${gain.toFixed(2)} = <strong>${vout.toFixed(2)} V</strong>
      </div>`;
  });
}

function bindOpAmpDiff() {
  document.getElementById('calcOdBtn').addEventListener('click', () => {
    let v1 = parseFloat(document.getElementById('odV1').value);
    let v2 = parseFloat(document.getElementById('odV2').value);
    let r1 = parseFloat(document.getElementById('odR1').value);
    let r2 = parseFloat(document.getElementById('odR2').value);
    if (isNaN(v1) || isNaN(v2) || isNaN(r1) || isNaN(r2)) return;
    let gain = r2 / r1;
    let vout = gain * (v2 - v1);
    const res = document.getElementById('odResult'); res.style.display = 'block';
    res.innerHTML = `<h4>Vout (Vi sai):</h4><div class="calc-result-value">${vout.toFixed(2)} V</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> Vout = (R2/R1) × (V2 − V1)<br>
        Gain = R2/R1 = ${r2}/${r1} = <strong>${gain.toFixed(2)}</strong><br>
        Vout = ${gain.toFixed(2)} × (${v2} − ${v1}) = ${gain.toFixed(2)} × ${(v2-v1).toFixed(2)} = <strong>${vout.toFixed(2)} V</strong>
      </div>`;
  });
}

function bindZenerReg() {
  document.getElementById('calcZnBtn').addEventListener('click', () => {
    let vin = parseFloat(document.getElementById('znVin').value);
    let vz = parseFloat(document.getElementById('znVz').value);
    let il_mA = parseFloat(document.getElementById('znIl').value);
    if (isNaN(vin) || isNaN(vz) || isNaN(il_mA) || vin <= vz) return;
    let il = il_mA / 1000;
    let iz_min = 0.005; // 5mA min
    let rs = (vin - vz) / (il + iz_min);
    let p_rs = (vin - vz) * (il + iz_min);
    const res = document.getElementById('znResult'); res.style.display = 'block';
    res.innerHTML = `<h4>Trở hạn dòng (Rs) đề xuất:</h4><div class="calc-result-value">${rs.toFixed(1)} Ω</div>
      <div style="font-size:13px; color:var(--text-muted); margin-top:4px;">• P tiêu tán trên Rs: <strong>${(p_rs*1000).toFixed(0)} mW</strong></div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> Rs = (Vin − Vz) / (IL + Iz_min)<br>
        <strong>Thay số:</strong> Rs = (${vin} − ${vz}) / (${il_mA}mA + 5mA) = ${(vin-vz).toFixed(1)} / ${((il+iz_min)*1000).toFixed(0)}mA = <strong>${rs.toFixed(1)} Ω</strong><br>
        P_Rs = (Vin−Vz) × Is = ${(vin-vz).toFixed(1)} × ${((il+iz_min)*1000).toFixed(0)}mA = <strong>${(p_rs*1000).toFixed(0)} mW</strong><br>
        <em>Ghi chú: Iz_min = 5mA (dòng tối thiểu qua Zener để duy trì ổn áp)</em>
      </div>`;
  });
}

function bindAdjustedReg() {
  const voutBtn = document.getElementById('calcArBtn');
  const findR2Btn = document.getElementById('calcArR2Btn');
  const targetDiv = document.getElementById('arTargetDiv');
  const voutInput = document.getElementById('arVoutTarget');

  voutBtn.addEventListener('click', () => {
    targetDiv.style.display = 'none';
    let r1 = parseFloat(document.getElementById('arR1').value);
    let r2 = parseFloat(document.getElementById('arR2').value);
    if (isNaN(r1) || isNaN(r2)) return;
    let vout = 1.25 * (1 + r2/r1);
    const res = document.getElementById('arResult'); res.style.display = 'block';
    res.innerHTML = `<h4>Vout:</h4><div class="calc-result-value">${vout.toFixed(2)} V</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> Vout = 1.25 × (1 + R2/R1)<br>
        Vout = 1.25 × (1 + ${r2}/${r1}) = 1.25 × ${(1 + r2/r1).toFixed(2)} = <strong>${vout.toFixed(2)} V</strong>
      </div>`;
  });

  findR2Btn.addEventListener('click', () => {
    targetDiv.style.display = 'block';
    voutInput.focus();
    calcR2FromTarget();
  });

  function calcR2FromTarget() {
    let r1 = parseFloat(document.getElementById('arR1').value);
    let vtarget = parseFloat(voutInput.value);
    if (isNaN(r1) || isNaN(vtarget) || vtarget <= 1.25) return;
    let r2 = r1 * ((vtarget / 1.25) - 1);
    document.getElementById('arR2').value = Math.round(r2);
    const res = document.getElementById('arResult'); res.style.display = 'block';
    res.innerHTML = `<h4>R2 cần dùng:</h4><div class="calc-result-value">${Math.round(r2)} Ω</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> R2 = R1 × (Vout/1.25 − 1)<br>
        R2 = ${r1} × (${vtarget}/1.25 − 1) = ${r1} × ${((vtarget/1.25)-1).toFixed(2)} = <strong>${Math.round(r2)} Ω</strong><br>
        Vout thực tế = 1.25 × (1 + ${Math.round(r2)}/${r1}) = <strong>${(1.25 * (1 + Math.round(r2)/r1)).toFixed(2)} V</strong>
      </div>`;
  }

  voutInput.addEventListener('input', calcR2FromTarget);
}

// RF and Signal Conversion

export const RF_DATA = {
  decibelCalc: {
    title: 'Máy tính Decibel (dB)',
    description: 'Tính toán tỷ lệ Logarithmic cho Công suất (P) hoặc Điện áp (V).',
    visual: `<svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Axes -->
      <line x1="30" y1="100" x2="210" y2="100" stroke="var(--border-color)" stroke-width="1"/>
      <line x1="30" y1="15" x2="30" y2="100" stroke="var(--border-color)" stroke-width="1"/>
      <text x="120" y="115" font-size="9" fill="var(--text-muted)" text-anchor="middle">Tần số (f)</text>
      <text x="16" y="60" font-size="9" fill="var(--text-muted)" transform="rotate(-90,16,60)">dB</text>
      <!-- 0dB line -->
      <line x1="30" y1="50" x2="210" y2="50" stroke="var(--border-color)" stroke-width="0.5" stroke-dasharray="3,3"/>
      <text x="215" y="54" font-size="8" fill="var(--text-muted)">0dB</text>
      <!-- Gain curve -->
      <path d="M30 85 Q80 85 120 50 L160 30 Q180 25 210 22" stroke="var(--accent-green)" stroke-width="2.5" fill="none"/>
      <text x="180" y="18" font-size="10" fill="var(--accent-green)" font-weight="600">+20dB</text>
      <!-- Loss curve -->
      <path d="M30 50 L80 50 Q120 55 150 75 Q180 90 210 95" stroke="var(--accent-red)" stroke-width="2" fill="none" stroke-dasharray="5,3"/>
      <text x="180" y="95" font-size="10" fill="var(--accent-red)" font-weight="600">−10dB</text>
    </svg>`,
    html: `
      <div class="calc-input-group">
        <label>Loại đại lượng:</label>
        <select id="dbType" class="color-select"><option value="power">Công suất (10×log₁₀)</option><option value="voltage">Điện áp/Dòng (20×log₁₀)</option></select>
      </div>
      <div class="calc-input-group"><label>Giá trị đo (P2/V2)</label><input type="number" id="dbIn"><span class="unit">In</span></div>
      <div class="calc-input-group"><label>Giá trị tham chiếu (P1/V1)</label><input type="number" id="dbRef" value="1"><span class="unit">Ref</span></div>
      <button class="btn btn-primary" id="calcDbBtn" style="margin-top:8px; width:100%">Tính dB</button>
      <div class="calc-result" id="dbResult" style="display:none;"></div>
    `
  },
  dbmWatt: {
    title: 'Chuyển đổi dBm / Watt',
    description: 'Chuyển đổi giữa công suất Tuyệt đối (dBm) và Tương đối (Watt/mW).',
    visual: `<svg width="220" height="100" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- dBm box -->
      <rect x="15" y="25" width="80" height="50" rx="8" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="55" y="55" font-size="16" fill="var(--primary)" text-anchor="middle" font-weight="700">dBm</text>
      <!-- Arrow → -->
      <line x1="100" y1="50" x2="120" y2="50" stroke="var(--accent-orange)" stroke-width="2"/>
      <polygon points="120,45 130,50 120,55" fill="var(--accent-orange)"/>
      <!-- Arrow ← -->
      <line x1="100" y1="58" x2="120" y2="58" stroke="var(--accent-orange)" stroke-width="2"/>
      <polygon points="100,53 90,58 100,63" fill="var(--accent-orange)"/>
      <!-- Watt box -->
      <rect x="125" y="25" width="80" height="50" rx="8" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <text x="165" y="55" font-size="16" fill="var(--primary)" text-anchor="middle" font-weight="700">Watt</text>
      <!-- Formulas -->
      <text x="110" y="95" font-size="9" fill="var(--text-muted)" text-anchor="middle">P(W) = 10^((dBm−30)/10)</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>dBm</label><input type="number" id="dbmIn"><span class="unit">dBm</span></div>
      <div class="calc-input-group"><label>Watt (W)</label><input type="number" id="wattIn"><span class="unit">W</span></div>
      <div style="display:flex; gap:12px; margin-top:8px;">
        <button class="btn btn-primary" id="calcDbmBtn" style="flex:1">dBm → Watt</button>
        <button class="btn btn-primary" id="calcWattBtn" style="flex:1">Watt → dBm</button>
      </div>
      <div class="calc-result" id="dwResult" style="display:none;"></div>
    `
  }
};

export function bindRF(calcId) {
  if (calcId === 'decibelCalc') bindDecibel();
  if (calcId === 'dbmWatt') bindDbmWatt();
}

function bindDecibel() {
  document.getElementById('calcDbBtn').addEventListener('click', () => {
    let type = document.getElementById('dbType').value;
    let vIn = parseFloat(document.getElementById('dbIn').value);
    let vRef = parseFloat(document.getElementById('dbRef').value);
    if (isNaN(vIn) || isNaN(vRef) || vIn <= 0 || vRef <= 0) return;
    let mult = (type === 'power') ? 10 : 20;
    let db = mult * Math.log10(vIn / vRef);
    const res = document.getElementById('dbResult'); res.style.display = 'block';
    res.innerHTML = `<h4>Kết quả:</h4><div class="calc-result-value">${db.toFixed(2)} dB</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> dB = ${mult} × log₁₀(${type === 'power' ? 'P2/P1' : 'V2/V1'})<br>
        dB = ${mult} × log₁₀(${vIn} / ${vRef}) = ${mult} × log₁₀(${(vIn/vRef).toFixed(4)})<br>
        dB = ${mult} × ${Math.log10(vIn/vRef).toFixed(4)} = <strong>${db.toFixed(2)} dB</strong>
      </div>`;
  });
}

function bindDbmWatt() {
  document.getElementById('calcDbmBtn').addEventListener('click', () => {
    let dbm = parseFloat(document.getElementById('dbmIn').value);
    if (isNaN(dbm)) return;
    let watt = Math.pow(10, (dbm - 30) / 10);
    let mw = watt * 1000;
    const res = document.getElementById('dwResult'); res.style.display = 'block';
    let display = watt >= 1 ? watt.toFixed(3) + ' W' : mw.toFixed(2) + ' mW';
    res.innerHTML = `<h4>Công suất:</h4><div class="calc-result-value">${display}</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> P(W) = 10^((dBm − 30) / 10)<br>
        P = 10^((${dbm} − 30) / 10) = 10^(${((dbm-30)/10).toFixed(2)}) = <strong>${display}</strong>
      </div>`;
  });

  document.getElementById('calcWattBtn').addEventListener('click', () => {
    let watt = parseFloat(document.getElementById('wattIn').value);
    if (isNaN(watt) || watt <= 0) return;
    let dbm = 10 * Math.log10(watt) + 30;
    const res = document.getElementById('dwResult'); res.style.display = 'block';
    res.innerHTML = `<h4>Công suất:</h4><div class="calc-result-value">${dbm.toFixed(2)} dBm</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> dBm = 10 × log₁₀(P) + 30<br>
        dBm = 10 × log₁₀(${watt}) + 30 = 10 × ${Math.log10(watt).toFixed(4)} + 30 = <strong>${dbm.toFixed(2)} dBm</strong>
      </div>`;
  });
}

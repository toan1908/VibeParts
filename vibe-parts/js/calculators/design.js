// PCB Design and Magnetics

export const DESIGN_DATA = {
  pcbTrace: {
    title: 'Độ rộng đường mạch PCB (IPC-2221)',
    description: 'Tính toán chiều rộng đường mạch dựa trên dòng điện và độ tăng nhiệt.',
    visual: `<svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- PCB board -->
      <rect x="20" y="30" width="180" height="60" rx="4" fill="#1a5c2a" fill-opacity="0.3" stroke="#2d8a4e" stroke-width="1.5"/>
      <!-- Copper trace -->
      <rect x="40" y="50" width="140" height="20" rx="2" fill="#d4943a" fill-opacity="0.6" stroke="#d4943a" stroke-width="1.5"/>
      <text x="110" y="64" font-size="11" fill="#8B4513" text-anchor="middle" font-weight="600">Cu Trace</text>
      <!-- Width annotation -->
      <line x1="40" y1="78" x2="40" y2="98" stroke="var(--accent-orange)" stroke-width="1"/>
      <line x1="180" y1="78" x2="180" y2="98" stroke="var(--accent-orange)" stroke-width="1"/>
      <line x1="40" y1="90" x2="180" y2="90" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <polygon points="45,87 40,90 45,93" fill="var(--accent-orange)"/>
      <polygon points="175,87 180,90 175,93" fill="var(--accent-orange)"/>
      <text x="110" y="105" font-size="10" fill="var(--accent-orange)" text-anchor="middle" font-weight="600">Width (W)</text>
      <!-- Thickness -->
      <line x1="190" y1="50" x2="210" y2="50" stroke="var(--text-muted)" stroke-width="0.5"/>
      <line x1="190" y1="70" x2="210" y2="70" stroke="var(--text-muted)" stroke-width="0.5"/>
      <line x1="205" y1="50" x2="205" y2="70" stroke="var(--text-muted)" stroke-width="1"/>
      <text x="212" y="64" font-size="8" fill="var(--text-muted)">T</text>
      <!-- Current arrow -->
      <line x1="20" y1="20" x2="60" y2="20" stroke="var(--primary)" stroke-width="1.5"/>
      <polygon points="55,17 60,20 55,23" fill="var(--primary)"/>
      <text x="42" y="15" font-size="10" fill="var(--primary)" text-anchor="middle">I (A)</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>Dòng điện (I)</label><input type="number" id="pcbI" value="1"><span class="unit">A</span></div>
      <div class="calc-input-group"><label>Độ tăng T</label><input type="number" id="pcbDT" value="10"><span class="unit">°C</span></div>
      <div class="calc-input-group"><label>Độ dày đồng</label><select id="pcbThick" class="color-select"><option value="35">35 µm (1 oz)</option><option value="70">70 µm (2 oz)</option></select></div>
      <div class="calc-input-group"><label>Vị trí</label><select id="pcbLoc" class="color-select"><option value="ext">Lớp ngoài (External)</option><option value="int">Lớp trong (Internal)</option></select></div>
      <button class="btn btn-primary" id="calcPcbBtn" style="margin-top:8px; width:100%">Tính Độ Rộng</button>
      <div class="calc-result" id="pcbResult" style="display:none;"></div>
    `
  },
  airCoreInd: {
    title: 'Cuộn cảm lõi không khí',
    description: 'Tính toán độ tự cảm (L) cho cuộn cảm một lớp (Wheeler formula).',
    visual: `<svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Coil windings -->
      <ellipse cx="60" cy="60" rx="20" ry="35" stroke="var(--primary)" stroke-width="1" fill="none" stroke-dasharray="3,3"/>
      <path d="M40 60 Q40 25 60 25 Q80 25 80 60 Q80 95 60 95 Q40 95 40 60" stroke="var(--primary)" stroke-width="2" fill="none"/>
      <path d="M55 60 Q55 30 75 30 Q95 30 95 60 Q95 90 75 90 Q55 90 55 60" stroke="var(--primary)" stroke-width="2" fill="none"/>
      <path d="M70 60 Q70 35 90 35 Q110 35 110 60 Q110 85 90 85 Q70 85 70 60" stroke="var(--primary)" stroke-width="2" fill="none"/>
      <!-- Leads -->
      <line x1="40" y1="60" x2="20" y2="60" stroke="var(--primary)" stroke-width="2"/>
      <line x1="110" y1="60" x2="130" y2="60" stroke="var(--primary)" stroke-width="2"/>
      <!-- Dimensions -->
      <line x1="40" y1="100" x2="110" y2="100" stroke="var(--accent-orange)" stroke-width="1"/>
      <text x="75" y="115" font-size="10" fill="var(--accent-orange)" text-anchor="middle">l (chiều dài)</text>
      <line x1="135" y1="25" x2="135" y2="95" stroke="var(--accent-green)" stroke-width="1"/>
      <text x="150" y="65" font-size="10" fill="var(--accent-green)">d</text>
      <!-- Formula -->
      <text x="170" y="115" font-size="8" fill="var(--text-muted)" text-anchor="middle">L = d²n²/(18d+40l)</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>Đường kính cuộn (d)</label><input type="number" id="acId"><span class="unit">mm</span></div>
      <div class="calc-input-group"><label>Chiều dài cuộn (l)</label><input type="number" id="acIl"><span class="unit">mm</span></div>
      <div class="calc-input-group"><label>Số vòng (n)</label><input type="number" id="acIn"><span class="unit">Vòng</span></div>
      <button class="btn btn-primary" id="calcAcBtn" style="margin-top:8px; width:100%">Tính L</button>
      <div class="calc-result" id="acResult" style="display:none;"></div>
    `
  },
  toroidInd: {
    title: 'Cuộn cảm Toroid',
    description: 'Tính toán L dựa trên hằng số Al của lõi.',
    visual: `<svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Toroid core -->
      <circle cx="90" cy="65" r="40" stroke="var(--text-muted)" stroke-width="14" fill="none" opacity="0.4"/>
      <circle cx="90" cy="65" r="40" stroke="var(--primary)" stroke-width="2" fill="none"/>
      <circle cx="90" cy="65" r="26" stroke="var(--primary)" stroke-width="2" fill="none"/>
      <!-- Windings (lines across core) -->
      <line x1="68" y1="30" x2="60" y2="45" stroke="var(--accent-orange)" stroke-width="2"/>
      <line x1="78" y1="27" x2="73" y2="42" stroke="var(--accent-orange)" stroke-width="2"/>
      <line x1="88" y1="25" x2="86" y2="40" stroke="var(--accent-orange)" stroke-width="2"/>
      <line x1="98" y1="25" x2="99" y2="40" stroke="var(--accent-orange)" stroke-width="2"/>
      <line x1="108" y1="27" x2="112" y2="42" stroke="var(--accent-orange)" stroke-width="2"/>
      <line x1="118" y1="32" x2="124" y2="46" stroke="var(--accent-orange)" stroke-width="2"/>
      <!-- Labels -->
      <text x="90" y="70" font-size="10" fill="var(--primary)" text-anchor="middle" font-weight="600">Al</text>
      <text x="90" y="125" font-size="10" fill="var(--text-muted)" text-anchor="middle">L = Al × N²</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>Al lõi</label><input type="number" id="trAl"><span class="unit">nH/T²</span></div>
      <div class="calc-input-group"><label>Số vòng (N)</label><input type="number" id="trN"><span class="unit">Vòng</span></div>
      <button class="btn btn-primary" id="calcTrBtn" style="margin-top:8px; width:100%">Tính L</button>
      <div class="calc-result" id="trResult" style="display:none;"></div>
    `
  }
};

export function bindDesign(calcId) {
  if (calcId === 'pcbTrace') bindPcbTrace();
  if (calcId === 'airCoreInd') bindAirCore();
  if (calcId === 'toroidInd') bindToroid();
}

function bindPcbTrace() {
  document.getElementById('calcPcbBtn').addEventListener('click', () => {
    let i = parseFloat(document.getElementById('pcbI').value);
    let dt = parseFloat(document.getElementById('pcbDT').value);
    let thick_um = parseFloat(document.getElementById('pcbThick').value);
    let thick = thick_um / 25.4; // µm to mil
    let loc = document.getElementById('pcbLoc').value;
    if (isNaN(i) || isNaN(dt)) return;
    let k = (loc === 'ext') ? 0.048 : 0.024;
    let b = 0.44; let c = 0.725;
    let area = Math.pow(i / (k * Math.pow(dt, b)), 1/c);
    let width = area / thick;
    let width_mm = width * 0.0254;
    const res = document.getElementById('pcbResult'); res.style.display = 'block';
    res.innerHTML = `<h4>Độ rộng tối thiểu:</h4><div class="calc-result-value">${width_mm.toFixed(2)} mm</div>
      <div style="font-size:13px; color:var(--text-muted);">~ ${width.toFixed(1)} mil</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Chuẩn IPC-2221 (${loc === 'ext' ? 'External' : 'Internal'}):</strong><br>
        k = ${k}, b = ${b}, c = ${c}<br>
        A = (I / (k × ΔT^b))^(1/c) = (${i} / (${k} × ${dt}^${b}))^(1/${c})<br>
        A = ${area.toFixed(1)} sq mil<br>
        W = A / Thickness = ${area.toFixed(1)} / ${thick.toFixed(2)} = <strong>${width.toFixed(1)} mil = ${width_mm.toFixed(2)} mm</strong>
      </div>`;
  });
}

function bindAirCore() {
  document.getElementById('calcAcBtn').addEventListener('click', () => {
    let d_mm = parseFloat(document.getElementById('acId').value);
    let l_mm = parseFloat(document.getElementById('acIl').value);
    let n = parseFloat(document.getElementById('acIn').value);
    if (isNaN(d_mm) || isNaN(l_mm) || isNaN(n)) return;
    let d = d_mm * 0.03937; // mm to inch
    let l = l_mm * 0.03937;
    let ind = (d * d * n * n) / (18 * d + 40 * l);
    const res = document.getElementById('acResult'); res.style.display = 'block';
    res.innerHTML = `<h4>Độ tự cảm (L):</h4><div class="calc-result-value">${ind.toFixed(3)} µH</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Wheeler Formula:</strong> L(µH) = d² × n² / (18d + 40l)<br>
        d = ${d_mm} mm = ${d.toFixed(4)} inch<br>
        l = ${l_mm} mm = ${l.toFixed(4)} inch<br>
        L = ${d.toFixed(4)}² × ${n}² / (18×${d.toFixed(4)} + 40×${l.toFixed(4)})<br>
        L = ${(d*d*n*n).toFixed(2)} / ${(18*d+40*l).toFixed(2)} = <strong>${ind.toFixed(3)} µH</strong>
      </div>`;
  });
}

function bindToroid() {
  document.getElementById('calcTrBtn').addEventListener('click', () => {
    let Al = parseFloat(document.getElementById('trAl').value);
    let n = parseFloat(document.getElementById('trN').value);
    if (isNaN(Al) || isNaN(n)) return;
    let l_nh = Al * n * n;
    let l_uh = l_nh / 1000;
    const res = document.getElementById('trResult'); res.style.display = 'block';
    let display = l_uh >= 1 ? l_uh.toFixed(2) + ' µH' : l_nh.toFixed(0) + ' nH';
    res.innerHTML = `<h4>Độ tự cảm (L):</h4><div class="calc-result-value">${display}</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> L(nH) = Al × N²<br>
        L = ${Al} nH/T² × ${n}² = ${Al} × ${n*n} = <strong>${l_nh.toFixed(0)} nH = ${l_uh.toFixed(3)} µH</strong>
      </div>`;
  });
}

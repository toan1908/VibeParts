// RLC Component Calculators

export const COMPONENTS_DATA = {
  resistorColor: {
    title: 'Mã màu Điện trở (4 Vạch)',
    description: 'Dịch mã màu điện trở cắm thành giá trị Ω.',
    visual: `<svg width="150" height="80" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 40 L35 40 M115 40 L145 40" stroke="var(--text-muted)" stroke-width="3"/>
      <path d="M35 30 Q35 20 45 20 L105 20 Q115 20 115 30 L115 50 Q115 60 105 60 L45 60 Q35 60 35 50 Z" fill="#e2e8f0" stroke="var(--border-color)" stroke-width="1"/>
      <rect id="svBand1" x="50" y="20" width="8" height="40" fill="#8B4513"/>
      <rect id="svBand2" x="65" y="22" width="8" height="36" fill="black"/>
      <rect id="svBand3" x="80" y="22" width="8" height="36" fill="#ef4444"/>
      <rect id="svBand4" x="100" y="20" width="8" height="40" fill="#eab308"/>
    </svg>`,
    html: `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="calc-input-group"><label>Vạch 1</label><select id="rcBand1" class="color-select">
          <option value="0">Đen (0)</option><option value="1" selected>Nâu (1)</option><option value="2">Đỏ (2)</option><option value="3">Cam (3)</option><option value="4">Vàng (4)</option><option value="5">Lục (5)</option><option value="6">Lam (6)</option><option value="7">Tím (7)</option><option value="8">Xám (8)</option><option value="9">Trắng (9)</option>
        </select></div>
        <div class="calc-input-group"><label>Vạch 2</label><select id="rcBand2" class="color-select">
          <option value="0" selected>Đen (0)</option><option value="1">Nâu (1)</option><option value="2">Đỏ (2)</option><option value="3">Cam (3)</option><option value="4">Vàng (4)</option><option value="5">Lục (5)</option><option value="6">Lam (6)</option><option value="7">Tím (7)</option><option value="8">Xám (8)</option><option value="9">Trắng (9)</option>
        </select></div>
        <div class="calc-input-group"><label>Vạch 3 (Nhân)</label><select id="rcBand3" class="color-select">
          <option value="1">Đen (x1)</option><option value="10" selected>Nâu (x10)</option><option value="100">Đỏ (x100)</option><option value="1000">Cam (x1k)</option><option value="10000">Vàng (x10k)</option><option value="100000">Lục (x100k)</option><option value="1000000">Lam (x1M)</option><option value="0.1">Vàng kim (x0.1)</option><option value="0.01">Bạc (x0.01)</option>
        </select></div>
        <div class="calc-input-group"><label>Vạch 4 (Sai số)</label><select id="rcBand4" class="color-select">
          <option value="1">Nâu (±1%)</option><option value="2">Đỏ (±2%)</option><option value="0.5">Lục (±0.5%)</option><option value="0.25">Lam (±0.25%)</option><option value="0.1">Tím (±0.1%)</option><option value="5" selected>Vàng kim (±5%)</option><option value="10">Bạc (±10%)</option>
        </select></div>
      </div>
      <div class="calc-result" id="colorResult" style="display:block; margin-top:16px;"></div>
    `
  },
  smdResistor: {
    title: 'Giải mã Điện trở dán (SMD Resistor)',
    description: 'Giải mã mã 3 chữ số, 4 chữ số và hệ EIA-96.',
    visual: `<svg width="150" height="80" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="25" width="90" height="30" rx="2" fill="#222"/>
      <rect x="25" y="25" width="10" height="30" fill="#ccc"/>
      <rect x="115" y="25" width="10" height="30" fill="#ccc"/>
      <text x="75" y="46" font-family="monospace" font-size="14" fill="white" text-anchor="middle" font-weight="bold" id="smdSvgText">103</text>
    </svg>`,
    html: `
      <div class="calc-input-group">
        <label>Nhập mã SMD (Ví dụ: 103, 1002, 01C)</label>
        <input type="text" id="smdInput" maxlength="4" placeholder="103" style="text-transform: uppercase;">
      </div>
      <div class="calc-result" id="smdResult" style="display:none;"></div>
      <div style="margin-top:12px; font-size:11px; color:var(--text-muted)">
        • <strong>3 số:</strong> 10 + 3 số 0 = 10,000 Ω<br>
        • <strong>EIA-96:</strong> 01 + C (100 * 100) = 10,000 Ω
      </div>
    `
  },
  capCode: {
    title: 'Mã tụ điện (Capacitor Codes)',
    description: 'Dịch mã tụ gốm (Ceramic) và tụ Polyester (vd: 104, 222).',
    visual: `<svg width="150" height="80" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M75 10 V30 M70 30 H80 M70 35 H80 M75 35 V70" stroke="var(--primary)" stroke-width="2"/>
      <circle cx="75" cy="32" r="15" fill="var(--accent-orange)" fill-opacity="0.3" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <text x="75" y="36" font-family="sans-serif" font-size="8" fill="var(--text-primary)" text-anchor="middle" font-weight="bold">104</text>
    </svg>`,
    html: `
      <div class="calc-input-group">
        <label>Nhập mã tụ (Ví dụ: 104, 222, 103)</label>
        <input type="text" id="capInput" maxlength="3" placeholder="104">
      </div>
      <div class="calc-result" id="capResult" style="display:none;"></div>
    `
  },
  serialParallelR: {
    title: 'Ghép nối Điện trở (Resistors S/P)',
    description: 'Tính tổng trở tương đương của các điện trở mắc nối tiếp hoặc song song.',
    visual: `<svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="20" width="30" height="15" fill="white" stroke="var(--primary)" stroke-width="2"/>
      <rect x="80" y="20" width="30" height="15" fill="white" stroke="var(--primary)" stroke-width="2"/>
      <path d="M20 27 H40 M70 27 H80 M110 27 H130" stroke="var(--primary)" stroke-width="2"/>
    </svg>`,
    html: `
      <div class="calc-input-group">
        <label>Kiểu ghép:</label>
        <select id="rMode" class="color-select"><option value="series">Nối tiếp (Series)</option><option value="parallel">Song song (Parallel)</option></select>
      </div>
      <div class="calc-input-group"><label>Giá trị (cách nhau bởi dấu phẩy ,)</label><input type="text" id="rList" placeholder="100, 220, 330"></div>
      <button class="btn btn-primary" id="calcRListBtn" style="margin-top:8px; width:100%">Tính Toán</button>
      <div class="calc-result" id="rListResult" style="display:none;"></div>
    `
  },
  serialParallelC: {
    title: 'Ghép nối Tụ điện (Capacitors S/P)',
    description: 'Tính tổng điện dung tương đương (Series/Parallel).',
    visual: `<svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20 V50 M40 50 H60 M40 55 H60 M50 55 V85" stroke="var(--primary)" stroke-width="2"/>
    </svg>`,
    html: `
      <div class="calc-input-group">
        <label>Kiểu ghép:</label>
        <select id="cMode" class="color-select"><option value="parallel">Song song (Parallel)</option><option value="series">Nối tiếp (Series)</option></select>
      </div>
      <div class="calc-input-group"><label>Giá trị (uF, cách nhau dấu ,)</label><input type="text" id="cList" placeholder="10, 22, 47"></div>
      <button class="btn btn-primary" id="calcCListBtn" style="margin-top:8px; width:100%">Tính Toán</button>
      <div class="calc-result" id="cListResult" style="display:none;"></div>
    `
  },
  serialParallelL: {
    title: 'Ghép nối Cuộn cảm (Inductors S/P)',
    description: 'Tính tổng cảm kháng tương đương (Series/Parallel).',
    visual: `<svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 50 Q40 30 50 50 Q60 30 70 50 Q80 30 90 50 Q100 30 110 50" stroke="var(--primary)" stroke-width="2"/>
    </svg>`,
    html: `
      <div class="calc-input-group">
        <label>Kiểu ghép:</label>
        <select id="lMode" class="color-select"><option value="series">Nối tiếp (Series)</option><option value="parallel">Song song (Parallel)</option></select>
      </div>
      <div class="calc-input-group"><label>Giá trị (mH, cách nhau dấu ,)</label><input type="text" id="lList" placeholder="1, 10, 4.7"></div>
      <button class="btn btn-primary" id="calcLListBtn" style="margin-top:8px; width:100%">Tính Toán</button>
      <div class="calc-result" id="lListResult" style="display:none;"></div>
    `
  }
};

export function bindComponents(calcId) {
  if (calcId === 'resistorColor') bindResistorColor();
  if (calcId === 'smdResistor') bindSmdResistor();
  if (calcId === 'capCode') bindCapCode();
  if (calcId === 'serialParallelR') bindSerialParallelR();
  if (calcId === 'serialParallelC') bindSerialParallelC();
  if (calcId === 'serialParallelL') bindSerialParallelL();
}

function bindResistorColor() {
  const b1 = document.getElementById('rcBand1'), b2 = document.getElementById('rcBand2'), b3 = document.getElementById('rcBand3'), b4 = document.getElementById('rcBand4');
  const res = document.getElementById('colorResult');
  const COLORS = { '0': 'black', '1': '#8B4513', '2': '#ef4444', '3': '#ea580c', '4': '#eab308', '5': '#22c55e', '6': '#3b82f6', '7': '#a855f7', '8': '#6b7280', '9': 'white' };
  function update() {
    let final = parseInt(b1.value + b2.value) * parseFloat(b3.value);
    document.getElementById('svBand1').setAttribute('fill', COLORS[b1.value]);
    document.getElementById('svBand2').setAttribute('fill', COLORS[b2.value]);
    let m = b3.value; let mC = COLORS[m]||(m==='0.1'?'#eab308':'#94a3b8');
    document.getElementById('svBand3').setAttribute('fill', mC);
    let t = b4.value; let tC = t==='1'?'#8B4513':t==='2'?'#ef4444':t==='0.5'?'#22c55e':t==='0.25'?'#3b82f6':t==='0.1'?'#a855f7':t==='5'?'#eab308':'#94a3b8';
    document.getElementById('svBand4').setAttribute('fill', tC);
    let d = final >= 1e6 ? (final/1e6).toFixed(2)+' MΩ' : final >= 1e3 ? (final/1e3).toFixed(2)+' kΩ' : final.toFixed(1)+' Ω';
    res.innerHTML = `<h4>Giá trị:</h4><div class="calc-result-value">${d} <span style="font-size:16px; color:var(--text-secondary)">±${t}%</span></div>`;
  }
  [b1, b2, b3, b4].forEach(el => el.addEventListener('change', update)); update();
}

function bindSmdResistor() {
  const input = document.getElementById('smdInput');
  const res = document.getElementById('smdResult');
  const svgText = document.getElementById('smdSvgText');
  
  const EIA96_CODES = {"01":100,"02":102,"03":105,"04":107,"05":110,"06":113,"07":115,"08":118,"09":121,"10":124,"11":127,"12":130,"13":133,"14":137,"15":140,"16":143,"17":147,"18":150,"19":154,"20":158,"21":162,"22":165,"23":169,"24":174,"25":178,"26":182,"27":187,"28":191,"29":196,"30":200,"31":205,"32":210,"33":215,"34":221,"35":226,"36":232,"37":237,"38":243,"39":249,"40":255,"41":261,"42":267,"43":274,"44":280,"45":287,"46":294,"47":301,"48":309,"49":316,"50":324,"51":332,"52":340,"53":348,"54":357,"55":365,"56":374,"57":383,"58":392,"59":402,"60":412,"61":422,"62":432,"63":442,"64":453,"65":464,"66":475,"67":487,"68":499,"69":511,"70":523,"71":536,"72":549,"73":562,"74":576,"75":590,"76":604,"77":619,"78":634,"79":649,"80":665,"81":681,"82":698,"83":715,"84":732,"85":750,"86":768,"87":787,"88":806,"89":825,"90":845,"91":866,"92":887,"93":909,"94":931,"95":953,"96":976}; 
  const EIA96_MULT = {"Z":0.01,"Y":0.01,"X":0.1,"s":0.1,"A":1,"B":10,"C":100,"D":1000,"E":10000,"F":100000};

  input.addEventListener('input', () => {
    let val = input.value.trim().toUpperCase();
    svgText.textContent = val || '103';
    if (!val) { res.style.display = 'none'; return; }
    res.style.display = 'block';
    
    let Ω = 0;
    if (val.length === 3 && /^\d+$/.test(val)) {
      Ω = parseInt(val.substring(0,2)) * Math.pow(10, parseInt(val[2]));
    } else if (val.length === 4 && /^\d+$/.test(val)) {
      Ω = parseInt(val.substring(0,3)) * Math.pow(10, parseInt(val[3]));
    } else if (val.length === 3 && /^\d{2}[A-FXYZS]$/i.test(val)) {
      let code = val.substring(0,2);
      let mult = val[2].toUpperCase();
      let multKey = (mult === 'S') ? 's' : mult;
      if (EIA96_CODES[code] && EIA96_MULT[multKey]) { Ω = EIA96_CODES[code] * EIA96_MULT[multKey]; }
      else { res.innerHTML = '<span style="color:red">Sai định dạng EIA-96</span>'; return; }
    } else if (val.includes('R')) {
      Ω = parseFloat(val.replace('R', '.'));
    } else { res.innerHTML = '<span style="color:red">Mã không hợp lệ</span>'; return; }

    let d = Ω >= 1e6 ? (Ω/1e6).toFixed(2)+' MΩ' : Ω >= 1e3 ? (Ω/1e3).toFixed(2)+' kΩ' : Ω+' Ω';
    res.innerHTML = `<h4>Kết quả:</h4><div class="calc-result-value">${d}</div>`;
  });
}

function bindCapCode() {
  const input = document.getElementById('capInput');
  const res = document.getElementById('capResult');
  input.addEventListener('input', () => {
    let val = input.value.trim();
    if (!/^\d{3}$/.test(val)) { res.style.display = 'none'; return; }
    res.style.display = 'block';
    let pF = parseInt(val.substring(0,2)) * Math.pow(10, parseInt(val[2]));
    let nF = pF / 1000;
    let uF = nF / 1000;
    res.innerHTML = `<h4>Giá trị Tụ điện:</h4>
      <div style="font-size:16px; font-weight:bold">${pF} pF | ${nF} nF | ${uF.toFixed(6)} µF</div>`;
  });
}

function parseList(str) { return str.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v)); }

function bindSerialParallelR() {
  document.getElementById('calcRListBtn').addEventListener('click', () => {
    let mode = document.getElementById('rMode').value;
    let list = parseList(document.getElementById('rList').value);
    if (list.length < 2) return;
    let res = 0;
    let formula = '';
    if (mode === 'series') {
      res = list.reduce((a, b) => a + b, 0);
      formula = `Req = R1 + R2 + ... = ${list.join(' + ')} = <strong>${res.toFixed(2)} Ω</strong>`;
    } else {
      res = 1 / list.reduce((a, b) => a + (1/b), 0);
      formula = `1/Req = ${list.map(v => '1/'+v).join(' + ')} = ${list.reduce((a,b) => a+(1/b), 0).toFixed(6)}<br>Req = <strong>${res.toFixed(2)} Ω</strong>`;
    }
    const rArea = document.getElementById('rListResult');
    rArea.style.display = 'block';
    rArea.innerHTML = `<h4>Tổng trở (Req):</h4><div class="calc-result-value">${res.toFixed(2)} Ω</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức (${mode === 'series' ? 'Nối tiếp' : 'Song song'}):</strong><br>${formula}
      </div>`;
  });
}

function bindSerialParallelC() {
  document.getElementById('calcCListBtn').addEventListener('click', () => {
    let mode = document.getElementById('cMode').value;
    let list = parseList(document.getElementById('cList').value);
    if (list.length < 2) return;
    let res = 0;
    let formula = '';
    if (mode === 'parallel') {
      res = list.reduce((a, b) => a + b, 0);
      formula = `Ceq = C1 + C2 + ... = ${list.join(' + ')} = <strong>${res.toFixed(3)} µF</strong>`;
    } else {
      res = 1 / list.reduce((a, b) => a + (1/b), 0);
      formula = `1/Ceq = ${list.map(v => '1/'+v).join(' + ')} = ${list.reduce((a,b) => a+(1/b), 0).toFixed(6)}<br>Ceq = <strong>${res.toFixed(3)} µF</strong>`;
    }
    const rArea = document.getElementById('cListResult');
    rArea.style.display = 'block';
    rArea.innerHTML = `<h4>Tổng điện dung (Ceq):</h4><div class="calc-result-value">${res.toFixed(3)} µF</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức (${mode === 'parallel' ? 'Song song' : 'Nối tiếp'}):</strong><br>${formula}
      </div>`;
  });
}

function bindSerialParallelL() {
  document.getElementById('calcLListBtn').addEventListener('click', () => {
    let mode = document.getElementById('lMode').value;
    let list = parseList(document.getElementById('lList').value);
    if (list.length < 2) return;
    let res = 0;
    let formula = '';
    if (mode === 'series') {
      res = list.reduce((a, b) => a + b, 0);
      formula = `Leq = L1 + L2 + ... = ${list.join(' + ')} = <strong>${res.toFixed(3)} mH</strong>`;
    } else {
      res = 1 / list.reduce((a, b) => a + (1/b), 0);
      formula = `1/Leq = ${list.map(v => '1/'+v).join(' + ')} = ${list.reduce((a,b) => a+(1/b), 0).toFixed(6)}<br>Leq = <strong>${res.toFixed(3)} mH</strong>`;
    }
    const rArea = document.getElementById('lListResult');
    rArea.style.display = 'block';
    rArea.innerHTML = `<h4>Tổng cảm kháng (Leq):</h4><div class="calc-result-value">${res.toFixed(3)} mH</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức (${mode === 'series' ? 'Nối tiếp' : 'Song song'}):</strong><br>${formula}
      </div>`;
  });
}

// Transistor and Advanced RF

export const TRANSISTOR_DATA = {
  ceLoadLine: {
    title: 'BJT Common Emitter (CE) Load Line',
    description: 'Tính toán điểm làm việc (Q-point) và vẽ đường tải cho mạch CE.',
    visual: `<svg width="220" height="180" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Axes -->
      <line x1="40" y1="150" x2="200" y2="150" stroke="var(--text-muted)" stroke-width="1.5"/>
      <line x1="40" y1="20" x2="40" y2="150" stroke="var(--text-muted)" stroke-width="1.5"/>
      <!-- Axis labels -->
      <text x="120" y="170" font-size="10" fill="var(--text-muted)" text-anchor="middle">Vce (V)</text>
      <text x="15" y="85" font-size="10" fill="var(--text-muted)" transform="rotate(-90,15,85)">Ic (mA)</text>
      <!-- Load line -->
      <line x1="40" y1="30" x2="190" y2="150" stroke="var(--accent-red)" stroke-width="2.5"/>
      <!-- Q-point -->
      <circle cx="115" cy="90" r="6" fill="var(--primary)" stroke="white" stroke-width="2"/>
      <text x="128" y="82" font-size="11" fill="var(--primary)" font-weight="700">Q</text>
      <!-- Ic(sat) label -->
      <text x="30" y="28" font-size="9" fill="var(--accent-red)" text-anchor="end">Ic(sat)</text>
      <!-- Vcc label -->
      <text x="190" y="165" font-size="9" fill="var(--accent-red)" text-anchor="middle">Vcc</text>
      <!-- Dashed lines from Q -->
      <line x1="40" y1="90" x2="115" y2="90" stroke="var(--primary)" stroke-width="1" stroke-dasharray="3,3"/>
      <line x1="115" y1="90" x2="115" y2="150" stroke="var(--primary)" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="115" y="162" font-size="8" fill="var(--primary)" text-anchor="middle">Vce(Q)</text>
      <text x="35" y="94" font-size="8" fill="var(--primary)" text-anchor="end">Ic(Q)</text>
      <!-- DC Load Line label -->
      <text x="145" y="65" font-size="10" fill="var(--accent-red)" font-weight="600" transform="rotate(38,145,65)">DC Load Line</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>Vcc</label><input type="number" id="ceVcc" value="12"><span class="unit">V</span></div>
      <div class="calc-input-group"><label>Rc</label><input type="number" id="ceRc" value="1000"><span class="unit">Ω</span></div>
      <div class="calc-input-group"><label>Re</label><input type="number" id="ceRe" value="100"><span class="unit">Ω</span></div>
      <div class="calc-input-group"><label>Vce(Q)</label><input type="number" id="ceVceQ" value="6"><span class="unit">V</span></div>
      <button class="btn btn-primary" id="calcCeBtn" style="margin-top:8px; width:100%">Phân tích Q-point</button>
      <div class="calc-result" id="ceResult" style="display:none;"></div>
    `
  },
  skinDepth: {
    title: 'Hiệu ứng bề mặt (Skin Depth)',
    description: 'Tính độ sâu xâm nhập của dòng xoay chiều cao tần vào vật dẫn.',
    visual: `<svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Conductor cross section -->
      <circle cx="90" cy="65" r="45" fill="var(--primary-surface)" stroke="var(--primary)" stroke-width="2"/>
      <!-- Skin depth ring -->
      <circle cx="90" cy="65" r="45" fill="none" stroke="var(--accent-orange)" stroke-width="8" opacity="0.3"/>
      <!-- Inner circle (below skin) -->
      <circle cx="90" cy="65" r="37" stroke="var(--border-color)" stroke-width="1" stroke-dasharray="3,3" fill="none"/>
      <!-- Delta annotation -->
      <line x1="90" y1="20" x2="90" y2="28" stroke="var(--accent-orange)" stroke-width="2"/>
      <line x1="82" y1="20" x2="98" y2="20" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <line x1="82" y1="28" x2="98" y2="28" stroke="var(--accent-orange)" stroke-width="1.5"/>
      <text x="105" y="27" font-size="13" fill="var(--accent-orange)" font-weight="700">δ</text>
      <!-- Current density label -->
      <text x="90" y="60" font-size="9" fill="var(--text-muted)" text-anchor="middle">Dòng điện</text>
      <text x="90" y="72" font-size="9" fill="var(--text-muted)" text-anchor="middle">tập trung</text>
      <text x="90" y="84" font-size="9" fill="var(--text-muted)" text-anchor="middle">ở bề mặt</text>
      <!-- Formula -->
      <text x="90" y="128" font-size="9" fill="var(--text-muted)" text-anchor="middle">δ = 1 / √(πfμσ)</text>
    </svg>`,
    html: `
      <div class="calc-input-group"><label>Tần số (f)</label><input type="number" id="sdF" value="1"><span class="unit">MHz</span></div>
      <div class="calc-input-group"><label>Vật liệu</label><select id="sdMat" class="color-select"><option value="5.8e7">Đồng (Copper)</option><option value="3.5e7">Nhôm (Aluminum)</option><option value="6.3e7">Bạc (Silver)</option><option value="1.0e7">Sắt (Iron)</option></select></div>
      <button class="btn btn-primary" id="calcSdBtn" style="margin-top:8px; width:100%">Tính Skin Depth</button>
      <div class="calc-result" id="sdResult" style="display:none;"></div>
    `
  }
};

export function bindTransistor(calcId) {
  if (calcId === 'ceLoadLine') bindCeLoadLine();
  if (calcId === 'skinDepth') bindSkinDepth();
}

function bindCeLoadLine() {
  document.getElementById('calcCeBtn').addEventListener('click', () => {
    let vcc = parseFloat(document.getElementById('ceVcc').value);
    let rc = parseFloat(document.getElementById('ceRc').value);
    let re = parseFloat(document.getElementById('ceRe').value);
    let vceq = parseFloat(document.getElementById('ceVceQ').value);
    if (isNaN(vcc) || isNaN(rc) || isNaN(re) || isNaN(vceq)) return;
    let ic_sat = vcc / (rc + re);
    let icq = (vcc - vceq) / (rc + re);
    let vcq = vcc - icq * rc;
    const res = document.getElementById('ceResult'); res.style.display = 'block';
    res.innerHTML = `
      <h4>Điểm làm việc Q-point:</h4>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">
        <div class="calc-result-value">Ic(Q) = ${(icq * 1000).toFixed(2)} mA</div>
        <div class="calc-result-value">Vc(Q) = ${vcq.toFixed(2)} V</div>
      </div>
      <div style="font-size:12px; color:var(--text-muted); border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức DC Load Line:</strong><br>
        Ic(sat) = Vcc / (Rc+Re) = ${vcc} / (${rc}+${re}) = <strong>${(ic_sat*1000).toFixed(2)} mA</strong><br>
        Ic(Q) = (Vcc−Vce) / (Rc+Re) = (${vcc}−${vceq}) / (${rc}+${re}) = <strong>${(icq*1000).toFixed(2)} mA</strong><br>
        Vc(Q) = Vcc − Ic×Rc = ${vcc} − ${(icq*1000).toFixed(2)}mA × ${rc}Ω = <strong>${vcq.toFixed(2)} V</strong><br>
        Ve = Ic × Re = ${(icq*1000).toFixed(2)}mA × ${re}Ω = <strong>${(icq*re).toFixed(2)} V</strong>
      </div>`;
  });
}

function bindSkinDepth() {
  document.getElementById('calcSdBtn').addEventListener('click', () => {
    let f_MHz = parseFloat(document.getElementById('sdF').value);
    let f = f_MHz * 1e6;
    let sigma = parseFloat(document.getElementById('sdMat').value);
    let mu0 = 4 * Math.PI * 1e-7;
    if (isNaN(f) || isNaN(sigma)) return;
    let delta = 1 / Math.sqrt(Math.PI * f * mu0 * sigma);
    let delta_um = delta * 1e6;
    let matName = {5.8e7:'Đồng',3.5e7:'Nhôm',6.3e7:'Bạc',1.0e7:'Sắt'}[sigma] || '';
    const res = document.getElementById('sdResult'); res.style.display = 'block';
    res.innerHTML = `<h4>Skin Depth (δ):</h4><div class="calc-result-value">${delta_um.toFixed(2)} µm</div>
      <div style="font-size:13px; color:var(--text-muted);">~ ${(delta*1000).toFixed(4)} mm</div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:10px; border-top:1px solid var(--border-light); padding-top:8px;">
        <strong>Công thức:</strong> δ = 1 / √(π × f × µ₀ × σ)<br>
        Vật liệu: ${matName} (σ = ${sigma.toExponential(1)} S/m)<br>
        µ₀ = 4π × 10⁻⁷ H/m<br>
        δ = 1 / √(π × ${f_MHz}MHz × ${mu0.toExponential(2)} × ${sigma.toExponential(1)})<br>
        δ = 1 / √(${(Math.PI*f*mu0*sigma).toExponential(2)}) = <strong>${delta_um.toFixed(2)} µm</strong>
      </div>`;
  });
}

// ============================================================
// VibeParts - Electronics Calculator (Main Hub)
// ============================================================

import { FUNDAMENTAL_DATA, bindFundamental } from './calculators/fundamental.js';
import { COMPONENTS_DATA, bindComponents } from './calculators/components.js';
import { CIRCUITS_DATA, bindCircuits } from './calculators/circuits.js';
import { ACTIVE_DATA, bindActive } from './calculators/active.js';
import { ANALYSIS_DATA, bindAnalysis } from './calculators/analysis.js';
import { RF_DATA, bindRF } from './calculators/rf.js';
import { DESIGN_DATA, bindDesign } from './calculators/design.js';
import { FILTER_DATA, bindFilter } from './calculators/filters.js';
import { TRANSISTOR_DATA, bindTransistor } from './calculators/transistor.js';

const CALC_DATA = {
  ...FUNDAMENTAL_DATA,
  ...COMPONENTS_DATA,
  ...CIRCUITS_DATA,
  ...ACTIVE_DATA,
  ...ANALYSIS_DATA,
  ...RF_DATA,
  ...DESIGN_DATA,
  ...FILTER_DATA,
  ...TRANSISTOR_DATA
};

export function initCalculator() {
  bindSidebar();
  // Activate first sidebar item visually
  const firstItem = document.querySelector('.calc-menu-item[data-calc="ohmsLaw"]');
  if (firstItem) firstItem.classList.add('active');
  renderCalculator('ohmsLaw');
}

function bindSidebar() {
  document.querySelectorAll('.calc-menu-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.calc-menu-item').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      renderCalculator(e.currentTarget.dataset.calc);
      // Scroll content area to top when switching
      const content = document.getElementById('calcContentArea');
      if (content) content.scrollTop = 0;
    });
  });
}

function renderCalculator(calcId) {
  const data = CALC_DATA[calcId];
  if (!data) {
    console.error('Calculator not found:', calcId);
    return;
  }

  const contentArea = document.getElementById('calcContentArea');
  contentArea.innerHTML = `
    <div class="calc-header">
      <h2>${data.title}</h2>
      <p>${data.description}</p>
    </div>
    <div class="calc-body">
      <div class="calc-visual">${data.visual}</div>
      <div class="calc-form">${data.html}</div>
    </div>
  `;

  // Bind Enter key for all inputs → click the first primary button
  const calcBtn = contentArea.querySelector('.btn-primary');
  if (calcBtn) {
    contentArea.querySelectorAll('input[type="number"], input[type="text"]').forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          calcBtn.click();
        }
      });
    });
  }

  // Bind Logic based on module
  if (FUNDAMENTAL_DATA[calcId]) bindFundamental(calcId);
  else if (COMPONENTS_DATA[calcId]) bindComponents(calcId);
  else if (CIRCUITS_DATA[calcId]) bindCircuits(calcId);
  else if (ACTIVE_DATA[calcId]) bindActive(calcId);
  else if (ANALYSIS_DATA[calcId]) bindAnalysis(calcId);
  else if (RF_DATA[calcId]) bindRF(calcId);
  else if (DESIGN_DATA[calcId]) bindDesign(calcId);
  else if (FILTER_DATA[calcId]) bindFilter(calcId);
  else if (TRANSISTOR_DATA[calcId]) bindTransistor(calcId);
}

// ============================================================
// VibeParts - BOM Analytics Dashboard (Vanilla Canvas)
// ============================================================

import { CATEGORIES, formatPrice } from './components.js';

const CAT_COLORS = {
  mcu: '#3b82f6',      // blue
  sensor: '#10b981',   // green
  resistor: '#f59e0b', // yellow
  capacitor: '#8b5cf6',// purple
  transistor: '#ec4899',// pink
  diode: '#ef4444',    // red
  ic: '#6366f1',       // indigo
  connector: '#64748b',// slate
  all: '#94a3b8'       // default
};

const CAT_NAMES = {};
CATEGORIES.forEach(c => { CAT_NAMES[c.id] = c.name; });

function formatLabel(name) {
  if (name.length > 10) return name.substring(0, 10) + '..';
  return name;
}

// ── Tooltip element (singleton, created once) ──
let tooltip = null;
function getTooltip() {
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.style.cssText = `
      position: fixed;
      pointer-events: none;
      background: var(--bg-card, #fff);
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 12px;
      color: var(--text-primary, #1e293b);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.15s;
      white-space: nowrap;
    `;
    document.body.appendChild(tooltip);
  }
  return tooltip;
}

function showTooltip(e, html) {
  const t = getTooltip();
  t.innerHTML = html;
  t.style.opacity = '1';
  t.style.left = (e.clientX + 12) + 'px';
  t.style.top = (e.clientY - 10) + 'px';
}

function hideTooltip() {
  const t = getTooltip();
  t.style.opacity = '0';
}

// ── Store pie slice data for hit-testing ──
let pieSlices = [];

export function renderBomAnalytics(bomItems) {
  const container = document.getElementById('bomAnalyticsDashboard');
  if (!bomItems || bomItems.length === 0) {
    container.style.display = 'none';
    return;
  }
  
  container.style.display = 'block';

  // Calculate stats
  let totalUnique = bomItems.length;
  let totalItems = 0;
  let totalCost = 0;
  let mostExpensive = null;

  // Component tracking for Pie Chart
  const compBreakdown = [];
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#ef4444', '#0ea5e9', '#84cc16', '#db2777', '#f97316'];

  // Sort items by cost descending to assign colors and group small items if needed
  const validItems = [...bomItems].filter(i => i.component);
  validItems.sort((a, b) => (b.quantity * b.component.price) - (a.quantity * a.component.price));

  validItems.forEach((item, index) => {
    const cost = item.quantity * item.component.price;
    compBreakdown.push({
      id: item.component.id,
      name: item.component.name,
      cat: item.component.category,
      cost: cost,
      color: colors[index % colors.length]
    });
    
    totalItems += item.quantity;
    totalCost += cost;
    if (!mostExpensive || item.component.price > mostExpensive.price) {
      mostExpensive = item.component;
    }
  });

  // Update Stats UI
  document.getElementById('statTotalUnique').textContent = totalUnique;
  document.getElementById('statTotalItems').textContent = totalItems;
  document.getElementById('statAvgPrice').textContent = totalItems > 0 ? formatPrice(Math.round(totalCost / totalItems)) : '0 đ';
  document.getElementById('statMostExpensive').textContent = mostExpensive ? mostExpensive.name : '-';
  
  // Draw Charts
  drawPieChart(compBreakdown, totalCost);
  drawBarChart(validItems);
}

function drawPieChart(compBreakdown, totalCost) {
  const canvas = document.getElementById('bomPieChart');
  const ctx = canvas.getContext('2d');

  // Handle HiDPI / retina displays
  const dpr = window.devicePixelRatio || 1;
  const displayW = canvas.clientWidth || 200;
  const displayH = canvas.clientHeight || 200;
  canvas.width = displayW * dpr;
  canvas.height = displayH * dpr;
  ctx.scale(dpr, dpr);

  const width = displayW;
  const height = displayH;
  const radius = Math.min(width, height) / 2 - 10;
  const innerRadius = radius * 0.5;
  const cx = width / 2;
  const cy = height / 2;

  ctx.clearRect(0, 0, width, height);
  pieSlices = [];

  if (totalCost === 0) {
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.fill();
    return;
  }

  let startAngle = -Math.PI / 2; // start at top

  compBreakdown.forEach((comp) => {
    if (comp.cost === 0) return;
    const sliceAngle = (comp.cost / totalCost) * 2 * Math.PI;
    const color = comp.color;
    
    // Save slice data for hover detection
    pieSlices.push({
      compName: comp.name,
      cat: comp.cat,
      cost: comp.cost,
      percent: ((comp.cost / totalCost) * 100).toFixed(1),
      startAngle,
      endAngle: startAngle + sliceAngle,
      color
    });

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();
    
    // Thin border between slices
    ctx.lineWidth = 2;
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--bg-card').trim() || '#ffffff';
    ctx.stroke();

    startAngle += sliceAngle;
  });
  
  // Draw donut hole
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--bg-card').trim() || '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius, 0, 2 * Math.PI);
  ctx.fill();

  // ── Draw legend dots inside donut center ──
  if (pieSlices.length <= 3) {
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() || '#64748b';
    ctx.fillText('Di chuột để xem', cx, cy - 4);
    ctx.fillText('chi tiết', cx, cy + 10);
  }

  // ── Bind mouse events for interactivity ──
  // Remove old listeners to prevent stacking
  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left - cx;
    const my = e.clientY - rect.top - cy;
    const dist = Math.sqrt(mx * mx + my * my);

    // Only trigger if mouse is in the donut ring area
    if (dist < innerRadius || dist > radius) {
      hideTooltip();
      canvas.style.cursor = 'default';
      return;
    }

    // Calculate angle of mouse position
    let angle = Math.atan2(my, mx);
    // Normalize to match our startAngle at -PI/2
    // atan2 returns [-PI, PI], our slices start at -PI/2
    
    const hit = pieSlices.find(s => {
      // Normalize angle check 
      let a = angle;
      let sa = s.startAngle;
      let ea = s.endAngle;
      
      // Handle wrap-around
      if (ea > Math.PI) {
        if (a < sa) a += 2 * Math.PI;
        return a >= sa && a < ea;
      }
      return a >= sa && a < ea;
    });

    if (hit) {
      canvas.style.cursor = 'pointer';
      showTooltip(e, `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
          <span style="width:10px;height:10px;border-radius:50%;background:${hit.color};display:inline-block;"></span>
          <strong style="font-size: 13px;">${hit.compName}</strong>
        </div>
        <div style="color:var(--text-secondary,#64748b); padding-left:18px;">
          Tổng: <b style="color:var(--text-primary)">${formatPrice(hit.cost)}</b> (${hit.percent}%)
        </div>
      `);
    } else {
      hideTooltip();
      canvas.style.cursor = 'default';
    }
  };

  canvas.onmouseleave = () => {
    hideTooltip();
    canvas.style.cursor = 'default';
  };
}

function drawBarChart(bomItems) {
  const canvas = document.getElementById('bomBarChart');
  const ctx = canvas.getContext('2d');

  // Handle HiDPI
  const dpr = window.devicePixelRatio || 1;
  const displayW = canvas.clientWidth || 400;
  const displayH = canvas.clientHeight || 200;
  canvas.width = displayW * dpr;
  canvas.height = displayH * dpr;
  ctx.scale(dpr, dpr);

  const width = displayW;
  const height = displayH;
  
  ctx.clearRect(0, 0, width, height);

  // Clone + sort top 5
  const validItems = [...bomItems].filter(i => i.component);
  const sortedByCost = validItems.sort((a, b) => (b.quantity * b.component.price) - (a.quantity * a.component.price)).slice(0, 5);

  if (sortedByCost.length === 0) return;

  const maxVal = sortedByCost[0].quantity * sortedByCost[0].component.price;
  
  const padLeft = 10;
  const padBottom = 24;
  const padTop = 10;
  const padRight = 10;
  
  const chartWidth = width - padLeft - padRight;
  const chartHeight = height - padBottom - padTop;
  const barWidth = Math.min((chartWidth / sortedByCost.length) - 10, 40);

  const textColor = getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() || '#64748b';

  // Store rects for hover
  const barRects = [];

  sortedByCost.forEach((item, i) => {
    const cost = item.quantity * item.component.price;
    const barHeight = maxVal > 0 ? (cost / maxVal) * chartHeight : 0;
    
    const x = padLeft + (chartWidth / sortedByCost.length) * i + (chartWidth / sortedByCost.length - barWidth) / 2;
    const y = height - padBottom - barHeight;

    // Bar gradient
    const catColor = CAT_COLORS[item.component.category] || '#4361ee';
    
    barRects.push({
      x, y, w: barWidth, h: barHeight,
      compName: item.component.name,
      qty: item.quantity,
      cost: cost,
      color: catColor
    });

    const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
    gradient.addColorStop(0, catColor);
    gradient.addColorStop(1, catColor + '88');
    ctx.fillStyle = gradient;
    
    // Rounded top corners
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
    ctx.fill();

    // Value label on top of bar
    ctx.fillStyle = catColor;
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    if (barHeight > 20) {
      ctx.fillText(formatPrice(cost), x + barWidth / 2, y - 4);
    }

    // Name label at bottom
    ctx.fillStyle = textColor;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(formatLabel(item.component.name), x + barWidth / 2, height - 5);
  });

  // ── Hover effects for Bar Chart ──
  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const hit = barRects.find(b => mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h);

    if (hit) {
      canvas.style.cursor = 'pointer';
      showTooltip(e, `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
          <span style="width:10px;height:10px;border-radius:2px;background:${hit.color};display:inline-block;"></span>
          <strong style="font-size: 13px;">${hit.compName}</strong>
        </div>
        <div style="color:var(--text-secondary,#64748b); padding-left:18px;">
          Số lượng: <b style="color:var(--text-primary)">${hit.qty}</b><br>
          Tổng tiền: <b style="color:var(--text-primary)">${formatPrice(hit.cost)}</b>
        </div>
      `);
    } else {
      hideTooltip();
      canvas.style.cursor = 'default';
    }
  };

  canvas.onmouseleave = () => {
    hideTooltip();
    canvas.style.cursor = 'default';
  };
}

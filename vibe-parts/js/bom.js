// ============================================================
// VibeParts - BOM (Bill of Materials) Manager
// ============================================================

import { COMPONENTS, formatPrice } from './components.js';

const BOM_STORAGE_KEY = 'vibeparts_bom';
const SAVED_BOMS_KEY = 'vibeparts_saved_boms';

class BOMManager {
  constructor() {
    this.items = []; // { componentId, quantity, note }
    this.savedBOMs = [];
    this.load();
    this.loadSavedBOMs();
  }

  // Add component to BOM
  add(componentId, quantity = 1) {
    const existing = this.items.find(i => i.componentId === componentId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ componentId, quantity, note: '' });
    }
    this.save();
    return true;
  }

  // Remove component from BOM
  remove(componentId) {
    this.items = this.items.filter(i => i.componentId !== componentId);
    this.save();
  }

  // Update quantity
  updateQuantity(componentId, quantity) {
    const item = this.items.find(i => i.componentId === componentId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.save();
    }
  }

  // Update note
  updateNote(componentId, note) {
    const item = this.items.find(i => i.componentId === componentId);
    if (item) {
      item.note = note;
      this.save();
    }
  }

  // Get total count
  getCount() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  // Get unique items count
  getUniqueCount() {
    return this.items.length;
  }

  // Get total cost
  getTotalCost() {
    return this.items.reduce((sum, item) => {
      const comp = COMPONENTS.find(c => c.id === item.componentId);
      return sum + (comp ? comp.price * item.quantity : 0);
    }, 0);
  }

  // Get full BOM data with component details
  getFullBOM() {
    return this.items.map(item => {
      const comp = COMPONENTS.find(c => c.id === item.componentId);
      return {
        ...item,
        component: comp,
        subtotal: comp ? comp.price * item.quantity : 0,
      };
    });
  }

  // Check if component is in BOM
  has(componentId) {
    return this.items.some(i => i.componentId === componentId);
  }

  // Clear all items
  clear() {
    this.items = [];
    this.save();
  }

  // Save to localStorage
  save() {
    try {
      localStorage.setItem(BOM_STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.warn('Failed to save BOM to localStorage:', e);
    }
  }

  // Load from localStorage
  load() {
    try {
      const data = localStorage.getItem(BOM_STORAGE_KEY);
      if (data) {
        this.items = JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to load BOM from localStorage:', e);
      this.items = [];
    }
  }

  // Save current BOM to saved list
  saveBOM(name) {
    const bom = {
      id: Date.now().toString(36),
      name: name || `BOM ${new Date().toLocaleDateString('vi-VN')}`,
      items: JSON.parse(JSON.stringify(this.items)),
      createdAt: new Date().toISOString(),
      totalCost: this.getTotalCost(),
      itemCount: this.getUniqueCount(),
    };
    this.savedBOMs.push(bom);
    this.saveSavedBOMs();
    return bom;
  }

  // Load a saved BOM
  loadBOM(bomId) {
    const bom = this.savedBOMs.find(b => b.id === bomId);
    if (bom) {
      this.items = JSON.parse(JSON.stringify(bom.items));
      this.save();
      return true;
    }
    return false;
  }

  // Delete a saved BOM
  deleteSavedBOM(bomId) {
    this.savedBOMs = this.savedBOMs.filter(b => b.id !== bomId);
    this.saveSavedBOMs();
  }

  // Save BOMs list to localStorage
  saveSavedBOMs() {
    try {
      localStorage.setItem(SAVED_BOMS_KEY, JSON.stringify(this.savedBOMs));
    } catch (e) {
      console.warn('Failed to save BOMs list:', e);
    }
  }

  // Load saved BOMs from localStorage
  loadSavedBOMs() {
    try {
      const data = localStorage.getItem(SAVED_BOMS_KEY);
      if (data) {
        this.savedBOMs = JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to load saved BOMs:', e);
      this.savedBOMs = [];
    }
  }

  // Export to CSV
  exportCSV() {
    const bom = this.getFullBOM();
    if (bom.length === 0) return null;

    const headers = ['STT', 'Tên linh kiện', 'Nhà sản xuất', 'Package', 'Số lượng', 'Đơn giá (VND)', 'Thành tiền (VND)', 'Ghi chú'];
    const rows = bom.map((item, idx) => [
      idx + 1,
      item.component?.name || 'N/A',
      item.component?.manufacturer || 'N/A',
      item.component?.package || 'N/A',
      item.quantity,
      item.component?.price || 0,
      item.subtotal,
      item.note || '',
    ]);

    // Add total row
    rows.push(['', '', '', '', '', 'TỔNG CỘNG:', this.getTotalCost(), '']);

    // BOM for UTF-8 CSV
    const BOM = '\uFEFF';
    const csvContent = BOM + [headers, ...rows].map(row =>
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VibeParts_BOM_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  }

  // Export to printable HTML (for PDF via browser print)
  exportPDF() {
    const bom = this.getFullBOM();
    if (bom.length === 0) return null;

    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>VibeParts - Danh sách vật tư (BOM)</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; color: #1a1a2e; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #4361ee; padding-bottom: 15px; }
    .header h1 { font-size: 22px; color: #4361ee; }
    .header p { color: #666; margin-top: 5px; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
    th { background: #4361ee; color: white; padding: 10px 8px; text-align: left; font-weight: 600; }
    td { padding: 8px; border-bottom: 1px solid #e0e0e0; }
    tr:nth-child(even) { background: #f8f9ff; }
    .total-row { font-weight: 700; background: #eef1ff !important; font-size: 14px; }
    .total-row td { border-top: 2px solid #4361ee; }
    .footer { margin-top: 25px; text-align: center; color: #999; font-size: 11px; }
    .price { text-align: right; }
    @media print { body { padding: 15px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>⚡ VibeParts - Danh sách vật tư (BOM)</h1>
    <p>Ngày xuất: ${new Date().toLocaleDateString('vi-VN')} | Tổng: ${bom.length} linh kiện</p>
  </div>
  <table>
    <thead>
      <tr>
        <th>STT</th>
        <th>Tên linh kiện</th>
        <th>Nhà sản xuất</th>
        <th>Package</th>
        <th>SL</th>
        <th class="price">Đơn giá</th>
        <th class="price">Thành tiền</th>
        <th>Ghi chú</th>
      </tr>
    </thead>
    <tbody>
      ${bom.map((item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${item.component?.name || 'N/A'}</strong></td>
        <td>${item.component?.manufacturer || 'N/A'}</td>
        <td>${item.component?.package || 'N/A'}</td>
        <td>${item.quantity}</td>
        <td class="price">${formatPrice(item.component?.price || 0)}</td>
        <td class="price">${formatPrice(item.subtotal)}</td>
        <td>${item.note || ''}</td>
      </tr>`).join('')}
      <tr class="total-row">
        <td colspan="6" style="text-align:right;">TỔNG CỘNG:</td>
        <td class="price">${formatPrice(this.getTotalCost())}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <div class="footer">
    <p>Được tạo bởi VibeParts - Electronic Components Search & BOM Manager</p>
  </div>
</body>
</html>`;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
    return true;
  }

  // Import from JSON
  importJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data)) {
        this.items = data.filter(item =>
          item.componentId && typeof item.quantity === 'number'
        );
        this.save();
        return true;
      }
    } catch (e) {
      console.error('Failed to import BOM:', e);
    }
    return false;
  }

  // Export to JSON string
  exportJSON() {
    return JSON.stringify(this.items, null, 2);
  }
}

// Singleton
export const bomManager = new BOMManager();

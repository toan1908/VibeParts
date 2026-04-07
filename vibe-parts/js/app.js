// ============================================================
// VibeParts - Main Application Controller
// ============================================================

import { CATEGORIES, COMPONENTS, searchComponents, formatPrice } from './components.js';
import { bomManager } from './bom.js';
import { renderBomAnalytics } from './bomAnalytics.js';
import { renderTemplates } from './templates.js';
import { initCalculator } from './calculator.js';
import { searchOnline, addOnlineComponent, getApiKey, setApiKey, hasApiKey } from './onlineSearch.js';
import { isFavorite, toggleFavorite, getFavorites } from './favorites.js';
import { hasNote, getNote, saveNote, countNotes } from './notes.js';

// ── State ──
const state = {
  currentTab: 'search',
  currentCategory: 'all',
  searchQuery: '',
  sortBy: 'name',
  compareList: [], // max 4 component IDs
  theme: 'light',
};

// ── DOM References ──
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
  // Header
  tabSearch: $('#tabSearch'),
  tabBom: $('#tabBom'),
  bomBadge: $('#bomBadge'),
  guideBtn: $('#guideBtn'),
  compareBtn: $('#compareBtn'),
  compareCount: $('#compareCount'),
  themeToggle: $('#themeToggle'),
  mobileMenuBtn: $('#mobileMenuBtn'),

  // Sidebar
  sidebar: $('#sidebar'),
  sidebarOverlay: $('#sidebarOverlay'),
  categoryList: $('#categoryList'),

  // Search Page
  pageSearch: $('#pageSearch'),
  searchInput: $('#searchInput'),
  searchOnlineBtn: $('#searchOnlineBtn'),
  resultsTitle: $('#resultsTitle'),
  resultsCount: $('#resultsCount'),
  sortSelect: $('#sortSelect'),
  componentList: $('#componentList'),

  // BOM Page
  pageBom: $('#pageBom'),
  bomTotalCost: $('#bomTotalCost'),
  bomContent: $('#bomContent'),
  savedBomsList: $('#savedBomsList'),
  saveBomBtn: $('#saveBomBtn'),
  exportCsvBtn: $('#exportCsvBtn'),
  exportPdfBtn: $('#exportPdfBtn'),
  clearBomBtn: $('#clearBomBtn'),

  // Calculator Page
  pageCalc: $('#pageCalc'),

  // Modals
  guideModal: $('#guideModal'),
  compareModal: $('#compareModal'),
  compareBody: $('#compareBody'),
  saveBomModal: $('#saveBomModal'),
  bomNameInput: $('#bomNameInput'),
  confirmSaveBom: $('#confirmSaveBom'),

  // Online Search Modal
  onlineSearchModal: $('#onlineSearchModal'),
  apiKeySection: $('#apiKeySection'),
  apiKeyInput: $('#apiKeyInput'),
  saveApiKeyBtn: $('#saveApiKeyBtn'),
  onlineSearchForm: $('#onlineSearchForm'),
  onlineQueryInput: $('#onlineQueryInput'),
  doOnlineSearchBtn: $('#doOnlineSearchBtn'),
  changeApiKeyBtn: $('#changeApiKeyBtn'),
  onlineSearchResults: $('#onlineSearchResults'),
  onlineSearchLoading: $('#onlineSearchLoading'),

  // Manual Form
  manualForm: $('#manualForm'),
  importJsonBtn: $('#importJsonBtn'),
  importSampleBtn: $('#importSampleBtn'),
  importJsonInput: $('#importJsonInput'),
  importResult: $('#importResult'),

  // Toast
  toastContainer: $('#toastContainer'),
};

// ══════════════════════════════════════════════
// INITIALIZATION
// ══════════════════════════════════════════════
function init() {
  loadTheme();
  renderCategories();
  renderComponents();
  updateBOMBadge();
  renderSavedBOMs();
  
  // Render static templates list once
  renderTemplates('templatesList', () => {
    // on complete, re-render BOM
    if (state.currentTab === 'bom') {
      renderBOMPage();
      updateBOMBadge();
    }
  });

  // Init calculator
  initCalculator();

  bindEvents();

  // Auto-detect system theme
  if (!localStorage.getItem('vibeparts_theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}


// ══════════════════════════════════════════════
// THEME
// ══════════════════════════════════════════════
function loadTheme() {
  const saved = localStorage.getItem('vibeparts_theme');
  if (saved) {
    setTheme(saved);
  }
}

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('vibeparts_theme', theme);

  const icon = dom.themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
}

function toggleTheme() {
  setTheme(state.theme === 'dark' ? 'light' : 'dark');
}

// ══════════════════════════════════════════════
// TAB NAVIGATION
// ══════════════════════════════════════════════
function switchTab(tab) {
  state.currentTab = tab;

  // Update tab buttons
  $$('.nav-tab').forEach(btn => btn.classList.remove('active'));
  const activeTab = $(`[data-tab="${tab}"]`);
  if (activeTab) activeTab.classList.add('active');

  // Show/hide pages
  $$('.page').forEach(p => p.classList.remove('active'));
  if (tab === 'search') {
    dom.pageSearch.classList.add('active');
  } else if (tab === 'bom') {
    dom.pageBom.classList.add('active');
    renderBOMPage();
  } else if (tab === 'calc') {
    dom.pageCalc.classList.add('active');
  }
}

// ══════════════════════════════════════════════
// CATEGORIES
// ══════════════════════════════════════════════
function renderCategories() {
  const favCount = getFavorites().length;
  const favHTML = `
    <button class="category-item ${state.currentCategory === 'fav' ? 'active' : ''}" style="color: var(--accent-orange);"
            data-category="fav">
      <i class="ph-fill ph-star"></i>
      Chỉ yêu thích
      <span class="category-count">${favCount}</span>
    </button>
  `;

  const catsHTML = CATEGORIES.map(cat => {
    const count = cat.id === 'all'
      ? COMPONENTS.length
      : COMPONENTS.filter(c => c.category === cat.id).length;

    return `
      <button class="category-item ${cat.id === state.currentCategory ? 'active' : ''}"
              data-category="${cat.id}">
        <i class="ph ${cat.icon}"></i>
        ${cat.name}
        <span class="category-count">${count}</span>
      </button>
    `;
  }).join('');

  dom.categoryList.innerHTML = favHTML + catsHTML;
}

function selectCategory(categoryId) {
  state.currentCategory = categoryId;

  // Update active class
  $$('.category-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === categoryId);
  });

  renderComponents();

  // Close mobile sidebar
  closeMobileSidebar();
}

// ══════════════════════════════════════════════
// COMPONENT RENDERING
// ══════════════════════════════════════════════
function renderComponents() {
  let results = searchComponents(
    state.searchQuery, 
    state.currentCategory === 'fav' ? 'all' : state.currentCategory
  );

  if (state.currentCategory === 'fav') {
    results = results.filter(c => isFavorite(c.id));
  }

  // Sort
  results = sortComponents(results, state.sortBy);

  // Update header
  const catName = state.currentCategory === 'fav' ? 'Yêu thích' : CATEGORIES.find(c => c.id === state.currentCategory)?.name || 'Tất cả';
  dom.resultsTitle.textContent = `Linh kiện ${catName !== 'Tất cả' ? '- ' + catName : ''}`;
  dom.resultsCount.textContent = `(${results.length})`;

  if (results.length === 0) {
    dom.componentList.innerHTML = `
      <div class="bom-empty-state">
        <i class="ph-duotone ph-magnifying-glass"></i>
        <h3>Không tìm thấy linh kiện</h3>
        <p>Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.</p>
      </div>
    `;
    return;
  }

  dom.componentList.innerHTML = results.map((comp, idx) => {
    const inBOM = bomManager.has(comp.id);
    const inCompare = state.compareList.includes(comp.id);
    const catLabel = CATEGORIES.find(c => c.id === comp.category)?.name || '';
    const isFav = isFavorite(comp.id);
    const noteExists = hasNote(comp.id);

    return `
      <div class="component-card" data-id="${comp.id}" style="animation-delay: ${idx * 0.05}s">
        <div class="card-top">
          <div class="card-info">
            <span class="card-name" title="${comp.description}">
              ${comp.name}
              <i class="ph ph-info info-icon"></i>
            </span>
            <div class="card-meta">
              <span>${comp.manufacturer}</span>
              <span class="dot">•</span>
              <span>${comp.package}</span>
            </div>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <span class="card-category-tag">${catLabel}</span>
            <div class="card-price">
              <div class="price">${new Intl.NumberFormat('vi-VN').format(comp.price)} <span class="price-unit">đ</span></div>
              <div class="price-unit">/ cái</div>
            </div>
          </div>
        </div>

        <div class="card-description">${comp.description}</div>

        <div class="specs-grid">
          <div class="spec-item">
            <div class="spec-label">Voltage</div>
            <div class="spec-value">${comp.specs.voltage}</div>
          </div>
          <div class="spec-item">
            <div class="spec-label">Current</div>
            <div class="spec-value">${comp.specs.current}</div>
          </div>
          <div class="spec-item">
            <div class="spec-label">Interface</div>
            <div class="spec-value">${comp.specs.interface}</div>
          </div>
          <div class="spec-item">
            <div class="spec-label">Package</div>
            <div class="spec-value">${comp.specs.package}</div>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn-icon fav-btn ${isFav ? 'active' : ''}" data-act-fav="${comp.id}" title="${isFav ? 'Bỏ yêu thích' : 'Yêu thích'}">
            <i class="${isFav ? 'ph-fill ph-star' : 'ph ph-star'}"></i>
          </button>
          <button class="btn-icon note-btn ${noteExists ? 'has-note' : ''}" data-act-note="${comp.id}" data-comp-name="${comp.name}" title="Ghi chú">
            <i class="ph ${noteExists ? 'ph-note-pencil' : 'ph-note'}"></i>
          </button>
          <button class="btn btn-compare ${inCompare ? 'selected' : ''}" data-compare="${comp.id}">
            <i class="ph ph-swap"></i> So sánh
          </button>
          ${comp.datasheetUrl ? `
            <a href="${comp.datasheetUrl}" target="_blank" rel="noopener" class="btn btn-outline">
              <i class="ph ph-file-pdf"></i> Datasheet
            </a>
          ` : `
            <button class="btn btn-outline" onclick="window.open('https://www.google.com/search?q=${encodeURIComponent(comp.name + ' datasheet PDF')}','_blank')">
              <i class="ph ph-file-pdf"></i> Datasheet
            </button>
          `}
          <a href="${comp.shopeeUrl}" target="_blank" rel="noopener" class="btn btn-shopee">
            <i class="ph ph-shopping-cart"></i> Shopee
          </a>
          <button class="btn btn-bom ${inBOM ? 'in-bom' : ''}" data-add-bom="${comp.id}">
            <i class="ph ${inBOM ? 'ph-check' : 'ph-plus'}"></i>
            ${inBOM ? 'Đã thêm' : 'Thêm vào BOM'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function sortComponents(components, sortBy) {
  const sorted = [...components];
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
}

// ══════════════════════════════════════════════
// BOM PAGE
// ══════════════════════════════════════════════
function renderBOMPage() {
  const bom = bomManager.getFullBOM();
  dom.bomTotalCost.textContent = formatPrice(bomManager.getTotalCost());
  
  // Render Analytics
  renderBomAnalytics(bom);

  if (bom.length === 0) {
    dom.bomContent.innerHTML = `
      <div class="bom-empty-state">
        <i class="ph-duotone ph-list-numbers"></i>
        <h3>Danh sách vật tư trống</h3>
        <p>Hãy quay lại tab Tìm kiếm để tìm và thêm linh kiện vào danh sách vật tư của bạn.</p>
        <button class="btn btn-browse" id="browseBomBtn">
          <i class="ph ph-magnifying-glass"></i> Duyệt linh kiện
        </button>
      </div>
    `;

    const browseBtn = $('#browseBomBtn');
    if (browseBtn) {
      browseBtn.addEventListener('click', () => switchTab('search'));
    }
    return;
  }

  dom.bomContent.innerHTML = `
    <div class="bom-table-wrapper">
      <table class="bom-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Linh kiện</th>
            <th>Package</th>
            <th>Số lượng</th>
            <th style="text-align:right">Đơn giá</th>
            <th style="text-align:right">Thành tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${bom.map((item, idx) => `
            <tr data-bom-id="${item.componentId}">
              <td>${idx + 1}</td>
              <td>
                <div class="bom-item-name">${item.component?.name || 'N/A'}</div>
                <div class="bom-item-meta">${item.component?.manufacturer || ''}</div>
              </td>
              <td>${item.component?.package || 'N/A'}</td>
              <td>
                <div class="bom-qty-control">
                  <button class="qty-btn" data-qty-minus="${item.componentId}">−</button>
                  <input type="number" class="qty-input" value="${item.quantity}" min="1"
                         data-qty-input="${item.componentId}">
                  <button class="qty-btn" data-qty-plus="${item.componentId}">+</button>
                </div>
              </td>
              <td class="bom-price">${formatPrice(item.component?.price || 0)}</td>
              <td class="bom-price">${formatPrice(item.subtotal)}</td>
              <td>
                <button class="bom-remove-btn" data-remove-bom="${item.componentId}" title="Xóa">
                  <i class="ph ph-trash"></i>
                </button>
              </td>
            </tr>
          `).join('')}
          <tr style="background: var(--primary-surface); font-weight: 700;">
            <td colspan="5" style="text-align: right; font-size: 15px;">TỔNG CỘNG:</td>
            <td class="bom-price" style="font-size: 16px; color: var(--primary);">
              ${formatPrice(bomManager.getTotalCost())}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function updateBOMBadge() {
  const count = bomManager.getUniqueCount();
  dom.bomBadge.textContent = count;
  dom.bomBadge.style.display = count > 0 ? 'inline' : 'none';
}

function renderSavedBOMs() {
  const saved = bomManager.savedBOMs;
  if (saved.length === 0) {
    dom.savedBomsList.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 14px;
                  background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
        Bạn chưa lưu danh sách vật tư nào.
      </div>
    `;
    return;
  }

  dom.savedBomsList.innerHTML = saved.map(bom => `
    <div class="saved-bom-card">
      <div class="saved-bom-info">
        <h4>${bom.name}</h4>
        <p>${bom.itemCount} linh kiện • ${formatPrice(bom.totalCost)} • ${new Date(bom.createdAt).toLocaleDateString('vi-VN')}</p>
      </div>
      <div class="saved-bom-actions">
        <button class="btn btn-outline" data-load-bom="${bom.id}">
          <i class="ph ph-download-simple"></i> Tải
        </button>
        <button class="btn btn-clear-bom" data-delete-bom="${bom.id}" style="padding: 6px 10px;">
          <i class="ph ph-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// ══════════════════════════════════════════════
// COMPARE
// ══════════════════════════════════════════════
function toggleCompare(componentId) {
  const idx = state.compareList.indexOf(componentId);
  if (idx >= 0) {
    state.compareList.splice(idx, 1);
  } else {
    if (state.compareList.length >= 4) {
      showToast('Chỉ có thể so sánh tối đa 4 linh kiện.', 'warning');
      return;
    }
    state.compareList.push(componentId);
  }

  updateCompareUI();
  renderComponents();
}

function updateCompareUI() {
  const count = state.compareList.length;
  dom.compareCount.textContent = count;
  dom.compareBtn.style.display = count >= 2 ? 'flex' : 'none';
}

function showCompareModal() {
  if (state.compareList.length < 2) {
    showToast('Vui lòng chọn ít nhất 2 linh kiện để so sánh.', 'warning');
    return;
  }

  const comps = state.compareList.map(id => COMPONENTS.find(c => c.id === id)).filter(Boolean);
  const colClass = `cols-${comps.length}`;

  const specFields = [
    { key: 'voltage', label: 'Voltage' },
    { key: 'current', label: 'Current' },
    { key: 'interface', label: 'Interface' },
    { key: 'package', label: 'Package' },
  ];

  dom.compareBody.innerHTML = `
    <div class="compare-grid ${colClass}">
      ${comps.map(comp => `
        <div class="compare-item">
          <h4>${comp.name}</h4>
          <div class="compare-mfr">${comp.manufacturer}</div>
          <div class="compare-row">
            <span class="label">Giá</span>
            <span class="value">${formatPrice(comp.price)}</span>
          </div>
          ${specFields.map(sf => `
            <div class="compare-row">
              <span class="label">${sf.label}</span>
              <span class="value">${comp.specs[sf.key]}</span>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;

  openModal('compareModal');
}

// ══════════════════════════════════════════════
// MODALS
// ══════════════════════════════════════════════
function openModal(modalId) {
  const modal = $(`#${modalId}`);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = $(`#${modalId}`);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ══════════════════════════════════════════════
// TOAST NOTIFICATIONS
// ══════════════════════════════════════════════
function showToast(message, type = 'info', duration = 3000) {
  const iconMap = {
    success: 'ph-duotone ph-check-circle',
    error: 'ph-duotone ph-x-circle',
    warning: 'ph-duotone ph-warning',
    info: 'ph-duotone ph-info',
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="${iconMap[type] || iconMap.info}"></i>
    <span class="toast-message">${message}</span>
    <button class="toast-close"><i class="ph ph-x"></i></button>
  `;

  dom.toastContainer.appendChild(toast);

  // Close button
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.style.animation = 'slideInRight 0.2s ease-out reverse';
    setTimeout(() => toast.remove(), 200);
  });

  // Auto remove
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = 'slideInRight 0.2s ease-out reverse';
      setTimeout(() => toast.remove(), 200);
    }
  }, duration);
}

// ══════════════════════════════════════════════
// CUSTOM CONFIRM DIALOG (replaces browser confirm())
// ══════════════════════════════════════════════
function showConfirm(message, onConfirm, title = 'Xác nhận') {
  const dialog = document.querySelector('#confirmDialog');
  const msgEl = document.querySelector('#confirmMessage');
  const titleEl = document.querySelector('#confirmTitle');
  const okBtn = document.querySelector('#confirmOkBtn');
  const cancelBtn = document.querySelector('#confirmCancelBtn');
  const cancelX = document.querySelector('#confirmCancelX');

  titleEl.textContent = title;
  msgEl.textContent = message;
  dialog.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Cleanup function to remove all listeners
  function close() {
    dialog.classList.remove('active');
    document.body.style.overflow = '';
    okBtn.removeEventListener('click', handleOk);
    cancelBtn.removeEventListener('click', handleCancel);
    cancelX.removeEventListener('click', handleCancel);
  }

  function handleOk() {
    close();
    onConfirm();
  }

  function handleCancel() {
    close();
  }

  okBtn.addEventListener('click', handleOk);
  cancelBtn.addEventListener('click', handleCancel);
  cancelX.addEventListener('click', handleCancel);
}

// ══════════════════════════════════════════════
// MOBILE SIDEBAR
// ══════════════════════════════════════════════
function openMobileSidebar() {
  dom.sidebar.classList.add('open');
  dom.sidebarOverlay.classList.add('active');
}

function closeMobileSidebar() {
  dom.sidebar.classList.remove('open');
  dom.sidebarOverlay.classList.remove('active');
}

// ══════════════════════════════════════════════
// EVENT BINDINGS
// ══════════════════════════════════════════════
function bindEvents() {
  // ── Tab Navigation ──
  dom.tabSearch.addEventListener('click', () => switchTab('search'));
  dom.tabBom.addEventListener('click', () => switchTab('bom'));
  if ($('#tabCalc')) {
    $('#tabCalc').addEventListener('click', () => switchTab('calc'));
  }

  // ── Theme Toggle ──
  dom.themeToggle.addEventListener('click', toggleTheme);

  // ── Mobile Menu ──
  dom.mobileMenuBtn.addEventListener('click', openMobileSidebar);
  dom.sidebarOverlay.addEventListener('click', closeMobileSidebar);

  // ── Search ──
  let searchDebounce;
  dom.searchInput.addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      state.searchQuery = e.target.value;
      renderComponents();
    }, 200);
  });

  // ── Sort ──
  dom.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderComponents();
  });

  // ── Search Online ──
  dom.searchOnlineBtn.addEventListener('click', () => {
    openOnlineSearchModal();
  });

  // ── Categories (event delegation) ──
  dom.categoryList.addEventListener('click', (e) => {
    const btn = e.target.closest('.category-item');
    if (btn) selectCategory(btn.dataset.category);
  });

  // ── Component List (event delegation) ──
  dom.componentList.addEventListener('click', (e) => {
    // Add to BOM
    const addBomBtn = e.target.closest('[data-add-bom]');
    if (addBomBtn) {
      const id = addBomBtn.dataset.addBom;
      if (bomManager.has(id)) {
        bomManager.remove(id);
        showToast('Đã xóa khỏi danh sách vật tư.', 'info');
      } else {
        bomManager.add(id);
        const comp = COMPONENTS.find(c => c.id === id);
        showToast(`Đã thêm ${comp?.name || ''} vào BOM!`, 'success');
      }
      updateBOMBadge();
      renderComponents();
      return;
    }

    // Fav
    const favBtn = e.target.closest('[data-act-fav]');
    if (favBtn) {
      const id = favBtn.dataset.actFav;
      const isAdded = toggleFavorite(id);
      renderCategories(); // update sidebar count
      renderComponents();
      showToast(isAdded ? 'Đã thêm vào mục Yêu thích' : 'Đã bỏ Yêu thích', 'info');
      return;
    }

    // Note
    const noteBtn = e.target.closest('[data-act-note]');
    if (noteBtn) {
      const id = noteBtn.dataset.actNote;
      const name = noteBtn.dataset.compName;
      openNotesModal(id, name);
      return;
    }

    // Compare
    const compareToggle = e.target.closest('[data-compare]');
    if (compareToggle) {
      toggleCompare(compareToggle.dataset.compare);
      return;
    }
  });

  // ── Guide Modal ──
  dom.guideBtn.addEventListener('click', () => openModal('guideModal'));

  // ── Compare Button ──
  dom.compareBtn.addEventListener('click', showCompareModal);

  // ── Close modals ──
  $$('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.closeModal));
  });

  // Close modal on overlay click
  $$('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        // Auto-save notes before closing
        if (overlay.id === 'notesModal') {
          closeNotesModal(true);
          return;
        }
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // ── BOM Actions ──
  dom.saveBomBtn.addEventListener('click', () => {
    if (bomManager.getUniqueCount() === 0) {
      showToast('BOM đang trống, không có gì để lưu!', 'warning');
      return;
    }
    dom.bomNameInput.value = '';
    openModal('saveBomModal');
    setTimeout(() => dom.bomNameInput.focus(), 100);
  });

  dom.confirmSaveBom.addEventListener('click', () => {
    const name = dom.bomNameInput.value.trim();
    bomManager.saveBOM(name);
    closeModal('saveBomModal');
    renderSavedBOMs();
    showToast('Đã lưu danh sách vật tư thành công!', 'success');
  });

  dom.exportCsvBtn.addEventListener('click', () => {
    if (bomManager.getUniqueCount() === 0) {
      showToast('BOM đang trống!', 'warning');
      return;
    }
    bomManager.exportCSV();
    showToast('Đã xuất file CSV thành công!', 'success');
  });

  dom.exportPdfBtn.addEventListener('click', () => {
    if (bomManager.getUniqueCount() === 0) {
      showToast('BOM đang trống!', 'warning');
      return;
    }
    bomManager.exportPDF();
    showToast('Đã mở PDF để in/lưu.', 'info');
  });

  dom.clearBomBtn.addEventListener('click', () => {
    if (bomManager.getUniqueCount() === 0) return;
    showConfirm('Bạn có chắc muốn xóa tất cả linh kiện trong BOM?', () => {
      bomManager.clear();
      updateBOMBadge();
      renderBOMPage();
      renderComponents();
      showToast('Đã xóa tất cả linh kiện trong BOM.', 'info');
    }, 'Xóa tất cả');
  });

  // ── BOM Table Events (delegation) ──
  dom.bomContent.addEventListener('click', (e) => {
    // Quantity minus
    const minusBtn = e.target.closest('[data-qty-minus]');
    if (minusBtn) {
      const id = minusBtn.dataset.qtyMinus;
      const item = bomManager.items.find(i => i.componentId === id);
      if (item && item.quantity > 1) {
        bomManager.updateQuantity(id, item.quantity - 1);
        renderBOMPage();
        updateBOMBadge();
      }
      return;
    }

    // Quantity plus
    const plusBtn = e.target.closest('[data-qty-plus]');
    if (plusBtn) {
      const id = plusBtn.dataset.qtyPlus;
      const item = bomManager.items.find(i => i.componentId === id);
      if (item) {
        bomManager.updateQuantity(id, item.quantity + 1);
        renderBOMPage();
        updateBOMBadge();
      }
      return;
    }

    // Remove
    const removeBtn = e.target.closest('[data-remove-bom]');
    if (removeBtn) {
      bomManager.remove(removeBtn.dataset.removeBom);
      renderBOMPage();
      updateBOMBadge();
      renderComponents();
      showToast('Đã xóa linh kiện khỏi BOM.', 'info');
      return;
    }
  });

  // Quantity input change
  dom.bomContent.addEventListener('change', (e) => {
    const input = e.target.closest('[data-qty-input]');
    if (input) {
      const id = input.dataset.qtyInput;
      const qty = Math.max(1, parseInt(input.value) || 1);
      bomManager.updateQuantity(id, qty);
      renderBOMPage();
      updateBOMBadge();
    }
  });

  // ── Saved BOMs (delegation) ──
  dom.savedBomsList.addEventListener('click', (e) => {
    const loadBtn = e.target.closest('[data-load-bom]');
    if (loadBtn) {
      bomManager.loadBOM(loadBtn.dataset.loadBom);
      updateBOMBadge();
      renderBOMPage();
      renderComponents();
      showToast('Đã tải danh sách vật tư.', 'success');
      return;
    }

    const deleteBtn = e.target.closest('[data-delete-bom]');
    if (deleteBtn) {
      showConfirm('Bạn có chắc muốn xóa BOM đã lưu này?', () => {
        bomManager.deleteSavedBOM(deleteBtn.dataset.deleteBom);
        renderSavedBOMs();
        showToast('Đã xóa BOM đã lưu.', 'info');
      }, 'Xóa BOM đã lưu');
      return;
    }
  });

  // ── Keyboard Shortcuts ──
  document.addEventListener('keydown', (e) => {
    // Ctrl+K → Focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (state.currentTab !== 'search') switchTab('search');
      dom.searchInput.focus();
    }

    // Escape → close modals
    if (e.key === 'Escape') {
      $$('.modal-overlay.active').forEach(m => {
        m.classList.remove('active');
        if (m.id === 'notesModal') closeNotesModal(false);
      });
      document.body.style.overflow = '';
    }
  });

  // ── Notes Modal Events ──
  bindNotesModalEvents();

  // ── Online Search Events ──
  bindOnlineSearchEvents();
}

// ══════════════════════════════════════════════
// NOTES SYSTEM
// ══════════════════════════════════════════════
let currentNoteCompId = null;

function openNotesModal(compId, compName) {
  currentNoteCompId = compId;
  $('#noteCompName').textContent = compName;
  $('#noteInput').value = getNote(compId);
  openModal('notesModal');
  setTimeout(() => $('#noteInput').focus(), 100);
}

function closeNotesModal(save = true) {
  if (save && currentNoteCompId) {
    const val = $('#noteInput').value;
    saveNote(currentNoteCompId, val);
    renderComponents();
  }
  currentNoteCompId = null;
  $('#notesModal').classList.remove('active');
  document.body.style.overflow = '';
}

function bindNotesModalEvents() {
  $('#saveNoteBtn').addEventListener('click', () => {
    closeNotesModal(true);
    showToast('Đã lưu ghi chú!', 'success');
  });

  $('#clearNoteBtn').addEventListener('click', () => {
    $('#noteInput').value = '';
    closeNotesModal(true);
    showToast('Đã xóa ghi chú.', 'info');
  });

  // Override close behavior for note modal to auto-save
  const closeBtn = $('#notesModal .modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent default modal close
      closeNotesModal(true);
    });
  }
}

// ══════════════════════════════════════════════
// ONLINE SEARCH (AI)
// ══════════════════════════════════════════════
let onlineSearchCache = []; // temp storage for results

function openOnlineSearchModal() {
  // Pre-fill query from main search input
  const q = dom.searchInput.value.trim();
  if (q) {
    dom.onlineQueryInput.value = q;
  }

  // Default to manual tab
  switchModalTab('manual');

  // Setup AI tab state
  if (hasApiKey()) {
    dom.apiKeySection.style.display = 'none';
    dom.onlineSearchForm.style.display = 'block';
  } else {
    dom.apiKeySection.style.display = 'block';
    dom.onlineSearchForm.style.display = 'none';
  }

  dom.onlineSearchResults.innerHTML = '';
  dom.onlineSearchLoading.style.display = 'none';
  openModal('onlineSearchModal');

  setTimeout(() => $('#mfName')?.focus(), 200);
}

async function performOnlineSearch() {
  const query = dom.onlineQueryInput.value.trim();
  if (!query) {
    showToast('Vui lòng nhập từ khóa tìm kiếm.', 'warning');
    return;
  }

  // Show loading
  dom.onlineSearchLoading.style.display = 'block';
  dom.onlineSearchResults.innerHTML = '';
  dom.doOnlineSearchBtn.disabled = true;
  dom.doOnlineSearchBtn.innerHTML = '<i class="ph ph-spinner"></i> Đang tìm...';

  try {
    const results = await searchOnline(query);
    onlineSearchCache = results;
    renderOnlineResults(results);
  } catch (err) {
    if (err.message === 'NO_API_KEY') {
      dom.apiKeySection.style.display = 'block';
      dom.onlineSearchForm.style.display = 'none';
      showToast('Vui lòng nhập Gemini API Key.', 'warning');
    } else {
      dom.onlineSearchResults.innerHTML = `
        <div class="online-error-msg">
          <i class="ph-duotone ph-warning-circle"></i>
          <p><strong>Lỗi:</strong> ${err.message}</p>
        </div>
      `;
    }
  } finally {
    dom.onlineSearchLoading.style.display = 'none';
    dom.doOnlineSearchBtn.disabled = false;
    dom.doOnlineSearchBtn.innerHTML = '<i class="ph ph-magnifying-glass"></i> Tìm kiếm';
  }
}

function renderOnlineResults(results) {
  if (results.length === 0) {
    dom.onlineSearchResults.innerHTML = `
      <div class="online-error-msg" style="color: var(--text-muted); background: var(--bg-input); border-color: var(--border-color);">
        <i class="ph-duotone ph-magnifying-glass"></i>
        <p>Không tìm thấy linh kiện nào phù hợp.</p>
      </div>
    `;
    return;
  }

  const catNames = Object.fromEntries(CATEGORIES.map(c => [c.id, c.name]));

  dom.onlineSearchResults.innerHTML = results.map((comp, idx) => {
    const alreadyExists = COMPONENTS.some(c =>
      c.name.toLowerCase() === comp.name.toLowerCase() &&
      !c.id.startsWith('online-')
    );

    return `
      <div class="online-result-card" style="animation-delay: ${idx * 0.08}s" data-result-idx="${idx}">
        <div class="ai-badge"><i class="ph ph-robot"></i> AI</div>
        <div class="result-name">${comp.name}</div>
        <div class="result-meta">${comp.manufacturer} • ${comp.package} • ${catNames[comp.category] || 'IC'}</div>
        <div class="result-desc">${comp.description}</div>
        <div class="result-specs">
          <div class="result-spec">
            <div class="spec-label">VOLTAGE</div>
            <div class="spec-value">${comp.specs.voltage}</div>
          </div>
          <div class="result-spec">
            <div class="spec-label">CURRENT</div>
            <div class="spec-value">${comp.specs.current}</div>
          </div>
          <div class="result-spec">
            <div class="spec-label">INTERFACE</div>
            <div class="spec-value">${comp.specs.interface}</div>
          </div>
          <div class="result-spec">
            <div class="spec-label">PACKAGE</div>
            <div class="spec-value">${comp.specs.package}</div>
          </div>
        </div>
        <div class="result-actions">
          <div class="result-price">
            ${new Intl.NumberFormat('vi-VN').format(comp.price)} <span class="price-unit">đ / cái</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <a href="${comp.shopeeUrl}" target="_blank" rel="noopener" class="btn btn-shopee" style="font-size: 12px; padding: 6px 12px;">
              <i class="ph ph-shopping-cart"></i> Shopee
            </a>
            ${alreadyExists ? `
              <button class="btn btn-add-db added" disabled>
                <i class="ph ph-check"></i> Đã có
              </button>
            ` : `
              <button class="btn btn-add-db" data-add-online="${idx}">
                <i class="ph ph-plus"></i> Thêm vào DB
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function bindOnlineSearchEvents() {
  // ── Modal Tab Switching ──
  $$('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      switchModalTab(tab.dataset.modalTab);
    });
  });

  // ── Manual Form Submit ──
  dom.manualForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#mfName').value.trim();
    if (!name) {
      showToast('Vui lòng nhập tên linh kiện.', 'warning');
      return;
    }

    const comp = {
      id: 'custom-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: name,
      category: $('#mfCategory').value,
      manufacturer: $('#mfManufacturer').value.trim() || 'Unknown',
      package: $('#mfPackage').value.trim() || 'N/A',
      description: $('#mfDescription').value.trim() || '',
      specs: {
        voltage: $('#mfVoltage').value.trim() || 'N/A',
        current: $('#mfCurrent').value.trim() || 'N/A',
        interface: $('#mfInterface').value.trim() || 'N/A',
        package: $('#mfPackage').value.trim() || 'N/A',
      },
      price: parseInt($('#mfPrice').value) || 0,
      datasheetUrl: '',
      shopeeUrl: `https://shopee.vn/search?keyword=${encodeURIComponent(name)}`,
      isOnline: true,
    };

    const result = addOnlineComponent(comp);
    if (result.success) {
      showToast(result.message, 'success');
      dom.manualForm.reset();
      renderCategories();
      renderComponents();
    } else {
      showToast(result.message, 'warning');
    }
  });

  // ── Import JSON ──
  dom.importJsonBtn.addEventListener('click', () => {
    const raw = dom.importJsonInput.value.trim();
    if (!raw) {
      showToast('Vui lòng dán dữ liệu JSON.', 'warning');
      return;
    }

    let items;
    try {
      items = JSON.parse(raw);
      if (!Array.isArray(items)) items = [items];
    } catch (e) {
      dom.importResult.innerHTML = `<div class="online-error-msg"><i class="ph-duotone ph-warning-circle"></i><p>JSON không hợp lệ. Vui lòng kiểm tra lại cú pháp.</p></div>`;
      return;
    }

    let added = 0, skipped = 0;
    items.forEach(item => {
      if (!item.name) { skipped++; return; }

      const comp = {
        id: 'custom-' + item.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: item.name,
        category: item.category || 'ic',
        manufacturer: item.manufacturer || 'Unknown',
        package: item.package || 'N/A',
        description: item.description || '',
        specs: {
          voltage: item.voltage || 'N/A',
          current: item.current || 'N/A',
          interface: item.interface || 'N/A',
          package: item.package || 'N/A',
        },
        price: parseInt(item.price_vnd || item.price) || 0,
        datasheetUrl: item.datasheetUrl || '',
        shopeeUrl: item.shopeeUrl || `https://shopee.vn/search?keyword=${encodeURIComponent(item.name)}`,
        isOnline: true,
      };

      const result = addOnlineComponent(comp);
      if (result.success) added++;
      else skipped++;
    });

    dom.importResult.innerHTML = `
      <div style="padding: 12px; background: var(--primary-surface); border-radius: var(--radius-sm); font-size: 13px;">
        <i class="ph ph-check-circle" style="color: var(--accent-green);"></i>
        <strong>${added}</strong> linh kiện đã thêm${skipped > 0 ? ` • <strong>${skipped}</strong> bị bỏ qua (trùng hoặc thiếu tên)` : ''}
      </div>
    `;

    if (added > 0) {
      renderCategories();
      renderComponents();
      showToast(`Đã import ${added} linh kiện!`, 'success');
    }
  });

  // ── Import Sample ──
  dom.importSampleBtn.addEventListener('click', () => {
    dom.importJsonInput.value = JSON.stringify([
      {
        name: "L298N",
        manufacturer: "STMicroelectronics",
        category: "ic",
        package: "Multiwatt-15",
        description: "Dual H-Bridge motor driver, 2A per channel, for DC and stepper motors.",
        voltage: "5V ~ 46V",
        current: "2A per channel",
        interface: "6 control pins",
        price_vnd: 35000
      },
      {
        name: "DS18B20",
        manufacturer: "Maxim Integrated",
        category: "sensor",
        package: "TO-92",
        description: "1-Wire digital thermometer, ±0.5°C accuracy, -55°C to +125°C range.",
        voltage: "3.0V ~ 5.5V",
        current: "1mA",
        interface: "1-Wire",
        price_vnd: 25000
      },
      {
        name: "MQ-2",
        manufacturer: "Hanwei Electronics",
        category: "sensor",
        package: "Module",
        description: "Smoke and combustible gas sensor, detects LPG, propane, methane, hydrogen.",
        voltage: "5V DC",
        current: "150mA",
        interface: "Analog + Digital Output",
        price_vnd: 18000
      }
    ], null, 2);
    showToast('Đã dán dữ liệu mẫu. Nhấn Import để thêm.', 'info');
  });

  // ── AI Search: Save API key ──
  dom.saveApiKeyBtn.addEventListener('click', () => {
    const key = dom.apiKeyInput.value.trim();
    if (!key) {
      showToast('Vui lòng nhập API key.', 'warning');
      return;
    }
    setApiKey(key);
    dom.apiKeySection.style.display = 'none';
    dom.onlineSearchForm.style.display = 'block';
    showToast('Đã lưu API key thành công!', 'success');
    setTimeout(() => dom.onlineQueryInput.focus(), 100);
  });

  // Change API key
  dom.changeApiKeyBtn.addEventListener('click', () => {
    dom.apiKeyInput.value = getApiKey();
    dom.apiKeySection.style.display = 'block';
    dom.onlineSearchForm.style.display = 'none';
    setTimeout(() => dom.apiKeyInput.focus(), 100);
  });

  // Do search button
  dom.doOnlineSearchBtn.addEventListener('click', performOnlineSearch);

  // Enter key in search
  dom.onlineQueryInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performOnlineSearch();
    }
  });

  // Enter key in API key input
  dom.apiKeyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dom.saveApiKeyBtn.click();
    }
  });

  // Add to database (event delegation)
  dom.onlineSearchResults.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add-online]');
    if (addBtn) {
      const idx = parseInt(addBtn.dataset.addOnline);
      const comp = onlineSearchCache[idx];
      if (!comp) return;

      const result = addOnlineComponent(comp);
      if (result.success) {
        showToast(result.message, 'success');
        addBtn.className = 'btn btn-add-db added';
        addBtn.disabled = true;
        addBtn.innerHTML = '<i class="ph ph-check"></i> Đã thêm';
        renderCategories();
        renderComponents();
      } else {
        showToast(result.message, 'info');
        addBtn.className = 'btn btn-add-db added';
        addBtn.disabled = true;
        addBtn.innerHTML = '<i class="ph ph-check"></i> Đã có';
      }
    }
  });
}

function switchModalTab(tabName) {
  // Update tab buttons
  $$('.modal-tab').forEach(t => t.classList.toggle('active', t.dataset.modalTab === tabName));
  // Update content panels
  const tabMap = { manual: 'tabManual', import: 'tabImport', ai: 'tabAi' };
  Object.values(tabMap).forEach(id => {
    const el = $(`#${id}`);
    if (el) el.classList.toggle('active', id === tabMap[tabName]);
  });

  // Auto-focus when switching to AI tab
  if (tabName === 'ai' && hasApiKey()) {
    setTimeout(() => dom.onlineQueryInput.focus(), 100);
  }
}

// ══════════════════════════════════════════════
// START
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', init);

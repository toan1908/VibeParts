// ============================================================
// VibeParts - Project Templates
// ============================================================

import { bomManager } from './bom.js';
import { COMPONENTS } from './components.js';

export const TEMPLATES = [
  {
    id: 'tpl-arduino-car',
    name: 'Arduino Robot Car',
    description: 'Xe robot tự hành cơ bản với module điều khiển động cơ',
    icon: 'ph-car-profile',
    items: [
      { id: 'atmega328p-pu', quantity: 1, note: 'Thay cho Arduino UNO' },
      { id: 'hcsr04', quantity: 1, note: 'Cảm biến siêu âm tránh vật cản' },
      { id: 'lm7805', quantity: 1, note: 'Ổn áp 5V cho MCU' },
      { id: 'resistor-10k', quantity: 4, note: 'Điện trở pull-up/down' },
      { id: 'cap-100nf', quantity: 2, note: 'Tụ lọc nhiễu' },
      { id: '2n2222a', quantity: 2, note: 'Transistor điều khiển relay/motor' }
    ]
  },
  {
    id: 'tpl-esp32-weather',
    name: 'ESP32 IoT Weather Station',
    description: 'Trạm thời tiết kết nối Wi-Fi gửi dữ liệu lên cloud',
    icon: 'ph-cloud-sun',
    items: [
      { id: 'esp32-wroom-32', quantity: 1, note: 'Vi điều khiển chính' },
      { id: 'bmp280', quantity: 1, note: 'Đo nhiệt độ, áp suất' },
      { id: 'dht22', quantity: 1, note: 'Đo nhiệt độ, độ ẩm' },
      { id: 'resistor-10k', quantity: 2, note: 'Pull-up cho I2C' },
      { id: 'ams1117-3v3', quantity: 1, note: 'Nguồn 3.3V cho ESP32' },
      { id: 'cap-100uf', quantity: 2, note: 'Tụ lọc nguồn' }
    ]
  },
  {
    id: 'tpl-led-matrix',
    name: 'LED Matrix Display',
    description: 'Bảng LED ma trận dùng IC dịch chốt',
    icon: 'ph-dots-nine',
    items: [
      { id: '74hc595', quantity: 4, note: 'IC dịch chốt mở rộng I/O' },
      { id: 'atmega328p-pu', quantity: 1, note: 'MCU điều khiển' },
      { id: 'resistor-220', quantity: 16, note: 'Trở hạn dòng cho LED' },
      { id: 'resistor-10k', quantity: 1, note: 'Pull-up RESET' },
      { id: 'cap-100nf', quantity: 4, note: 'Tụ bypass cho 595' }
    ]
  },
  {
    id: 'tpl-5v-psu',
    name: '5V Linear Power Supply',
    description: 'Mạch nguồn tuyến tính 5V cơ bản',
    icon: 'ph-plug-charging',
    items: [
      { id: 'lm7805', quantity: 1, note: 'IC ổn áp 5V' },
      { id: '1n4007', quantity: 4, note: 'Cầu chỉnh lưu' },
      { id: 'cap-1000uf', quantity: 1, note: 'Tụ lọc đầu vào' },
      { id: 'cap-100uf', quantity: 1, note: 'Tụ lọc đầu ra' },
      { id: 'cap-100nf', quantity: 2, note: 'Tụ bypass cao tần' },
      { id: 'led-5mm-red', quantity: 1, note: 'LED báo nguồn' },
      { id: 'resistor-220', quantity: 1, note: 'Trở hạn dòng LED' }
    ]
  },
  {
    id: 'tpl-stm32-dev',
    name: 'STM32 Minimum Dev Board',
    description: 'Mạch phát triển STM32F103 tối giản',
    icon: 'ph-cpu',
    items: [
      { id: 'stm32f103c8t6', quantity: 1, note: 'MCU chính' },
      { id: 'ams1117-3v3', quantity: 1, note: 'Nguồn 3.3V' },
      { id: 'resistor-10k', quantity: 3, note: 'Pull-up BOOT0, BOOT1, RESET' },
      { id: 'cap-100nf', quantity: 5, note: 'Tụ bypass VDD' },
      { id: 'cap-100uf', quantity: 2, note: 'Tụ lọc' },
      { id: 'usb-micro-b', quantity: 1, note: 'Cổng nạp/debug' }
    ]
  }
];

export function renderTemplates(containerId, onImportComplete) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = TEMPLATES.map(tpl => {
    // Count how many items actually exist in the components database
    const validCount = tpl.items.filter(it => COMPONENTS.some(c => c.id === it.id)).length;
    const totalCount = tpl.items.length;

    return `
    <div class="template-card">
      <div class="template-icon">
        <i class="ph-duotone ${tpl.icon}"></i>
      </div>
      <div class="template-info">
        <h4>${tpl.name}</h4>
        <p>${tpl.description}</p>
        <span class="template-count">${validCount}/${totalCount} thành phần có sẵn</span>
      </div>
      <button class="btn btn-outline" data-import-tpl="${tpl.id}">
        <i class="ph ph-download-simple"></i> Dùng mẫu này
      </button>
    </div>
  `;
  }).join('');

  // Bind events
  container.querySelectorAll('[data-import-tpl]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.importTpl;
      const count = importTemplate(id);
      if (typeof onImportComplete === 'function') onImportComplete(count);
    });
  });
}

function importTemplate(id) {
  const tpl = TEMPLATES.find(t => t.id === id);
  if (!tpl) return 0;

  let added = 0;
  tpl.items.forEach(item => {
    // Only add items that actually exist in the database
    const exists = COMPONENTS.some(c => c.id === item.id);
    if (!exists) return;

    bomManager.add(item.id, item.quantity);
    if (item.note) {
      bomManager.updateNote(item.id, item.note);
    }
    added++;
  });

  return added;
}

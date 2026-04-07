// ============================================================
// VibeParts - Online Search with Gemini AI
// ============================================================

import { CATEGORIES, COMPONENTS } from './components.js';

const API_KEY_STORAGE = 'vibeparts_gemini_key';
const CUSTOM_COMPONENTS_KEY = 'vibeparts_custom_components';

// ── Load custom components from localStorage on startup ──
function loadCustomComponents() {
  try {
    const data = localStorage.getItem(CUSTOM_COMPONENTS_KEY);
    if (data) {
      const customs = JSON.parse(data);
      customs.forEach(comp => {
        if (!COMPONENTS.find(c => c.id === comp.id)) {
          COMPONENTS.push(comp);
        }
      });
    }
  } catch (e) {
    console.warn('Failed to load custom components:', e);
  }
}

// ── Save custom components to localStorage ──
function saveCustomComponents() {
  try {
    const customs = COMPONENTS.filter(c =>
      c.isOnline || (c.id && (c.id.startsWith('custom-') || c.id.startsWith('online-')))
    );
    localStorage.setItem(CUSTOM_COMPONENTS_KEY, JSON.stringify(customs));
  } catch (e) {
    console.warn('Failed to save custom components:', e);
  }
}

// ── API Key Management ──
export function getApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) || '';
}

export function setApiKey(key) {
  localStorage.setItem(API_KEY_STORAGE, key.trim());
}

export function hasApiKey() {
  return !!getApiKey();
}

// ── Determine best category for a component ──
function detectCategory(name, desc) {
  const text = `${name} ${desc}`.toLowerCase();
  if (/mcu|microcontroller|arduino|esp32|esp8266|stm32|atmega|pic|raspberry.*pi.*pico|rp2040/i.test(text)) return 'mcu';
  if (/sensor|cảm biến|dht|bmp|bme|hcsr|mpu|accelerometer|gyroscope|temperature|humidity|ultrasonic|ir /i.test(text)) return 'sensor';
  if (/resistor|điện trở|biến trở|potentiometer/i.test(text)) return 'resistor';
  if (/capacitor|tụ điện|tụ hóa|tụ gốm/i.test(text)) return 'capacitor';
  if (/transistor|mosfet|bjt|jfet|darlington|2n|bc5|irf|tip1/i.test(text)) return 'transistor';
  if (/diode|led|zener|schottky|rectifier/i.test(text)) return 'diode';
  if (/connector|đầu nối|header|terminal|jack|usb.*connector|jst/i.test(text)) return 'connector';
  return 'ic'; // default to IC
}

// ── Model fallback list (SỬA LẠI TÊN CHUẨN THỰC TẾ) ──
const GEMINI_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash'
];

// ── Build prompt ──
function buildPrompt(query) {
  return `Bạn là chuyên gia tra cứu linh kiện điện tử. Hãy tìm kiếm thông tin thực tế về linh kiện điện tử theo yêu cầu: "${query}"

Trả về ĐÚNG 1 mảng JSON (không có text ngoài JSON) chứa 1-5 linh kiện phù hợp nhất. Mỗi linh kiện có cấu trúc:
{
  "name": "Tên chính xác của linh kiện (part number)",
  "manufacturer": "Nhà sản xuất",
  "package": "Kiểu chân/đóng gói (VD: DIP-8, QFN-24, TO-220, SMD...)",
  "description": "Mô tả ngắn gọn bằng tiếng Anh về chức năng và đặc tính chính",
  "voltage": "Dải điện áp hoạt động",
  "current": "Dòng điện tiêu thụ hoặc dòng ra",
  "interface": "Giao tiếp/chân kết nối chính",
  "price_vnd": Giá tham khảo tại Việt Nam (chỉ số nguyên, đơn vị VND, ước lượng hợp lý)
}

Chỉ trả về JSON array thuần túy. KHÔNG dùng markdown.
Giá tham khảo tại Việt Nam hợp lý (VD: IC đơn giản 3000-15000đ, MCU 25000-150000đ, module 50000-200000đ).`;
}

// ── Try a single model ──
async function tryModel(modelName, prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
        responseMimeType: "application/json"
      },
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const errMsg = errData.error?.message || '';

    // Quota exceeded
    if (response.status === 429 || errMsg.toLowerCase().includes('quota') || errMsg.toLowerCase().includes('rate')) {
      const error = new Error(errMsg);
      error.isQuota = true;
      error.model = modelName;
      throw error;
    }

    // SỬA: Chỉ ngắt API với lỗi 403 (Forbidden) hoặc 401 (Unauthorized)
    if (response.status === 403 || response.status === 401) {
      const error = new Error('API key bị từ chối hoặc không có quyền truy cập. Vui lòng kiểm tra lại.');
      error.isInvalidKey = true;
      throw error;
    }

    // Nếu bị lỗi 400 (model không tồn tại) hoặc lỗi khác, ném ra ngoài để vòng lặp tự nhảy sang model tiếp theo
    throw new Error(errMsg || `Lỗi API (${modelName}): ${response.status}`);
  }

  return await response.json();
}

// ── Call Gemini API with model fallback ──
export async function searchOnline(query) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const prompt = buildPrompt(query);
  let lastError = null;
  let quotaErrors = [];

  // Try each model in order
  for (const model of GEMINI_MODELS) {
    try {
      console.log(`[VibeParts] Trying model: ${model}...`);
      const data = await tryModel(model, prompt, apiKey);
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      console.log(`[VibeParts] ✅ Success with model: ${model}`);
      return parseAIResponse(text, query);

    } catch (err) {
      if (err.isInvalidKey) {
        throw new Error(err.message); // Dừng hoàn toàn nếu API Key sai
      }
      if (err.isQuota) {
        console.warn(`[VibeParts] ⚠️ Quota exceeded for ${model}, trying next...`);
        quotaErrors.push(err);
        continue;
      }
      console.warn(`[VibeParts] ⚠️ Failed on ${model}: ${err.message}. Trying next...`);
      lastError = err;
      continue; // Có bất cứ lỗi gì (như model chưa ra mắt) thì nhảy sang model tiếp!
    }
  }

  // All models failed
  if (quotaErrors.length === GEMINI_MODELS.length) {
    throw new Error(
      `Tất cả các model AI đã hết quota miễn phí. Vui lòng:\n` +
      `• Đợi 1-2 phút rồi thử lại\n` +
      `• Hoặc sử dụng API key khác`
    );
  }

  throw lastError || new Error('Không thể kết nối đến AI. Vui lòng thử lại.');
}

// ── Parse AI response text into components ──
function parseAIResponse(text, query) {
  let jsonStr = text.trim();

  // KHÔI PHỤC LẠI BỘ LỌC REGEX: Bảo vệ JSON.parse khỏi thẻ markdown rác của AI
  const jsonMatch = jsonStr.match(/

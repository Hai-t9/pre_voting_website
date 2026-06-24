// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// Loaded from config.js (generated from .env.local)
// API_URL points to the Next.js API on Vercel (or localhost for testing)
const API_URL = window.API_URL || "http://localhost:3000/api/dashboard";
const API_PASSWORD = "kehal2025";
// ──────────────────────────────────────────────────────────────────────────────

// ─── WILAYA NAMES (Arabic) ────────────────────────────────────────────────────
const WILAYA_NAMES = {
  "01": "أدرار",
  "02": "الشلف",
  "03": "الأغواط",
  "04": "أم البواقي",
  "05": "باتنة",
  "06": "بجاية",
  "07": "بسكرة",
  "08": "بشار",
  "09": "البليدة",
  10: "البويرة",
  11: "تمنراست",
  12: "تبسة",
  13: "تلمسان",
  14: "تيارت",
  15: "تيزي وزو",
  16: "الجزائر",
  17: "الجلفة",
  18: "جيجل",
  19: "سطيف",
  20: "سعيدة",
  21: "سكيكدة",
  22: "سيدي بلعباس",
  23: "عنابة",
  24: "قالمة",
  25: "قسنطينة",
  26: "المدية",
  27: "مستغانم",
  28: "المسيلة",
  29: "معسكر",
  30: "ورقلة",
  31: "وهران",
  32: "البيض",
  33: "إليزي",
  34: "برج بوعريريج",
  35: "بومرداس",
  36: "الطارف",
  37: "تندوف",
  38: "تيسمسيلت",
  39: "الوادي",
  40: "خنشلة",
  41: "سوق أهراس",
  42: "تيبازة",
  43: "ميلة",
  44: "عين الدفلى",
  45: "النعامة",
  46: "عين تموشنت",
  47: "غرداية",
  48: "غليزان",
  49: "تيميمون",
  50: "برج باجي مختار",
  51: "أولاد جلال",
  52: "بني عباس",
  53: "عين صالح",
  54: "عين قزام",
  55: "تقرت",
  56: "جانت",
  57: "المغير",
  58: "المنيعة",
};

// ─── VOTE LABELS ──────────────────────────────────────────────────────────────
const VOTE_LABELS = {
  yes: { ar: "سيصوت بالتأكيد", badge: "badge-yes" },
  likely: { ar: "يميل للتصويت", badge: "badge-likely" },
  moreInfo: { ar: "يريد المزيد", badge: "badge-more" },
  unsure: { ar: "لا يعرف بعد", badge: "badge-unsure" },
};

// ─── VOLUNTEER LABELS ─────────────────────────────────────────────────────────
const VOLUNTEER_LABELS = {
  support: "تسجيل دعم فقط",
  share: "مشاركة الحملة",
  volunteer: "تطوع",
  field: "تواصل ميداني",
};

// ─── LOCALE LABELS ────────────────────────────────────────────────────────────
const LOCALE_FLAGS = { ar: "🇩🇿 عر", fr: "🇫🇷 فر", en: "🇬🇧 إن" };

// ─── STATE ────────────────────────────────────────────────────────────────────
let allVoters = [];
let filteredVoters = [];

// ─── AUTH CHECK ───────────────────────────────────────────────────────────────
if (sessionStorage.getItem("dashboard_auth") !== "true") {
  window.location.href = "index.html";
}

function logout() {
  sessionStorage.removeItem("dashboard_auth");
  window.location.href = "index.html";
}

// ─── LOAD DATA FROM SUPABASE ──────────────────────────────────────────────────
async function loadData() {
  show("loadingState");
  hide("dashContent");
  hide("errorState");

  try {
    // Fetch data via secure API (no Supabase creds in browser)
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_PASSWORD}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `HTTP ${res.status}`);
    }

    const json = await res.json();
    allVoters = json.data;
    filteredVoters = [...allVoters];

    populateWilayaFilter();
    renderStats(allVoters);
    renderWilayaBreakdown(allVoters);
    renderTable(filteredVoters);
    updateResultsCount();

    hide("loadingState");
    show("dashContent");

    // Show last updated time
    const el = document.getElementById("lastUpdated");
    el.textContent = "آخر تحديث: " + new Date().toLocaleTimeString("ar-DZ");
    el.classList.remove("hidden");
  } catch (err) {
    hide("loadingState");
    show("errorState");
    document.getElementById("errorText").textContent = "خطأ: " + err.message;
    console.error(err);
  }
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function renderStats(data) {
  document.getElementById("statTotal").textContent =
    data.length.toLocaleString("ar-DZ");
  document.getElementById("statYes").textContent = data
    .filter((v) => v.would_vote === "yes")
    .length.toLocaleString("ar-DZ");
  document.getElementById("statLikely").textContent = data
    .filter((v) => v.would_vote === "likely")
    .length.toLocaleString("ar-DZ");

  const uniqueWilayas = new Set(data.map((v) => v.wilaya_code).filter(Boolean));
  document.getElementById("statWilayas").textContent = uniqueWilayas.size;
}

// ─── WILAYA BREAKDOWN ─────────────────────────────────────────────────────────
function renderWilayaBreakdown(data) {
  const counts = {};
  data.forEach((v) => {
    if (v.wilaya_code) counts[v.wilaya_code] = (counts[v.wilaya_code] || 0) + 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] || 1;

  const container = document.getElementById("wilayaBreakdown");
  container.innerHTML = sorted
    .map(
      ([code, count]) => `
    <div class="flex items-center gap-2 cursor-pointer hover:opacity-80"
         onclick="filterByWilaya('${code}')">
      <span class="text-gray-600 w-24 truncate text-xs">${WILAYA_NAMES[code] || code}</span>
      <div class="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
        <div class="bg-green-500 h-2 rounded-full" style="width:${Math.round((count / max) * 100)}%"></div>
      </div>
      <span class="text-gray-800 font-bold text-xs w-8 text-left">${count}</span>
    </div>
  `,
    )
    .join("");
}

// ─── POPULATE WILAYA FILTER ───────────────────────────────────────────────────
function populateWilayaFilter() {
  const codes = [
    ...new Set(allVoters.map((v) => v.wilaya_code).filter(Boolean)),
  ].sort();
  const sel = document.getElementById("filterWilaya");
  sel.innerHTML =
    `<option value="">كل الولايات</option>` +
    codes
      .map(
        (c) => `<option value="${c}">${WILAYA_NAMES[c] || c} (${c})</option>`,
      )
      .join("");
}

// ─── FILTER BY WILAYA (click on breakdown) ────────────────────────────────────
function filterByWilaya(code) {
  document.getElementById("filterWilaya").value = code;
  applyFilters();
  document.getElementById("votersTable").scrollIntoView({ behavior: "smooth" });
}

// ─── APPLY FILTERS ────────────────────────────────────────────────────────────
function applyFilters() {
  const search = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const wilaya = document.getElementById("filterWilaya").value;
  const vote = document.getElementById("filterVote").value;
  const volunteer = document.getElementById("filterVolunteer").value;
  const locale = document.getElementById("filterLocale").value;

  filteredVoters = allVoters.filter((v) => {
    if (wilaya && v.wilaya_code !== wilaya) return false;
    if (vote && v.would_vote !== vote) return false;
    if (volunteer && v.volunteer_interest !== volunteer) return false;
    if (locale && v.locale !== locale) return false;
    if (search) {
      const fullName = `${v.first_name} ${v.last_name}`.toLowerCase();
      const phone = (v.phone || "").toLowerCase();
      if (!fullName.includes(search) && !phone.includes(search)) return false;
    }
    return true;
  });

  renderTable(filteredVoters);
  updateResultsCount();
}

function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("filterWilaya").value = "";
  document.getElementById("filterVote").value = "";
  document.getElementById("filterVolunteer").value = "";
  document.getElementById("filterLocale").value = "";
  applyFilters();
}

function updateResultsCount() {
  document.getElementById("resultsCount").textContent =
    `يعرض ${filteredVoters.length.toLocaleString("ar-DZ")} من أصل ${allVoters.length.toLocaleString("ar-DZ")} داعم`;
}

// ─── RENDER TABLE ─────────────────────────────────────────────────────────────
function renderTable(data) {
  const tbody = document.getElementById("votersBody");
  const empty = document.getElementById("emptyState");

  if (data.length === 0) {
    tbody.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");

  tbody.innerHTML = data
    .map((v, i) => {
      const voteInfo = VOTE_LABELS[v.would_vote] || {
        ar: v.would_vote || "—",
        badge: "badge-unsure",
      };
      const volLabel =
        VOLUNTEER_LABELS[v.volunteer_interest] || v.volunteer_interest || "—";
      const localeStr = LOCALE_FLAGS[v.locale] || v.locale || "—";
      const wilayaName = WILAYA_NAMES[v.wilaya_code] || v.wilaya_code || "—";
      const date = v.created_at
        ? new Date(v.created_at).toLocaleDateString("ar-DZ", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "—";
      const message = v.message
        ? `<span title="${escHtml(v.message)}" class="cursor-help text-blue-500">💬</span>`
        : "<span class='text-gray-300'>—</span>";

      return `
      <tr class="border-t border-gray-50">
        <td class="px-4 py-3 text-gray-400 text-xs">${i + 1}</td>
        <td class="px-4 py-3 font-semibold">${escHtml(v.first_name)} ${escHtml(v.last_name)}</td>
        <td class="px-4 py-3 text-gray-600 dir-ltr">${escHtml(v.phone || "—")}</td>
        <td class="px-4 py-3 text-gray-700">${wilayaName}</td>
        <td class="px-4 py-3 text-gray-500 text-xs">${escHtml(v.municipality || "—")}</td>
        <td class="px-4 py-3"><span class="badge ${voteInfo.badge}">${voteInfo.ar}</span></td>
        <td class="px-4 py-3 text-gray-500 text-xs">${escHtml(volLabel)}</td>
        <td class="px-4 py-3 text-xs">${localeStr}</td>
        <td class="px-4 py-3">${message}</td>
        <td class="px-4 py-3 text-gray-400 text-xs">${date}</td>
      </tr>
    `;
    })
    .join("");
}

// ─── EXPORT CSV ───────────────────────────────────────────────────────────────
function exportCSV() {
  const headers = [
    "#",
    "الاسم الأول",
    "الاسم العائلي",
    "الهاتف",
    "الولاية",
    "البلدية",
    "نية التصويت",
    "المساهمة",
    "اللغة",
    "الرسالة",
    "التاريخ",
  ];
  const rows = filteredVoters.map((v, i) => [
    i + 1,
    v.first_name || "",
    v.last_name || "",
    v.phone || "",
    WILAYA_NAMES[v.wilaya_code] || v.wilaya_code || "",
    v.municipality || "",
    VOTE_LABELS[v.would_vote]?.ar || v.would_vote || "",
    VOLUNTEER_LABELS[v.volunteer_interest] || v.volunteer_interest || "",
    v.locale || "",
    (v.message || "").replace(/,/g, "؛"),
    v.created_at ? new Date(v.created_at).toLocaleDateString("ar-DZ") : "",
  ]);

  const csv =
    "\uFEFF" +
    [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `داعمو-كحال-امنة-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function show(id) {
  document.getElementById(id)?.classList.remove("hidden");
}
function hide(id) {
  document.getElementById(id)?.classList.add("hidden");
}
function escHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
loadData();

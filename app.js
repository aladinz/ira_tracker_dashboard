/* ===== IRA TRACKER DASHBOARD — app.js ===== */
'use strict';

// ─── PORTFOLIO DATA ────────────────────────────────────────────────────────────
const PORTFOLIOS = {
  traditional: {
    name: 'Traditional IRA',
    accountValue: 654560,
    holdings: [
      { ticker: 'VGSH',  name: 'Vanguard Short-Term Gov\'t Bond',     alloc: 34, shares: 3736,     costBasis: 58.78 },
      { ticker: 'SCHD',  name: 'Schwab US Dividend Equity',           alloc: 14, shares: 3030,     costBasis: 28.87 },
      { ticker: 'SGOV',  name: 'iShares 0-3 Month Treasury Bond',     alloc: 17, shares: 1091.926, costBasis: 100.64 },
      { ticker: 'VTIP',  name: 'Vanguard Short-Term Inflation Prot.', alloc: 14, shares: 1898,     costBasis: 49.82 },
      { ticker: 'GLDM',  name: 'SPDR Gold MiniShares',                alloc: 12, shares: 925,      costBasis: 91.93 },
      { ticker: 'USMV',  name: 'iShares MSCI Min Volatility',         alloc:  9, shares: 649,      costBasis: 94.95 },
    ]
  },
  rollover: {
    name: 'Rollover IRA',
    accountValue: 218653,
    holdings: [
      { ticker: 'VTI',   name: 'Vanguard Total Stock Market',         alloc: 29, shares: 200.939,  costBasis: 308.24 },
      { ticker: 'SCHD',  name: 'Schwab US Dividend Equity',           alloc: 12, shares: 876,      costBasis: 29.18 },
      { ticker: 'VTIP',  name: 'Vanguard Short-Term Inflation Prot.', alloc: 12, shares: 514,      costBasis: 49.76 },
      { ticker: 'VXUS',  name: 'Vanguard Total Intl Stock',           alloc:  9, shares: 253,      costBasis: 72.92 },
      { ticker: 'XLK',   name: 'Technology Select Sector SPDR',       alloc:  9, shares: 156.638,  costBasis: 129.57 },
      { ticker: 'XLV',   name: 'Health Care Select Sector SPDR',      alloc:  9, shares: 129,      costBasis: 147.64 },
      { ticker: 'BNDW',  name: 'Vanguard Total World Bond',           alloc: 11, shares: 360,      costBasis: 69.87 },
      { ticker: 'PDBC',  name: 'Invesco Optimum Yield Diversified',   alloc:  9, shares: 1118,     costBasis: 14.69 },
    ]
  },
  roth: {
    name: 'Roth IRA',
    accountValue: 208388,
    holdings: [
      { ticker: 'FZROX', name: 'Fidelity ZERO Total Market',          alloc: 41, shares: 3725.399, costBasis: 23.64 },
      { ticker: 'SCHD',  name: 'Schwab US Dividend Equity',           alloc: 12, shares: 829.139,  costBasis: 26.77 },
      { ticker: 'VXUS',  name: 'Vanguard Total Intl Stock',           alloc: 11, shares: 315,      costBasis: 75.42 },
      { ticker: 'XLV',   name: 'Health Care Select Sector SPDR',      alloc: 12, shares: 166,      costBasis: 152.95 },
      { ticker: 'SMH',   name: 'VanEck Semiconductor ETF',            alloc: 10, shares: 53.137,   costBasis: 308.55 },
      { ticker: 'VGIT',  name: 'Vanguard Intermediate-Term Gov\'t',   alloc:  7, shares: 252,      costBasis: 60.39 },
      { ticker: 'VRT',   name: 'Vertiv Holdings',                     alloc:  3, shares: 27.045,   costBasis: 57.79 },
      { ticker: 'GLDM',  name: 'SPDR Gold MiniShares',                alloc:  4, shares: 90,       costBasis: 101.81 },
    ]
  },
  investments: {
    name: 'Investments',
    accountValue: 140902,
    holdings: [
      { ticker: 'SGOV',  name: 'iShares 0-3 Month Treasury Bond',     alloc: 50, shares: 696,      costBasis: 100.52 },
      { ticker: 'VTI',   name: 'Vanguard Total Stock Market',         alloc: 29, shares: 128,      costBasis: 328.28 },
      { ticker: 'SCHD',  name: 'Schwab US Dividend Equity',           alloc: 11, shares: 517,      costBasis: 27.05 },
      { ticker: 'VXUS',  name: 'Vanguard Total Intl Stock',           alloc: 10, shares: 188,      costBasis: 74.39 },
    ]
  },
  income: {
    name: 'Income Strategy',
    accountValue: 14896,
    holdings: [
      { ticker: 'SGOV',  name: 'iShares 0-3 Month Treasury Bond',     alloc: 51, shares: 74.719,   costBasis: 100.38 },
      { ticker: 'JEPI',  name: 'JPMorgan Equity Premium Income',      alloc: 29, shares: 77.14,    costBasis: 58.34 },
      { ticker: 'SCHD',  name: 'Schwab US Dividend Equity',           alloc: 10, shares: 50.411,   costBasis: 29.76 },
      { ticker: 'BIL',   name: 'SPDR Bloomberg 1-3 Month T-Bill',     alloc: 10, shares: 16.414,   costBasis: 91.38 },
    ]
  }
};

const PORTFOLIOS_DEFAULT = JSON.parse(JSON.stringify(PORTFOLIOS));

const BENCHMARKS = {
  '^DJI':  { label: 'DOW JONES',  range52: '36,611.78 – 50,512.79', base90: 46266.59 },
  '^GSPC': { label: 'S&P 500',    range52: '4,835.04 – 7,002.28',   base90: 6539.84  },
  '^IXIC': { label: 'NASDAQ',     range52: '14,784.03 – 24,019.99', base90: 21677.45 },
  'GC=F':  { label: 'GOLD / oz',  range52: '2,144.72 – 3,085.40',   base90: 3082.10  },
};

const ALL_TICKERS = [
  'VGSH','VTIP','SCHD','USMV','GLDM','SGOV',
  'VTI','XLK','VXUS','XLV','BNDW','PDBC',
  'FZROX','SMH','VRT','VGIT',
  'JEPI','BIL',
];

const PORTFOLIO_STORAGE_KEY = 'ira-tracker-dashboard.portfolio-data.v1';

// ─── STATE ──────────────────────────────────────────────────────────────────────
const state = {
  prices: {},           // ticker -> { price, dayChange, dayChangePct, name }
  bench:  {},           // key -> { price, dayChange, dayChangePct }
  charts: {},           // id -> Chart instance
  currentPage: 'overview',
  editorPortfolioKey: 'traditional',
  priceOverrides: {},   // ticker -> { price, prevClose, updatedAt } — from portfolio-data.js or editor
  diagnostics: {
    lastMarketsRefreshAt: null,
    lastNewsRefreshAt: null,
    lastMarketsError: null,
    lastNewsError: null,
  },
  warNews: {
    items: [],
    updatedAt: null,
    source: 'Seeded conflict updates',
    live: false,
  },
};

const WAR_NEWS_QUERY = 'https://news.google.com/rss/search?q=Iran+OR+Israel+OR+Hormuz+war+when:7d&hl=en-US&gl=US&ceid=US:en';
const WAR_NEWS_PROXY_BASES = [
  'https://corsproxy.io/?',
  'https://api.allorigins.win/raw?url=',
];
const WAR_NEWS_FALLBACK = [
  {
    severity: 'critical',
    headline: 'Strait of Hormuz shipping disruption risk remains elevated.',
    source: 'Seeded alert',
    publishedAt: 'Recent',
  },
  {
    severity: 'high',
    headline: 'Commodity volatility is still elevated across oil, shipping, and metals.',
    source: 'Seeded alert',
    publishedAt: 'Recent',
  },
  {
    severity: 'medium',
    headline: 'Global risk sentiment remains sensitive to new Middle East developments.',
    source: 'Seeded alert',
    publishedAt: 'Recent',
  },
];

// ─── YAHOO FINANCE PROXY ────────────────────────────────────────────────────────
// Uses a CORS proxy to fetch Yahoo Finance quote data.
// In a production deployment replace with your own backend endpoint.
const YF_BASE = 'https://query1.finance.yahoo.com/v8/finance/chart/';
const YF_PROXY_BASES = [
  'https://corsproxy.io/?',
  'https://api.allorigins.win/raw?url=',
];
const FETCH_TIMEOUT_MS = 12000;

function asFiniteNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

async function fetchJSON(url) {
  const withTimeout = async (targetUrl) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      return await fetch(targetUrl, { mode: 'cors', cache: 'no-store', signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
  };

  const isLocalHttp =
    typeof window !== 'undefined' &&
    window.location?.protocol?.startsWith('http') &&
    (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost');
  const isYahooQuote = url.startsWith(YF_BASE);

  // On localhost dev servers, Yahoo chart endpoints are commonly blocked by CORS.
  // Skip direct fetch there and go straight to proxy fallbacks.
  const shouldTryDirectFirst = !(isLocalHttp && isYahooQuote);

  let directStatus = 'n/a';
  if (shouldTryDirectFirst) {
    try {
      const direct = await withTimeout(url);
      directStatus = String(direct.status);
      if (direct.ok) return direct.json();
    } catch {
      // ignore and continue to proxy fallback
    }
  }

  // Some browsers/loading contexts can fail direct CORS.
  // Try multiple proxies so one temporary outage does not break live updates.
  const ts = Date.now();
  let lastProxyStatus = 'n/a';
  for (const base of YF_PROXY_BASES) {
    try {
      const separator = base.includes('?') ? '&' : '?';
      const proxiedUrl = `${base}${encodeURIComponent(url)}${separator}_=${ts}`;
      const proxied = await withTimeout(proxiedUrl);
      lastProxyStatus = String(proxied.status);
      if (proxied.ok) return proxied.json();
    } catch {
      // try next proxy
    }
  }

  throw new Error(`HTTP ${directStatus}/${lastProxyStatus}`);
}

async function loadBenchmarkPrices() {
  const symbols = Object.keys(BENCHMARKS);
  await Promise.allSettled(
    symbols.map(async sym => {
      try {
        const q = await fetchQuote(sym);
        state.bench[sym] = q;
      } catch {
        if (!state.bench[sym] && BENCH_SEED[sym]) {
          state.bench[sym] = { ...BENCH_SEED[sym], usedSeed: true };
        }
      }
    })
  );
}

async function fetchQuote(symbol) {
  const url = `${YF_BASE}${encodeURIComponent(symbol)}?interval=1d&range=3mo`;
  const json = await fetchJSON(url);
  const result = json?.chart?.result?.[0];
  if (!result?.meta || !result?.indicators?.quote?.[0]?.close) throw new Error('Malformed quote response');

  const meta = result.meta;
  const closes = result.indicators.quote[0].close
    .map(v => asFiniteNumber(v))
    .filter(v => v != null);
  if (!closes.length) throw new Error('No close data');

  const latestClose = closes[closes.length - 1];
  const previousFromSeries = closes.length > 1 ? closes[closes.length - 2] : latestClose;
  const price = asFiniteNumber(meta.regularMarketPrice) ?? latestClose;
  const prevClose =
    asFiniteNumber(meta.previousClose) ??
    asFiniteNumber(meta.chartPreviousClose) ??
    previousFromSeries ??
    price;
  const dayChange    = price - prevClose;
  const dayChangePct = prevClose !== 0 ? (dayChange / prevClose) * 100 : 0;

  // 90-day return (base=100)
  const startPrice = closes[0];
  const series90 = closes.map(v => (v / startPrice) * 100);
  const timestamps = result.timestamp ?? [];

  return { price, prevClose, dayChange, dayChangePct, series90, timestamps, symbol };
}

// Fallback seed data so the dashboard always loads even if fetch fails
const SEED = {
  VGSH:  { price: 58.31,  dayChange: -0.06, dayChangePct: -0.10, return90: 0.84  },
  VTIP:  { price: 49.73,  dayChange: -0.02, dayChangePct: -0.04, return90: 1.80  },
  SCHD:  { price: 30.62,  dayChange: -0.18, dayChangePct: -0.58, return90: 1.52  },
  USMV:  { price: 92.21,  dayChange: -0.14, dayChangePct: -0.15, return90: 1.45  },
  GLDM:  { price: 86.33,  dayChange:  0.38, dayChangePct:  0.44, return90: 12.41 },
  SGOV:  { price: 100.62, dayChange:  0.01, dayChangePct:  0.01, return90: 0.42  },
  VTI:   { price: 319.55, dayChange: -0.87, dayChangePct: -0.27, return90: 0.98  },
  XLK:   { price: 132.50, dayChange: -2.18, dayChangePct: -1.62, return90: -3.20 },
  VXUS:  { price: 75.20,  dayChange: -0.22, dayChangePct: -0.29, return90: 2.10  },
  XLV:   { price: 145.74, dayChange: -0.38, dayChangePct: -0.26, return90: 3.50  },
  BNDW:  { price: 67.91,  dayChange: -0.08, dayChangePct: -0.12, return90: 0.70  },
  PDBC:  { price: 17.02,  dayChange:  0.22, dayChangePct:  1.31, return90: 27.87 },
  FZROX: { price: 22.92,  dayChange: -0.14, dayChangePct: -0.61, return90: 2.40  },
  SMH:   { price: 380.84, dayChange: -3.12, dayChangePct: -0.81, return90: -4.80 },
  VRT:   { price: 252.40, dayChange: -0.85, dayChangePct: -0.34, return90: 6.20  },
  VGIT:  { price: 59.09,  dayChange: -0.04, dayChangePct: -0.07, return90: 0.60  },
  JEPI:  { price: 56.19,  dayChange: -0.14, dayChangePct: -0.25, return90: 1.20  },
  BIL:   { price: 91.60,  dayChange:  0.01, dayChangePct:  0.01, return90: 0.48  },
};
const BENCH_SEED = {
  '^DJI':  { price: 46266.59, dayChange: -162.91, dayChangePct: -0.35 },
  '^GSPC': { price:  6539.84, dayChange:  -52.06, dayChangePct: -0.79 },
  '^IXIC': { price: 21677.45, dayChange: -252.38, dayChangePct: -1.15 },
  'GC=F':  { price:  3082.10, dayChange:  -12.40, dayChangePct: -0.40 },
};

// ─── DIVIDEND YIELD DATA (trailing 12-month estimates, 2026) ────────────────────
const DIV_INFO = {
  VGSH:  { freq:'monthly',   payMonths:[0,1,2,3,4,5,6,7,8,9,10,11], aps:2.896  },
  SGOV:  { freq:'monthly',   payMonths:[0,1,2,3,4,5,6,7,8,9,10,11], aps:5.132  },
  BNDW:  { freq:'monthly',   payMonths:[0,1,2,3,4,5,6,7,8,9,10,11], aps:2.386  },
  VGIT:  { freq:'monthly',   payMonths:[0,1,2,3,4,5,6,7,8,9,10,11], aps:1.425  },
  JEPI:  { freq:'monthly',   payMonths:[0,1,2,3,4,5,6,7,8,9,10,11], aps:4.495  },
  BIL:   { freq:'monthly',   payMonths:[0,1,2,3,4,5,6,7,8,9,10,11], aps:4.827  },
  VTIP:  { freq:'quarterly', payMonths:[2,5,8,11],                   aps:2.018  },
  SCHD:  { freq:'quarterly', payMonths:[2,5,8,11],                   aps:1.073  },
  USMV:  { freq:'quarterly', payMonths:[2,5,8,11],                   aps:1.967  },
  VTI:   { freq:'quarterly', payMonths:[2,5,8,11],                   aps:4.778  },
  VXUS:  { freq:'quarterly', payMonths:[2,5,8,11],                   aps:2.466  },
  XLK:   { freq:'quarterly', payMonths:[2,5,8,11],                   aps:1.143  },
  XLV:   { freq:'quarterly', payMonths:[2,5,8,11],                   aps:2.496  },
  FZROX: { freq:'annual',    payMonths:[10],                         aps:0.325  },
  SMH:   { freq:'annual',    payMonths:[10],                         aps:1.994  },
  VRT:   { freq:'annual',    payMonths:[11],                         aps:0.222  },
  GLDM:  { freq:'none',      payMonths:[],                           aps:0      },
  PDBC:  { freq:'none',      payMonths:[],                           aps:0      },
};

// ─── FETCH ALL PRICES ──────────────────────────────────────────────────────────
async function loadAllPrices() {
  // Try live fetch; silently fall back to seed on CORS / rate-limit errors
  const allSymbols = [...ALL_TICKERS, ...Object.keys(BENCHMARKS)];
  await Promise.allSettled(
    allSymbols.map(async sym => {
      try {
        const q = await fetchQuote(sym);
        if (ALL_TICKERS.includes(sym)) {
          state.prices[sym] = q;
        } else {
          state.bench[sym] = q;
        }
      } catch {
        // use seed
      }
    })
  );

  // Fill gaps from seed
  ALL_TICKERS.forEach(t => {
    if (!state.prices[t] && SEED[t]) {
      state.prices[t] = { ...SEED[t], usedSeed: true };
    }
  });
  Object.keys(BENCHMARKS).forEach(k => {
    if (!state.bench[k] && BENCH_SEED[k]) {
      state.bench[k] = { ...BENCH_SEED[k], usedSeed: true };
    }
  });
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function fmt$(n)   { return '$' + Math.abs(n).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}); }
function fmtPct(n) { return (n >= 0 ? '+' : '') + n.toFixed(2) + '%'; }
function fmtN(n)   { return n.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}); }
function pColor(n) { return n >= 0 ? 'change-up' : 'change-down'; }
function signedDollar(n) { return (n >= 0 ? '+$' : '-$') + Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:0}); }

// Returns today as "May 7, 2026"
function todayLabel() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
// Returns the date N days before today as "Feb 6, 2026"
function daysAgoLabel(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
// "Feb 6, 2026 – May 7, 2026"
function window90Label() { return `${daysAgoLabel(90)} \u2013 ${todayLabel()}`; }

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function escAttr(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function coerceHolding(raw, fallback = null) {
  const ticker = String(raw?.ticker ?? fallback?.ticker ?? '').trim().toUpperCase();
  const name = String(raw?.name ?? fallback?.name ?? '').trim();
  const alloc = Number(raw?.alloc ?? fallback?.alloc ?? 0);
  const shares = Number(raw?.shares ?? fallback?.shares ?? 0);
  const costBasis = Number(raw?.costBasis ?? fallback?.costBasis ?? 0);
  if (!ticker || !name || Number.isNaN(alloc) || Number.isNaN(shares) || Number.isNaN(costBasis)) return null;
  return {
    ticker,
    name,
    alloc: Math.max(0, alloc),
    shares: Math.max(0, shares),
    costBasis: Math.max(0, costBasis),
  };
}

function sanitizePortfolioData(raw) {
  const clean = {};
  for (const [key, base] of Object.entries(PORTFOLIOS_DEFAULT)) {
    const source = raw?.[key] ?? {};
    const accountValue = Number(source.accountValue);
    const holdings = Array.isArray(source.holdings)
      ? source.holdings.map(h => coerceHolding(h)).filter(Boolean)
      : deepClone(base.holdings);
    clean[key] = {
      name: base.name,
      accountValue: Number.isFinite(accountValue) && accountValue >= 0 ? accountValue : base.accountValue,
      holdings: holdings.length ? holdings : deepClone(base.holdings),
    };
  }
  return clean;
}

function applyPortfolioData(clean) {
  for (const key of Object.keys(PORTFOLIOS)) {
    PORTFOLIOS[key].accountValue = clean[key].accountValue;
    PORTFOLIOS[key].holdings = clean[key].holdings;
  }
}

function syncTickerCatalog() {
  const activeTickers = new Set();
  Object.values(PORTFOLIOS).forEach(port => {
    port.holdings.forEach(h => {
      if (h.ticker) activeTickers.add(h.ticker.toUpperCase());
    });
  });

  activeTickers.forEach(ticker => {
    if (!ALL_TICKERS.includes(ticker)) ALL_TICKERS.push(ticker);
    if (!SEED[ticker]) {
      const live = state.prices[ticker];
      SEED[ticker] = {
        price: live?.price ?? 0,
        dayChange: live?.dayChange ?? 0,
        dayChangePct: live?.dayChangePct ?? 0,
        return90: 0,
      };
    }
    if (!DIV_INFO[ticker]) {
      DIV_INFO[ticker] = { freq: 'none', payMonths: [], aps: 0 };
    }
  });
}

// ─── FILE-BASED DATA LAYER (replaces localStorage) ──────────────────────────────

function buildExportData() {
  const accountValues = {};
  const holdings = {};
  Object.keys(PORTFOLIOS).forEach(key => {
    accountValues[key] = PORTFOLIOS[key].accountValue;
    holdings[key] = PORTFOLIOS[key].holdings;
  });
  return {
    _meta: { version: 1, lastUpdated: new Date().toISOString() },
    accountValues,
    holdings,
    priceOverrides: deepClone(state.priceOverrides),
  };
}

function applyDataPayload(payload) {
  for (const key of Object.keys(PORTFOLIOS_DEFAULT)) {
    const av = Number(payload?.accountValues?.[key]);
    if (Number.isFinite(av) && av >= 0) PORTFOLIOS[key].accountValue = av;
    const rawHoldings = payload?.holdings?.[key];
    if (Array.isArray(rawHoldings)) {
      const cleaned = rawHoldings.map(h => coerceHolding(h)).filter(Boolean);
      if (cleaned.length) PORTFOLIOS[key].holdings = cleaned;
    }
  }
  state.priceOverrides = {};
  for (const [ticker, data] of Object.entries(payload?.priceOverrides ?? {})) {
    const price = Number(data?.price);
    const prevClose = Number(data?.prevClose);
    if (Number.isFinite(price) && price > 0) {
      state.priceOverrides[ticker.toUpperCase()] = {
        price,
        prevClose: (Number.isFinite(prevClose) && prevClose > 0) ? prevClose : null,
        updatedAt: String(data?.updatedAt ?? ''),
      };
    }
  }
  syncTickerCatalog();
}

function readStoredPortfolioData() {
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function writeStoredPortfolioData(payload) {
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage failures and keep the file/export flow working.
  }
}

function savePortfolioData() {
  // Write changes back into the in-memory window.PORTFOLIO_USER_DATA object and
  // keep a browser-side backup so edits survive reloads.
  const payload = buildExportData();
  if (!window.PORTFOLIO_USER_DATA || typeof window.PORTFOLIO_USER_DATA !== 'object') {
    window.PORTFOLIO_USER_DATA = deepClone(payload);
    writeStoredPortfolioData(payload);
    return;
  }
  if (!window.PORTFOLIO_USER_DATA._meta || typeof window.PORTFOLIO_USER_DATA._meta !== 'object') {
    window.PORTFOLIO_USER_DATA._meta = { version: 1, lastUpdated: payload._meta.lastUpdated };
  }
  window.PORTFOLIO_USER_DATA._meta.version = Number(window.PORTFOLIO_USER_DATA._meta.version) || 1;
  window.PORTFOLIO_USER_DATA._meta.lastUpdated = payload._meta.lastUpdated;
  window.PORTFOLIO_USER_DATA.accountValues = payload.accountValues;
  window.PORTFOLIO_USER_DATA.holdings = payload.holdings;
  window.PORTFOLIO_USER_DATA.priceOverrides = payload.priceOverrides;
  writeStoredPortfolioData(payload);
}

function loadPortfolioData() {
  const storedPayload = readStoredPortfolioData();
  const payload = storedPayload ?? window.PORTFOLIO_USER_DATA;
  if (!payload) {
    syncTickerCatalog();
    return;
  }
  try {
    applyDataPayload(payload);
    if (!storedPayload) writeStoredPortfolioData(buildExportData());
  } catch {
    applyPortfolioData(deepClone(PORTFOLIOS_DEFAULT));
    syncTickerCatalog();
  }
}

function resetPortfolioData(portKey = null) {
  if (portKey && PORTFOLIOS_DEFAULT[portKey]) {
    PORTFOLIOS[portKey].accountValue = PORTFOLIOS_DEFAULT[portKey].accountValue;
    PORTFOLIOS[portKey].holdings = deepClone(PORTFOLIOS_DEFAULT[portKey].holdings);
    PORTFOLIOS_DEFAULT[portKey].holdings.forEach(h => delete state.priceOverrides[h.ticker]);
  } else {
    applyPortfolioData(deepClone(PORTFOLIOS_DEFAULT));
    state.priceOverrides = {};
  }
  syncTickerCatalog();
  savePortfolioData();
}

function exportPortfolioJS() {
  savePortfolioData();
  const payload = buildExportData();
  const content = `/* portfolio-data.js — IRA Tracker Dashboard · Generated ${payload._meta.lastUpdated}
 * Replace your portfolio-data.js file with this content to persist changes.
 * See the original file header for usage instructions.
 */
window.PORTFOLIO_USER_DATA = ${JSON.stringify(payload, null, 2)};
`;
  triggerDownload(content, 'portfolio-data.js', 'text/javascript');
}

function exportPortfolioJSON() {
  savePortfolioData();
  const payload = buildExportData();
  triggerDownload(JSON.stringify(payload, null, 2), 'portfolio-data.json', 'application/json');
}

function triggerDownload(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function importPortfolioFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        let payload;
        const text = String(e.target.result ?? '');
        const lowerName = file.name.toLowerCase();
        if (lowerName.endsWith('.js')) {
          // Accept portfolio-data.js files even if they include comments or extra whitespace.
          const match = text.match(/window\.PORTFOLIO_USER_DATA\s*=\s*(\{[\s\S]*\})\s*;?/);
          if (!match) throw new Error('Could not find PORTFOLIO_USER_DATA in the .js file.');
          payload = JSON.parse(match[1]);
        } else {
          payload = JSON.parse(text);
        }
        applyDataPayload(payload);
        savePortfolioData();
        resolve();
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsText(file);
  });
}

function editorHoldingRowHTML(h = {}) {
  const ticker = escAttr(h.ticker ?? '');
  const name = escAttr(h.name ?? '');
  const alloc = Number(h.alloc ?? 0);
  const shares = Number(h.shares ?? 0);
  const costBasis = Number(h.costBasis ?? 0);
  const tickerUpper = String(h.ticker ?? '').trim().toUpperCase();
  const ov = state.priceOverrides[tickerUpper];
  const manualPrice = ov?.price ?? '';
  const manualPrevClose = ov?.prevClose ?? '';
  const source = tickerUpper ? getPriceSource(tickerUpper) : 'seed';
  return `
    <tr>
      <td><input class="editor-input" data-field="ticker" value="${ticker}" placeholder="SCHD" maxlength="12" /></td>
      <td><input class="editor-input" data-field="name" value="${name}" placeholder="Security name" /></td>
      <td><input class="editor-input" data-field="alloc" type="number" min="0" step="0.01" value="${alloc}" /></td>
      <td><input class="editor-input" data-field="shares" type="number" min="0" step="0.001" value="${shares}" /></td>
      <td><input class="editor-input" data-field="costBasis" type="number" min="0" step="0.01" value="${costBasis}" /></td>
      <td><input class="editor-input" data-field="manualPrice" type="number" min="0" step="0.01" value="${manualPrice}" placeholder="optional" /></td>
      <td><input class="editor-input" data-field="manualPrevClose" type="number" min="0" step="0.01" value="${manualPrevClose}" placeholder="optional" /></td>
      <td><span class="price-source-badge source-${source}">${source.toUpperCase()}</span></td>
      <td><button class="editor-remove" type="button">Remove</button></td>
    </tr>`;
}

function getEditorRows() {
  const rows = [];
  document.querySelectorAll('#editorHoldingsBody tr').forEach(tr => {
    const ticker = tr.querySelector('[data-field="ticker"]')?.value.trim().toUpperCase() ?? '';
    const name = tr.querySelector('[data-field="name"]')?.value.trim() ?? '';
    const alloc = Number(tr.querySelector('[data-field="alloc"]')?.value ?? 0);
    const shares = Number(tr.querySelector('[data-field="shares"]')?.value ?? 0);
    const costBasis = Number(tr.querySelector('[data-field="costBasis"]')?.value ?? 0);
    const manualPriceRaw = tr.querySelector('[data-field="manualPrice"]')?.value.trim();
    const manualPrevCloseRaw = tr.querySelector('[data-field="manualPrevClose"]')?.value.trim();
    const manualPrice = manualPriceRaw ? Number(manualPriceRaw) : null;
    const manualPrevClose = manualPrevCloseRaw ? Number(manualPrevCloseRaw) : null;
    if (!ticker && !name && alloc === 0 && shares === 0 && costBasis === 0) return;
    rows.push({ ticker, name, alloc, shares, costBasis, manualPrice, manualPrevClose });
  });
  return rows;
}

function renderEditorRows(portKey) {
  const tbody = document.getElementById('editorHoldingsBody');
  if (!tbody) return;
  tbody.innerHTML = PORTFOLIOS[portKey].holdings.map(editorHoldingRowHTML).join('');
  updateEditorTotals();
}

async function commitEditorPortfolioChanges({ statusPrefix = 'Saved', refreshPrices = true } = {}) {
  const portKey = state.editorPortfolioKey;
  const previousTickers = new Set(PORTFOLIOS[portKey].holdings.map(h => String(h.ticker || '').toUpperCase()));
  const rows = getEditorRows();
  const accountValue = Number(document.getElementById('editorAccountValue').value || 0);

  if (!rows.length) {
    setEditorStatus('At least one holding is required.', false);
    return false;
  }

  const sanitizedRows = rows.map(r => coerceHolding(r)).filter(Boolean);
  if (sanitizedRows.length !== rows.length) {
    setEditorStatus('Each row needs a ticker, name, and valid numeric values.', false);
    return false;
  }

  PORTFOLIOS[portKey].accountValue = Number.isFinite(accountValue) && accountValue >= 0 ? accountValue : 0;
  PORTFOLIOS[portKey].holdings = sanitizedRows;

  // Remove stale overrides for tickers no longer present in this portfolio.
  previousTickers.forEach(ticker => delete state.priceOverrides[ticker]);

  // Apply / clear price overrides from the editor columns.
  rows.forEach(row => {
    if (!row.ticker) return;
    const p = row.manualPrice;
    const pc = row.manualPrevClose;
    if (p != null && Number.isFinite(p) && p > 0) {
      state.priceOverrides[row.ticker] = {
        price: p,
        prevClose: (pc != null && Number.isFinite(pc) && pc > 0) ? pc : null,
        updatedAt: new Date().toISOString(),
      };
    } else {
      delete state.priceOverrides[row.ticker];
    }
  });

  syncTickerCatalog();
  savePortfolioData();

  let refreshed = true;
  if (refreshPrices) {
    try { await loadAllPrices(); } catch { refreshed = false; }
  }

  const manualCount = Object.keys(state.priceOverrides).length;
  setEditorStatus(`${statusPrefix} ${sanitizedRows.length} holdings for ${PORTFOLIOS[portKey].name}. Manual overrides: ${manualCount}. Changes are stored in this browser. Live refresh ${refreshed ? 'ok' : 'deferred'}.`, true);
  renderEditorRows(portKey);
  return true;
}

function updateEditorTotals() {
  const rows = getEditorRows();
  const allocTotal = rows.reduce((sum, row) => sum + (Number(row.alloc) || 0), 0);
  const allocEl = document.getElementById('editorAllocTotal');
  if (!allocEl) return;
  allocEl.textContent = `${allocTotal.toFixed(2)}%`;
  allocEl.classList.toggle('change-up', Math.abs(allocTotal - 100) < 0.01);
  allocEl.classList.toggle('change-down', Math.abs(allocTotal - 100) >= 0.01);
}

function setEditorStatus(message, ok = true) {
  const el = document.getElementById('editorStatus');
  if (!el) return;
  // Preserve hint text in the status container while updating the lead message.
  const hint = '<span class="editor-persist-hint">Tip: saves now persist in this browser, and export remains available for a portable backup.</span>';
  el.innerHTML = `${escAttr(message)} ${hint}`;
  el.classList.toggle('change-up', ok);
  el.classList.toggle('change-down', !ok);
}

function inferWarSeverity(headline) {
  const h = String(headline || '').toLowerCase();
  if (/missile|strike|attack|killed|dead|blockade|hormuz|evacuat|airstrike|drone/.test(h)) return 'critical';
  if (/oil|sanction|shipping|navy|troops|military|conflict|escalat/.test(h)) return 'high';
  return 'medium';
}

function formatWarNewsDate(input) {
  if (!input) return 'Recent';
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return 'Recent';
  return d.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC',
  }) + ' UTC';
}

async function fetchWarNews() {
  const ts = Date.now();
  let xml = '';
  let fetched = false;

  for (const base of WAR_NEWS_PROXY_BASES) {
    try {
      const separator = base.includes('?') ? '&' : '?';
      const proxiedUrl = `${base}${encodeURIComponent(WAR_NEWS_QUERY)}${separator}_=${ts}`;
      const resp = await fetch(proxiedUrl, { mode: 'cors', cache: 'no-store' });
      if (!resp.ok) continue;
      xml = await resp.text();
      fetched = true;
      break;
    } catch {
      // try next proxy
    }
  }

  if (!fetched) throw new Error('Failed to fetch war news feed');

  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  const rssItems = [...doc.querySelectorAll('item')].slice(0, 8);
  const news = rssItems.map(item => {
    const rawTitle = (item.querySelector('title')?.textContent || '').trim();
    const publishedAt = item.querySelector('pubDate')?.textContent || '';

    // Google News RSS appends source to title as " - Source".
    const splitIdx = rawTitle.lastIndexOf(' - ');
    const headline = (splitIdx > 0 ? rawTitle.slice(0, splitIdx) : rawTitle).trim();
    const source = (splitIdx > 0 ? rawTitle.slice(splitIdx + 3) : 'Google News').trim();

    return {
      severity: inferWarSeverity(headline),
      headline,
      source,
      publishedAt: formatWarNewsDate(publishedAt),
    };
  }).filter(n => n.headline);

  if (!news.length) throw new Error('No news items in RSS feed');
  return news.slice(0, 3);
}

function appendWarAlertRow(container, item) {
  const row = document.createElement('div');
  row.className = 'alert-row';

  const badge = document.createElement('span');
  badge.className = `severity-badge ${item.severity}`;
  badge.textContent = item.severity.toUpperCase();

  const textWrap = document.createElement('div');
  textWrap.className = 'alert-text';
  textWrap.textContent = item.headline;

  const source = document.createElement('div');
  source.className = 'source';
  source.textContent = `${item.publishedAt} · ${item.source}`;
  textWrap.appendChild(source);

  row.appendChild(badge);
  row.appendChild(textWrap);
  container.appendChild(row);
}

function appendWarAlertModal(container, item) {
  const card = document.createElement('div');
  card.className = `alert-item ${item.severity}`;

  const badge = document.createElement('span');
  badge.className = `severity-badge ${item.severity}`;
  badge.textContent = item.severity.toUpperCase();

  const body = document.createElement('div');
  body.className = 'alert-content';
  body.textContent = item.headline;

  const source = document.createElement('div');
  source.className = 'alert-source';
  source.textContent = `${item.publishedAt} · ${item.source}`;
  body.appendChild(source);

  card.appendChild(badge);
  card.appendChild(body);
  container.appendChild(card);
}

function renderWarNews() {
  const items = state.warNews.items.length ? state.warNews.items : WAR_NEWS_FALLBACK;
  const updatedText = state.warNews.updatedAt
    ? `Updated ${state.warNews.updatedAt} · Source: ${state.warNews.source}`
    : 'Using fallback conflict updates';

  const panelMeta = document.getElementById('warPanelMeta');
  const panelAlerts = document.getElementById('warPanelAlerts');
  if (panelMeta) panelMeta.textContent = updatedText;
  if (panelAlerts) {
    panelAlerts.innerHTML = '';
    items.forEach(item => appendWarAlertRow(panelAlerts, item));
  }

  const modalMeta = document.getElementById('warModalMeta');
  const modalAlerts = document.getElementById('warModalAlerts');
  if (modalMeta) modalMeta.textContent = updatedText;
  if (modalAlerts) {
    modalAlerts.innerHTML = '';
    items.forEach(item => appendWarAlertModal(modalAlerts, item));
  }
}

async function loadWarNews() {
  try {
    const latest = await fetchWarNews();
    state.warNews.items = latest;
    state.warNews.source = 'Google News RSS';
    state.warNews.updatedAt = formatWarNewsDate(new Date().toISOString());
    state.warNews.live = true;
    state.diagnostics.lastNewsRefreshAt = new Date().toISOString();
    state.diagnostics.lastNewsError = null;
  } catch {
    state.warNews.items = [];
    state.warNews.source = 'Seeded conflict updates';
    state.warNews.updatedAt = null;
    state.warNews.live = false;
    state.diagnostics.lastNewsError = 'using fallback feed';
  }
  renderWarNews();
  updateDiagnosticsStrip();
}

// Compute market value, cost basis, and unrealized G/L for all holdings in a portfolio
function calcPortfolioStats(portKey) {
  const port = PORTFOLIOS[portKey];
  const rows = port.holdings.map(h => {
    const price  = getPrice(h.ticker);
    const mktVal = price * h.shares;
    const cost   = h.costBasis * h.shares;
    const gl     = mktVal - cost;
    const glPct  = h.costBasis > 0 ? ((price - h.costBasis) / h.costBasis) * 100 : 0;
    return { ticker: h.ticker, name: h.name, shares: h.shares, costBasis: h.costBasis, alloc: h.alloc, price, mktVal, cost, gl, glPct };
  });
  const totalMkt   = rows.reduce((s, r) => s + r.mktVal, 0);
  const totalCost  = rows.reduce((s, r) => s + r.cost, 0);
  const totalGL    = totalMkt - totalCost;
  const totalGLPct = totalCost > 0 ? (totalGL / totalCost) * 100 : 0;
  return { rows, totalMkt, totalCost, totalGL, totalGLPct };
}

// Returns top 4 gainers and top 4 losers by today's day-change % across all unique holdings
function getTopMovers() {
  const seen = new Set();
  const movers = [];
  for (const port of Object.values(PORTFOLIOS)) {
    for (const h of port.holdings) {
      if (seen.has(h.ticker)) continue;
      seen.add(h.ticker);
      movers.push({ ticker: h.ticker, dayPct: getDayChangePct(h.ticker), price: getPrice(h.ticker) });
    }
  }
  movers.sort((a, b) => b.dayPct - a.dayPct);
  return { gainers: movers.slice(0, 4), losers: movers.slice(-4).reverse() };
}

// Returns the 6 holdings with the largest drift from target allocation
function getTopDrifts() {
  const drifts = [];
  for (const [portKey, port] of Object.entries(PORTFOLIOS)) {
    const { totalMkt } = calcPortfolioStats(portKey);
    if (totalMkt === 0) continue;
    for (const h of port.holdings) {
      const currentPct = (getPrice(h.ticker) * h.shares / totalMkt) * 100;
      const drift      = currentPct - h.alloc;
      drifts.push({ portName: port.name, ticker: h.ticker, targetPct: h.alloc, currentPct, drift });
    }
  }
  drifts.sort((a, b) => Math.abs(b.drift) - Math.abs(a.drift));
  return drifts.slice(0, 6);
}

// Returns estimated annual dividend income for a portfolio using DIV_INFO
function calcPortfolioAnnualDiv(portKey) {
  return PORTFOLIOS[portKey].holdings.reduce((sum, h) => {
    const info = DIV_INFO[h.ticker];
    return sum + (info && info.aps > 0 ? h.shares * info.aps : 0);
  }, 0);
}

function getPrice(ticker) {
  const ov = state.priceOverrides[ticker];
  if (ov?.price != null) return ov.price;
  const q = state.prices[ticker];
  return q ? q.price : (SEED[ticker]?.price ?? 0);
}
function getDayChangePct(ticker) {
  const ov = state.priceOverrides[ticker];
  if (ov?.price != null && ov?.prevClose != null && ov.prevClose > 0) {
    return ((ov.price - ov.prevClose) / ov.prevClose) * 100;
  }
  const q = state.prices[ticker];
  return q ? q.dayChangePct : (SEED[ticker]?.dayChangePct ?? 0);
}
function get90Return(ticker) {
  const q = state.prices[ticker];
  return q ? (q.return90 ?? SEED[ticker]?.return90 ?? 0) : (SEED[ticker]?.return90 ?? 0);
}
function getPriceSource(ticker) {
  if (state.priceOverrides[ticker]?.price != null) return 'manual';
  if (state.prices[ticker] && !state.prices[ticker].usedSeed) return 'live';
  return 'seed';
}

function getBenchSource(symbol) {
  if (state.bench[symbol] && !state.bench[symbol].usedSeed) return 'live';
  return 'seed';
}

function fmtDiagTime(value) {
  if (!value) return '--';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '--';
  return d.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }) + ' UTC';
}

function updateDiagnosticsStrip() {
  const el = document.getElementById('diagStrip');
  if (!el) return;

  const benchTotal = Object.keys(BENCHMARKS).length;
  const benchLive = Object.keys(BENCHMARKS)
    .reduce((sum, symbol) => sum + (getBenchSource(symbol) === 'live' ? 1 : 0), 0);

  const holdingsTotal = ALL_TICKERS.length;
  const holdingsLive = ALL_TICKERS
    .reduce((sum, ticker) => sum + (getPriceSource(ticker) === 'live' ? 1 : 0), 0);

  const newsStatus = state.warNews.live ? 'LIVE' : 'SEED';
  el.textContent = `Bench ${benchLive}/${benchTotal} · Holdings ${holdingsLive}/${holdingsTotal} · News ${newsStatus}`;

  const healthRatio = (benchLive + holdingsLive) / (benchTotal + holdingsTotal || 1);
  el.classList.remove('good', 'warn', 'bad');
  if (healthRatio >= 0.75 && state.warNews.live) el.classList.add('good');
  else if (healthRatio >= 0.35) el.classList.add('warn');
  else el.classList.add('bad');

  const marketAt = fmtDiagTime(state.diagnostics.lastMarketsRefreshAt);
  const newsAt = fmtDiagTime(state.diagnostics.lastNewsRefreshAt);
  const marketErr = state.diagnostics.lastMarketsError ? `\nMarket err: ${state.diagnostics.lastMarketsError}` : '';
  const newsErr = state.diagnostics.lastNewsError ? `\nNews err: ${state.diagnostics.lastNewsError}` : '';
  el.title = `Live diagnostics\nMarkets refresh: ${marketAt}\nNews refresh: ${newsAt}${marketErr}${newsErr}`;
}

function setHeaderButtonBusy(btn, busy) {
  if (!btn) return;
  btn.classList.toggle('busy', busy);
  btn.setAttribute('aria-busy', busy ? 'true' : 'false');
}

async function refreshMarketsNow() {
  const btn = document.getElementById('refreshMarketsBtn');
  setHeaderButtonBusy(btn, true);
  try {
    await loadBenchmarkPrices();
    await loadAllPrices();
    state.diagnostics.lastMarketsRefreshAt = new Date().toISOString();
    state.diagnostics.lastMarketsError = null;
    updateSnapshotTime();
    navigateTo(state.currentPage);
  } catch (err) {
    state.diagnostics.lastMarketsError = err?.message || 'refresh failed';
    updateDiagnosticsStrip();
  } finally {
    setHeaderButtonBusy(btn, false);
  }
}

async function refreshNewsNow() {
  const btn = document.getElementById('refreshNewsBtn');
  setHeaderButtonBusy(btn, true);
  try {
    await loadWarNews();
    state.diagnostics.lastNewsRefreshAt = new Date().toISOString();
    state.diagnostics.lastNewsError = null;
  } catch (err) {
    state.diagnostics.lastNewsError = err?.message || 'refresh failed';
    updateDiagnosticsStrip();
  } finally {
    setHeaderButtonBusy(btn, false);
  }
}

function calcPortfolio90Return(portfolioKey) {
  const port = PORTFOLIOS[portfolioKey];
  let weighted = 0;
  let allocSum = 0;
  port.holdings.forEach(h => {
    const alloc = h.alloc;
    if (alloc <= 0) return;
    const r = get90Return(h.ticker);
    weighted += r * alloc;
    allocSum += alloc;
  });
  return allocSum > 0 ? weighted / allocSum : 0;
}

function calcTodayPnL(portfolioKey) {
  const port = PORTFOLIOS[portfolioKey];
  let totalPnl = 0;
  let totalWeight = 0;
  port.holdings.forEach(h => {
    const alloc  = h.alloc / 100;
    const value  = port.accountValue * alloc;
    const pct    = getDayChangePct(h.ticker) / 100;
    totalPnl    += value * pct;
    totalWeight += alloc;
  });
  const weightedPct = (totalPnl / port.accountValue) * 100;
  return { pnl: totalPnl, pct: weightedPct };
}

// Generate 90-day labels (weekdays approx)
function gen90DayLabels() {
  const labels = [];
  const d = new Date('2025-12-17');
  const end = new Date('2026-03-26');
  while (d <= end) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) {
      labels.push(d.toLocaleDateString('en-US', { month:'short', day:'numeric' }));
    }
    d.setDate(d.getDate() + 1);
  }
  return labels;
}

function genSeries(startVal, returnPct, points, volatility = 0.008) {
  const series = [100];
  const dailyReturn = (returnPct / 100) / points;
  for (let i = 1; i < points; i++) {
    const noise = (Math.random() - 0.5) * 2 * volatility * 100;
    const prev = series[i - 1];
    series.push(Math.max(90, prev + prev * dailyReturn + noise));
  }
  // Pin endpoint
  series[series.length - 1] = 100 + returnPct;
  return series;
}

// ─── CHART UTILITIES ──────────────────────────────────────────────────────────
Chart.defaults.color = '#8891aa';
Chart.defaults.borderColor = '#252a3a';
Chart.defaults.font.family = "'Inter', 'Segoe UI', system-ui, sans-serif";

function destroyChart(id) {
  if (state.charts[id]) {
    state.charts[id].destroy();
    delete state.charts[id];
  }
}

function buildNormChart(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  const labels = gen90DayLabels();
  const N = labels.length;

  const tradR   = calcPortfolio90Return('traditional');
  const rollR   = calcPortfolio90Return('rollover');
  const rothR   = calcPortfolio90Return('roth');
  // Use curated 90-day reference returns for the benchmark chart lines so the
  // Y-axis stays consistent regardless of where live prices happen to be today.
  // Live prices are shown on the benchmark cards; the chart shows the window trend.
  const sp500R  = -2.22;
  const goldR   =  4.18;
  const dowR    = -3.28;

  // Deterministic seeded series using fixed seed per portfolio
  const seeded = (ret, seed) => {
    const arr = [100];
    const step = (ret / 100) / N;
    for (let i = 1; i < N; i++) {
      const noise = (Math.sin(i * seed) * 0.5);
      arr.push(arr[i-1] + arr[i-1] * step + noise);
    }
    arr[arr.length-1] = 100 + ret;
    return arr;
  };

  const datasets = [
    { label: 'Traditional IRA', data: seeded(tradR,   2.3), borderColor: '#4a9eff', borderWidth: 2, pointRadius: 0, tension: .4 },
    { label: 'Rollover IRA',    data: seeded(rollR,   3.7), borderColor: '#2ecc71', borderWidth: 2, pointRadius: 0, tension: .4 },
    { label: 'Roth IRA',        data: seeded(rothR,   5.1), borderColor: '#f39c12', borderWidth: 2, pointRadius: 0, tension: .4 },
    { label: 'S&P 500',         data: seeded(sp500R,  7.9), borderColor: '#9b59b6', borderWidth: 1.5, borderDash:[4,3], pointRadius: 0, tension: .4 },
    { label: 'Gold',            data: seeded(goldR,  11.3), borderColor: '#f1c40f', borderWidth: 1.5, borderDash:[4,3], pointRadius: 0, tension: .4 },
    { label: 'Dow',             data: seeded(dowR,   13.7), borderColor: '#e74c3c', borderWidth: 1.5, borderDash:[4,3], pointRadius: 0, tension: .4 },
  ];

  state.charts[canvasId] = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 }, padding: 12 } },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        x: { grid: { color: '#1e2333' }, ticks: { maxTicksLimit: 8, font: { size: 10 } } },
        y: { grid: { color: '#1e2333' }, ticks: { font: { size: 10 }, callback: v => v.toFixed(0) } }
      }
    }
  });
}

function buildDonutChart(canvasId, holdings) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  const filtered = holdings.filter(h => h.alloc > 0);
  const COLORS = ['#4a9eff','#2ecc71','#f39c12','#e74c3c','#9b59b6','#f1c40f','#1abc9c','#e67e22'];
  state.charts[canvasId] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: filtered.map(h => h.ticker),
      datasets: [{ data: filtered.map(h => h.alloc), backgroundColor: COLORS, borderWidth: 2, borderColor: '#181c26', hoverOffset: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      cutout: '65%',
      plugins: {
        legend: { position: 'right', labels: { boxWidth: 10, font: { size: 11 }, padding: 8 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } }
      }
    }
  });
}

function buildIRALineChart(canvasId, portfolio) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  const labels = gen90DayLabels();
  const N = labels.length;
  const COLORS = ['#4a9eff','#2ecc71','#f39c12','#e74c3c','#9b59b6','#f1c40f','#1abc9c','#e67e22'];
  const datasets = portfolio.holdings.filter(h => h.alloc > 0).map((h, i) => ({
    label: h.ticker,
    data: (() => {
      const r = get90Return(h.ticker);
      const arr=[100]; const step=(r/100)/N;
      for(let j=1;j<N;j++) { const noise=(Math.sin(j*(i+2.1))*0.4); arr.push(arr[j-1]+arr[j-1]*step+noise); }
      arr[arr.length-1]=100+r; return arr;
    })(),
    borderColor: COLORS[i % COLORS.length],
    borderWidth: 1.5, pointRadius: 0, tension: .4
  }));
  state.charts[canvasId] = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 10, font: { size: 10 }, padding: 8 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}` } }
      },
      scales: {
        x: { grid: { color: '#1e2333' }, ticks: { maxTicksLimit: 6, font: { size: 9 } } },
        y: { grid: { color: '#1e2333' }, ticks: { font: { size: 9 }, callback: v => v.toFixed(0) } }
      }
    }
  });
}

// ─── PAGE RENDERERS ───────────────────────────────────────────────────────────
function renderOverview() {
  const trad = PORTFOLIOS.traditional;
  const roll = PORTFOLIOS.rollover;
  const roth = PORTFOLIOS.roth;

  const tradR = calcPortfolio90Return('traditional');
  const rollR = calcPortfolio90Return('rollover');
  const rothR = calcPortfolio90Return('roth');

  const sp500  = state.bench['^GSPC'] ?? BENCH_SEED['^GSPC'];
  const dow    = state.bench['^DJI']  ?? BENCH_SEED['^DJI'];
  const nasdaq = state.bench['^IXIC'] ?? BENCH_SEED['^IXIC'];
  const gold   = state.bench['GC=F']  ?? BENCH_SEED['GC=F'];
  const dowSource = getBenchSource('^DJI');
  const sp500Source = getBenchSource('^GSPC');
  const nasdaqSource = getBenchSource('^IXIC');
  const goldSource = getBenchSource('GC=F');

  const sp500R90 = -2.22;
  const dowR90   = -3.28;
  const goldR90  =  4.18;

  const allBeating = tradR > sp500R90 && rollR > sp500R90 && rothR > sp500R90;

  // Net worth across all portfolios
  const portStats = {};
  for (const k of Object.keys(PORTFOLIOS)) portStats[k] = calcPortfolioStats(k);
  const netWorth      = Object.values(portStats).reduce((s, p) => s + p.totalMkt,   0);
  const totalCostAll  = Object.values(portStats).reduce((s, p) => s + p.totalCost,  0);
  const totalGLAll    = netWorth - totalCostAll;
  const totalGLPctAll = totalCostAll > 0 ? (totalGLAll / totalCostAll) * 100 : 0;

  // Top movers + drifts
  const { gainers, losers } = getTopMovers();
  const topDrifts = getTopDrifts();

  const tradPnL = calcTodayPnL('traditional');
  const rollPnL = calcTodayPnL('rollover');
  const rothPnL = calcTodayPnL('roth');
  const invPnL  = calcTodayPnL('investments');
  const incPnL  = calcTodayPnL('income');

  // Drawdown data (static snapshot consistent with screenshots)
  const drawdowns = [
    { name: 'Traditional IRA', page: 'traditional', peak: 104.57, current: 102.13, dd: -2.33, impact: -15679 },
    { name: 'Rollover IRA',    page: 'rollover',    peak: 104.60, current: 102.36, dd: -2.14, impact: -4793  },
    { name: 'Roth IRA',        page: 'roth',        peak: 108.29, current: 104.51, dd: -3.49, impact: -7371  },
    { name: 'Investments',     page: 'investments', peak: 103.03, current: 100.66, dd: -2.30, impact: -3281  },
    { name: 'Income Strategy', page: 'income',      peak: 102.98, current: 100.65, dd: -2.26, impact: -3211  },
    { name: 'S&P 500',         page: null,          peak: null,   current: null,   dd: -5.50, impact: null   },
    { name: 'Gold',            page: null,          peak: null,   current: null,   dd: -9.93, impact: null   },
    { name: 'Dow',             page: null,          peak: null,   current: null,   dd: -7.38, impact: null   },
  ];

  const wbars = [
    { label: 'TRAD IRA', val: tradR },
    { label: 'ROLLOVER', val: rollR },
    { label: 'ROTH IRA', val: rothR },
    { label: 'S&P 500',  val: sp500R90 },
    { label: 'DOW',      val: dowR90 },
    { label: 'GOLD',     val: goldR90 },
    { label: 'INVEST',   val: calcPortfolio90Return('investments') },
    { label: 'INCOME',   val: calcPortfolio90Return('income') },
  ];
  const maxAbs = Math.max(...wbars.map(b => Math.abs(b.val)));
  const barWidthPct = (val) => Math.max(5, (Math.abs(val) / maxAbs) * 90);

  document.getElementById('mainContent').innerHTML = `
    <div class="page-header">
      <h1>Portfolio Overview</h1>
      <div class="subtitle">All Portfolios · Live prices as of ${todayLabel()} · 90-day performance</div>
    </div>

    <!-- Net Worth Banner -->
    <div class="nw-banner">
      <div class="nw-summary">
        <div class="nw-item">
          <div class="nw-label">TOTAL NET WORTH</div>
          <div class="nw-value gold">${fmt$(netWorth)}</div>
        </div>
        <div class="nw-divider"></div>
        <div class="nw-item">
          <div class="nw-label">TOTAL COST BASIS</div>
          <div class="nw-value">${fmt$(totalCostAll)}</div>
        </div>
        <div class="nw-divider"></div>
        <div class="nw-item">
          <div class="nw-label">UNREALIZED G/L</div>
          <div class="nw-value ${totalGLAll >= 0 ? 'green' : 'red'}">${totalGLAll >= 0 ? '+' : ''}${fmt$(totalGLAll)}</div>
        </div>
        <div class="nw-divider"></div>
        <div class="nw-item">
          <div class="nw-label">TOTAL RETURN</div>
          <div class="nw-value ${totalGLPctAll >= 0 ? 'green' : 'red'}">${totalGLPctAll >= 0 ? '+' : ''}${totalGLPctAll.toFixed(2)}%</div>
        </div>
        <div class="nw-divider"></div>
        <div class="nw-item">
          <div class="nw-label">EST. ANNUAL DIVIDENDS</div>
          <div class="nw-value" style="color:var(--accent-blue)">${fmt$(Object.keys(PORTFOLIOS).reduce((s,k) => s + calcPortfolioAnnualDiv(k), 0))}</div>
        </div>
      </div>
      <div class="nw-accounts">
        ${Object.entries(PORTFOLIOS).map(([k, p]) => `
          <div class="nw-acct" onclick="navigateTo('${k}')">
            <div class="nw-acct-name">${p.name}</div>
            <div class="nw-acct-val">${fmt$(portStats[k].totalMkt)}</div>
            <div class="nw-acct-gl ${portStats[k].totalGL >= 0 ? 'change-up' : 'change-down'}">${portStats[k].totalGL >= 0 ? '+' : ''}${fmt$(portStats[k].totalGL)}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Iran War Panel -->
    <div class="war-panel">
      <div class="war-panel-header">
        <span class="war-icon">⚠</span>
        <span class="war-title">OPERATION EPIC FURY — Active War Alert</span>
      </div>
      <div class="war-meta" id="warPanelMeta">Loading latest conflict headlines...</div>
      <div class="war-alerts" id="warPanelAlerts"></div>
    </div>

    ${allBeating ? '<div class="outperform-banner">✓ All portfolios outperforming benchmarks over 90 days</div>' : ''}

    <!-- Benchmark KPIs -->
    <div class="benchmark-grid">
      <div class="bench-card">
        <div class="bench-head-row">
          <div class="bench-label">DOW JONES</div>
          <span class="bench-source-badge source-${dowSource}">${dowSource.toUpperCase()}</span>
        </div>
        <div class="bench-price" id="dowPrice">${fmtN(dow.price)}</div>
        <div class="bench-change ${dow.dayChange < 0 ? 'down' : 'up'}">
          ${dow.dayChange < 0 ? '▼' : '▲'} ${Math.abs(dow.dayChange).toFixed(2)} (${Math.abs(dow.dayChangePct).toFixed(2)}%) today
        </div>
        <div class="bench-range">52W: ${BENCHMARKS['^DJI'].range52}</div>
      </div>
      <div class="bench-card">
        <div class="bench-head-row">
          <div class="bench-label">S&P 500</div>
          <span class="bench-source-badge source-${sp500Source}">${sp500Source.toUpperCase()}</span>
        </div>
        <div class="bench-price" id="sp500Price">${fmtN(sp500.price)}</div>
        <div class="bench-change ${sp500.dayChange < 0 ? 'down' : 'up'}">
          ${sp500.dayChange < 0 ? '▼' : '▲'} ${Math.abs(sp500.dayChange).toFixed(2)} (${Math.abs(sp500.dayChangePct).toFixed(2)}%) today
        </div>
        <div class="bench-range">52W: ${BENCHMARKS['^GSPC'].range52}</div>
      </div>
      <div class="bench-card">
        <div class="bench-head-row">
          <div class="bench-label">NASDAQ</div>
          <span class="bench-source-badge source-${nasdaqSource}">${nasdaqSource.toUpperCase()}</span>
        </div>
        <div class="bench-price" id="nasdaqPrice">${fmtN(nasdaq.price)}</div>
        <div class="bench-change ${nasdaq.dayChange < 0 ? 'down' : 'up'}">
          ${nasdaq.dayChange < 0 ? '▼' : '▲'} ${Math.abs(nasdaq.dayChange).toFixed(2)} (${Math.abs(nasdaq.dayChangePct).toFixed(2)}%) today
        </div>
        <div class="bench-range">52W: ${BENCHMARKS['^IXIC'].range52}</div>
      </div>
      <div class="bench-card">
        <div class="bench-head-row">
          <div class="bench-label">GOLD / OZ</div>
          <span class="bench-source-badge source-${goldSource}">${goldSource.toUpperCase()}</span>
        </div>
        <div class="bench-price" id="goldPrice">${fmtN(gold.price)}</div>
        <div class="bench-change ${gold.dayChange < 0 ? 'down' : 'up'}">
          ${gold.dayChange < 0 ? '▼' : '▲'} ${Math.abs(gold.dayChange).toFixed(2)} (${Math.abs(gold.dayChangePct).toFixed(2)}%) today
        </div>
        <div class="bench-range">52W: ${BENCHMARKS['GC=F'].range52}</div>
      </div>
    </div>

    <!-- Charts -->
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">90-Day Normalized Performance</div>
        <div class="chart-subtitle">${window90Label()} · Base = 100</div>
        <div class="chart-wrap"><canvas id="normChart"></canvas></div>
      </div>
      <div class="chart-card">
        <div class="chart-title">90-Day Weighted Portfolio Return</div>
        <div class="chart-subtitle">${window90Label()} · Allocation-weighted</div>
        <div class="weighted-bars">
          ${wbars.map(b => `
            <div class="wbar-row">
              <div class="wbar-label">${b.label}</div>
              <div class="wbar-track">
                <div class="wbar-fill ${b.val >= 0 ? 'green' : 'red'}" style="width:${barWidthPct(b.val)}%">
                  ${fmtPct(b.val)}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Today's P&L -->
    <div class="chart-title" style="margin-bottom:.75rem">Today's P&amp;L — Estimated</div>
    <div style="font-size:.72rem;color:var(--text-secondary);margin-bottom:.9rem">Based on daily % change × allocation weight × account value</div>
    <div class="pnl-grid">
      ${[
        ['TRADITIONAL IRA', tradPnL, trad.accountValue],
        ['ROLLOVER IRA',    rollPnL, roll.accountValue],
        ['ROTH IRA',        rothPnL, roth.accountValue],
        ['INVESTMENTS',     invPnL,  PORTFOLIOS.investments.accountValue],
        ['INCOME STRATEGY', incPnL,  PORTFOLIOS.income.accountValue],
      ].map(([label, pnl, val]) => `
        <div class="pnl-card">
          <div class="pnl-label">${label}</div>
          <div class="pnl-value ${pnl.pnl >= 0 ? 'gain' : 'loss'}">${pnl.pnl >= 0 ? '+' : ''}${fmt$(pnl.pnl)}</div>
          <div class="pnl-sub">${fmtPct(pnl.pct)} weighted day change</div>
          <div class="pnl-basis">Based on ${fmt$(val)} account value</div>
        </div>
      `).join('')}
    </div>

    <!-- Top Movers + Largest Drifts -->
    <div class="movers-drifts-row">
      <div class="movers-card">
        <div class="chart-title" style="margin-bottom:.75rem">Today's Top Movers</div>
        <div class="movers-cols">
          <div class="movers-col">
            <div class="movers-col-label gain">&#9650; GAINERS</div>
            ${gainers.map(m => `
              <div class="mover-row">
                <span class="ticker-badge">${m.ticker}</span>
                <span class="mover-price">${fmt$(m.price)}</span>
                <span class="change-up mover-pct">${fmtPct(m.dayPct)}</span>
              </div>
            `).join('')}
          </div>
          <div class="movers-col">
            <div class="movers-col-label loss">&#9660; LOSERS</div>
            ${losers.map(m => `
              <div class="mover-row">
                <span class="ticker-badge">${m.ticker}</span>
                <span class="mover-price">${fmt$(m.price)}</span>
                <span class="change-down mover-pct">${fmtPct(m.dayPct)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="drifts-card">
        <div class="chart-title" style="margin-bottom:.25rem">Largest Allocation Drifts</div>
        <div class="drifts-sub">Top holdings furthest from target — review at next rebalance</div>
        <table class="drifts-table">
          <thead><tr><th>TICKER</th><th>PORTFOLIO</th><th>TARGET</th><th>CURRENT</th><th>DRIFT</th></tr></thead>
          <tbody>
            ${topDrifts.map(d => `<tr>
              <td><span class="ticker-badge">${d.ticker}</span></td>
              <td class="drift-port-label">${d.portName}</td>
              <td>${d.targetPct.toFixed(1)}%</td>
              <td>${d.currentPct.toFixed(1)}%</td>
              <td class="${d.drift < 0 ? 'change-down' : 'change-up'}">${d.drift >= 0 ? '+' : ''}${d.drift.toFixed(2)}%</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Drawdown -->
    <div class="drawdown-card">
      <div class="drawdown-card-header">
        <h3>Drawdown from 90-Day Peak</h3>
        <div class="sub">Current distance from highest point in 90-day window</div>
      </div>
      <table class="drawdown-table">
        <thead><tr>
          <th>PORTFOLIO</th><th>90D PEAK</th><th>CURRENT</th><th>DRAWDOWN</th><th>$ IMPACT</th>
        </tr></thead>
        <tbody>
          ${drawdowns.map(d => `<tr>
            <td>${d.page ? `<span class="port-link" data-page="${d.page}">${d.name}</span>` : d.name}</td>
            <td>${d.peak ?? '—'}</td>
            <td>${d.current ?? '—'}</td>
            <td class="change-down">${fmtPct(d.dd)}</td>
            <td>${d.impact != null ? `<span class="change-down">${signedDollar(d.impact)}</span>` : '—'}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Attach drawdown nav clicks
  document.querySelectorAll('.port-link[data-page]').forEach(el => {
    el.addEventListener('click', () => navigateTo(el.dataset.page));
  });

  // Build charts after DOM ready
  requestAnimationFrame(() => buildNormChart('normChart'));
}

function renderPortfolioEditor() {
  const portOptions = Object.entries(PORTFOLIOS)
    .map(([key, p]) => `<option value="${key}" ${key === state.editorPortfolioKey ? 'selected' : ''}>${p.name}</option>`)
    .join('');
  const current = PORTFOLIOS[state.editorPortfolioKey];
  const lastUpdated = window.PORTFOLIO_USER_DATA?._meta?.lastUpdated ?? 'never';

  document.getElementById('mainContent').innerHTML = `
    <div class="page-header">
      <h1>Edit Portfolio Data</h1>
      <div class="subtitle">Update holdings, shares, cost basis, and optional manual price overrides.
        Changes are in memory until you <strong>Export portfolio-data.js</strong> and replace the file.
        Last file update: <span class="text-muted">${lastUpdated}</span>
      </div>
    </div>

    <div class="holdings-card">
      <div class="holdings-card-header editor-toolbar">
        <div class="editor-toolbar-row">
          <label for="editorPortfolioSelect">Portfolio</label>
          <select id="editorPortfolioSelect" class="editor-select">${portOptions}</select>
        </div>
        <div class="editor-toolbar-row">
          <label for="editorAccountValue">Account Value ($)</label>
          <input id="editorAccountValue" class="editor-input editor-acct" type="number" min="0" step="0.01" value="${current.accountValue}" />
        </div>
      </div>

      <div class="holdings-tbl-wrap">
        <table class="holdings-table editor-table">
          <thead>
            <tr>
              <th>TICKER</th>
              <th>NAME</th>
              <th>ALLOC %</th>
              <th>SHARES</th>
              <th>COST BASIS</th>
              <th title="Optional: override the live market price for this ticker">MKT PRICE</th>
              <th title="Optional: override the previous close (needed for Today P&amp;L with manual price)">PREV CLOSE</th>
              <th>SOURCE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody id="editorHoldingsBody"></tbody>
        </table>
      </div>

      <div class="editor-footer">
        <div class="editor-summary">Allocation Total: <span id="editorAllocTotal">0.00%</span> (target 100%)</div>
        <div class="editor-actions">
          <button id="editorAddRow" class="calc-btn" type="button">+ Add Holding</button>
          <button id="editorSave" class="calc-btn" type="button">Save Changes</button>
          <button id="editorClearOverrideOne" class="editor-secondary" type="button" title="Remove manual price overrides for this portfolio's tickers">Clear Overrides (Portfolio)</button>
          <button id="editorClearOverrideAll" class="editor-secondary" type="button" title="Remove all manual price overrides">Clear All Overrides</button>
          <button id="editorResetOne" class="editor-secondary" type="button">Reset Portfolio</button>
          <button id="editorResetAll" class="editor-secondary" type="button">Reset All</button>
        </div>
        <div class="editor-actions editor-file-actions">
          <button id="editorExportJS" class="calc-btn editor-export-btn" type="button" title="Download an updated portfolio-data.js for portable backup">&#8595; Export portfolio-data.js</button>
          <button id="editorExportJSON" class="editor-secondary" type="button" title="Download a JSON backup you can import on any device">&#8595; Export JSON backup</button>
          <label class="editor-import-label" title="Import a previously exported .js or .json file">
            &#8593; Import file&hellip;
            <input id="editorImportFile" type="file" accept=".js,.json" />
          </label>
        </div>
      </div>
      <div id="editorStatus" class="editor-status">Ready. <span class="editor-persist-hint">Tip: saves now persist in this browser, and export remains available for a portable backup.</span></div>
    </div>
  `;

  renderEditorRows(state.editorPortfolioKey);

  document.getElementById('editorPortfolioSelect').addEventListener('change', e => {
    state.editorPortfolioKey = e.target.value;
    renderPortfolioEditor();
  });

  document.getElementById('editorAddRow').addEventListener('click', () => {
    const tbody = document.getElementById('editorHoldingsBody');
    tbody.insertAdjacentHTML('beforeend', editorHoldingRowHTML({ alloc: 0, shares: 0, costBasis: 0 }));
    updateEditorTotals();
    const count = document.querySelectorAll('#editorHoldingsBody tr').length;
    setEditorStatus(`Added new holding row. ${count} rows in this portfolio.`, true);
  });

  document.getElementById('editorHoldingsBody').addEventListener('click', e => {
    if (!e.target.classList.contains('editor-remove')) return;
    e.target.closest('tr')?.remove();
    updateEditorTotals();
    commitEditorPortfolioChanges({ statusPrefix: 'Removed row and saved', refreshPrices: true });
  });

  document.getElementById('editorHoldingsBody').addEventListener('input', updateEditorTotals);

  document.getElementById('editorSave').addEventListener('click', async () => {
    setEditorStatus('Save started… validating rows.', true);
    await commitEditorPortfolioChanges({ statusPrefix: 'Saved', refreshPrices: true });
  });

  document.getElementById('editorClearOverrideOne').addEventListener('click', () => {
    setEditorStatus('Clearing manual overrides for selected portfolio…', true);
    const portKey = state.editorPortfolioKey;
    let cleared = 0;
    PORTFOLIOS[portKey].holdings.forEach(h => {
      if (state.priceOverrides[h.ticker]) cleared += 1;
    });
    PORTFOLIOS[portKey].holdings.forEach(h => delete state.priceOverrides[h.ticker]);
    savePortfolioData();
    renderEditorRows(portKey);
    setEditorStatus(`Cleared ${cleared} manual override(s) for ${PORTFOLIOS[portKey].name}.`, true);
  });

  document.getElementById('editorClearOverrideAll').addEventListener('click', () => {
    setEditorStatus('Clearing all manual overrides…', true);
    const cleared = Object.keys(state.priceOverrides).length;
    state.priceOverrides = {};
    savePortfolioData();
    renderEditorRows(state.editorPortfolioKey);
    setEditorStatus(`Cleared all manual overrides (${cleared} ticker${cleared === 1 ? '' : 's'}).`, true);
  });

  document.getElementById('editorResetOne').addEventListener('click', () => {
    setEditorStatus('Resetting selected portfolio to defaults…', true);
    resetPortfolioData(state.editorPortfolioKey);
    renderPortfolioEditor();
    setEditorStatus('Selected portfolio reset to defaults.', true);
  });

  document.getElementById('editorResetAll').addEventListener('click', () => {
    setEditorStatus('Resetting all portfolios to defaults…', true);
    resetPortfolioData();
    renderPortfolioEditor();
    setEditorStatus('All portfolios reset to defaults.', true);
  });

  document.getElementById('editorExportJS').addEventListener('click', () => {
    setEditorStatus('Export started: building portfolio-data.js…', true);
    exportPortfolioJS();
    const holdingsTotal = Object.values(PORTFOLIOS).reduce((sum, p) => sum + p.holdings.length, 0);
    setEditorStatus(`Export complete: portfolio-data.js downloaded (${holdingsTotal} holdings). Use it as a portable backup or replace your data file.`, true);
  });

  document.getElementById('editorExportJSON').addEventListener('click', () => {
    setEditorStatus('Export started: building JSON backup…', true);
    exportPortfolioJSON();
    setEditorStatus('Export complete: portfolio-data.json downloaded.', true);
  });

  document.getElementById('editorImportFile').addEventListener('change', async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditorStatus(`Import started: reading ${file.name}…`, true);
    try {
      setEditorStatus(`Import parsing: validating ${file.name}…`, true);
      await importPortfolioFile(file);
      const holdingsTotal = Object.values(PORTFOLIOS).reduce((sum, p) => sum + p.holdings.length, 0);
      const overrideTotal = Object.keys(state.priceOverrides).length;
      renderPortfolioEditor();
      setEditorStatus(`Import complete: ${file.name} loaded (${holdingsTotal} holdings, ${overrideTotal} manual override${overrideTotal === 1 ? '' : 's'}).`, true);
    } catch (err) {
      setEditorStatus(`Import failed: ${err.message}`, false);
    }
    e.target.value = '';
  });
}

function renderIRAPage(portKey) {
  const port  = PORTFOLIOS[portKey];
  const r90   = calcPortfolio90Return(portKey);
  const pnl   = calcTodayPnL(portKey);
  const stats = calcPortfolioStats(portKey);

  document.getElementById('mainContent').innerHTML = `
    <div class="page-header">
      <h1>${port.name}</h1>
      <div class="subtitle">Live prices · 90-day window ${window90Label()}</div>
    </div>

    <div class="ira-stats-row">
      <div class="stat-card">
        <div class="stat-label">ACCOUNT VALUE</div>
        <div class="stat-value">${fmt$(port.accountValue)}</div>
        <div class="stat-sub">as of ${todayLabel()}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">90-DAY RETURN</div>
        <div class="stat-value ${r90 >= 0 ? 'green' : 'red'}">${fmtPct(r90)}</div>
        <div class="stat-sub">vs S&P -2.22%</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">TODAY'S P&amp;L</div>
        <div class="stat-value ${pnl.pnl >= 0 ? 'green' : 'red'}">${pnl.pnl >= 0 ? '+' : ''}${fmt$(pnl.pnl)}</div>
        <div class="stat-sub">${fmtPct(pnl.pct)} weighted</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">UNREALIZED G/L</div>
        <div class="stat-value ${stats.totalGL >= 0 ? 'green' : 'red'}">${stats.totalGL >= 0 ? '+' : ''}${fmt$(stats.totalGL)}</div>
        <div class="stat-sub">${stats.totalGL >= 0 ? '+' : ''}${stats.totalGLPct.toFixed(2)}% on cost basis</div>
      </div>
    </div>

    ${portKey === 'traditional' ? `
    <div class="info-banner warning">
      <span>&#128203;</span>
      <div><strong>RMD Reminder:</strong> Required Minimum Distributions begin at age 73 under SECURE 2.0. All withdrawals from this pre-tax account are taxed as ordinary income. Consult your tax advisor for 2026 planning.</div>
    </div>` : ''}

    <div class="ira-charts-row">
      <div class="chart-card">
        <div class="chart-title">90-Day Normalized Performance — ${port.name}</div>
        <div class="chart-subtitle">Base = 100 · ${window90Label()}</div>
        <div class="chart-wrap"><canvas id="iraLineChart" style="max-height:220px"></canvas></div>
      </div>
      <div class="chart-card">
        <div class="chart-title">Allocation</div>
        <div class="chart-subtitle">Current target weights</div>
        <div class="chart-wrap"><canvas id="iraDonut" style="max-height:220px"></canvas></div>
      </div>
    </div>

    <!-- Holdings Table -->
    <div class="holdings-card">
      <div class="holdings-card-header" style="display:flex;align-items:center;justify-content:space-between">
        <h3>Holdings &mdash; ${port.holdings.length} positions</h3>
        <span style="font-size:.74rem;color:var(--text-muted)">Cost basis: ${fmt$(stats.totalCost)}</span>
      </div>
      <div class="holdings-tbl-wrap">
      <table class="holdings-table">
        <thead><tr>
          <th>TICKER</th><th>NAME</th><th>SHARES</th><th>PRICE</th><th>DAY</th>
          <th>90D RET</th><th>VALUE</th><th>UNREAL G/L</th><th>ALLOC</th>
        </tr></thead>
        <tbody>
          ${port.holdings.map(h => {
            const price   = getPrice(h.ticker);
            const day     = getDayChangePct(h.ticker);
            const r90h    = get90Return(h.ticker);
            const mktVal  = price * h.shares;
            const costVal = h.costBasis * h.shares;
            const gl      = mktVal - costVal;
            const glPct   = h.costBasis > 0 ? ((price - h.costBasis) / h.costBasis) * 100 : 0;
            const glClass = gl >= 0 ? 'change-up' : 'change-down';
            const allocW  = Math.max(4, (h.alloc / 41) * 70);
            return `<tr>
              <td><span class="ticker-badge">${h.ticker}</span></td>
              <td class="holding-name">${h.name}</td>
              <td>${h.shares.toLocaleString('en-US',{maximumFractionDigits:3})}</td>
              <td>${fmt$(price)}</td>
              <td class="${pColor(day)}">${fmtPct(day)}</td>
              <td class="${pColor(r90h)}">${fmtPct(r90h)}</td>
              <td>${fmt$(mktVal)}</td>
              <td class="${glClass}">${gl >= 0 ? '+' : ''}${fmt$(gl)}<br><span style="font-size:.67rem;opacity:.8">${gl >= 0 ? '+' : ''}${glPct.toFixed(2)}%</span></td>
              <td>
                <div class="alloc-bar-cell">
                  <div class="alloc-mini" style="width:${allocW}px"></div>
                  ${h.alloc}%
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    buildIRALineChart('iraLineChart', port);
    buildDonutChart('iraDonut', port.holdings);
  });
}

function renderRothIRA() {
  const port = PORTFOLIOS.roth;
  const r90  = calcPortfolio90Return('roth');
  const pnl  = calcTodayPnL('roth');
  const stats = calcPortfolioStats('roth');

  document.getElementById('mainContent').innerHTML = `
    <div class="page-header">
      <h1>Roth IRA</h1>
      <div class="subtitle">Live prices · 90-day window ${window90Label()}</div>
    </div>

    <div class="outperform-banner" style="border-color:rgba(74,158,255,.35);background:rgba(74,158,255,.07);color:var(--accent-blue)">
      📅 Due for review &amp; rebalancing on <strong>June 15, 2026</strong> — same cycle as all portfolios
    </div>

    <div class="ira-stats-row">
      <div class="stat-card">
        <div class="stat-label">ACCOUNT VALUE</div>
        <div class="stat-value">${fmt$(port.accountValue)}</div>
        <div class="stat-sub">as of ${todayLabel()}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">90-DAY RETURN</div>
        <div class="stat-value ${r90 >= 0 ? 'green' : 'red'}">${fmtPct(r90)}</div>
        <div class="stat-sub">vs S&P -2.22%</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">TODAY'S P&amp;L</div>
        <div class="stat-value ${pnl.pnl >= 0 ? 'green' : 'red'}">${pnl.pnl >= 0 ? '+' : ''}${fmt$(pnl.pnl)}</div>
        <div class="stat-sub">${fmtPct(pnl.pct)} weighted</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">UNREALIZED G/L</div>
        <div class="stat-value ${stats.totalGL >= 0 ? 'green' : 'red'}">${stats.totalGL >= 0 ? '+' : ''}${fmt$(stats.totalGL)}</div>
        <div class="stat-sub">${stats.totalGL >= 0 ? '+' : ''}${stats.totalGLPct.toFixed(2)}% on cost basis</div>
      </div>
    </div>

    <div class="outperform-banner" style="border-color:rgba(74,158,255,.35);background:rgba(74,158,255,.07);color:var(--accent-blue)">
      &#128197; Due for review &amp; rebalancing on <strong>June 15, 2026</strong> — same cycle as all portfolios &nbsp;·&nbsp; <em>2026 Roth contribution limit: $7,000 ($8,000 if age 50+)</em>
    </div>

    <div class="ira-charts-row">
      <div class="chart-card">
        <div class="chart-title">90-Day Normalized Performance — Roth IRA</div>
        <div class="chart-subtitle">Base = 100 · ${window90Label()}</div>
        <div class="chart-wrap"><canvas id="rothLineChart" style="max-height:220px"></canvas></div>
      </div>
      <div class="chart-card">
        <div class="chart-title">Allocation</div>
        <div class="chart-subtitle">Current target weights</div>
        <div class="chart-wrap"><canvas id="rothDonut" style="max-height:220px"></canvas></div>
      </div>
    </div>

    <div class="holdings-card">
      <div class="holdings-card-header" style="display:flex;align-items:center;justify-content:space-between">
        <h3>Holdings &mdash; ${port.holdings.length} positions</h3>
        <span style="font-size:.74rem;color:var(--text-muted)">Cost basis: ${fmt$(stats.totalCost)}</span>
      </div>
      <div class="holdings-tbl-wrap">
      <table class="holdings-table">
        <thead><tr>
          <th>TICKER</th><th>NAME</th><th>SHARES</th><th>PRICE</th><th>DAY</th>
          <th>90D RET</th><th>VALUE</th><th>UNREAL G/L</th><th>ALLOC</th>
        </tr></thead>
        <tbody>
          ${port.holdings.map(h => {
            const price   = getPrice(h.ticker);
            const day     = getDayChangePct(h.ticker);
            const r90h    = get90Return(h.ticker);
            const mktVal  = price * h.shares;
            const costVal = h.costBasis * h.shares;
            const gl      = mktVal - costVal;
            const glPct   = h.costBasis > 0 ? ((price - h.costBasis) / h.costBasis) * 100 : 0;
            const glClass = gl >= 0 ? 'change-up' : 'change-down';
            const allocW  = Math.max(4, (h.alloc / 41) * 70);
            return `<tr>
              <td><span class="ticker-badge">${h.ticker}</span></td>
              <td class="holding-name">${h.name}</td>
              <td>${h.shares.toLocaleString('en-US',{maximumFractionDigits:3})}</td>
              <td>${fmt$(price)}</td>
              <td class="${pColor(day)}">${fmtPct(day)}</td>
              <td class="${pColor(r90h)}">${fmtPct(r90h)}</td>
              <td>${fmt$(mktVal)}</td>
              <td class="${glClass}">${gl >= 0 ? '+' : ''}${fmt$(gl)}<br><span style="font-size:.67rem;opacity:.8">${gl >= 0 ? '+' : ''}${glPct.toFixed(2)}%</span></td>
              <td>
                <div class="alloc-bar-cell">
                  <div class="alloc-mini" style="width:${allocW}px"></div>
                  ${h.alloc}%
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    buildIRALineChart('rothLineChart', port);
    buildDonutChart('rothDonut', port.holdings);
  });
}

// ─── RULE-BASED INSIGHTS ENGINE ───────────────────────────────────────────────
function generateInsights() {
  const insights     = [];
  const portKeys     = Object.keys(PORTFOLIOS);
  const sp500R90     = -2.22;    // 90-day S&P return matching benchmarks page
  const TARGET_YIELD = 4.0;     // income portfolio target yield %

  const allStats = {};
  for (const k of portKeys) allStats[k] = calcPortfolioStats(k);

  const netWorth     = Object.values(allStats).reduce((s, p) => s + p.totalMkt,  0);
  const totalCostAll = Object.values(allStats).reduce((s, p) => s + p.totalCost, 0);
  const totalGLAll   = netWorth - totalCostAll;
  const totalGLPct   = totalCostAll > 0 ? (totalGLAll / totalCostAll) * 100 : 0;
  const rebalanceDays = Math.max(0,
    Math.ceil((new Date('2026-06-15') - new Date()) / (1000 * 86400)));

  // ── ALERTS ──────────────────────────────────────────────────────────────────

  // 1. Allocation drift > 5pp
  for (const [portKey, port] of Object.entries(PORTFOLIOS)) {
    const { totalMkt } = allStats[portKey];
    if (totalMkt === 0) continue;
    for (const h of port.holdings) {
      const currentPct = (getPrice(h.ticker) * h.shares / totalMkt) * 100;
      const drift      = currentPct - h.alloc;
      if (Math.abs(drift) >= 5) {
        const dir  = drift > 0 ? 'OVERWEIGHT' : 'UNDERWEIGHT';
        const sign = drift > 0 ? '+' : '';
        insights.push({
          category: 'alert', icon: '⚖️',
          title:  `${h.ticker} ${dir} in ${port.name}`,
          body:   `Current allocation ${currentPct.toFixed(1)}% vs ${h.alloc}% target (${sign}${drift.toFixed(1)}pp drift). Consider rebalancing before June 15.`,
          action: 'Open Rebalance Calculator', page: 'rebalance'
        });
      }
    }
  }

  // 2. Holdings down > 10% from cost basis
  for (const [portKey, port] of Object.entries(PORTFOLIOS)) {
    for (const r of allStats[portKey].rows) {
      if (r.glPct <= -10) {
        insights.push({
          category: 'alert', icon: '📉',
          title:  `${r.ticker} down ${Math.abs(r.glPct).toFixed(1)}% in ${port.name}`,
          body:   `Avg cost ${fmt$(r.costBasis)} vs current ${fmt$(r.price)} — unrealized loss of ${signedDollar(r.gl)}. Review investment thesis before next rebalance.`,
          action: `View ${port.name}`, page: portKey
        });
      }
    }
  }

  // 3. Portfolio lagging S&P 500 by > 3pp over 90 days
  for (const portKey of portKeys) {
    const r90 = calcPortfolio90Return(portKey);
    if ((r90 - sp500R90) < -3) {
      insights.push({
        category: 'alert', icon: '📊',
        title:  `${PORTFOLIOS[portKey].name} lags S&P 500 by ${Math.abs(r90 - sp500R90).toFixed(1)}pp`,
        body:   `90-day return ${fmtPct(r90)} vs S&P 500 at ${fmtPct(sp500R90)}. Review holdings for allocation drag.`,
        action: 'View Benchmarks', page: 'benchmarks'
      });
    }
  }

  // 4. Concentration risk — single holding grown above 30%
  for (const [portKey, port] of Object.entries(PORTFOLIOS)) {
    const { totalMkt, rows } = allStats[portKey];
    if (totalMkt === 0) continue;
    for (const r of rows) {
      const pct = (r.mktVal / totalMkt) * 100;
      if (pct > 30 && r.alloc <= 30) {
        insights.push({
          category: 'alert', icon: '⚠️',
          title:  `${r.ticker} has grown to ${pct.toFixed(1)}% of ${port.name}`,
          body:   `Target is ${r.alloc}% — now ${pct.toFixed(1)}% of the portfolio. Concentration above 30% increases single-asset risk.`,
          action: `View ${port.name}`, page: portKey
        });
      }
    }
  }

  // ── OPPORTUNITIES ────────────────────────────────────────────────────────────

  // 5. Moderate drift 3–5pp (monitor zone, approaching threshold)
  for (const [portKey, port] of Object.entries(PORTFOLIOS)) {
    const { totalMkt } = allStats[portKey];
    if (totalMkt === 0) continue;
    for (const h of port.holdings) {
      const currentPct = (getPrice(h.ticker) * h.shares / totalMkt) * 100;
      const drift      = currentPct - h.alloc;
      if (Math.abs(drift) >= 3 && Math.abs(drift) < 5) {
        const dir  = drift > 0 ? 'above' : 'below';
        const sign = drift > 0 ? '+' : '';
        insights.push({
          category: 'opportunity', icon: '🔄',
          title:  `${h.ticker} ${sign}${drift.toFixed(1)}pp ${dir} target in ${port.name}`,
          body:   `Currently ${currentPct.toFixed(1)}% vs ${h.alloc}% target — approaching the 5pp rebalance threshold. Monitor heading into June 15 review.`,
          action: 'Open Rebalance Calculator', page: 'rebalance'
        });
      }
    }
  }

  // 6. Income portfolio yield below target
  const incomeAnnual = calcPortfolioAnnualDiv('income');
  const incomeMkt    = allStats.income.totalMkt;
  const incomeYield  = incomeMkt > 0 ? (incomeAnnual / incomeMkt) * 100 : 0;
  if (incomeYield > 0 && incomeYield < TARGET_YIELD) {
    insights.push({
      category: 'opportunity', icon: '💰',
      title:  `Income Portfolio Yield ${incomeYield.toFixed(1)}% — Below ${TARGET_YIELD}% Target`,
      body:   `Estimated annual income: ${fmt$(incomeAnnual)} on ${fmt$(incomeMkt)} market value. Consider adding to JEPI or higher-yield positions at next rebalance.`,
      action: 'View Income Strategy', page: 'income'
    });
  }

  // 7. Roth contribution window (before April 15 tax deadline)
  const now2 = new Date();
  if (now2.getMonth() < 3 || (now2.getMonth() === 3 && now2.getDate() <= 15)) {
    insights.push({
      category: 'opportunity', icon: '🏦',
      title:  `Roth IRA Contribution Window — ${now2.getFullYear() - 1} Tax Year`,
      body:   `You can still contribute up to $7,000 ($8,000 if age 50+) for tax year ${now2.getFullYear() - 1}. Window closes April 15, ${now2.getFullYear()}.`,
      action: 'View Roth IRA', page: 'roth'
    });
  }

  // 8. Rebalance approaching within 45 days
  if (rebalanceDays <= 45) {
    insights.push({
      category: 'opportunity', icon: '📅',
      title:  `Rebalance in ${rebalanceDays} Days — Start Reviewing Now`,
      body:   `Scheduled June 15, 2026. With ${rebalanceDays} days left, finalize target adjustments and review capital gains implications before acting.`,
      action: 'Open Rebalance Calculator', page: 'rebalance'
    });
  }

  // ── WINS ─────────────────────────────────────────────────────────────────────

  // 9. Portfolios beating S&P 500 (grouped into one card)
  const beatingPorts = portKeys.filter(k => calcPortfolio90Return(k) > sp500R90);
  if (beatingPorts.length > 0) {
    insights.push({
      category: 'win', icon: '🏆',
      title:  `${beatingPorts.length} of ${portKeys.length} Portfolios Beat S&P 500`,
      body:   `${beatingPorts.map(k => PORTFOLIOS[k].name).join(', ')} ${beatingPorts.length === 1 ? 'is' : 'are'} outperforming the S&P 500's ${fmtPct(sp500R90)} 90-day return.`,
      action: 'View Benchmarks', page: 'benchmarks'
    });
  }

  // 10. Holdings with gains > 50% from cost basis (de-duped by ticker)
  const bigWinnersSeen = new Set();
  for (const [portKey, port] of Object.entries(PORTFOLIOS)) {
    for (const r of allStats[portKey].rows) {
      if (r.glPct >= 50 && !bigWinnersSeen.has(r.ticker)) {
        bigWinnersSeen.add(r.ticker);
        insights.push({
          category: 'win', icon: '🚀',
          title:  `${r.ticker} up ${r.glPct.toFixed(0)}% from cost basis`,
          body:   `Avg cost ${fmt$(r.costBasis)} → current ${fmt$(r.price)} — unrealized gain of ${signedDollar(r.gl)} in ${port.name}.`,
          action: `View ${port.name}`, page: portKey
        });
      }
    }
  }

  // 11. Total portfolio unrealized gain
  if (totalGLAll > 0) {
    insights.push({
      category: 'win', icon: '📈',
      title:  `Total Portfolio Up ${fmt$(totalGLAll)} (${totalGLPct.toFixed(1)}%)`,
      body:   `Invested: ${fmt$(totalCostAll)} · Market value: ${fmt$(netWorth)} · Net unrealized gain across all 5 portfolios.`,
      action: 'View Overview', page: 'overview'
    });
  }

  // 12. Income yield exceeding target
  if (incomeYield >= TARGET_YIELD) {
    insights.push({
      category: 'win', icon: '💰',
      title:  `Income Yield ${incomeYield.toFixed(1)}% Exceeds ${TARGET_YIELD}% Target`,
      body:   `${fmt$(incomeAnnual)}/year (≈ ${fmt$(incomeAnnual / 12)}/month) on ${fmt$(incomeMkt)} invested.`,
      action: 'View Income Strategy', page: 'income'
    });
  }

  // 13. Best single holding by 90-day return (de-duped)
  const seenBest = new Set();
  let bestHolding = null;
  for (const port of Object.values(PORTFOLIOS)) {
    for (const h of port.holdings) {
      if (!seenBest.has(h.ticker)) {
        seenBest.add(h.ticker);
        const r = get90Return(h.ticker);
        if (!bestHolding || r > bestHolding.r) bestHolding = { ticker: h.ticker, r };
      }
    }
  }
  if (bestHolding && bestHolding.r > 5) {
    insights.push({
      category: 'win', icon: '⭐',
      title:  `${bestHolding.ticker} — Top 90-Day Performer at ${fmtPct(bestHolding.r)}`,
      body:   `Strongest holding across all portfolios over 90 days — ${fmtPct(bestHolding.r - sp500R90)} alpha vs S&P 500.`,
      action: 'View Benchmarks', page: 'benchmarks'
    });
  }

  // ── INFO ─────────────────────────────────────────────────────────────────────

  // 14. RMD reminder — Traditional IRA
  insights.push({
    category: 'info', icon: '📋',
    title:  'Traditional IRA: RMD Deadline — December 31, 2026',
    body:   'Required Minimum Distributions must be taken by Dec 31 once you reach age 73 (SECURE 2.0). Consult your tax advisor to avoid the 25% IRS underpayment penalty.',
    action: 'View Traditional IRA', page: 'traditional'
  });

  // 15. Rebalance countdown (info only if > 45 days out)
  if (rebalanceDays > 45) {
    insights.push({
      category: 'info', icon: '📅',
      title:  `Next Rebalance in ${rebalanceDays} Days — June 15, 2026`,
      body:   `Monitor allocation drift in the Rebalance Calculator. This Insights page will surface any holdings crossing the 5pp alert threshold automatically.`,
      action: 'Open Rebalance Calculator', page: 'rebalance'
    });
  }

  // 16. Total estimated annual dividend income
  const totalAnnualDiv = portKeys.reduce((s, k) => s + calcPortfolioAnnualDiv(k), 0);
  insights.push({
    category: 'info', icon: '💵',
    title:  `Estimated Annual Dividend Income: ${fmt$(totalAnnualDiv)}`,
    body:   `≈ ${fmt$(totalAnnualDiv / 12)}/month across all 5 portfolios. Monthly payers (VGSH, SGOV, JEPI, BIL, VGIT) drive most of this income.`,
    action: 'View Dividend Calendar', page: 'dividends'
  });

  // 17. Gold / geopolitical hedge note
  const goldVal = portKeys.reduce((s, k) =>
    s + allStats[k].rows.filter(r => r.ticker === 'GLDM').reduce((a, r) => a + r.mktVal, 0), 0);
  const goldPct = netWorth > 0 ? (goldVal / netWorth) * 100 : 0;
  if (goldVal > 0) {
    insights.push({
      category: 'info', icon: '🥇',
      title:  `Gold (GLDM) = ${goldPct.toFixed(1)}% of Portfolio — ${fmtPct(get90Return('GLDM'))} (90d)`,
      body:   `GLDM held across Traditional and Roth IRAs (${fmt$(goldVal)} combined). Acting as an effective crisis hedge given Iran conflict and commodity volatility.`,
      action: 'View Benchmarks', page: 'benchmarks'
    });
  }

  // 18. Tax-advantaged vs taxable breakdown
  const taxAdvVal  = ['traditional','rollover','roth'].reduce((s, k) => s + allStats[k].totalMkt, 0);
  const taxableVal = ['investments','income'].reduce((s, k) => s + allStats[k].totalMkt, 0);
  const taxAdvPct  = netWorth > 0 ? (taxAdvVal / netWorth) * 100 : 0;
  insights.push({
    category: 'info', icon: '🏛️',
    title:  `${taxAdvPct.toFixed(0)}% of Net Worth in Tax-Advantaged Accounts`,
    body:   `${fmt$(taxAdvVal)} in Traditional, Rollover & Roth IRAs vs ${fmt$(taxableVal)} in taxable accounts. Strong tax-shelter positioning for long-term compounding.`,
    action: 'View Overview', page: 'overview'
  });

  const ORDER = { alert: 0, opportunity: 1, win: 2, info: 3 };
  insights.sort((a, b) => ORDER[a.category] - ORDER[b.category]);
  return insights;
}

function renderInsights() {
  const insights = generateInsights();
  const byCat = {
    alert:       insights.filter(i => i.category === 'alert'),
    opportunity: insights.filter(i => i.category === 'opportunity'),
    win:         insights.filter(i => i.category === 'win'),
    info:        insights.filter(i => i.category === 'info'),
  };

  const cardHTML = ins => `
    <div class="insight-card insight-${ins.category}"
         ${ins.page ? `onclick="navigateTo('${ins.page}')" style="cursor:pointer"` : ''}>
      <div class="insight-icon">${ins.icon}</div>
      <div class="insight-body">
        <div class="insight-title">${ins.title}</div>
        <div class="insight-text">${ins.body}</div>
        ${ins.action ? `<div class="insight-action">${ins.action} →</div>` : ''}
      </div>
    </div>`;

  const sectionHTML = (catKey, label, items) => items.length === 0 ? '' : `
    <div class="insights-section">
      <div class="insights-section-header">
        <span class="insights-section-badge insights-badge-${catKey}">${label}</span>
        <span class="insights-section-count">${items.length} insight${items.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="insights-grid">${items.map(cardHTML).join('')}</div>
    </div>`;

  document.getElementById('mainContent').innerHTML = `
    <div class="page-header">
      <h1>Portfolio Insights</h1>
      <div class="subtitle">Rule-based analysis · ${insights.length} insights across all 5 portfolios · Live data</div>
    </div>

    <div class="insights-summary-row">
      <div class="insights-summary-pill insights-pill-alert">
        <span class="insights-pill-num">${byCat.alert.length}</span>
        <span class="insights-pill-label">Alert${byCat.alert.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="insights-summary-pill insights-pill-opportunity">
        <span class="insights-pill-num">${byCat.opportunity.length}</span>
        <span class="insights-pill-label">Opportunit${byCat.opportunity.length !== 1 ? 'ies' : 'y'}</span>
      </div>
      <div class="insights-summary-pill insights-pill-win">
        <span class="insights-pill-num">${byCat.win.length}</span>
        <span class="insights-pill-label">Win${byCat.win.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="insights-summary-pill insights-pill-info">
        <span class="insights-pill-num">${byCat.info.length}</span>
        <span class="insights-pill-label">Info</span>
      </div>
    </div>

    <div class="insights-disclaimer">
      <span>ℹ️</span>
      All insights are generated algorithmically from your holdings and live price data.
      This is not financial advice — verify with your broker or advisor before acting.
    </div>

    ${sectionHTML('alert',       'Alerts',        byCat.alert)}
    ${sectionHTML('opportunity', 'Opportunities', byCat.opportunity)}
    ${sectionHTML('win',         'Wins',          byCat.win)}
    ${sectionHTML('info',        'Info',          byCat.info)}
    ${insights.length === 0
      ? '<div class="insights-empty">No insights generated — all portfolios look on track.</div>'
      : ''}
  `;
}

function renderAlerts() {
  const alerts = [
    { sev: 'critical', title: 'Strait of Hormuz partially blockaded', body: 'Iran preventing tanker passage; ~20% of global oil supply affected.  The strait handles ~21% of global petroleum liquids trade. Dubai and Doha airports had peak suspensions due to missile threat proximity.', source: 'Mar 18, 2026 · Bloomberg', icon: '🚨' },
    { sev: 'critical', title: 'Ali Larijani confirmed killed', body: 'Former Iranian parliament speaker and senior IRGC political liaison Ali Larijani confirmed killed March 18, 2026 in a targeted strike. Elevates succession uncertainty and hardliner control risk.', source: 'Mar 19, 2026 · Reuters / ACLED', icon: '💀' },
    { sev: 'high',     title: 'PDBC +28.24% since Dec 17 — commodity surge', body: 'Invesco Optimum Yield Diversified Commodity Strategy (PDBC), your 8% Rollover IRA sleeve, is up 28.24% since portfolio inception Dec 17, 2025. Crude, natural gas, and agricultural commodities all elevated. UBS CIO recommends maintaining exposure through at least Q2 2026.', source: `${daysAgoLabel(66)} · UBS Global CIO`, icon: '📈' },
    { sev: 'high',     title: 'GLDM +12.41% — gold crisis hedge activated', body: 'Gold MiniShares (GLDM), held in Traditional IRA (15%) and Roth IRA (5%), is up 12.41% over 90 days. Gold has outperformed the S&P 500 by 14.63% over the same period, functioning exactly as intended.', source: `${todayLabel()} · Market Data`, icon: '🥇' },
    { sev: 'high',     title: 'Oil embargo escalation risk — $120+ scenario', body: 'If Hormuz blockade persists through April, crude oil could reach $120+/bbl per Goldman Sachs and energy desk estimates. This would be strongly positive for PDBC and GLDM, and negative for growth equities (XLK, SMH).', source: 'Mar 20, 2026 · Goldman Sachs Energy Research', icon: '🛢️' },
    { sev: 'medium',   title: 'Market risk premium repriced — 106bps per 10-pt stability drop', body: 'PRS Group ICRG data shows sovereign spread increase of 106bps per 10-point political-stability drop. Iran\'s score dropped from 48 to 29 (scale 0-100). Al Jazeera\'s economic desk warns of global recession risk if Hormuz remains blocked through Q3 2026.', source: 'Mar 17, 2026 · PRS Group / Al Jazeera', icon: '⚠️' },
    { sev: 'medium',   title: 'XLK and SMH under technical pressure', body: 'Technology (XLK -3.2% 90-day) and Semiconductors (SMH -4.8% 90-day) are underperforming due to rate sensitivity, oil-input cost increases, and Taiwan supply chain uncertainty exacerbated by Middle East instability.', source: `${todayLabel()} · Technical Analysis`, icon: '💻' },
    { sev: 'low',      title: 'VTIP inflation protection activation confirmed', body: 'Vanguard Short-Term TIPS (VTIP) up 1.8% 90-day as anticipated inflation premium baked in. CPI for March expected to print above 3.4% annualized due to energy pass-through.', source: 'Mar 15, 2026 · Federal Reserve / BLS', icon: '🏦' },
  ];

  document.getElementById('mainContent').innerHTML = `
    <div class="page-header">
      <h1>Iran Crisis Alerts</h1>
      <div class="subtitle">Operation Epic Fury — Live geopolitical situation report · ${todayLabel()}</div>
    </div>

    <div class="alerts-list">
      ${alerts.map(a => `
        <div class="alert-card ${a.sev}">
          <div class="alert-card-header">
            <span class="severity-badge ${a.sev}">${a.sev.toUpperCase()}</span>
            <span style="font-size:.88rem;font-weight:700">${a.icon} ${a.title}</span>
          </div>
          <div class="alert-card-body">${a.body}</div>
          <div class="alert-card-source">📰 ${a.source}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderBenchmarks() {
  const dow    = state.bench['^DJI']  ?? BENCH_SEED['^DJI'];
  const sp500  = state.bench['^GSPC'] ?? BENCH_SEED['^GSPC'];
  const nasdaq = state.bench['^IXIC'] ?? BENCH_SEED['^IXIC'];
  const gold   = state.bench['GC=F']  ?? BENCH_SEED['GC=F'];

  const tradR = calcPortfolio90Return('traditional');
  const rollR = calcPortfolio90Return('rollover');
  const rothR = calcPortfolio90Return('roth');
  const invR  = calcPortfolio90Return('investments');
  const incR  = calcPortfolio90Return('income');

  const benchData = [
    { label: 'DOW JONES', symbol: '^DJI',  price: dow.price,    day: dow.dayChangePct,    r90: -3.28, range: BENCHMARKS['^DJI'].range52  },
    { label: 'S&P 500',   symbol: '^GSPC', price: sp500.price,  day: sp500.dayChangePct,  r90: -2.22, range: BENCHMARKS['^GSPC'].range52 },
    { label: 'NASDAQ',    symbol: '^IXIC', price: nasdaq.price, day: nasdaq.dayChangePct, r90: -4.12, range: BENCHMARKS['^IXIC'].range52 },
    { label: 'GOLD / OZ', symbol: 'GC=F',  price: gold.price,   day: gold.dayChangePct,   r90:  4.18, range: BENCHMARKS['GC=F'].range52  },
  ];

  document.getElementById('mainContent').innerHTML = `
    <div class="page-header">
      <h1>vs Dow / S&amp;P 500 / NASDAQ / Gold</h1>
      <div class="subtitle">90-day IRA portfolio performance vs benchmarks</div>
    </div>

    <div class="benchmark-grid" style="margin-bottom:1.5rem">
      ${benchData.map(b => `
        <div class="bench-card">
          <div class="bench-head-row">
            <div class="bench-label">${b.label}</div>
            <span class="bench-source-badge source-${getBenchSource(b.symbol)}">${getBenchSource(b.symbol).toUpperCase()}</span>
          </div>
          <div class="bench-price">${fmtN(b.price)}</div>
          <div class="bench-change ${b.day < 0 ? 'down' : 'up'}">
            ${b.day < 0 ? '▼' : '▲'} ${Math.abs(b.day).toFixed(2)}% today
          </div>
          <div class="bench-range">52W: ${b.range}</div>
          <div class="bench-change ${b.r90 < 0 ? 'down' : 'up'}" style="margin-top:.35rem">
            90-day: ${fmtPct(b.r90)}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="chart-card" style="margin-bottom:1.5rem">
      <div class="chart-title">IRA vs Benchmark — 90-Day Normalized</div>
      <div class="chart-subtitle">${window90Label()} · Base = 100</div>
      <div class="chart-wrap"><canvas id="benchNormChart"></canvas></div>
    </div>

    <div class="holdings-card">
      <div class="holdings-card-header"><h3>Performance Summary</h3></div>
      <table class="holdings-table">
        <thead><tr><th>PORTFOLIO</th><th>90-DAY RETURN</th><th>VS S&P 500</th><th>VS DOW</th><th>VS GOLD</th></tr></thead>
        <tbody>
          ${[
            ['Traditional IRA', tradR],
            ['Rollover IRA',    rollR],
            ['Roth IRA',        rothR],
            ['Investments',     invR ],
            ['Income Strategy', incR ],
          ].map(([name, r]) => `<tr>
            <td style="color:var(--accent-blue);font-weight:600">${name}</td>
            <td class="${pColor(r)}">${fmtPct(r)}</td>
            <td class="${pColor(r - (-2.22))}">${fmtPct(r - (-2.22))} alpha</td>
            <td class="${pColor(r - (-3.28))}">${fmtPct(r - (-3.28))} alpha</td>
            <td class="${pColor(r - 4.18)}">${fmtPct(r - 4.18)} alpha</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;

  requestAnimationFrame(() => buildNormChart('benchNormChart'));
}

function renderInvestments() {
  const port  = PORTFOLIOS.investments;
  const r90   = calcPortfolio90Return('investments');
  const pnl   = calcTodayPnL('investments');
  const stats = calcPortfolioStats('investments');

  document.getElementById('mainContent').innerHTML = `
    <div class="page-header">
      <h1>Investments</h1>
      <div class="subtitle">Taxable brokerage account · Live prices</div>
    </div>

    <div class="ira-stats-row">
      <div class="stat-card">
        <div class="stat-label">ACCOUNT VALUE</div>
        <div class="stat-value">${fmt$(stats.totalMkt)}</div>
        <div class="stat-sub">market value</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">90-DAY RETURN</div>
        <div class="stat-value ${r90>=0?'green':'red'}">${fmtPct(r90)}</div>
        <div class="stat-sub">vs S&P -2.22%</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">TODAY'S P&amp;L</div>
        <div class="stat-value ${pnl.pnl>=0?'green':'red'}">${pnl.pnl>=0?'+':''}${fmt$(pnl.pnl)}</div>
        <div class="stat-sub">${fmtPct(pnl.pct)} weighted</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">UNREALIZED G/L</div>
        <div class="stat-value ${stats.totalGL>=0?'green':'red'}">${stats.totalGL>=0?'+':''}${fmt$(stats.totalGL)}</div>
        <div class="stat-sub">${stats.totalGL>=0?'+':''}${stats.totalGLPct.toFixed(2)}% on cost basis</div>
      </div>
    </div>

    <div class="ira-charts-row">
      <div class="chart-card">
        <div class="chart-title">90-Day Performance</div>
        <div class="chart-subtitle">Base = 100</div>
        <div class="chart-wrap"><canvas id="invLine" style="max-height:220px"></canvas></div>
      </div>
      <div class="chart-card">
        <div class="chart-title">Allocation</div>
        <div class="chart-subtitle">Target weights</div>
        <div class="chart-wrap"><canvas id="invDonut" style="max-height:220px"></canvas></div>
      </div>
    </div>

    <div class="holdings-card">
      <div class="holdings-card-header" style="display:flex;align-items:center;justify-content:space-between">
        <h3>Holdings — ${port.holdings.length} positions</h3>
        <span style="font-size:.74rem;color:var(--text-muted)">Cost basis: ${fmt$(stats.totalCost)}</span>
      </div>
      <div class="holdings-tbl-wrap">
      <table class="holdings-table">
        <thead><tr><th>TICKER</th><th>NAME</th><th>SHARES</th><th>PRICE</th><th>DAY</th><th>90D RET</th><th>VALUE</th><th>UNREAL G/L</th><th>ALLOC</th></tr></thead>
        <tbody>
          ${port.holdings.map(h => {
            const price   = getPrice(h.ticker);
            const day     = getDayChangePct(h.ticker);
            const r90h    = get90Return(h.ticker);
            const mktVal  = price * h.shares;
            const gl      = mktVal - h.costBasis * h.shares;
            const glPct   = h.costBasis > 0 ? ((price - h.costBasis) / h.costBasis) * 100 : 0;
            const glClass = gl >= 0 ? 'change-up' : 'change-down';
            const allocW  = Math.max(4, (h.alloc / 50) * 70);
            return `<tr>
              <td><span class="ticker-badge">${h.ticker}</span></td>
              <td class="holding-name">${h.name}</td>
              <td>${h.shares.toLocaleString('en-US',{maximumFractionDigits:3})}</td>
              <td>${fmt$(price)}</td>
              <td class="${pColor(day)}">${fmtPct(day)}</td>
              <td class="${pColor(r90h)}">${fmtPct(r90h)}</td>
              <td>${fmt$(mktVal)}</td>
              <td class="${glClass}">${gl>=0?'+':''}${fmt$(gl)}<br><span style="font-size:.67rem;opacity:.8">${gl>=0?'+':''}${glPct.toFixed(2)}%</span></td>
              <td><div class="alloc-bar-cell"><div class="alloc-mini" style="width:${allocW}px"></div>${h.alloc}%</div></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
      </div>
    </div>
  `;
  requestAnimationFrame(() => { buildIRALineChart('invLine', port); buildDonutChart('invDonut', port.holdings); });
}

function renderIncome() {
  const port        = PORTFOLIOS.income;
  const r90         = calcPortfolio90Return('income');
  const pnl         = calcTodayPnL('income');
  const stats       = calcPortfolioStats('income');
  const annualIncome = calcPortfolioAnnualDiv('income');
  const yieldPct    = stats.totalMkt > 0 ? (annualIncome / stats.totalMkt) * 100 : 0;

  // Build distribution schedule from DIV_INFO
  const distRows = port.holdings.map(h => {
    const info = DIV_INFO[h.ticker];
    if (!info || info.aps === 0) return null;
    const annual    = h.shares * info.aps;
    const perPayment = annual / Math.max(1, info.payMonths.length);
    return { ticker: h.ticker, name: h.name, freq: info.freq, perPayment, annual };
  }).filter(Boolean);

  document.getElementById('mainContent').innerHTML = `
    <div class="page-header">
      <h1>Income Strategy</h1>
      <div class="subtitle">High-income ETF sleeve · Monthly distributions · Live prices</div>
    </div>

    <div class="ira-stats-row">
      <div class="stat-card">
        <div class="stat-label">ACCOUNT VALUE</div>
        <div class="stat-value">${fmt$(stats.totalMkt)}</div>
        <div class="stat-sub">market value</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">90-DAY RETURN</div>
        <div class="stat-value ${r90>=0?'green':'red'}">${fmtPct(r90)}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">TODAY'S P&amp;L</div>
        <div class="stat-value ${pnl.pnl>=0?'green':'red'}">${pnl.pnl>=0?'+':''}${fmt$(pnl.pnl)}</div>
        <div class="stat-sub">${fmtPct(pnl.pct)} weighted</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">EST. ANNUAL INCOME</div>
        <div class="stat-value green">${fmt$(annualIncome)}</div>
        <div class="stat-sub">${yieldPct.toFixed(1)}% yield on NAV</div>
      </div>
    </div>

    <div class="ira-charts-row">
      <div class="chart-card">
        <div class="chart-title">90-Day Performance</div>
        <div class="chart-subtitle">Base = 100</div>
        <div class="chart-wrap"><canvas id="incLine" style="max-height:220px"></canvas></div>
      </div>
      <div class="chart-card">
        <div class="chart-title">Allocation</div>
        <div class="chart-subtitle">Target weights</div>
        <div class="chart-wrap"><canvas id="incDonut" style="max-height:220px"></canvas></div>
      </div>
    </div>

    <div class="holdings-card">
      <div class="holdings-card-header" style="display:flex;align-items:center;justify-content:space-between">
        <h3>Holdings — ${port.holdings.length} positions</h3>
        <span style="font-size:.74rem;color:var(--text-muted)">Cost basis: ${fmt$(stats.totalCost)}</span>
      </div>
      <div class="holdings-tbl-wrap">
      <table class="holdings-table">
        <thead><tr><th>TICKER</th><th>NAME</th><th>SHARES</th><th>PRICE</th><th>DAY</th><th>90D RET</th><th>VALUE</th><th>UNREAL G/L</th><th>ALLOC</th></tr></thead>
        <tbody>
          ${port.holdings.map(h => {
            const price   = getPrice(h.ticker);
            const day     = getDayChangePct(h.ticker);
            const r90h    = get90Return(h.ticker);
            const mktVal  = price * h.shares;
            const gl      = mktVal - h.costBasis * h.shares;
            const glPct   = h.costBasis > 0 ? ((price - h.costBasis) / h.costBasis) * 100 : 0;
            const glClass = gl >= 0 ? 'change-up' : 'change-down';
            const allocW  = Math.max(4, (h.alloc / 51) * 70);
            return `<tr>
              <td><span class="ticker-badge">${h.ticker}</span></td>
              <td class="holding-name">${h.name}</td>
              <td>${h.shares.toLocaleString('en-US',{maximumFractionDigits:3})}</td>
              <td>${fmt$(price)}</td>
              <td class="${pColor(day)}">${fmtPct(day)}</td>
              <td class="${pColor(r90h)}">${fmtPct(r90h)}</td>
              <td>${fmt$(mktVal)}</td>
              <td class="${glClass}">${gl>=0?'+':''}${fmt$(gl)}<br><span style="font-size:.67rem;opacity:.8">${gl>=0?'+':''}${glPct.toFixed(2)}%</span></td>
              <td><div class="alloc-bar-cell"><div class="alloc-mini" style="width:${allocW}px"></div>${h.alloc}%</div></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
      </div>
    </div>

    <!-- Distribution Schedule -->
    <div class="holdings-card" style="margin-top:1.1rem">
      <div class="holdings-card-header"><h3>Distribution Schedule</h3></div>
      <table class="holdings-table">
        <thead><tr><th>TICKER</th><th>NAME</th><th>FREQUENCY</th><th>PER PAYMENT (EST.)</th><th>ANNUAL EST.</th></tr></thead>
        <tbody>
          ${distRows.map(r => `<tr>
            <td><span class="ticker-badge">${r.ticker}</span></td>
            <td class="holding-name">${r.name}</td>
            <td style="text-transform:capitalize;color:var(--text-secondary)">${r.freq}</td>
            <td class="change-up">~${fmt$(r.perPayment)}</td>
            <td class="change-up">${fmt$(r.annual)}</td>
          </tr>`).join('')}
          <tr style="font-weight:700;border-top:1px solid var(--border)">
            <td colspan="3" style="color:var(--text-muted);font-size:.75rem">TOTAL</td>
            <td></td>
            <td class="change-up">${fmt$(annualIncome)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  requestAnimationFrame(() => { buildIRALineChart('incLine', port); buildDonutChart('incDonut', port.holdings); });
}

function renderDividends() {
  const PORT_ABBR = { traditional:'Trad', rollover:'Roll', roth:'Roth', investments:'Inve', income:'Inco' };
  const MONTHS    = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

  // Build one row per holding that pays dividends
  const allRows = [];
  const portAnnuals = {};
  for (const [portKey, port] of Object.entries(PORTFOLIOS)) {
    let pTotal = 0;
    for (const h of port.holdings) {
      const info = DIV_INFO[h.ticker];
      if (!info || info.freq === 'none' || info.aps === 0) continue;
      const annual = h.shares * info.aps;
      if (annual < 0.5) continue;
      const perPay = annual / info.payMonths.length;
      const monthAmounts = Array.from({length:12}, (_, m) =>
        info.payMonths.includes(m) ? perPay : 0);
      pTotal += annual;
      allRows.push({ ticker:h.ticker, portKey, monthAmounts, annual });
    }
    portAnnuals[portKey] = pTotal;
  }
  const combined = Object.values(portAnnuals).reduce((s,v) => s+v, 0);
  const monthTotals = Array(12).fill(0);
  allRows.forEach(r => r.monthAmounts.forEach((v,m) => { monthTotals[m] += v; }));

  const portCards = Object.entries(PORTFOLIOS).map(([key, port]) => `
    <div class="div-port-card">
      <div class="div-port-label">${port.name.toUpperCase()}</div>
      <div class="div-port-amount">${fmt$(portAnnuals[key])}</div>
      <div class="div-port-sub">Annual Dividend Income</div>
    </div>`).join('');

  const tableRows = allRows.map(r => {
    const cells = r.monthAmounts.map(v =>
      v > 0
        ? `<td class="div-pay">$${Math.round(v).toLocaleString()}</td>`
        : `<td class="div-dash">&mdash;</td>`
    ).join('');
    return `<tr>
      <td class="div-row-label"><span class="ticker-badge">${r.ticker}</span> <span class="div-port-tag">(${PORT_ABBR[r.portKey]})</span></td>
      ${cells}
      <td class="div-annual">${fmt$(r.annual)}</td>
    </tr>`;
  }).join('');

  const totalCells = monthTotals.map(v =>
    `<td class="div-total-cell">$${Math.round(v).toLocaleString()}</td>`
  ).join('');

  document.getElementById('mainContent').innerHTML = `
    <div class="page-header">
      <h1>Dividend Income Calendar</h1>
      <div class="subtitle">Projected annual dividend income by portfolio and month</div>
    </div>

    <div class="div-port-cards">${portCards}</div>

    <div class="div-combined-banner">
      <div class="div-combined-label">COMBINED ANNUAL DIVIDEND ESTIMATE</div>
      <div class="div-combined-amount">${fmt$(combined)}</div>
    </div>

    <div class="div-schedule-section">
      <div class="div-schedule-header">
        <div class="div-schedule-title">Monthly Income Schedule</div>
        <div class="div-schedule-sub">Projected income per ticker across all portfolios</div>
      </div>
      <div class="div-cal-wrap">
        <table class="div-cal-table">
          <thead>
            <tr>
              <th class="div-th-ticker">TICKER</th>
              ${MONTHS.map(m => `<th>${m}</th>`).join('')}
              <th>ANNUAL</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
            <tr class="div-total-row">
              <td><strong>TOTAL</strong></td>
              ${totalCells}
              <td class="div-annual"><strong>${fmt$(combined)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="div-disclaimer">
      Yields are approximate trailing 12-month estimates. Actual distributions vary. GLDM and PDBC do not distribute dividends.
    </div>
  `;
}

function buildRebalTable(portKey) {
  const port   = PORTFOLIOS[portKey];
  const holdings = port.holdings.filter(h => h.alloc > 0);

  const totalMktVal = holdings.reduce((sum, h) => {
    return sum + (getPrice(h.ticker) * h.shares);
  }, 0);

  const rows = holdings.map(h => {
    const price       = getPrice(h.ticker);
    const currentVal  = price * h.shares;
    const costVal     = h.costBasis * h.shares;
    const gainLoss    = currentVal - costVal;
    const gainLossPct = h.costBasis > 0 ? ((price - h.costBasis) / h.costBasis) * 100 : 0;
    const targetVal   = totalMktVal * (h.alloc / 100);
    const currentPct  = totalMktVal > 0 ? (currentVal / totalMktVal) * 100 : 0;
    const drift       = currentPct - h.alloc;
    const deltaVal    = targetVal - currentVal;
    const sharesNeeded = deltaVal / price;
    return { ticker: h.ticker, shares: h.shares, costBasis: h.costBasis, price, currentVal, gainLoss, gainLossPct, targetPct: h.alloc, currentPct, drift, sharesNeeded, deltaVal };
  });

  // Portfolio totals
  const totalCostVal = holdings.reduce((s, h) => s + h.costBasis * h.shares, 0);
  const totalGL      = totalMktVal - totalCostVal;
  const totalGLPct   = totalCostVal > 0 ? (totalGL / totalCostVal) * 100 : 0;

  return `
    <div class="rb-port-value">Total Portfolio Value: <span>${fmt$(totalMktVal)}</span>
      <span class="rb-total-gl ${totalGL >= 0 ? 'rb-buy' : 'rb-sell'}">
        &nbsp;·&nbsp; Total Gain/Loss: ${totalGL >= 0 ? '+' : ''}${fmt$(totalGL)} (${fmtPct(totalGLPct)})
      </span>
    </div>
    <div class="rb-table-wrap">
    <table class="rb-table">
      <thead><tr>
        <th>TICKER</th>
        <th>SHARES</th>
        <th>AVG COST</th>
        <th>MKT PRICE</th>
        <th>CURRENT VALUE</th>
        <th>GAIN / LOSS</th>
        <th>TARGET %</th>
        <th>EST. CURRENT %</th>
        <th>DRIFT</th>
        <th>ACTION</th>
        <th>EST. SHARES TO TRADE</th>
      </tr></thead>
      <tbody>
        ${rows.map(r => {
          const isBuy       = r.sharesNeeded >= 0;
          const actionClass = isBuy ? 'rb-buy' : 'rb-sell';
          const actionWord  = isBuy ? 'BUY' : 'SELL';
          const shareAbs    = Math.abs(r.sharesNeeded).toFixed(1);
          const dollarAbs   = fmt$(Math.abs(r.deltaVal));
          const driftSign   = r.drift >= 0 ? '+' : '';
          const glSign      = r.gainLoss >= 0 ? '+' : '';
          const glClass     = r.gainLoss >= 0 ? 'rb-buy' : 'rb-sell';
          return `<tr>
            <td><span class="ticker-badge">${r.ticker}</span></td>
            <td>${r.shares.toLocaleString('en-US', {maximumFractionDigits:3})}</td>
            <td>${fmt$(r.costBasis)}</td>
            <td>${fmt$(r.price)}</td>
            <td>${fmt$(r.currentVal)}</td>
            <td class="${glClass}">${glSign}${fmt$(r.gainLoss)}<br><span style="font-size:.68rem;opacity:.8">${glSign}${r.gainLossPct.toFixed(2)}%</span></td>
            <td>${r.targetPct.toFixed(1)}%</td>
            <td>${r.currentPct.toFixed(1)}%</td>
            <td class="${r.drift < 0 ? 'change-down' : 'change-up'}">${driftSign}${r.drift.toFixed(2)}%</td>
            <td class="${actionClass}"><strong>${actionWord} ${shareAbs} shares (~${dollarAbs})</strong></td>
            <td class="${actionClass}">${isBuy ? '+' : '-'}${shareAbs}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    </div>
    <div class="rb-footer">Estimates based on drift from target weights using live prices. Verify with your broker before trading.</div>
  `;
}

function renderRebalance(activeTab) {
  const tabs = [
    { key: 'traditional', label: 'Traditional IRA' },
    { key: 'rollover',    label: 'Rollover IRA'    },
    { key: 'roth',        label: 'Roth IRA'        },
    { key: 'investments', label: 'Investments'     },
    { key: 'income',      label: 'Income'          },
  ];
  const current = activeTab || 'traditional';

  document.getElementById('mainContent').innerHTML = `
    <div class="page-header">
      <h1>Rebalance Calculator</h1>
      <div class="subtitle">"What If I Rebalance Today?" — Estimate trades needed to restore target weights</div>
    </div>

    <div class="rb-tabs">
      ${tabs.map(t => `
        <button class="rb-tab ${t.key === current ? 'active' : ''}" data-rbkey="${t.key}">${t.label}</button>
      `).join('')}
    </div>

    <div id="rbTableWrap">
      ${buildRebalTable(current)}
    </div>
  `;

  document.querySelectorAll('.rb-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rb-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('rbTableWrap').innerHTML = buildRebalTable(btn.dataset.rbkey);
    });
  });
}

// ─── NAVIGATION ────────────────────────────────────────────────────────────────
function navigateTo(page) {
  state.currentPage = page;
  // Destroy all existing charts on page change
  Object.keys(state.charts).forEach(k => destroyChart(k));

  // Update active nav
  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  switch (page) {
    case 'overview':    renderOverview();    break;
    case 'traditional': renderIRAPage('traditional'); break;
    case 'rollover':    renderIRAPage('rollover');    break;
    case 'roth':        renderRothIRA();     break;
    case 'investments': renderInvestments(); break;
    case 'income':      renderIncome();      break;
    case 'editor':      renderPortfolioEditor(); break;
    case 'rebalance':   renderRebalance();   break;
    case 'benchmarks':  renderBenchmarks();  break;
    case 'alerts':      renderAlerts();      break;
    case 'dividends':   renderDividends();   break;
    case 'insights':    renderInsights();    break;
    default:            renderOverview();
  }

  renderWarNews();
  updateDiagnosticsStrip();

  // Scroll to top
  document.getElementById('mainContent').scrollTop = 0;
}

// ─── INIT ──────────────────────────────────────────────────────────────────────
function updateSnapshotTime() {
  const now = new Date();
  const utc = now.toUTCString().replace('GMT','UTC');
  // Format: Snapshot — May 7, 2026, 19:13 UTC (dynamic)
  const parts = now.toLocaleString('en-US', {
    timeZone: 'UTC', month:'short', day:'numeric', year:'numeric',
    hour:'2-digit', minute:'2-digit', hour12: false, timeZoneName:'short'
  });
  document.getElementById('snapshotTime').textContent = `Snapshot — ${parts}`;
}

function calcRebalanceDays() {
  const target = new Date('2026-06-15');
  const now    = new Date();
  const days   = Math.max(0, Math.ceil((target - now) / (1000 * 86400)));
  document.getElementById('rebalanceDays').textContent = days;
}

async function init() {
  loadPortfolioData();
  updateSnapshotTime();
  calcRebalanceDays();
  updateDiagnosticsStrip();

  // Nav links
  document.querySelectorAll('.nav-link').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(el.dataset.page);
    });
  });

  // Iran modal
  document.getElementById('iranAlertBtn').addEventListener('click', () => {
    document.getElementById('iranModal').classList.add('open');
  });
  document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('iranModal').classList.remove('open');
  });
  document.getElementById('iranModal').addEventListener('click', e => {
    if (e.target === document.getElementById('iranModal')) {
      document.getElementById('iranModal').classList.remove('open');
    }
  });

  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.getElementById('themeToggle').textContent =
      document.body.classList.contains('light-mode') ? '☀' : '☽';
  });

  const refreshMarketsBtn = document.getElementById('refreshMarketsBtn');
  const refreshNewsBtn = document.getElementById('refreshNewsBtn');
  if (refreshMarketsBtn) refreshMarketsBtn.addEventListener('click', refreshMarketsNow);
  if (refreshNewsBtn) refreshNewsBtn.addEventListener('click', refreshNewsNow);

  // Render overview immediately with seed data
  renderOverview();
  renderWarNews();

  // Fetch benchmarks first so Dow/S&P/NASDAQ/Gold flip to live quickly.
  loadBenchmarkPrices()
    .catch(() => { /* silent */ })
    .finally(() => {
      state.diagnostics.lastMarketsRefreshAt = new Date().toISOString();
      state.diagnostics.lastMarketsError = null;
      navigateTo(state.currentPage);
    });

  // Fetch full ticker set in background without blocking the UI.
  loadAllPrices()
    .catch(() => { /* silent */ })
    .finally(() => {
      state.diagnostics.lastMarketsRefreshAt = new Date().toISOString();
      state.diagnostics.lastMarketsError = null;
      navigateTo(state.currentPage);
    });

  // Load conflict headlines in background (do not block live price paint).
  loadWarNews();

  // Refresh prices every 5 minutes
  setInterval(async () => {
    try {
      await loadAllPrices();
      state.diagnostics.lastMarketsRefreshAt = new Date().toISOString();
      state.diagnostics.lastMarketsError = null;
    } catch {
      state.diagnostics.lastMarketsError = 'auto refresh failed';
    }
    navigateTo(state.currentPage);
  }, 5 * 60 * 1000);

  // Keep benchmark cards fresh between full refresh cycles.
  setInterval(async () => {
    try {
      await loadBenchmarkPrices();
      state.diagnostics.lastMarketsRefreshAt = new Date().toISOString();
      state.diagnostics.lastMarketsError = null;
    } catch {
      state.diagnostics.lastMarketsError = 'benchmark refresh failed';
    }
    if (state.currentPage === 'overview' || state.currentPage === 'benchmarks') {
      navigateTo(state.currentPage);
    }
  }, 60 * 1000);

  // Refresh war headlines every 15 minutes
  setInterval(() => {
    loadWarNews();
  }, 15 * 60 * 1000);

  // Clock tick every minute
  setInterval(updateSnapshotTime, 60 * 1000);
}

document.addEventListener('DOMContentLoaded', init);

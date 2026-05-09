# IRA Tracker Dashboard

A personal investment dashboard for tracking five portfolios, benchmarks, dividends, and rule-based insights — built as a single-page web app with no backend or build tools required.

---

## Overview

| Metric | Value |
|---|---|
| Total Net Worth | ~$1.24M across 5 portfolios |
| Portfolios Tracked | Traditional IRA · Rollover IRA · Roth IRA · Investments · Income Strategy |
| Benchmarks | Dow Jones · S&P 500 · NASDAQ · Gold |
| Price Data | Yahoo Finance API (live) with seed-data fallback |
| Dependencies | Chart.js 4.4.2 (CDN only) |

---

## Getting Started

No install, no build step, no server required.

1. Clone or download the repository
2. Open `index.html` directly in any modern browser (Chrome, Edge, Firefox)
3. Prices load automatically from Yahoo Finance; seed data is used if the API is unavailable (CORS / rate-limit)

```
IRA_Tracker_Dashboard/
├── index.html      # App shell, sidebar nav, modal markup
├── app.js          # All data, logic, and page renderers
└── styles.css      # Dark-theme design system + all component styles
```

> **No server needed.** The app runs entirely client-side. All data lives in `app.js`.

---

## Pages

### Overview
- **Net Worth Banner** — total net worth, cost basis, unrealized G/L, total return %, estimated annual dividends
- **Account Mini-Cards** — five clickable cards, one per portfolio, showing market value and G/L
- **Top Movers** — today's top-4 gainers and top-4 losers across all holdings
- **Allocation Drifts** — table of the six holdings furthest from their target weight
- **90-Day Performance Bar Chart** — all portfolios vs S&P 500, Dow, Gold
- **Drawdown Table** — peak-to-trough comparison across portfolios and benchmarks

### Traditional IRA / Rollover IRA
- Stats row: Account Value · 90-Day Return · Today's P&L · Unrealized G/L
- **RMD Reminder banner** on the Traditional IRA page (Required Minimum Distribution — Dec 31 deadline)
- Holdings table: Ticker · Name · Shares · Price · Day% · 90d Return · Market Value · Unrealized G/L · Allocation
- 90-day line chart (per-holding performance) + allocation donut chart

### Roth IRA
- Same layout as Traditional/Rollover
- **Roth Contribution Limit note** in the review banner ($7,000 / $8,000 if age 50+)
- Fidelity ZERO holdings (FZROX) included with annual dividend handling

### Investments
- Taxable brokerage account — same holdings table format
- 90-day return vs S&P 500 alpha shown in subtitle

### Income Strategy
- Est. Annual Income and portfolio yield % computed dynamically from `DIV_INFO`
- **Distribution Schedule table** — per-ticker frequency, per-payment amount, annual total

### Rebalance Calculator
- Tab per portfolio (Traditional · Rollover · Roth · Investments · Income)
- 11-column table: Ticker · Shares · Avg Cost · Mkt Price · Current Value · Gain/Loss · Target% · Current% · Drift · Action · Est. Shares to Trade
- BUY/SELL recommendations based on live drift from target allocation

### Benchmarks
- Benchmark cards: Dow · S&P 500 · NASDAQ · Gold (price, day %, 90d return, 52-week range)
- **Performance Summary table** — all 5 portfolios: 90-day return, alpha vs S&P 500, alpha vs Dow, alpha vs Gold
- Normalized 90-day line chart: all three IRAs vs S&P 500, Gold, Dow (base = 100)

### Iran Crisis Alerts
- Severity-coded alert feed (Critical / High / Medium) covering geopolitical events relevant to the portfolio
- Covers Hormuz blockade, commodity surge (PDBC), gold hedge performance, sector impacts (XLK, SMH)

### Dividend Calendar
- Per-portfolio income cards + combined annual income banner
- **Monthly dividend calendar table** — every holding × every month, color-coded payment cells
- Annual total column per holding; portfolio total row
- Disclaimer on dividend estimate accuracy

### Portfolio Insights *(rule-based engine)*
- Summary pill row: Alerts · Opportunities · Wins · Info counts
- Color-coded card grid, each card clicking through to the relevant page
- See [Insights Rules](#insights-rules) below for the full rule catalog

---

## Insights Rules

All insights are computed algorithmically at render time from live prices and your holdings data. No AI API is used.

### 🔴 Alerts
| # | Rule | Threshold |
|---|---|---|
| 1 | Allocation drift — overweight/underweight | ≥ 5 percentage points |
| 2 | Holding down from cost basis | ≤ −10% unrealized |
| 3 | Portfolio lagging S&P 500 (90-day) | > 3pp behind |
| 4 | Concentration risk — single holding grown above target | > 30% of portfolio when target ≤ 30% |

### 🟡 Opportunities
| # | Rule | Threshold |
|---|---|---|
| 5 | Moderate drift — monitor zone | 3–5pp from target |
| 6 | Income portfolio yield below target | < 4% estimated yield |
| 7 | Roth IRA contribution window open | Before April 15 of current year |
| 8 | Rebalance date approaching | ≤ 45 days to June 1 scheduled rebalance |

### 🟢 Wins
| # | Rule | Details |
|---|---|---|
| 9 | Portfolios beating S&P 500 | Grouped count card |
| 10 | Holdings with large unrealized gains | ≥ 50% above cost basis (de-duplicated by ticker) |
| 11 | Total portfolio in the green | Net unrealized G/L > 0 across all accounts |
| 12 | Income portfolio yield above target | ≥ 4% estimated yield |
| 13 | Best single holding (90-day) | Top performer > 5% 90-day return |

### ℹ️ Info
| # | Rule | Notes |
|---|---|---|
| 14 | Traditional IRA RMD reminder | Dec 31 annual deadline, age 73+ (SECURE 2.0) |
| 15 | Rebalance countdown | Shown as info when > 45 days out (becomes Opportunity inside 45) |
| 16 | Total estimated annual dividend income | Computed from `DIV_INFO` trailing 12-month rates |
| 17 | Gold / geopolitical hedge sizing | GLDM % of total portfolio + 90-day return |
| 18 | Tax-advantaged vs taxable breakdown | IRA % of net worth |

---

## Updating Your Data

All portfolio data lives at the top of `app.js`. Edit the `PORTFOLIOS` constant directly.

### Adding or changing a holding

```js
// In PORTFOLIOS.<portfolioKey>.holdings:
{ ticker: 'SCHD', name: 'Schwab US Dividend Equity', alloc: 14, shares: 3030, costBasis: 28.87 }
```

| Field | Description |
|---|---|
| `ticker` | Yahoo Finance symbol (must match an entry in `ALL_TICKERS`) |
| `name` | Display name shown in tables |
| `alloc` | Target allocation as a whole-number percentage (all holdings in a portfolio must sum to 100) |
| `shares` | Number of shares held |
| `costBasis` | Average cost per share (used for unrealized G/L calculations) |

### Adding a new ticker

1. Add the ticker string to `ALL_TICKERS`
2. Add a seed entry to `SEED` with `price`, `dayChange`, `dayChangePct`, and `return90`
3. Add a dividend entry to `DIV_INFO` (use `freq: 'none'` and `aps: 0` if it pays no dividends)

```js
// SEED example:
NEWT: { price: 45.00, dayChange: -0.12, dayChangePct: -0.27, return90: 3.50 }

// DIV_INFO example (quarterly payer):
NEWT: { freq: 'quarterly', payMonths: [2, 5, 8, 11], aps: 1.20 }
```

### Dividend frequency options

| `freq` value | `payMonths` | Notes |
|---|---|---|
| `'monthly'` | `[0,1,2,3,4,5,6,7,8,9,10,11]` | Pays every month |
| `'quarterly'` | `[2,5,8,11]` | March, June, September, December |
| `'annual'` | `[10]` or `[11]` | October or November typical |
| `'none'` | `[]` | No dividends (gold, commodities) |

`aps` = annual dividends per share (trailing 12-month estimate in dollars).

---

## Updating Static Benchmark Data

Benchmark baseline prices (used for 90-day return calculations) are in the `BENCHMARKS` and `BENCH_SEED` constants. Update `base90` to the index price exactly 90 calendar days ago.

```js
const BENCHMARKS = {
  '^GSPC': { label: 'S&P 500', range52: '4,835.04 – 7,002.28', base90: 6539.84 },
  // ...
};
```

---

## Updating the Rebalance Date

The scheduled rebalance date is referenced in two places in `app.js`:

```js
// In calcRebalanceDays() — drives the sidebar countdown
const target = new Date('2026-06-01');

// In generateInsights() — drives the rebalance opportunity/info rules
const rebalanceDays = Math.ceil((new Date('2026-06-01') - new Date()) / (1000 * 86400));
```

Change both strings to your new target date in `YYYY-MM-DD` format.

---

## Architecture

```
index.html
└── app.js
    ├── PORTFOLIOS          — holdings, shares, cost basis, target allocations
    ├── BENCHMARKS          — Dow, S&P 500, NASDAQ, Gold baseline data
    ├── ALL_TICKERS         — master list for price fetching
    ├── SEED                — fallback prices when Yahoo Finance is unavailable
    ├── BENCH_SEED          — fallback benchmark prices
    ├── DIV_INFO            — dividend frequency and annual-per-share rates
    │
    ├── loadAllPrices()     — fetches Yahoo Finance, fills gaps from SEED
    ├── fetchQuote()        — Yahoo Finance v8 API call (3-month range)
    │
    ├── Helper functions
    │   ├── calcPortfolioStats(portKey)      — mkt value, cost, unrealized G/L
    │   ├── calcPortfolio90Return(portKey)   — weighted 90-day return
    │   ├── calcTodayPnL(portKey)            — today's dollar/% P&L
    │   ├── calcPortfolioAnnualDiv(portKey)  — estimated annual dividend income
    │   ├── getTopMovers()                   — top 4 gainers + losers (day %)
    │   └── getTopDrifts()                   — top 6 allocation drift signals
    │
    ├── generateInsights()  — 18-rule engine → array of insight objects
    │
    ├── Page renderers
    │   ├── renderOverview()
    │   ├── renderIRAPage(portKey)   — Traditional + Rollover
    │   ├── renderRothIRA()
    │   ├── renderInvestments()
    │   ├── renderIncome()
    │   ├── renderRebalance(tab)
    │   ├── renderBenchmarks()
    │   ├── renderAlerts()
    │   ├── renderDividends()
    │   └── renderInsights()
    │
    ├── Chart builders
    │   ├── buildNormChart()       — normalized 90-day benchmarks line chart
    │   ├── buildDonutChart()      — allocation donut
    │   └── buildIRALineChart()    — per-holding 90-day line chart
    │
    └── navigateTo(page)    — SPA router; destroys charts, calls renderer
```

---

## Price Refresh

Prices refresh automatically every **5 minutes** while the page is open. The timestamp in the header shows the last update time in UTC. The `Snapshot` badge turns stale if the browser tab is left idle, but re-fetches on the next interval.

You can also force refresh at any time from the header:
- `Refresh Markets` — immediately fetches benchmark + holdings quotes
- `Refresh News` — immediately refreshes conflict headlines

The header diagnostics strip shows live health at a glance:
- `Bench x/4` = number of benchmark feeds currently live
- `Holdings x/18` = number of holdings with live quotes
- `News LIVE/SEED` = current war-news source

Hover the diagnostics strip to see last refresh times and any recent fallback reason.

---

## Local App Launcher (Windows)

For the most reliable Edge experience (including cleaner CORS behavior), use the included launcher scripts.

### One-click launch

1. Double-click `launch-dashboard.cmd`
2. It starts a lightweight local server on `127.0.0.1:5510`
3. It opens Edge in app-window mode with a cache-busting URL

### Stop the local server

- Run `stop-dashboard-server.cmd`

### Optional desktop shortcut

Create a desktop shortcut that points to:

`C:\Users\aladi\VScode_Projects\IRA_Tracker_Dashboard\launch-dashboard.cmd`

---

## Seed Data vs Live Data

When Yahoo Finance is reachable, each ticker gets a live quote with real price, day change, and a 90-day close series. When the API is blocked (CORS, rate-limit, or offline), the app falls back to the hardcoded `SEED` values in `app.js`.

To update seed data, replace the values in the `SEED` constant with current market prices. The `return90` field is the percentage gain/loss from 90 calendar days ago to today.

---

## Disclaimer

This dashboard is for **personal portfolio tracking only**. Price data is sourced from Yahoo Finance and may be delayed. Dividend estimates are based on trailing 12-month rates and are not guaranteed. Nothing on this dashboard constitutes financial advice. Verify all data with your broker before making any investment decisions.

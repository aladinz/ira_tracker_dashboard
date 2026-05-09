/* portfolio-data.js — IRA Tracker Dashboard · User Data File
 * -----------------------------------------------------------
 * This file is the single source of truth for your portfolio
 * holdings, account values, and optional manual price overrides.
 *
 * HOW TO USE
 *   1. Edit this file directly to update holdings, shares, or cost basis.
 *   2. OR use the "Edit Portfolio" page in the app, then click
 *      "Export portfolio-data.js" — it downloads an updated copy
 *      of this file. Replace this file with the downloaded one.
 *   3. Use "Export JSON" for a portable backup you can import on
 *      any device via "Import JSON" in the editor.
 *
 * PRICE OVERRIDES (optional)
 *   Leave priceOverrides as {} to always use live Yahoo Finance quotes.
 *   Add entries when you want to override a ticker's price manually.
 *   Both price and prevClose are needed for accurate Today P&L.
 *
 *   Example:
 *     "SCHD": { "price": 30.62, "prevClose": 30.80, "updatedAt": "2026-05-07T14:00:00Z" }
 *
 * PORTABILITY
 *   Copy or share this file to move your data to another machine.
 *   No browser storage (localStorage) is used — this file IS the data.
 */

window.PORTFOLIO_USER_DATA = {
  "_meta": {
    "version": 1,
    "lastUpdated": "2026-05-07T00:00:00Z"
  },

  "accountValues": {
    "traditional":  654560,
    "rollover":     218653,
    "roth":         208388,
    "investments":  140902,
    "income":        14896
  },

  "holdings": {
    "traditional": [
      { "ticker": "VGSH",  "name": "Vanguard Short-Term Gov't Bond",      "alloc": 34, "shares": 3736,     "costBasis": 58.78  },
      { "ticker": "SCHD",  "name": "Schwab US Dividend Equity",            "alloc": 14, "shares": 3030,     "costBasis": 28.87  },
      { "ticker": "SGOV",  "name": "iShares 0-3 Month Treasury Bond",      "alloc": 17, "shares": 1091.926, "costBasis": 100.64 },
      { "ticker": "VTIP",  "name": "Vanguard Short-Term Inflation Prot.",  "alloc": 14, "shares": 1898,     "costBasis": 49.82  },
      { "ticker": "GLDM",  "name": "SPDR Gold MiniShares",                 "alloc": 12, "shares": 925,      "costBasis": 91.93  },
      { "ticker": "USMV",  "name": "iShares MSCI Min Volatility",          "alloc":  9, "shares": 649,      "costBasis": 94.95  }
    ],
    "rollover": [
      { "ticker": "VTI",   "name": "Vanguard Total Stock Market",          "alloc": 29, "shares": 200.939,  "costBasis": 308.24 },
      { "ticker": "SCHD",  "name": "Schwab US Dividend Equity",            "alloc": 12, "shares": 876,      "costBasis": 29.18  },
      { "ticker": "VTIP",  "name": "Vanguard Short-Term Inflation Prot.",  "alloc": 12, "shares": 514,      "costBasis": 49.76  },
      { "ticker": "VXUS",  "name": "Vanguard Total Intl Stock",            "alloc":  9, "shares": 253,      "costBasis": 72.92  },
      { "ticker": "XLK",   "name": "Technology Select Sector SPDR",        "alloc":  9, "shares": 156.638,  "costBasis": 129.57 },
      { "ticker": "XLV",   "name": "Health Care Select Sector SPDR",       "alloc":  9, "shares": 129,      "costBasis": 147.64 },
      { "ticker": "BNDW",  "name": "Vanguard Total World Bond",            "alloc": 11, "shares": 360,      "costBasis": 69.87  },
      { "ticker": "PDBC",  "name": "Invesco Optimum Yield Diversified",    "alloc":  9, "shares": 1118,     "costBasis": 14.69  }
    ],
    "roth": [
      { "ticker": "FZROX", "name": "Fidelity ZERO Total Market",           "alloc": 41, "shares": 3725.399, "costBasis": 23.64  },
      { "ticker": "SCHD",  "name": "Schwab US Dividend Equity",            "alloc": 12, "shares": 829.139,  "costBasis": 26.77  },
      { "ticker": "VXUS",  "name": "Vanguard Total Intl Stock",            "alloc": 11, "shares": 315,      "costBasis": 75.42  },
      { "ticker": "XLV",   "name": "Health Care Select Sector SPDR",       "alloc": 12, "shares": 166,      "costBasis": 152.95 },
      { "ticker": "SMH",   "name": "VanEck Semiconductor ETF",             "alloc": 10, "shares": 53.137,   "costBasis": 308.55 },
      { "ticker": "VGIT",  "name": "Vanguard Intermediate-Term Gov't",     "alloc":  7, "shares": 252,      "costBasis": 60.39  },
      { "ticker": "VRT",   "name": "Vertiv Holdings",                      "alloc":  3, "shares": 27.045,   "costBasis": 57.79  },
      { "ticker": "GLDM",  "name": "SPDR Gold MiniShares",                 "alloc":  4, "shares": 90,       "costBasis": 101.81 }
    ],
    "investments": [
      { "ticker": "SGOV",  "name": "iShares 0-3 Month Treasury Bond",      "alloc": 50, "shares": 696,      "costBasis": 100.52 },
      { "ticker": "VTI",   "name": "Vanguard Total Stock Market",          "alloc": 29, "shares": 128,      "costBasis": 328.28 },
      { "ticker": "SCHD",  "name": "Schwab US Dividend Equity",            "alloc": 11, "shares": 517,      "costBasis": 27.05  },
      { "ticker": "VXUS",  "name": "Vanguard Total Intl Stock",            "alloc": 10, "shares": 188,      "costBasis": 74.39  }
    ],
    "income": [
      { "ticker": "SGOV",  "name": "iShares 0-3 Month Treasury Bond",      "alloc": 51, "shares": 74.719,   "costBasis": 100.38 },
      { "ticker": "JEPI",  "name": "JPMorgan Equity Premium Income",       "alloc": 29, "shares": 77.14,    "costBasis": 58.34  },
      { "ticker": "SCHD",  "name": "Schwab US Dividend Equity",            "alloc": 10, "shares": 50.411,   "costBasis": 29.76  },
      { "ticker": "BIL",   "name": "SPDR Bloomberg 1-3 Month T-Bill",      "alloc": 10, "shares": 16.414,   "costBasis": 91.38  }
    ]
  },

  "priceOverrides": {
    // Add manual price entries here when live quotes are unavailable.
    // Example (remove leading // to activate):
    // "SCHD": { "price": 30.62, "prevClose": 30.80, "updatedAt": "2026-05-07T14:00:00Z" }
  }
};

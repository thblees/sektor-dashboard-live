import { useState } from 'react'
import './App.css'
import { TrendingUp, TrendingDown, Minus, Info, ArrowRight, ExternalLink, TrendingUpIcon } from 'lucide-react'
import PasswordProtection from './components/PasswordProtection'

const sectorData = {
  sectors: [
    { ticker: 'XLP', name: 'Consumer Staples', nameDE: 'Basiskonsumgüter', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/the-consumer-staples-select-sector-spdr-fund-xlp', yahooUrl: 'https://finance.yahoo.com/quote/XLP' },
    { ticker: 'XLU', name: 'Utilities', nameDE: 'Versorgungsunternehmen', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/the-utilities-select-sector-spdr-fund-xlu', yahooUrl: 'https://finance.yahoo.com/quote/XLU' },
    { ticker: 'XLV', name: 'Health Care', nameDE: 'Gesundheitswesen', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/the-health-care-select-sector-spdr-fund-xlv', yahooUrl: 'https://finance.yahoo.com/quote/XLV' },
    { ticker: 'XLE', name: 'Energy', nameDE: 'Energie', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/the-energy-select-sector-spdr-fund-xle', yahooUrl: 'https://finance.yahoo.com/quote/XLE' },
    { ticker: 'XLY', name: 'Consumer Discretionary', nameDE: 'Nicht-Basiskonsumgüter', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/the-consumer-discretionary-select-sector-spdr-fund-xly', yahooUrl: 'https://finance.yahoo.com/quote/XLY' },
    { ticker: 'XLB', name: 'Materials', nameDE: 'Rohstoffe', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/the-materials-select-sector-spdr-fund-xlb', yahooUrl: 'https://finance.yahoo.com/quote/XLB' },
    { ticker: 'XLF', name: 'Financials', nameDE: 'Finanzwerte', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/the-financial-select-sector-spdr-fund-xlf', yahooUrl: 'https://finance.yahoo.com/quote/XLF' },
    { ticker: 'XLI', name: 'Industrials', nameDE: 'Industrie', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/the-industrial-select-sector-spdr-fund-xli', yahooUrl: 'https://finance.yahoo.com/quote/XLI' },
    { ticker: 'XLK', name: 'Technology', nameDE: 'Technologie', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/the-technology-select-sector-spdr-fund-xlk', yahooUrl: 'https://finance.yahoo.com/quote/XLK' },
    { ticker: 'XLRE', name: 'Real Estate', nameDE: 'Immobilien', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/the-real-estate-select-sector-spdr-fund-xlre', yahooUrl: 'https://finance.yahoo.com/quote/XLRE' },
    { ticker: 'XLC', name: 'Communication Services', nameDE: 'Kommunikationsdienste', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/the-communication-services-select-sector-spdr-fund-xlc', yahooUrl: 'https://finance.yahoo.com/quote/XLC' }
  ],
  
  phases: {
    recession: {
      title: 'Rezession',
      subtitle: 'Winter',
      icon: '❄️',
      description: 'Wirtschaft schrumpft, Gewinne sinken, Kredite knapp',
      color: 'from-blue-600 to-blue-800',
      performance: [
        { ticker: 'XLP', return: 1, rank: 1 },
        { ticker: 'XLU', return: -2, rank: 2 },
        { ticker: 'XLV', return: -3, rank: 3 },
        { ticker: 'XLE', return: -4, rank: 4 },
        { ticker: 'XLY', return: -12, rank: 5 },
        { ticker: 'XLB', return: -12, rank: 6 },
        { ticker: 'XLF', return: -13, rank: 7 },
        { ticker: 'XLI', return: -15, rank: 8 },
        { ticker: 'XLK', return: -20, rank: 9 },
        { ticker: 'XLRE', return: -22, rank: 10 },
        { ticker: 'XLC', return: -8, rank: 11 }
      ]
    },
    recovery: {
      title: 'Erholung',
      subtitle: 'Frühling',
      icon: '🌱',
      description: 'Scharfe Erholung, niedrige Zinsen, wachsender Optimismus',
      color: 'from-green-500 to-green-700',
      performance: [
        { ticker: 'XLRE', return: 39, rank: 1 },
        { ticker: 'XLY', return: 33, rank: 2 },
        { ticker: 'XLB', return: 29, rank: 3 },
        { ticker: 'XLK', return: 28, rank: 4 },
        { ticker: 'XLI', return: 27, rank: 5 },
        { ticker: 'XLE', return: 27, rank: 6 },
        { ticker: 'XLF', return: 23, rank: 7 },
        { ticker: 'XLV', return: 21, rank: 8 },
        { ticker: 'XLP', return: 18, rank: 9 },
        { ticker: 'XLU', return: 15, rank: 10 },
        { ticker: 'XLC', return: 25, rank: 11 }
      ]
    },
    expansion: {
      title: 'Expansion',
      subtitle: 'Sommer',
      icon: '☀️',
      description: 'Längste Phase, moderates Wachstum, gesunde Profitabilität',
      color: 'from-yellow-500 to-orange-600',
      performance: [
        { ticker: 'XLK', return: 21, rank: 1 },
        { ticker: 'XLF', return: 19, rank: 2 },
        { ticker: 'XLRE', return: 18, rank: 3 },
        { ticker: 'XLY', return: 17, rank: 4 },
        { ticker: 'XLI', return: 16, rank: 5 },
        { ticker: 'XLE', return: 16, rank: 6 },
        { ticker: 'XLB', return: 13, rank: 7 },
        { ticker: 'XLP', return: 11, rank: 8 },
        { ticker: 'XLV', return: 11, rank: 9 },
        { ticker: 'XLU', return: 8, rank: 10 },
        { ticker: 'XLC', return: 14, rank: 11 }
      ]
    },
    slowdown: {
      title: 'Stagflation',
      subtitle: 'Herbst',
      icon: '🍂',
      description: 'Wachstum verlangsamt sich, steigende Inflation und Zinsen',
      color: 'from-orange-600 to-red-700',
      performance: [
        { ticker: 'XLV', return: 15, rank: 1 },
        { ticker: 'XLP', return: 15, rank: 2 },
        { ticker: 'XLF', return: 14, rank: 3 },
        { ticker: 'XLU', return: 12, rank: 4 },
        { ticker: 'XLI', return: 12, rank: 5 },
        { ticker: 'XLK', return: 10, rank: 6 },
        { ticker: 'XLE', return: 9, rank: 7 },
        { ticker: 'XLB', return: 7, rank: 8 },
        { ticker: 'XLY', return: 6, rank: 9 },
        { ticker: 'XLRE', return: 2, rank: 10 },
        { ticker: 'XLC', return: 11, rank: 11 }
      ]
    }
  }
}

const assetClassData = {
  assets: [
    { ticker: 'ACWI', name: 'Equities', nameDE: 'Aktien (Global)', category: 'Absolute', etfUrl: 'https://www.ishares.com/us/products/239600/ishares-msci-acwi-etf', yahooUrl: 'https://finance.yahoo.com/quote/ACWI' },
    { ticker: 'LQD', name: 'Credit', nameDE: 'Unternehmensanleihen', category: 'Absolute', etfUrl: 'https://www.ishares.com/us/products/239566/ishares-iboxx-investment-grade-corporate-bond-etf', yahooUrl: 'https://finance.yahoo.com/quote/LQD' },
    { ticker: 'DN1', name: 'Commodities', nameDE: 'Rohstoffe', category: 'Absolute', yahooUrl: 'https://finance.yahoo.com/quote/GD=F' },
    { ticker: 'TY1', name: 'Bonds', nameDE: 'Staatsanleihen', category: 'Absolute', yahooUrl: 'https://finance.yahoo.com/quote/ZN=F' },
    { ticker: 'TB1', name: 'Cash', nameDE: 'Bargeld/Geldmarkt', category: 'Absolute', yahooUrl: 'https://finance.yahoo.com/quote/ZQ=F' },
    { ticker: 'CRYPTO', name: 'Crypto', nameDE: 'Kryptowährungen', category: 'Absolute', yahooUrl: 'https://finance.yahoo.com/quote/BTC-USD' },
    { ticker: 'ES1', name: 'S&P 500', nameDE: 'S&P 500', category: 'Indices', yahooUrl: 'https://finance.yahoo.com/quote/ES=F' },
    { ticker: 'NQ1', name: 'NASDAQ 100', nameDE: 'NASDAQ 100', category: 'Indices', yahooUrl: 'https://finance.yahoo.com/quote/NQ=F' },
    { ticker: 'VG1', name: 'Euro STOXX 50', nameDE: 'Euro STOXX 50', category: 'Indices', yahooUrl: 'https://finance.yahoo.com/quote/%5ESTOXX50E' },
    { ticker: 'Z1', name: 'FTSE 100', nameDE: 'FTSE 100', category: 'Indices', yahooUrl: 'https://finance.yahoo.com/quote/%5EFTSE' },
    { ticker: 'SM1', name: 'Swiss Market Index', nameDE: 'Swiss Market Index', category: 'Indices', yahooUrl: 'https://finance.yahoo.com/quote/%5ESSMI' },
    { ticker: 'NKI', name: 'Nikkei 225', nameDE: 'Nikkei 225', category: 'Indices', yahooUrl: 'https://finance.yahoo.com/quote/NIY=F' },
    { ticker: 'FXI', name: 'MSCI China', nameDE: 'MSCI China', category: 'Indices', etfUrl: 'https://www.ishares.com/us/products/239536/ishares-china-largecap-etf', yahooUrl: 'https://finance.yahoo.com/quote/FXI' },
    { ticker: 'EEM', name: 'MSCI Emerging Markets', nameDE: 'MSCI Emerging Markets', category: 'Indices', etfUrl: 'https://www.ishares.com/us/products/239637/ishares-msci-emerging-markets-etf', yahooUrl: 'https://finance.yahoo.com/quote/EEM' },
    { ticker: 'EPP', name: 'MSCI Pacific ex-Japan', nameDE: 'MSCI Pacific ex-Japan', category: 'Indices', etfUrl: 'https://www.ishares.com/us/products/239538/ishares-msci-pacific-exjapan-etf', yahooUrl: 'https://finance.yahoo.com/quote/EPP' }
  ],
  
  performance: {
    spring: {
      ACWI: 'up', LQD: 'up', DN1: 'down', TY1: 'down', TB1: 'down', CRYPTO: 'up',
      ES1: 'up', NQ1: 'up', VG1: 'neutral', Z1: 'down', SM1: 'neutral',
      NKI: 'up', FXI: 'up', EEM: 'up', EPP: 'neutral'
    },
    summer: {
      ACWI: 'up', LQD: 'neutral', DN1: 'up', TY1: 'down', TB1: 'down', CRYPTO: 'up',
      ES1: 'neutral', NQ1: 'up', VG1: 'up', Z1: 'down', SM1: 'down',
      NKI: 'neutral', FXI: 'neutral', EEM: 'up', EPP: 'up'
    },
    fall: {
      ACWI: 'down', LQD: 'down', DN1: 'up', TY1: 'neutral', TB1: 'neutral', CRYPTO: 'neutral',
      ES1: 'down', NQ1: 'down', VG1: 'neutral', Z1: 'up', SM1: 'neutral',
      NKI: 'neutral', FXI: 'down', EEM: 'neutral', EPP: 'up'
    },
    winter: {
      ACWI: 'down', LQD: 'neutral', DN1: 'down', TY1: 'up', TB1: 'up', CRYPTO: 'down',
      ES1: 'neutral', NQ1: 'down', VG1: 'down', Z1: 'up', SM1: 'up',
      NKI: 'down', FXI: 'neutral', EEM: 'down', EPP: 'down'
    }
  }
}

const bondsForexData = {
  bonds: [
    { ticker: 'SHY', name: '1-3Y USTs', nameDE: 'Kurzlaufende US-Staatsanleihen', category: 'Bonds', etfUrl: 'https://www.ishares.com/us/products/239452/ishares-13-year-treasury-bond-etf', yahooUrl: 'https://finance.yahoo.com/quote/SHY' },
    { ticker: 'IEF', name: '7-10Y USTs', nameDE: 'Mittellaufende US-Staatsanleihen', category: 'Bonds', etfUrl: 'https://www.ishares.com/us/products/239456/ishares-710-year-treasury-bond-etf', yahooUrl: 'https://finance.yahoo.com/quote/IEF' },
    { ticker: 'TLT', name: '20Y+ USTs', nameDE: 'Langlaufende US-Staatsanleihen', category: 'Bonds', etfUrl: 'https://www.ishares.com/us/products/239454/ishares-20-year-treasury-bond-etf', yahooUrl: 'https://finance.yahoo.com/quote/TLT' },
    { ticker: 'HYG', name: 'US HY', nameDE: 'US High Yield Bonds', category: 'Bonds', etfUrl: 'https://www.ishares.com/us/products/239565/ishares-iboxx-high-yield-corporate-bond-etf', yahooUrl: 'https://finance.yahoo.com/quote/HYG' },
    { ticker: 'LQD', name: 'US IG', nameDE: 'US Investment Grade Bonds', category: 'Bonds', etfUrl: 'https://www.ishares.com/us/products/239566/ishares-iboxx-investment-grade-corporate-bond-etf', yahooUrl: 'https://finance.yahoo.com/quote/LQD' },
    { ticker: 'EMB', name: 'EM Bonds', nameDE: 'Emerging Markets Bonds', category: 'Bonds', etfUrl: 'https://www.ishares.com/us/products/239572/ishares-jp-morgan-usd-emerging-markets-bond-etf', yahooUrl: 'https://finance.yahoo.com/quote/EMB' },
    { ticker: 'TIP', name: 'US TIPS', nameDE: 'Inflationsgeschützte US-Anleihen', category: 'Bonds', etfUrl: 'https://www.ishares.com/us/products/239467/ishares-tips-bond-etf', yahooUrl: 'https://finance.yahoo.com/quote/TIP' }
  ],
  forex: [
    { ticker: 'DXY', name: 'DXY', nameDE: 'US Dollar Index', category: 'Forex', yahooUrl: 'https://finance.yahoo.com/quote/DX-Y.NYB' },
    { ticker: 'EUR', name: 'EUR', nameDE: 'Euro', category: 'Forex', yahooUrl: 'https://finance.yahoo.com/quote/6E=F' },
    { ticker: 'GBP', name: 'GBP', nameDE: 'Britisches Pfund', category: 'Forex', yahooUrl: 'https://finance.yahoo.com/quote/6B=F' },
    { ticker: 'JPY', name: 'JPY', nameDE: 'Japanischer Yen', category: 'Forex', yahooUrl: 'https://finance.yahoo.com/quote/6J=F' },
    { ticker: 'CHF', name: 'CHF', nameDE: 'Schweizer Franken', category: 'Forex', yahooUrl: 'https://finance.yahoo.com/quote/6S=F' },
    { ticker: 'CAD', name: 'CAD', nameDE: 'Kanadischer Dollar', category: 'Forex', yahooUrl: 'https://finance.yahoo.com/quote/6C=F' },
    { ticker: 'AUD', name: 'AUD', nameDE: 'Australischer Dollar', category: 'Forex', yahooUrl: 'https://finance.yahoo.com/quote/6A=F' },
    { ticker: 'KRW', name: 'KRW', nameDE: 'Südkoreanischer Won', category: 'Forex', yahooUrl: 'https://finance.yahoo.com/quote/KRW=X' },
    { ticker: 'MXN', name: 'MXN', nameDE: 'Mexikanischer Peso', category: 'Forex', yahooUrl: 'https://finance.yahoo.com/quote/MXN=X' },
    { ticker: 'BRL', name: 'BRL', nameDE: 'Brasilianischer Real', category: 'Forex', yahooUrl: 'https://finance.yahoo.com/quote/BRL=X' }
  ],
  
  performance: {
    spring: {
      SHY: 'neutral', IEF: 'down', TLT: 'down', HYG: 'up', LQD: 'up', EMB: 'up', TIP: 'down',
      DXY: 'down', EUR: 'up', GBP: 'up', JPY: 'down', CHF: 'down', CAD: 'up', AUD: 'up', KRW: 'up', MXN: 'neutral', BRL: 'neutral'
    },
    summer: {
      SHY: 'down', IEF: 'down', TLT: 'down', HYG: 'up', LQD: 'up', EMB: 'up', TIP: 'up',
      DXY: 'down', EUR: 'up', GBP: 'up', JPY: 'down', CHF: 'neutral', CAD: 'up', AUD: 'up', KRW: 'up', MXN: 'up', BRL: 'up'
    },
    fall: {
      SHY: 'down', IEF: 'neutral', TLT: 'neutral', HYG: 'down', LQD: 'down', EMB: 'down', TIP: 'up',
      DXY: 'up', EUR: 'down', GBP: 'neutral', JPY: 'down', CHF: 'neutral', CAD: 'neutral', AUD: 'down', KRW: 'down', MXN: 'up', BRL: 'up'
    },
    winter: {
      SHY: 'up', IEF: 'up', TLT: 'up', HYG: 'down', LQD: 'down', EMB: 'down', TIP: 'down',
      DXY: 'up', EUR: 'down', GBP: 'down', JPY: 'up', CHF: 'up', CAD: 'down', AUD: 'down', KRW: 'down', MXN: 'down', BRL: 'down'
    }
  }
}

const commoditiesData = {
  commodities: [
    { ticker: 'HG1', name: 'Copper', nameDE: 'Kupfer ("Doctor Copper")', category: 'Zyklisch', yahooUrl: 'https://finance.yahoo.com/quote/HG=F' },
    { ticker: 'CL1', name: 'WTI Crude', nameDE: 'Rohöl (WTI)', category: 'Zyklisch', yahooUrl: 'https://finance.yahoo.com/quote/CL=F' },
    { ticker: 'LB1', name: 'Lumber', nameDE: 'Bauholz', category: 'Zyklisch', yahooUrl: 'https://finance.yahoo.com/quote/LBR=F' },
    { ticker: 'CT1', name: 'Cotton', nameDE: 'Baumwolle', category: 'Zyklisch', yahooUrl: 'https://finance.yahoo.com/quote/CT=F' },
    { ticker: 'NG1', name: 'Natural Gas', nameDE: 'Erdgas', category: 'Zyklisch', yahooUrl: 'https://finance.yahoo.com/quote/NG=F' },
    { ticker: 'XAU', name: 'Gold', nameDE: 'Gold', category: 'Defensiv', yahooUrl: 'https://finance.yahoo.com/quote/GC=F' },
    { ticker: 'XAG', name: 'Silver', nameDE: 'Silber', category: 'Defensiv', yahooUrl: 'https://finance.yahoo.com/quote/SI=F' }
  ],
  
  performance: {
    spring: {
      HG1: 'up', CL1: 'up', LB1: 'up', CT1: 'up', NG1: 'down',
      XAU: 'down', XAG: 'neutral'
    },
    summer: {
      HG1: 'up', CL1: 'up', LB1: 'up', CT1: 'neutral', NG1: 'neutral',
      XAU: 'down', XAG: 'down'
    },
    fall: {
      HG1: 'down', CL1: 'neutral', LB1: 'down', CT1: 'down', NG1: 'up',
      XAU: 'neutral', XAG: 'down'
    },
    winter: {
      HG1: 'down', CL1: 'down', LB1: 'down', CT1: 'neutral', NG1: 'down',
      XAU: 'up', XAG: 'up'
    }
  }
}

const factorsData = {
  factors: [
    { ticker: 'SPLV', name: 'Min Vol', nameDE: 'Minimale Volatilität', category: 'Style Factors', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/invesco-sp-500-low-volatility-etf-splv', yahooUrl: 'https://finance.yahoo.com/quote/SPLV' },
    { ticker: 'SPHB', name: 'High Beta', nameDE: 'Hohe Volatilität', category: 'Style Factors', etfUrl: 'https://www.ssga.com/us/en/individual/etfs/funds/invesco-sp-500-high-beta-etf-sphb', yahooUrl: 'https://finance.yahoo.com/quote/SPHB' },
    { ticker: 'IWF', name: 'Growth', nameDE: 'Wachstum', category: 'Style Factors', etfUrl: 'https://www.ishares.com/us/products/239706/ishares-russell-1000-growth-etf', yahooUrl: 'https://finance.yahoo.com/quote/IWF' },
    { ticker: 'IWD', name: 'Value', nameDE: 'Substanzwert', category: 'Style Factors', etfUrl: 'https://www.ishares.com/us/products/239707/ishares-russell-1000-value-etf', yahooUrl: 'https://finance.yahoo.com/quote/IWD' },
    { ticker: 'IWM', name: 'Small Caps', nameDE: 'Kleine Unternehmen', category: 'Style Factors', etfUrl: 'https://www.ishares.com/us/products/239710/ishares-russell-2000-etf', yahooUrl: 'https://finance.yahoo.com/quote/IWM' },
    { ticker: 'URTH', name: 'Large Caps', nameDE: 'Große Unternehmen', category: 'Style Factors', etfUrl: 'https://www.ishares.com/us/products/239696/ishares-msci-world-etf', yahooUrl: 'https://finance.yahoo.com/quote/URTH' },
    { ticker: 'QUAL', name: 'Quality', nameDE: 'Qualität', category: 'Style Factors', etfUrl: 'https://www.ishares.com/us/products/256101/ishares-msci-usa-quality-factor-etf', yahooUrl: 'https://finance.yahoo.com/quote/QUAL' },
    { ticker: 'BTCUSD', name: 'Bitcoin', nameDE: 'Bitcoin', category: 'Crypto', yahooUrl: 'https://finance.yahoo.com/quote/BTC-USD' },
    { ticker: 'XETUSD', name: 'Ethereum', nameDE: 'Ethereum', category: 'Crypto', yahooUrl: 'https://finance.yahoo.com/quote/ETH-USD' },
    { ticker: 'XSOUSD', name: 'Solana', nameDE: 'Solana', category: 'Crypto', yahooUrl: 'https://finance.yahoo.com/quote/SOL-USD' },
    { ticker: 'ALTCOINS', name: 'Altcoins', nameDE: 'Altcoins', category: 'Crypto' }
  ],
  
  performance: {
    spring: {
      SPLV: 'down', SPHB: 'up', IWF: 'up', IWD: 'down', IWM: 'up', URTH: 'down', QUAL: 'down',
      BTCUSD: 'up', XETUSD: 'up', XSOUSD: 'up', ALTCOINS: 'up'
    },
    summer: {
      SPLV: 'down', SPHB: 'up', IWF: 'neutral', IWD: 'up', IWM: 'up', URTH: 'neutral', QUAL: 'down',
      BTCUSD: 'up', XETUSD: 'up', XSOUSD: 'up', ALTCOINS: 'up'
    },
    fall: {
      SPLV: 'up', SPHB: 'down', IWF: 'down', IWD: 'up', IWM: 'down', URTH: 'up', QUAL: 'down',
      BTCUSD: 'down', XETUSD: 'down', XSOUSD: 'down', ALTCOINS: 'down'
    },
    winter: {
      SPLV: 'up', SPHB: 'down', IWF: 'neutral', IWD: 'down', IWM: 'down', URTH: 'neutral', QUAL: 'up',
      BTCUSD: 'down', XETUSD: 'down', XSOUSD: 'down', ALTCOINS: 'down'
    }
  }
}

function getPerformanceColor(returnValue) {
  if (returnValue >= 20) return 'bg-green-600 text-white'
  if (returnValue >= 10) return 'bg-green-500 text-white'
  if (returnValue >= 5) return 'bg-green-400 text-white'
  if (returnValue >= 0) return 'bg-green-300 text-gray-900'
  if (returnValue >= -5) return 'bg-orange-300 text-gray-900'
  if (returnValue >= -10) return 'bg-orange-500 text-white'
  return 'bg-red-600 text-white'
}

function getPerformanceIcon(returnValue) {
  if (returnValue > 0) return <TrendingUp className="w-4 h-4" />
  if (returnValue < 0) return <TrendingDown className="w-4 h-4" />
  return <Minus className="w-4 h-4" />
}

function getAssetPerformanceColor(performance) {
  if (performance === 'up') return 'bg-green-500 text-white'
  if (performance === 'down') return 'bg-red-500 text-white'
  return 'bg-yellow-500 text-gray-900'
}

function getAssetPerformanceIcon(performance) {
  if (performance === 'up') return <TrendingUp className="w-5 h-5" />
  if (performance === 'down') return <TrendingDown className="w-5 h-5" />
  return <ArrowRight className="w-5 h-5" />
}


function CommoditiesTable() {
  const phases = ['spring', 'summer', 'fall', 'winter']
  const phaseLabels = {
    spring: { title: 'Erholung', sub: 'Frühling' },
    summer: { title: 'Expansion', sub: 'Sommer' },
    fall: { title: 'Verlangsamung', sub: 'Herbst' },
    winter: { title: 'Rezession', sub: 'Winter' }
  }
  
  const cyclicalCommodities = commoditiesData.commodities.filter(c => c.category === 'Zyklisch')
  const defensiveCommodities = commoditiesData.commodities.filter(c => c.category === 'Defensiv')
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-900">Commodities</h2>
        <p className="text-sm text-slate-500">Performance ausgewählter Rohstoffe (vs. GSCI)</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Rohstoff</th>
              {phases.map(phase => (
                <th key={phase} className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div>{phaseLabels[phase].title}</div>
                  <div className="text-[10px] font-normal opacity-70">{phaseLabels[phase].sub}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="bg-slate-50/50">
              <td colSpan={5} className="px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-y border-slate-100">
                Zyklische Rohstoffe
              </td>
            </tr>
            {cyclicalCommodities.map(commodity => (
              <tr key={commodity.ticker} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{commodity.ticker}</div>
                      <div className="text-xs text-slate-500">{commodity.nameDE}</div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {commodity.etfUrl && (
                        <a href={commodity.etfUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-blue-600 p-1"
                           title="ETF Holdings">
                          <Info className="w-3 h-3" />
                        </a>
                      )}
                      {commodity.yahooUrl && (
                        <a href={commodity.yahooUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-emerald-600 p-1"
                           title="Chart">
                          <TrendingUpIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                {phases.map(phase => {
                  const perf = commoditiesData.performance[phase][commodity.ticker]
                  return (
                    <td key={phase} className="px-6 py-3 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded ${getAssetPerformanceColor(perf)}`}>
                        {getAssetPerformanceIcon(perf)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
            <tr className="bg-slate-50/50">
              <td colSpan={5} className="px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-y border-slate-100">
                Defensive Rohstoffe (Edelmetalle)
              </td>
            </tr>
            {defensiveCommodities.map(commodity => (
              <tr key={commodity.ticker} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{commodity.ticker}</div>
                      <div className="text-xs text-slate-500">{commodity.nameDE}</div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {commodity.etfUrl && (
                        <a href={commodity.etfUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-blue-600 p-1"
                           title="ETF Holdings">
                          <Info className="w-3 h-3" />
                        </a>
                      )}
                      {commodity.yahooUrl && (
                        <a href={commodity.yahooUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-emerald-600 p-1"
                           title="Chart">
                          <TrendingUpIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                {phases.map(phase => {
                  const perf = commoditiesData.performance[phase][commodity.ticker]
                  return (
                    <td key={phase} className="px-6 py-3 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded ${getAssetPerformanceColor(perf)}`}>
                        {getAssetPerformanceIcon(perf)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-slate-50 border-t border-slate-200 p-4">
        <p className="text-xs text-slate-500">
          <strong>Hinweis:</strong> Diese Tabelle zeigt nur Rohstoffe mit klarem zyklischen Muster. 
          Agrarrohstoffe wurden ausgeschlossen, da saisonale Muster (Ernte-Zyklen) oft die Business-Cycle-Effekte überlagern.
        </p>
      </div>
    </div>
  )
}

function BondsForexTable() {
  const phases = ['spring', 'summer', 'fall', 'winter']
  const phaseLabels = {
    spring: { title: 'Erholung', sub: 'Frühling' },
    summer: { title: 'Expansion', sub: 'Sommer' },
    fall: { title: 'Verlangsamung', sub: 'Herbst' },
    winter: { title: 'Rezession', sub: 'Winter' }
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-900">Bonds & Forex</h2>
        <p className="text-sm text-slate-500">Performance verschiedener Anleihen-Typen und Währungen</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Asset</th>
              {phases.map(phase => (
                <th key={phase} className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div>{phaseLabels[phase].title}</div>
                  <div className="text-[10px] font-normal opacity-70">{phaseLabels[phase].sub}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="bg-slate-50/50">
              <td colSpan={5} className="px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-y border-slate-100">
                Bonds (vs. JPM GBI)
              </td>
            </tr>
            {bondsForexData.bonds.map(bond => (
              <tr key={bond.ticker} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{bond.ticker}</div>
                      <div className="text-xs text-slate-500">{bond.nameDE}</div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {bond.etfUrl && (
                        <a href={bond.etfUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-blue-600 p-1"
                           title="ETF Holdings">
                          <Info className="w-3 h-3" />
                        </a>
                      )}
                      {bond.yahooUrl && (
                        <a href={bond.yahooUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-emerald-600 p-1"
                           title="Chart">
                          <TrendingUpIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                {phases.map(phase => {
                  const perf = bondsForexData.performance[phase][bond.ticker]
                  return (
                    <td key={phase} className="px-6 py-3 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded ${getAssetPerformanceColor(perf)}`}>
                        {getAssetPerformanceIcon(perf)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
            <tr className="bg-slate-50/50">
              <td colSpan={5} className="px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-y border-slate-100">
                Forex (vs. USD)
              </td>
            </tr>
            {bondsForexData.forex.map(currency => (
              <tr key={currency.ticker} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{currency.ticker}</div>
                      <div className="text-xs text-slate-500">{currency.nameDE}</div>
                    </div>
                    {currency.yahooUrl && (
                      <a href={currency.yahooUrl} target="_blank" rel="noopener noreferrer" 
                         className="text-slate-400 hover:text-emerald-600 p-1"
                         title="Chart">
                        <TrendingUpIcon className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </td>
                {phases.map(phase => {
                  const perf = bondsForexData.performance[phase][currency.ticker]
                  return (
                    <td key={phase} className="px-6 py-3 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded ${getAssetPerformanceColor(perf)}`}>
                        {getAssetPerformanceIcon(perf)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AssetClassTable() {
  const phases = ['spring', 'summer', 'fall', 'winter']
  const phaseLabels = {
    spring: { title: 'Erholung', sub: 'Frühling' },
    summer: { title: 'Expansion', sub: 'Sommer' },
    fall: { title: 'Verlangsamung', sub: 'Herbst' },
    winter: { title: 'Rezession', sub: 'Winter' }
  }
  
  const absoluteAssets = assetClassData.assets.filter(a => a.category === 'Absolute')
  const indexAssets = assetClassData.assets.filter(a => a.category === 'Indices')
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-900">Asset-Klassen-Rotation</h2>
        <p className="text-sm text-slate-500">Performance-Erwartung verschiedener Asset-Klassen und Indizes</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Asset</th>
              {phases.map(phase => (
                <th key={phase} className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div>{phaseLabels[phase].title}</div>
                  <div className="text-[10px] font-normal opacity-70">{phaseLabels[phase].sub}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="bg-slate-50/50">
              <td colSpan={5} className="px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-y border-slate-100">
                Absolute Asset-Klassen
              </td>
            </tr>
            {absoluteAssets.map(asset => (
              <tr key={asset.ticker} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{asset.ticker}</div>
                      <div className="text-xs text-slate-500">{asset.nameDE}</div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {asset.etfUrl && (
                        <a href={asset.etfUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-blue-600 p-1"
                           title="ETF Holdings">
                          <Info className="w-3 h-3" />
                        </a>
                      )}
                      {asset.yahooUrl && (
                        <a href={asset.yahooUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-emerald-600 p-1"
                           title="Chart">
                          <TrendingUpIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                {phases.map(phase => {
                  const perf = assetClassData.performance[phase][asset.ticker]
                  return (
                    <td key={phase} className="px-6 py-3 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded ${getAssetPerformanceColor(perf)}`}>
                        {getAssetPerformanceIcon(perf)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
            <tr className="bg-slate-50/50">
              <td colSpan={5} className="px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-y border-slate-100">
                Equity-Indizes (vs. MSCI ACWI)
              </td>
            </tr>
            {indexAssets.map(asset => (
              <tr key={asset.ticker} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{asset.ticker}</div>
                      <div className="text-xs text-slate-500">{asset.nameDE}</div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {asset.etfUrl && (
                        <a href={asset.etfUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-blue-600 p-1"
                           title="ETF Holdings">
                          <Info className="w-3 h-3" />
                        </a>
                      )}
                      {asset.yahooUrl && (
                        <a href={asset.yahooUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-emerald-600 p-1"
                           title="Chart">
                          <TrendingUpIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                {phases.map(phase => {
                  const perf = assetClassData.performance[phase][asset.ticker]
                  return (
                    <td key={phase} className="px-6 py-3 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded ${getAssetPerformanceColor(perf)}`}>
                        {getAssetPerformanceIcon(perf)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PerformanceCard({ phase, phaseKey }) {
  const sortedPerformance = [...phase.performance].sort((a, b) => b.return - a.return)
  
  // Professional color mapping for headers
  const headerColors = {
    recession: 'border-blue-500 bg-blue-50',
    recovery: 'border-emerald-500 bg-emerald-50',
    expansion: 'border-amber-500 bg-amber-50',
    slowdown: 'border-orange-500 bg-orange-50'
  }

  const textColors = {
    recession: 'text-blue-700',
    recovery: 'text-emerald-700',
    expansion: 'text-amber-700',
    slowdown: 'text-orange-700'
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
      <div className={`p-6 border-l-4 ${headerColors[phaseKey] || 'border-slate-500 bg-slate-50'}`}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className={`text-xl font-bold ${textColors[phaseKey] || 'text-slate-900'}`}>{phase.title}</h2>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">{phase.subtitle}</p>
          </div>
          <span className="text-2xl opacity-80">{phase.icon}</span>
        </div>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{phase.description}</p>
      </div>
      
      <div className="bg-slate-50 border-y border-slate-100 px-4 py-2">
        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
          Sektor-Performance (Historisch)
        </p>
      </div>
      
      <div className="p-4 flex-1">
        <div className="space-y-1">
          {sortedPerformance.map((item, index) => {
            const sector = sectorData.sectors.find(s => s.ticker === item.ticker)
            return (
              <div 
                key={item.ticker}
                className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
              >
                <div className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-xs font-bold text-slate-500">
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="truncate">
                      <span className="font-bold text-slate-900 text-sm mr-2">{sector.ticker}</span>
                      <span className="text-xs text-slate-500 truncate">{sector.nameDE}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {sector.etfUrl && (
                      <a href={sector.etfUrl} target="_blank" rel="noopener noreferrer" 
                         className="text-slate-400 hover:text-blue-600 p-1"
                         title="ETF Holdings">
                        <Info className="w-3 h-3" />
                      </a>
                    )}
                    {sector.yahooUrl && (
                      <a href={sector.yahooUrl} target="_blank" rel="noopener noreferrer" 
                         className="text-slate-400 hover:text-emerald-600 p-1"
                         title="Chart">
                        <TrendingUpIcon className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${getPerformanceColor(item.return)}`}>
                    {getPerformanceIcon(item.return)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ComparisonTable() {
  const phases = ['recovery', 'expansion', 'slowdown', 'recession']
  const phaseLabels = {
    recovery: { title: 'Erholung', sub: 'Frühling' },
    expansion: { title: 'Expansion', sub: 'Sommer' },
    slowdown: { title: 'Verlangsamung', sub: 'Herbst' },
    recession: { title: 'Rezession', sub: 'Winter' }
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-900">Sektor-Vergleich</h2>
        <p className="text-sm text-slate-500">Performance-Matrix über alle Wirtschaftsphasen</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Sektor</th>
              {phases.map(phase => (
                <th key={phase} className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div>{phaseLabels[phase].title}</div>
                  <div className="text-[10px] font-normal opacity-70">{phaseLabels[phase].sub}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sectorData.sectors.map(sector => (
              <tr key={sector.ticker} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{sector.ticker}</div>
                      <div className="text-xs text-slate-500">{sector.nameDE}</div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {sector.etfUrl && (
                        <a href={sector.etfUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-blue-600 p-1"
                           title="ETF Holdings">
                          <Info className="w-3 h-3" />
                        </a>
                      )}
                      {sector.yahooUrl && (
                        <a href={sector.yahooUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-emerald-600 p-1"
                           title="Chart">
                          <TrendingUpIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                {phases.map(phaseKey => {
                  const perf = sectorData.phases[phaseKey].performance.find(p => p.ticker === sector.ticker)
                  return (
                    <td key={phaseKey} className="px-6 py-3 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded ${getPerformanceColor(perf.return)}`}>
                        {getPerformanceIcon(perf.return)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


function FactorsTable() {
  const phases = ['spring', 'summer', 'fall', 'winter']
  const phaseLabels = {
    spring: { title: 'Erholung', sub: 'Frühling' },
    summer: { title: 'Expansion', sub: 'Sommer' },
    fall: { title: 'Verlangsamung', sub: 'Herbst' },
    winter: { title: 'Rezession', sub: 'Winter' }
  }
  
  const styleFactors = factorsData.factors.filter(f => f.category === 'Style Factors')
  const cryptoAssets = factorsData.factors.filter(f => f.category === 'Crypto')
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-900">Faktoren & Krypto</h2>
        <p className="text-sm text-slate-500">Performance von Faktoren und Kryptowährungen</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Asset</th>
              {phases.map(phase => (
                <th key={phase} className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div>{phaseLabels[phase].title}</div>
                  <div className="text-[10px] font-normal opacity-70">{phaseLabels[phase].sub}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="bg-slate-50/50">
              <td colSpan={5} className="px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-y border-slate-100">
                Style Factors (vs. MSCI ACWI)
              </td>
            </tr>
            {styleFactors.map(factor => (
              <tr key={factor.ticker} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{factor.ticker}</div>
                      <div className="text-xs text-slate-500">{factor.nameDE}</div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {factor.etfUrl && (
                        <a href={factor.etfUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-blue-600 p-1"
                           title="ETF Holdings">
                          <Info className="w-3 h-3" />
                        </a>
                      )}
                      {factor.yahooUrl && (
                        <a href={factor.yahooUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-emerald-600 p-1"
                           title="Chart">
                          <TrendingUpIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                {phases.map(phase => {
                  const perf = factorsData.performance[phase][factor.ticker]
                  return (
                    <td key={phase} className="px-6 py-3 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded ${getAssetPerformanceColor(perf)}`}>
                        {getAssetPerformanceIcon(perf)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
            <tr className="bg-slate-50/50">
              <td colSpan={5} className="px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-y border-slate-100">
                Kryptowährungen (vs. CTMFC) ⚠️
              </td>
            </tr>
            {cryptoAssets.map(crypto => (
              <tr key={crypto.ticker} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{crypto.ticker === 'ALTCOINS' ? '-' : crypto.ticker}</div>
                      <div className="text-xs text-slate-500">{crypto.nameDE}</div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {crypto.yahooUrl && (
                        <a href={crypto.yahooUrl} target="_blank" rel="noopener noreferrer" 
                           className="text-slate-400 hover:text-emerald-600 p-1"
                           title="Chart">
                          <TrendingUpIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                {phases.map(phase => {
                  const perf = factorsData.performance[phase][crypto.ticker]
                  return (
                    <td key={phase} className="px-6 py-3 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded ${getAssetPerformanceColor(perf)}`}>
                        {getAssetPerformanceIcon(perf)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-slate-50 border-t border-slate-200 p-4">
        <p className="text-xs text-slate-500 mb-2">
          <strong>⚠️ Hinweis zu Kryptowährungen:</strong> Crypto-Assets haben noch keine vollständige Rezession erlebt. 
          Die Darstellung basiert auf begrenzten Daten. Bitcoin-Halving-Zyklen (4 Jahre) und Crypto-interne Rotation 
          können Business-Cycle-Effekte überlagern. Crypto verhält sich primär als Risk-On-Asset ähnlich wie Tech-Aktien.
        </p>
        <p className="text-xs text-slate-500">
          <strong>ℹ️ Faktoren:</strong> Alle Faktoren-Daten sind validiert und basieren auf langfristigen historischen Analysen.
        </p>
      </div>
    </div>
  )
}

function App() {
  const [view, setView] = useState('sectors-cards')
  
  // Load saved region phases from localStorage or use defaults
  const [regionPhases, setRegionPhases] = useState(() => {
    const saved = localStorage.getItem('regionPhases')
    return saved ? JSON.parse(saved) : {
      usa: 'expansion',
      eu: 'slowdown',
      asia: 'expansion',
      japan: 'slowdown'
    }
  })
  
  const updateRegionPhase = (region, phase) => {
    const newPhases = { ...regionPhases, [region]: phase }
    setRegionPhases(newPhases)
    localStorage.setItem('regionPhases', JSON.stringify(newPhases))
  }

  return (
    <PasswordProtection>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        {/* Top Navigation Bar */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                <span className="font-bold text-lg tracking-tight">Makro-Dashboard</span>
              </div>
              <div className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
                v2.0 Professional
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          
          {/* Disclaimer Banner */}
          <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Haftungsausschluss:</strong> Alle Angaben dienen ausschließlich Lehrzwecken und stellen keine Anlageberatung dar. Investitionen erfolgen auf eigenes Risiko.
            </p>
          </div>

          {/* Phase Definition Legend - Growth/Inflation Matrix */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Wirtschaftsphasen & Indikatoren</h2>
                <p className="text-sm text-slate-500">Zusammenhang zwischen Wachstum und Inflation in den vier Zyklus-Phasen</p>
              </div>
            </div>

            {/* Explanatory Graphic */}
            <div className="mb-8 bg-slate-50 rounded-lg p-4 border border-slate-100 flex justify-center">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/93727259/qYFZMjvyERSxyVNg.png" 
                alt="Die vier Jahreszeiten der Geldanlage" 
                className="max-w-full h-auto rounded shadow-sm max-h-[500px] object-contain"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Erholung */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="min-w-[140px]">
                  <div className="font-bold text-emerald-700">Erholung</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Frühling</div>
                </div>
                <div className="min-w-[120px]">
                  <div className="font-bold text-slate-800">Goldilocks (G)</div>
                </div>
                <div className="text-sm text-slate-600">
                  Wachstum steigt (<span className="text-emerald-600 font-bold">↑</span>), Inflation sinkt (<span className="text-emerald-600 font-bold">↓</span>). Die Wirtschaft erwacht, ohne zu überhitzen.
                </div>
              </div>

              {/* Expansion */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="min-w-[140px]">
                  <div className="font-bold text-amber-700">Expansion</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Sommer</div>
                </div>
                <div className="min-w-[120px]">
                  <div className="font-bold text-slate-800">Reflation (R)</div>
                </div>
                <div className="text-sm text-slate-600">
                  Wachstum steigt (<span className="text-emerald-600 font-bold">↑</span>), Inflation steigt (<span className="text-red-600 font-bold">↑</span>). Die Wirtschaft läuft auf Hochtouren, Preise ziehen an.
                </div>
              </div>

              {/* Verlangsamung */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="min-w-[140px]">
                 <div className="font-bold text-red-700">Stagflation</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Herbst</div>
                </div>
                <div className="min-w-[120px]">
                  <div className="font-bold text-slate-800">Stagflation (S)</div>
                </div>
                <div className="text-sm text-slate-600">
                  Wachstum sinkt (<span className="text-red-600 font-bold">↓</span>), Inflation steigt (<span className="text-red-600 font-bold">↑</span>). Die Dynamik lässt nach, aber die Preise bleiben (noch) hoch.
                </div>
              </div>

              {/* Rezession */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="min-w-[140px]">
                  <div className="font-bold text-blue-700">Rezession</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Winter</div>
                </div>
                <div className="min-w-[120px]">
                  <div className="font-bold text-slate-800">Deflation (D)</div>
                </div>
                <div className="text-sm text-slate-600">
                  Wachstum sinkt (<span className="text-red-600 font-bold">↓</span>), Inflation sinkt (<span className="text-emerald-600 font-bold">↓</span>). Die Wirtschaft schrumpft, die Nachfrage lässt nach.
                </div>
              </div>
            </div>
          </div>

          {/* Global Cycle Traffic Light - Professional Redesign */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Globale Wirtschaftszyklen</h2>
                <p className="text-sm text-slate-500">Aktuelle globale Einschätzung</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
               { key: 'global', name: 'Wirtschaftszyklus global', code: 'GL', phase: import.meta.env.VITE_MARKET_PHASE || 'slowdown' },
                              ].map(region => {
                // Hardcoded phase selection - Central Admin Control
                const currentPhase = region.phase
                
                const phaseConfig = {
                  recession: { label: 'Rezession', sub: 'Winter', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                  inflation: { label: 'Inflation', sub: 'Verlangsamung', color: 'bg-red-50 text-red-700 border-red-200' },
                  expansion: { label: 'Expansion', sub: 'Sommer', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                  slowdown: { label: 'Stagflation', sub: 'Herbst', color: 'bg-red-50 text-red-700 border-red-200' },
                }
                
                return (
                  <div key={region.key} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-slate-700">{region.name}</span>
                      <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{region.code}</span>
                    </div>
                    
                    <div className={`rounded-md p-3 text-center border ${phaseConfig[currentPhase].color}`}>
                      <div className="font-bold text-lg">{phaseConfig[currentPhase].label}</div>
                      <div className="text-xs opacity-80 uppercase tracking-wider">{phaseConfig[currentPhase].sub}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          {/* Community Info Box */}
<div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-sm max-w-4xl mx-auto shadow-sm">
  <h3 className="font-bold text-slate-900 mb-2 flex items-center">
    <span className="mr-2">💡</span> Hinweis zum neuen Dashboard-Fokus
  </h3>
  <p className="mb-3">
    Wir haben die Ansicht auf einen <strong>globalen Wirtschaftszyklus</strong> konzentriert. In einer eng verzahnten Weltwirtschaft liefern isolierte Regionalbetrachtungen oft nur "Rauschen" – der globale Blick bietet uns ein klareres, verlässlicheres Signal für strategische Entscheidungen.
  </p>
  <div className="p-3 bg-amber-50 rounded border border-amber-100 text-amber-800 italic">
    <strong>Hinweis zur Ladezeit:</strong> Da das Dashboard von manus.ai auf eine neue Infrastruktur umgezogen ist, kann der erste Aufruf ca. 30-60 Sekunden dauern. Bitte lass dich von technischen Meldungen oder einer schlichten Seite beim Laden nicht irritieren – das System "weckt" den Server gerade auf. Danke für deine Geduld!
  </div>
</div>
          {/* Main Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-1">
            {[
              { id: 'sectors-cards', label: 'Sektoren (Phasen)' },
              { id: 'sectors-table', label: 'Sektoren (Vergleich)' },
              { id: 'assets', label: 'Asset-Klassen' },
              { id: 'bonds-forex', label: 'Bonds & Forex' },
              { id: 'commodities', label: 'Rohstoffe' },
              { id: 'factors', label: 'Faktoren & Krypto' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className={`px-4 py-2.5 rounded-t-lg font-medium text-sm transition-all relative top-[1px] ${
                  view === tab.id 
                    ? 'bg-white text-slate-900 border-x border-t border-slate-200 shadow-sm z-10' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Datenbasis: Historische Durchschnittswerte (7 Rezessionen, 7 Erholungsphasen, 12 Expansionen).</span>
            </p>
          </div>

        {/* Content */}
        {view === 'sectors-cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PerformanceCard phase={sectorData.phases.recovery} phaseKey="recovery" />
            <PerformanceCard phase={sectorData.phases.expansion} phaseKey="expansion" />
            <PerformanceCard phase={sectorData.phases.slowdown} phaseKey="slowdown" />
            <PerformanceCard phase={sectorData.phases.recession} phaseKey="recession" />
          </div>
        )}
        
        {view === 'sectors-table' && <ComparisonTable />}
        
        {view === 'assets' && <AssetClassTable />}
        
        {view === 'bonds-forex' && <BondsForexTable />}
        
        {view === 'commodities' && <CommoditiesTable />}
        
        {view === 'factors' && <FactorsTable />}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm space-y-2">
          <p className="font-semibold">
            💡 Die Grafik ist ein solides Framework, sollte aber mit Sektor-Analyse und makroökonomischen Indikatoren kombiniert werden.
          </p>
          <p className="text-gray-500">
            Makroanalyse für Privatanleger | Erstellt am 15. Oktober 2025
          </p>
        </div>
        </div>
      </div>
    </PasswordProtection>
  )
}

export default App


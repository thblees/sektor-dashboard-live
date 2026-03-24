# Dashboard TODO

## Completed
- [x] Initialize webdev project
- [x] Copy corrected App.jsx with proper phase order
- [x] Install lucide-react dependency
- [x] Build and test dashboard
- [x] Save checkpoint for deployment
- [x] Provide deployment URL to user

## Bugs
- [x] Fix comparison table phase order (currently showing Rezession first instead of Erholung)

## New Features
- [x] Implement password protection for dashboard access
- [x] Create instructions for monthly password updates

## New Features (In Progress)
- [x] Add ETF provider links (holdings page) for all assets
- [x] Add Yahoo Finance chart links for all assets
- [x] Implement link icons in the UI

## New Tasks
- [x] Add ETF and chart links to Sektoren Phasen-Ansicht cards
- [x] Add ETF and chart links to Rohstoffe table
- [x] Add ETF and chart links to Faktoren & Krypto table
- [x] Update currency Yahoo Finance URLs to use futures symbols (JPY=F instead of JPY=X)

## Bug Fixes
- [x] Add missing links to Faktoren (SPLV, SPHB, IWF, IWD, IWM, URTH, QUAL)
- [x] Add missing links to Kryptowährungen (BTCUSD, XETUSD, XSOUSD)
- [x] Add missing links to Asset-Klassen (ACWI, LQD, DN1, TY1, TB1, CRYPTO)
- [x] Add missing links to Equity-Indizes (ES1, NQ1, VG1, Z1, SM1, NKI, FXI, EEM, EPP)
- [x] Add missing links to Rohstoffe (HG1, CL1, LB1, CT1, NG1, XAU, XAG)
- [x] Remove "versus USD" text from currency descriptions

## New Bug Fixes
- [x] Fix incorrect Yahoo Finance URL for Z1 (FTSE 100)
- [x] Fix incorrect Yahoo Finance URL for VG1 (Euro STOXX 50)
- [x] Fix incorrect Yahoo Finance URL for DN1 (Commodities)
- [x] Fix or remove LB1 (Bauholz/Lumber) - Yahoo Finance link not working
- [x] Remove data sources citation (Fidelity, Visual Capitalist, Pring-Turner Model, Real Vision) from dashboard
- [x] Remove all percentage values from dashboard (keep only performance indicators/arrows)
- [x] Update "Jetzt anmelden" link to redirect to Ghost signup page: https://meine-geldseite-makrokompass.ghost.io/ghost/#/site
- [x] Add "Jetzt anmelden" link below "Zugang freischalten" button on password screen
- [x] Add phase definition legend (Growth/Inflation Matrix) to the top of the dashboard
- [x] Restart development server to restore access
- [x] Remove "Asien (ex-Japan)" region from the global cycle traffic light section
- [x] Retrieve current dashboard password from PasswordProtection.jsx
- [x] Insert "Die vier Jahreszeiten der Geldanlage" graphic into the dashboard header
- [x] Update dashboard password to "XR1TB-2026-VP"
- [x] Analyze App.jsx to determine if phase selection is interactive or static
- [x] Hardcode USA, EU, and Japan to "Recovery" phase and remove interactive buttons
- [x] Update Eurozone (EU) phase from 'recovery' to 'recession' in App.jsx
- [x] Revert the addition of the ETF Momentum Ranking link
- [x] Perform advanced server diagnostics (curl, logs, port check)
- [x] Expose port 3000 to provide alternative access URL
- [x] Restart development server to restore access
- [x] Restart development server to restore access
- [x] Update USA, Europe, and Japan to "Recovery" (Spring) phase
- [x] Create checkpoint to enable publishing of updated regional phases
- [x] Upload seasons-graphic.png to CDN and update App.jsx
- [x] Update dashboard password to "a56BV-39"
- [x] Update Europe phase to "Inflation" (slowdown) in App.jsx

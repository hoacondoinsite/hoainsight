# HOACONDInsight™ Operating System v5.2
## Hoa Condo Insight LLC · 61 N Lakeshore Drive · Hypoluxo, Florida 33462
## peter@hoacondinsight.com · hoacondinsight.com

---

## PATENT STATUS
- App 1: U.S. Patent Application No. 64/081,022 — Filed June 2, 2026
- App 2: Filed June 4, 2026 — **Update number tonight in src/lib/patentConfig.js**
- Attorney: Fish & Richardson · NewMatters@fr.com · 617-542-5070
- CRITICAL DEADLINES: June 2, 2027 (App 1) · June 4, 2027 (App 2)

---

## HOW TO UPLOAD TO LOVABLE

### Step 1 — Upload this ZIP
- Go to your Lovable project
- Drag this ZIP file in or use the upload button
- Lovable unpacks everything automatically

### Step 2 — Set Environment Variables (Lovable > Settings > Env Vars)
Copy from .env.example and fill in your real values:
  VITE_SUPABASE_URL          = your Supabase project URL
  VITE_SUPABASE_ANON_KEY     = your Supabase anon key
  VITE_OPENAI_API_KEY        = your OpenAI key
  VITE_STRIPE_PUBLISHABLE_KEY= pk_test_... (test) or pk_live_... (live)
  VITE_RESEND_API_KEY        = your Resend key
  VITE_DEPLOYMENT_STATE      = TESTING  ← start here
  VITE_FOUNDER_PIN           = change from default immediately

### Step 3 — Deploy
- Lovable auto-installs npm packages from package.json
- Click Deploy / Publish in Lovable
- Your site is live at your Lovable URL or custom domain

---

## TEST MODE — HOW IT WORKS
Set VITE_DEPLOYMENT_STATE=TESTING in environment variables.
- All orders are accepted but NO real charges are made
- Test credit card: 4242 4242 4242 4242 · any future expiry · any CVV
- All reports are watermarked TEST MODE
- Emails go to test log only (no real emails sent)
- All dashboard views are available: buyer, realtor, lender, PM, attorney, admin

To switch to LIVE: Change VITE_DEPLOYMENT_STATE=LIVE and redeploy.

---

## EVERY USER WORKSPACE — WHERE TO FIND EACH

### PUBLIC (what the internet sees)
  /                        → Landing page (public home)
  /order                   → Order flow (buyer / realtor / lender / title / attorney)
  /features                → Platform features
  /how-it-works            → How It Works
  /pricing                 → Pricing
  /partners                → Partner / referral program
  /lenders                 → Enterprise lender page
  /white-label             → White label program
  /association-portal      → HOA/PM portal info
  /attorneys/apply         → Attorney network application
  /sample-report           → Sample compliance report
  /contact                 → Contact form
  /status                  → Platform status page
  /legal/terms             → Terms of Service
  /legal/privacy           → Privacy Policy
  /legal/disclaimer        → Disclaimer
  /legal/cancellation      → Cancellation Policy

### CUSTOMER DASHBOARDS (after login)
  /dashboard               → Buyer/customer dashboard
  /lenders/dashboard       → Lender loan officer dashboard
  /attorneys/dashboard     → Attorney certification dashboard

### ADMIN / OS (Founder access)
  /admin                   → Admin overview (all 29 modules)
  /admin/ip-patents        → IP & Patents (both applications + update tonight button)
  /admin/deployment        → Deployment control (TESTING ↔ LIVE)
  /admin/analyses          → All HOA analyses
  /admin/attorneys         → Attorney network management
  /admin/lenders           → Enterprise lender accounts
  /admin/finance           → Revenue, payouts, commissions
  /admin/partners          → Partner/referral program
  /admin/communications    → Permanent communications archive
  /admin/security          → Backup status, 8 security monitors
  /admin/legal             → Legal documents
  /admin/legal-compliance  → 50-state daily compliance scan
  /admin/living-ai         → Living AI Command Center
  /admin/marketing         → Marketing studio
  /admin/white-label       → White label client management
  /admin/settings          → All integrations (47 toggles)
  /admin/sop-validator     → 20-check vendor validation
  /admin/system-updates    → Technology update tracker
  /admin/outreach          → Sales outreach
  /admin/pe                → PE/exit preparation

### FOUNDER ONLY
  /founder                 → Founder master dashboard

---

## UPDATE TONIGHT — SECOND PATENT NUMBER
1. Open src/lib/patentConfig.js
2. Find: shortNumber: '[UPDATE_TONIGHT]'
3. Replace with your actual USPTO application number
4. Change: confirmed: false  →  confirmed: true
5. Save and redeploy to Lovable
All pages update automatically. No other files need changes.

---

## FILES STRUCTURE
  src/
    App.jsx                  ← All routes registered here
    main.jsx                 ← React entry point
    index.css                ← Global styles + CSS variables
    components/
      Nav.jsx                ← Top navigation
      Footer.jsx             ← Footer (shows both patents)
      ConsentModal.jsx       ← Florida 934.03 consent
      ScoreCard.jsx          ← HOA health score display
      PageShell.jsx          ← Page wrapper
    pages/                   ← All public pages
    pages/admin/             ← All 29 admin modules
    pages/lender/            ← Lender workspace
    pages/attorney/          ← Attorney workspace
    pages/legal/             ← Legal documents
    lib/                     ← All AI engines and business logic
      patentConfig.js        ← SINGLE SOURCE OF TRUTH for all IP

---

## CRITICAL ACTIONS BEFORE GOING LIVE
  □  Update second patent number in patentConfig.js tonight
  □  Change VITE_FOUNDER_PIN from default
  □  Set VITE_DEPLOYMENT_STATE=LIVE (when ready)
  □  Switch Stripe to pk_live_ keys
  □  Point hoacondinsight.com DNS to Lovable
  □  Attorney review of legal pages before first real customer
  □  Contact Fish & Richardson before June 2, 2027 (patent deadline)

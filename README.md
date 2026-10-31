# SUBSENSE

**Intelligent Subscription & Revenue Management Platform**

SUBSENSE is an enterprise-grade B2B SaaS platform for subscription-based businesses, software companies, IT service providers, and SMEs. Built for high performance, accuracy, and elegance, SUBSENSE automates product catalog management, quotes, multi-cycle subscriptions, automated recurring billing, tax configuration, discounts, payment reconciliation, and customer self-service.

---

## Architecture Overview

```text
SUBSENSE/
├── docs/                     # Specifications, DB schemas, contracts, and RBAC matrix
├── frontend/                 # Next.js 15, React 19, TypeScript, Tailwind CSS
│   ├── public/               # Static assets (icons, images, logo)
│   └── src/
│       ├── app/              # App Router (auth, dashboard, portal)
│       ├── components/       # Reusable UI primitives and domain widgets
│       ├── contexts/         # React Contexts (Auth, Toast, etc.)
│       ├── data/             # Domain mock datasets
│       ├── hooks/            # Custom reusable hooks
│       ├── lib/              # Billing calculators, formatters, RBAC guards
│       └── types/            # TypeScript entity models and status unions
└── backend/                  # (Future Phase) Python FastAPI, PostgreSQL, SQLAlchemy
```

---

## Design System

SUBSENSE employs a luxury editorial minimalist visual language:
- **Dark Espresso**: `#352C29`
- **Warm Stone Grey**: `#9D9695`
- **Deep Burgundy**: `#541415`
- **Crimson Red**: `#D93645`
- **Soft Blush**: `#E8DAD5`
- **Warm Ivory**: `#F5F1ED`

---

## Core Business Modules

1. **Authentication & RBAC**: Admin, Internal Staff, and Customer Portal with strict password policy (>8 chars, uppercase, lowercase, special character).
2. **Product & Plan Catalog**: Multi-variant products (e.g. brand surcharges) and flexible billing frequencies (Daily, Weekly, Monthly, Yearly).
3. **Quotations & Subscriptions**: Quotation templates with validity days, converting into full lifecycle subscriptions (`Draft` → `Quotation` → `Confirmed` → `Active` → `Closed`).
4. **Billing & Recurring Invoices**: Automatic invoice generation with tax calculations, discount allocations, and cancellation support (`Draft` → `Confirmed` → `Paid`).
5. **Payments & Ledger**: Transaction capture, payment method allocations, and overdue revenue tracking.
6. **Customer Portal**: Direct self-service portal for customers to manage their own subscriptions and view invoices.
7. **Intelligence Suite**: Churn prediction, renewal risk detection, subscription health scores, and invoice anomaly detection.

---

## Getting Started

### Prerequisites
- Node.js 18+ (tested on Node.js 24)
- npm 9+

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

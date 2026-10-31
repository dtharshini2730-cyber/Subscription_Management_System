# SUBSENSE Relational Database Schema Specification

This document details the PostgreSQL schema designed for SUBSENSE, directly mapping to the domain TypeScript entities.

---

## Entity Relationship Overview

```text
users (id, email, password_hash, role, name, created_at)
  │
  ├── customers (id, user_id, company_name, email, phone, address, tax_number)
  │     │
  │     ├── subscriptions (id, subscription_number, customer_id, plan_id, status, dates...)
  │     │     │
  │     │     ├── subscription_lines (id, subscription_id, product_id, variant_id, qty, price, tax...)
  │     │     │
  │     │     └── invoices (id, invoice_number, subscription_id, customer_id, status, totals...)
  │     │           │
  │     │           ├── invoice_lines (id, invoice_id, product_id, qty, unit_price, tax, amount)
  │     │           │
  │     │           └── payments (id, invoice_id, amount, payment_method, payment_date, note)
  │
products (id, name, type, sales_price, cost_price, notes)
  └── product_variants (id, product_id, name, additional_price, sku)

plans (id, name, billing_frequency, price, min_quantity, can_auto_close, can_pause...)

discounts (id, code, type, value, min_amount, min_qty, valid_from, valid_to, max_uses, current_uses)

taxes (id, name, rate_percent, is_compound, region_code)
```

---

## Table DDL Definitions

```sql
-- Users & Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('ADMIN', 'STAFF', 'CUSTOMER')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customers
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    billing_address TEXT NOT NULL,
    tax_identifier VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products & Variants
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('SERVICE', 'SOFTWARE', 'CONSUMABLE')),
    sales_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    cost_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    additional_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    sku VARCHAR(100) UNIQUE NOT NULL
);

-- Subscription Plans
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    billing_frequency VARCHAR(50) NOT NULL CHECK (billing_frequency IN ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY')),
    price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    min_quantity INT NOT NULL DEFAULT 1,
    available_from DATE NOT NULL,
    available_to DATE,
    can_auto_close BOOLEAN DEFAULT FALSE,
    can_pause BOOLEAN DEFAULT TRUE,
    can_renew_early BOOLEAN DEFAULT TRUE
);

-- Subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_number VARCHAR(100) UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES customers(id),
    plan_id UUID NOT NULL REFERENCES plans(id),
    status VARCHAR(50) NOT NULL CHECK (status IN ('DRAFT', 'QUOTATION', 'CONFIRMED', 'ACTIVE', 'CLOSED')),
    start_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    payment_terms VARCHAR(100) NOT NULL DEFAULT 'Immediate',
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    tax_total NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    discount_total NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    grand_total NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subscription Line Items
CREATE TABLE subscription_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(12, 2) NOT NULL,
    tax_rate NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total NUMERIC(12, 2) NOT NULL
);

-- Invoices
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
    customer_id UUID NOT NULL REFERENCES customers(id),
    status VARCHAR(50) NOT NULL CHECK (status IN ('DRAFT', 'CONFIRMED', 'PAID', 'CANCELLED')),
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    tax_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    paid_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_period_per_sub UNIQUE (subscription_id, period_start, period_end)
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    payment_number VARCHAR(100) UNIQUE NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('CREDIT_CARD', 'BANK_TRANSFER', 'ACH', 'CHECK', 'CASH')),
    payment_date DATE NOT NULL,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

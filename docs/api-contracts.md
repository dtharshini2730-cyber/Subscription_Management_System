# SUBSENSE REST API Contracts Specification

This document is the target REST API contract specification. An endpoint listed here is not necessarily implemented. The current FastAPI application exposes the authentication routes implemented in `backend/app/routers/auth.py`; domain CRUD endpoints below remain pending until backend routers are added.

---

## 1. Authentication Endpoints

- `POST /api/v1/auth/login`
  - **Body**: `{ email: string, password: string }`
  - **Response 200**: `{ token: string, user: User }`
- `POST /api/v1/auth/register`
  - **Body**: `{ name: string, email: string, password: string }`
  - **Validation**: Email uniqueness check, password complexity check (>8 chars, uppercase, lowercase, special char).
  - **Response 201**: `{ message: string, user: User }`
- `POST /api/v1/auth/forgot-password`
  - **Body**: `{ email: string }`
  - **Response 200**: `{ message: "Reset link dispatched if account exists" }`

---

## 2. Customer Management

- `GET /api/v1/customers` (Admin, Staff)
- `POST /api/v1/customers` (Admin, Staff)
- `GET /api/v1/customers/:id` (Admin, Staff, or Customer if self)
- `PUT /api/v1/customers/:id` (Admin, Staff)

---

## 3. Products & Plans

- `GET /api/v1/products` (All roles)
- `POST /api/v1/products` (Admin only)
- `PUT /api/v1/products/:id` (Admin only)
- `GET /api/v1/plans` (All roles)
- `POST /api/v1/plans` (Admin only)

---

## 4. Quotations & Subscriptions

- `GET /api/v1/quotations` (Admin, Staff)
- `POST /api/v1/quotations` (Admin, Staff)
- `POST /api/v1/quotations/:id/convert` (Admin, Staff) -> Generates subscription in `Confirmed` or `Active` status.
- `GET /api/v1/subscriptions` (Admin, Staff, Customer sees own)
- `POST /api/v1/subscriptions` (Admin, Staff)
- `PATCH /api/v1/subscriptions/:id/status` (Admin, Staff)
  - **Body**: `{ status: 'Draft' | 'Quotation' | 'Confirmed' | 'Active' | 'Closed', reason?: string }`

---

## 5. Invoicing & Billing Engine

- `GET /api/v1/invoices` (Admin, Staff, Customer sees own)
- `POST /api/v1/invoices/generate-billing-run` (Admin, Staff)
  - Scans all `Active` subscriptions due for the cycle, generating non-duplicate draft invoices.
- `PATCH /api/v1/invoices/:id/confirm` (Admin, Staff)
- `PATCH /api/v1/invoices/:id/cancel` (Admin, Staff)
- `POST /api/v1/invoices/:id/payments` (Admin, Staff, Customer)
  - **Body**: `{ amount: number, paymentMethod: PaymentMethod, date: string, note?: string }`

---

## 6. Taxes & Discounts

- `GET /api/v1/taxes` (All roles)
- `POST /api/v1/taxes` (Admin only)
- `GET /api/v1/discounts` (All roles)
- `POST /api/v1/discounts` (Admin only)

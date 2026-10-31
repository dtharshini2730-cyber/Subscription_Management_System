# SUBSENSE Role-Based Access Control (RBAC) Specification

## 1. User Roles

SUBSENSE defines three primary user roles:
1. **Admin**: Executive or financial controller with full administrative privileges over configuration, security, user administration, and reporting.
2. **Staff**: Internal sales, account managers, and operational support staff handling day-to-day client subscriptions, quotes, and invoice lifecycle operations.
3. **Customer**: External clients accessing their specific subscriptions, invoices, and payment receipts via the dedicated Customer Portal.

---

## 2. Granular Permissions Matrix

| Domain Module | Operation | Admin | Staff | Customer |
| :--- | :--- | :---: | :---: | :---: |
| **Authentication** | Register / Login | ✓ | ✓ | ✓ |
| | Create Staff Accounts | **✓** | ✕ | ✕ |
| | Reset Any User Password | **✓** | ✕ | ✕ |
| **Customers** | View Customer List | ✓ | ✓ | ✕ |
| | Create / Edit Customer | ✓ | ✓ | Self-Profile Only |
| **Products & Variants** | View Catalog | ✓ | ✓ | ✓ |
| | Create / Edit Products | **✓** | ✕ | ✕ |
| **Subscription Plans** | View Plans | ✓ | ✓ | ✓ |
| | Create / Edit Plans | **✓** | ✕ | ✕ |
| **Quotations** | Create Quotation | ✓ | ✓ | ✕ |
| | Convert Quote to Subscription | ✓ | ✓ | ✕ |
| **Subscriptions** | View Subscriptions | All | All | Own Only |
| | Create / Edit Subscription | ✓ | ✓ | ✕ |
| | Pause / Cancel Subscription | ✓ | ✓ | Request Cancel |
| **Invoices** | Generate Invoices | ✓ | ✓ | ✕ |
| | Confirm / Send / Cancel | ✓ | ✓ | ✕ |
| | View Invoices | All | All | Own Only |
| **Payments** | Record / Reconcile Payment | ✓ | ✓ | Pay Own Invoice |
| | View Payment History | All | All | Own Only |
| **Taxes & Discounts** | Create / Edit Tax Rules | **✓** | ✕ | ✕ |
| | Create / Edit Discount Rules | **✓** | ✕ | ✕ |
| **Finance Analytics** | View Executive Dashboard | ✓ | Operational | ✕ |
| **Intelligence** | View Churn & Anomalies | ✓ | Advisory | ✕ |

---

## 3. Password Complexity Requirement

As required by enterprise security standards:
- Length: **Greater than 8 characters** (> 8 chars, i.e., 9+ characters).
- At least one uppercase letter (`A-Z`).
- At least one lowercase letter (`a-z`).
- At least one special character (`!@#$%^&*()_+-=[]{}|;:,.<>?`).

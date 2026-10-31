# SUBSENSE Frontend and Backend Integration

## Current integration status

The Next.js frontend authenticates against the FastAPI backend. The login and public registration forms call the implemented `/auth/login` and `/auth/register` routes; protected pages restore the current account through `/auth/me`. JWTs are kept in `sessionStorage`, sent as Bearer tokens, and cleared when the API returns `401`.

The backend application is started from `backend/` with `uvicorn app.main:app --reload`. `app.main` mounts the existing authentication router under the configured `API_V1_STR`, allows the configured CORS origins, creates missing SQLAlchemy tables, and provisions the initial administrator from `ADMIN_DEFAULT_EMAIL`, `ADMIN_DEFAULT_PASSWORD`, and `ADMIN_DEFAULT_NAME`. Existing administrator passwords are not changed on later starts.

The database, model, and schema files do not mean CRUD APIs are available. At this revision, no route implementations exist for customer, product/variant, plan, quotation, subscription, invoice, payment, tax, discount, or dashboard/revenue data. Those pages still display their existing mock/demo data; the authenticated dashboard displays a notice to make that explicit. The integration does not send requests to endpoints that are only listed in `docs/api-contracts.md`.

## Local setup

1. Copy `backend/.env.example` to `backend/.env` and set a unique, securely generated `SECRET_KEY` and a strong `ADMIN_DEFAULT_PASSWORD`. Do not commit `.env`.
2. From `backend/`, install `requirements.txt` and run:

   ```powershell
   uvicorn app.main:app --reload --port 8000
   ```

   On first startup, SQLAlchemy creates missing tables and provisions the administrator if that configured email is not already registered. Public registration creates Customer accounts; Staff creation remains Admin-only through the existing API.
3. Copy `frontend/.env.example` to `frontend/.env.local`. Set `NEXT_PUBLIC_API_BASE_URL` to the backend API root, defaulting to `http://localhost:8000/api/v1`.
4. From `frontend/`, install the locked npm dependencies and run `npm run dev`.

The default SQLite URL is relative to the backend process working directory. Use an appropriate production database URL and a managed migration process before deploying. The included `create_all` startup setup is for this repository's current development bootstrap; it does not migrate existing database schemas.

## Implemented authentication calls

| Frontend operation | Backend endpoint | Status |
|---|---|---|
| Sign in | `POST /api/v1/auth/login` | Integrated |
| Create Customer account | `POST /api/v1/auth/register` | Integrated; role is assigned by backend |
| Restore/validate session | `GET /api/v1/auth/me` | Integrated |
| Create Staff account | `POST /api/v1/auth/register-staff` | Integrated in Settings for Admins; backend enforces role |
| Forgot/reset password | `POST /api/v1/auth/forgot-password`, `POST /api/v1/auth/reset-password` | Not integrated; delivery/verification is not implemented by the current backend |

Authorization for business operations must be enforced by each future backend route. Frontend navigation visibility is not an authorization boundary.

## Pending integrations

Implement and document the corresponding backend routes before replacing mock data in the following modules:

- Dashboard and revenue analytics
- Customers
- Products and variants
- Subscription plans
- Quotations
- Subscriptions
- Invoices and billing runs
- Payments
- Taxes and discounts

Once routes are available, define request/response contracts from the Pydantic schemas, add typed API methods, and replace each module's mock source only alongside working loading, error, empty, and mutation-refresh states. The current backend schemas serialize snake_case fields and decimal amounts, while the frontend models expect camelCase fields and its demo data is primarily USD. Map those formats and confirm the INR display contract when the real finance endpoints are available; do not treat mock amounts as production data or as INR values.

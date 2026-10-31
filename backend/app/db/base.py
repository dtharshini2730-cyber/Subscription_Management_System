# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.database import Base  # noqa
from app.models.user import User  # noqa
from app.models.customer import Customer  # noqa
from app.models.product import Product, ProductVariant  # noqa
from app.models.plan import Plan  # noqa
from app.models.quotation import Quotation, QuotationLine  # noqa
from app.models.subscription import Subscription, SubscriptionLine  # noqa
from app.models.invoice import Invoice, InvoiceLine  # noqa
from app.models.payment import Payment  # noqa
from app.models.tax_discount import Tax, Discount  # noqa

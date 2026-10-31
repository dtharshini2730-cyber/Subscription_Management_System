from datetime import date
from dateutil.relativedelta import relativedelta


def get_next_period_dates(start_date: date, frequency: str) -> tuple[date, date]:
    """
    Calculate period_start and period_end based on frequency.
    Period end is inclusive or end of the interval.
    For standard billing:
    - DAILY: start_date to start_date + 1 day
    - WEEKLY: start_date to start_date + 7 days
    - MONTHLY: start_date to start_date + 1 month
    - YEARLY: start_date to start_date + 1 year
    """
    freq = frequency.upper()
    if freq == "DAILY":
        end_date = start_date + relativedelta(days=1)
    elif freq == "WEEKLY":
        end_date = start_date + relativedelta(weeks=1)
    elif freq == "MONTHLY":
        end_date = start_date + relativedelta(months=1)
    elif freq == "YEARLY":
        end_date = start_date + relativedelta(years=1)
    else:
        end_date = start_date + relativedelta(months=1)

    return start_date, end_date

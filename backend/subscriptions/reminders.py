from datetime import date,timedelta

from .models import Subscription

from .email_utils import (
    send_renewal_email
)


def check_renewals():

    target_date = (
        date.today() +
        timedelta(days=1)
    )

    subscriptions =Subscription.objects.filter(
            next_billing_date=
            target_date
        )

    for sub in subscriptions:

        send_renewal_email(
            sub.user.email,
            sub.service_name,
            sub.next_billing_date
        )
from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from subscriptions.models import Subscription
from subscriptions.models import Notification
from datetime import date, timedelta

class Command(BaseCommand):


    help = "Send renewal reminder emails"

def handle(self, *args, **kwargs):

    reminder_date = (
        date.today() +
        timedelta(days=3)
    )

    subscriptions = Subscription.objects.filter(
        next_billing_date=reminder_date
    )

    for sub in subscriptions:

        send_mail(
            "Subscription Renewal Reminder",
            f"""


Hello {sub.user.username},

Your subscription to {sub.service_name}
will renew on {sub.next_billing_date}.

Please make sure your payment method is active.

Thank you,
SubSmart Team
""",
None,
[sub.user.email]
)


        Notification.objects.create(
            user=sub.user,
            title="Renewal Reminder",
            message=f"{sub.service_name} renews on {sub.next_billing_date}"
        )

    self.stdout.write(
        self.style.SUCCESS(
            "Reminder Emails Sent"
        )
    )


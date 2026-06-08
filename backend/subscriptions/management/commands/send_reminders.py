from django.core.management.base import BaseCommand

from subscriptions.reminders import check_renewals


class Command(BaseCommand):

    help = "Send renewal reminder emails"

    def handle(self, *args, **kwargs):

        check_renewals()

        self.stdout.write(
            self.style.SUCCESS(
                "Reminder emails sent successfully!"
            )
        )
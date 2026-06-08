from django.core.mail import send_mail


def send_renewal_email(
    email,
    service_name,
    renewal_date
):

    send_mail(
        subject=
        f"{service_name} Renewal Reminder",

        message=
        f"""
Your subscription
for {service_name}
renews on
{renewal_date}.

Please make sure
your payment method
is active.
""",

        from_email=None,

        recipient_list=[email],

        fail_silently=False
    )
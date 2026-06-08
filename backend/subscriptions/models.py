from django.db import models
from django.contrib.auth.models import User

class Subscription(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    service_name = models.CharField(max_length=100)

    category = models.CharField(max_length=100)

    cost = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    billing_cycle = models.CharField(
        max_length=20
    )

    next_billing_date = models.DateField()

    status = models.CharField(
        max_length=20,
        default="Active"
    )

    def __str__(self):
        return self.service_name
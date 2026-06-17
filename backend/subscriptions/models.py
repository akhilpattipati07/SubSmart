from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

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
    

class PasswordOTP(models.Model):

    email = models.EmailField()

    otp = models.CharField(
        max_length=6
    )

    created_at = models.DateTimeField(
        default=timezone.now
    )

    def __str__(self):
        return self.email
    


class UserProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    image = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True
    )


class RegistrationOTP(models.Model):

    email = models.EmailField()

    username = models.CharField(
        max_length=150
    )

    password = models.CharField(
        max_length=200
    )

    otp = models.CharField(
        max_length=6
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.email
    



class Notification(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    title = models.CharField(
        max_length=200
    )

    message = models.TextField()

    is_read = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title
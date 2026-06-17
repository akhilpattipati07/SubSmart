from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Subscription
from .serializers import SubscriptionSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
import random
from django.core.mail import send_mail
from .models import PasswordOTP
from rest_framework.decorators import (
    api_view,
    permission_classes
)
from datetime import timedelta
from django.utils import timezone
from .models import UserProfile
from .serializers import UserProfileSerializer
from .models import RegistrationOTP
from subscriptions.management.commands.send_reminders import Command
from .models import Notification
from .serializers import NotificationSerializer
from .models import Subscription

@api_view(["POST"])
def register(request):

    User.objects.create_user(
        username=request.data["username"],
        email=request.data["email"],
        password=request.data["password"]
    )

    return Response({
        "message": "User Created"
    })

@api_view(["POST"])
def forgot_password(request):

    email = request.data["email"]

    if not User.objects.filter(email=email).exists():

        return Response(
        {
            "message":
            "Email not found"
        },
        status=404
    )

    otp = str(
        random.randint(
            100000,
            999999
        )
    )

    PasswordOTP.objects.filter(email=email).delete()

    PasswordOTP.objects.create(email=email,otp=otp)


    send_mail(
        "SubSmart Password Reset OTP",
        f"Your OTP is: {otp}",
        None,
        [email]
    )

    return Response({
        "message":
        "OTP Sent"
    })

@api_view(["POST"])
def verify_otp(request):

    email = request.data["email"]

    otp = request.data["otp"]

    otp_obj = PasswordOTP.objects.filter(
        email=email,
        otp=otp
    ).first()

    if not otp_obj:

        return Response(
            {
                "valid": False
            },
            status=400
        )

    expiry_time = (
        otp_obj.created_at +
        timedelta(minutes=5)
    )

    if timezone.now() > expiry_time:

        otp_obj.delete()

        return Response(
            {
                "message":
                "OTP Expired"
            },
            status=400
        )

    return Response({
        "valid": True
    })

@api_view(["POST"])
def reset_password(request):

    email = request.data["email"]

    password = request.data["password"]

    user = User.objects.get(
            email=email
        )

    user.set_password(
        password
    )

    user.save()

    return Response({
        "message":
        "Password Updated"
    })

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):

    user = request.user

    old_password = request.data["old_password"]

    new_password = request.data["new_password"]

    if not user.check_password(
        old_password
    ):

        return Response(
            {
                "message":
                "Wrong Password"
            },
            status=400
        )

    user.set_password(
        new_password
    )

    user.save()

    return Response({
        "message":
        "Password Changed"
    })


@api_view(["POST"])
def trigger_reminders(request):

    Command().handle()

    return Response({
        "message":
        "Reminder Emails Sent"
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def notifications(request):

    data = Notification.objects.filter(
        user=request.user
    ).order_by("-created_at")

    serializer = NotificationSerializer(
        data,
        many=True
    )

    return Response(
        serializer.data
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_notification_read(request,id):

    notification = Notification.objects.get(
            id=id,
            user=request.user
        )

    notification.is_read = True

    notification.save()

    return Response({
        "message":"Read"
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_profile_image(request):

    profile, created = (
        UserProfile.objects.get_or_create(
            user=request.user
        )
    )

    profile.image = request.FILES["image"]

    profile.save()

    return Response({
        "image":
        profile.image.url
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_profile(request):

    profile, created = UserProfile.objects.get_or_create(
        user=request.user
    )

    return Response({
        "username": request.user.username,
        "email": request.user.email,
        "date_joined": request.user.date_joined,
        "image": profile.image.url if profile.image else None
    })

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_profile(request):

    user = request.user

    user.username = request.data["username"]

    user.email = request.data["email"]

    user.save()

    return Response({
        "message":
        "Profile Updated"
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_profile(request):

    profile = UserProfile.objects.get(
        user=request.user
    )

    profile.image.delete()

    profile.image = None

    profile.save()

    return Response({
        "message":"Removed"
    })


class SubscriptionViewSet(viewsets.ModelViewSet):

    queryset = Subscription.objects.all()

    serializer_class = SubscriptionSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Subscription.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_profile_image(request):

    profile = UserProfile.objects.get( user=request.user )

    if profile.image:
        profile.image.delete()

    profile.image = None
    profile.save()

    return Response({
        "message": "Deleted"
    })

@api_view(["POST"])
def send_registration_otp(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username:
        return Response(
        {"message": "Username is required"},
        status=400
    )

    if not email:
        return Response(
        {"message": "Email is required"},
        status=400
    )

    if not password:
        return Response(
        {"message": "Password is required"},
        status=400
    )

    if User.objects.filter(
        email=email
    ).exists():

        return Response(
            {
                "message":
                "Email already registered"
            },
            status=400
        )

    if User.objects.filter(
        username=username
    ).exists():

        return Response(
            {
                "message":
                "Username already exists"
            },
            status=400
        )

    otp = str(
        random.randint(
            100000,
            999999
        )
    )

    RegistrationOTP.objects.filter(
        email=email
    ).delete()

    RegistrationOTP.objects.create(
        username=username,
        email=email,
        password=password,
        otp=otp
    )

    send_mail(
        "SubSmart Registration OTP",
        f"Your OTP is: {otp}",
        None,
        [email]
    )

    return Response({
        "message": "OTP Sent"
    })


@api_view(["POST"])
def verify_registration_otp(request):

    email = request.data["email"]
    otp = request.data["otp"]

    record = (
        RegistrationOTP.objects
        .filter(
            email=email,
            otp=otp
        )
        .first()
    )

    if not record:

        return Response(
            {
                "valid": False
            },
            status=400
        )

    expiry_time = (
        record.created_at +
        timedelta(minutes=5)
    )

    if timezone.now() > expiry_time:

        record.delete()

        return Response(
            {
                "message":
                "OTP Expired"
            },
            status=400
        )

    User.objects.create_user(
        username=record.username,
        email=record.email,
        password=record.password
    )

    record.delete()

    return Response({
        "valid": True
    })

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ai_assistant(request):

    question = request.data.get(
        "question",
        ""
    ).lower()

    subscriptions = Subscription.objects.filter(
        user=request.user
    )

    if not subscriptions.exists():

        return Response({
            "answer":
            "You don't have any subscriptions yet."
        })

    elif (
        "monthly spend" in question
        or "total spend" in question
        or "how much" in question
    ):

        total = sum(
            float(x.cost)
            for x in subscriptions
        )

        return Response({
            "answer":
            f"Your monthly spend is ₹{total:.0f}"
        })

    elif (
        "expensive" in question
        or "highest" in question
        or "costs the most" in question
        or "most expensive" in question
    ):

        sub = subscriptions.order_by(
            "-cost"
        ).first()

        return Response({
            "answer":
            f"{sub.service_name} costs the most at ₹{sub.cost}"
        })

    elif (
        "renew" in question
        or "next renewal" in question
        or "renews next" in question
    ):

        sub = subscriptions.order_by(
            "next_billing_date"
        ).first()

        return Response({
            "answer":
            f"{sub.service_name} renews next on {sub.next_billing_date}"
        })

    elif "entertainment" in question:

        items = subscriptions.filter(
            category="Entertainment"
        )

        if not items.exists():

            return Response({
                "answer":
                "You don't have any entertainment subscriptions."
            })

        names = [
            x.service_name
            for x in items
        ]

        return Response({
            "answer":
            "Entertainment subscriptions: "
            + ", ".join(names)
        })

    elif "music" in question:

        items = subscriptions.filter(
            category="Music"
        )

        if not items.exists():

            return Response({
                "answer":
                "You don't have any music subscriptions."
            })

        names = [
            x.service_name
            for x in items
        ]

        return Response({
            "answer":
            "Music subscriptions: "
            + ", ".join(names)
        })

    elif (
        "save" in question
        or "savings" in question
        or "suggest savings" in question
    ):

        expensive = subscriptions.order_by(
            "-cost"
        ).first()

        return Response({
            "answer":
            f"Consider reviewing {expensive.service_name} (₹{expensive.cost}) to reduce spending."
        })

    elif "active subscriptions" in question:

        count = subscriptions.filter(
            status="Active"
        ).count()

        return Response({
            "answer":
            f"You have {count} active subscriptions."
        })

    elif "inactive subscriptions" in question:

        count = subscriptions.filter(
            status="Inactive"
        ).count()

        return Response({
            "answer":
            f"You have {count} inactive subscriptions."
        })

    elif "cheapest" in question:

        sub = subscriptions.order_by(
            "cost"
        ).first()

        return Response({
            "answer":
            f"{sub.service_name} is your cheapest subscription at ₹{sub.cost}"
        })

    elif "yearly subscriptions" in question:

        items = subscriptions.filter(
            billing_cycle="Yearly"
        )

        if not items.exists():

            return Response({
                "answer":
                "You don't have any yearly subscriptions."
            })

        names = [
            x.service_name
            for x in items
        ]

        return Response({
            "answer":
            "Yearly subscriptions: "
            + ", ".join(names)
        })

    elif "monthly subscriptions" in question:

        items = subscriptions.filter(
            billing_cycle="Monthly"
        )

        if not items.exists():

            return Response({
                "answer":
                "You don't have any monthly subscriptions."
            })

        names = [
            x.service_name
            for x in items
        ]

        return Response({
            "answer":
            "Monthly subscriptions: "
            + ", ".join(names)
        })

    elif "annual spend" in question:

        total = 0

        for sub in subscriptions:

            if sub.billing_cycle == "Monthly":
                total += float(sub.cost) * 12
            else:
                total += float(sub.cost)

        return Response({
            "answer":
            f"Your estimated annual spend is ₹{total:.0f}"
        })

    elif "total subscriptions" in question:

        return Response({
            "answer":
            f"You have {subscriptions.count()} subscriptions in total."
        })

    elif "top 3 subscriptions" in question:

        top = subscriptions.order_by(
            "-cost"
        )[:3]

        result = [
            f"{sub.service_name} (₹{sub.cost})"
            for sub in top
        ]

        return Response({
            "answer":
            "Top 3 subscriptions: "
            + ", ".join(result)
        })

    elif "above 500" in question:

        items = subscriptions.filter(
            cost__gt=500
        )

        if not items.exists():

            return Response({
                "answer":
                "You don't have any subscriptions above ₹500."
            })

        names = [
            f"{x.service_name} (₹{x.cost})"
            for x in items
        ]

        return Response({
            "answer":
            ", ".join(names)
        })

    elif "above 1000" in question:

        items = subscriptions.filter(
            cost__gt=1000
        )

        if not items.exists():

            return Response({
                "answer":
                "You don't have any subscriptions above ₹1000."
            })

        names = [
            f"{x.service_name} (₹{x.cost})"
            for x in items
        ]

        return Response({
            "answer":
            ", ".join(names)
        })

    elif "average subscription cost" in question:

        total = sum(
            float(x.cost)
            for x in subscriptions
        )

        avg = total / subscriptions.count()

        return Response({
            "answer":
            f"Average subscription cost is ₹{avg:.2f}"
        })

    elif "spending summary" in question:

        total = sum(
            float(x.cost)
            for x in subscriptions
        )

        active = subscriptions.filter(
            status="Active"
        ).count()

        return Response({
            "answer":
            f"You have {active} active subscriptions with total monthly spending of ₹{total:.0f}"
        })

    elif "recommend subscriptions to cancel" in question:

        inactive = subscriptions.filter(
            status="Inactive"
        )

        if inactive.exists():

            names = [
                x.service_name
                for x in inactive
            ]

            return Response({
                "answer":
                "Consider cancelling: "
                + ", ".join(names)
            })

        return Response({
            "answer":
            "No inactive subscriptions found. Consider reviewing your most expensive subscription."
        })

    else:

        return Response({
            "answer":
            "Try asking: Monthly spend, Annual spend, Cheapest subscription, Top 3 subscriptions, Above 500, Above 1000, Active subscriptions, Inactive subscriptions, Spending summary, Entertainment subscriptions, Music subscriptions, Renewals, or Savings."
        })
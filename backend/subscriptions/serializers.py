from rest_framework import serializers
from .models import Subscription
from .models import UserProfile

class SubscriptionSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = Subscription
        fields = "__all__"
        read_only_fields = ["user"]


from .models import Notification


class UserProfileSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = UserProfile

        fields = "__all__"



class NotificationSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Notification

        fields = "__all__"
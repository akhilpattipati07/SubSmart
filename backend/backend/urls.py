"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from subscriptions.views import (
    register,
    forgot_password,
    verify_otp,
    reset_password,
    change_password,
)
from django.conf import settings
from django.conf.urls.static import static
from subscriptions.views import (
    upload_profile_image,
    get_profile,
    remove_profile,
)
from subscriptions.views import delete_profile_image

from subscriptions.views import (
    send_registration_otp,
    verify_registration_otp,
     trigger_reminders,
     notifications,
     mark_notification_read,
)

from subscriptions.report_views import (
    export_pdf,
    export_excel
)

from subscriptions.views import update_profile
from subscriptions.views import ai_assistant


urlpatterns = [
path('admin/', admin.site.urls),


path(
    'api/token/',
    TokenObtainPairView.as_view(),
    name='token_obtain_pair'
),

path(
    'api/token/refresh/',
    TokenRefreshView.as_view(),
    name='token_refresh'
),

path(
    'api/',
    include('subscriptions.urls')
),

path("register/", register),

path(
    "forgot-password/",
    forgot_password
),

path(
    "verify-otp/",
    verify_otp
),

path(
    "reset-password/",
    reset_password
),

path(
    "change-password/",
    change_password
),

path(
    "upload-profile/",
    upload_profile_image
),

path(
    "profile/",
    get_profile
),

path(
    "profile/update/",
    update_profile
),

path(
    "remove-profile/",
    remove_profile
),

path(
    "delete-profile-image/",
    delete_profile_image
),

path(
    "register-otp/",
    send_registration_otp
),

path(
    "verify-registration-otp/",
    verify_registration_otp
),

path(
    "send-reminders/",
    trigger_reminders
),

path(
    "notifications/",
    notifications
),

path(
    "notifications/<int:id>/",
    mark_notification_read
),

path(
    "export-pdf/",
    export_pdf
),

path(
    "export-excel/",
    export_excel
),

path(
    "ai-assistant/",
    ai_assistant
),


]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)

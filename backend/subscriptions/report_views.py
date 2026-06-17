from django.http import HttpResponse
from reportlab.pdfgen import canvas
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from .models import Subscription


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def export_pdf(request):

    response = HttpResponse(
        content_type="application/pdf"
    )

    response[
        "Content-Disposition"
    ] = 'attachment; filename="subscriptions.pdf"'

    p = canvas.Canvas(response)

    p.drawString(
        100,
        800,
        "SubSmart Subscription Report"
    )

    y = 760

    subscriptions = Subscription.objects.filter(
            user=request.user
        )

    for sub in subscriptions:

        p.drawString(
            100,
            y,
            f"{sub.service_name} - ₹{sub.cost}"
        )

        y -= 25

    p.save()

    return response

import pandas as pd


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def export_excel(request):

    subscriptions =  Subscription.objects.filter(
            user=request.user
        )

    data = []

    for sub in subscriptions:

        data.append({

            "Service":
            sub.service_name,

            "Category":
            sub.category,

            "Cost":
            sub.cost,

            "Billing":
            sub.billing_cycle,

            "Renewal":
            sub.next_billing_date,

        })

    df = pd.DataFrame(data)

    response = HttpResponse(
        content_type=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

    response[
        "Content-Disposition"
    ] = 'attachment; filename="subscriptions.xlsx"'

    df.to_excel(
        response,
        index=False
    )

    return response
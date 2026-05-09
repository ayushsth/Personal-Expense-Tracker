"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from Expenses.views import *

urlpatterns = [
    path("api/expenses/", expense),
    path("api/expenses/<int:id>/", expense_put_delete),
    path("api/dashboard/income/",dashboard_income),
    path("api/dashboard/expenses/",dashboard_expenses),
    path("api/income/", income),
    path("api/income/<int:id>/", income_put_delete),
    path("admin/", admin.site.urls),

    path("api/categories/", get_categories),
    path("api/income_categories/", get_income_categories),

    path("api/register/",register),

    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),
]
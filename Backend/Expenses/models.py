from django.db import models
from django.contrib.auth.models import User

# Create your models here.
CATEGORY_CHOICES = [
    ("Housing","Housing"),
    ("Food","Food"),
    ("Clothing","Clothing"),
    ("Health","Health"),
    ("Transportation","Transportation"),
    ("Education","Education"),
    ("Entertainment","Entertainment"),
    ("Others","Others")
]

INCOME_CATEGORY_CHOICES = [
    ("Salary","Salary"),
    ("Interest","Interest"),
    ("Royalty","Royalty"),
    ("Dividend","Dividend"),
    ("Rental","Rental"),
    ("Capital Gains","Capital Gains"),
    ("Profit","Profit")
]

class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses')
    date = models.DateField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at', '-id']

    def __str__(self):
        return f"{self.user.username} - {self.category} - {self.amount}"
    

class Income(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="income")
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50,choices=INCOME_CATEGORY_CHOICES)
    description = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at', '-id']

    def __str__(self):
        return f"{self.user.username} - {self.category} - {self.amount}"
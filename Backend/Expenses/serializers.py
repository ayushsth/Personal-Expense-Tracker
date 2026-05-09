from rest_framework import serializers
from .models import Expense, Income
from datetime import date

class ExpenseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Expense
        fields = ['id', 'date','created_at', 'category', 'amount', 'description']

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Amount must be positive"
            )
        return value

    def validate_date(self, value):
        if value > date.today():
            raise serializers.ValidationError(
                "Future dates not allowed"
            )
        return value

class IncomeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Income
        fields = ['id','date','created_at', 'category', 'amount', 'description']

    
    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Amount must be positive"
            )
        return value

    def validate_date(self, value):
        if value > date.today():
            raise serializers.ValidationError(
                "Future dates not allowed"
            )
        return value
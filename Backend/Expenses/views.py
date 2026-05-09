from django.contrib.auth.models import User

from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Expense,Income
from .serializers import ExpenseSerializer,IncomeSerializer

from .models import CATEGORY_CHOICES, INCOME_CATEGORY_CHOICES
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_income(request):

    incomes = Income.objects.filter(user=request.user).order_by('-date', '-created_at')
    serializer = IncomeSerializer(incomes,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_expenses(request):

    expenses = Expense.objects.filter(user=request.user).order_by('-date', '-created_at')
    serializer = ExpenseSerializer(expenses,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def register(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=email).exists():
        return Response({"error":"User already exists"}, status=400)
    
    user = User.objects.create_user(username=email, email=email, password=password)
    
    return Response({"message": "User Created Successfully"})

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])

def income(request):
    if request.method == 'GET':
        incomes = Income.objects.filter(user=request.user).order_by('-date', '-created_at')
        paginator = PageNumberPagination()
        paginator.page_size = 5

        result_page = paginator.paginate_queryset(incomes,request)
        serializer = IncomeSerializer(result_page, many = True)
        return paginator.get_paginated_response(serializer.data)
    
    if request.method == 'POST':
        data = request.data
        serializer = IncomeSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])

def expense(request):
    if request.method == 'GET':
        expenses = Expense.objects.filter(user=request.user).order_by('-date','-created_at')
        paginator = PageNumberPagination()
        paginator.page_size = 5

        result_page = paginator.paginate_queryset(expenses,request)
        serializer = ExpenseSerializer(result_page, many = True)
        return paginator.get_paginated_response(serializer.data)
    
    if request.method == 'POST':
        data = request.data
        serializer = ExpenseSerializer(data = data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    

@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def income_put_delete(request,id):
    if request.method == 'PUT':
        income = get_object_or_404(Income, pk = id, user=request.user)
        if income.user != request.user:
            return Response({'msg': 'Forbidden Request'}, status=403)
        
        serializer = IncomeSerializer(income, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    
    if request.method == 'DELETE':
        income = get_object_or_404(Income, pk=id, user = request.user)
        if income.user == request.user:
            income.delete()
            return Response(status=204)
        return Response({'msg':'Forbidden Request'},status=403)


@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def expense_put_delete(request, id):
    if request.method == 'PUT':
        expense = get_object_or_404(Expense, pk = id, user=request.user)
        if expense.user != request.user:
            return Response({'msg': 'Forbidden Request'}, status=403)

        serializer = ExpenseSerializer(expense,data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    
    if request.method == 'DELETE':
        expense= get_object_or_404(Expense,pk = id, user = request.user)
        if expense.user == request.user:
            expense.delete()
            return Response(status=204)
        return Response({'msg':'Forbidden Request'},status=403)

@api_view(['GET'])
def get_income_categories(request):
    categories = [c[0] for c in INCOME_CATEGORY_CHOICES]
    return Response(categories)

@api_view(['GET'])
def get_categories(request):
    categories = [c[0] for c in CATEGORY_CHOICES]
    return Response(categories)
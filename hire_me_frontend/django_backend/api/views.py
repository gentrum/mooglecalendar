from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from .models import Tasks
from rest_framework.response import Response
from rest_framework.request import Request
from .serializers import TaskSerializer

# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer

    def create(self, request: Request):
        print("request.data:", request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        print("Incoming Data:", serializer.validated_data)
        if(serializer.is_valid()):
            print("this is running")
            serializer.save() #saves to db
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
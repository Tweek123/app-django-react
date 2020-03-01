from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import serializers
from app_queue.models import Client
from rest_framework.settings import api_settings
from django.contrib.postgres.fields import JSONField
import datetime

class ClientSerializer(serializers.Serializer):    
    id = serializers.IntegerField(read_only=True)
    key = serializers.CharField(max_length=200)
    jsonArray = serializers.JSONField()

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        print('huak1')
        return Client.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        print('huak2')
        
        return instance

class UserSerializer(serializers.Serializer):    
    username = serializers.CharField(max_length=200)
    email = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=200)
    is_superuser = serializers.BooleanField()


from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import serializers
from app_queue.models import Client
from rest_framework.settings import api_settings
from django.contrib.postgres.fields import JSONField
import datetime
from django.core.serializers import serialize
from app_queue.models import ClientData, User

class ClientSerializer(serializers.Serializer):    
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=200)


    def create(self, validated_data):
        return Client.objects.create(**validated_data)

    def update(self, instance, validated_data):
        return instance

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=200)
    email = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=200)
    first_name = serializers.CharField(max_length=200)
    last_name = serializers.CharField(max_length=200)
    is_superuser = serializers.BooleanField()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        admin = ""
        if data['is_superuser']:
           admin = 'Yes'
        else:
            admin = 'No'

        data["admin"] = admin
        return data
        


class ClientDataSerializer(serializers.ModelSerializer):
    time = serializers.DateTimeField(source='clientData_time')
    value = serializers.IntegerField(source='clientData_value')
    client = serializers.PrimaryKeyRelatedField(source='clientData_client' , read_only=True)
    max = serializers.IntegerField(required=False)
    min = serializers.IntegerField(required=False)
    class Meta:
        model = ClientData
        fields = ('time', 'value', 'client', 'max', 'min')

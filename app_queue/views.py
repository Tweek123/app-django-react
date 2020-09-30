from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from app_queue.models import Client, ClientData
# , CustomUser
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.response import Response
from app_queue.serializers import ClientSerializer, UserSerializer, ClientDataSerializer
# , CustomUserSerializer
import json
from django.contrib.auth import authenticate, get_user_model, logout, login
from importlib import import_module
from django.conf import settings
from django.contrib.sessions.backends.db import SessionStore
from django.shortcuts import redirect
from django.contrib.auth.hashers import is_password_usable
from django.conf import settings
from django.views.generic import View
import datetime
import time
import logging
import urllib.request
import os
import dateutil.parser as dp
from django.db.models import Max, Count

api_key = 'abcdef12345'

# Create your views here.

def index(request):
    print(settings.REACT_APP_DIR)
    print("\n")
    return render(request, "build/index.html")

@csrf_exempt
def client_requests(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        return Response('content', status=status.HTTP_200_OK)

    elif request.method == 'POST':
        
        if request.headers['Authorization']!=api_key:
            return JsonResponse({}, status=401)


        data = JSONParser().parse(request)
        
        try:
            client = Client.objects.get(key=data['key'])
            clientData = ClientData.objects.get(id=client['id'])
            
        except:
            dataJSON = [data['data']]
            client = Client(key=data['key'], jsonArray=dataJSON)
            client.save()

        
        return JsonResponse({}, status=200)

@csrf_exempt
def get_page_requests(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        print('GET')
    return redirect('/')



@csrf_exempt
def get_client_request(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        if not data['changeInterval']:
            clientData = getFiveSecondsInterval(data)
        else:
            clientData = getThirtySecondsInterval(data)
        
        serializeData = ClientDataSerializer(clientData, many=True)
        return JsonResponse(serializeData.data, status=200, safe=False)

def getFiveSecondsInterval(data):
    query = "SELECT id, count(clientData_client_id) as count, strftime('%%s',clientData_time)/(5*60) as timestemp, clientData_value, clientData_time  FROM app_queue_clientdata WHERE clientData_client_id == {} AND clientData_time BETWEEN '{}' and '{}' GROUP BY strftime('%%s',clientData_time)/(5*60) ORDER BY clientData_time".format(data['id'], data['timeStart'], data['timeEnd'])
    return ClientData.objects.raw(query)


def getThirtySecondsInterval(data):
    query = "SELECT id, count(clientData_client_id) as count, strftime('%%s',clientData_time)/(30*60) as timestemp, MIN(clientData_value) as min, MAX(clientData_value) as max, clientData_time  FROM app_queue_clientdata WHERE clientData_client_id == {} AND clientData_time BETWEEN '{}' and '{}' GROUP BY timestemp ORDER BY clientData_time".format(data['id'], data['timeStart'], data['timeEnd'])
    return ClientData.objects.raw(query)




@csrf_exempt
def auth_user_request(request):
    if request.method == 'POST':
        loginForm = json.loads(request.body)
        User = get_user_model()
        user = authenticate(request, username=loginForm['login'], password=loginForm['password'])
        if user is None:
            return JsonResponse({}, status=401)

        serializer = UserSerializer(user)
        user = {}
        user['name'] = serializer.data['username']
        user['admin'] = serializer.data['is_superuser']

        return JsonResponse(user, status=200, safe = False)
        
@csrf_exempt
def get_users_request(request):
    if request.method == 'GET':
        User = get_user_model()
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, status=200, safe=False)

    elif request.method == 'POST':

        return JsonResponse({}, status=200)


@csrf_exempt
def change_user_request(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        User = get_user_model()
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, status=200, safe=False)

    elif request.method == 'POST':
        try:
            User = get_user_model()
            userDict = json.loads(request.body)
            user = User.objects.get(id=userDict['id'])
            user.email = userDict['email']
            user.username = userDict['username']
            user.is_superuser = userDict['is_superuser']
            user.first_name = userDict['first_name']
            user.last_name = userDict['last_name']
            if userDict['changepassword'] == True:
                user.set_password(userDict['password'])
            user.save()
        except:
            return JsonResponse({}, status=409)
        return JsonResponse({}, status=200)

@csrf_exempt
def remove_user_request(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        User = get_user_model()
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, status=200, safe=False)

    elif request.method == 'POST':
        User = get_user_model()
        id = json.loads(request.body)
        user = User(id=id)
        user.delete()
        return JsonResponse({}, status=200)

@csrf_exempt
def add_user_request(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        User = get_user_model()
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, status=200, safe=False)

    elif request.method == 'POST':
        try:        
            User = get_user_model()
            userDict = json.loads(request.body)
            user = User.objects.create_user(username=userDict['username'],
            first_name=userDict['first_name'],
            last_name=userDict['last_name'],
            email=userDict['email'], 
            is_superuser=userDict['is_superuser'],
            is_staff=True,
            password= userDict['password']
            )
            user.save()
        except:
            return JsonResponse({}, status=409) 

        return JsonResponse({}, status=200)


@csrf_exempt
def get_clients_request(request):
    """
    List all code snippets, or create a new snippet.
    """

    if request.method == 'GET':
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        return JsonResponse(serializer.data, status=200, safe=False)


@csrf_exempt
def check_url(request):
    try:
        url_status = urllib.request.urlopen(request.body.decode("utf-8") ).getcode()
    except:
        return HttpResponse(":( Url is Not Working")
    if (url_status == 200):
        return HttpResponse("Yey! URL is Working")
    return HttpResponse(":( Url is Not Working")

class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """
def get(self, request):
        try:
            print(settings.REACT_APP_DIR)
            print("\n")
            # with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
            #     return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )




        


# def getStempValues(intervals):


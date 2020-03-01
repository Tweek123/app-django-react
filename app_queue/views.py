from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from app_queue.models import Client
# , CustomUser
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.response import Response
from app_queue.serializers import ClientSerializer, UserSerializer
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

import logging
import urllib.request
import os
api_key = 'abcdef12345'

# Create your views here.

def index(request):
    return render(request, "build/index.html")

@csrf_exempt
def client_requests(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        print('GET')
        return Response('content', status=status.HTTP_200_OK)

    elif request.method == 'POST':
        
        if request.headers['Authorization']!=api_key:
            return JsonResponse({}, status=401)


        data = JSONParser().parse(request)
        
        try:
            client = Client.objects.get(key=data['key'])
            jsonArray = client.jsonArray
            jsonArray.append(data['data'])
            client.jsonArray = jsonArray
            client.save() 
            
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
    """
    List all code snippets, or create a new snippet.
    """
    print('getClient')
    
    if request.method == 'GET':
        print('getClient')
        client = Client.objects.get(key=1337)
        serializer = ClientSerializer(client)
        print(serializer.data)
        return JsonResponse(serializer.data, status=200)

    elif request.method == 'POST':
        
        return JsonResponse({}, status=200)


@csrf_exempt
def auth_user_request(request):
    """
    List all code snippets, or create a new snippet.
    """

    if request.method == 'GET':
        
        print('getClient')
        client = Client.objects.get(key=1337)
        serializer = ClientSerializer(client)
        print(serializer.data)
        return JsonResponse(serializer.data, status=200)

    elif request.method == 'POST':
        
        print(request)
        loginForm = json.loads(request.body)
        print(loginForm)
        User = get_user_model()
        user = authenticate(request, username=loginForm['name'], password=loginForm['password'])


        serializer = UserSerializer(user)

        jsonData = {}
        jsonData['username'] = serializer.data['username']
        jsonData['email'] = serializer.data['email']
        jsonData['admin'] = serializer.data['is_superuser']
        print(serializer.data)
        
        if user is not None:
            
            return JsonResponse(jsonData, status=200)
        else:
            return JsonResponse({}, status=401)

@csrf_exempt
def get_users_request(request):
    """
    List all code snippets, or create a new snippet.
    """
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
        User = get_user_model()
        userDict = json.loads(request.body)
        newUser = userDict['newUser']
        nowUser = userDict['User']['data']
        user = User.objects.get(username=userDict['User']['data']['username'])
        print(user.password)
        user.email = newUser['email']
        user.username = newUser['username']
        user.is_superuser = newUser['is_superuser']
        if not "pbkdf2_sha256" in newUser['password']:
            print('********######*******')
            user.set_password(newUser['password'])

        user.save()
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
        userDict = json.loads(request.body)

        user = User.objects.get(username=userDict['username'])
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
        User = get_user_model()
        userDict = json.loads(request.body)
        
        user = User(username=userDict['username'], email=userDict['email'], is_superuser=userDict['is_superuser'], is_staff=userDict['is_superuser'])
        user.set_password(userDict['password'])
        user.save()
        return JsonResponse({}, status=200)


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
        print (os.path.join(settings.REACT_APP_DIR, 'build', 'index.html'))
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
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
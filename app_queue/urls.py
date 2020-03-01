from django.urls import path
from app_queue import views

urlpatterns = [
    path('client/', views.client_requests),
    path('getClientData/', views.get_client_request),
    path('authUser/', views.auth_user_request),
    path('getUsersData/', views.get_users_request),
    path('changeUser/', views.change_user_request),
    path('addUser/', views.add_user_request),
    path('removeUser/', views.remove_user_request),
    path('statistics/', views.get_page_requests),
    path('users/', views.get_page_requests),
    path('', views.index, name="index")
]
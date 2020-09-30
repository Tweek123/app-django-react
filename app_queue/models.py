from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import AbstractUser, BaseUserManager


# Create your models here.

DATE_INPUT_FORMATS = ['%Y-%m-%d %H:%M:%S']

class Client(models.Model):
    name = models.CharField(max_length=200, unique=True)
    

class ClientData(models.Model):
     clientData_time = models.DateTimeField()
     clientData_value = models.IntegerField()
     clientData_client = models.ForeignKey(Client,on_delete=models.CASCADE)

class UserManager(BaseUserManager):
    def create_user(self, username=None, email=None, password=None, first_name=None, last_name=None, is_superuser=None, is_staff=None):       
        user = self.model(username=username, email=email, first_name=first_name, last_name=last_name, is_superuser=is_superuser, is_staff=True, admin=is_superuser, password=password)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email,  password=None):     
        user = self.model(username=username)
        user.set_password(password)
        user.admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractUser):
    username = models.CharField(max_length=200, unique=True)
    email = models.EmailField()
    admin = models.BooleanField()
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)

    objects = UserManager()
    def __str__(self):
        return self.username
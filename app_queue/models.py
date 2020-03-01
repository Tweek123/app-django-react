from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import AbstractUser, BaseUserManager


# Create your models here.



class Client(models.Model):
    key = models.CharField(max_length=200)
    jsonArray = JSONField()




# class CustomUserManager(BaseUserManager):
#     def create_user(self, username, email, admin, password=None):
#         """
#         Creates and saves a User with the given email, date of
#         birth and password.
#         """
       
#         user = self.model(
#             username= username,
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user


# class CustomUser(AbstractUser):
#     username = models.CharField(max_length=200, unique=True)
#     email = models.EmailField()
#     admin = models.BooleanField()    
    
#     objects = CustomUserManager()
#     def __str__(self):
#         return self.username
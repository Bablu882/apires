from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import RegexValidator

class PersonManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class Person(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=10, validators=[RegexValidator(r'^\d{10}$')])
    designation = models.CharField(max_length=100)
    location = models.CharField(max_length=100, default='Unknown')
    is_superuser = models.IntegerField(default=0)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    groups = models.ManyToManyField(Group, related_name='custom_user_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions_set', blank=True)

    
    objects = PersonManager()

    def __str__(self):
        return self.email
    

class PersonWork(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='works')
    name = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now=True)
    workdescription = models.TextField()
    

    def __str__(self):
        return f'{self.name} - {self.person.email}'

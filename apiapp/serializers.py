from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *

class PersonSerializer(serializers.ModelSerializer):
   
   class Meta:
       model = Person #By default, all the model fields on the class will be mapped to a corresponding serializer fields. 
       fields = ['id', 'name', 'email', 'password','designation', 'location', 'phone','is_superuser']
       extra_kwargs = {'password': {'write_only': True}}
  
   def create(self, validated_data):
       password = validated_data.pop('password', None)
       instance = self.Meta.model(**validated_data)
       if password is not None:
           instance.set_password(password)
       instance.save()
       return instance
       # Define custom related names for groups and user_permissions
       groups = models.ManyToManyField(Group, related_name='person_groups')
       user_permissions = models.ManyToManyField(Permission, related_name='person_user_permissions')
       return user
   
class PersonWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonWork
        fields = ['id', 'person', 'name', 'date', 'workdescription']
        read_only_fields = ['id', 'date']

class adminserilizers(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'name', 'email', 'designation', 'location', 'phone', 'is_superuser']


class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonWork
        fields = ['id', 'name', 'date', 'workdescription']

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("New password must be at least 8 characters long.")
        return value

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("New password and confirm password do not match.")
        return data
    
class AdminChangePasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("New password and confirm password do not match.")
        return data

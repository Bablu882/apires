from django import views
from rest_framework import generics, permissions,status,views
from rest_framework.views import APIView
from .models import Person, PersonWork
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth import authenticate,login
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

from rest_framework.parsers import JSONParser
import io

from apiapp import serializers

class RegisterView(generics.CreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class UserLoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        try:
            pythonData = JSONParser().parse(io.BytesIO(request.body))
            email = pythonData.get('email', None)
            password = pythonData.get('password', None)
            
            if not email:
                response = {
                    "error": {
                        "errorCode": 503,
                        "statusCode": status.HTTP_422_UNPROCESSABLE_ENTITY,
                        "errorMessage": "Email field is required to login"
                    },
                    "response": None
                }
                return Response(response, status.HTTP_422_UNPROCESSABLE_ENTITY)

            if not password:
                response = {
                    "error": {
                        "errorCode": 504,
                        "statusCode": status.HTTP_422_UNPROCESSABLE_ENTITY,
                        "errorMessage": "Password field is required to login"
                    },
                    "response": None
                }
                return Response(response, status.HTTP_422_UNPROCESSABLE_ENTITY)
            
            user = Person.objects.filter(email=email).first()
                
            if user is None:
                response = {
                    "error": {
                        "errorCode": 505,
                        "statusCode": status.HTTP_404_NOT_FOUND,
                        "errorMessage": "User Not Found"
                    },
                    "response": None
                }
                return Response(response, status=status.HTTP_404_NOT_FOUND)
            
            if not user.check_password(password):
                response = {
                    "error": {
                        "errorCode": 506,
                        "statusCode": status.HTTP_422_UNPROCESSABLE_ENTITY,
                        "errorMessage": "Please enter your correct password"
                    },
                    "response": None
                }
                return Response(response, status.HTTP_422_UNPROCESSABLE_ENTITY)

            if user.is_superuser:
                users = Person.objects.all()
                works = PersonWork.objects.all()
            else:
                users = Person.objects.filter(id=user.id)
                works = PersonWork.objects.filter(person=user)

            user_serializer = PersonSerializer(users, many=True)
            work_serializer = PersonWorkSerializer(works, many=True)
            response = {
                "error": None,
                "response": {
                    "user_data": user_serializer.data,
                    "work_data": work_serializer.data,
                    "is_superuser":user.is_superuser,
                    "name":user.name,
                    "designation":user.designation,
                    "id":user.id,
                },
                "message": {
                    'success': True,
                    "successCode": 102,
                    "statusCode": status.HTTP_200_OK,
                    "successMessage": "Logged in successfully."
                }
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "error": {
                    "errorCode": 522,
                    "statusCode": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "errorMessage": str(e)
                },
                "response": None
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserView(APIView):

    def get(self, request):
        # checking for the parameters from the URL
        if request.query_params:
            itemlist = Person.objects.filter(**request.query_param.dict())
        else:
            itemslist = Person.objects.all()
            serializer=PersonSerializer(itemslist,many=True)
  
        # if there is something in items else raise error
        if itemslist:
            data = PersonSerializer(itemslist)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response

class ShowUserView(APIView):
    def get(self, request, user_id):
        try:
            # Fetch the user by ID
            user = Person.objects.get(id=user_id)
        except Person.DoesNotExist:
            response = {
                "error": {
                    "errorCode": 508,
                    "statusCode": status.HTTP_404_NOT_FOUND,
                    "errorMessage": "User not found."
                },
                "response": None
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)

        serializer = PersonSerializer(user)
        response = {
            "error": None,
            "response": serializer.data,
            "message": {
                'success': True,
                "successCode": 107,
                "statusCode": status.HTTP_200_OK,
                "successMessage": "User details retrieved successfully."
            }
        }
        return Response(response, status=status.HTTP_200_OK)

class UserWorkView(APIView):
   def get(self, request, user_id=None):
        try:
            if user_id:
                works = PersonWork.objects.filter(person__id=user_id)
            else:
                works = PersonWork.objects.all()

            work_serializer = PersonWorkSerializer(works, many=True)
            response = {
                "error": None,
                "response": {
                    "work_data": work_serializer.data,
                },
                "message": {
                    'success': True,
                    "successCode": 104,
                    "statusCode": status.HTTP_200_OK,
                    "successMessage": "Work details retrieved successfully."
                }
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "error": {
                    "errorCode": 524,
                    "statusCode": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "errorMessage": str(e)
                },
                "response": None
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
            
class AddWorkView(APIView):
    #permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            serializer = PersonWorkSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = {
                    "error": None,
                    "response": {
                        "work_data": serializer.data,
                    },
                    "message": {
                        'success': True,
                        "successCode": 103,
                        "statusCode": status.HTTP_201_CREATED,
                        "successMessage": "Work added successfully."
                    }
                }
                return Response(response, status=status.HTTP_201_CREATED)
            else:
                response = {
                    "error": {
                        "errorCode": 507,
                        "statusCode": status.HTTP_400_BAD_REQUEST,
                        "errorMessage": serializer.errors
                    },
                    "response": None
                }
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            response = {
                "error": {
                    "errorCode": 523,
                    "statusCode": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "errorMessage": str(e)
                },
                "response": None
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class EditWorkView(APIView):
    def put(self, request, work_id):
        try:
            work_instance = PersonWork.objects.get(id=work_id)
        except PersonWork.DoesNotExist:
            response = {
                "error": {
                    "errorCode": 508,
                    "statusCode": status.HTTP_404_NOT_FOUND,
                    "errorMessage": "Work entry not found."
                },
                "response": None
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            response = {
                "error": {
                    "errorCode": 525,
                    "statusCode": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "errorMessage": str(e)
                },
                "response": None
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = PersonWorkSerializer(work_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = {
                "error": None,
                "response": {
                    "work_data": serializer.data,
                },
                "message": {
                    'success': True,
                    "successCode": 105,
                    "statusCode": status.HTTP_200_OK,
                    "successMessage": "Work entry updated successfully."
                }
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {
                "error": {
                    "errorCode": 509,
                    "statusCode": status.HTTP_400_BAD_REQUEST,
                    "errorMessage": serializer.errors
                },
                "response": None
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class EditUserView(APIView):
    def put(self, request, user_id):
        try:
            employee_instance = Person.objects.get(id=user_id)
        except Person.DoesNotExist:
            response = {
                "error": {
                    "errorCode": 508,
                    "statusCode": status.HTTP_404_NOT_FOUND,
                    "errorMessage": "Employee not found."
                },
                "response": None
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            response = {
                "error": {
                    "errorCode": 525,
                    "statusCode": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "errorMessage": str(e)
                },
                "response": None
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = PersonSerializer(employee_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = {
                "error": None,
                "response": {
                    "employee_data": serializer.data,
                },
                "message": {
                    'success': True,
                    "successCode": 105,
                    "statusCode": status.HTTP_200_OK,
                    "successMessage": "Employee details updated successfully."
                }
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {
                "error": {
                    "errorCode": 509,
                    "statusCode": status.HTTP_400_BAD_REQUEST,
                    "errorMessage": serializer.errors
                },
                "response": None
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
        
class DeleteUserView(APIView):
    def delete(self, request, user_id):
        try:
            # Fetch the user by ID
            user = Person.objects.get(id=user_id)
        except Person.DoesNotExist:
            response = {
                "error": {
                    "errorCode": 508,
                    "statusCode": status.HTTP_404_NOT_FOUND,
                    "errorMessage": "User not found."
                },
                "response": None
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)

        user.delete()
        response = {
            "error": None,
            "response": None,
            "message": {
                'success': True,
                "successCode": 108,
                "statusCode": status.HTTP_200_OK,
                "successMessage": "User deleted successfully."
            }
        }
        return Response(response, status=status.HTTP_200_OK)
    
#DELETE API    
class DeleteWorkView(APIView):
    def delete(self, request, work_id):
        try:
            # Fetch the work entry by ID
            work = PersonWork.objects.get(id=work_id)
        except PersonWork.DoesNotExist:
            response = {
                "error": {
                    "errorCode": 508,
                    "statusCode": status.HTTP_404_NOT_FOUND,
                    "errorMessage": "Work entry not found."
                },
                "response": None
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)

        work.delete()
        response = {
            "error": None,
            "response": None,
            "message": {
                'success': True,
                "successCode": 108,
                "statusCode": status.HTTP_200_OK,
                "successMessage": "Work entry deleted successfully."
            }
        }
        return Response(response, status=status.HTTP_200_OK)
    
#CHANGE PASSWORD
class ChangePasswordView(APIView):
    def put(self, request, user_id):
        try:
            # Fetch the user by ID
            user = Person.objects.get(id=user_id)
        except Person.DoesNotExist:
            return Response({
                "error": {
                    "errorCode": 508,
                    "statusCode": status.HTTP_404_NOT_FOUND,
                    "errorMessage": "User not found."
                },
                "response": None
            }, status=status.HTTP_404_NOT_FOUND)

        # Validate the provided data
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            # Check the old password
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({
                    "error": {
                        "errorCode": 509,
                        "statusCode": status.HTTP_400_BAD_REQUEST,
                        "errorMessage": "Old password is incorrect."
                    },
                    "response": None
                }, status=status.HTTP_400_BAD_REQUEST)

            # Update the password
            user.password = make_password(serializer.validated_data['new_password'])
            user.save()
            return Response({
                "error": None,
                "response": None,
                "message": {
                    'success': True,
                    "successCode": 106,
                    "statusCode": status.HTTP_200_OK,
                    "successMessage": "Password updated successfully."
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "error": {
                    "errorCode": 510,
                    "statusCode": status.HTTP_400_BAD_REQUEST,
                    "errorMessage": serializer.errors
                },
                "response": None
            }, status=status.HTTP_400_BAD_REQUEST)
        
#ADMIN CHANGE PASSWORD
class AdminChangePasswordView(APIView):
    def put(self, request, user_id):
        try:
            # Fetch the user by ID
            user = Person.objects.get(id=user_id)
        except Person.DoesNotExist:
            return Response({
                "error": {
                    "errorCode": 508,
                    "statusCode": status.HTTP_404_NOT_FOUND,
                    "errorMessage": "User not found."
                },
                "response": None
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = AdminChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            # Update the password without checking the old password
            user.password = make_password(serializer.validated_data['new_password'])
            user.save()
            return Response({
                "error": None,
                "response": None,
                "message": {
                    'success': True,
                    "successCode": 106,
                    "statusCode": status.HTTP_200_OK,
                    "successMessage": "Password updated successfully."
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "error": {
                    "errorCode": 510,
                    "statusCode": status.HTTP_400_BAD_REQUEST,
                    "errorMessage": serializer.errors
                },
                "response": None
            }, status=status.HTTP_400_BAD_REQUEST)
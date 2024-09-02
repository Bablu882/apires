
from django.urls import path
from apiapp.views import *

urlpatterns = [
   # path('adminview/', AdminDashboardView.as_view(), name='admin-dashboard'),
    #path('login', LoginView.as_view(), name='userlogin'),
    path('user/login', UserLoginView.as_view(), name='adminlogin'),
    path('user', UserView.as_view()),
    path('userwork', UserWorkView.as_view()),
    path('register', RegisterView.as_view()),
    path('logout', LogoutView.as_view(), name='logout'),
    path('addwork', AddWorkView.as_view(), name='add-work'),
    path('userwork/<int:user_id>', UserWorkView.as_view(), name='employee-work-detail'),
    path('editwork/<int:work_id>', EditWorkView.as_view(), name='edit-work'),
    path('edituser/<int:user_id>', EditUserView.as_view(), name='edit-employee'),
    path('user/<int:user_id>/', ShowUserView.as_view(), name='show-user'),
    path('deleteuser/<int:user_id>', DeleteUserView.as_view(), name='delete-user'),
    path('deletework/<int:work_id>', DeleteWorkView.as_view(), name='delete-work'),
    path('changepassword/<int:user_id>', ChangePasswordView.as_view(), name='change-password-by-user-id'),
    path('admin/changepassword/<int:user_id>', AdminChangePasswordView.as_view(), name='admin-change-password'),
    

    #path('superlogin', SuperuserView.as_view(), name='superuserlogin'),

]

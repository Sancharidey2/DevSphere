from django.urls import path
from . import views

urlpatterns = [
     path('home', views.home,name="home1"),
     path('addstu', views.calcultor, name="addstu" ),
     path('showAllstudent',views.showAllStudent,name="showAllstudent"),
     path('deleteCourse',views.deletedata,name="deleteCourse"),
     path('deleteCourse_black',views.delete_black,name="deleteCourse_black"),
     path('updateCourse1',views.updatedata,name="updateCourse1"),
     path('updatecourse2',views.UpdateCourse2,name="updatecourse2"),
     path('updateCourse1_b',views.updatedata_b,name="updateCourse1_b"),
     path('updatecourse2_b',views.UpdateCourse2_b,name="updatecourse2_b"),
     path('', views.sign, name='sign'),
     path('signin', views.signin, name='signin'),
     path('login', views.login, name='login'),
     path('displaylogin', views.displaylogin, name='displaylogin'),
     path('logout', views.logout, name='logout'),
     path('a', views.cal2,name='calculator'),
     path('save_calculation/', views.save_calculation,name='save_calculation'),
     path('showAll',views.showAllCal,name="showAllCal"),


]
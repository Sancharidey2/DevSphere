from django.db import models

# Create your models here.
class Student(models.Model):
    s_name1=models.CharField(max_length=100)
    s_name2=models.CharField(max_length=100)
    s_out = models.CharField(max_length=100)

    # def __str__(self):
        # return self.s_name1+" "+str(self.s_name2)= 

class user(models.Model): 
    name=models.CharField(max_length=100)
    email=models.EmailField()
    password=models.CharField(max_length=20)

class User_mod(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField()
    password=models.CharField(max_length=20)
    number=models.CharField(max_length=12)
    message=models.TextField(null=True, blank=True)    

class CalculationResult(models.Model):
    result = models.CharField(max_length=255)  # Adjust the field type as needed
    timestamp = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.result
     
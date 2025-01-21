from django import forms
from app.models import user, User_mod, CalculationResult

class calc(forms.Form):
    num1=forms.CharField(max_length=100)
    num2=forms.CharField(max_length=100)
    operator1 = forms.ChoiceField(choices=  [
            ('+', 'Addition'),
            ('-', 'Subtraction'),
            ('*', 'Multiplication'),

 ])
    

class User1(forms.ModelForm):
    #used in login form
    class Meta:

        model = user
        fields = ['name', 'email', 'password']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': ' UserName', 'id': 'name', 'name': 'name'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Enter Email', 'id': 'mail', 'name': 'mail'}),
            'password': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Password', 'id': 'password', 'name': 'password'}),
            }
        labels = {
            'name': 'Name',
            'email': 'Email',
            'password': 'Password',
        }
class User_Form(forms.ModelForm):
    #used in signin
    class Meta:
        model = User_mod
        fields = ['name', 'email', 'password']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'UserName', 'id': 'name', 'name': 'name'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': '  Your Email', 'id': 'mail', 'name': 'mail'}),
            'password': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Your password', 'id': 'password', 'name': 'password'}),
            }
        labels = {
            'name': 'Name',
            'email': 'Email',
            'password': 'Password',
        }            



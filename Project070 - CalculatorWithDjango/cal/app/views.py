from django.shortcuts import render, HttpResponse,redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from app.models import *
from app.forms import User1,User_Form
from .forms import calc


# Create your views here.
def home(request):
    if request.session.has_key('username') and request.session['password']:
      return HttpResponse("hello")
    else:
          return redirect('displaylogin')  
    


def calcultor(request):
   if request.session.has_key('username') and request.session['password']:
    #   return render(request,"home.html")
    #   out=0
    #   op_CHOICES = [
    #   ('+', 'add'),
    #   ('-', 'sub'),
    #   ('*', 'mul'),
    #    ]  
      # op_CHOICES1=tuple( op_CHOICES)
      if request.method == "POST":
         fm=calc(request.POST)
         if fm.is_valid():
        #    n1= int(request.POST['num1'])
        #    n2= int(request.POST['num2'])
        #    op=(req.POST['operator1'])
           n1= int(fm.cleaned_data['num1'])
           n2= int(fm.cleaned_data['num2'])
           op=(fm.cleaned_data['operator1'])

           if op =="+":
               out=n1+n2
           elif op =="-":
             out=n1-n2
           elif op =="*":
             out=n1*n2
           print(out)
        #  if fm.is_valid():
           Sobj=Student(s_name1=n1,s_name2=n2,s_out = out)
           Sobj.save()
          #  return redirect("showAllstudent") 
        #  fm.save()
    #   else:
        # fm=calc()
           return render(request,"home.html",{'form':fm, 'output':out})
      else:
        fm=calc()
      return render(request, "home.html", {'form': fm})
   else:
      return redirect('displaylogin')  
   


def showAllStudent(request):
      SS=Student.objects.all()
      return render(request,"allStudent.html",{"Skey":SS})

def showAllCal(request):
      cc=CalculationResult.objects.all()
      return render(request,"all_calData.html",{"Ckey":cc})




def deletedata(request):
    cid=request.GET['cid']
    Ckey=CalculationResult.objects.get(id=cid)
    # data= .objects.get(id=eid)
    Ckey.delete()
    return redirect("showAllCal")

def delete_black(request):
    eid=request.GET['eid']
    Skey=Student.objects.get(id=eid)
    Skey.delete()
    return redirect("addstu")




def updatedata(request):
        cid=request.GET['cid']
        Ckey=CalculationResult.objects.get(id=cid)
        return render(request,"updatecal.html",{'Ckey':Ckey})

def updatedata_b(request):
    eid=request.GET['eid']
    Skey=Student.objects.get(id=eid)
    return render(request,"update.html",{'Skey':Skey})

def UpdateCourse2(request):
       try:
          x=request.POST['cres']
          y=request.POST['cid']
          c1=CalculationResult.objects.get(id=y)
          c1.result=x
          c1.save()
          return redirect("showAllCal")
       except Exception as e:
           return HttpResponse(e)
       
def UpdateCourse2_b(request):
    try:
        x=request.POST['cnm']
        a=request.POST['cout']
        y=request.POST['cdur']
        z=request.POST['cid']
        c1=Student.objects.get(id=z)
        c1.s_name1=x
        c1.s_name2=y
        c1.s_out=a
        c1.save()

        return redirect("showAllstudent")
    except Exception as e:
           return HttpResponse(e)




def sign(request):
    ufrm=User1()
    return render(request,'signin.html',{"ufrm":ufrm})  

def signin(request):
         if request.method == 'POST':
                    ufrm=User_Form(request.POST)
                    try:
                        if ufrm.is_valid():
                                ufrm.save()
                                print("saved",ufrm)
                        return redirect('displaylogin')
                    except Exception as e:
                        ufrm=User1()
                        return render(request,'signin.html',{"ufrm":ufrm})     
         else:
                        return render(request,'signin.html')  

def login(request):
    if request.method == 'POST':
        name=request.POST['name']
        password=request.POST['password']
        mail=request.POST['email']
        try:
            
            if User_mod.objects.filter(name=name,password=password,email=mail):
                request.session['username']=name
                request.session['password']=password
                request.session['email']=mail
                return render(request, 'zbbz.html', {'username':name, 'password':password,'email':mail})
            else:
                ufrm=User_Form()
                return render(request, 'login.html',{"ufrm":ufrm})
        except Exception as e:
            ufrm=User_Form()
            return render(request, 'login.html',{"ufrm":ufrm}) 
    else:
        ufrm=User_Form()
        return render(request, 'login.html',{"ufrm":ufrm})

def displaylogin(request):
    ufrm=User_Form()
    return render(request,'login.html',{"ufrm":ufrm})    

def logout(request):
    if request.session.has_key('username'):
        del request.session['username']
        del request.session['password']
        del request.session['email']
    return redirect('displaylogin')





def cal2(request):
   if request.session.has_key('username') and request.session['password']:
      return render(request,"zbbz.html")
   else:
       return render(request,'signin.html')  

@csrf_exempt
def save_calculation(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        result = data.get('result')
        
        # Save to the database
        calc_result = CalculationResult(result=result)  # Adjust for your model
        calc_result.save()
        
        return JsonResponse({'message': 'Calculation saved successfully!'}, status=201)
    return JsonResponse({'error': 'Invalid request'}, status=400)


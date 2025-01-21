from django.contrib import admin
# Register your models here.
from app.models import *
from django.apps import apps

# admin.site.register(Student)

app_models = apps.get_app_config('app').get_models()
for model in app_models:
    admin.site.register(model)
from django.contrib import admin
from app.models import Contact,Orders,OrderUpdate,product

admin.site.register(Contact)
admin.site.register(product)
admin.site.register(Orders) 
admin.site.register(OrderUpdate)

# Register your models here.

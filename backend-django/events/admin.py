from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Event)
admin.site.register(EventFAQ)
admin.site.register(EventRegistration)
admin.site.register(EventLike)

from django.contrib import admin
from .models import Member, Activity, Setting, ActivityType
# Register your models here.

admin.site.register(Member)
admin.site.register(Activity)
admin.site.register(Setting)
admin.site.register(ActivityType)
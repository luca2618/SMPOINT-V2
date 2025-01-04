from django.contrib import admin
from django.urls import path
from .models import Member, Activity, Setting, ActivityType
# Register your models here.


def mark_as_approved(modeladmin, request, queryset):
    queryset.update(approved=True)
    modeladmin.message_user(request, "Selected activities have been marked as approved.")
mark_as_approved.short_description = "Mark selected activities as approved"

# Custom action to delete unapproved activities
def delete_unapproved_activities(modeladmin, request, queryset):
    count = queryset.filter(approved=False).count()
    if count > 0:
        queryset.filter(approved=False).delete()
        modeladmin.message_user(request, f'{count} unapproved activities were successfully deleted.')
    else:
        modeladmin.message_user(request, 'No unapproved activities found.')

delete_unapproved_activities.short_description = "Delete all unapproved activities"

class ActivityAdmin(admin.ModelAdmin):
    list_display = ('id', 'studynr', 'activity', 'points', 'comment', 'approved', 'date')  # Fields to display in the list
    list_filter = ('approved', 'activity', 'date')  # Fields to filter on
    search_fields = ('studynr', 'activity', 'comment','date')  # Optional: Fields to search by
    actions = [mark_as_approved, delete_unapproved_activities]
class MemberAdmin(admin.ModelAdmin):
    list_display = ('studynr', 'name', 'points', 'email')  # Fields to display in the list
    #list_filter = ['points']  # Fields to filter on
    search_fields = ('studynr', 'name', 'points')  # Optional: Fields to search by

admin.site.register(Member,MemberAdmin)
admin.site.register(Activity,ActivityAdmin)
admin.site.register(Setting)
admin.site.register(ActivityType)
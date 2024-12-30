from django.db import models
from django.db.models import Sum


# Remember date format is YYYY-MM-DD

class Member(models.Model):
    studynr = models.CharField(max_length=255)  # Student ID
    name = models.CharField(max_length=255)  # Name
    email = models.EmailField(max_length=255)  # Email
    points = models.FloatField()  # Points
    card_id = models.CharField(max_length=255, null=True, blank=True)  # Card ID (optional)

    def __str__(self):
        return self.name  # Return the name as a string representation
    
    def update_points(self):
        legacy_date = Setting.objects.get(setting_key="legacy_date").setting_value  # Fetch the legacy date setting
        self.points = Activity.objects.filter(approved=True, date__gte=legacy_date).aggregate(Sum('points'))['points__sum'] or 0  # Calculate the sum of approved activities since the legacy date
        self.save()  # Save the updated points

    def add_activity(self, activity, points, comment, date, approved=True):
        # Add a new activity for the member
        Activity.objects.create(
            studynr=self,
            activity=activity,
            points=points,
            comment=comment,
            date=date,
            approved=approved
        )
        self.update_points()  # Update the member's points after adding the activity


class Meeting(models.Model):
    date = models.DateField()  # Date of the meeting
    code = models.CharField(max_length=255)  # Meeting code
    creator = models.CharField(max_length=255)  # Meeting creator

    def __str__(self):
        return f"Meeting on {self.date}"  # Return a string representation of the meeting


# class Admin(models.Model):
#     name = models.CharField(max_length=255)  # Admin's name
#     email = models.EmailField(max_length=255)  # Admin's email
#     password = models.CharField(max_length=255)  # Admin's password
#     role = models.CharField(max_length=255)  # Admin's role
#     date = models.DateField()  # Date the admin was added

#     def __str__(self):
#         return self.name  # Return admin's name


class ActivityType(models.Model):
    activity = models.CharField(max_length=255)  # Activity name
    points = models.FloatField()  # Points for the activity
    description = models.CharField(max_length=255)  # Activity description

    def __str__(self):
        return self.activity  # Return the activity as a string representation


class Activity(models.Model):
    studynr = models.CharField(max_length=255)  # Student ID
    activity = models.CharField(max_length=255)  # Activity name
    points = models.FloatField()
    comment = models.CharField(max_length=255, null=True, blank=True)
    approved = models.BooleanField(default=False)
    date = models.DateField()

class Setting(models.Model):
    setting_key = models.CharField(max_length=255, primary_key=True)
    setting_value = models.CharField(max_length=255)

    def __str__(self):
        return self.setting_key

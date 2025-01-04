# serializers.py
from rest_framework import serializers
from .models import Member, Activity, ActivityType

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['studynr', 'name', 'email', 'points']

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'studynr', 'activity', 'points', 'comment', 'date', 'approved']

class ActivityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType
        fields = ['id', 'activity', 'points', 'description']

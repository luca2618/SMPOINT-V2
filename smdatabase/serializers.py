# serializers.py
from rest_framework import serializers
from .models import Member, Activity

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'studynr', 'name', 'email', 'points']

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'studynr', 'activity', 'points', 'comment', 'date', 'approved']

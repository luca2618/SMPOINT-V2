from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404, redirect
from django.views.decorators.http import require_POST
from rest_framework import viewsets
from .models import Member, Activity, ActivityType
from .serializers import MemberSerializer, ActivitySerializer, ActivityTypeSerializer


class ActivityTypeViewSet(viewsets.ModelViewSet):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        """
        Override get_permissions to use different permissions based on the HTTP method.
        """
        if self.action == 'list' or self.action == 'retrieve':
            # Allow any user (unauthenticated users) to access GET requests
            permission_classes = [AllowAny]
        else:
            # Require authentication for POST, PUT, DELETE
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    def get_permissions(self):
        """
        Override get_permissions to use different permissions based on the HTTP method.
        """
        if self.action == 'list' or self.action == 'retrieve':
            # Allow any user (unauthenticated users) to access GET requests
            permission_classes = [AllowAny]
        else:
            # Require authentication for POST, PUT, DELETE
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        # Check if the user is an admin
        if self.request.user.is_staff:
            # If the user is an admin, set approved to True
            serializer.save(approved=True)
        else:
            # Otherwise, set approved to False
            serializer.save(approved=False)

    def get_permissions(self):
        """
        Override get_permissions to use different permissions based on the HTTP method.
        """
        if self.action == 'list' or self.action == 'retrieve':
            # Allow any user (unauthenticated users) to access GET requests
            permission_classes = [AllowAny]
        else:
            # Require authentication for POST, PUT, DELETE
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

# Require login and admin privileges
@login_required
@require_POST  # Ensures that only POST requests are allowed
def add_activity(request):
    if not request.user.is_staff:  # Check if the user is an admin
        return JsonResponse({"error": "You do not have permission to add activities."}, status=403)

    studynr = request.POST.get('studynr')
    aktivitet = request.POST.get('activity')
    points = float(request.POST.get('points'))
    comment = request.POST.get('comment', '')
    date = request.POST.get('date')

    member = get_object_or_404(Member, studynr=studynr)
    member.add_activity(aktivitet, points, comment, date)
    
    return redirect('member_detail', studynr=studynr)
@login_required(login_url="/admin/login/")
def update_points(request, studynr):
    if not request.user.is_staff:  # Check if the user is an admin
        return JsonResponse({"error": "You do not have permission to add activities."}, status=403)
    member = get_object_or_404(Member, studynr=studynr)
    member.update_points()
    return JsonResponse({"success": True, "points": member.points})


import json
def import_data(request):
    if request.method == 'POST' and request.FILES['json_file']:
        json_file = request.FILES['json_file']
        data = json.load(json_file)[2]["data"]
        for item in data:
            member = Member(
                studynr=item['studienr'],
                name=item['navn'],
                email=item['email'],
                points = item['point']
            )
            member.save()
        return JsonResponse({"success": True, "points": member.points})
    return render(request, 'form.html')
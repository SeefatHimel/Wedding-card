from django.urls import path

from .views import rsvp_collection

urlpatterns = [
    path('rsvps/', rsvp_collection, name='rsvp-collection'),
]

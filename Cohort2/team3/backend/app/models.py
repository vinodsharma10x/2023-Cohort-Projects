from django.db import models
from django.conf import settings


class Itinerary(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Attraction(models.Model):
    name = models.CharField(max_length=300)
    itinerary = models.ManyToManyField("Itinerary")
    #description
    #location

class Flight(models.Model):
    itinerary = models.ManyToManyField("Itinerary")
    origin_airport_code = models.CharField(max_length=3)
    destination_airport_code = models.CharField(max_length=3)
    departure_datetime = models.DateTimeField()
    arrival_datetime = models.DateTimeField()
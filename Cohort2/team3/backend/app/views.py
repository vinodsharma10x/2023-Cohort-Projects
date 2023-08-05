from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Itinerary, Flight, Attraction
from . import serializers
from .external_apis import FlightsAPI, AttractionsAPI
from users.models import CustomUser

User = CustomUser

# Itinerary views


class ItineraryViewSet(viewsets.ModelViewSet):
    queryset = Itinerary.objects.all()
    serializer_class = serializers.ItinerarySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        query_set = queryset.filter(owner=user)
        return query_set

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(owner=self.request.user)
        else:
            serializer.save()


class AttractionViewSet(viewsets.ModelViewSet):
    queryset = Attraction.objects.all()
    serializer_class = serializers.AttractionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        # list itineraries where user is the owner
        user_owned_itineraries = Itinerary.objects.filter(owner=user)
        # list attractions where attraction's itinerary is in the list of user owned itineraries
        query_set = queryset.filter(itinerary__in=user_owned_itineraries)
        return query_set

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        owner_of_itinerary = serializer.validated_data['itinerary'].owner
        if user == owner_of_itinerary:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response({"message": "User does not have access to this itinerary."}, status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, *args, **kwargs):

        # Get requesting user
        user = request.user
        # Get list of itineraries linked to user
        user_owned_itineraries = Itinerary.objects.filter(owner=user)
        # list attractions where attraction's itinerary is in the list of user owned itineraries
        user_owned_attractions = self.queryset.filter(
            itinerary__in=user_owned_itineraries)
        target_attraction = self.queryset.get(id=self.kwargs['pk'])
        serializer = self.get_serializer(
            target_attraction, data=request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            if target_attraction not in user_owned_attractions:
                return Response({"message": "User does not have access to this itinerary."}, status=status.HTTP_401_UNAUTHORIZED)

            if not serializer.validated_data.get('itinerary'):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            if serializer.validated_data.get('itinerary') in user_owned_itineraries:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({"message": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)


# Flight views
class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = serializers.FlightSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        # list itineraries where user is the owner
        user_owned_itineraries = Itinerary.objects.filter(owner=user)
        # list flights where flight's itinerary is in the list of user owned itineraries
        query_set = queryset.filter(itinerary__in=user_owned_itineraries)
        return query_set

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        owner_of_itinerary = serializer.validated_data['itinerary'].owner
        if user == owner_of_itinerary:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response({"message": "User does not have access to this itinerary."}, status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, *args, **kwargs):
        user = request.user
        user_owned_itineraries = Itinerary.objects.filter(owner=user)
        user_owned_flights = self.queryset.filter(
            itinerary__in=user_owned_itineraries)

        target_flight = self.queryset.get(id=self.kwargs['pk'])

        serializer = self.get_serializer(
            target_flight, data=request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            if target_flight not in user_owned_flights:
                return Response({"message": "User does not have access to this itinerary."}, status=status.HTTP_401_UNAUTHORIZED)

            if not serializer.validated_data.get('itinerary'):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            if serializer.validated_data.get('itinerary') in user_owned_itineraries:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)


# External APIs
class FindFlightsView(APIView):
    queryset = Flight.objects.all()
    permission_classes = [IsAuthenticated]

    def post(self, request):
        origin_city = request.data.get('origin')
        destination_city = request.data.get('destination')
        departure_date = request.data.get('date')

        if origin_city is None or destination_city is None or departure_date is None:
            return Response({"message": "Origin city, destination city, and date are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        r = FlightsAPI.get_airports_near_city(origin_city)
        if not r.ok:
            return Response({"message": "API service currently unavailable"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        origin_airport_data = r.json()
        if len(origin_airport_data) < 1:
            return Response({"message": f'No airports found for city {origin_city}'}, status=status.HTTP_400_BAD_REQUEST)
        
        origin_airports = [item['id'] for item in origin_airport_data if item['subType'] == 'AIRPORT']

        r = FlightsAPI.get_airports_near_city(destination_city)
        if not r.ok:
            return Response({"message": "Service currently unavailable"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        destination_airport_data = r.json()
        if len(destination_airport_data) < 1:
            return Response({"message": f'No airports found for city {destination_city}'}, status=status.HTTP_400_BAD_REQUEST)
        
        destination_airports = [item['id'] for item in destination_airport_data if item['subType'] == 'AIRPORT']

        departures_req = FlightsAPI.get_flights()


        return Response({"data": destination_airports})






class FindAttractionsView(APIView):
    # data = r.json()
    # latitude = data['lat']
    # longitude = data['lon']
    # radius = 48280  # 4820 km = 30 miles
    pass

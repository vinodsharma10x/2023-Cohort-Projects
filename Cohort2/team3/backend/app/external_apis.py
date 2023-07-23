import requests
import json

config = json.load("secrets.json")

class FlightsAPI():

    def get_airports_near_city(city):
        # city min length = 3, max length = 50
        url = "https://priceline-com-provider.p.rapidapi.com/v1/flights/locations"
        querystring = {"name": city}

        headers = {
            "X-RapidAPI-Key": config['api']['flights']['api_key'],
            "X-RapidAPI-Host": config['api']['flights']['api_host']
        }

        response = requests.get(url, headers=headers, params=querystring)
        return response

    def get_flights(departure_date, origin_airport_code, destination_airport_code):

        url = "https://priceline-com-provider.p.rapidapi.com/v2/flight/roundTrip"

        querystring = {"sid": "iSiX639", "adults": "1", "departure_date": departure_date,
                       "destination_airport_code": destination_airport_code, "origin_airport_code": origin_airport_code}

        headers = {
            "X-RapidAPI-Key": config['api']['flights']['api_key'],
            "X-RapidAPI-Host": config['api']['flights']['api_host']
        }

        response = requests.get(url, headers=headers, params=querystring)

        return response


class AttractionsAPI():

    def get_coordinates_by_city(city):
        # refactor get_attractions_by_city? can split functions into 2
        pass

    def get_attractions_by_city(city):
        attractions_api_key = config['api']['attractions']['api_key']
        get_coordinates_url = f'https://api.opentripmap.com/0.1/en/places/geoname?name={city}&apikey={attractions_api_key}'

        r = requests.get(get_coordinates_url)

        if r.status_code != 200:
            return "return error here"

        data = r.json()
        latitude = data['lat']
        longitude = data['lon']
        radius = 48280  # 4820 km = 30 miles
        get_places_url = f'https://api.opentripmap.com/0.1/en/places/radius?radius={radius}&lon={longitude}&lat={latitude}&apikey={attractions_api_key}'
        response = requests.get(get_places_url)
        f = open('get_attractions_by_city.json', 'w')
        f.write(json.dumps(response.json()))
        return response
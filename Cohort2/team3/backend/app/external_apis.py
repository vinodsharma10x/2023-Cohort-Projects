import requests

# Move to secrets file later
# Flights api keys
X_RapidAPI_Key = 'e5271c74c7msh336578886b36ce5p1b7fb3jsnf74ff4318717'
X_RapidAPI_Host = "priceline-com-provider.p.rapidapi.com"

# Attractions api keys
attractions_api_key = '5ae2e3f221c38a28845f05b60ffcf38d0eecc62a698a2c6e2d0c58fe'


class FlightsAPI():
    def get_flights(departure_date, origin_airport_code, destination_airport_code):

        url = "https://priceline-com-provider.p.rapidapi.com/v2/flight/roundTrip"

        querystring = {"sid": "iSiX639", "adults": "1", "departure_date": departure_date,
                       "destination_airport_code": destination_airport_code, "origin_airport_code": origin_airport_code}

        headers = {
            "X-RapidAPI-Key": X_RapidAPI_Key,
            "X-RapidAPI-Host": X_RapidAPI_Host
        }

        response = requests.get(url, headers=headers, params=querystring)

        return response


class AttractionsAPI():

    def get_coordinates_by_city(city):
        # refactor get_attractions_by_city? can split functions into 2
        pass

    def get_attractions_by_city(city):
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
        return response

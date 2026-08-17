import requests

r = requests.get('http://192.168.29.152:8000/hi')
print(f"Response Code: {r.status_code},\nResponse: {r.json()}")

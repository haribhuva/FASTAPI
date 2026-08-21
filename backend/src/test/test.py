import requests

params = {"who": "Harii"}
r = requests.post('http://192.168.29.152:8000/hi', headers=params)
print(f"Response Code: {r.status_code},\nResponse: {r.json()}")

import http.client
import json

conn = http.client.HTTPConnection("127.0.0.1", 5000)

# Test health
print("Testing /api/health...")
conn.request("GET", "/api/health")
response = conn.getresponse()
print(f"Status: {response.status}")
print(f"Response: {response.read().decode()}\n")

# Test login
print("Testing /api/admin/login...")
conn = http.client.HTTPConnection("127.0.0.1", 5000)
headers = {'Content-type': 'application/json'}
body = json.dumps({"username": "admin", "password": "admin123"})
conn.request("POST", "/api/admin/login", body, headers)
response = conn.getresponse()
print(f"Status: {response.status}")
print(f"Response: {response.read().decode()}")

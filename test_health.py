import urllib.request

# Test health endpoint first
url = "http://localhost:5000/api/health"

try:
    with urllib.request.urlopen(url) as response:
        print(f"Health check status: {response.status}")
        print(f"Response: {response.read().decode('utf-8')}")
except Exception as e:
    print(f"Error: {e}")

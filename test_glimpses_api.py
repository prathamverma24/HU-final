import os
import sys

backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
os.chdir(backend_dir)
sys.path.insert(0, backend_dir)

from app import app
import json

with app.app_context():
    with app.test_client() as client:
        print('Testing /api/glimpses endpoint...')
        print('-' * 60)
        
        response = client.get('/api/glimpses')
        
        print(f'Status Code: {response.status_code}')
        print(f'Content-Type: {response.content_type}')
        print('-' * 60)
        
        if response.status_code == 200:
            data = response.get_json()
            print(f'Response Data:')
            print(json.dumps(data, indent=2))
            print('-' * 60)
            print(f'✓ API is working! Found {len(data)} glimpses')
        else:
            print(f'✗ API Error: {response.status_code}')
            print(response.data.decode())

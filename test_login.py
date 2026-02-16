#!/usr/bin/env python
"""Test admin login directly"""

import requests
import json

url = "http://localhost:5000/api/admin/login"
data = {"username": "admin", "password": "admin123"}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        print("\n✓ Login successful!")
    else:
        print("\n✗ Login failed!")
        print("\nTrying to check database...")
        
        import sys
        import os
        sys.path.insert(0, 'backend')
        os.chdir('backend')
        
        from app import app, db
        from models import Admin
        
        with app.app_context():
            admin = Admin.query.filter_by(username='admin').first()
            if admin:
                print(f"Admin user exists in database: {admin.username}")
                print(f"Password check: {admin.check_password('admin123')}")
            else:
                print("No admin user found in database!")
                
except requests.exceptions.ConnectionError:
    print("✗ Cannot connect to backend server!")
    print("Make sure the backend is running on http://localhost:5000")
except Exception as e:
    print(f"Error: {e}")

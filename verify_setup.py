#!/usr/bin/env python
"""Verify the complete setup is working"""

import sys
import os
import json

# Test 1: Check database
print("="*60)
print("TEST 1: Checking Database")
print("="*60)

backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_dir)
original_dir = os.getcwd()
os.chdir(backend_dir)

from app import app, db
from models import Admin

with app.app_context():
    admin = Admin.query.filter_by(username='admin').first()
    if admin and admin.check_password('admin123'):
        print("✓ Database: OK")
        print(f"  Admin user exists: {admin.username}")
        print(f"  Password verified: admin123")
    else:
        print("✗ Database: FAILED")
        sys.exit(1)

os.chdir(original_dir)

# Test 2: Check API endpoint
print("\n" + "="*60)
print("TEST 2: Checking API Endpoint")
print("="*60)

import http.client

conn = http.client.HTTPConnection("127.0.0.1", 5000)
headers = {'Content-type': 'application/json'}
body = json.dumps({"username": "admin", "password": "admin123"})

try:
    conn.request("POST", "/api/admin/login", body, headers)
    response = conn.getresponse()
    data = response.read().decode()
    
    if response.status == 200:
        print("✓ API Endpoint: OK")
        print(f"  Status: {response.status}")
        print(f"  Response: {data}")
    else:
        print(f"✗ API Endpoint: FAILED (Status {response.status})")
        sys.exit(1)
except Exception as e:
    print(f"✗ API Endpoint: FAILED ({e})")
    print("  Make sure backend is running: python backend/app.py")
    sys.exit(1)

# Test 3: Check frontend files
print("\n" + "="*60)
print("TEST 3: Checking Frontend Files")
print("="*60)

frontend_files = [
    'frontend/src/pages/AdminLogin.js',
    'frontend/src/pages/AdminDashboard.js',
    'frontend/src/services/api.js',
    'frontend/src/App.js'
]

all_exist = True
for file in frontend_files:
    if os.path.exists(file):
        print(f"✓ {file}")
    else:
        print(f"✗ {file} - MISSING")
        all_exist = False

if not all_exist:
    sys.exit(1)

# Summary
print("\n" + "="*60)
print("SETUP VERIFICATION COMPLETE")
print("="*60)
print("\n✓ All tests passed!")
print("\nYou can now login with:")
print("  URL: http://localhost:3000/admin/login")
print("  Username: admin")
print("  Password: admin123")
print("\nMake sure both servers are running:")
print("  Backend: python backend/app.py")
print("  Frontend: cd frontend && npm start")

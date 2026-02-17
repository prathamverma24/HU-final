#!/usr/bin/env python3
"""
Verification script to check if glimpses are properly set up
"""

import os
import sys

backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
os.chdir(backend_dir)
sys.path.insert(0, backend_dir)

from app import app, db
from models import Glimpse

print("=" * 70)
print("GLIMPSES SETUP VERIFICATION")
print("=" * 70)
print()

with app.app_context():
    # Check database
    print("1. Checking Database...")
    glimpses = Glimpse.query.all()
    print(f"   ✓ Found {len(glimpses)} glimpse(s) in database")
    
    for g in glimpses:
        print(f"   - {g.title} (Active: {g.is_active})")
    print()
    
    # Check API endpoint
    print("2. Checking API Endpoint...")
    with app.test_client() as client:
        response = client.get('/api/glimpses')
        if response.status_code == 200:
            data = response.get_json()
            print(f"   ✓ API endpoint working! Returns {len(data)} glimpse(s)")
        else:
            print(f"   ✗ API endpoint error: {response.status_code}")
    print()
    
    # Check image files
    print("3. Checking Image Files...")
    for g in glimpses:
        static_path = os.path.join('..', 'static', g.image_path)
        frontend_path = os.path.join('..', 'frontend', 'public', g.image_path)
        
        static_exists = os.path.exists(static_path)
        frontend_exists = os.path.exists(frontend_path)
        
        print(f"   {g.title}:")
        print(f"     - static/images: {'✓' if static_exists else '✗'}")
        print(f"     - frontend/public/images: {'✓' if frontend_exists else '✗'}")
    print()
    
    print("=" * 70)
    print("VERIFICATION COMPLETE")
    print("=" * 70)
    print()
    print("Next Steps:")
    print("1. Make sure backend is running: python backend/app.py")
    print("2. Make sure frontend is running: cd frontend && npm start")
    print("3. Open browser to: http://localhost:3000")
    print("4. Check browser console for any errors")
    print("5. Look for 'Enjoy the Events with HU Family' section")
    print()

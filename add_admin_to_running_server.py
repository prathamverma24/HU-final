#!/usr/bin/env python
"""Add admin user to the currently running backend server's database"""

import sys
import os

# Change to backend directory first
backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
os.chdir(backend_dir)
sys.path.insert(0, backend_dir)

from flask import Flask
from config import Config
from models import db, Admin

# Create a separate Flask app instance to access the database
app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

with app.app_context():
    try:
        # Try to create tables
        db.create_all()
        
        # Check if admin exists
        admin = Admin.query.filter_by(username='admin').first()
        
        if admin:
            print("Admin user already exists!")
            print(f"Username: {admin.username}")
            print(f"Testing password 'admin123': {admin.check_password('admin123')}")
            
            if not admin.check_password('admin123'):
                print("\nPassword doesn't match! Updating password...")
                admin.set_password('admin123')
                db.session.commit()
                print("✓ Password updated!")
        else:
            print("Creating new admin user...")
            admin = Admin(username='admin')
            admin.set_password('admin123')
            db.session.add(admin)
            db.session.commit()
            print("✓ Admin user created!")
        
        print("\n" + "="*60)
        print("ADMIN LOGIN CREDENTIALS")
        print("="*60)
        print("Username: admin")
        print("Password: admin123")
        print("="*60)
        print("\nNow try logging in at: http://localhost:3000/admin/login")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

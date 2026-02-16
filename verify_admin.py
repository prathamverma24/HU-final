#!/usr/bin/env python
"""Verify admin user exists and show credentials"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from backend.app import app
from backend.models import db, Admin

def verify_admin():
    """Check if admin user exists"""
    with app.app_context():
        # Create tables if they don't exist
        db.create_all()
        
        # Check for admin user
        admin = Admin.query.filter_by(username='admin').first()
        
        if admin:
            print("✓ Admin user exists in database!")
            print("\n" + "="*50)
            print("ADMIN LOGIN CREDENTIALS")
            print("="*50)
            print("Username: admin")
            print("Password: admin123")
            print("="*50)
            print("\nLogin URL: http://localhost:3000/admin/login")
            print("\nNote: Change password after first login!")
        else:
            print("Creating admin user...")
            admin = Admin(username='admin')
            admin.set_password('admin123')
            db.session.add(admin)
            db.session.commit()
            
            print("✓ Admin user created successfully!")
            print("\n" + "="*50)
            print("ADMIN LOGIN CREDENTIALS")
            print("="*50)
            print("Username: admin")
            print("Password: admin123")
            print("="*50)
            print("\nLogin URL: http://localhost:3000/admin/login")

if __name__ == '__main__':
    verify_admin()

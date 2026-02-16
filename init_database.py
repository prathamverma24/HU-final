#!/usr/bin/env python
"""Initialize database and create admin user"""

import sys
import os

# Add backend directory to path
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_path)

# Change to backend directory
os.chdir(backend_path)

from app import app, db
from models import Admin

def init_database():
    """Initialize database and create admin user"""
    with app.app_context():
        print("Creating database tables...")
        db.create_all()
        
        # Check if admin user exists
        admin = Admin.query.filter_by(username='admin').first()
        
        if admin:
            print("\n✓ Admin user already exists!")
        else:
            print("\nCreating admin user...")
            admin = Admin(username='admin')
            admin.set_password('admin123')
            db.session.add(admin)
            db.session.commit()
            print("✓ Admin user created successfully!")
        
        print("\n" + "="*60)
        print("ADMIN LOGIN CREDENTIALS")
        print("="*60)
        print("Username: admin")
        print("Password: admin123")
        print("="*60)
        print("\nLogin URL: http://localhost:3000/admin/login")
        print("\nDatabase location:", app.config['SQLALCHEMY_DATABASE_URI'])
        print("\n⚠️  IMPORTANT: Change password after first login!")

if __name__ == '__main__':
    init_database()

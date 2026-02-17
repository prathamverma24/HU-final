#!/usr/bin/env python3
"""
Simple script to add the Glimpse table to the database
"""

import os
import sys

# Set working directory to backend
backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
os.chdir(backend_dir)
sys.path.insert(0, backend_dir)

# Now import after changing directory
from app import app, db
from models import Glimpse

print("Starting database migration...")
print("This will add the Glimpse table without affecting existing data.")
print("-" * 60)

with app.app_context():
    try:
        # Create all tables (only creates missing ones)
        db.create_all()
        print("✓ Database migration completed successfully!")
        print("✓ Glimpse table created (if it didn't exist)")
        
        # Check if table exists by querying it
        glimpse_count = Glimpse.query.count()
        print(f"✓ Current glimpses in database: {glimpse_count}")
        
        print("-" * 60)
        print("Migration completed! You can now:")
        print("1. Go to Admin Dashboard")
        print("2. Click 'Add Glimpse' button")
        print("3. Add event glimpses with videos")
        print("4. View them in 'Enjoy the Events with HU Family' section")
        
    except Exception as e:
        print(f"✗ Error during migration: {e}")
        print("-" * 60)
        print("Migration failed. Please check the error messages above.")
        sys.exit(1)

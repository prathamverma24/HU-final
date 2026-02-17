#!/usr/bin/env python3
"""
Migration script to add the Glimpse table to the database
Run this script to create the glimpse table without affecting existing data
"""

import sys
import os

# Change to backend directory
os.chdir(os.path.join(os.path.dirname(__file__), 'backend'))

from app import app, db
from models import Glimpse

def migrate_database():
    """Create glimpse table if it doesn't exist"""
    with app.app_context():
        try:
            # Create all tables (only creates missing ones)
            db.create_all()
            print("✓ Database migration completed successfully!")
            print("✓ Glimpse table created (if it didn't exist)")
            
            # Check if table exists by querying it
            glimpse_count = Glimpse.query.count()
            print(f"✓ Current glimpses in database: {glimpse_count}")
            
        except Exception as e:
            print(f"✗ Error during migration: {e}")
            return False
    
    return True

if __name__ == '__main__':
    print("Starting database migration...")
    print("This will add the Glimpse table without affecting existing data.")
    print("-" * 60)
    
    success = migrate_database()
    
    if success:
        print("-" * 60)
        print("Migration completed! You can now:")
        print("1. Go to Admin Dashboard")
        print("2. Click 'Add Glimpse' button")
        print("3. Add event glimpses with videos")
        print("4. View them in 'Enjoy the Events with HU Family' section")
    else:
        print("-" * 60)
        print("Migration failed. Please check the error messages above.")
        sys.exit(1)

#!/usr/bin/env python3
"""
Quick script to check if DATABASE_URL is being read correctly
Run this on Railway or locally to debug database connection issues
"""

import os
from dotenv import load_dotenv

# Load .env file (if it exists)
load_dotenv()

print("=" * 60)
print("DATABASE CONFIGURATION CHECK")
print("=" * 60)

# Check if DATABASE_URL is set
database_url = os.getenv('DATABASE_URL')

if database_url:
    print(f"✅ DATABASE_URL is set")
    print(f"   Value: {database_url[:50]}..." if len(database_url) > 50 else f"   Value: {database_url}")
    
    # Check database type
    if database_url.startswith('postgresql'):
        print("   Type: PostgreSQL")
        
        # Check if it's internal or public
        if 'railway.internal' in database_url:
            print("   Network: Internal (correct for Railway)")
        else:
            print("   Network: Public (may not work within Railway)")
            
    elif database_url.startswith('sqlite'):
        print("   Type: SQLite")
        print("   ⚠️  WARNING: SQLite data will be lost on Railway redeploys!")
    else:
        print(f"   Type: Unknown ({database_url.split(':')[0]})")
else:
    print("❌ DATABASE_URL is NOT set")
    print("   The application will use SQLite by default")
    print("   SQLite data will be LOST on Railway redeploys!")

print("=" * 60)

# Check other important environment variables
print("\nOTHER ENVIRONMENT VARIABLES:")
print("-" * 60)

env_vars = [
    'SECRET_KEY',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'PORT'
]

for var in env_vars:
    value = os.getenv(var)
    if value:
        # Mask sensitive values
        if 'KEY' in var or 'SECRET' in var or 'PASSWORD' in var:
            display_value = value[:4] + "..." + value[-4:] if len(value) > 8 else "***"
        else:
            display_value = value
        print(f"✅ {var}: {display_value}")
    else:
        print(f"❌ {var}: Not set")

print("=" * 60)

# Try to import and check Flask config
try:
    import sys
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    
    from backend.config import Config
    
    print("\nFLASK CONFIG CHECK:")
    print("-" * 60)
    print(f"SQLALCHEMY_DATABASE_URI: {Config.SQLALCHEMY_DATABASE_URI[:50]}...")
    
    if 'postgresql' in Config.SQLALCHEMY_DATABASE_URI:
        print("✅ Flask is configured to use PostgreSQL")
    elif 'sqlite' in Config.SQLALCHEMY_DATABASE_URI:
        print("⚠️  Flask is configured to use SQLite")
        print("   This means DATABASE_URL is not set or not being read")
    
    print("=" * 60)
    
except Exception as e:
    print(f"\n⚠️  Could not import Flask config: {e}")
    print("=" * 60)

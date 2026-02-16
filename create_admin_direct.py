#!/usr/bin/env python
"""Direct script to create admin user in database"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from werkzeug.security import generate_password_hash
import psycopg2
from urllib.parse import urlparse

# Database URL from .env
DATABASE_URL = "postgresql://postgres:[YOUR-PASSWORD]@db.awlgitbnciylupdntivn.supabase.co:5432/postgres"

def create_admin():
    """Create admin user directly in database"""
    try:
        # Parse database URL
        result = urlparse(DATABASE_URL)
        username = result.username
        password = result.password
        database = result.path[1:]
        hostname = result.hostname
        port = result.port
        
        # Connect to database
        conn = psycopg2.connect(
            database=database,
            user=username,
            password=password,
            host=hostname,
            port=port
        )
        
        cur = conn.cursor()
        
        # Check if admin table exists
        cur.execute("""
            CREATE TABLE IF NOT EXISTS admin (
                id SERIAL PRIMARY KEY,
                username VARCHAR(80) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL
            )
        """)
        
        # Check if admin user exists
        cur.execute("SELECT * FROM admin WHERE username = 'testadmin'")
        existing = cur.fetchone()
        
        if existing:
            print("Admin user 'testadmin' already exists!")
            print("\nLogin Credentials:")
            print("  Username: testadmin")
            print("  Password: Test@123")
        else:
            # Create new admin user
            password_hash = generate_password_hash('Test@123')
            cur.execute(
                "INSERT INTO admin (username, password_hash) VALUES (%s, %s)",
                ('testadmin', password_hash)
            )
            conn.commit()
            
            print("✓ Test admin user created successfully!")
            print("\nLogin Credentials:")
            print("  Username: testadmin")
            print("  Password: Test@123")
            print("\nAdmin Dashboard: /admin/login")
        
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")
        print("\nPlease update the DATABASE_URL in this script with your actual database password.")

if __name__ == '__main__':
    create_admin()

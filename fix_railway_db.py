"""
Direct database fix for Railway - Run this once to fix the glimpse table
"""
import os
import sys

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from flask import Flask
from models import db
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

def fix_glimpse_table():
    """Fix the glimpse table to make image_path nullable"""
    with app.app_context():
        try:
            # Get the database connection
            connection = db.engine.raw_connection()
            cursor = connection.cursor()
            
            print("Checking glimpse table schema...")
            
            # Check if table exists
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='glimpse'")
            if not cursor.fetchone():
                print("Glimpse table doesn't exist. Creating with correct schema...")
                db.create_all()
                print("✓ Table created successfully!")
                return
            
            # Check current schema
            cursor.execute("PRAGMA table_info(glimpse)")
            columns = cursor.fetchall()
            
            # Find image_path column
            image_path_col = None
            for col in columns:
                if col[1] == 'image_path':
                    image_path_col = col
                    break
            
            if not image_path_col:
                print("ERROR: image_path column not found!")
                return
            
            # Check if it's nullable (notnull = 0 means nullable, 1 means NOT NULL)
            if image_path_col[3] == 0:
                print("✓ image_path is already nullable. No fix needed!")
                return
            
            print("image_path is NOT NULL. Fixing...")
            
            # Create new table with correct schema
            cursor.execute("""
                CREATE TABLE glimpse_new (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title VARCHAR(200) NOT NULL,
                    description TEXT NOT NULL,
                    image_path VARCHAR(300),
                    video_url VARCHAR(500) NOT NULL,
                    hashtags VARCHAR(500),
                    is_active BOOLEAN DEFAULT 1,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """)
            print("✓ Created new table with nullable image_path")
            
            # Copy all data
            cursor.execute("""
                INSERT INTO glimpse_new (id, title, description, image_path, video_url, hashtags, is_active, created_at, updated_at)
                SELECT id, title, description, image_path, video_url, hashtags, is_active, created_at, updated_at
                FROM glimpse
            """)
            print("✓ Copied all data to new table")
            
            # Drop old table
            cursor.execute("DROP TABLE glimpse")
            print("✓ Dropped old table")
            
            # Rename new table
            cursor.execute("ALTER TABLE glimpse_new RENAME TO glimpse")
            print("✓ Renamed new table to glimpse")
            
            connection.commit()
            print("\n✅ SUCCESS! Glimpse table fixed. image_path is now optional.")
            
        except Exception as e:
            print(f"\n❌ ERROR: {e}")
            connection.rollback()
        finally:
            cursor.close()
            connection.close()

if __name__ == '__main__':
    print("="*60)
    print("Railway Database Fix - Make Glimpse Image Optional")
    print("="*60)
    fix_glimpse_table()
    print("="*60)

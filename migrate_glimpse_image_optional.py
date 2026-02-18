"""
Migration script to make image_path optional in glimpse table
"""
import sqlite3
import os

def migrate_database():
    db_path = os.path.join('backend', 'instance', 'university.db')
    
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        return
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if glimpse table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='glimpse'")
        if not cursor.fetchone():
            print("Glimpse table doesn't exist yet. No migration needed.")
            conn.close()
            return
        
        print("Creating new glimpse table with nullable image_path...")
        
        # Create new table with nullable image_path
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS glimpse_new (
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
        
        # Copy data from old table to new table
        cursor.execute("""
            INSERT INTO glimpse_new (id, title, description, image_path, video_url, hashtags, is_active, created_at, updated_at)
            SELECT id, title, description, image_path, video_url, hashtags, is_active, created_at, updated_at
            FROM glimpse
        """)
        
        # Drop old table
        cursor.execute("DROP TABLE glimpse")
        
        # Rename new table to original name
        cursor.execute("ALTER TABLE glimpse_new RENAME TO glimpse")
        
        conn.commit()
        print("✓ Migration completed successfully!")
        print("✓ image_path is now optional in glimpse table")
        
    except Exception as e:
        print(f"Error during migration: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == '__main__':
    migrate_database()

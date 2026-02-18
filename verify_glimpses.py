"""
Script to verify glimpses in the database
"""
import sqlite3
import os

def check_glimpses():
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
            print("Glimpse table doesn't exist.")
            conn.close()
            return
        
        # Get all glimpses
        cursor.execute("SELECT id, title, description, image_path, video_url, hashtags, is_active FROM glimpse")
        glimpses = cursor.fetchall()
        
        print(f"\n{'='*80}")
        print(f"Total Glimpses in Database: {len(glimpses)}")
        print(f"{'='*80}\n")
        
        if glimpses:
            for glimpse in glimpses:
                print(f"ID: {glimpse[0]}")
                print(f"Title: {glimpse[1]}")
                print(f"Description: {glimpse[2][:100]}...")
                print(f"Image Path: {glimpse[3]}")
                print(f"Video URL: {glimpse[4]}")
                print(f"Hashtags: {glimpse[5]}")
                print(f"Is Active: {glimpse[6]}")
                print(f"{'-'*80}\n")
        else:
            print("No glimpses found in database.")
        
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    check_glimpses()

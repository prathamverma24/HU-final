import sqlite3
import json

conn = sqlite3.connect('backend/instance/university.db')
cursor = conn.cursor()

# Get current hero section
cursor.execute('SELECT content_json FROM section_content WHERE section_name="hero"')
result = cursor.fetchone()

if result:
    content = json.loads(result[0])
    # Update with the requested YouTube video
    content['video_url'] = 'https://youtu.be/blzl5ee5GSU?si=rCVtYJX4YN9m2syE'
    
    # Update database
    cursor.execute(
        'UPDATE section_content SET content_json=?, updated_at=datetime("now") WHERE section_name="hero"',
        (json.dumps(content),)
    )
    conn.commit()
    print("Updated video URL to:", content['video_url'])
    print("This will be converted to: https://www.youtube.com/embed/blzl5ee5GSU")
else:
    print("No hero section found")

conn.close()

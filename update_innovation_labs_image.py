import sqlite3
import json

conn = sqlite3.connect('backend/instance/university.db')
cursor = conn.cursor()

# Get current technical section
cursor.execute('SELECT content_json FROM section_content WHERE section_name="technical"')
result = cursor.fetchone()

if result:
    content = json.loads(result[0])
    
    # Find Innovation Labs activity and update its image
    if 'activities' in content:
        for activity in content['activities']:
            if 'Innovation Labs' in activity.get('title', ''):
                activity['image'] = '/images/virtual_lab1.avif'
                print(f"Updated Innovation Labs image to: {activity['image']}")
                break
    
    # Update database
    cursor.execute(
        'UPDATE section_content SET content_json=?, updated_at=datetime("now") WHERE section_name="technical"',
        (json.dumps(content),)
    )
    conn.commit()
    print("Technical section updated successfully!")
else:
    print("No technical section found")

conn.close()

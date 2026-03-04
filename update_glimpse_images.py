import sqlite3

conn = sqlite3.connect('backend/instance/university.db')
cursor = conn.cursor()

# Check table structure
cursor.execute("PRAGMA table_info(glimpse)")
print("Glimpse table structure:")
for row in cursor.fetchall():
    print(row)

print("\n" + "="*50 + "\n")

# Get all glimpses
cursor.execute('SELECT * FROM glimpse')
glimpses = cursor.fetchall()

print("Current glimpses:")
for glimpse in glimpses:
    print(glimpse)

print("\n" + "="*50 + "\n")

# Update the first two glimpses with new images
cursor.execute('UPDATE glimpse SET image_path=? WHERE id=1', ('/images/utkarsh.jpeg',))
cursor.execute('UPDATE glimpse SET image_path=? WHERE id=2', ('/images/utt.jpeg',))

conn.commit()
print("Updated glimpse images!")
print("Glimpse 1 (Alumni Meet): /images/utkarsh.jpeg")
print("Glimpse 2 (Republic Day): /images/utt.jpeg")

conn.close()

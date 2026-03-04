import sqlite3
import json

conn = sqlite3.connect('backend/instance/university.db')
cursor = conn.cursor()

# First check table structure
cursor.execute("PRAGMA table_info(section_content)")
print("Table structure:")
for row in cursor.fetchall():
    print(row)

print("\n" + "="*50 + "\n")

# Get hero section
cursor.execute('SELECT * FROM section_content WHERE section_name="hero"')
result = cursor.fetchone()
if result:
    print("Hero section data:", result)
else:
    print("No hero section found")
conn.close()

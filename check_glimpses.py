import sqlite3
import json

conn = sqlite3.connect('backend/instance/university.db')
cursor = conn.cursor()

cursor.execute('SELECT * FROM glimpse')
glimpses = cursor.fetchall()

print("Current glimpses:")
for glimpse in glimpses:
    print(f"ID: {glimpse[0]}, Title: {glimpse[1]}, Image: {glimpse[2]}")

conn.close()

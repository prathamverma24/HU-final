#!/usr/bin/env python3
"""
Test script to add a sample glimpse to verify the system works
"""

import os
import sys

backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
os.chdir(backend_dir)
sys.path.insert(0, backend_dir)

from app import app, db
from models import Glimpse

print("=" * 70)
print("TESTING GLIMPSE ADDITION")
print("=" * 70)
print()

with app.app_context():
    # Add a test glimpse
    test_glimpse = Glimpse(
        title="DJ Night 2026",
        description="An electrifying night of music, dance, and celebration with the HU family",
        image_path="images/djnight.jpeg",
        video_url="https://www.youtube.com/embed/dQw4w9WgXcQ",  # Sample video
        hashtags="#DJNight #HUEvents #Party",
        is_active=True
    )
    
    # Check if it already exists
    existing = Glimpse.query.filter_by(title="DJ Night 2026").first()
    
    if existing:
        print("✓ Test glimpse already exists in database")
        print(f"  ID: {existing.id}")
        print(f"  Title: {existing.title}")
        print(f"  Video URL: {existing.video_url}")
    else:
        db.session.add(test_glimpse)
        db.session.commit()
        print("✓ Test glimpse added successfully!")
        print(f"  ID: {test_glimpse.id}")
        print(f"  Title: {test_glimpse.title}")
        print(f"  Video URL: {test_glimpse.video_url}")
    
    print()
    print("-" * 70)
    print("ALL GLIMPSES IN DATABASE:")
    print("-" * 70)
    
    all_glimpses = Glimpse.query.all()
    for g in all_glimpses:
        print(f"\n{g.id}. {g.title}")
        print(f"   Description: {g.description[:50]}...")
        print(f"   Video URL: {g.video_url}")
        print(f"   Image: {g.image_path}")
        print(f"   Hashtags: {g.hashtags}")
        print(f"   Active: {g.is_active}")
    
    print()
    print("=" * 70)
    print(f"TOTAL GLIMPSES: {len(all_glimpses)}")
    print("=" * 70)
    print()
    print("Now refresh your browser to see the changes!")
    print("The glimpses should appear in 'Enjoy the Events with HU Family' section")
